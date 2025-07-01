import React, { useState } from 'react';
import { Users, BookOpen, Clock, CheckCircle, AlertCircle, Eye, X, Phone, Mail, Search, Play, FileText } from 'lucide-react';
import { curriculums, learningResults, userLessonResults, lessonDiaryData, lessonReportData } from '../data/mockData';
import { LearningResult } from '../types';

const AdminDashboard: React.FC = () => {
  const [selectedCurriculum, setSelectedCurriculum] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<'' | 'not_started' | 'in_progress' | 'completed'>('');
  const [showDetailModal, setShowDetailModal] = useState<LearningResult | null>(null);
  // 조회 조건 관련 상태
  const [searchField, setSearchField] = useState<'name' | 'employeeId' | 'phone' | 'email'>('name');
  const [searchValue, setSearchValue] = useState('');
  const [searchTerm, setSearchTerm] = useState<{ field: string; value: string }>({ field: '', value: '' });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [openDetailIndex, setOpenDetailIndex] = useState<number | null>(null);
  const [showLessonResultModal, setShowLessonResultModal] = useState<any>(null);
  const [showFinalReportModal, setShowFinalReportModal] = useState<LearningResult | null>(null);

  // learningResults를 기준으로 필터링
  const filteredData = learningResults.filter(data => {
    const matchesCurriculum = !selectedCurriculum || data.curriculum.id === selectedCurriculum;
    const matchesStatus = !selectedStatus || data.status === selectedStatus;
    let matchesSearch = true;
    if (searchTerm.field && searchTerm.value) {
      switch (searchTerm.field) {
        case 'name':
          matchesSearch = data.user.name.toLowerCase().includes(searchTerm.value.toLowerCase());
          break;
        case 'employeeId':
          matchesSearch = data.user.employeeId.toLowerCase().includes(searchTerm.value.toLowerCase());
          break;
        case 'phone':
          matchesSearch = data.user.phone.includes(searchTerm.value);
          break;
        case 'email':
          matchesSearch = data.user.email.toLowerCase().includes(searchTerm.value.toLowerCase());
          break;
        default:
          matchesSearch = true;
      }
    }
    return matchesCurriculum && matchesStatus && matchesSearch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'not_started':
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '완료';
      case 'in_progress':
        return '진행중';
      case 'not_started':
        return '미시작';
      default:
        return '미시작';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:space-x-5 md:justify-start space-y-2 md:space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 mb-0">학습관리</h1>
        <p className="text-gray-600 md:ml-2">임직원의 교육 진도와 성과를 관리합니다.</p>
      </div>

      {/* 필터 섹션 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">조회 조건</h3>
        <div className="flex flex-wrap gap-4 items-end mb-4">
          <div className="flex-1 min-w-[180px]">
            <label className="block text-sm font-medium text-gray-500 mb-2">커리큘럼</label>
            <div className="relative w-full">
              <select
                value={selectedCurriculum}
                onChange={(e) => setSelectedCurriculum(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 h-10 text-sm focus:border-transparent appearance-none"
              >
                <option value="">전체</option>
                {curriculums.map(curriculum => (
                  <option key={curriculum.id} value={curriculum.id}>
                    {curriculum.title}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
              </span>
            </div>
          </div>
          <div className="min-w-[100px]">
            <label className="block text-sm font-medium text-gray-500 mb-2">수료상태</label>
            <div className="relative w-full">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 h-10 text-sm focus:border-transparent appearance-none"
              >
                <option value="">전체</option>
                <option value="not_started">미시작</option>
                <option value="in_progress">진행중</option>
                <option value="completed">완료</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
              </span>
            </div>
          </div>
          <div className="flex flex-row gap-2 flex-1 min-w-[320px]">
            <div className="relative w-[220px]">
              <select
                value={searchField}
                onChange={e => setSearchField(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm h-10 focus:ring-2 focus:border-transparent w-full appearance-none"
              >
                <option value="name">이름</option>
                <option value="employeeId">사번</option>
                <option value="phone">전화번호</option>
                <option value="email">이메일</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
              </span>
            </div>
            <input
              type="text"
              placeholder="검색어 입력"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-base h-10 focus:border-transparent w-full"
            />
            <button
              type="button"
              onClick={() => setSearchTerm({ field: searchField, value: searchValue })}
              className="bg-lg-button text-white px-4 h-10 rounded-lg font-semibold hover:bg-lg-button-hover transition-colors flex justify-center items-center min-w-[64px] whitespace-nowrap"
            >
              조회
            </button>
          </div>
        </div>
      </div>

      {/* 조회 결과 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">조회 결과</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              <span>총 {filteredData.length}명</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-compact">
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    조회된 학습자가 없습니다.
                  </td>
                </tr>
              ) : (
                filteredData.map((data, index) => (
                  <React.Fragment key={index}>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        {/* 학습자 정보: hover 시 툴팁 */}
                        <div className="relative group cursor-pointer w-fit">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-base font-medium text-gray-900">{data.user.name}</span>
                              <span className="text-xs text-gray-500 bg-gray-100 rounded px-2 py-0.5">{data.user.employeeId}</span>
                            </div>
                            <div className="text-sm text-gray-600">{data.user.position} | {data.user.department}</div>
                          </div>
                          {/* 툴팁: 핸드폰/이메일 */}
                          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-10 hidden group-hover:block bg-white border border-gray-300 rounded-lg shadow-lg px-4 py-2 text-sm text-gray-800 whitespace-nowrap min-w-[180px]">
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-gray-500" />
                              {data.user.phone}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Mail className="w-4 h-4 text-gray-500" />
                              {data.user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-base font-medium text-gray-900">{data.curriculum.title}</div>
                          <div className="text-sm text-gray-600">교육기간 : {data.curriculum.period}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-12 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`${data.progress === 100 ? 'bg-lg-done' : data.progress > 0 ? 'bg-lg-progress' : 'bg-gray-400'} h-2 rounded-full`}
                              style={{ width: `${data.progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">{data.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(data.status)}
                          <span className="text-sm font-medium text-gray-600">
                            {getStatusText(data.status)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {data.completionDate || '예정'}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-lg-primary">{data.points}p</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-5">
                          <button
                            onClick={() => {
                              if (data.user.name !== '김학습') {
                                if (data.progress === 0) {
                                  return;
                                }
                                setToastMessage('이 데이터는 샘플입니다.');
                                setShowToast(true);
                                setTimeout(() => setShowToast(false), 2000);
                                return;
                              }
                              setOpenDetailIndex(openDetailIndex === index ? null : index);
                            }}
                            className={`flex items-center text-sm font-medium transition-colors ${
                              data.user.name === '김학습' || data.progress > 0
                                ? 'text-lg-button hover:text-lg-button-hover cursor-pointer'
                                : 'text-gray-400 cursor-not-allowed'
                            }`}
                            disabled={data.user.name !== '김학습' && data.progress === 0}
                            style={{ pointerEvents: 'auto' }}
                          >
                            <Search className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => {
                              if (data.progress < 100) {
                                setToastMessage('커리큘럼을 수료하지 않았습니다.');
                                setShowToast(true);
                                setTimeout(() => setShowToast(false), 2000);
                                return;
                              }
                              if (data.user.name !== '김학습') {
                                setToastMessage('이 데이터는 샘플입니다.');
                                setShowToast(true);
                                setTimeout(() => setShowToast(false), 2000);
                                return;
                              }
                              setShowFinalReportModal(data);
                            }}
                            className={`flex items-center text-sm font-medium transition-colors ${
                              data.progress >= 100 
                                ? 'text-lg-button hover:text-lg-button-hover cursor-pointer' 
                                : 'text-gray-400 cursor-not-allowed'
                            }`}
                            disabled={data.progress < 100}
                          >
                            <FileText className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {openDetailIndex === index && (
                      <tr>
                        <td colSpan={7} className="bg-lg-neutral/10 px-8 py-6">
                          {/* 김학습의 상세 토글: 사용자별 레슨 결과 리스트 */}
                          {data.user.name === '김학습' ? (
                            <div className="overflow-x-auto">
                              <table className="min-w-full divide-y divide-gray-200">
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {userLessonResults.map((item, idx) => (
                                    <tr key={idx}>
                                      <td className="px-4 py-5">
                                        <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-gray-200 text-gray-700 font-bold text-sm">
                                          {idx + 1}
                                        </div>
                                      </td>
                                      <td className="px-4 py-2">{item.moduleTitle}</td>
                                      <td className="px-4 py-2">{item.lessonTitle}</td>
                                      <td className="px-4 py-2">
                                        <div className="flex items-center space-x-2">
                                          <div className="w-16 bg-gray-200 rounded h-2">
                                            <div
                                              className={`${(item.progress || 0) === 100 ? 'bg-lg-done' : (item.progress || 0) > 0 ? 'bg-lg-progress' : 'bg-gray-400'} h-2 rounded`}
                                              style={{ width: `${item.progress || 0}%` }}
                                            />
                                          </div>
                                          <span className="text-xs text-gray-600">{item.progress}%</span>
                                        </div>
                                      </td>
                                      <td className="px-4 py-2">
                                        <span className={
                                          item.status === 'completed'
                                            ? 'bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold'
                                          : item.status === 'in_progress'
                                                                                        ? 'bg-lg-tertiary text-gray-700 px-2 py-1 rounded-full text-xs font-semibold'
                                          : 'bg-gray-200 text-gray-200 px-2 py-1 rounded-full text-xs font-semibold'
                                        }>
                                          {item.status === 'completed' ? '완료' : item.status === 'in_progress' ? '진행중' : '미시작'}
                                        </span>
                                      </td>
                                      <td className="px-4 py-2">{item.completedAt || '예정'}</td>
                                      <td className="px-4 py-2">
                                        <button 
                                          onClick={() => setShowLessonResultModal(item)}
                                          className="bg-lg-button text-white px-4 py-2 rounded hover:bg-lg-button-hover text-sm font-semibold"
                                        >
                                          학습결과
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <div className="space-y-6">
                              {data.curriculum.modules.map((module, mIdx) => (
                                <div key={module.id || mIdx} className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-100">
                                  <h3 className="text-md font-bold text-lg-primary mb-3" style={{ fontSize: '18px' }}>{module.title}</h3>
                                  <div className="space-y-3">
                                    {module.lessons.map((lesson, lessonIdx) => (
                                      <div key={lesson.id || lessonIdx} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-300 text-gray-700 font-bold mr-4 text-base">
                                          {lessonIdx + 1}
                                        </div>
                                        <div className="flex-1">
                                          <div className="flex items-center">
                                            <span className="text-base font-bold text-black mr-2" style={{ fontSize: '16px' }}>{lesson.title}</span>
                                            <span
                                              className={`px-3 py-1 rounded-full text-xs font-semibold ml-1 ${lesson.status === 'completed' ? 'bg-green-100 text-green-700' : lesson.status === 'in_progress' ? 'bg-lg-tertiary text-gray-700' : 'bg-gray-200 text-gray-500'}`}
                                            >
                                              {getStatusText(lesson.status)}
                                            </span>
                                          </div>
                                          <div className="flex items-center space-x-4 mt-1">
                                            <div className="text-sm text-gray-500">완료일 : {(lesson as any).lesson_completed_at || '예정'}</div>
                                          </div>
                                          <div className="flex items-center space-x-2 mt-2">
                                            <div className="w-20 bg-gray-200 rounded h-2">
                                              <div
                                                className={`${(lesson.progress || 0) === 100 ? 'bg-lg-done' : (lesson.progress || 0) > 0 ? 'bg-lg-progress' : 'bg-gray-400'} h-2 rounded`}
                                                style={{ width: `${lesson.progress || 0}%` }}
                                              />
                                            </div>
                                            <span className="text-xs text-gray-600">{lesson.progress || 0}%</span>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 상세 조회 모달 */}
      {showDetailModal && (
        <LearningDetailModal
          data={showDetailModal}
          onClose={() => setShowDetailModal(null)}
        />
      )}

      {/* 학습결과 상세 모달 */}
      {showLessonResultModal && (
        <LessonResultModal
          lessonData={showLessonResultModal}
          onClose={() => setShowLessonResultModal(null)}
        />
      )}

      {/* 최종 리포트 모달 */}
      {showFinalReportModal && (
        <FinalReportModal
          data={showFinalReportModal}
          onClose={() => setShowFinalReportModal(null)}
        />
      )}

      {/* 토스트 팝업 */}
      {showToast && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-lg-primary text-white px-6 py-3 rounded-lg shadow-lg font-normal text-center min-w-[220px]">
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
};

interface LearningDetailModalProps {
  data: LearningResult;
  onClose: () => void;
}

const LearningDetailModal: React.FC<LearningDetailModalProps> = ({ data, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[800px] max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">학습 결과 상세</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">학습자 정보</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">이름:</span>
                  <span className="text-gray-800">{data.user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">사번:</span>
                  <span className="text-gray-800">{data.user.employeeId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">직급:</span>
                  <span className="text-gray-800">{data.user.position}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">부서:</span>
                  <span className="text-gray-800">{data.user.department}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">학습 현황</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">진행률:</span>
                  <span className="text-gray-800">{data.progress}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">상태:</span>
                  <span className="text-gray-800">{getStatusText(data.status)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">수료일자:</span>
                  <span className="text-gray-800">{data.completionDate || '예정'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">획득 포인트:</span>
                  <span className="text-lg-primary font-semibold">{data.points}점</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">레슨 목록</h3>
            <div className="space-y-3">
              {data.curriculum.modules.map((module) =>
                module.lessons.map((lesson) => (
                  <div key={lesson.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-800">{module.title} - {lesson.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span>상태: {getStatusText(lesson.status)}</span>
                          {lesson.status === 'completed' && (
                            <span>수료일자: 2025.07.04</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`${lesson.progress === 100 ? 'bg-lg-done' : lesson.progress > 0 ? 'bg-lg-progress' : 'bg-gray-400'} h-2 rounded-full`}
                            style={{ width: `${lesson.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{lesson.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {data.status === 'completed' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">학습 결과</h3>
              <div className="space-y-4">
                <div className="bg-lg-tertiary p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">VOD</h4>
                  <p className="text-sm text-gray-600">전체 영상 시청 완료 (100%)</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">메타인지 다이어리 입력 결과</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Q1:</strong> 영상을 보기 전에는 단순히 암기된 공식을 사용해서 문제를 풀려고 했을 것입니다...</p>
                    <p><strong>Q2:</strong> 이제는 단위의 관계를 이해하고 체계적으로 접근할 수 있습니다...</p>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">최종 리포트 입력 결과</h4>
                  <p className="text-sm text-gray-600">수감각 과제를 통해 실무에서 접하는 데이터의 합리성을 판단하는 능력을 향상시켰습니다...</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full bg-lg-button font-bold text-lg text-white py-3 px-8 rounded-lg hover:bg-lg-button-hover transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

interface LessonResultModalProps {
  lessonData: any;
  onClose: () => void;
}

const LessonResultModal: React.FC<LessonResultModalProps> = ({ lessonData, onClose }) => {
  // YouTube URL을 embed URL로 변환하는 함수
  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return '';
    
    // YouTube URL에서 video ID 추출
    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : '';
    
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
    }
    return url;
  };

  // 레슨 제목으로 curriculumData에서 videoUrl 찾기
  const getVideoUrl = () => {
    // 김학습의 첫 번째 레슨: '8천, 9천, 그 다음은?' - videoUrl 없음
    // 김학습의 두 번째 레슨: '12천, 12개의 천도복숭아' - videoUrl 없음
    // 샘플용으로 다른 레슨의 videoUrl 사용
    if (lessonData.lessonTitle === '8천, 9천, 그 다음은?') {
      return 'https://youtu.be/DndMyo--qbk?si=N-fddl5iJaCjyQEm'; // lesson03의 URL
    } else if (lessonData.lessonTitle === '12천, 12개의 천도복숭아') {
      return 'https://youtu.be/OQbcOP6ECdk?si=ywVIWzd0dO5KXtfV'; // lesson16의 URL
    }
    return '';
  };

  // 해당 레슨의 다이어리 데이터 찾기
  const getDiaryData = () => {
    return lessonDiaryData.find(diary => diary.lessonTitle === lessonData.lessonTitle);
  };

  // 해당 레슨의 리포트 데이터 찾기
  const getReportData = () => {
    return lessonReportData.find(report => report.lessonTitle === lessonData.lessonTitle);
  };

  const videoUrl = getVideoUrl();
  const diaryData = getDiaryData();
  const reportData = getReportData();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[900px] max-h-[85vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">학습결과 상세</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* 기본 정보 - 고정 헤더 */}
        <div className="bg-gray-50 p-4 border-b border-gray-200 sticky top-0 z-10">
          <div className="grid grid-cols-3 gap-4 text-lg">
            <div className="text-center">
              <span className="text-gray-600">학습자 : </span>
              <span className="text-gray-800 font-semibold">대리 김학습</span>
            </div>
            <div className="text-center">
              <span className="text-gray-600">레슨 : </span>
              <span className="text-gray-800 font-semibold">{lessonData.lessonTitle}</span>
            </div>
            <div className="text-center">
              <span className="text-gray-600">완료일 : </span>
              <span className="text-gray-800 font-semibold">{lessonData.completedAt || '예정'}</span>
            </div>
          </div>
        </div>
        
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">

          {/* VOD 시청 */}
          <div className="bg-lg-neutral/10 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">VOD 시청</h3>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                {videoUrl && (
                  <div className="aspect-video">
                    <iframe
                      src={getYouTubeEmbedUrl(videoUrl)}
                      title={lessonData.lessonTitle}
                      className="w-full h-full rounded-lg"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 메타인지 다이어리 */}
          <div className="bg-lg-neutral/10 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">메타인지 다이어리</h3>
            {diaryData ? (
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-xl text-gray-800 mb-2">Q1. 영상을 보기 전의 나라면 이 문제를 어떻게 풀었을까?</h4>
                  <h4 className="text-base font-semibold text-lg-primary mb-3 mt-5">답변 결과</h4>
                  <p className="text-lg text-gray-700 leading-relaxed">{diaryData.q1Answer}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-xl text-gray-800 mb-2">Q2. 영상을 본 이후의 나는 이 문제를 어떻게 해결할 것인가?</h4>
                  <div className="text-lg text-gray-500 mb-2">
                    <p>• 문제에서 보는 핵심이 무엇인가요?</p>
                    <p>• 어렵다면 왜 어려운가요?</p>
                    <p>• 내가 이미 알고 있는 것은 무엇인가요?</p>
                  </div>
                  <h4 className="text-base font-semibold text-lg-primary mb-3 mt-5">답변 결과</h4>
                  <p className="text-lg text-gray-700 leading-relaxed">{diaryData.q2Answer}</p>
                </div>
              </div>
            ) : (
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <p className="text-sm text-gray-500 italic">작성된 다이어리가 없습니다.</p>
              </div>
            )}
          </div>


        </div>
        
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full bg-lg-button font-bold text-lg text-white py-3 px-8 rounded-lg hover:bg-lg-button-hover transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

interface FinalReportModalProps {
  data: LearningResult;
  onClose: () => void;
}

const FinalReportModal: React.FC<FinalReportModalProps> = ({ data, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[900px] max-h-[85vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">최종 리포트</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* 기본 정보 - 고정 헤더 */}
        <div className="bg-gray-50 p-4 border-b border-gray-200 sticky top-0 z-10">
          <div className="grid gap-4 text-lg" style={{ gridTemplateColumns: '1fr 3fr 2fr' }}>
            <div className="text-center">
              <span className="text-gray-600">작성자 : </span>
              <span className="text-gray-800 font-semibold">김학습</span>
            </div>
            <div className="text-center">
              <span className="text-gray-600">커리큘럼 : </span>
              <span className="text-gray-800 font-semibold">{data.curriculum.title}</span>
            </div>
            <div className="text-center">
              <span className="text-gray-600">작성일시 : </span>
              <span className="text-gray-800 font-semibold">2025.07.02 15:00</span>
            </div>
          </div>
        </div>
        
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {/* 수 감각 문항 */}
          <div className="bg-lg-neutral/10 p-4 rounded-lg">
            <div className="space-y-4">
              {/* 질문 영역 */}
              <div className="bg-white p-4 rounded-lg">
                <p className="text-xl font-bold text-gray-700 mb-3">최근에 보고 받은 자료를 하나 선택하여 포함되어 있는 숫자들의 합리성을 판단하시오.</p>
                <div className="text-lg text-gray-600">
                  <p>• 단위 변환에 문제가 없는가?</p>
                  <p>• 수행된 계산 결과의 크기가 적절한가?</p>
                  <p>• 적절한 수들끼리 관계 지어 연산이 이루어졌는가?</p>
                </div>
              </div>
              
              {/* 답변 영역 */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="text-lg font-semibold text-lg-primary pl-4 mb-3 mt-5">제출 결과</h4>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    최근 분기 매출 보고서에서 월별 매출 증가율이 15%, 20%, 35%로 표시되어 있었습니다. 
                    이 수치들을 살펴보면 단위는 모두 퍼센트로 일관되게 표시되어 문제가 없어 보입니다. 
                    하지만 35%라는 마지막 달의 증가율이 앞선 두 달에 비해 급격히 높아 보입니다.
                    <br /><br />
                    계산 결과의 크기를 검토해보니, 기준 매출액 대비 35% 증가는 특별한 마케팅 캠페인이나 
                    계절적 요인이 없다면 다소 과도해 보입니다. 전년 동기 대비로 비교했을 때도 
                    업계 평균 성장률을 크게 상회하는 수치입니다.
                    <br /><br />
                    또한 각 월별 데이터가 누적 증가율이 아닌 전월 대비 증가율로 
                    올바르게 계산되었는지 확인이 필요합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full bg-lg-button font-bold text-lg text-white py-3 px-8 rounded-lg hover:bg-lg-button-hover transition-colors"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return '완료';
    case 'in_progress':
      return '진행중';
    case 'not_started':
      return '미시작';
    default:
      return '미시작';
  }
};

export default AdminDashboard;