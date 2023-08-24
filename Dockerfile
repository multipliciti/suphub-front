ARG NODE_VERSION=18
FROM node:${NODE_VERSION}-alpine as Build

ARG USERID=1000
ARG USERNAME=node

RUN apk add --no-cache bash shadow && \
    usermod -u ${USERID} ${USERNAME} && \
    groupmod -g ${USERID} ${USERNAME}

RUN echo 'export PS1="\e[0;35m\e[0;37m\u-container-\h\e[0;32m\w\e[0;0m$ "'>> /etc/profile.d/settings-terminal.sh


WORKDIR /app
COPY --chown=${USERNAME}:${USERNAME} . /app
RUN chown -Rf ${USERNAME}:${USERNAME} /app
RUN ln -s ./screens ./components/Screens

USER ${USERNAME}

#Enviroment variables
ARG NEXT_PUBLIC_BASE_URL=http://api.localhost:8080
ARG NEXT_PUBLIC_CLIENT_HOST=http://localhost:8080
ENV NEXT_PUBLIC_CLIENT_HOST=${NEXT_PUBLIC_CLIENT_HOST}
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}

RUN npm install && npm run build
ENTRYPOINT ["bash", "-c", "npm run start"]
