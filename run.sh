#!/bin/sh

export COMPOSE_FILE_PATH="${PWD}/target/classes/docker/docker-compose.yml"

if [ -z "${M2_HOME}" ]; then
  export MVN_EXEC="mvn"
else
  export MVN_EXEC="${M2_HOME}/bin/mvn"
fi

start() {
    docker volume create alfresco-share-chart-example-acs-volume
    docker volume create alfresco-share-chart-example-db-volume
    docker volume create alfresco-share-chart-example-ass-volume
    docker-compose -f "$COMPOSE_FILE_PATH" up --build -d
}

start_share() {
    docker-compose -f "$COMPOSE_FILE_PATH" up --build -d alfresco-share-chart-example-share
}

start_acs() {
    docker-compose -f "$COMPOSE_FILE_PATH" up --build -d alfresco-share-chart-example-acs
}

start_api() {
    docker-compose -f "$COMPOSE_FILE_PATH" up --build -d alfresco-chart-example-api
}

down() {
    if [ -f "$COMPOSE_FILE_PATH" ]; then
        docker-compose -f "$COMPOSE_FILE_PATH" down
    fi
}

purge() {
    docker volume rm -f alfresco-share-chart-example-acs-volume
    docker volume rm -f alfresco-share-chart-example-db-volume
    docker volume rm -f alfresco-share-chart-example-ass-volume
}

build() {
    $MVN_EXEC clean package
}

build_share() {
    docker-compose -f "$COMPOSE_FILE_PATH" kill alfresco-share-chart-example-share
    yes | docker-compose -f "$COMPOSE_FILE_PATH" rm -f alfresco-share-chart-example-share
    $MVN_EXEC clean package -pl alfresco-share-chart-example-share,alfresco-share-chart-example-share-docker
}

build_acs() {
    docker-compose -f "$COMPOSE_FILE_PATH" kill alfresco-share-chart-example-acs
    yes | docker-compose -f "$COMPOSE_FILE_PATH" rm -f alfresco-share-chart-example-acs
    $MVN_EXEC clean package -pl alfresco-share-chart-example-integration-tests,alfresco-share-chart-example-platform,alfresco-share-chart-example-platform-docker
}

build_api() {
    docker-compose -f "$COMPOSE_FILE_PATH" kill alfresco-chart-example-api
    yes | docker-compose -f "$COMPOSE_FILE_PATH" rm -f alfresco-chart-example-api
    $MVN_EXEC clean package -pl alfresco-chart-example-api,alfresco-chart-example-api-docker
}

tail() {
    docker-compose -f "$COMPOSE_FILE_PATH" logs -f
}

tail_all() {
    docker-compose -f "$COMPOSE_FILE_PATH" logs --tail="all"
}

prepare_test() {
    $MVN_EXEC verify -DskipTests=true -pl alfresco-share-chart-example-platform,alfresco-share-chart-example-integration-tests,alfresco-share-chart-example-platform-docker
}

test() {
    $MVN_EXEC verify -pl alfresco-share-chart-example-platform,alfresco-share-chart-example-integration-tests
}

case "$1" in
  build_start)
    down
    build
    start
    tail
    ;;
  build_start_it_supported)
    down
    build
    prepare_test
    start
    tail
    ;;
  start)
    start
    tail
    ;;
  stop)
    down
    ;;
  purge)
    down
    purge
    ;;
  tail)
    tail
    ;;
  reload_share)
    build_share
    start_share
    tail
    ;;
  reload_acs)
    build_acs
    start_acs
    tail
    ;;
  reload_api)
    build_api
    start_api
    tail
    ;;
  build_test)
    down
    build
    prepare_test
    start
    test
    tail_all
    down
    ;;
  test)
    test
    ;;
  *)
    echo "Usage: $0 {build_start|build_start_it_supported|start|stop|purge|tail|reload_share|reload_acs|reload_api|build_test|test}"
esac