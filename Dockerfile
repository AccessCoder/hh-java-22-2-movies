FROM openjdk:17

LABEL maintainer="test@neuefische.de"

ADD backend/target/moviedb.jar moviedb.jar

CMD [ "sh", "-c", "java -jar /moviedb.jar"]