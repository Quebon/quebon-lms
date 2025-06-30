import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (login(id, password)) {
      if (id === 'student') {
        navigate('/student');
      } else if (id === 'manager') {
        navigate('/admin');
      }
    } else {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  const handleFindIdPw = () => {
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {/* 토스트 팝업 */}
      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-lg-primary text-white px-6 py-4 rounded-lg shadow-lg">
            <p className="font-medium">샘플에서는 제공하지 않는 기능입니다.</p>
          </div>
        </div>
      )}

      <div className="max-w-md w-full space-y-8 px-6">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <img src="/ci/LG.svg" alt="LG Logo" className="h-16 w-16" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            LG CNS LMS System
          </h1>
          <p className="text-gray-600 text-lg">
            기업 맞춤형 AX 사고력 교육 플랫폼
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-2">
                아이디
              </label>
              <input
                id="id"
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-lg-primary focus:border-transparent"
                placeholder="아이디를 입력하세요"
                required
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-lg-primary focus:border-transparent"
                placeholder="비밀번호를 입력하세요"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-white font-medium rounded-lg bg-lg-primary hover:bg-lg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lg-primary transition-colors"
            >
              로그인
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={handleFindIdPw}
              className="text-sm text-gray-600 hover:text-lg-primary transition-colors"
            >
              ID/PW 찾기
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-500 mt-8">
          ⓒ 2025 EQUALKEY. All rights reserved.
        </div>

        <div className="mt-6 p-4 bg-lg-neutral/10 rounded-lg">
          <p className="text-sm text-gray-700 font-medium mb-2">테스트 계정:</p>
          <div className="text-sm text-gray-600 space-y-1">
            <div>학습자: student / 12341234</div>
            <div>관리자: manager / 12341234</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;