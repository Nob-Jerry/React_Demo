import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { parseJwt } from "../utils/jwt";

export default function AutoLogout() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

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
      "/verify-email",
    ];

    const isPublic = publicPaths.some(path => currentPath.startsWith(path));

    if (!token) {
      if (!isPublic) {
        navigate("/login");
      }
    } else {
      try {
        const payload = parseJwt(token);
        const exp = payload.exp * 1000;
        const now = Date.now();

        if (exp < now) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          if (!isPublic) {
            navigate("/login");
          }
        } else {
          const timeout = exp - now;
          const timer = setTimeout(() => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            if (!isPublic) {
              navigate("/login");
            }
          }, timeout);
          return () => clearTimeout(timer);
        }
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        if (!isPublic) {
          navigate("/login");
        }
      }
    }
  }, [navigate, currentPath]);

  return null;
}
