FROM alpine:3.17
ARG DB_NAME
ARG DB_USER
ARG DB_PASSWORD
RUN apk update && apk upgrade && apk add --no-cache \
    php81 \
    php81-fpm \
    php81-mysqli \
    php81-json \
    php81-curl \
    php81-dom \
    php81-exif \
    php81-fileinfo \
    php81-mbstring \
    php81-openssl \
    php81-xml \
    php81-zip \
    php81-redis \
    wget \
    unzip
RUN sed -i 's/listen = 127.0.0.1:9000/listen = 9000/g' /etc/php81/php-fpm.d/www.conf
RUN sed -i 's/;listen.owner = nobody/listen.owner = nobody/g' /etc/php81/php-fpm.d/www.conf
RUN sed -i 's/;listen.group = nobody/listen.group = nobody/g' /etc/php81/php-fpm.d/www.conf
WORKDIR /var/www
RUN wget https://wordpress.org/latest.zip
RUN unzip latest.zip
RUN rm latest.zip
RUN cp -rf wordpress/* .
RUN rm -rf wordpress
RUN mkdir ~/data
RUN mkdir ~/data/mariadb
RUN mkdir ~/data/wordpress
RUN chmod -R 777 ~/data
RUN touch /var/www/wp-config.php
RUN echo "<?php" > /var/www/wp-config.php
RUN echo "define( 'DB_NAME', '${DB_NAME}' );" >> /var/www/wp-config.php
RUN echo "define( 'DB_USER', '${DB_USER}' );" >> /var/www/wp-config.php
RUN echo "define( 'DB_PASSWORD', '${DB_PASSWORD}' );" >> /var/www/wp-config.php
RUN echo "define( 'DB_HOST', 'mariadb' );" >> /var/www/wp-config.php
RUN echo "define( 'DB_CHARSET', 'utf8' );" >> /var/www/wp-config.php
RUN echo "define( 'DB_COLLATE', '' );" >> /var/www/wp-config.php
RUN echo "define('FS_METHOD','direct');" >> /var/www/wp-config.php
RUN echo "\$table_prefix = 'wp_';" >> /var/www/wp-config.php
RUN echo "define( 'WP_DEBUG', false );" >> /var/www/wp-config.php
RUN echo "if ( ! defined( 'ABSPATH' ) ) {" >> /var/www/wp-config.php
RUN echo "define( 'ABSPATH', __DIR__ . '/' );}" >> /var/www/wp-config.php
RUN echo "require_once ABSPATH . 'wp-settings.php';" >> /var/www/wp-config.php
RUN chown -R nobody:nobody /var/www
RUN chmod -R 755 /var/www
CMD ["php-fpm81", "-F"]