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
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-blue-600 text-lg font-semibold">
          Đang tải sản phẩm...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600 text-lg font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-sky-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/30">
        <div className="flex justify-center items-start">
          <img
            src={
              product.productImage
                ? `/img/${product.productImage}`
                : "default-image.jpg"
            }
            alt={product.productName}
            className="rounded-xl object-cover shadow-md max-h-[400px]"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">
            {product.productName}
          </h1>
          <p className="text-gray-600 text-sm">{product.description}</p>

          <div className="text-xl font-bold text-blue-700">
            {formatPrice(product.productPrice)}
            {product.isDiscount && product.discountPercent > 0 && (
              <span className="ml-2 text-sm text-red-500 font-medium">
                (-{product.discountPercent}%)
              </span>
            )}
            <div className="text-x font-bold text-gray-400 line-through">
              {formatPrice(product.productPrice)}
            </div>
          </div>

          <ul className="text-gray-700 text-sm space-y-1">
            <li>
              <strong>Danh mục:</strong> {product.categoryName || "Không có"}
            </li>
            <li>
              <strong>Số lượng còn:</strong>{" "}
              {product.productQuantity || "Không có"}
            </li>
            <li>
              <strong>Ngày tạo:</strong>{" "}
              {product.createdAt
                ? new Date(product.createdAt).toLocaleDateString("vi-VN")
                : ""}
            </li>
            <li>
              <strong>Đánh giá:</strong> {product.rating?.toFixed(1)} ★
            </li>
          </ul>

          <button
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold transition"
            onClick={() => handleAddToCart(product)}
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Gợi ý sản phẩm tương tự
        </h2>

        {suggestedProducts.length === 0 ? (
          <p className="text-gray-500">Không có sản phẩm tương tự</p>
        ) : (
          <div className="grid md:grid-cols-4 gap-6">
            {suggestedProducts
              .filter((p) => p.productId !== product.productId)
              .map((item) => (
                <div
                  key={item.productId}
                  onClick={() => handleProductClick(item.productId)}
                  className="bg-white/60 backdrop-blur rounded-xl p-4 shadow hover:shadow-lg transition"
                >
                  <img
                    src={
                      item.productImage
                        ? `/img/${item.productImage}`
                        : "default-image.jpg"
                    }
                    alt={item.productName}
                    className="rounded-lg w-full h-40 object-cover mb-3"
                  />
                  <h3 className="font-semibold text-gray-800">
                    {item.productName}
                  </h3>
                  <p className="text-blue-600 font-bold text-sm">
                    {formatPrice(item.productPrice)}
                  </p>
                  <button
                    className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-1.5 rounded text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(item);
                    }}
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default ProductDetail;
