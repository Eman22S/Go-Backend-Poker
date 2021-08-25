# USING AND IMPORTING MAXMIND GEOIP2 DATABASE

    Maxmind GeoIP is used to check the ip address of clients using the service is from a valid region.
    Maxmind is also used to look up the latitude and longitude of the clients and verify that they are from a valid region

## Setup MAXMIND MYSQL Databases for maxmind

    To setup the database for location look up you need the Maxmind GeoIP2 city database in csv format
    To setup the database for isp look up you need the Maxmind GeoLite2 ASN database in csv format
    After downloading and extracting to get the csv files you can proceed to import it to the mysql database

## These are the steps you need to follow

### Open terminal and start the docker container for the mysql terminal if you haven't already

### log in to the mysql console

```sql
    docker exec -it mysql mysql -u root --password=password --local-infile
```

### Create the database first if you haven't already, and *use* it

```sql
    create database maxmind;
    use maxmind
```

### Create three tables that store our csv data *ip_locations* ip_asn and *ip_blocks*

```sql
    DROP TABLE IF EXISTS `ip_blocks`;
    CREATE TABLE `ip_blocks` (
        `ip_from` int unsigned NOT NULL,
        `ip_to` int unsigned NOT NULL,
        `network` varchar(32) NOT NULL,
        `geoname_id` int unsigned NOT NULL,
        `registered_country_geoname_id` int unsigned NOT NULL,
        `represented_country_geoname_id` int unsigned NOT NULL,
        `is_anonymous_proxy` tinyint(1) NOT NULL,
        `is_satellite_provider` tinyint(1) NOT NULL,
        `postal_code` varchar(32) NOT NULL,
        `latitude` float(8,4) NOT NULL,
        `longitude` float(8,4) NOT NULL,
        `accuracy_radius` smallint unsigned NOT NULL
    );
```

```sql
    DROP TABLE IF EXISTS `ip_locations`;
    CREATE TABLE `ip_locations` (
        `geoname_id` int unsigned NOT NULL,
        `locale_code` varchar(32) NOT NULL,
        `continent_code` char(2) NOT NULL,
        `continent_name` varchar(32) NOT NULL,
        `country_iso_code` char(2) NOT NULL,
        `country_name` varchar(64) NOT NULL,
        `subdivision_1_iso_code` varchar(3) NOT NULL,
        `subdivision_1_name` varchar(128) COLLATE 'utf8_unicode_ci' NOT NULL,
        `subdivision_2_iso_code` varchar(3) NOT NULL,
        `subdivision_2_name` varchar(128) COLLATE 'utf8_unicode_ci' NOT NULL,
        `city_name` varchar(128) COLLATE 'utf8_unicode_ci' NOT NULL,
        `metro_code` smallint unsigned NOT NULL,
        `time_zone` varchar(64) NOT NULL
    );
```

```sql
    DROP TABLE IF EXISTS `ip_asn`;
    CREATE TABLE `ip_asn` (
        `ip_from` int unsigned NOT NULL,
        `ip_to` int unsigned NOT NULL,
        `network` varchar(32) NOT NULL,
        `autonomous_system_number` int unsigned NOT NULL,
        `autonomous_system_organization` varchar(128) COLLATE 'utf8_unicode_ci' NOT NULL
    );
```

### Next, import the csv files into the corresponding tables

```sql
    LOAD DATA LOCAL INFILE '/tmp/GeoIP2-City-Blocks-IPv4.csv' INTO TABLE ip_blocks COLUMNS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' IGNORE 1 LINES (
        @network,
        geoname_id,
        registered_country_geoname_id,
        represented_country_geoname_id,
        is_anonymous_proxy,
        is_satellite_provider,
        postal_code,
        latitude,
        longitude,
        accuracy_radius) SET 
        ip_from = INET_ATON(SUBSTRING(@network, 1, LOCATE('/', @network) - 1)),
        ip_to = (INET_ATON(SUBSTRING(@network, 1, LOCATE('/', @network) - 1)) + (pow(2, (32-CONVERT(SUBSTRING(@network, LOCATE('/', @network) + 1), UNSIGNED INTEGER)))-1));
```

```sql
    LOAD DATA LOCAL INFILE '/tmp/GeoLite2-ASN-Blocks-IPv4.csv' INTO TABLE ip_asn COLUMNS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' IGNORE 1 LINES (
        @network,
        autonomous_system_number,
        autonomous_system_organization) SET 
        ip_from = INET_ATON(SUBSTRING(@network, 1, LOCATE('/', @network) - 1)),
        ip_to = (INET_ATON(SUBSTRING(@network, 1, LOCATE('/', @network) - 1)) + (pow(2, (32-CONVERT(SUBSTRING(@network, LOCATE('/', @network) + 1), UNSIGNED INTEGER)))-1));
```

```sql
    LOAD DATA LOCAL INFILE '/tmp/GeoIP2-City-Locations-en.csv' INTO TABLE ip_locations CHARACTER SET UTF8 COLUMNS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' IGNORE 1 LINES (
        geoname_id,
        locale_code,
        continent_code,
        continent_name,
        country_iso_code,
        country_name,
        subdivision_1_iso_code,
        subdivision_1_name,
        subdivision_2_iso_code,
        subdivision_2_name,
        city_name,
        metro_code,
        time_zone);
```

    *note: this might take a little time because it is importing millions of rows into the database.*

### Create one more table that is a copy of ip_blocks but with out duplicate *geoname_id*

This will reduce the number of rows to search from when we are doing a latitude and longitude reverse look up to find the address (city). We only need th geoname_id, latitude and longitude.

