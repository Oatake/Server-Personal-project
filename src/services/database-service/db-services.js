const prisma = require("../../Model/index");
exports.getUser = async (where) => {
  const result = await prisma.user.findFirst(where);
  return result;
};

exports.getUsers = async () => {
  const result = await prisma.user.findMany();
  return result;
};

exports.deleteUser = async (data) => {
  const result = await prisma.user.delete(data);
  return result;
};

exports.getUsersWithRole = async () => {
  const result = await prisma.user.findMany({include:{Role:true}});
  return result;
};

exports.createUser = async (data) => {
  const result = await prisma.user.create(data);
  return result;
};

exports.getRole = async (where) => {
  const result = await prisma.role.findFirst(where);
  return result;
};

exports.createRole = async (data) => {
  const result = await prisma.role.create(data);
  return result;
};

exports.updateRole = async (data) => {
  const result = await prisma.role.update(data);
  return result;
};


exports.getMenues = async (where) => {
  const result = await prisma.recipe.findMany(where);
  return result;
};

exports.getRecipe = async (where) => {
  const result = await prisma.recipe.findFirst(where);
  return result;
};

exports.getCategories = async () => {
  const result = await prisma.category.findMany(true);
  return result;
};

exports.deleteRecipe = async (where) => {
  const result = await prisma.recipe.delete(where);
  return result;
};

exports.toggleRecipe = async (data) => {
  const resp = await this.getRecipe(data)
  const newdata = {...resp, isHide : !resp.isHide}
  const finalData = {where:data.where,data:newdata}
  const result = await prisma.recipe.update(finalData);
  console.log(result)
  // return result;
};

exports.createMenu = async (data) => {
  const result = await prisma.recipe.create(data);
  return result;
};

//Table table

exports.createTable = async (data) => {
  const result = await prisma.table.create(data);
  return result;
};

exports.updateTable = async (data) => {
  const result = await prisma.table.update(data);
  return result;
};

exports.getTable = async (data) => {
  const result = await prisma.table.findUnique(data);
  return result;
};

exports.getTables = async () => {
  const result = await prisma.table.findMany(true);
  return result;
};
//Order table

exports.createOrder = async (data) => {
  const result = await prisma.order.create(data);
  return result;
};

exports.getOrder = async (data) => {
  const result = await prisma.order.findFirst(data);
  return result;
};

exports.updateOrder = async (data) => {
  const result = await prisma.order.update(data);
  return result;
};

exports.updatePaidOrder = async (data) => {
  const result = await prisma.order.update(data);
  return result;
};

exports.createOrderItem = async (data)=>{
  const result = await prisma.orderItem.create(data)
  return result
}

exports.getOrderItem  = async (data)=>{
  const result = await prisma.orderItem.findMany(data)
  return result
}

exports.updateOrderItem = async(data)=>{
  const result = await prisma.orderItem.update(data)
  return result
}

exports.getSummary = async(data)=>{
  const result = await prisma.order.findFirst(data)
  return result
}