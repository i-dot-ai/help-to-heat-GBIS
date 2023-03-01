FROM node:16 as web

ENV TZ=UTC

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

ENV PATH /app/web/node_modules/.bin:$PATH

COPY ./ /app/

WORKDIR /app/

RUN npm ci

COPY ./ /app/

COPY ./docker/web/start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 3001

CMD ["sh","/start.sh"]
