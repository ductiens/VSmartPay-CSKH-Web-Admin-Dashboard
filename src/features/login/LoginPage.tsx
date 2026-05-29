import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { message } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "../../components/buttons/ButtonChangeLanguage";
import { setCredentials } from "../../redux/auth/slice";
import { useLogin } from "../auth/auth.mutation";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate, isPending } = useLogin();
  const { t } = useTranslation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const onFinish = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { username, password },
      {
        onSuccess: (data) => {
          dispatch(
            setCredentials({
              user: {
                id: data.id,
                username: data.username,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                gender: data.gender,
                image: data.image,
              },
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            }),
          );
          navigate("/");
        },
        onError: (err: any) => {
          message.error(err.message || "Login failed");
        },
      },
    );
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#FAFBFC] text-[#1c1b1b]">
      {/* Language switcher top-right */}
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      <main className="w-full max-w-[440px] px-4">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <h1 className="text-[28px] leading-[36px] font-bold tracking-tight text-[#041712]">VSmartPay Admin</h1>
          <p className="text-sm text-[#424845] mt-2">Hệ thống quản trị tập trung</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] p-8 border border-[#E9EEF1]">
          <h2 className="text-[18px] leading-6 font-semibold text-[#041712] mb-6 text-center">Đăng nhập hệ thống</h2>

          <form onSubmit={onFinish} className="space-y-6">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-[12px] font-semibold tracking-[0.05em] uppercase text-[#424845] mb-1"
              >
                {t("auth.username") || "Email hoặc Tên đăng nhập"}
              </label>
              <div
                className="relative flex items-center rounded border border-[#E9EEF1] bg-[#F4F7F9]
                  focus-within:border-[#00D99F] focus-within:shadow-[0_0_0_2px_rgba(0,217,159,0.2)]
                  transition-all duration-200"
              >
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="nhap.email@vsmartpay.vn"
                  className="block w-full pl-3 pr-4 py-[14px] bg-transparent border-none outline-none
                    text-sm text-[#1c1b1b] placeholder:text-[#c2c8c4]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label
                  htmlFor="password"
                  className="block text-[12px] font-semibold tracking-[0.05em] uppercase text-[#424845]"
                >
                  {t("auth.password") || "Mật khẩu"}
                </label>
                <a
                  href="#"
                  className="text-[12px] font-semibold tracking-[0.05em] text-[#006c4d] hover:text-[#00D99F] transition-colors"
                >
                  Quên mật khẩu?
                </a>
              </div>
              <div
                className="relative flex items-center rounded border border-[#E9EEF1] bg-[#F4F7F9]
                  focus-within:border-[#00D99F] focus-within:shadow-[0_0_0_2px_rgba(0,217,159,0.2)]
                  transition-all duration-200"
              >
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-3 pr-12 py-[14px] bg-transparent border-none outline-none
                    text-sm text-[#1c1b1b] placeholder:text-[#c2c8c4]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-[#727875] hover:text-[#424845] transition-colors"
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-[#c2c8c4] text-[#006c4d] focus:ring-[#00D99F] bg-white cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 text-sm text-[#424845] cursor-pointer select-none">
                Ghi nhớ đăng nhập
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center items-center gap-2 py-[14px] px-4
                rounded bg-[#00D99F] text-[18px] font-semibold text-[#041712]
                hover:bg-[#1fe1a6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00D99F]
                transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-[#041712]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Đang đăng nhập...
                </>
              ) : (
                t("auth.login") || "Đăng nhập"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#424845]">
            Bằng cách đăng nhập, bạn đồng ý với{" "}
            <a href="#" className="text-[#006c4d] hover:underline">
              Điều khoản
            </a>{" "}
            và{" "}
            <a href="#" className="text-[#006c4d] hover:underline">
              Bảo mật
            </a>
            .
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-[12px] font-semibold tracking-[0.05em] text-[#424845]">
            © 2026 VSmartPay. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}
