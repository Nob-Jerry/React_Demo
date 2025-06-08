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
  imageUrl: "",
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
    <div className="p-4 bg-blue-50 min-h-screen text-blue-900">
      <h1 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h1>

      {/* Form */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium">ID sản phẩm</label>
          <input
            name="productId"
            value={product.productId}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Tên sản phẩm</label>
          <input
            name="productName"
            value={product.productName}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Giá</label>
          <input
            name="productPrice"
            type="number"
            value={product.productPrice}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Số lượng</label>
          <input
            name="productQuantity"
            type="number"
            value={product.productQuantity}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">% giảm giá</label>
          <input
            name="discountPercent"
            type="number"
            value={product.discountPercent}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">ID danh mục</label>
          <input
            name="categoryId"
            value={product.categoryId}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="col-span-2">
          <label className="block mb-1 font-medium">Mô tả</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="border p-2 rounded w-full h-32 resize-y"
            placeholder="Nhập mô tả sản phẩm..."
          />
        </div>
        <div className="col-span-2">
          <label className="block mb-1 font-medium">URL hình ảnh</label>
          <input
            name="imageUrl"
            value={product.productImage}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="flex items-center gap-4 col-span-2 mt-2">
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
      <div className="flex gap-4 mb-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleSave}
        >
          Lưu
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          onClick={handleUpdate}
        >
          Cập nhật
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={handleDelete}
        >
          Xoá
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={resetForm}
        >
          Làm mới
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          className="border px-2 py-1 rounded w-1/2"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <table className="w-full table-auto border border-blue-300 text-blue-900">
        <thead className="bg-blue-200">
          <tr className="text-center">
            <th>Ảnh</th>
            <th>ID</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Danh mục</th>
            <th>Mô tả</th>
            <th>Hot</th>
            <th>Giảm giá</th>
            <th>Mới</th>
            <th>% Giảm</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((p) => (
            <tr
              key={p.productId}
              className="hover:bg-blue-100 cursor-pointer text-center"
              onClick={() => handleRowClick(p)}
            >
              <td>
                <img
                  src={`/img/${p.productImage}`}
                  alt="product"
                  className="w-16 h-16 object-cover mx-auto"
                />
              </td>
              <td>{p.productId}</td>
              <td>{p.productName}</td>
              <td>{p.productPrice}</td>
              <td>{p.productQuantity}</td>
              <td>{p.categoryId}</td>
              <td>{p.description}</td>
              <td>{p.isHot ? "✔" : ""}</td>
              <td>{p.isDiscount ? "✔" : ""}</td>
              <td>{p.isNew ? "✔" : ""}</td>
              <td>{p.discountPercent}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
