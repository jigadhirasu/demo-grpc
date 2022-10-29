FROM nginx:stable-alpine
COPY dist/demo-grpc/browser /usr/share/nginx/html/demo
COPY drone-ci/server.conf /etc/nginx/conf.d/default.conf
COPY drone-ci/load.sh /bin/load.sh
RUN chmod 755 /bin/load.sh
CMD sh /bin/load.sh