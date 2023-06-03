FROM alpine:3.17
ARG DB_NAME
ARG DB_USER
ARG DB_PASSWORD
RUN apk update && apk upgrade
RUN apk add mariadb mariadb-client
RUN mkdir -p /var/run/mysqld
RUN chmod 777 /var/run/mysqld
RUN touch tmp.txt
RUN echo "[mysqld]" > tmp.txt
RUN echo "bind-address = 0.0.0.0" >> tmp.txt
RUN mv tmp.txt /etc/my.cnf.d/docker.cnf
RUN sed -i 's/skip-networking/#skip-networking/g' /etc/my.cnf.d/mariadb-server.cnf
RUN mysql_install_db --user=root --datadir=/var/lib/mysql
RUN mkdir -p /docker-entrypoint-initdb.d
RUN touch /docker-entrypoint-initdb.d/init.sql
RUN echo "FLUSH PRIVILEGES;" >> /docker-entrypoint-initdb.d/init.sql
RUN echo "DELETE FROM mysql.user WHERE User='';" >> /docker-entrypoint-initdb.d/init.sql
RUN echo "DROP DATABASE IF EXISTS test;" >> /docker-entrypoint-initdb.d/init.sql
RUN echo "DELETE FROM mysql.db WHERE Db='test';" >> /docker-entrypoint-initdb.d/init.sql
RUN echo "DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');" >> /docker-entrypoint-initdb.d/init.sql
RUN echo "ALTER USER 'root'@'localhost' IDENTIFIED BY '${DB_PASSWORD}';" >> /docker-entrypoint-initdb.d/init.sql
RUN echo "CREATE DATABASE IF NOT EXISTS ${DB_NAME};" >> /docker-entrypoint-initdb.d/init.sql
RUN echo "CREATE USER IF NOT EXISTS '${DB_USER}'@'%' IDENTIFIED BY '${DB_PASSWORD}';" >> /docker-entrypoint-initdb.d/init.sql
RUN echo "GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO '${DB_USER}'@'%';" >> /docker-entrypoint-initdb.d/init.sql
RUN echo "FLUSH PRIVILEGES;" >> /docker-entrypoint-initdb.d/init.sql
RUN echo "USE ${DB_NAME};" >> /docker-entrypoint-initdb.d/init.sql
CMD ["mysqld", "--user=root", "--init-file=/docker-entrypoint-initdb.d/init.sql"]