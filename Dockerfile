FROM node:6.9.5-onbuild
WORKDIR /usr/src/app
RUN npm run build
EXPOSE 3000
CMD npm run start
