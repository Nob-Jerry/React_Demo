/**
 * UI Redesign for Product Management Page
 * - Form in a card at the top
 * - Search bar right-aligned, consistent style
 * - Product table below, modern and consistent
 */
import { useState } from "react";
import { useProduct } from "../context/ProductContext";
import Swal from "sweetalert2";

const initialProduct = {
  productId: "",
  productName: "",
  productPrice: 0,
  productQuantity: 0,
  discountPercent: 0,
  categoryId: "",
  description: "",
  productImage: "",
  isHot: false,
  isDiscount: false,
  isNew: false,
};

export default function ProductManagement() {
  const { products, setProducts } = useProduct();
  const [product, setProduct] = useState(initialProduct);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    if (!product.productId.trim()) {
      Swal.fire("Lỗi", "ID sản phẩm không được để trống.", "error");
      return;
    }
    const existed = products.find((p) => p.productId === product.productId);
    if (existed) {
      Swal.fire(
        "Trùng ID",
        "Sản phẩm đã tồn tại. Vui lòng cập nhật thay vì thêm.",
        "warning"
      );
      return;
    }
    Swal.fire({
      title: "Xác nhận lưu?",
      icon: "question",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setProducts([...products, product]);
        resetForm();
        Swal.fire("Thành công", "Đã lưu sản phẩm.", "success");
      }
    });
  };

  const handleUpdate = () => {
    Swal.fire({
      title: "Xác nhận cập nhật?",
      icon: "question",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setProducts(
          products.map((p) => (p.productId === product.productId ? product : p))
        );
        resetForm();
        Swal.fire("Cập nhật thành công", "", "success");
      }
    });
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Xác nhận xoá?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setProducts(products.filter((p) => p.productId !== product.productId));
        resetForm();
        Swal.fire("Đã xoá", "", "success");
      }
    });
  };

  const resetForm = () => setProduct(initialProduct);
  const handleRowClick = (p) => setProduct({ ...p });

  const filteredProducts = products.filter((p) =>
    p.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-sky-800 mb-6">Quản lý sản phẩm</h1>
        {/* Form Card */}
        <div className="bg-blue-50 rounded-xl shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 font-medium">Tên sản phẩm</label>
              <input
                name="productName"
                value={product.productName}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Giá</label>
              <input
                name="productPrice"
                type="number"
                value={product.productPrice}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Số lượng</label>
              <input
                name="productQuantity"
                type="number"
                value={product.productQuantity}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">ID danh mục</label>
              <input
                name="categoryId"
                value={product.categoryId}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">% giảm giá</label>
              <input
                name="discountPercent"
                type="number"
                value={product.discountPercent}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">URL hình ảnh</label>
              <input
                name="productImage"
                value={product.productImage}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Mô tả</label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full h-20 resize-y"
                placeholder="Nhập mô tả sản phẩm..."
              />
            </div>
            <div className="flex items-center gap-4 md:col-span-2 mt-1">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isHot"
                  checked={product.isHot}
                  onChange={handleChange}
                />
                Hot
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isDiscount"
                  checked={product.isDiscount}
                  onChange={handleChange}
                />
                Giảm giá
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isNew"
                  checked={product.isNew}
                  onChange={handleChange}
                />
                Mới
              </label>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <button
              className="w-full md:w-auto bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 font-semibold"
              onClick={handleSave}
            >
              Lưu
            </button>
            <button
              className="w-full md:w-auto bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 font-semibold"
              onClick={handleUpdate}
            >
              Cập nhật
            </button>
            <button
              className="w-full md:w-auto bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 font-semibold"
              onClick={handleDelete}
            >
              Xoá
            </button>
            <button
              className="w-full md:w-auto bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 font-semibold"
              onClick={resetForm}
            >
              Làm mới
            </button>
          </div>
        </div>
        {/* Search Bar */}
        <div className="flex justify-end mb-4">
          <input
            className="border rounded-lg px-4 py-2 text-base w-full md:w-72"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* Product Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-blue-200 rounded-xl">
            <thead className="bg-blue-100">
              <tr className="text-center">
                <th className="p-2">Ảnh</th>
                <th className="p-2">ID</th>
                <th className="p-2">Tên</th>
                <th className="p-2">Giá</th>
                <th className="p-2">Số lượng</th>
                <th className="p-2">Danh mục</th>
                <th className="p-2">Mô tả</th>
                <th className="p-2">Hot</th>
                <th className="p-2">Giảm giá</th>
                <th className="p-2">Mới</th>
                <th className="p-2">% Giảm</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr
                  key={p.productId}
                  className="hover:bg-blue-50 cursor-pointer text-center"
                  onClick={() => handleRowClick(p)}
                >
                  <td className="p-2">
                    <img
                      src={`/img/${p.productImage}`}
                      alt="product"
                      className="w-16 h-16 object-cover mx-auto rounded"
                    />
                  </td>
                  <td className="p-2">{p.productId}</td>
                  <td className="p-2">{p.productName}</td>
                  <td className="p-2">{p.productPrice}</td>
                  <td className="p-2">{p.productQuantity}</td>
                  <td className="p-2">{p.categoryId}</td>
                  <td className="p-2 line-clamp-2 max-w-xs">{p.description}</td>
                  <td className="p-2">{p.isHot ? <span className="text-green-600 font-bold">✔</span> : ""}</td>
                  <td className="p-2">{p.isDiscount ? <span className="text-yellow-600 font-bold">✔</span> : ""}</td>
                  <td className="p-2">{p.isNew ? <span className="text-blue-600 font-bold">✔</span> : ""}</td>
                  <td className="p-2">{p.discountPercent}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
