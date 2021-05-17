FROM node:15
RUN mkdir -p /home/client
#ADD . /home/client

WORKDIR /home/client
#RUN npm install
#ENV HOST 0.0.0.0
#EXPOSE 3000

#development
#CMD ["npm", "run", "dev"]

#production
#RUN npm run build
#CMD ["npm", "run", "start"]