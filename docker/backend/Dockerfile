FROM maven:3.8.7-openjdk-18 AS build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

FROM amazoncorretto:17
ARG PROFILE=dev
ARG APP_VERSION=1.0.4

WORKDIR /app
COPY --from=build /build/target/gymTrack-*.jar /app/

EXPOSE 8088

ENV DB_URL=jdbc:postgresql://postgres-sql-gt:5432/gym_track
ENV ACTIVE_PROFILE=${PROFILE}
ENV JAR_VERSION=${APP_VERSION}


ENV MAILDEV_URL=localhost
ENV EMAIL_HOST_NAME=smtp.gmail.com
ENV EMAIL_USER_NAME=gym.track.contact@gmail.com
ENV EMAIL_PASSWORD=twuwsywgqhrzctgh


CMD java -jar -Dspring.profiles.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL}  gymTrack-${JAR_VERSION}.jar