import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { parseJwt } from "../utils/jwt";

export default function AutoLogout() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const publicPaths = [
      "/login",
      "/about",
      "/contact",
      "/signup",
      "/reset-password",
      "/product",
      "/",
    ];
    const currentPath = location.pathname;
    if (!token) {
      if (!publicPaths.includes(currentPath)) {
        navigate("/login");
      }
    } else {
      const payload = parseJwt(token);
      const exp = payload.exp * 1000;
      const now = Date.now();

      if (exp < now) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        if (!publicPaths.includes(currentPath)) {
          navigate("/login");
        }
      } else {
        const timeout = exp - now;
        const timer = setTimeout(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          if (!publicPaths.includes(currentPath)) {
            navigate("/login");
          }
        }, timeout);

        return () => clearTimeout(timer);
      }
    }
  }, [navigate]);
  return null;
}
