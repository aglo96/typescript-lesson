#define image
FROM node:8
#create app directory inside image
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN ["npm", "install"]

#bundle app source
COPY . .
#PORT
EXPOSE 4000
CMD [ "npm", "run", "go" ]

