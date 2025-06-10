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
    <div className="p-6 bg-blue-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-sky-800 mb-6">Quản lý danh mục</h1>
        {/* Form Card */}
        <div className="bg-blue-50 rounded-xl shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 font-medium">ID danh mục</label>
              <input name="categoryId" value={category.categoryId} onChange={handleChange} className="border rounded px-3 py-2 w-full" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Tên danh mục</label>
              <input name="categoryName" value={category.categoryName} onChange={handleChange} className="border rounded px-3 py-2 w-full" />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <button className="w-full md:w-auto bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 font-semibold" onClick={handleSave}>Lưu</button>
            <button className="w-full md:w-auto bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 font-semibold" onClick={handleUpdate}>Cập nhật</button>
            <button className="w-full md:w-auto bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 font-semibold" onClick={handleDelete}>Xoá</button>
            <button className="w-full md:w-auto bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 font-semibold" onClick={resetForm}>Làm mới</button>
          </div>
        </div>
        {/* Search Bar */}
        <div className="flex justify-end mb-4">
          <input
            className="border rounded-lg px-4 py-2 text-base w-full md:w-72"
            placeholder="Tìm kiếm danh mục..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* Category Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-blue-200 rounded-xl">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-2">ID</th>
                <th className="p-2">Tên danh mục</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((c) => (
                <tr
                  key={c.categoryId}
                  className="hover:bg-blue-50 cursor-pointer text-center"
                  onClick={() => handleRowClick(c)}
                >
                  <td className="p-2">{c.categoryId}</td>
                  <td className="p-2">{c.categoryName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
