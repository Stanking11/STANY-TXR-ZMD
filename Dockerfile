version: '3.8'

services:
  bot:
    image: stany-tech-bot
    container_name: stany-tech-bot
    restart: unless-stopped
    volumes:
      - ./sessions:/app/sessions
    environment:
      - NODE_ENV=production
      - OWNER_NUMBER=${OWNER_NUMBER}
      - PREFIX=!
      - ANTICALL=true
      - ANTIDELETE=true
      - ANTITAG=true
      - ANTISTICKER=true
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"
