import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../service/productService";
import { useCart } from "../context/CartContext";
import { getCategoryById } from "../service/categoryService";
import { updateCartItem } from "../service/cartService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  const { id } = useParams();
  const { cart, cartId, refreshCart } = useCart();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError("");
    getProductById(id)
      .then(setProduct)
      .catch((err) =>
        setError(err?.response?.data?.message || "Lỗi khi tải sản phẩm")
      )
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    const fetchSuggested = async () => {
      if (product?.categoryId) {
        try {
          const categoryData = await getCategoryById(product.categoryId);
          setSuggestedProducts(
            categoryData.products?.filter(
              (p) => p.productId !== product.productId
            ) || []
          );
        } catch (err) {
          console.error("Lỗi khi lấy sản phẩm gợi ý:", err);
        }
      }
    };
    fetchSuggested();
  }, [product]);

  const handleAddToCart = async (product) => {
    try {
      const existingItem = cart.find(
        (item) => item.productId === product.productId
      );

      const payload = {
        cartItemId: existingItem ? existingItem.cartItemId : 0,
        cartId,
        productId: product.productId,
        quantity: existingItem ? existingItem.quantity + 1 : 1,
      };

      await updateCartItem(payload);
      toast.success("Đã thêm vào giỏ hàng!");
      await refreshCart();
    } catch (err) {
      console.error(err);
      toast.error("Thêm sản phẩm thất bại!");
    }
  };

  const handleProductClick = (productId) => {
    if (!productId) return;
    navigate(`/product/${productId}`);
  };

  const formatPrice = (price) =>
    price?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  if (loading) {
    return (
      <div className="flex w-full h-screen items-center justify-center bg-[#e0f2fe]">
        <div className="text-center text-sky-800 text-lg font-semibold">
          Đang tải sản phẩm...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full h-screen items-center justify-center bg-[#e0f2fe]">
        <div className="text-center text-red-600 text-lg font-semibold">{error}</div>
      </div>
    );
  }

  const discountedPrice = product.isDiscount
    ? product.productPrice * (1 - product.discountPercent / 100)
    : product.productPrice;

  return (
    <div className="flex w-full flex-col items-center justify-center bg-[#e0f2fe] p-4">
      <div className="flex flex-col w-full max-w-[1200px] min-h-screen bg-white rounded-2xl shadow-lg p-6">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <span className="hover:text-sky-600 cursor-pointer" onClick={() => navigate('/')}>Trang chủ</span>
          <span className="mx-2">/</span>
          <span className="hover:text-sky-600 cursor-pointer" onClick={() => navigate('/product')}>Sản phẩm</span>
          <span className="mx-2">/</span>
          <span className="text-sky-800 font-medium">{product.productName}</span>
        </div>

        {/* Product Detail Section */}
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          {/* Product Image */}
          <div className="flex justify-center items-start">
            <div className="relative">
              <img
                src={
                  product.productImage
                    ? `/img/${product.productImage}`
                    : "default-image.jpg"
                }
                alt={product.productName}
                className="rounded-xl object-cover shadow-lg max-h-[500px] w-full"
              />
              {product.isDiscount && product.discountPercent > 0 && (
                <div className="absolute top-4 left-4 bg-rose-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  -{product.discountPercent}%
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-extrabold text-sky-800 tracking-tight mb-3">
                {product.productName}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`h-6 w-6 ${
                      product.rating && index < Math.round(product.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-3 text-lg font-semibold text-yellow-700">
                  {product.rating ? product.rating.toFixed(1) : "0.0"}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="text-4xl font-bold text-sky-800">
                {formatPrice(discountedPrice)}
              </div>
              {product.isDiscount && product.discountPercent > 0 && (
                <div className="text-xl text-gray-500 line-through">
                  {formatPrice(product.productPrice)}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Thông tin sản phẩm</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Danh mục:</span>
                  <span className="ml-2 text-gray-600">{product.categoryName || "Không có"}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Số lượng còn:</span>
                  <span className="ml-2 text-gray-600">{product.productQuantity || "Không có"}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Ngày tạo:</span>
                  <span className="ml-2 text-gray-600">
                    {product.createdAt
                      ? new Date(product.createdAt).toLocaleDateString("vi-VN")
                      : "Không có"}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Trạng thái:</span>
                  <span className="ml-2 text-green-600 font-medium">
                    {product.productQuantity > 0 ? "Còn hàng" : "Hết hàng"}
                  </span>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              className="w-full bg-sky-600 hover:bg-sky-700 text-white py-4 rounded-xl font-semibold text-lg transition duration-200 flex items-center justify-center space-x-2"
              onClick={() => handleAddToCart(product)}
              disabled={product.productQuantity <= 0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>
                {product.productQuantity > 0 ? "Thêm vào giỏ hàng" : "Hết hàng"}
              </span>
            </button>
          </div>
        </div>

        {/* Suggested Products Section */}
        <div className="border-t border-gray-200 pt-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-sky-800 tracking-tight mb-2">
              Sản phẩm tương tự
            </h2>
            <p className="text-gray-600">
              Khám phá thêm các sản phẩm cùng danh mục
            </p>
          </div>

          {suggestedProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Không có sản phẩm tương tự</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {suggestedProducts
                .filter((p) => p.productId !== product.productId)
                .map((item) => {
                  const itemDiscountedPrice = item.isDiscount
                    ? item.productPrice * (1 - item.discountPercent / 100)
                    : item.productPrice;

                  return (
                    <div
                      key={item.productId}
                      onClick={() => handleProductClick(item.productId)}
                      className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer border border-gray-200"
                    >
                      <div className="relative">
                        <img
                          src={
                            item.productImage
                              ? `/img/${item.productImage}`
                              : "default-image.jpg"
                          }
                          alt={item.productName}
                          className="w-full h-48 object-cover"
                        />
                        {item.isDiscount && item.discountPercent > 0 && (
                          <div className="absolute top-2 left-2 bg-rose-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            -{item.discountPercent}%
                          </div>
                        )}
                      </div>
                      <div className="p-4 space-y-2">
                        <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">
                          {item.productName}
                        </h3>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, index) => (
                            <svg
                              key={index}
                              className={`h-4 w-4 ${
                                item.rating && index < Math.round(item.rating)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="text-xs text-yellow-700 font-medium">
                            {item.rating ? item.rating.toFixed(1) : "0.0"}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="text-lg font-bold text-sky-800">
                            {formatPrice(itemDiscountedPrice)}
                          </div>
                          {item.isDiscount && item.discountPercent > 0 && (
                            <div className="text-sm text-gray-500 line-through">
                              {formatPrice(item.productPrice)}
                            </div>
                          )}
                        </div>
                        <button
                          className="w-full bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-lg text-sm font-semibold transition duration-200 flex items-center justify-center space-x-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(item);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          <span>Thêm vào giỏ</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default ProductDetail;
