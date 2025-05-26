import { Link } from "react-router-dom";

function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#eee8b2]">
      <h1 className="text-4xl font-bold mb-4">Giới thiệu</h1>
      <p className="text-lg mb-8">Đây là trang giới thiệu của ứng dụng.</p>
      <Link to="/" className="text-blue-500 hover:underline">Quay lại trang chủ</Link>
    </div>
  ); 
}
export default About;