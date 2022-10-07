FROM openjdk:17

LABEL maintainer="test@neuefische.de"

ADD backend/target/moviedb.jar moviedb.jar

CMD [ "sh", "-c", "java -DServer.port=$PORT -jar /moviedb.jar"]