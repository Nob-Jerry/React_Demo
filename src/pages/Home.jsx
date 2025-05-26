import { Link } from "react-router-dom";


function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#cee9b7]">
      <h1 className="text-4xl font-bold mb-4">Chào mừng đến với trang chủ!</h1>
      <p className="text-lg mb-8">Đây là trang chính của ứng dụng.</p>
      <Link to="/about" className="text-blue-500 hover:underline">
        Đi đến trang giới thiệu
      </Link>
    </div>
  );
}
export default Home;