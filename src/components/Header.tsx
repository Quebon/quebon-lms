import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, ChevronDown } from 'lucide-react';
import InquiryModal from './InquiryModal';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img src="/ci/LG.svg" alt="LG Logo" className="h-10 w-10" />
              <span className="text-xl font-bold text-gray-800">LG CNS LMS System</span>
              </div>
              
            <div className="flex items-center space-x-8">
              <nav className="flex items-center space-x-6">
                {/* 관리자, 학생 모두 학습관리 메뉴 제거 */}
                {false}
                <button
                  onClick={() => setShowInquiryModal(true)}
                  className="text-gray-600 hover:text-lg-primary font-medium transition-colors"
                >
                  문의하기
                </button>
              </nav>

            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <User className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700 font-medium">{user.name}</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-100">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">사번</span>
                        <span className="text-gray-800">{user.employeeId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">직급(직책)</span>
                        <span className="text-gray-800">{user.position}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">부서명</span>
                        <span className="text-gray-800">{user.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">누적 포인트</span>
                        <span className="text-gray-800">{user.hrdPoints}p</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-left bg-lg-primary text-white rounded-lg hover:bg-lg-secondary transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>로그아웃</span>
                    </button>
                  </div>
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {showProfileDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowProfileDropdown(false)}
        />
      )}

      <InquiryModal
        isOpen={showInquiryModal}
        onClose={() => setShowInquiryModal(false)}
      />
    </>
  );
};

export default Header;