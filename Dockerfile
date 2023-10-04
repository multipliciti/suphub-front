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
#RUN ln -s ./Screens ./components/Screens

USER ${USERNAME}

#Enviroment variables
ARG NEXT_PUBLIC_BASE_URL=http://api.localhost:8080
ARG NEXT_PUBLIC_CLIENT_HOST=http://localhost:8080
ENV NEXT_PUBLIC_CLIENT_HOST=${NEXT_PUBLIC_CLIENT_HOST}
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

RUN if [[ ! -z "${NODE_ENV}" ]] && [[ ${NODE_ENV} != development ]]; then npm i --save-dev @types/lodash.debounce && npm install && npm run build; fi

EXPOSE 3000
ENTRYPOINT ["bash", "-c", "if [[ ! -z ${NODE_ENV} ]] && [[ ${NODE_ENV} != development ]]; then npm run start; else npm install; npm run dev; fi"]
