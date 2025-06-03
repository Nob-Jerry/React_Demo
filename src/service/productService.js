import productApi from "../api/productApi";

const getAllProducts = async () =>{
    const response = await productApi.getAll();
    return response.data.data.map(item => ({
        productId: item.productId,
        productName: item.productName,
        productPrice: item.productPrice,
        productQuantity: item.productQuantity,
        categoryId: item.categoryId,
        categoryName: item.categoryName,
        description: item.description,
        productImage: item.imageUrl,
        createdAt: item.createdAt,
        isHot: item.isHot,
        isDiscount: item.isDiscount,
        isNew: item.isNew,
        discountPercent: item.discountPercent,
        rating: item.rating || 0.0,
    }))
}

const getProductById = async (productId) => {
    const response = await productApi.getById(productId);
    const item = response.data.data;
    return {
        productId: item.productId,
        productName: item.productName,
        productPrice: item.productPrice,
        productQuantity: item.productQuantity,
        categoryId: item.categoryId,
        categoryName: item.categoryName,
        description: item.description,
        productImage: item.imageUrl,
        createdAt: item.createdAt,
        isHot: item.isHot,
        isDiscount: item.isDiscount,
        isNew: item.isNew,
        discountPercent: item.discountPercent,
        rating: item.rating || 0.0,
    };
}

const saveProduct = async (product) => {
    const response = await productApi.save(product);
    return response.data.data;
}

const updateProduct = async (product) => {
    const response = await productApi.update(product);
    return response.data.data;
}

const deleteProduct = async (productId) => {
    const response = await productApi.delete(productId);
    return response.data.message;
}

export { getAllProducts, getProductById, saveProduct, updateProduct, deleteProduct };