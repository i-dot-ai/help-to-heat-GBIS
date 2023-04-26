FROM node:16 as web

ARG PORTAL_URL
ARG UPRN_API_KEY


ENV TZ=UTC
ENV PORTAL_URL=${PORTAL_URL}
ENV UPRN_API_KEY=${UPRN_API_KEY}

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

ENV PATH /app/web/node_modules/.bin:$PATH

COPY ./ /app/

WORKDIR /app/web

RUN npm ci

COPY ./ /app/

COPY ./docker/web/start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 3001

CMD ["sh","/start.sh"]
