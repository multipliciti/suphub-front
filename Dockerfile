ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-alpine as base

ARG USERID=1000
ARG USERNAME=node

RUN apk add --no-cache bash shadow nano htop && \
    usermod -u ${USERID} ${USERNAME} && \
    groupmod -g ${USERID} ${USERNAME} && \
    apk cache clean && \
    rm -rf /var/cache/apk/*

RUN echo 'export PS1="\e[0;35m\e[0;37m\u-container-\h\e[0;32m\w\e[0;0m$ "'>> /etc/profile.d/settings-terminal.sh

FROM base as builder

WORKDIR /app
COPY --chown=${USERNAME}:${USERNAME} . /app

#Enviroment variables
ARG NEXT_PUBLIC_BASE_URL=http://api.localhost:8080
ARG NEXT_PUBLIC_CLIENT_HOST=http://localhost:8080
ENV NEXT_PUBLIC_CLIENT_HOST=${NEXT_PUBLIC_CLIENT_HOST}
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

RUN npm install 
RUN npm run build
RUN chown -Rf ${USERNAME}:${USERNAME} /app


FROM base as production

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder --chown=${USERNAME}:${USERNAME} /app/.next/standalone ./
COPY --from=builder --chown=${USERNAME}:${USERNAME} /app/.next/static ./.next/static


USER ${USERNAME}

EXPOSE 3000
CMD ["node", "server.js"]
