import React, { useState } from 'react';
import { Search, Play, RefreshCw, BookOpen, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { curriculumData, completedCurriculumData } from '../data/mockData';
import { Curriculum } from '../types';
import LessonModal from './LessonModal';
import ReportModal from './ReportModal';

const StudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'learning' | 'completed'>('learning');
  const [searchTerm, setSearchTerm] = useState('');
  const [openCurriculum, setOpenCurriculum] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [reportCurriculum, setReportCurriculum] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState<string>('');

  const currentCurriculums = activeTab === 'learning' ? curriculumData : completedCurriculumData;
  
  const filteredCurriculums = currentCurriculums.filter(curriculum =>
    curriculum.curriculum_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    curriculum.curriculum_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusText = {
    not_started: '미시작',
    in_progress: '진행중',
    completed: '완료',
  } as const;
  const statusColor = {
    not_started: 'text-gray-400',
    in_progress: 'text-blue-500',
    completed: 'text-green-600',
  } as const;

  // 레슨 팝업 연결 대상 레슨명
  const lessonPopupTitles = [
    '만억조경해, 깨봉만만보드',
    '천재의 특징, 피카소와 황소',
    '막대그래프와 꺾은선그래프',
  ];

  const handleCurriculumToggle = (curriculumId: string) => {
    if (activeTab === 'completed') {
      setToastMessage('이 데이터는 샘플입니다.');
      setTimeout(() => setToastMessage(''), 2000);
      return;
    }
    setOpenCurriculum(openCurriculum === curriculumId ? null : curriculumId);
  };

  // curriculumData -> Curriculum 타입 변환 함수
  function convertCurriculumDataToCurriculum(data: any): Curriculum {
    return {
      id: data.curriculum_id,
      code: data.curriculum_id,
      title: data.curriculum_title,
      lessonCount: data.modules.reduce((acc: number, m: any) => acc + m.lessons.length, 0),
      period: `${data.duration_start}~${data.duration_end}`,
      status: data.status,
      completionDate: data.curriculum_completed_at || undefined,
      points: 80, // 필요시 data에서 추출
      modules: data.modules.map((mod: any) => ({
        id: mod.module_id,
        title: mod.module_title,
        lessons: mod.lessons.map((les: any) => ({
          id: les.lesson_id,
          title: les.lesson_title,
          progress: les.progress || 0,
          status: les.status,
          videoUrl: les.videoUrl,
          quizzes: les.quizzes || []
        }))
      }))
    };
  }

  const handleLessonClick = (curriculum: any, module: any, lesson: any) => {
    if (lessonPopupTitles.includes(lesson.lesson_title)) {
      // 타입 변환
      const convertedCurriculum = convertCurriculumDataToCurriculum(curriculum);
      const convertedModule = convertedCurriculum.modules.find(m => m.id === module.module_id || m.title === module.module_title);
      // find 조건 robust하게 보완
      const convertedLesson = convertedModule?.lessons.find(l =>
        l.id === lesson.lesson_id ||
        l.id === lesson.id ||
        l.title === lesson.lesson_title ||
        l.title === lesson.title
      );
      setSelectedLesson({
        curriculum: convertedCurriculum,
        module: convertedModule,
        lesson: convertedLesson,
        originalCurriculum: curriculum // 원본 커리큘럼 정보 추가
      });
    } else {
      setToastMessage('이 데이터는 샘플입니다.');
      setTimeout(() => setToastMessage(''), 2000);
    }
  };

  const handleShowReport = () => {
    if (selectedLesson && selectedLesson.originalCurriculum) {
      setReportCurriculum(selectedLesson.originalCurriculum);
      setShowReportModal(true);
    }
  };

  // 토스트 팝업 컴포넌트
  const Toast = ({ message, color = 'blue' }: { message: string, color?: 'blue' | 'red' }) => (
    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className={`${color === 'red' ? 'bg-lg-toast' : 'bg-lg-primary'} text-white px-6 py-3 rounded-lg shadow-lg font-normal text-center min-w-[220px]`}>
        {message}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:space-x-5 md:justify-start space-y-2 md:space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 mb-0">학습하기</h1>
        <p className="text-gray-600 md:ml-2">나의 교육과정을 확인하고 학습니다.</p>
      </div>

      {/* 탭 네비게이션 */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('learning')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'learning'
                  ? 'border-lg-primary text-lg-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              진행중
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'completed'
                  ? 'border-lg-primary text-lg-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              완료
            </button>
          </nav>
        </div>
      </div>

      {/* 검색 */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="커리큘럼 제목 또는 코드로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lg-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* 커리큘럼 리스트 */}
      <div className="space-y-6">
        {['learning', 'completed'].includes(activeTab) && filteredCurriculums.map((curriculum) => {
          const lessonCount = (curriculum as any).lessonCount || curriculum.modules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0);
          return (
            <div key={curriculum.curriculum_id} className="bg-white rounded-lg shadow border border-gray-200">
              <div
                className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleCurriculumToggle(curriculum.curriculum_id)}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <h2 className="text-lg font-semibold text-gray-800 mr-3">{curriculum.curriculum_title}</h2>
                      <span
                        className={
                          `px-3 py-1 rounded-full text-xs font-semibold ml-1 ` +
                          (curriculum.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : curriculum.status === 'in_progress'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-200 text-gray-500')
                        }
                      >
                        {statusText[curriculum.status as keyof typeof statusText]}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mb-1 flex items-center">
                    <div className="inline-block bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-sm font-normal mr-3 align-middle">
                      {curriculum.curriculum_id}
                    </div>
                    <span>교육기간 : {curriculum.duration_start} ~ {curriculum.duration_end}</span>
                    <span className="mx-3">|</span>
                    <span>수료일 : {curriculum.curriculum_completed_at || '예정'}</span>
                    <span className="mx-3">|</span>
                    <span>레슨 : {lessonCount}개</span>
                  </div>
                </div>
                <button className="text-white font-medium px-4 py-2 rounded-lg bg-lg-button hover:bg-lg-button-hover">
                  {openCurriculum === curriculum.curriculum_id ? '닫기' : '상세보기'}
                </button>
              </div>
              {openCurriculum === curriculum.curriculum_id && activeTab === 'learning' && (
                <div className="p-6 pt-0 space-y-6">
                  {curriculum.modules.map((module: any) => (
                    <div key={module.module_id} className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-100">
                      <h3 className="text-md font-bold text-lg-primary mb-3" style={{ fontSize: '18px' }}>{module.module_title}</h3>
                      <div className="space-y-3">
                        {module.lessons.map((lesson: any, lessonIdx: number) => {
                          // 모듈 내에서 완료된 레슨 중 연번이 가장 큰 레슨 찾기
                          const maxCompletedIdx = module.lessons.reduce((maxIdx: number, l: any, idx: number) =>
                            l.status === 'completed' && idx > maxIdx ? idx : maxIdx, -1);
                          // [복습] 버튼: 완료된 레슨만 활성화(초록색)
                          const isReview = lesson.status === 'completed';
                          // [학습] 버튼: (maxCompletedIdx + 1) === lessonIdx만 활성화(파랑), 나머지는 모두 비활성화
                          const canLearn = lesson.status !== 'completed' && (maxCompletedIdx + 1 === lessonIdx);
                          const isDisabled = !isReview && !canLearn;

                          return (
                            <div key={lesson.lesson_id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded bg-gray-100 text-gray-700 font-bold mr-4 text-base">
                                {lessonIdx + 1}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center">
                                  <span className="text-base font-bold text-black mr-2" style={{ fontSize: '16px' }}>{lesson.lesson_title}</span>
                                  <span
                                    className={
                                      `px-3 py-1 rounded-full text-xs font-semibold ml-1 `+
                                      (lesson.status === 'completed'
                                        ? 'bg-green-100 text-green-700'
                                        : lesson.status === 'in_progress'
                                        ? 'bg-lg-tertiary text-gray-700'
                                        : 'bg-gray-200 text-gray-500')
                                    }
                                  >
                                    {statusText[lesson.status as keyof typeof statusText]}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-4 mt-1">
                                  <div className="text-sm text-gray-500">완료일 : {lesson.lesson_completed_at || '예정'}</div>
                                </div>
                                {/* 프로그래스바 */}
                                <div className="w-full bg-gray-200 rounded h-2 mt-2">
                                  <div
                                    className={
                                      lesson.status === 'completed'
                                        ? 'bg-green-500 h-2 rounded'
                                        : lesson.status === 'in_progress'
                                        ? 'bg-lg-primary h-2 rounded'
                                        : 'bg-gray-400 h-2 rounded'
                                    }
                                    style={{ width: `${lesson.progress || 0}%` }}
                                  />
                                </div>
                              </div>
                              <div className="ml-4">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleLessonClick(curriculum, module, lesson);
                                  }}
                                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                                    ${isReview
                                      ? 'bg-green-500 text-white hover:bg-green-600'
                                      : canLearn
                                        ? 'bg-lg-button text-white hover:bg-lg-button-hover'
                                        : 'bg-gray-100 text-gray-400'}
                                  `}
                                >
                                  {isReview ? '복습' : '학습'}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedLesson && (
        <LessonModal
          lesson={selectedLesson}
          onClose={() => setSelectedLesson(null)}
          onShowReport={handleShowReport}
        />
      )}
      
      {showReportModal && reportCurriculum && (
        <ReportModal
          curriculum={reportCurriculum}
          onClose={() => {
            setShowReportModal(false);
            setReportCurriculum(null);
          }}
        />
      )}
      
      {toastMessage && <Toast message={toastMessage} color={toastMessage === '순서대로 학습해 주세요.' ? 'red' : 'blue'} />}
    </div>
  );
};

export default StudentDashboard;