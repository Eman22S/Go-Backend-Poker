### Contributing

- Src/Cam should not be changed

### Install Docker:
### comand to generet php-grpc:
  protoc --php_out=src/ --php-grpc_out=src/ sng.proto

- Desktop (MacOS): https://www.docker.com/products/docker-desktop
- CLI (Linux) https://docs.docker.com/install/

### Setup Repo

    clone repo
    cd gameservice
    docker-compose up

### Install Databases

    docker exec mysql bash -c "/usr/local/mysql/bin/mysql -u root --password=password < /scaffold/db.sql"
    docker exec mysql bash -c "/usr/local/mysql/bin/mysql -u root --password=password < /scaffold/extend_db.sql"
    docker exec mysql bash -c "/usr/local/mysql/bin/mysql -u root --password=password < /scaffold/missing_db.sql"
    docker exec mysql bash -c "/usr/local/mysql/bin/mysql -f -u root --password=password < /scaffold/admin_db.sql"

    // install maxmind databases
    docker exec mysql bash -c "tar -pxzf /scaffold/maxmind.sql.tar.gz -C /scaffold"
    docker exec mysql bash -c "/usr/local/mysql/bin/mysql -u root --password=password < /scaffold/maxmind.sql"
    docker exec mysql bash -c "/usr/local/mysql/bin/mysql -u root --password=password < /scaffold/maxmind_procedures.sql"

    //create up default users and tournaments
    docker exec mysql bash -c "/usr/local/mysql/bin/mysql -u root --password=password < /scaffold/bot_dump.sql"
    docker exec mysql bash -c "/usr/local/mysql/bin/mysql -u root --password=password < /scaffold/signup_users.sql"
    docker exec mysql bash -c "/usr/local/mysql/bin/mysql -u root --password=password < /scaffold/create_tournaments.sql"
    docker exec mysql bash -c "/usr/local/mysql/bin/mysql -u root --password=password < /scaffold/bot_script.sql"


### Configure Service
In `Configs\GeneralBase.php`,
- set `mysql_wait_timeout` the same as the `wait_timeout` of the mysql database
- Note: You can see `wait_timeout` of mysql server, by running sql: `show global variables like "wait_timeout";`

### Hosts

    127.0.0.1 adminer.local
    127.0.0.1 n1-api.local

    sudo killall -HUP mDNSResponder;  #(MacOS: cycle DNS server)

### URLs

http://adminer.local - database admin


n1-api can be used by grpc calls:

    grpcurl -d '{"email": "bot2@test.test"}' -proto sng.proto -insecure localhost:9001 poker.Sng.GetUserByEmail
    grpcurl -d '{"userIds": ["6","7","8"]}' -proto sng.proto -insecure localhost:9001 poker.Sng.MakeSng
    grpcurl -d '{"tournamentInstanceId": "<ID FROM PREVIOUS COMMAND>"}' -proto sng.proto -insecure n1-api.local:9001 poker.Sng.GetStatus
