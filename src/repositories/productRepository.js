import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createProduct({ name, description, price, ownerId, imageName }) {
    return await prisma.products.create({
        data: {
            name,
            description,
            price,
            ownerId,
            image_name: imageName,
        },
    });
}

async function getAllProducts() {
    return await prisma.products.findAll();
}

async function getProductById(id) {
    return await prisma.products.findByPk(id);
}

async function getProductByName(name) {
    return await prisma.products.findFirst({ where: { name } });
}

async function getProductsBySellerId(sellerId) {
    return await prisma.products.findAll({
        where: {
            ownerId: sellerId
        },
    });
}

async function updateProductById(id, updatedProduct) {
    return await prisma.products.update(updatedProduct, {
        where: { id },
        returning: true,
    });
}

async function deleteProductById(id) {
    return await prisma.products.destroy({ where: { id } });
}

export {
    createProduct,
    getAllProducts,
    getProductById,
    getProductByName,
    getProductsBySellerId,
    updateProductById,
    deleteProductById,
};
