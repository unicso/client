FROM node:15
RUN mkdir /home/client
ADD . /home/client

WORKDIR /home/client
RUN npm update \
&& npm ci \
&& npm run build

CMD ["npm", "run", "start"]
