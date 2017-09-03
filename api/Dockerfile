FROM scratch

ADD conf /conf
COPY build/api* /server

WORKDIR /
EXPOSE 8080
ENTRYPOINT ["./server"]