FROM openjdk:11

# 도커 컨테이너 외부에 노출할 포트 지정
EXPOSE 8080

# 도커 내에서 사용할 변수의 값 설정 , 아무튼 그 뒤에 jar 파일 명
ARG JAR_FILE=build/libs/backend-0.0.1-SNAPSHOT.jar

# JAR_FILE에 해당하는 파일 app.jar
COPY ${JAR_FILE} app.jar

# CMD와 유사하나, 디폴트로 수행될 명령은 ENTRYPOINT를 사용해 지정
ENTRYPOINT ["java","-jar","app.jar"]

# 도커 timezone 변경
ENV TZ=Asia/Seoul