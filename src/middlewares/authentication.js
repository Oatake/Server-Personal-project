const { getUser } = require("../services/database-service/db-services");
const createError = require("../utills/createError");
const jwt = require('jsonwebtoken')

exports.authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if(!authHeader)
    {createError(401,"token is missing")}
    const token = authHeader.split(" ")[1]
    const payload = jwt.verify(token, process.env.SECRET_KEY)
    console.log(payload)
    console.log("payload")
    const data = {where : {id : payload.id}}
    const user = await getUser(data)
    if (!user)
        {
            createError(401,"Unauthorized")
        }
    console.log(user)
    const {password, ...userData} = user
    req.user = userData
    next()
  } catch (error) {
    console.log(error)
    next(error)
  }
};
