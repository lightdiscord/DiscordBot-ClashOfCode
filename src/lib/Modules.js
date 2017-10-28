import { listeners } from './@decorators/events'
import { client } from './Client'
import * as modules from './@modules'

export const INSTANCE = Symbol()

export function load (logger = () => {}) {
    Object.entries(modules).forEach(([name, Module]) => {
        logger(name)
        Module.prototype[INSTANCE] = new Module()
    })
}

export function unload () {
    listeners.entries().forEach(([event, list]) =>
        list.forEach(listener => client.removeListener(event, listener))
    )
}