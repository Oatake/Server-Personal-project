const handleNotFound = (req,res) => {
    //code
    res.status(404).json({message : "not found"})
}
module.exports = handleNotFound;