import React, { useState } from "react";
import Swal from "sweetalert2";

export default function ProductBlock() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Áo Hoodie",
      price: 350000,
      quantity: 10,
      category: "Thời trang",
      description: "Áo nỉ hoodie phong cách Hàn Quốc",
      image: "",
      createdAt: "2025-05-28",
      isHot: true,
      isNew: true,
      isDiscount: false,
    },
  ]);

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    description: "",
    image: "",
    createdAt: new Date().toISOString().split("T")[0],
    isHot: false,
    isNew: false,
    isDiscount: false,
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCheckbox = (name, checked) => {
    setForm({ ...form, [name]: checked });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    const newProduct = {
      id: Date.now(),
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity),
    };
    setProducts([...products, newProduct]);
    resetForm();
    Swal.fire("Thành công", "Đã thêm sản phẩm", "success");
  };

  const handleEdit = () => {
    if (selectedProductId === null) {
      Swal.fire("Thông báo", "Vui lòng chọn sản phẩm để sửa", "info");
      return;
    }
    const updatedList = products.map((p) =>
      p.id === selectedProductId ? { ...p, ...form, price: Number(form.price), quantity: Number(form.quantity) } : p
    );
    setProducts(updatedList);
    resetForm();
    setSelectedProductId(null);
    Swal.fire("Đã sửa", "Sản phẩm đã được cập nhật", "success");
  };

  const handleDelete = async () => {
    if (selectedProductId === null) return;

    const result = await Swal.fire({
      title: "Bạn chắc chắn muốn xóa?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      setProducts(products.filter((p) => p.id !== selectedProductId));
      setSelectedProductId(null);
      resetForm();
      Swal.fire("Đã xóa", "Sản phẩm đã được xóa", "success");
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      price: "",
      quantity: "",
      category: "",
      description: "",
      image: "",
      createdAt: new Date().toISOString().split("T")[0],
      isHot: false,
      isNew: false,
      isDiscount: false,
    });
  };

  const handleSelect = (productId) => {
    setSelectedProductId(productId);
    const product = products.find((p) => p.id === productId);
    if (product) {
      setForm({
        name: product.name,
        price: String(product.price),
        quantity: String(product.quantity),
        category: product.category,
        description: product.description,
        image: product.image,
        createdAt: product.createdAt,
        isHot: product.isHot,
        isNew: product.isNew,
        isDiscount: product.isDiscount,
      });
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div className="bg-white shadow rounded p-6 space-y-4">
        <h2 className="text-xl font-semibold">Quản lý sản phẩm</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tên sản phẩm</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInput}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Giá</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleInput}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Số lượng</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleInput}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Danh mục</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleInput}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Mô tả</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleInput}
              className="w-full border border-gray-300 rounded px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Ảnh</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {form.image && (
              <img src={form.image} alt="Product" className="w-32 h-32 mt-2 object-cover rounded" />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ngày tạo</label>
            <input
              type="date"
              name="createdAt"
              value={form.createdAt}
              onChange={handleInput}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-4 col-span-2 mt-2">
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={form.isHot}
                onChange={(e) => handleCheckbox("isHot", e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              Hot
            </label>
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={form.isNew}
                onChange={(e) => handleCheckbox("isNew", e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              Mới
            </label>
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={form.isDiscount}
                onChange={(e) => handleCheckbox("isDiscount", e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              Giảm giá
            </label>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Thêm
          </button>
          <button
            onClick={handleEdit}
            className="border border-gray-400 text-gray-700 px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            Sửa
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Xóa
          </button>
          <button
            onClick={resetForm}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
          >
            Làm mới
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded p-4">
        <h3 className="text-lg font-semibold mb-3">Danh sách sản phẩm</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-3 py-2">Tên</th>
              <th className="border border-gray-300 px-3 py-2">Giá</th>
              <th className="border border-gray-300 px-3 py-2">Số lượng</th>
              <th className="border border-gray-300 px-3 py-2">Danh mục</th>
              <th className="border border-gray-300 px-3 py-2">Hot</th>
              <th className="border border-gray-300 px-3 py-2">Mới</th>
              <th className="border border-gray-300 px-3 py-2">Giảm giá</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                className={`cursor-pointer hover:bg-blue-50 ${
                  selectedProductId === p.id ? "bg-blue-100" : ""
                }`}
                onClick={() => handleSelect(p.id)}
              >
                <td className="border border-gray-300 px-3 py-2">{p.name}</td>
                <td className="border border-gray-300 px-3 py-2">{p.price.toLocaleString()}₫</td>
                <td className="border border-gray-300 px-3 py-2">{p.quantity}</td>
                <td className="border border-gray-300 px-3 py-2">{p.category}</td>
                <td className="border border-gray-300 px-3 py-2 text-center">{p.isHot ? "✓" : ""}</td>
                <td className="border border-gray-300 px-3 py-2 text-center">{p.isNew ? "✓" : ""}</td>
                <td className="border border-gray-300 px-3 py-2 text-center">{p.isDiscount ? "✓" : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
