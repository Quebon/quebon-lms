import React, { useState } from 'react';
import { X, Search, Plus, Clock, CheckCircle } from 'lucide-react';
import { inquiries } from '../data/mockData';
import { Inquiry } from '../types';
import { useAuth } from '../context/AuthContext';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [showNewInquiry, setShowNewInquiry] = useState(false);
  const [showToast, setShowToast] = useState(false);

  if (!isOpen) return null;

  const filteredInquiries = inquiries.filter(inquiry =>
    inquiry.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInquiryClick = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
  };

  const handleBackToList = () => {
    setSelectedInquiry(null);
  };

  const handleNewInquiry = () => {
    setShowNewInquiry(true);
  };

  const handleSubmitInquiry = () => {
    setShowToast(true);
    setShowNewInquiry(false);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (selectedInquiry) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-[600px] max-h-[80vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">문의 상세</h2>
            <button
              onClick={handleBackToList}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-600">문의상태 :</span>
              <div className="flex items-center space-x-1">
                {selectedInquiry.status === 'answered' ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600 font-medium">답변 완료</span>
                  </>
                ) : (
                  <>
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span className="text-sm text-orange-600 font-medium">답변 대기</span>
                  </>
                )}
              </div>
            </div>
            
            <div>
              <span className="text-sm font-medium text-gray-600">접수일시 :</span>
              <span className="text-sm text-gray-800 ml-2">{selectedInquiry.date}</span>
            </div>
            
            <div>
              <span className="text-sm font-medium text-gray-600">문의제목 :</span>
              <p className="text-gray-800 mt-1 bg-gray-200 p-3 rounded-lg">{selectedInquiry.title}</p>
            </div>
            
            <div>
              <span className="text-sm font-medium text-gray-600">문의내용 :</span>
              <p className="text-gray-800 mt-1 bg-gray-200 p-3 rounded-lg">{selectedInquiry.content}</p>
            </div>
            
            <div>
              <span className="text-sm font-medium text-gray-600">답변일시 :</span>
              <span className="text-sm text-gray-800 ml-2">
                {selectedInquiry.answerDate || '답변 대기중'}
              </span>
            </div>
            
            <div>
              <span className="text-sm font-medium text-gray-600">답변내용 :</span>
              <p className="text-gray-800 mt-1 bg-gray-200 p-3 rounded-lg">
                {selectedInquiry.answer || '답변이 없습니다.'}
              </p>
            </div>
          </div>
          
          <div className="p-6 border-t border-gray-200">
            <button
              onClick={handleBackToList}
              className="w-full bg-lg-button text-white py-2 px-4 rounded-lg hover:bg-lg-button-hover transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showNewInquiry) {
    return (
      <NewInquiryForm
        user={user}
        onSubmit={handleSubmitInquiry}
        onCancel={() => setShowNewInquiry(false)}
      />
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-[700px] max-h-[80vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">문의하기</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="p-6">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="문의 제목으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lg-primary focus:border-transparent"
              />
            </div>
            
            <div className="max-h-[400px] overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">연번</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">접수일시</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">문의제목</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">문의상태</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInquiries.map((inquiry, index) => (
                    <tr
                      key={inquiry.id}
                      onClick={() => handleInquiryClick(inquiry)}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{inquiry.date}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {inquiry.title.length > 20 ? `${inquiry.title.substring(0, 20)}...` : inquiry.title}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-1">
                          {inquiry.status === 'answered' ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm text-green-600 font-medium">답변</span>
                            </>
                          ) : (
                            <>
                              <Clock className="h-4 w-4 text-orange-500" />
                              <span className="text-sm text-orange-600 font-medium">접수</span>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="p-6 border-t border-gray-200 flex justify-between">
            <button
              onClick={handleNewInquiry}
              className="flex items-center space-x-2 bg-lg-primary text-white px-4 py-2 rounded-lg hover:bg-lg-secondary transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>신규접수</span>
            </button>
            <button
              onClick={onClose}
              className="bg-lg-button text-white px-4 py-2 rounded-lg hover:bg-lg-button-hover transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
      
      {showToast && (
        <div className="fixed left-1/2 top-1/4 transform -translate-x-1/2 z-[9999]">
          <div className="bg-lg-primary text-white px-6 py-3 rounded-lg shadow-lg">
          문의가 정상적으로 접수되었습니다.
          </div>
        </div>
      )}
    </>
  );
};

interface NewInquiryFormProps {
  user: any;
  onSubmit: () => void;
  onCancel: () => void;
}

const NewInquiryForm: React.FC<NewInquiryFormProps> = ({ user, onSubmit, onCancel }) => {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const categories = [
    '영상 오류',
    '퀴즈 오류',
    '기타 기능 오류',
    '학습 문의',
    '이용 문의'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[600px] max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">문의접수</h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">접수자</label>
            <p className="text-gray-600">{user?.position} {user?.name}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
            <div className="relative w-full">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-transparent appearance-none"
                required
              >
                <option value="">선택하세요</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
              </span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              maxLength={1000}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-transparent resize-none"
              placeholder="문의 내용을 입력하세요 (최대 1,000자)"
              required
            />
            <p className="text-sm text-gray-500 mt-1">{content.length}/1,000자</p>
          </div>
        </form>
        
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-lg-primary text-white rounded-lg hover:bg-lg-secondary transition-colors"
          >
            보내기
          </button>
        </div>
      </div>
    </div>
  );
};

export default InquiryModal;