import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCategoryById } from "../service/categoryService";

export default function Category() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const data = await getCategoryById(id);
        setCategory(data);
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCategory();
  }, [id]);

  if (loading) return <div className="text-center p-6">Đang tải sản phẩm...</div>;

  if (!category) return <div className="text-center p-6">Không tìm thấy danh mục.</div>;

  const { categoryName, description, products } = category;
  console.log(category)

  return (
    <div className="flex w-full flex-col items-center justify-center bg-[#e0f2fe] p-4">
      <div className="flex flex-col w-full max-w-[1200px] min-h-screen bg-white rounded-2xl shadow-lg p-6">
        {/* Tiêu đề danh mục */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-sky-800 tracking-tight">
            Danh mục: {categoryName}
          </h1>
          <p className="text-gray-600 mt-2">{description}</p>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-2">
          {products.length > 0 ? (
            products.map((product) => {
              const discountedPrice = product.isDiscount
                ? product.productPrice - (product.productPrice * product.discountPercent) / 100
                : product.productPrice;

              return (
                <div
                  key={product.productId}
                  className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md"
                >
                  <a
                    className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                    href={`/product/${product.productId}`}
                  >
                    <img
                      className="object-cover w-full"
                      src={`/img/${product.productImage}`}
                      alt={product.productName}
                    />
                    {product.isDiscount && (
                      <span className="absolute top-0 left-0 m-2 rounded-full bg-rose-600 px-2 text-center text-sm font-medium text-white">
                        {product.discountPercent}% OFF
                      </span>
                    )}
                  </a>
                  <div className="mt-4 px-5 pb-5">
                    <h5 className="text-xl font-semibold text-slate-800 truncate">
                      {product.productName}
                    </h5>

                    {/* Rating */}
                    <div className="mt-2 mb-5 flex items-center justify-between">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-5 w-5 ${
                              product.rating && i < Math.round(product.rating)
                                ? "text-yellow-300"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-2 text-sm text-yellow-700 font-medium">
                          {product.rating ? product.rating.toFixed(1) : "0.0"}
                        </span>
                      </div>
                    </div>

                    {/* Giá */}
                    <div>
                      <p>
                        <span className="text-3xl font-bold text-slate-900">
                          ₫{discountedPrice.toLocaleString()}
                        </span>
                        {product.isDiscount && (
                          <span className="text-sm text-slate-500 line-through ml-2">
                            ₫{product.productPrice.toLocaleString()}
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Thêm vào giỏ */}
                    <a
                      href="#"
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
                    </a>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="col-span-full text-gray-500">Không có sản phẩm nào trong danh mục này.</p>
          )}
        </div>
      </div>
    </div>
  );
}
