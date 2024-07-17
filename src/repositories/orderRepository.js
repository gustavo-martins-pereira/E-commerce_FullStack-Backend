import db from "../db/models/index.js";

const { Order } = db;

async function createOrder({ total, status, clientId, sellerId }) {
    return await Order.create({ total, status, clientId, sellerId });
}

export {
    createOrder,
};
