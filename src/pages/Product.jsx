import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { updateCartItem } from "../service/cartService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const { refreshCart, cartId, cart } = useCart();
  const { products } = useProduct();
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (products && products.length > 0) {
      setLoading(false);
      setError("");
    }
  }, [products]);

  const handleAddToCart = async (product) => {
    if (!user) {
      toast.error("Bạn chưa đăng nhập");
    } else {
      try {
        const existingItem = cart.find(
          (item) => item.productId === product.productId
        );

        const payload = {
          cartItemId: existingItem ? existingItem.cartItemId : 0,
          cartId: cartId,
          productId: product.productId,
          quantity: existingItem ? existingItem.quantity + 1 : 1,
        };
        await updateCartItem(payload);
        toast.success("Đã thêm vào giỏ hàng!");
        await refreshCart();
      } catch (err) {
        console.error(err);
        toast.error("Thêm vào giỏ hàng thất bại!");
      }
    }
  };

  const handleProductClick = (productId) => {
    if (!productId) return;
    navigate(`/product/${productId}`);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setCurrentPage(1);
  };

  const filteredProducts = products.filter((p) => {
    const matchName = p.productName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const discountedPrice = p.isDiscount
      ? p.productPrice * (1 - p.discountPercent / 100)
      : p.productPrice;
    const matchMin = minPrice ? discountedPrice >= Number(minPrice) : true;
    const matchMax = maxPrice ? discountedPrice <= Number(maxPrice) : true;
    return matchName && matchMin && matchMax;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  if (!products || products.length === 0) {
    return (
      <div className="flex w-full h-screen items-center justify-center bg-[#e0f2fe]">
        <div className="text-center text-gray-500 text-lg">
          Không có sản phẩm nào
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center justify-center bg-[#e0f2fe] p-4">
      <div className="flex flex-col w-full max-w-[1200px] min-h-screen bg-white rounded-2xl shadow-lg p-6">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-sky-800 tracking-tight">
            Tất cả sản phẩm
          </h1>
          <p className="text-gray-600 mt-2">
            Khám phá hàng trăm sản phẩm chất lượng cho ngôi nhà của bạn
          </p>
        </div>

        {/* Tìm kiếm & lọc */}
        <div className="flex flex-col md:flex-row md:items-end gap-4 mb-8">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tìm theo tên
            </label>
            <input
              type="text"
              placeholder="Nhập tên sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-400"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Giá tối thiểu
              </label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-400"
                placeholder="0"
                min={0}
              />
            </div>
          </div>
          <button
            onClick={handleResetFilters}
            className="mt-2 md:mt-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded-lg text-gray-700 font-semibold"
          >
            Xóa bộ lọc
          </button>
        </div>

        <div className="text-sm text-gray-500 mb-4">
          Hiển thị {filteredProducts.length} sản phẩm tìm thấy
        </div>

        {error && (
          <div className="text-center p-2 rounded bg-yellow-100 text-yellow-800 font-medium">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-500 text-lg mt-8">
            Đang tải sản phẩm...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {paginatedProducts.map((product) => {
                const discountedPrice = product.isDiscount
                  ? product.productPrice -
                    (product.productPrice * product.discountPercent) / 100
                  : product.productPrice;

                return (
                  <div
                    key={product.productId}
                    className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md"
                    onClick={() => handleProductClick(product.productId)}
                    style={{
                      cursor: product.productId ? "pointer" : "not-allowed",
                    }}
                  >
                    <Link
                      className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                      to={`/product/${product.productId}`}
                    >
                      <img
                        className="object-cover w-full"
                        src={
                          product.productImage
                            ? `/img/${product.productImage}`
                            : "default-image.jpg"
                        }
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
                        {searchTerm ? (
                          <mark className="bg-yellow-200">
                            {product.productName}
                          </mark>
                        ) : (
                          product.productName
                        )}
                      </h5>
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
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        className="mt-4 w-full flex items-center justify-center rounded-md bg-sky-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-700 transition"
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
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 flex justify-center gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 rounded-lg border transition font-semibold text-sm ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-600 border-blue-400 hover:bg-blue-50"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default Product;
