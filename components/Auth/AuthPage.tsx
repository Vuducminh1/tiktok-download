import React, { useState } from "react";
import { translations } from "../../utils/translations";
import { Language } from "../../types";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Github,
  Chrome,
  Eye,
  EyeOff,
} from "lucide-react";

interface AuthPageProps {
  lang: Language;
  onNavigateHome: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ lang, onNavigateHome }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = translations[lang].auth;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Logic đăng ký
    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        setError("Mật khẩu không khớp."); // Bạn có thể thêm vào tệp translations
        setIsLoading(false);
        return;
      }
      // TODO: Thay thế bằng lệnh gọi API đăng ký thực tế của bạn
      console.log("Đang đăng ký với:", {
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });
    } else {
      // TODO: Thay thế bằng lệnh gọi API đăng nhập thực tế của bạn
      console.log("Đang đăng nhập với:", { username: formData.username, password: formData.password });
    }
    // Mô phỏng độ trễ của API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // TODO: Xử lý phản hồi API (thành công/lỗi)
    // Ví dụ: nếu thành công, điều hướng người dùng
    // onNavigateHome();

    setIsLoading(false);
  };

  return (
    <div className="flex-grow flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 animate-fade-in-up">
        {/* Header */}
        <div className="text-center relative">
          <button
            onClick={onNavigateHome}
            className="absolute left-0 top-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm"
          >
            &larr; {translations[lang].nav.home}
          </button>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white pt-6">
            {isLogin ? t.welcomeBack : t.createAccount}
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            {isLogin ? t.signInDesc : t.signUpDesc}
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div className="rounded-md shadow-sm space-y-4">
            {/* Email Field - Only Visible on Register */}
            {!isLogin && (
              <div>
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                >
                  {t.email}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full pl-10 px-3 py-2 border border-slate-300 dark:border-slate-700 placeholder-slate-400 text-slate-900 dark:text-white dark:bg-slate-950 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}

            {/* Username Field - Always Visible */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                {t.username}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-slate-300 dark:border-slate-700 placeholder-slate-400 text-slate-900 dark:text-white dark:bg-slate-950 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                  placeholder="username123"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                {t.password}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full pl-10 pr-10 px-3 py-2 border border-slate-300 dark:border-slate-700 placeholder-slate-400 text-slate-900 dark:text-white dark:bg-slate-950 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password - Only Visible on Register */}
            {!isLogin && (
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                >
                  {t.confirmPassword}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className="appearance-none block w-full pl-10 pr-10 px-3 py-2 border border-slate-300 dark:border-slate-700 placeholder-slate-400 text-slate-900 dark:text-white dark:bg-slate-950 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            {isLogin && (
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                >
                  {t.forgotPass}
                </a>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-lg shadow-indigo-500/30 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <User className="h-5 w-5 text-indigo-300 group-hover:text-indigo-200" />
                )}
              </span>
              {isLoading
                ? (isLogin ? "Đang đăng nhập..." : "Đang đăng ký...")
                : (isLogin ? t.signInBtn : t.signUpBtn)}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-slate-900 text-slate-500">
                {t.or}
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="w-full inline-flex justify-center py-2 px-4 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm bg-white dark:bg-slate-800 text-sm font-medium text-slate-500 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <span className="sr-only">Sign in with Google</span>
              <Chrome className="h-5 w-5" />
            </button>
            <button className="w-full inline-flex justify-center py-2 px-4 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm bg-white dark:bg-slate-800 text-sm font-medium text-slate-500 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <span className="sr-only">Sign in with GitHub</span>
              <Github className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Footer Toggle */}
        <div className="text-center mt-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {isLogin ? t.noAccount : t.haveAccount}{" "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null); // Xóa lỗi khi chuyển đổi biểu mẫu
              }}
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 transition-colors"
            >
              {isLogin ? t.signUpBtn : t.signInBtn}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
