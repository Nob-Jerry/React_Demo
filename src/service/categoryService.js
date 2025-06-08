import categoryApi from '../api/categoryApi';

const getAllCategories = async () => {
    const response = await categoryApi.getAll();
    return response.data.data.map(item => ({
        categoryId: item.categoryId,
        categoryName: item.categoryName,
        categoryDescription: item.description,
        products: item.product?.map(product => ({   
            productId: product.productId,
            productName: product.productName,
            productPrice: product.productPrice,
            productQuantity: product.productQuantity,
            description: product.description,
            productImage: product.imageUrl,
            createdAt: product.createdAt,
            isHot: product.isHot,
            isDiscount: product.isDiscount,
            isNew: product.isNew,
            discountPercent: product.discountPercent,
            rating: product.rating || 0.0,
        })) || []
    }));
}
const getCategoryById = async (categoryId) => {
  const response = await categoryApi.getById(categoryId);
  const item = response.data.data;
  return {
    categoryId: item.categoryId,
    categoryName: item.categoryName,
    categoryDescription: item.description, 
    products: item.products?.map(product => ({
      productId: product.productId,
      productName: product.productName,
      productPrice: product.productPrice,
      productQuantity: product.productQuantity,
      description: product.description,
      productImage: product.imageUrl,
      createdAt: product.createdAt,
      isHot: product.isHot,
      isDiscount: product.isDiscount,
      isNew: product.isNew,
      discountPercent: product.discountPercent,
      rating: product.rating || 0.0,
    })) || []
  };
};

const saveCategory = async (category) => {
    const response = await categoryApi.save(category);
    return response.data.data;
}
const updateCategory = async (category) => {
    const response = await categoryApi.update(category);
    return response.data.data;
}
const deleteCategory = async (categoryId) => {
    const response = await categoryApi.delete(categoryId);
    return response.data.message;
}
export { getAllCategories, getCategoryById, saveCategory, updateCategory, deleteCategory };