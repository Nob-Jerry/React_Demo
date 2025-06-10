import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getAllUsers, updateUser } from "../service/userService";

const defaultUser = {
  id: "",
  username: "",
  email: "",
  fullname: "",
  phone: "",
  address: "",
  role: "USER",
  isActive: true,
  createdAt: new Date().toISOString().split("T")[0],
};

export default function UserManagement() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState(false);

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
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({
      ...user,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleUpdate = () => {
    Swal.fire({
      title: "Cập nhật quyền hoặc trạng thái?",
      icon: "question",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        setUpdating(true);
        updateUser(user)
          .then((updatedUser) => {
            setUsers(
              users.map((u) => (u.id === updatedUser.id ? updatedUser : u))
            );
            Swal.fire({
              title: "Cập nhật thành công",
              icon: "success",
            });
            setUser(updatedUser);
          })
          .catch((err) => {
            Swal.fire({
              title: "Lỗi cập nhật người dùng",
              text:
                err?.response?.data?.message || "Không thể cập nhật người dùng",
              icon: "error",
            });
          })
          .finally(() => setUpdating(false));
      }
    });
  };

  const handleRowClick = (u) => {
    setUser({ ...u });
  };

  const filteredUsers = users.filter(
    (u) =>
      (u.fullname?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (u.username?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (u.email?.toLowerCase() || "").includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold text-sky-800">Quản lý người dùng</h1>
          <input
            className="border rounded-lg px-4 py-2 text-base w-full md:w-72"
            placeholder="Tìm kiếm theo tên hoặc tài khoản..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="overflow-x-auto">
              <table className="w-full table-auto border border-blue-200 rounded-xl">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="p-2">ID</th>
                    <th className="p-2">Tài khoản</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Họ tên</th>
                    <th className="p-2">SĐT</th>
                    <th className="p-2">Địa chỉ</th>
                    <th className="p-2">Vai trò</th>
                    <th className="p-2">Hoạt động</th>
                    <th className="p-2">Ngày tạo</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={9} className="text-center py-4 text-blue-600">
                        Đang tải dữ liệu...
                      </td>
                    </tr>
                  ) : filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="text-center py-4 text-gray-500">
                        Không có người dùng nào phù hợp.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((u) => (
                      <tr
                        key={u.id}
                        className={`hover:bg-blue-50 cursor-pointer ${user && user.id === u.id ? 'bg-blue-100' : ''}`}
                        onClick={() => handleRowClick(u)}
                      >
                        <td className="p-2">{u.id}</td>
                        <td className="p-2">{u.username}</td>
                        <td className="p-2">{u.email}</td>
                        <td className="p-2">{u.fullname}</td>
                        <td className="p-2">{u.phone}</td>
                        <td className="p-2">{u.address}</td>
                        <td className="p-2">{u.role}</td>
                        <td className="p-2">{u.isActive ? <span className="text-green-600 font-bold">✔</span> : <span className="text-red-500 font-bold">✖</span>}</td>
                        <td className="p-2">{u.createdAt}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="md:col-span-1">
            {user ? (
              <div className="bg-blue-50 rounded-xl shadow p-6 sticky top-24">
                <h2 className="text-xl font-bold text-sky-700 mb-4">Chi tiết người dùng</h2>
                <div className="mb-2"><b>ID:</b> {user.id}</div>
                <div className="mb-2"><b>Tài khoản:</b> {user.username}</div>
                <div className="mb-2"><b>Email:</b> {user.email}</div>
                <div className="mb-2"><b>Họ tên:</b> {user.fullname}</div>
                <div className="mb-2"><b>SĐT:</b> {user.phone}</div>
                <div className="mb-2"><b>Địa chỉ:</b> {user.address}</div>
                <div className="mb-2"><b>Ngày tạo:</b> {user.createdAt}</div>
                <div className="mb-2">
                  <b>Vai trò:</b>
                  <select
                    name="role"
                    value={user.role}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 ml-2"
                  >
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
                <div className="mb-4 flex items-center gap-2">
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
                <button
                  className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 font-semibold disabled:opacity-60"
                  onClick={handleUpdate}
                  disabled={updating}
                >
                  {updating ? "Đang cập nhật..." : "Cập nhật"}
                </button>
              </div>
            ) : (
              <div className="text-gray-500 italic text-center mt-10">Chọn một người dùng để xem chi tiết</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
