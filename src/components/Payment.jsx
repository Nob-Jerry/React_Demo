import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function PaymentPage() {
  // const navigate = useNavigate();
  // const location = useLocation();
  // const { name, phone, address, total, cart } = location.state || {};

  // const [paymentMethod, setPaymentMethod] = useState("COD");
  // const [card, setCard] = useState({
  //   cardNumber: "",
  //   cardName: "",
  //   expiry: "",
  //   cvv: "",
  // });

  // const handleCardChange = (e) => {
  //   setCard({ ...card, [e.target.name]: e.target.value });
  // };

  // const handlePayment = async () => {
  //   if (!paymentMethod) {
  //     alert("Vui lòng chọn phương thức thanh toán");
  //     return;
  //   }

  //   if (paymentMethod !== "COD" && (!card.cardNumber || !card.cardName || !card.expiry || !card.cvv)) {
  //     alert("Vui lòng nhập đầy đủ thông tin thẻ");
  //     return;
  //   }

  //   const payload = {
  //     userId: 1, // Tạm thời hardcoded
  //     orderStatus: "PENDING",
  //     totalAmount: total,
  //     paymentMethod,
  //     receiverName: name,
  //     receiverPhone: phone,
  //     receiverAddress: address,
  //     orderDetails: cart.map((item) => ({
  //       productId: item.product.id,
  //       quantity: item.quantity,
  //     })),
  //   };

  //   try {
  //     await axios.post("/api/orders", payload);
  //     localStorage.removeItem("cart");
  //     navigate("/order-success");
  //   } catch (err) {
  //     alert("Thanh toán thất bại. Vui lòng thử lại.");
  //   }
  // };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Phương thức thanh toán</h2>

      <select
        // value={paymentMethod}
        // onChange={(e) => setPaymentMethod(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      >
        <option value="COD">Thanh toán khi nhận hàng (COD)</option>
        <option value="CARD">Thẻ tín dụng/Ghi nợ</option>
        <option value="MOMO">Momo</option>
      </select>

      {/* {paymentMethod === "CARD" && ( */}
        <div className="grid gap-4 mb-6">
          <input
            type="text"
            name="cardNumber"
            // value={card.cardNumber}
            // onChange={handleCardChange}
            placeholder="Số thẻ"
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="cardName"
            // value={card.cardName}
            // onChange={handleCardChange}
            placeholder="Tên trên thẻ"
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="expiry"
            // value={card.expiry}
            // onChange={handleCardChange}
            placeholder="MM/YY"
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="cvv"
            // value={card.cvv}
            // onChange={handleCardChange}
            placeholder="CVV"
            className="border p-2 rounded w-full"
          />
        </div>
      {/* )} */}

      <div className="text-lg font-semibold mb-4">
        Tổng thanh toán:
        {/* {total.toLocaleString()} VND */}
      </div>

      <button
        // onClick={handlePayment}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Xác nhận thanh toán
      </button>
    </div>
  );
}
