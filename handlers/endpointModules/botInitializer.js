// Let's summon the environment variables
require('dotenv').config({ path: '..' })

import { resolve } from "path"
import Telegraf from "telegraf"
import TelegrafI18n from 'telegraf-i18n'
const instance = new Telegraf(process.env.BOT_TOKEN)
// Import instance modules

// Import instance modules
import cmdHandler_start from "../botModules/commands/start"
import cmdHandler_help from "../botModules/commands/help"
import cmdHandler_stop from "../botModules/commands/stop"

// Initialize i18n module
const i18n = new TelegrafI18n({
  defaultLanguage: 'en',
  allowMissing: false, // Default true
  directory: resolve(__dirname, '../../locales')
})

// Instance Error Catching
instance.catch((err) => {
  console.log(err) // TODO: Refactor and produce a better error catcher module
})

// Register module with corresponding event -- START

  // Register i18n module into response context beofore module registration
  instance.use(i18n.middleware())

  // Default Telegram commands
  instance.command('start', cmdHandler_start)
  instance.command('help', cmdHandler_help)
  instance.command('stop', cmdHandler_stop)

// Register module with corresponding event -- END

// Use localtunnel.me when in development envrionment
if (process.env.NODE_ENV == "development")
  instance.telegram.setWebhook(`https://${process.env.localtunnel_name}.localtunnel.me/botService`)

// restify handler for bot functionality
const botInstance = (req, res, next)=>{
  // Handover restify request body to Telegraf
  instance.handleUpdate(req.body)

  // Configure response context
  res.status(200)
  res.json({"result": "Request accepted."})
  next()
}

export default botInstance