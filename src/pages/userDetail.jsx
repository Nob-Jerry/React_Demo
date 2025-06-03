import { useEffect, useState } from 'react';
import userApi from '../api/userApi';

export default function UserDetailPage() {
  const user = JSON.parse(localStorage.getItem('user'));
  const username = user?.username;

  if (!username) {
    throw new Error('Username not found in localStorage');
  }

  const [formData, setFormData] = useState({
    userId: '',
    username: '',
    email: '',
    fullname: '',
    phone: '',
    address: '',
    role: '',
    isActive: false,
    createdAt: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await userApi.getByUserName(username);
        const user = res.data.data;

        setFormData({
          userId: user.userId || '',
          username: user.username || '',
          email: user.email || '',
          fullname: user.fullname || '',
          phone: user.phone || '',
          address: user.address || '',
          role: user.role || '',
          isActive: user.isActive || false,
          createdAt: user.createdAt || '',
        });
      } catch (err) {
        console.error('Lỗi khi tải người dùng:', err);
        setMessage('Không thể tải dữ liệu người dùng.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'isActive' ? value === 'true' : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await userApi.update(formData);
      setMessage('Lưu thành công!');
    } catch (err) {
      console.error('Lỗi khi lưu:', err);
      setMessage('Lưu thất bại!');
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <div className="text-center py-10">Đang tải dữ liệu...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-sky-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/60 backdrop-blur-md shadow-lg p-6 rounded-2xl w-full max-w-xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Chỉnh sửa thông tin người dùng
        </h2>

        {message && (
          <div className="text-center p-2 rounded bg-yellow-100 text-yellow-800 font-medium">
            {message}
          </div>
        )}

        {/* Trường chỉ đọc */}
        {[ 
          { label: 'ID', value: formData.userId },
          { label: 'Tên đăng nhập', value: formData.username }
        ].map(({ label, value }) => (
          <div key={label} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
              type="text"
              value={value}
              disabled
              className="w-full rounded-lg bg-gray-100 border border-gray-300 p-2 text-gray-500 cursor-not-allowed"
            />
          </div>
        ))}

        {/* Trường chỉnh sửa */}
        {[
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Họ và tên', name: 'fullname', type: 'text' },
          { label: 'Số điện thoại', name: 'phone', type: 'text' },
          { label: 'Địa chỉ', name: 'address', type: 'text' },
        ].map(({ label, name, type, placeholder }) => (
          <div key={name} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder={placeholder || ''}
              className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        {/* Ngày tạo - không được sửa */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Ngày tạo</label>
          <input
            type="text"
            value={formData.createdAt}
            disabled
            className="w-full rounded-lg bg-gray-100 border border-gray-300 p-2 text-gray-500 cursor-not-allowed"
          />
        </div>

        {/* Vai trò */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Quyền (role)</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {!['USER', 'ADMIN'].includes(formData.role) && (
              <option value={formData.role}>{formData.role}</option>
            )}
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        {/* Trạng thái hoạt động */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Trạng thái hoạt động</label>
          <select
            name="isActive"
            value={formData.isActive ? 'true' : 'false'}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="true">Đang hoạt động</option>
            <option value="false">Ngừng hoạt động</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={saving}
          className={`w-full py-2 rounded-lg text-white font-semibold transition ${
            saving ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
        </button>
      </form>
    </div>
  );
}
