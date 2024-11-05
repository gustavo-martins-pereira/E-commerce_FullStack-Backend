import { Op } from "sequelize";
import db from "../db/models/index.js";

const { Order } = db;

async function createOrder({ total, status, clientId, sellerId }) {
    return await Order.create({ total, status, clientId, sellerId });
}

async function getOrdersByUserId(userId) {
    return await Order.findAll({ where: {
        [Op.or]: [
            {sellerId: userId},
            {clientId: userId},
        ],
    }});
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
    getOrdersByUserId,
    getOrderById,
    updateOrderStatusById,
};
