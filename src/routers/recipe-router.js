const express = require("express");
const { getRecipeList, removeMenu, hideMenuToggle, createRecipe } = require("../controllers/recipe-controller");

const router = express.Router()

router.get('/', getRecipeList)
router.post('/', createRecipe)
router.delete('/:recipeId', removeMenu)
router.patch('/:recipeId', hideMenuToggle)

module.exports = router;