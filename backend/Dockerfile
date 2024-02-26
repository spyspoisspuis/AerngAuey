FROM alpine:latest

RUN mkdir /app

WORKDIR /app

COPY backendApp /app
COPY app.env /app

CMD ["/app/backendApp"]