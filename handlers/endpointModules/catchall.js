const catchAllHandler = (req, res, next)=>{
  res.status(403)
  res.json({"error": "Unauthorized"})
  next()
}

export default catchAllHandler