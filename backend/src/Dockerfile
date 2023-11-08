FROM golang:latest AS build

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

FROM alpine:latest  as deploy

WORKDIR /root/
COPY --from=build /app/main .

CMD ["./main"]