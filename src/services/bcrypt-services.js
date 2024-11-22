const bcrypt = require("bcryptjs")
exports.hashedPassword = async(password)=>{
    const newPassword = await bcrypt.hash(password, 10)
    return newPassword
}

exports.checkedPassword = async(password, dbPassword)=>{
    const result = await bcrypt.compare(password, dbPassword)
    return result
}