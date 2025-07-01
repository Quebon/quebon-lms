import React, { useState, useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';

type ReportStep = 'guide' | 'write' | 'complete';

interface ReportModalProps {
  curriculum: any; // mockData의 커리큘럼 정보
  onClose: () => void;
}

// 커리큘럼별 매핑 데이터
const CURRICULUM_CONFIG = {
  'EQ-C01-001': {
    goal: '보고 자료에 있는 숫자의 합리성을 즉각적으로 판단한다.',
    points: 200
  },
  'EQ-C02-001': {
    goal: '수학적 모델을 활용하여 변화를 예측한다.',
    points: 200
  },
  'EQ-C03-001': {
    goal: '데이터를 적절히 선택 및 가공하여 커뮤니케이션에 이용한다.',
    points: 200
  }
};

const ReportModal: React.FC<ReportModalProps> = ({ curriculum, onClose }) => {
  const [currentStep, setCurrentStep] = useState<ReportStep>('guide');
  const [reportAnswers, setReportAnswers] = useState({
    sense: '',
    predict: '',
    literacy: ''
  });
  const [toastMessage, setToastMessage] = useState('');
  const [completedAt, setCompletedAt] = useState<string | null>(null);

  // 수료일시 생성
  useEffect(() => {
    if (currentStep === 'complete' && !completedAt) {
      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');
      const hh = String(now.getHours()).padStart(2, '0');
      const min = String(now.getMinutes()).padStart(2, '0');
      setCompletedAt(`${yyyy}.${mm}.${dd} ${hh}:${min}`);
    }
  }, [currentStep, completedAt]);

  const curriculumConfig = CURRICULUM_CONFIG[curriculum.curriculum_id as keyof typeof CURRICULUM_CONFIG];

  // 작성 안내 단계 렌더링
  const renderGuideStep = () => {
    return (
      <div className="py-8 space-y-6">
        <div className="text-center space-y-10">
          <h3 className="text-3xl font-bold text-lg-primary">{curriculum.curriculum_title}</h3>
          
          <div className="bg-gray-200 rounded-lg p-10">
            <h4 className="text-2xl font-regular text-gray-600 mb-3">교육 목표</h4>
            <p className="text-gray-700 text-2xl font-bold">{curriculumConfig?.goal}</p>
          </div>
          
          <div className="text-gray-600 space-y-2">
            <p><span className="font-regular text-lg">교육기간 :</span> {curriculum.duration_start} ~ {curriculum.duration_end}</p>
          </div>
          
          <div className="mt-8">
            <button
              onClick={() => setCurrentStep('write')}
              className="bg-lg-button text-white px-8 py-3 rounded-lg hover:bg-lg-button-hover transition-colors text-lg font-bold"
            >
              작성 시작
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 리포트 작성 단계 렌더링
  const renderWriteStep = () => {
    const handleReportSubmit = () => {
      // 커리큘럼별 유효성 검사
      let isValid = false;
      if (curriculum.curriculum_id === 'EQ-C01-001') {
        isValid = reportAnswers.sense.trim() !== '';
      } else if (curriculum.curriculum_id === 'EQ-C02-001') {
        isValid = reportAnswers.predict.trim() !== '';
      } else if (curriculum.curriculum_id === 'EQ-C03-001') {
        isValid = reportAnswers.literacy.trim() !== '';
      }

      if (!isValid) {
        setToastMessage('답변을 입력해 주세요.');
        setTimeout(() => setToastMessage(''), 3000);
        return;
      }
      setCurrentStep('complete');
    };

    return (
      <div className="py-8 space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-lg-primary">{curriculum.curriculum_title}</h3>
        </div>
        
        <div className="space-y-6">
          {/* 수감각 섹션 - EQ-C01-001에만 표시 */}
          {curriculum.curriculum_id === 'EQ-C01-001' && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="space-y-3">
                <p className="text-xl font-bold text-gray-700">최근에 보고 받은 자료를 하나 선택하여 포함되어 있는 숫자들의 합리성을 판단하시오.</p>
                <div className="text-lg text-gray-600 space-y-1">
                  <p>• 단위 변환에 문제가 없는가?</p>
                  <p>• 수행된 계산 결과의 크기가 적절한가?</p>
                  <p>• 적절한 수들끼리 관계 지어 연산이 이루어졌는가?</p>
                </div>
                <textarea
                  value={reportAnswers.sense}
                  onChange={e => setReportAnswers(prev => ({ ...prev, sense: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-4 resize-none"
                  rows={8}
                  maxLength={1000}
                  placeholder="답변을 입력하세요 (최대 1,000자)"
                />
                <p className="text-sm text-gray-500 mt-1">{reportAnswers.sense.length}/1,000자</p>
              </div>
            </div>
          )}

          {/* 예측력 섹션 - EQ-C02-001에만 표시 */}
          {curriculum.curriculum_id === 'EQ-C02-001' && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="space-y-3">
                <p className="text-xl font-bold text-gray-700">최근에 보고 받은 자료를 하나 선택하여 관련 주제에 대한 단기적 변화를 예측해보자.</p>
                <div className="text-lg text-gray-600 space-y-1">
                  <p>• 변화를 알고자 하는 요소가 무엇인지 구체적으로 정의하시오.</p>
                  <p>• 알고자 하는 변화를 확인하기 위해서 자료에서 무시해야 할 요소가 어떤 것들이 있는가?</p>
                  <p>• 알고자 하는 변화를 유발하는 X를 무엇으로 설정해야 하는가?</p>
                  <p>• 주어진 자료에서 드러나지 않은 정보가 있다면?</p>
                </div>
                <textarea
                  value={reportAnswers.predict}
                  onChange={e => setReportAnswers(prev => ({ ...prev, predict: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-4 resize-none"
                  rows={8}
                  maxLength={1000}
                  placeholder="답변을 입력하세요 (최대 1,000자)"
                />
                <p className="text-sm text-gray-500 mt-1">{reportAnswers.predict.length}/1,000자</p>
              </div>
            </div>
          )}

          {/* 데이터 리터러시 섹션 - EQ-C03-001에만 표시 */}
          {curriculum.curriculum_id === 'EQ-C03-001' && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="space-y-3">
                <p className="text-xl font-bold text-gray-700">회사의 중·장기 전략 자료에 실린 데이터를 구체적으로 살펴보자.</p>
                <div className="text-lg text-gray-600 space-y-1">
                  <p>• 해당 자료에서 사용한 데이터의 종류를 나열하고, 종류별로 대푯값 혹은 시각적 표현방식을 설명하시오.</p>
                  <p>• 통계자료가 있다면 각각 표본의 크기와 표준편차를 확인하시오.</p>
                  <p>• 각각의 데이터가 어떤 의미를 도출하기 위한 근거로 사용되었는지 확인하고, 도출된 의미에서 데이터에 드러난 정보와 숨은 정보를 분류하시오.</p>
                </div>
                <textarea
                  value={reportAnswers.literacy}
                  onChange={e => setReportAnswers(prev => ({ ...prev, literacy: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-4 resize-none"
                  rows={8}
                  maxLength={1000}
                  placeholder="답변을 입력하세요 (최대 1,000자)"
                />
                <p className="text-sm text-gray-500 mt-1">{reportAnswers.literacy.length}/1,000자</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={handleReportSubmit}
            className="font-bold bg-lg-button text-white px-8 py-3 rounded-lg hover:bg-lg-button-hover transition-colors"
          >
            작성 완료
          </button>
        </div>
      </div>
    );
  };

  // 수료 확인 단계 렌더링
  const renderCompleteStep = () => {
    return (
      <div className="text-center py-12">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">수료를 축하합니다!</h2>
          <div className="inline-block bg-lg-primary rounded-lg px-6 py-3">
            <span className="text-2xl font-bold text-white">{curriculum.curriculum_title}</span>
          </div>
          <div className="text-gray-600 space-y-2">
            <p><span className="text-lg font-regular">교육기간 :</span> {curriculum.duration_start} ~ {curriculum.duration_end}</p>
            <p><span className="text-lg font-regular">수료일시 :</span> {completedAt || ''}</p>
          </div>
          <p className="text-lg-primary font-semibold text-lg">획득 포인트 : {curriculumConfig?.points || 200}p</p>
          <button
            onClick={onClose}
            className="mt-8 font-bold bg-lg-done text-white px-8 py-3 rounded-lg hover:bg-lg-done-hover transition-colors"
          >
            수료 확인
          </button>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'guide':
        return renderGuideStep();
      case 'write':
        return renderWriteStep();
      case 'complete':
        return renderCompleteStep();
      default:
        return null;
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-[90%] max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-600">최종 리포트</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
          
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {renderStepContent()}
          </div>
        </div>
      </div>
      
      {toastMessage && (
        <div className="fixed left-1/2 top-1/4 transform -translate-x-1/2 z-[9999]">
          <div className="px-6 py-3 rounded-lg shadow-lg bg-lg-toast text-white">
            {toastMessage}
          </div>
        </div>
      )}
    </>
  );
};

export default ReportModal; 