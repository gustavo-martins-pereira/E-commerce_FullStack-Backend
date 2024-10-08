import db from "../db/models/index.js";

const { OrderItem } = db;

async function createOrderItem({ quantity, price, subtotal, orderId, productId }) {
    return await OrderItem.create({ quantity, price, subtotal, orderId, productId });
}

async function getOrderItemsByOrderId(orderId) {
    return await OrderItem.findAll({ where: { orderId }});
}

export {
    createOrderItem,
    getOrderItemsByOrderId,
};
