import { gray, green } from 'chalk'
import { client } from './lib/Client'
import { load } from './lib/Modules'

load(name => console.log(gray(`Starting module ${green(name)}!`)))

client.login(process.env.DISCORD_TOKEN)