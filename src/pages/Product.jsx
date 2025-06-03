import React, { useEffect, useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { getAllProducts }  from "../service/productService";
const Product = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getAllProducts()
      .then(setProducts)
      .catch((err) =>
        setError(err?.response?.data?.message || "Lỗi khi tải sản phẩm")
      )
      .finally(() => setLoading(false));
  }, []);
  
  const handleProductClick = (productId) => {
    if (!productId) return; 
    navigate(`/product/${productId}`);
  }

  return (
    <div className="flex w-full flex-col items-center justify-center bg-[#e0f2fe] p-4">
      <div className="flex flex-col w-full max-w-[1200px] min-h-screen bg-white rounded-2xl shadow-lg p-6">
        {/* Tiêu đề trang */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-sky-800 tracking-tight">
            Tất cả sản phẩm
          </h1>
          <p className="text-gray-600 mt-2">
            Khám phá hàng trăm sản phẩm chất lượng cho ngôi nhà của bạn
          </p>
        </div>

        {/* Thông báo lỗi */}
        {error && (
          <div className="text-center p-2 rounded bg-yellow-100 text-yellow-800 font-medium">
            {error}
          </div>
        )}

        {/* Đang tải */}
        {loading ? (
          <div className="text-center text-gray-500 text-lg mt-8">
            Đang tải sản phẩm...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => {
              const discountedPrice = product.isDiscount
                ? product.productPrice -
                  (product.productPrice * product.discountPercent) / 100
                : product.productPrice;

              return (
                <div
                  key={product.productId}
                  className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md"
                  onClick={() => handleProductClick(product.productId)}
                  style={{ cursor: product.productId ? "pointer" : "not-allowed" }}
                >
                  <Link
                    className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                    to={`/product/${product.productId}`}
                  >
                    <img
                      className="object-cover w-full"
                      src={product.productImage ? `/img/${product.productImage}` : "default-image.jpg"}
                      alt={product.productName}
                    />
                    {product.isDiscount && (
                      <span className="absolute top-0 left-0 m-2 rounded-full bg-rose-600 px-2 text-center text-sm font-medium text-white">
                        {product.discountPercent}% OFF
                      </span>
                    )}
                  </Link>
                  <div className="mt-4 px-5 pb-5">
                    <h5 className="text-xl font-semibold text-slate-800 truncate">
                      {product.productName}
                    </h5>

                    {/* Rating */}
                    <div className="mt-2 mb-5 flex items-center justify-between">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, index) => (
                          <svg
                            key={`star-${product.productId}-${index}`}
                            aria-hidden="true"
                            className="h-5 w-5 text-yellow-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-3 rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                          5.0
                        </span>
                      </div>
                    </div>

                    {/* Giá và giảm giá */}
                    <div>
                      <p>
                        <span className="text-3xl font-bold text-slate-900">
                          ${discountedPrice.toLocaleString()}
                        </span>
                        {product.isDiscount && (
                          <span className="text-sm text-slate-500 line-through ml-2">
                            ${product.productPrice.toLocaleString()}
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Thêm vào giỏ */}
                    <Link
                      to="/"
                      onClick={(e) => e.stopPropagation()} 
                      className="mt-4 flex items-center justify-center rounded-md bg-sky-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-700 transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 h-6 w-6"
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
                      Thêm vào giỏ
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
