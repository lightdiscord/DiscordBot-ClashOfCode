import { Client } from 'discord.js'
import { white, gray, green } from 'chalk'

export const client = new Client()

client.on('ready', () => console.log(gray(`${white(client.user.username)} is now ${green('operational!')}`)))

process.on('exit', () => client.destroy())

process.on('SIGINT', () => process.exit(0))

process.on('uncaughtException', exception => {
    console.error('An uncought exception occured...')
    console.error(exception.stack)
    process.exit(1)
})