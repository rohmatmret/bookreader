FROM node:14.16-alpine

# install module
# RUN npm install -g npm@6.14.11
# RUN npm install --save @google-cloud/secret-manager

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

#RUN npm outdated
# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
RUN npm run build

# setting env
# ENV HOST=0.0.0.0
# ENV PORT=3000

EXPOSE 3000

CMD [ "npm", "run", "start" ]