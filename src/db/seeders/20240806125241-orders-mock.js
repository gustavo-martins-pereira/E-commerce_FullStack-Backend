'use strict';

const { totalOfOrders, maxOrderItemsInOrder, maxProductQuantityInOrderItem } = require("../config/seedParams.js");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const { default: PRODUCT_STATUS } = await import("../../utils/enums/productStatus.js");

        // Get random Sellers and Users
        const sellers = await queryInterface.sequelize.query(
            "SELECT * FROM users WHERE role = 'SELLER';",
            { type: Sequelize.QueryTypes.SELECT },
        );
        const users = await queryInterface.sequelize.query(
            "SELECT * FROM users WHERE role = 'USER';",
            { type: Sequelize.QueryTypes.SELECT },
        );

        // Create orders
        const orders = [];
        const productStatus = Object.keys(PRODUCT_STATUS);
        const allProductsByOrder = [];
        for (let i = 0; i < totalOfOrders; i++) {
            // All products in the order
            const randomOrderProductsQuantity = Math.floor(Math.random() * maxOrderItemsInOrder) + 1;

            const orderProducts = new Map(); // Prevent duplicate products
            for (let j = 0; j < randomOrderProductsQuantity; j++) {
                const randomProduct = await queryInterface.sequelize.query(
                    "SELECT * FROM products ORDER BY RANDOM() LIMIT 1;",
                    { type: Sequelize.QueryTypes.SELECT },
                );
                const randomProductQuantity = Math.floor(Math.random() * maxProductQuantityInOrderItem) + 1;

                orderProducts.set(randomProduct[0].id, {
                    ...randomProduct[0],
                    quantity: randomProductQuantity,
                });
            }

            allProductsByOrder.push(Array.from(orderProducts.values()));

            const total = Array.from(orderProducts.values()).reduce(
                (total, product) => total + product.price * product.quantity,
                0
            );
            const randomStatus = productStatus[Math.floor(Math.random() * productStatus.length)];
            const randomUser = users[Math.floor(Math.random() * users.length)];
            const randomSeller = sellers[Math.floor(Math.random() * sellers.length)];
            orders.push({
                total: Number(total.toFixed(2)),
                status: randomStatus,
                client_id: randomUser.id,
                seller_id: randomSeller.id,
            });
        }

        const insertedOrders = await queryInterface.bulkInsert("orders", orders, { returning: true });


        // Create OrderItems
        const orderItems = [];
        for (let i = 0; i < insertedOrders.length; i++) {
            const orderId = insertedOrders[i].id;
            const products = allProductsByOrder[i];

            products.forEach(product => {
                orderItems.push({
                    order_id: orderId,
                    product_id: product.id,
                    quantity: product.quantity,
                    price: product.price,
                    subtotal: product.price * product.quantity,
                });
            });
        }

        await queryInterface.bulkInsert("order_items", orderItems, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("order_items", null, {});
        await queryInterface.bulkDelete("orders", null, {});
    }
};
