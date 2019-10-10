import errHandler_deleteMsg from "../errorCatchers/deleteMessage"

const commandStart = async (ctx)=>{
  // React to command only if it is a private chat
  if(ctx.chat.type == "private"){
    // Send farewell message
    await ctx.reply("Bye")

    // Obtain message ids and delete it
    Array.from({ length: ctx.message.message_id + 100 }).forEach((x, i)=>{
      // Do it slowly
      setTimeout(()=>{
        // Delete it
        ctx.telegram.deleteMessage(ctx.message.chat.id, i)
          .catch(e=>errHandler_deleteMsg)
      }, 987) 
    })
  } 
}

export default commandStart