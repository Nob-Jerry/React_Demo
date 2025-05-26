function contact() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Contact Us</h2>
      <form className="space-y-5">
        {/* Tên */}
        <div>
          <label htmlFor="name" className="block mb-2 font-medium text-gray-700">
            Tên
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nhập tên của bạn"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Nhập email của bạn"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block mb-2 font-medium text-gray-700">
            Tin nhắn
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            placeholder="Nhập tin nhắn của bạn"
            className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Gửi
        </button>
      </form>
    </div>
  );
}
export default contact;