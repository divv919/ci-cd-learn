FROM oven/bun:latest
WORKDIR /learn-vm01

COPY bun.lock package.json ./

RUN bun install --frozen-lockfile

COPY . .

ENV PORT=3000

CMD [ "bun" , "start" ]