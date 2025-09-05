# Step 1: Build the project using Maven
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests

# Step 2: Use a lightweight JDK image to run the app
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Copy the built JAR file from the build container
COPY --from=builder /app/target/anogab-0.0.1-SNAPSHOT.jar app.jar

# Configure the port (Render sets PORT env variable)
ENV PORT=8080
EXPOSE 8080

# Start the Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]
