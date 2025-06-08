import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import authApi from "../api/authApi";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

export default function VerifyPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("activationToken");
  const hasCalledRef = useRef(false);
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await authApi.verify(token);
        console.log("VERIFY RESPONSE:", res);

        if (res.success) {
          setStatus("success");
          setMessage(res.message || "Xác minh tài khoản thành công!");
        } else {
          setStatus("error");
          setMessage(
            res.message || "Liên kết xác minh không hợp lệ hoặc đã hết hạn."
          );
        }
      } catch (error) {
        console.log("VERIFY ERROR:", error);
        setStatus("error");
        setMessage("Có lỗi xảy ra khi xác minh tài khoản.");
      }
    };

    if (!hasCalledRef.current && token) {
      hasCalledRef.current = true;
      verifyToken();
    } else if (!token) {
      setStatus("error");
      setMessage("Thiếu mã xác minh trong liên kết.");
    }
  }, [token]);

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      {status === "pending" && (
        <div className="text-blue-600 flex items-center gap-2">
          <Loader2 className="animate-spin" />
          <span>Đang xác minh liên kết...</span>
        </div>
      )}

      {status === "success" && (
        <div className="text-green-600 flex flex-col items-center gap-2">
          <CheckCircle2 size={32} />
          <span>{message}</span>
          <small className="text-sm text-gray-500">
            Chuyển hướng đến trang đăng nhập trong giây lát...
          </small>
        </div>
      )}

      {status === "error" && (
        <div className="text-red-600 flex flex-col items-center gap-2">
          <AlertCircle size={32} />
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}
