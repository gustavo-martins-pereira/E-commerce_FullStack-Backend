import db from "../db/models/index.js";

const { Product, Image } = db;

async function createProduct({ name, description, price, ownerId, imageId }) {
    return await Product.create({ name, description, price, ownerId, imageId });
}

async function getAllProducts() {
    return await Product.findAll({ include: Image });
}

async function getProductById(id) {
    return await Product.findByPk(id, { include: Image });
}

async function getProductByName(name) {
    return await Product.findOne({ where: { name } });
}

async function getProductsBySellerId(sellerId) {
    return await Product.findAll({
        where: {
            ownerId: sellerId
        },
        include: Image,
    });
}

async function updateProductById(id, updatedProduct) {
    return await Product.update(updatedProduct, {
        where: { id },
        returning: true,
    });
}

async function deleteProductById(id) {
    return await Product.destroy({ where: { id } });
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
