FROM nginx:alpine

RUN mkdir -p /var/www/html

COPY build /var/www/html
COPY config/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]