FROM node:12.14.1 as build-stage

WORKDIR /root/app
COPY . /root/app/
RUN npm install

RUN npm run config:generate
RUN npm run build --prod --output-path=./dist/out

FROM nginx:1.15

COPY --from=build-stage /root/app/dist/out/ /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/nginx.conf
