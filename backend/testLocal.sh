#!/usr/bin/env sh

main () {
	export MYSQL_DB_NAME=pw2021
	export MYSQL_HOSTNAME=pw2021.mysql.database.azure.com
	export MYSQL_PASSWORD=donthackmE!
	export MYSQL_PORT=3306
	export MYSQL_USERNAME=ekatwikz
	export SPRING_PROFILES_ACTIVE=prod-azure-mysql,jwt
	export TOKEN_SECRET=nahidontcare

	mvn clean package -DskipTests -Denv=cloud
	java -jar "$1"
}

main "$@"