```sql
DROP TABLE IF EXISTS `location_lookup`;
CREATE TABLE `location_lookup` (
    `geoname_id` int unsigned NOT NULL,
    `latitude` float(8,4) NOT NULL,
    `longitude` float(8,4) NOT NULL
);
```

Insert copy of the distinct locations to the new table

```sql
Insert INTO location_lookup SELECT DISTINCT ip_blocks.geoname_id, ip_blocks.latitude, ip_blocks.longitude FROM ip_blocks;
```

### Add primary keys to the tables

```sql
ALTER TABLE `ip_blocks` ADD PRIMARY KEY `ip_to` (`ip_to`);
ALTER TABLE `ip_asn` ADD PRIMARY KEY `ip_to` (`ip_to`);
ALTER TABLE `ip_locations` ADD PRIMARY KEY `geoname_id` (`geoname_id`);
ALTER TABLE `location_lookup` ADD PRIMARY KEY `lookup` (`geoname_id`,`latitude`, `longitude`);
```

### Add helper functions and procedures to help with queries

GET GEONAME_ID OF IP ADDRESS

```sql
DELIMITER $$
CREATE FUNCTION `IP2Location`(`ip` varchar(50))
    RETURNS int(11)
    LANGUAGE SQL
    DETERMINISTIC
    CONTAINS SQL
    SQL SECURITY DEFINER
    COMMENT ''
BEGIN
DECLARE loc_id INT;
SELECT geoname_id INTO loc_id FROM ip_blocks WHERE ip_to >= INET_ATON(TRIM(ip)) ORDER BY ip_to LIMIT 1;
RETURN IFNULL(loc_id, 0);
END $$
DELIMITER ;
```

Test using

```sql
SELECT * FROM ip_locations WHERE geoname_id=IP2Location("198.199.81.169");
```

Result:

| geoname_id | locale_code | continent_code | continent_name | country_iso_code | country_name  | subdivision_1_iso_code | subdivision_1_name | subdivision_2_iso_code | subdivision_2_name | city_name    | metro_code | time_zone        |
|------------|-------------|----------------|----------------|------------------|---------------|------------------------|--------------------|------------------------|--------------------|--------------|------------|------------------|
|    5101879 | en          | NA             | North America  | US               | United States | NJ                     | New Jersey         |                        |                    | North Bergen |        501 | America/New_York |

Get asn of ip address

```sql
    DELIMITER $$
    CREATE PROCEDURE `IP2ASN`( IN `ip` varchar(50) ) DETERMINISTIC READS SQL DATA
    BEGIN
        SELECT * FROM ip_asn WHERE ip_to >= INET_ATON(TRIM(ip)) ORDER BY ip_to LIMIT 1;
    END $$
    DELIMITER ;
```

Test using:

```sql
CALL IP2ASN("198.199.81.169");
```

Result:

| ip_from    | ip_to      | network | autonomous_system_number | autonomous_system_organization |
|------------|------------|---------|--------------------------|--------------------------------|
| 3334946816 | 3334963199 |         |                    14061 | DIGITALOCEAN-ASN               |

Get distance between two co-ordinates

```sql
    DELIMITER $$
    CREATE FUNCTION `getDistance`(`lat1` FLOAT, `lng1` FLOAT, `lat2` FLOAT, `lng2` FLOAT) RETURNS FLOAT
    begin
    return (acos(
            cos( radians(lat2) ) 
            * cos( radians( lat1 ) ) 
            * cos( radians( lng1 ) - radians(lng2) ) 
            + sin( radians(lat2) ) 
            * sin( radians( lat1 ) )
            ) * 6371 ); 
    end $$
    DELIMITER ;
```

Test using:

```sql
    SELECT getDistance(9.145000000000001, 40.489672999999996, 8.5502, 39.2595);
```

Result:

| getDistance(9.145000000000001, 40.489672999999996, 8.5502, 39.2595) |
|---------------------------------------------------------------------|
|                                                  150.47520446777344 |

### Finally add the *maxmind.geodist* procedure to search for location with the specified distance radius

```sql
    DELIMITER $$
    CREATE PROCEDURE `GEODIST`( IN `olat` float, IN `olon` float, IN `dist` int ) DETERMINISTIC READS SQL DATA
    BEGIN
        DECLARE lon DOUBLE;
        DECLARE lat DOUBLE;
        SET lon = olon;
        SET lat = olat;
        select distinct ip_locations.geoname_id, ip_locations.*, getDistance(lat, lon, latitude, longitude) as distance from ip_locations inner join location_lookup on ip_locations.geoname_id = location_lookup.geoname_id where (latitude <  (lat + 1.5) and latitude > (lat - 1.5)) and (longitude < (lon + 1.5) and longitude > (lon - 1.5)) having distance < dist  order by distance limit 1;
    END $$
    DELIMITER ;
```

Test using:

```sql
    call geodist(36.1699, -115.1398, 250);
```

Result:

| geoname_id | geoname_id | locale_code | continent_code | continent_name | country_iso_code | country_name  | subdivision_1_iso_code | subdivision_1_name | subdivision_2_iso_code | subdivision_2_name | city_name | metro_code | time_zone           | distance |
|------------|------------|-------------|----------------|----------------|------------------|---------------|------------------------|--------------------|------------------------|--------------------|-----------|------------|---------------------|----------|
|    5506956 |    5506956 | en          | NA             | North America  | US               | United States | NV                     | Nevada             |                        |                    | Las Vegas |        839 | America/Los_Angeles |  0.61332 |
