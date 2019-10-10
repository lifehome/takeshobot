const errCatcher = (e)=>{
  console.log(JSON.stringify(e, " ", 2))
  if(e.description == "Bad Request: message to delete not found")
    console.log(`[WARN] Message cannot be accessed. Payload: ${JSON.stringify(e.on.payload, " ", 2)}`)
}

export default errCatcher