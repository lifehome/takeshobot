const catchAllHandler = (req, res, next)=>{
  res.status(403)
}

export default catchAllHandler