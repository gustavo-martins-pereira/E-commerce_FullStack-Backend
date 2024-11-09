import db from "../db/models/index.js";

const { Order } = db;

async function createOrder({ total, status, clientId, sellerId }) {
    return await Order.create({ total, status, clientId, sellerId });
}

async function getOrdersByClientId(clientId) {
    return await Order.findAll({ where: {clientId} });
}

async function getOrdersBySellerId(sellerId) {
    return await Order.findAll({ where: {sellerId} });
}

async function getOrderById(id) {
    return await Order.findByPk(id);
}

async function updateOrderStatusById(id, status) {
    return await Order.update({ status }, {
        where: { id },
        returning: true,
    });
}

export {
    createOrder,
    getOrdersByClientId,
    getOrdersBySellerId,
    getOrderById,
    updateOrderStatusById,
};
