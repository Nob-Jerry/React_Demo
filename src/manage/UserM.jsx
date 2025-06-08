import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getAllUsers, updateUser, deleteUser } from "../service/userService";

const defaultUser = {
  id: "",
  username: "",
  email: "",
  fullname: "",
  phone: "",
  address: "",
  role: "user",
  isActive: true,
  createdAt: new Date().toISOString().split("T")[0],
};

export default function UserManagement() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(defaultUser);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllUsers()
      .then(setUsers)
      .catch((err) => {
        Swal.fire({
          title: "Lỗi tải người dùng",
          text:
            err?.response?.data?.message ||
            "Không thể tải danh sách người dùng",
          icon: "error",
        });
      })
      .finally(() => setLoading(false));
  }, [user]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({
      ...user,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const resetForm = () => setUser(defaultUser);

  const handleUpdate = () => {
    Swal.fire({
      title: "Cập nhật người dùng?",
      icon: "question",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        updateUser(user)
          .then((updatedUser) => {
            setUsers(
              users.map((u) => (u.id === updatedUser.id ? updatedUser : u))
            );
            Swal.fire({
              title: "Cập nhật thành công",
              icon: "success",
            });
            resetForm();
          })
          .catch((err) => {
            Swal.fire({
              title: "Lỗi cập nhật người dùng",
              text:
                err?.response?.data?.message || "Không thể cập nhật người dùng",
              icon: "error",
            });
          });
      }
    });
  };

  const handleDeleteSuccess = () => {
    setUsers(users.filter((u) => u.id !== user.id));
    Swal.fire({
      title: "Xoá thành công",
      icon: "success",
    });
    resetForm();
  };

  const handleDeleteError = (err) => {
    Swal.fire({
      title: "Lỗi xoá người dùng",
      text: err?.response?.data?.message || "Không thể xoá người dùng",
      icon: "error",
    });
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Xoá người dùng?",
      icon: "warning",
      showCancelButton: true,
    }).then((res) => {
      if (!res.isConfirmed) return;
      deleteUser(user.username)
        .then(handleDeleteSuccess)
        .catch(handleDeleteError);
    });
  };

  const handleRowClick = (u) => {
    setUser({
      id: u.id || "",
      username: u.username || "",
      email: u.email || "",
      fullname: u.fullname || "",
      phone: u.phone || "",
      address: u.address || "",
      role: u.role || "user",
      isActive: u.isActive ?? true,
      createdAt: u.createdAt || new Date().toISOString().split("T")[0],
    });
  };

  const filteredUsers = users.filter(
    (u) =>
      (u.fullname?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (u.username?.toLowerCase() || "").includes(search.toLowerCase())
  );

  return (
    <div className="p-4 bg-blue-50 min-h-screen text-blue-900">
      <h1 className="text-2xl font-bold mb-4">Quản lý người dùng</h1>

      {/* Form */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="id" className="block mb-1 font-medium">
            ID người dùng
          </label>
          <input
            id="id"
            name="id"
            value={user.id}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            readOnly
          />
        </div>
        <div>
          <label htmlFor="username" className="block mb-1 font-medium">
            Tên đăng nhập
          </label>
          <input
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            readOnly
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            readOnly
          />
        </div>
        <div>
          <label htmlFor="fullName" className="block mb-1 font-medium">
            Họ tên
          </label>
          <input
            id="fullName"
            name="fullName"
            value={user.fullname}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            readOnly
          />
        </div>
        <div>
          <label htmlFor="phone" className="block mb-1 font-medium">
            Số điện thoại
          </label>
          <input
            id="phone"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            readOnly
          />
        </div>
        <div>
          <label htmlFor="address" className="block mb-1 font-medium">
            Địa chỉ
          </label>
          <input
            id="address"
            name="address"
            value={user.address}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            readOnly
          />
        </div>
        <div>
          <label htmlFor="role" className="block mb-1 font-medium">
            Vai trò
          </label>
          <select
            id="role"
            name="role"
            value={user.role}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <div>
          <label htmlFor="createdAt" className="block mb-1 font-medium">
            Ngày tạo
          </label>
          <input
            id="createdAt"
            name="createdAt"
            value={user.createdAt}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            readOnly
          />
        </div>
        <div className="flex items-center gap-2 col-span-2 mt-2">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={user.isActive}
            onChange={handleChange}
          />
          <label htmlFor="isActive" className="font-medium">
            Hoạt động
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mb-6">
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
          placeholder="Tìm theo tên người dùng..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="border border-blue-300 rounded">
        {loading ? (
          <div className="text-center py-4 text-blue-600">
            Đang tải dữ liệu...
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            Không có người dùng nào phù hợp.
          </div>
        ) : (
          <table className="w-full table-auto text-center text-blue-900">
            <thead className="bg-blue-200">
              <tr>
                <th>ID</th>
                <th>Tài khoản</th>
                <th>Email</th>
                <th>Họ tên</th>
                <th>SĐT</th>
                <th>Địa chỉ</th>
                <th>Vai trò</th>
                <th>Hoạt động</th>
                <th>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr
                  key={u.id}
                  className="hover:bg-blue-100 cursor-pointer"
                  onClick={() => handleRowClick(u)}
                >
                  <td>{u.id}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.fullname}</td>
                  <td>{u.phone}</td>
                  <td>{u.address}</td>
                  <td>{u.role}</td>
                  <td>{u.isActive ? "✔" : ""}</td>
                  <td>{u.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
