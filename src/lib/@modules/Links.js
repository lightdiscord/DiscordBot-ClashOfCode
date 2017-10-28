import { client } from '../Client'
import * as bot from '../@decorators'
import { RichEmbed } from 'discord.js'

export default class Links {

    @bot.when('message')
    async onMessage (message) {
        if (message.author === client.user) return
        if (!message.guild) return
        if (!this.isValidLink(message)) return

        message.deletable && message.delete()

        const embed = new RichEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setTitle('A new clash of code starts !')
            .setDescription(`${message.author.toString()} is waiting from you to join....`)
            .setURL(message.content.trim())
            .setImage('https://files.codingame.com/codingame/share_pics_clash_of_code.jpg')

        const role = await this.findRole(message.guild)

        message.channel.send({ embed })
            .then(message => message.react('🔔'))
            .then(react => react.message.react('❌'))
            .then(react => react.message.channel.send(`${role} Notification !`))
            .then(message => message.delete(5000))
    }

    @bot.when('messageReactionAdd')
    async onReaction (reaction, user) {
        if (user.id === client.user.id) return
        if (!reaction.message.guild) return
        const embed = reaction.message.embeds[0]
        if (!embed || embed.title != 'A new clash of code starts !') return
        
        switch (reaction.emoji.name) {
            case '❌':
                const id = /<@(\d+)>/.exec(embed.description)[1]
                if (id === user.id && reaction.message.deletable)
                    reaction.message.delete()
                break
            case '🔔':
                this.notificationRole(reaction, user)
                break
        }
    }

    @bot.when('messageReactionRemove')
    async onReactionRemove (reaction, user) {
        if (user.id === client.user.id) return
        if (!reaction.message.guild) return
        const embed = reaction.message.embeds[0]
        if (!embed || embed.title != 'A new clash of code starts !') return
        if (reaction.emoji.name !== '🔔') return
        this.notificationRole(reaction, user)
    }

    async notificationRole (reaction, user) {
        const guild = reaction.message.guild
        const role = await this.findRole(guild)
            .catch(error => sendError(reaction.message.channel, `We can't use notification feature because I haven't the permission to manage roles`))

        guild.fetchMember(user)
            .then(member => member.roles.has(role.id) ? member.removeRole(role, 'Unsubscribe from Clash Of Code notifications') : member.addRole(role, 'Subscribe to Clash Of Code notifications'))
            .catch(error => sendError(reaction.message.channel, `We can't use notification feature because I haven't the permission to manage roles`))
    }

    async findRole (guild) {
        const role = guild.roles.find('name', '🔔 ClashOfCode')
        return role || await guild.createRole({
            name: '🔔 ClashOfCode',
            mentionable: true
        }, 'Created for bot notifications')
    }

    async sendError(channel, error) {
        const embed = new RichEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setTitle('An error occured...')
            .setDescription(error)
            .setColor(0xf44336)

        return await channel.send({ embed })
    }

    isValidLink ({ content }) {
        return /https:\/\/www\.codingame\.com\/clashofcode\/clash\/[0-9a-z]+/gi.test(content.trim())
    }

}