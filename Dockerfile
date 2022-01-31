FROM node:latest
# Install caddy
RUN apt update
RUN apt install -y debian-keyring debian-archive-keyring apt-transport-https
RUN curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | tee /etc/apt/trusted.gpg.d/caddy-stable.asc
RUN curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
RUN apt update
RUN apt install -y libnss3-tools
RUN apt install -y caddy


# Install git
RUN apt install -y git
RUN ls
RUN git --version


# Install website
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install node-pre-gyp -g
RUN npm install
COPY . .
COPY .envStandalone /usr/src/app/.env
RUN npm run build

#Install express
WORKDIR /usr/src
RUN git clone https://gitlab.com/t5257/webtorrent-express-api.git
WORKDIR /usr/src/webtorrent-express-api
RUN npm install node-pre-gyp -g
RUN npm install

# Preparazione script di lancio
WORKDIR /usr/src
COPY start-docker.sh .
COPY CaddyFile .
RUN npm install -g concurrently
RUN chmod +x start-docker.sh


EXPOSE 80
EXPOSE 443
CMD /usr/src/start-docker.sh
