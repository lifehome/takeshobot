import errHandler_deleteMsg from "../errorCatchers/deleteMessage"

const commandStart = async (ctx)=>{
  // TODO: Count how many times this user has hi-ed the bot hourly
  // Description: The bot should respond to `/start` once every hour.

  // Send simple greetings
  let resp = await ctx.reply(ctx.i18n.t('greetings.simple'))

  // Delete inbound command message by the user
  setTimeout(()=>{
    // Delete the command sent by user
    ctx.telegram.deleteMessage(ctx.message.chat.id, ctx.message.message_id)
      .catch(e=>errHandler_deleteMsg)
  }, 1597)

  // Send help message if the user is first time appeared in the hour
  let isFirstAppearance = true;
  if(isFirstAppearance == true){
    ctx.reply(ctx.i18n.t('greetings.guidelines'))
  }
}

export default commandStart