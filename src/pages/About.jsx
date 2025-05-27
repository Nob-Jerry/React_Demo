
import { useEffect, useState } from 'react';

export default function About() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timeout);
  }, []);
  return (
   <div>
  <main>
    <section className="min-h-screen bg-[#e0f2ff]">
      {/* Hero Section */}
      <div
        className="relative w-full h-[80vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2020/02/19/21/49/workshop-4863393_960_720.jpg')",
        }}
      >
        <div className="bg-opacity-50 absolute w-full h-full bg-black"></div>
        <div className="text-center text-white px-4 z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 shadow-text">QuLyn - Đồ Gia Dụng Hiện Đại</h1>
          <p className="text-lg md:text-2xl">Mang công nghệ & tiện nghi vào từng ngôi nhà</p>
        </div>
      </div>

      {/* Introduction Section */}
      <div
        className={`transition-all duration-1000 ease-out px-8 md:px-20 py-20 ${
          showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto text-center flex flex-col items-center justify-center gap-[10px]">
          <h2 className="text-[20px] md:text-5xl font-bold text-gray-800 mb-[10px]">Chúng Tôi Là Ai?</h2>
          <div className="w-[10%] h-[5px] bg-blue-600"></div>
          <p className="text-gray-600 text-lg leading-relaxed">
            <span className="font-bold text-[25px] text-blue-700">QuLyn</span> là thương hiệu tiên phong cung cấp đồ gia dụng thông minh, hiện đại, an toàn và tiết kiệm năng lượng. Chúng tôi mang đến giải pháp tiện nghi cho cuộc sống bận rộn ngày nay.
          </p>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="bg-[#cfe9ff] py-20">
        <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-16 text-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Sứ Mệnh</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              QuLyn cung cấp những sản phẩm gia dụng tối ưu, ứng dụng công nghệ hiện đại, giúp người dùng tiết kiệm thời gian và nâng cao chất lượng cuộc sống.
            </p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Tầm Nhìn</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Trở thành thương hiệu đồ gia dụng hàng đầu tại Việt Nam và khu vực Đông Nam Á, góp phần xây dựng cuộc sống tiện nghi, thông minh cho hàng triệu gia đình.
            </p>
          </div>
        </div>
      </div>

      {/* Working Process */}
      <div className="bg-[#e0f2ff] py-20">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <div className="w-full flex flex-col items-center justify-center pb-[20px]">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-[10px]">Quy Trình Mua Hàng</h2>
            <div className="w-[10%] h-[5px] bg-blue-600"></div>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {['Chọn Sản Phẩm', 'Đặt Hàng', 'Vận Chuyển', 'Hậu Mãi'].map((step, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">{step}</h4>
                <p className="text-gray-600">
                  {
                    {
                      0: 'Khách hàng duyệt qua danh mục sản phẩm phong phú.',
                      1: 'Đặt hàng trực tuyến nhanh chóng và an toàn.',
                      2: 'Giao hàng tận nơi trong thời gian ngắn.',
                      3: 'Bảo hành dài hạn & hỗ trợ kỹ thuật tận tình.',
                    }[i]
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partner Section */}
      <div className="py-20 bg-[#e0f2ff]">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <div className="w-full flex flex-col items-center justify-center pb-[20px]">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-[10px]">Đối Tác & Thương Hiệu Phân Phối</h2>
            <div className="w-[10%] h-[5px] bg-blue-600"></div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[
              { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/1024px-Samsung_Logo.svg.png', alt: 'Panasonic', height: 'h-8' },
              { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Sony_logo.svg/1200px-Sony_logo.svg.png', alt: 'Philips', height: 'h-4' },
              { src: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg', alt: 'Samsung', height: 'h-10' },
              { src: 'https://brandlogos.net/wp-content/uploads/2022/03/nvidia-logo-brandlogos.net_.png', alt: 'Sony', height: 'h-30' },
            ].map(({ src, alt, height }, i) => (
              <img key={i} src={src} alt={alt} className={height} />
            ))}
          </div>
        </div>
      </div>

      {/* Commitment Section */}
      <div className="bg-[#cfe9ff] py-20 px-8 md:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-full flex flex-col items-center justify-center pb-[20px]">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-[10px]">Cam Kết Của Chúng Tôi</h2>
            <div className="w-[10%] h-[5px] bg-blue-600"></div>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            QuLyn cam kết cung cấp sản phẩm chất lượng cao, dịch vụ khách hàng chuyên nghiệp và giá cả cạnh tranh nhất trên thị trường.
          </p>
          {[
            {
              title: '1. Sản Phẩm Chính Hãng',
              items: ['Chỉ phân phối sản phẩm từ các thương hiệu uy tín.', 'Chứng nhận nguồn gốc rõ ràng, bảo hành đầy đủ.'],
            },
            {
              title: '2. Đa Dạng Danh Mục',
              items: ['Từ bếp núc, dọn dẹp đến chăm sóc sức khỏe & làm đẹp.', 'Luôn cập nhật sản phẩm mới nhất.'],
            },
            {
              title: '3. Giao Hàng Toàn Quốc',
              items: ['Vận chuyển nhanh chóng và an toàn.', 'Hỗ trợ đổi trả dễ dàng.'],
            },
            {
              title: '4. Hậu Mãi & Bảo Hành',
              items: ['Chính sách bảo hành rõ ràng.', 'Dịch vụ kỹ thuật tận tâm.'],
            },
            {
              title: '5. Giá Cả Cạnh Tranh',
              items: ['Luôn có khuyến mãi hấp dẫn.', 'Cam kết giá tốt nhất với chất lượng tương xứng.'],
            },
          ].map(({ title, items }, i) => (
            <div key={i} className="text-left mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
              <ul className="list-disc list-inside text-gray-600 text-lg leading-relaxed">
                {items.map((text, idx) => (
                  <li key={idx}>{text}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  </main>
</div>

  );
};

