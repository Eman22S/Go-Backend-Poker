FROM phpdockerio/php73-fpm:latest
WORKDIR "/application"
ENV TIMEZONE 'America/Los_Angeles'

# Fix debconf warnings upon build
ARG DEBIAN_FRONTEND=noninteractive

# Install selected extensions and other stuff
RUN apt-get update \
    && apt-get -y --no-install-recommends install  php-memcached php7.3-mysql php7.3-pgsql php-redis php7.3-redis php7.3-sqlite3 php7.3-bcmath php7.3-bz2 php7.3-gd php-imagick php7.3-phpdbg php-xdebug \
    && apt-get clean; rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

# install crontab
RUN apt-get update \
    && apt-get install -y cron

# Install git
RUN apt-get update \
    && apt-get -y install git \
    && apt-get clean; rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

# Install mail sending tool
RUN apt-get update \ 
    && apt-get -y install sendmail

# Use PHP 7.3
RUN update-alternatives --set php /usr/bin/php7.3
RUN update-alternatives --set phar /usr/bin/phar7.3
RUN update-alternatives --set phar.phar /usr/bin/phar.phar7.3 

RUN service php7.3-fpm restart

# copy new configuration to change mail sending port
COPY sendmail.mc /etc/mail/sendmail.mc

# compile new mail configuration
RUN m4 /etc/mail/sendmail.mc > /etc/mail/sendmail.cf

# restart mail sending service
RUN service sendmail restart

# copy browscap.ini so that get_browser function would work
COPY browscap.ini /etc/browscap.ini

# copy cron job
# COPY cronjob /var/spool/cron/crontabs/root

# run cron job
ADD cronjob /tmp/cronjob
RUN chmod 0644 /tmp/cronjob
RUN touch /var/log/cron.log
RUN crontab /tmp/cronjob

RUN cron

# ENTRYPOINT cron
