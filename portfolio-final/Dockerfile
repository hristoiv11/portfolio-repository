# Stage 1: Build
FROM gradle:jdk21 AS builder
WORKDIR /app
COPY . .
RUN gradle build -x test

# Stage 2: Run
FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
