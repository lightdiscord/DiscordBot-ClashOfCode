# DiscordBot-ClashOfCode

> A Discord Bot that warns you when a new Clash Of Code will starts

## Installation

First, you'll need to create an .env file :

```bash
# Create environment file
$ cp .env.example .env
```

Now, for your bot you need to provide a Discord Token. (Can be created in [My Apps](https://discordapp.com/developers/applications/me)).

Click on "New App" then on "Create App" and finally on "Create a Bot User".

Replace default value of `TOKEN` in `.env` with your  token.

Then add your bot on your server with link below (replace CLIENT_ID by the Bot Client ID (can be found on your app)).

https://discordapp.com/oauth2/authorize?client_id=CLIENT_ID&scope=bot&permissions=268463168

### Launch with docker

```bash
# Use docker-compose
$ docker-compose up
```

### Launch without docker

If you wanna start `DiscordBot-ClashOfCode` without docker, you'll need to 
* Install dependencies with `npm install -D`
* Parse .env and send variables into `npm start`