const {
  getCategories,
  getMenues,
  deleteRecipe,
  toggleRecipe,
  createMenu
} = require("../services/database-service/db-services");

exports.getRecipeList = async (req, res, next) => {
  try {
    const categories = await getCategories();
    let result = {};
    const test = categories.map(async (el) => {
      const resp = await getMenues({ where: { categoryId: el.id } });
      result[el.categoryName] = resp;
    });
    await Promise.all(test);
    
    res.json({ result, keys: Object.keys(result) }).status(200);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.removeMenu = async(req,res,next)=>{
  try {
    const {recipeId} = req.params
    const data = {where:{id:Number(recipeId)}}
    const resp = await deleteRecipe(data)
    
    res.status(200).json({msg:"successfully delete",resp})
  } catch (error) {
    console.log(error)
    next(error);
  }
}

exports.hideMenuToggle = async(req,res,next)=>{
  try {
    const {recipeId} = req.params
    const data = {where:{id:Number(recipeId)}}
    const resp = await toggleRecipe(data)

    res.status(200).json({msg:"successfully update",resp})
  } catch (error) {
    console.log(error)
    next(error);
  }
}

exports.createRecipe = async(req,res,next)=>{
  try {
    const {title,price,categoryId,description} =req.body

    const data = {data:{title,description,price, categoryId}}
    const resp = await createMenu(data)
    console.log(resp)

    res.status(200).json({msg:"successfully createMenu",resp})
  } catch (error) {
    console.log(error)
    next(error);
  }
}
