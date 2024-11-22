const {
  createTable,
  updateTable,
  getTable,
  getOrder,
  createOrder,
  updateOrder,
  createOrderItem,
  getOrderItem,
  updateOrderItem,
  getSummary,
  updatePaidOrder,
} = require("../services/database-service/db-services");

exports.receiveOrder = async (req, res, next) => {
  try {
    const { table, orders, total } = req.body;
    console.log("table is ", table);
    console.log("orders is ", orders);
    console.log("total is ", total);
    //  table
    const isTableValid = await getTable({
      where: { tableName: table.data.tableName },
    });
    let newTable;
    if (!isTableValid) {
      newTable = await createTable(table);
    } else {
      const data = { ...table, where: { tableName: table.data.tableName } };
      newTable = await updateTable(data);
    }
    console.log("newTable is : ", newTable);

    // order
    //check is order available
    const isOrderValid = await getOrder({
      where: { tableId: newTable.id, isPaid: false },
    });
    let newOrder;
    if (!isOrderValid) {
      const data = {
        isPaid: false,
        tableId: newTable.id,
        totalPrice: total.data.totalPrice,
      };
      newOrder = await createOrder({ data });
    } else {
      const data = {
        where: { id: isOrderValid.id },
        data: { totalPrice: total.data.totalPrice },
      };
      newOrder = await updateOrder(data);
    }
    console.log("newOrder is : ", newOrder);

    //Create Order Item
    let orderItem = [];
    const arrOrder = orders.data.arrOrder;
    console.log("order is : ", arrOrder);
    for (let i in arrOrder) {
      console.log(i);
      const data = {
        recipeId: arrOrder[i].recipeId,
        orderId: newOrder.id,
        status: "COOKING",
        amount: arrOrder[i].amount,
      };
      const resp = await createOrderItem({ data });
      orderItem.push(resp);
    }
    //   const newTable = await updateTable(table)
    //   console.log(newTable)
    res.send({ orderItem }).status(200);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.kitchenOrder = async (req, res, next) => {
  try {
    const data = {
      where: { status: "COOKING" },
      include: {
        Order: { include: { Table: true } },
        Recipe: { select: { title: true } },
      },
    };
    //add join table codition

    const resp = await getOrderItem(data);
    // arrange data by orderId
    const newCookingList = resp.reduce((prev, curr) => {
      if (!prev[curr.orderId]) {
        prev[curr.orderId] = [];
      }
      prev[curr.orderId].push(curr);
      return prev;
    }, {});
    console.log(newCookingList);
    res.json(newCookingList).status(200);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const {isLastOrder,id,tableId} = req.body
    const data = {where : {id:id}, data : {status:"DONE"}}
    const result = await updateOrderItem(data)
    if(isLastOrder)
    {
      const tableData = {where : {id : tableId}, data:{status:"EATING"}}
      const updateResult = await updateTable(tableData)
      return res.json(updateResult).status(200)
    }
    res.json(result).status(200);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getBills = async (req, res, next) => {
  try {
    const table = Number(req.params.table)
    console.log(req.params)
      //check Table
      const data = {where : {AND:[{isPaid:false},{tableId:table}]}}
      
      const order = await getSummary(data)
      
      const orderList = await getOrderItem({where :{orderId : order.id}, include : {Recipe:true}})
     
    res.json({order,orderList}).status(200);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.paidOrder = async (req, res, next) => {
  try {
    const {id} = req.body
    const data = {where:{id:id}, data : {isPaid : true}}
    const resp = updatePaidOrder(data)
    res.json(resp).status(200);
  } catch (error) {
    console.log(error);
    next(error);
  }
};