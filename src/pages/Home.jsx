import { getAllProducts } from "../service/productService";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";

export default function Home() {
  const [homeProducts, setHomeProducts] = useState([]);
  const { setProducts } = useProduct();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleProductClick = (productId) => {
    if (!productId) return;
    navigate(`/product/${productId}`);
  };

  useEffect(() => {
    setLoading(true);
    getAllProducts()
      .then((data) => {
        setHomeProducts(data);
        setProducts(data);
      })
      .catch((err) =>
        setError(err?.response?.data?.message || "Lỗi khi tải sản phẩm")
      )
      .finally(() => setLoading(false));
  }, [setProducts]);
  
  localStorage.setItem("products", homeProducts);

  if (!homeProducts) {
    console.log(error);
  }

  const hotProducts = homeProducts
    .filter((product) => product.isHot === true)
    .slice(0, 4);

  const newProducts = homeProducts
    .filter((product) => product.isNew === true)
    .slice(0, 6);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#e0f2ff]">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen w-full">
          <div className="text-blue-600 text-lg font-semibold">
            Đang tải sản phẩm...
          </div>
        </div>
      ) : (
        <>
          {/* layout img-head */}
          <div className="w-full h-[700px] bg-gradient-to-b from-[#d0eaff] to-[#e0f2ff]">
            <div className="flex flex-col w-full h-full overflow-hidden rounded">
              <img
                src="/img/head.png"
                alt=""
                className="w-full h-full object-cover sm:h-[80%]"
              />
              <div className="p-6 pb-6 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 bg-white/90 backdrop-blur-md text-gray-900 rounded-lg shadow-xl">
                <div className="space-y-2">
                  <a
                    rel="noopener noreferrer"
                    href="/"
                    className="inline-block text-3xl font-bold"
                  >
                    Trang chủ QuLyn <br /> Công Nghệ - Đời Sống - Văn Học
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* layout sản phẩm nổi bật */}
          <div className="py-16 w-full bg-white">
            <div className="container px-6 mx-auto space-y-12">
              <div className="text-center space-y-2">
                <h2 className="text-[40px] font-extrabold text-gray-900">
                  Các sản phẩm nổi bật
                </h2>
                <p className="text-lg text-gray-600">
                  Những sản phẩm chất lượng theo thương hiệu
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                {hotProducts.map((product) => (
                  <div
                    key={product.productId}
                    onClick={() => handleProductClick(product.productId)}
                    className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02]"
                  >
                    <img
                      alt={product.productName}
                      className="object-cover w-full h-52"
                      src={`/img/${product.productImage}`}
                    />
                    <div className="p-5 flex flex-col gap-2">
                      <a
                        rel="noopener noreferrer"
                        href={`/category/${product.categoryName.toLowerCase()}`}
                        className="text-xs uppercase text-indigo-600 font-medium"
                      >
                        {product.categoryName}
                      </a>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {product.productName}
                      </h3>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>
                          {new Date(product.createdAt).toLocaleDateString(
                            "vi-VN"
                          )}
                        </span>
                        <span>{product.rating}★</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Danh sách sản phẩm bán chạy */}
          <div className="py-16 w-full bg-[#e6f4ff]">
            <div className="container max-w-6xl px-6 mx-auto space-y-12">
              <div className="text-center space-y-2">
                <h2 className="text-[40px] font-extrabold text-gray-900">
                  Những sản phẩm bán chạy
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {newProducts.map((product) => (
                  <div
                    key={product.productId}
                    onClick={() => handleProductClick(product.productId)}
                    className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02]"
                  >
                    <img
                      alt=""
                      className="object-cover w-full h-44"
                      src={`/img/${product.productImage}`}
                    />
                    <div className="p-5 space-y-2">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {product.productName}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {product.createdAt}
                      </span>
                      <p className="text-gray-700 text-sm">
                        {product.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Liên hệ */}
          <div className="py-16 w-full bg-white">
            <div className="grid w-full grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
              <div className="py-6 md:py-0 md:px-6">
                <h1 className="text-4xl font-bold text-gray-900">
                  Liên hệ với chúng tôi
                </h1>
                <p className="pt-2 pb-4 text-gray-600">
                  Điền thông tin và chúng tôi sẽ liên hệ với bạn sớm nhất
                </p>
                <div className="space-y-4 text-gray-700">
                  <p className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>
                      Tòa T, Công viên phần mềm Quang Trung, Quận 12, TPHCM
                    </span>
                  </p>
                  <p className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                    </svg>
                    <span>090-9900-909</span>
                  </p>
                  <p className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                    <span>java5@gmail.com</span>
                  </p>
                </div>
              </div>
              <form
                noValidate
                className="flex flex-col py-6 space-y-6 md:py-0 md:px-6"
              >
                <label className="block">
                  <span className="mb-1">Họ và Tên</span>
                  <input
                    type="text"
                    placeholder="Spring boot"
                    className="block w-full px-4 py-3 rounded-lg border shadow-sm focus:ring focus:ring-indigo-300"
                  />
                </label>
                <label className="block">
                  <span className="mb-1">Địa chỉ Email</span>
                  <input
                    type="email"
                    placeholder="java5@gmail.com"
                    className="block w-full px-4 py-3 rounded-lg border shadow-sm focus:ring focus:ring-indigo-300"
                  />
                </label>
                <label className="block">
                  <span className="mb-1">Thắc mắc</span>
                  <textarea
                    rows="3"
                    className="block w-full px-4 py-3 rounded-lg border shadow-sm focus:ring focus:ring-indigo-300"
                  ></textarea>
                </label>
                <button
                  type="button"
                  className="self-center px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow"
                >
                  Xác nhận
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
