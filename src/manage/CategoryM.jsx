import { useState } from 'react';
import Swal from 'sweetalert2';

const initialCategory = {
  categoryId: '',
  categoryName: '',
};

const mockCategories = [
  { categoryId: 1, categoryName: 'Áo thun' },
  { categoryId: 2, categoryName: 'Quần jean' },
];

export default function CategoryManagement() {
  const [category, setCategory] = useState(initialCategory);
  const [categories, setCategories] = useState(mockCategories);
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const resetForm = () => setCategory(initialCategory);

  const handleSave = () => {
    Swal.fire({ title: 'Lưu danh mục?', icon: 'question', showCancelButton: true }).then((res) => {
      if (res.isConfirmed) {
        setCategories([...categories, category]);
        resetForm();
      }
    });
  };

  const handleUpdate = () => {
    Swal.fire({ title: 'Cập nhật danh mục?', icon: 'question', showCancelButton: true }).then((res) => {
      if (res.isConfirmed) {
        setCategories(categories.map((c) => (c.categoryId === category.categoryId ? category : c)));
        resetForm();
      }
    });
  };

  const handleDelete = () => {
    Swal.fire({ title: 'Xoá danh mục?', icon: 'warning', showCancelButton: true }).then((res) => {
      if (res.isConfirmed) {
        setCategories(categories.filter((c) => c.categoryId !== category.categoryId));
        resetForm();
      }
    });
  };

  const handleRowClick = (c) => setCategory(c);

  const filteredCategories = categories.filter((c) =>
    c.categoryName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 bg-blue-50 min-h-screen text-blue-900">
      <h1 className="text-2xl font-bold mb-4">Quản lý danh mục</h1>

      {/* Form */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium">ID danh mục</label>
          <input name="categoryId" value={category.categoryId} onChange={handleChange} className="border p-2 rounded w-full" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Tên danh mục</label>
          <input name="categoryName" value={category.categoryName} onChange={handleChange} className="border p-2 rounded w-full" />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mb-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleSave}>Lưu</button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600" onClick={handleUpdate}>Cập nhật</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={handleDelete}>Xoá</button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={resetForm}>Làm mới</button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          className="border px-2 py-1 rounded w-1/2"
          placeholder="Tìm kiếm danh mục..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <table className="w-full table-auto border border-blue-300 text-center text-blue-900">
        <thead className="bg-blue-200">
          <tr>
            <th>ID</th>
            <th>Tên danh mục</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map((c) => (
            <tr
              key={c.categoryId}
              className="hover:bg-blue-100 cursor-pointer"
              onClick={() => handleRowClick(c)}
            >
              <td>{c.categoryId}</td>
              <td>{c.categoryName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
