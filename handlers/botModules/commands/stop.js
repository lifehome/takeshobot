import errHandler_deleteMsg from "../errorCatchers/deleteMessage"

const commandStart = async (ctx)=>{
  // TODO: Try to delete all message in the chatroom
  // Methodology: Obtain ctx message id and add 100 to it, 
  // then iterate deleteMessage on the chat id and message ids.

  if(ctx.chat.type == "private"){
    await ctx.reply("Bye")
    Array.from({ length: ctx.message.message_id + 100 }).forEach((x, i)=>{
      setTimeout(()=>{
        ctx.telegram.deleteMessage(ctx.message.chat.id, i)
          .catch(e=>errHandler_deleteMsg)
      }, 987) 
    })
  } 
}

export default commandStart