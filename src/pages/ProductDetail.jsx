import React, { useState, useEffect } from "react";
import { getProductById } from "../service/productService";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
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
        {/* Ảnh sản phẩm */}
        <div className="flex justify-center items-start">
          <img
            src={product.productImage ? `/img/${product.productImage}` : "default-image.jpg"}
            alt={product.productName}
            className="rounded-xl object-cover shadow-md max-h-[400px]"
          />
        </div>

        {/* Thông tin sản phẩm */}
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

          <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold transition">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      {/* Gợi ý sản phẩm */}
      <div className="max-w-6xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Gợi ý sản phẩm tương tự
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { name: "Samsung S24 Ultra", img: "s24.jpg", price: 24990000 },
            { name: "Xiaomi 14 Pro", img: "mi14.jpg", price: 18990000 },
            { name: "iPhone 14 Pro Max", img: "iphone14.jpg", price: 25990000 },
            { name: "Oppo Find X7", img: "oppo.jpg", price: 17990000 },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/60 backdrop-blur rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={item.img}
                alt={item.name}
                className="rounded-lg w-full h-40 object-cover mb-3"
              />
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <p className="text-blue-600 font-bold text-sm">
                {item.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              <button className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-1.5 rounded text-sm">
                Xem chi tiết
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
