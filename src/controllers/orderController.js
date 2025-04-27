import { validationResult } from "express-validator";

import { createOrderUseCase } from "../services/order/createOrderUsecase.js";
import { createOrderItemUsecase } from "../services/orderItem/createOrderItemUsecase.js";
import { getOrdersByClientIdUsecase } from "../services/order/getOrdersByClientIdUsecase.js";
import { getOrdersBySellerIdUsecase } from "../services/order/getOrdersBySellerIdUsecase.js";
import { getOrderItemsByOrderIdUsecase } from "../services/orderItem/getOrderItemsByOrderIdUsecase.js";
import { getOrderByIdUsecase } from "../services/order/getOrderByIdUsecase.js";
import { getProductByIdUsecase } from "../services/product/getProductByIdUsecase.js";
import { updateOrderStatusByIdUsecase } from "../services/order/updateOrderStatusByIdUsecase.js";
import CustomError from "../utils/errors/customError.js";
import extractJwtPayloadProperty from "../utils/extractJwtPayloadProperty.js";
import { getImageUrl } from "../aws/services/s3Service.js";

async function createOrder(request, response) {
    const result = validationResult(request);

    if(!result.isEmpty()) {
        return response.status(400).json({ errors: result.array() });
    }

    try {
        const {
            total,
            status,
            clientId,
            sellerId,
            orderItems,
        } = request.body;

        const order = await createOrderUseCase({ total, status, clientId, sellerId });
        
        const createdOrderItems = await Promise.all(
            orderItems.map(async orderItem => await createOrderItemUsecase({
                quantity: orderItem.quantity,
                price: orderItem.price,
                subtotal: orderItem.subtotal,
                orderId: order.id,
                productId: orderItem.productId,
            }))
        );

        return response.status(201).json({ order, orderItems: createdOrderItems });
    } catch(error) {
        return response.status(error instanceof CustomError ? error.statusCode : 500).json({ error: error.message});
    }
}

async function getOrderById(request, response) {
    const result = validationResult(request);

    if(!result.isEmpty()) {
        return response.status(400).json({ errors: result.array() });
    }

    try {
        const { id } = request.params;
        const username = extractJwtPayloadProperty(request, "username");

        const order = await getOrderByIdUsecase(id, username);
        let orderItems = await getOrderItemsByOrderIdUsecase(order.id);

        orderItems = await Promise.all(orderItems.map(async orderItem => {
            const product = await getProductByIdUsecase(orderItem.productId);
            delete orderItem.dataValues.productId;

            return {
                ...orderItem.dataValues,
                product: {
                    ...product.dataValues,
                    imageUrl: await getImageUrl(product.imageName),
                },
            };
        }));

        order.dataValues.orderItems = orderItems;

        return response.status(200).json(order);
    } catch(error) {
        return response.status(error instanceof CustomError ? error.statusCode : 500).json({ error: error.message});
    }
}

async function getOrdersByClientId(request, response) {
    const result = validationResult(request);

    if(!result.isEmpty()) {
        return response.status(400).json({ errors: result.array() });
    }

    try {
        const { clientId } = request.params;

        const orders = await getOrdersByClientIdUsecase(clientId);

        const ordersWithItems = await Promise.all(
            orders.map(async order => {
                const orderItems = await getOrderItemsByOrderIdUsecase(order.id);

                const orderItemsWithProducts = await Promise.all(orderItems.map(async orderItem => {
                    const product = await getProductByIdUsecase(orderItem.productId);
                    delete orderItem.dataValues.productId;

                    return {
                        ...orderItem.dataValues,
                        product: {
                            ...product.dataValues,
                            imageUrl: await getImageUrl(product.imageName),
                        },
                    };
                }));

                return { ...order.dataValues, orderItems: orderItemsWithProducts };
            })
        );

        return response.status(200).json(ordersWithItems);
    } catch(error) {
        return response.status(error instanceof CustomError ? error.statusCode : 500).json({ error: error.message});
    }
}

async function getOrdersBySellerId(request, response) {
    const result = validationResult(request);

    if(!result.isEmpty()) {
        return response.status(400).json({ errors: result.array() });
    }

    try {
        const { sellerId } = request.params;

        const orders = await getOrdersBySellerIdUsecase(sellerId);

        const ordersWithItems = await Promise.all(
            orders.map(async order => {
                const orderItems = await getOrderItemsByOrderIdUsecase(order.id);

                const orderItemsWithProducts = await Promise.all(orderItems.map(async orderItem => {
                    const product = await getProductByIdUsecase(orderItem.productId);
                    delete orderItem.dataValues.productId;

                    return {
                        ...orderItem.dataValues,
                        product: {
                            ...product.dataValues,
                            imageUrl: await getImageUrl(product.imageName),
                        },
                    };
                }));

                return { ...order.dataValues, orderItems: orderItemsWithProducts };
            })
        );

        return response.status(200).json(ordersWithItems);
    } catch(error) {
        return response.status(error instanceof CustomError ? error.statusCode : 500).json({ error: error.message});
    }
}

async function updateOrderStatusById(request, response) {
    const result = validationResult(request);

    if(!result.isEmpty()) {
        return response.status(400).json({ errors: result.array() });
    }

    try {
        const { id } = request.params;
        const { status } = request.body;

        const result = await updateOrderStatusByIdUsecase(id, status);

        return response.status(200).json(result);
    } catch(error) {
        return response.status(error instanceof CustomError ? error.statusCode : 500).json({ error: error.message});
    }
}

export {
    createOrder,
    getOrderById,
    getOrdersByClientId,
    getOrdersBySellerId,
    updateOrderStatusById,
};
