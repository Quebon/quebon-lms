import React, { useState, useEffect, useRef } from 'react';
import { X, Play, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { Curriculum, Module, Lesson } from '../types';

interface LessonModalProps {
  lesson: {
    curriculum: Curriculum;
    lesson: Lesson;
    module: Module;
  };
  onClose: () => void;
}

type LessonStep = 'start' | 'video' | 'quiz' | 'diary' | 'report' | 'complete';

// 유튜브 embed URL 변환 함수 추가
function getYoutubeEmbedUrl(url?: string) {
  if (!url) return '';
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  const longMatch = url.match(/v=([a-zA-Z0-9_-]+)/);
  let videoId = '';
  if (shortMatch) {
    videoId = shortMatch[1].split('?')[0];
  } else if (longMatch) {
    videoId = longMatch[1].split('&')[0];
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
}

const LessonModal: React.FC<LessonModalProps> = ({ lesson, onClose }) => {
  const [currentStep, setCurrentStep] = useState<LessonStep>('start');
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string[] }>({});
  const [showQuizResult, setShowQuizResult] = useState<{ [key: number]: boolean }>({});
  const [diaryAnswers, setDiaryAnswers] = useState({ q1: '', q2: '' });
  const [showToast, setShowToast] = useState(false);
  const [reportAnswers, setReportAnswers] = useState({
    sense: '',
    predict: '',
    literacy: ''
  });
  const [toastMessage, setToastMessage] = useState('');
  const [completedAt, setCompletedAt] = useState<string | null>(null);

  // 팝업 스크롤 컨테이너 ref
  const popupScrollRef = useRef<HTMLDivElement | null>(null);
  
  // 오디오 객체 미리 생성 및 preload
  const correctAudioRef = useRef<HTMLAudioElement | null>(null);
  const wrongAudioRef = useRef<HTMLAudioElement | null>(null);

  const steps: { key: LessonStep; label: string }[] = [
    { key: 'start', label: '레슨 시작' },
    { key: 'video', label: 'VOD 시청' },
    { key: 'quiz', label: '퀴즈풀기' },
    { key: 'diary', label: '메타인지 다이어리' },
    { key: 'report', label: '최종 리포트' },
    { key: 'complete', label: '레슨 완료' }
  ];

  const getCurrentStepIndex = () => steps.findIndex(step => step.key === currentStep);
  const progress = ((getCurrentStepIndex() + 1) / steps.length) * 100;

  const quizzes = lesson.lesson.quizzes || [];
  const currentQuiz = quizzes[currentQuizIndex];

  // 오디오 파일 미리 로드
  useEffect(() => {
    correctAudioRef.current = new Audio('/sounds/correct.wav');
    wrongAudioRef.current = new Audio('/sounds/wrong.wav');
    
    // preload 설정
    if (correctAudioRef.current) {
      correctAudioRef.current.preload = 'auto';
      correctAudioRef.current.load();
    }
    if (wrongAudioRef.current) {
      wrongAudioRef.current.preload = 'auto';
      wrongAudioRef.current.load();
    }

    // cleanup function
    return () => {
      if (correctAudioRef.current) {
        correctAudioRef.current.pause();
        correctAudioRef.current = null;
      }
      if (wrongAudioRef.current) {
        wrongAudioRef.current.pause();
        wrongAudioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (currentQuiz && currentQuiz.type === 'select_answer') {
      setSelectedAnswers(prev => ({
        ...prev,
        [currentQuizIndex]: []
      }));
    }
  }, [currentQuizIndex, currentQuiz]);

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
    if (currentStep !== 'complete' && completedAt) {
      setCompletedAt(null);
    }
  }, [currentStep, completedAt]);

  useEffect(() => {
    if (showQuizResult[currentQuizIndex]) {
      setTimeout(() => {
        const el = popupScrollRef.current;
        if (el) {
          el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
        }
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showQuizResult[currentQuizIndex]]);

  const handleClose = () => {
    if (currentStep !== 'start' && currentStep !== 'complete') {
      setToastMessage('완료하지 않은 학습은 다음에 이어서 할 수 있습니다.');
      setTimeout(() => {
        setToastMessage('');
        onClose();
      }, 3000);
      return;
    }
    onClose();
  };

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuizIndex]: [String(answerIndex)]
    }));
  };

  // 사운드 재생 함수
  const playSound = (type: 'correct' | 'wrong') => {
    const audio = type === 'correct' ? correctAudioRef.current : wrongAudioRef.current;
    if (audio) {
      audio.currentTime = 0; // 재생 위치를 처음으로 되돌림
      audio.play().catch(error => {
        console.log('Audio play failed:', error);
      });
    }
  };

  const handleQuizSubmit = () => {
    // 정답 판정
    let isCorrect = false;
    if (currentQuiz.type === 'multiple_choice') {
      const isMultiple = Array.isArray(currentQuiz.correctAnswer);
      const correctAnswerArr: number[] = isMultiple ? (currentQuiz.correctAnswer as number[]) : [currentQuiz.correctAnswer as number];
      isCorrect = isMultiple
        ? correctAnswerArr.every((ans: number) => Array.isArray(selectedAnswers[currentQuizIndex]) && selectedAnswers[currentQuizIndex].includes(String(ans)))
          && Array.isArray(selectedAnswers[currentQuizIndex]) && selectedAnswers[currentQuizIndex].length === correctAnswerArr.length
        : String(selectedAnswers[currentQuizIndex][0]) === String(currentQuiz.correctAnswer);
    } else if (currentQuiz.type === 'select_answer') {
      const correctAnswerArr: number[] = currentQuiz.correctAnswer as number[];
      isCorrect = Array.isArray(selectedAnswers[currentQuizIndex])
        && correctAnswerArr.every((ans, idx) => String(selectedAnswers[currentQuizIndex][idx]) === String(ans));
    }
    playSound(isCorrect ? 'correct' : 'wrong');

    setShowQuizResult(prev => ({
      ...prev,
      [currentQuizIndex]: true
    }));
  };

  const handleNextQuiz = () => {
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
    } else {
      setCurrentStep('diary');
    }
  };

  const handlePrevQuiz = () => {
    if (currentQuizIndex > 0) {
      setCurrentQuizIndex(prev => prev - 1);
    }
  };

  const handleDiarySubmit = () => {
    if (!diaryAnswers.q1.trim() || !diaryAnswers.q2.trim()) {
      setToastMessage('답변을 모두 작성해 주세요.');
      setTimeout(() => setToastMessage(''), 3000);
      return;
    }
    setCurrentStep('report');
  };

  const handleReportSubmit = () => {
    if (!reportAnswers.sense.trim() || !reportAnswers.predict.trim() || !reportAnswers.literacy.trim()) {
      setToastMessage('답변을 모두 작성해 주세요.');
      setTimeout(() => setToastMessage(''), 3000);
      return;
    }
    setCurrentStep('complete');
  };

  const renderSelectAnswerExpression = () => {
    if (!currentQuiz.expression) return null;
    const expr = currentQuiz.expression;
    const regex = /\[빈칸(\d+)\]/g;
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(expr)) !== null) {
      parts.push(expr.slice(lastIndex, match.index));
      const idx = Number(match[1]) - 1;
      const selectedValue = selectedAnswers[currentQuizIndex]?.[idx] ?? '';
      const isResult = showQuizResult[currentQuizIndex];
      const correctAnswers = currentQuiz.correctAnswer as number[];
      const isCorrect = isResult && selectedValue === String(correctAnswers[idx]);
      const isWrong = isResult && selectedValue !== '' && selectedValue !== String(correctAnswers[idx]);

      let border = 'border-gray-300';
      let bg = '';
      if (isResult) {
        if (isCorrect) {
          border = 'border-green-500';
          bg = 'bg-green-50';
        } else if (isWrong) {
          border = 'border-red-500';
          bg = 'bg-red-50';
        }
      }

      parts.push(
        <span key={idx} className={`inline-flex items-center ${bg} rounded`}>
          <div className="relative">
            <select
              className={`mx-2 px-2 pr-8 py-1 border ${border} rounded focus:border-transparent appearance-none`}
              value={selectedValue}
              onChange={e => {
                const value = e.target.value;
                setSelectedAnswers(prev => {
                  const arr = prev[currentQuizIndex] ? [...prev[currentQuizIndex]] : [];
                  arr[idx] = value;
                  const updated = { ...prev, [currentQuizIndex]: arr };
                  console.log('onChange', { value, updated });
                  return updated;
                });
              }}
              disabled={isResult}
            >
              <option value="" disabled>정답선택</option>
              {Array.isArray(currentQuiz.options) && Array.isArray((currentQuiz.options as string[][])[idx]) && (currentQuiz.options as string[][])[idx].map((option: string, i: number) => (
                <option key={i} value={String(i)}>{option}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
            </span>
          </div>
          {isResult && isCorrect && (
            <CheckCircle className="h-5 w-5 text-green-500 ml-1" />
          )}
          {isResult && isWrong && (
            <X className="h-5 w-5 text-red-500 ml-1" />
          )}
        </span>
      );
      lastIndex = regex.lastIndex;
    }
    parts.push(expr.slice(lastIndex));
    return parts;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'start':
        return (
          <div className="text-center py-12">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">{lesson.curriculum.title}</h3>
              <p className="text-lg text-gray-600">[ {lesson.module.title} ]</p>
              <div className="inline-block bg-gray-500 rounded-lg px-6 py-3">
                <span className="text-xl font-bold text-white">{lesson.lesson.title}</span>
              </div>
              <p className="text-gray-600">소요시간 : 30분</p>
              <p className="text-lg-primary font-semibold">배정 포인트 : 80p</p>
              <button
                onClick={() => setCurrentStep('video')}
                className="mt-8 bg-lg-button text-white px-8 py-3 rounded-lg hover:bg-lg-button-hover transition-colors flex items-center space-x-2 mx-auto"
              >
                <span>학습 시작</span>
              </button>
            </div>
          </div>
        );

      case 'video':
        const embedUrl = getYoutubeEmbedUrl(lesson.lesson.videoUrl);
        console.log('VOD iframe src:', embedUrl, '원본:', lesson.lesson.videoUrl);
        if (!embedUrl) {
          return <div className="text-center py-12 text-red-500">영상 URL이 등록되어 있지 않습니다.</div>;
        }
        return (
          <div className="py-8">
            <div className="aspect-video bg-gray-900 rounded-lg mb-6">
              <iframe
                src={embedUrl}
                className="w-full h-full rounded-lg"
                allowFullScreen
              />
            </div>
            <div className="text-center">
              <button
                onClick={() => setCurrentStep('quiz')}
                className="bg-lg-button text-white px-6 py-2 rounded-lg hover:bg-lg-button-hover transition-colors"
              >
                시청 완료
              </button>
            </div>
          </div>
        );

      case 'quiz': {
        if (!currentQuiz) return null;
        const isMultipleChoiceAnswered = Array.isArray(selectedAnswers[currentQuizIndex]) && selectedAnswers[currentQuizIndex][0] !== undefined && selectedAnswers[currentQuizIndex][0] !== '';
        return (
          <div className="py-8">
            <div className="mb-4 flex items-center space-x-4">
              <span className="text-sm text-gray-600">퀴즈 {currentQuizIndex + 1}/{quizzes.length}</span>
              <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-500 font-medium">
                {currentQuiz.type === 'multiple_choice' && '4지선다'}
                {currentQuiz.type === 'select_answer' && '정답고르기'}
                {/* 추후 O/X, 선잇기 등 추가 유형도 여기에 표시 */}
              </span>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">{currentQuiz.question}</h3>
              
              <div className="space-y-3">
                {currentQuiz.type === 'multiple_choice' && currentQuiz.example && (
                  (() => {
                    if (Array.isArray(currentQuiz.example)) {
                      const isTextOnly = currentQuiz.example.every(item => item.type === 'text');
                      const isMixed = currentQuiz.example.some(item => item.type === 'image');
                      if (isTextOnly) {
                        return (
                          <div className="mb-2 px-6 py-4 bg-gray-100 rounded text-xl font-mono text-gray-700" style={{ fontSize: '1.5em' }}>
                            {currentQuiz.example.map((item, idx) => <span key={idx}>{item.value}</span>)}
                          </div>
                        );
                      }
                      if (isMixed) {
                        return (
                          <div className="mb-2 px-6 py-4 bg-gray-100 rounded font-mono text-gray-700 flex flex-col items-center gap-2 w-full text-center">
                            {currentQuiz.example.filter(item => item.type === 'text').map((item, idx) =>
                              <span key={idx} className="text-base w-full block">{item.value}</span>
                            )}
                            {currentQuiz.example.filter(item => item.type === 'image').map((item, idx) =>
                              <img key={idx} src={item.value} alt="quiz example" className="inline-block max-h-80 align-middle mx-2 w-auto" />
                            )}
                          </div>
                        );
                      }
                    }
                    return null;
                  })()
                )}
                {currentQuiz.type === 'multiple_choice' && (currentQuiz.options as string[]).map((option: string, index: number) => {
                  const isMultiple = Array.isArray(currentQuiz.correctAnswer);
                  const correctAnswerArr: number[] = isMultiple ? (currentQuiz.correctAnswer as number[]) : [currentQuiz.correctAnswer as number];
                  const selected = Array.isArray(selectedAnswers[currentQuizIndex]) && selectedAnswers[currentQuizIndex].includes(String(index));
                  const isResult = showQuizResult[currentQuizIndex];
                  let isCorrect = false;
                  let isWrong = false;
                  let showCheck = false;
                  let border = 'border-gray-300 hover:border-gray-400';
                  let bg = '';
                  let icon = null;
                  if (isResult) {
                    if (isMultiple) {
                      isCorrect = correctAnswerArr.includes(index) && selected;
                      isWrong = selected && !correctAnswerArr.includes(index);
                      showCheck = correctAnswerArr.includes(index);
                    } else {
                      isCorrect = String(currentQuiz.correctAnswer) === String(index) && selected;
                      isWrong = selected && String(currentQuiz.correctAnswer) !== String(index);
                      showCheck = String(currentQuiz.correctAnswer) === String(index);
                    }
                    if (isCorrect) {
                      border = 'border-green-500';
                      bg = 'bg-green-50';
                      icon = <CheckCircle className="h-5 w-5 text-green-500 inline ml-2" />;
                    } else if (isWrong) {
                      border = 'border-red-500';
                      bg = 'bg-red-50';
                      icon = <X className="h-5 w-5 text-red-500 inline ml-2" />;
                    } else if (!selected && showCheck) {
                      border = 'border-green-500';
                      bg = 'bg-green-50';
                      icon = <CheckCircle className="h-5 w-5 text-green-500 inline ml-2" />;
                    }
                  } else if (selected) {
                    bg = 'bg-lg-button/20';
                  }
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (isResult) return;
                        setSelectedAnswers(prev => {
                          const prevArr = Array.isArray(prev[currentQuizIndex]) ? [...prev[currentQuizIndex]] : [];
                          if (isMultiple) {
                            // checkbox: toggle
                            if (prevArr.includes(String(index))) {
                              return { ...prev, [currentQuizIndex]: prevArr.filter(v => v !== String(index)) };
                            } else {
                              return { ...prev, [currentQuizIndex]: [...prevArr, String(index)] };
                            }
                          } else {
                            // radio: single
                            return { ...prev, [currentQuizIndex]: [String(index)] };
                          }
                        });
                      }}
                      disabled={isResult}
                      className={`w-full text-left p-4 border rounded-lg transition-colors ${border} ${bg} ${isResult ? 'cursor-default' : ''} flex items-center`}
                    >
                      {isMultiple && (
                        <input
                          type="checkbox"
                          checked={selected}
                          readOnly
                          className="mr-2 h-4 w-4 accent-lg-primary"
                        />
                      )}
                      <span className="font-medium mr-2">{index + 1}.</span>
                      {option}
                      {icon}
                    </button>
                  );
                })}
                {currentQuiz.type === 'select_answer' && (
                  <div className="flex flex-col items-start space-y-4">
                    {currentQuiz.example && (
                      (() => {
                        if (Array.isArray(currentQuiz.example)) {
                          const isTextOnly = currentQuiz.example.every(item => item.type === 'text');
                          const isMixed = currentQuiz.example.some(item => item.type === 'image');
                          if (isTextOnly) {
                            return (
                              <div className="mb-2 px-6 py-4 bg-gray-100 rounded text-xl font-mono text-gray-700" style={{ fontSize: '1.5em' }}>
                                {currentQuiz.example.map((item, idx) => <span key={idx}>{item.value}</span>)}
                              </div>
                            );
                          }
                          if (isMixed) {
                            return (
                              <div className="mb-2 px-6 py-4 bg-gray-100 rounded font-mono text-gray-700 flex flex-col items-center gap-2 w-full text-center">
                                {currentQuiz.example.filter(item => item.type === 'text').map((item, idx) =>
                                  <span key={idx} className="text-sm w-full block">{item.value}</span>
                                )}
                                {currentQuiz.example.filter(item => item.type === 'image').map((item, idx) =>
                                  <img key={idx} src={item.value} alt="quiz example" className="inline-block max-h-40 align-middle mx-2 w-auto" />
                                )}
                              </div>
                            );
                          }
                        }
                        return null;
                      })()
                    )}
                    <div className="text-lg font-medium text-gray-800">
                      {renderSelectAnswerExpression()}
                    </div>
                  </div>
                )}
              </div>

              {/* [정답확인] 버튼 조건 수정 */}
              {!showQuizResult[currentQuizIndex] && (
                (currentQuiz.type === 'multiple_choice' && (
                  (Array.isArray(currentQuiz.correctAnswer)
                    ? Array.isArray(selectedAnswers[currentQuizIndex]) && selectedAnswers[currentQuizIndex].length > 0
                    : Array.isArray(selectedAnswers[currentQuizIndex]) && selectedAnswers[currentQuizIndex][0] !== undefined && selectedAnswers[currentQuizIndex][0] !== '')
                )) ||
                (currentQuiz.type === 'select_answer' && Array.isArray(selectedAnswers[currentQuizIndex]) && selectedAnswers[currentQuizIndex].some(v => v !== undefined && v !== ''))
              ) && (
                <div className="flex justify-end">
                  <button
                    onClick={handleQuizSubmit}
                    className="bg-lg-button text-white px-6 py-2 rounded-lg hover:bg-lg-button-hover transition-colors"
                  >
                    정답 확인
                  </button>
                </div>
              )}

              {showQuizResult[currentQuizIndex] && (() => {
                const isMultiple = Array.isArray(currentQuiz.correctAnswer);
                const correctAnswerArr: number[] = isMultiple ? (currentQuiz.correctAnswer as number[]) : [currentQuiz.correctAnswer as number];
                const isCorrectAll = correctAnswerArr.every((ans: number) => Array.isArray(selectedAnswers[currentQuizIndex]) && selectedAnswers[currentQuizIndex].includes(String(ans))) && Array.isArray(selectedAnswers[currentQuizIndex]) && selectedAnswers[currentQuizIndex].length === correctAnswerArr.length;
                return (
                  <div className="space-y-3">
                    {/* 정오답 결과 영역 */}
                    <div className="bg-lg-neutral/10 p-4 rounded-lg">
                      <div className="flex items-center space-x-2">
                        {isMultiple
                          ? isCorrectAll
                            ? (
                              <>
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <span className="text-green-600 font-medium">정답입니다!</span>
                              </>
                            ) : (
                              <>
                                <X className="h-5 w-5 text-red-500" />
                                <span className="text-red-600 font-medium">오답입니다.</span>
                              </>
                            )
                          : String(selectedAnswers[currentQuizIndex][0]) === String(currentQuiz.correctAnswer) ? (
                            <>
                              <CheckCircle className="h-5 w-5 text-green-500" />
                              <span className="text-green-600 font-medium">정답입니다!</span>
                            </>
                          ) : (
                            <>
                              <X className="h-5 w-5 text-red-500" />
                              <span className="text-red-600 font-medium">오답입니다.</span>
                            </>
                          )}
                      </div>
                    </div>
                    
                    {/* 해설 영역 */}
                    <div className="bg-lg-neutral/10 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">해설</h4>
                      <p className="text-gray-700 whitespace-pre-line">{currentQuiz.explanation}</p>
                    </div>
                  </div>
                );
              })()}

              {showQuizResult[currentQuizIndex] && (
                <div className="flex justify-between">
                  <button
                    onClick={handlePrevQuiz}
                    disabled={currentQuizIndex === 0}
                    className="flex items-center space-x-1 bg-lg-button text-white px-4 py-2 rounded-lg hover:bg-lg-button-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>이전 문제</span>
                  </button>
                  <button
                    onClick={handleNextQuiz}
                    className="flex items-center space-x-1 bg-lg-button text-white px-4 py-2 rounded-lg hover:bg-lg-button-hover transition-colors"
                  >
                    <span>{currentQuizIndex === quizzes.length - 1 ? '퀴즈완료' : '다음 문제'}</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      }

      case 'diary':
        return (
          <div className="py-8 space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">메타인지 다이어리</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-base font-bold text-gray-700 mb-2">
                  Q1. 영상을 보기 전의 나라면 이 문제를 어떻게 풀었을까?
                </label>
                <textarea
                  value={diaryAnswers.q1}
                  onChange={(e) => setDiaryAnswers(prev => ({ ...prev, q1: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#4599FF] focus:border-transparent resize-none"
                  rows={4}
                  maxLength={1000}
                  placeholder="답변을 입력하세요 (최대 1,000자)"
                />
                <p className="text-sm text-gray-500 mt-1">{diaryAnswers.q1.length}/1,000자</p>
              </div>
              
              <div>
                <label className="block text-base font-bold text-gray-700 mb-2">
                  Q2. 영상을 본 이후의 나는 이 문제를 어떻게 해결할 것인가?
                </label>
                <div className="text-sm text-gray-600 mb-2">
                  <p>• 문제에서 보는 핵심이 무엇인가요?</p>
                  <p>• 어렵다면 왜 어려운가요?</p>
                  <p>• 내가 이미 알고 있는 것은 무엇인가요?</p>
                </div>
                <textarea
                  value={diaryAnswers.q2}
                  onChange={(e) => setDiaryAnswers(prev => ({ ...prev, q2: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#4599FF] focus:border-transparent resize-none"
                  rows={4}
                  maxLength={1000}
                  placeholder="답변을 입력하세요 (최대 1,000자)"
                />
                <p className="text-sm text-gray-500 mt-1">{diaryAnswers.q2.length}/1,000자</p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={handleDiarySubmit}
                className="bg-[#4599FF] text-white px-6 py-2 rounded-lg hover:bg-[#3577CC] transition-colors"
              >
                작성완료
              </button>
            </div>
          </div>
        );

      case 'report':
        return (
          <div className="py-8 space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">최종 리포트</h3>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-lg-primary mb-3">수감각</h4>
                <div className="space-y-3">
                  <p className="font-bold text-gray-700">최근에 보고 받은 자료를 하나 선택하여 포함되어 있는 숫자들의 합리성을 판단하시오.</p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• 단위 변환에 문제가 없는가?</p>
                    <p>• 수행된 계산 결과의 크기가 적절한가?</p>
                    <p>• 적절한 수들끼리 관계 지어 연산이 이루어졌는가?</p>
                  </div>
                  <textarea
                    value={reportAnswers.sense}
                    onChange={e => setReportAnswers(prev => ({ ...prev, sense: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-4 focus:ring-2 focus:ring-[#4599FF] focus:border-transparent resize-none"
                    rows={4}
                    maxLength={1000}
                    placeholder="답변을 입력하세요 (최대 1,000자)"
                  />
                  <p className="text-sm text-gray-500 mt-1">{reportAnswers.sense.length}/1,000자</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-lg-primary mb-3">예측력</h4>
                <div className="space-y-3">
                  <p className="font-bold text-gray-700">최근에 보고 받은 자료를 하나 선택하여 관련 주제에 대한 단기적 변화를 예측해보자.</p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• 변화를 알고자 하는 요소가 무엇인지 구체적으로 정의하시오.</p>
                    <p>• 알고자 하는 변화를 확인하기 위해서 자료에서 무시해야 할 요소가 어떤 것들이 있는가?</p>
                    <p>• 알고자 하는 변화를 유발하는 X를 무엇으로 설정해야 하는가?</p>
                    <p>• 주어진 자료에서 드러나지 않은 정보가 있다면?</p>
                  </div>
                  <textarea
                    value={reportAnswers.predict}
                    onChange={e => setReportAnswers(prev => ({ ...prev, predict: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-4 focus:ring-2 focus:ring-[#4599FF] focus:border-transparent resize-none"
                    rows={4}
                    maxLength={1000}
                    placeholder="답변을 입력하세요 (최대 1,000자)"
                  />
                  <p className="text-sm text-gray-500 mt-1">{reportAnswers.predict.length}/1,000자</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-lg-primary mb-3">데이터 리터러시</h4>
                <div className="space-y-3">
                  <p className="font-bold text-gray-700">회사의 중·장기 전략 자료에 실린 데이터를 구체적으로 살펴보자.</p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• 해당 자료에서 사용한 데이터의 종류를 나열하고, 종류별로 대푯값 혹은 시각적 표현방식을 설명하시오.</p>
                    <p>• 통계자료가 있다면 각각 표본의 크기와 표준편차를 확인하시오.</p>
                    <p>• 각각의 데이터가 어떤 의미를 도출하기 위한 근거로 사용되었는지 확인하고, 도출된 의미에서 데이터에 드러난 정보와 숨은 정보를 분류하시오.</p>
                  </div>
                  <textarea
                    value={reportAnswers.literacy}
                    onChange={e => setReportAnswers(prev => ({ ...prev, literacy: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-4 focus:ring-2 focus:ring-[#4599FF] focus:border-transparent resize-none"
                    rows={4}
                    maxLength={1000}
                    placeholder="답변을 입력하세요 (최대 1,000자)"
                  />
                  <p className="text-sm text-gray-500 mt-1">{reportAnswers.literacy.length}/1,000자</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={handleReportSubmit}
                className="bg-[#4599FF] text-white px-6 py-2 rounded-lg hover:bg-[#3577CC] transition-colors"
              >
                작성완료
              </button>
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">{lesson.curriculum.title}</h3>
              <p className="text-lg text-gray-600">[ {lesson.module.title} ]</p>
              <div className="inline-block bg-gray-500 rounded-lg px-6 py-3">
                <span className="text-xl font-bold text-white">{lesson.lesson.title}</span>
              </div>
              <p className="text-gray-600">완료일시 : {completedAt || ''}</p>
              <p className="text-lg-primary font-semibold text-lg">획득 포인트 : 80p</p>
              <button
                onClick={onClose}
                className="mt-8 bg-lg-done text-white px-8 py-3 rounded-lg hover:bg-lg-done-hover transition-colors"
              >
                레슨 완료
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // 렌더링 시점에 상태 추적 로그
  console.log('렌더링', { selectedAnswers, currentQuizIndex });

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-[90%] max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              {currentStep === 'start' && (
                <h2 className="text-2xl font-semibold text-gray-600">학습을 시작합니다.</h2>
              )}
              {currentStep === 'complete' && (
                <h2 className="text-2xl font-semibold text-gray-600">학습을 완료했어요.</h2>
              )}
              {currentStep !== 'start' && currentStep !== 'complete' && (
                <h2 className="text-2xl font-semibold text-gray-600">레슨 : {lesson.lesson.title}</h2>
              )}
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            {/* 단계 네비게이션 */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                {steps.map((step, index) => {
                  const currentIdx = getCurrentStepIndex();
                  const isDone = index < currentIdx;
                  const isActive = index === currentIdx;
                  const isAvailable = index <= currentIdx;
                  return (
                    <div
                      key={step.key}
                      className={`flex items-center group ${isDone ? 'text-lg-done font-bold' : isActive ? 'text-lg-button font-bold' : 'text-gray-400'} cursor-pointer select-none`}
                      onClick={() => {
                        if (isAvailable) {
                          setCurrentStep(step.key);
                        } else {
                          setToastMessage('학습 단계는 건너뛸 수 없습니다.');
                          setTimeout(() => setToastMessage(''), 3000);
                        }
                      }}
                    >
                      <span className={`transition-colors ${isAvailable ? 'hover:underline' : ''}`}>{step.label}</span>
                      {index < steps.length - 1 && (
                        <span className="mx-2 flex items-center justify-center">
                          <ChevronRight className="h-4 w-4" />
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-lg-progress h-2 rounded-full transition-all duration-300" // 프로그래스바
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
          
          <div ref={popupScrollRef} className="p-6 max-h-[70vh] overflow-y-auto">
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

export default LessonModal;