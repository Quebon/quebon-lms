import { User, Curriculum, Inquiry } from '../types';

export const users: User[] = [ // 사용자 목록
  { id: 'student', name: '김학습', employeeId: 'EK001', position: '대리', department: '마케팅팀', phone: '010-1234-5678', email: 'student@equalkey.com', role: 'student', hrdPoints: 320},
  { id: 'manager', name: '박관리', employeeId: 'EK002', position: '차장(팀장)', department: 'HRD팀', phone: '010-9876-5432', email: 'manager@equalkey.com', role: 'admin', hrdPoints: 580},
  { id: 'u1', name: '김깨다', employeeId: 'EK003', position: '사원', department: '서비스기획팀', phone: '010-1234-5678', email: 'queda@equalkey.com', role: 'student', hrdPoints: 0 },
  { id: 'u2', name: '이챌리', employeeId: 'EK004', position: '대리', department: '학습기획팀', phone: '010-2345-6789', email: 'chaeli@equalkey.com', role: 'student', hrdPoints: 0 },
  { id: 'u3', name: '박따미', employeeId: 'EK005', position: '과장', department: '콘텐츠팀', phone: '010-3456-7890', email: 'sweatie@equalkey.com', role: 'student', hrdPoints: 0 },
  { id: 'u4', name: '최분수', employeeId: 'EK006', position: '차장(팀장)', department: '영업팀', phone: '010-4567-8901', email: 'fractoin.choi@equalkey.com', role: 'student', hrdPoints: 0 },
  { id: 'u5', name: '정곱셈', employeeId: 'EK007', position: '사원', department: '경영지원팀', phone: '010-5678-9012', email: 'multi.jung@equalkey.com', role: 'student', hrdPoints: 0 },
  { id: 'u6', name: '오미분', employeeId: 'EK008', position: '대리', department: 'CS팀', phone: '010-6789-0123', email: 'ohdiff@equalkey.com', role: 'student', hrdPoints: 0 },
  { id: 'u7', name: '신함수', employeeId: 'EK009', position: '인턴', department: '마케팅팀', phone: '010-7890-1234', email: 'function.god@equalkey.com', role: 'student', hrdPoints: 0 },
  { id: 'u8', name: '고도형', employeeId: 'EK010', position: '부장(본부장)', department: '영업본부', phone: '010-8901-2345', email: 'goshapes@equalkey.com', role: 'student', hrdPoints: 0 },
  { id: 'u9', name: '강적분', employeeId: 'EK011', position: '과장', department: '개발팀', phone: '010-9012-3456', email: 'integral.kang@equalkey.com', role: 'student', hrdPoints: 0 },
  { id: 'u10', name: '한차원', employeeId: 'EK012', position: '이사(실장)', department: '디자인실', phone: '010-0123-4567', email: 'first.dimension@equalkey.com', role: 'student', hrdPoints: 0 },
];

export const inquiries: Inquiry[] = [ // 문의하기
  {
    id: '1',
    date: '2025.01.15 14:32',
    title: '영상이 재생되지 않습니다',
    content: '레슨 진행 중 영상이 멈춰서 진행할 수 없습니다.',
    category: '영상 오류',
    status: 'answered',
    answer: '브라우저 캐시를 삭제하고 다시 시도해 주세요. 문제가 지속되면 IT팀으로 연락 바랍니다.',
    answerDate: '2025.01.15 16:45'
  },
  {
    id: '2',
    date: '2025.01.14 09:21',
    title: '수료증 발급 관련 문의',
    content: '완료한 과정의 수료증은 어떻게 발급받나요?',
    category: '이용 문의',
    status: 'pending'
  }
];

export const curriculumData = [ // 학습 페이지 커리큘럼, 레슨, 퀴즈
  {
    curriculum_id: 'EQ-C01-001',
    curriculum_title: '슥 보면 딱 아는 리더의 남다른 수 감각',
    status: 'in_progress',
    duration_start: '25.07.15',
    duration_end: '25.08.04',
    curriculum_completed_at: null,
    modules: [
      {
        module_id: 'module01',
        module_title: '단위 환산',
        lessons: [
          { lesson_id: 'lesson01', lesson_title: '8천, 9천, 그 다음은?', status: 'completed', lesson_completed_at: '25.07.01', progress: 100 },
          { lesson_id: 'lesson02', lesson_title: '12천, 12개의 천도복숭아', status: 'completed', lesson_completed_at: '25.07.02', progress: 100 },
          { lesson_id: 'lesson03', lesson_title: '만억조경해, 깨봉만만보드', status: 'not_started', lesson_completed_at: null, progress: 0,
            videoUrl: 'https://youtu.be/DndMyo--qbk?si=N-fddl5iJaCjyQEm',
            quizzes: [
              {
                id: '16520160596726141',
                type: 'multiple_choice',
                question: '1 달러가 천 원이라면, 백조 달러는 우리 돈으로 얼마일까요?',
                options: ['백조 원', '천조 원', '1경 원', '십경 원'],
                correctAnswer: 3,
                explanation: '1 달러가 천 원이라면, 백조 달러는 백조 × 천 원입니다.\n천을 곱하는 것은 만을 곱하고 십으로 나누는 것과 같습니다. 만조는 경이므로 백조 × 천 = 백조 × 만 ÷ 십 = 백만조 ÷ 십 = 백경 ÷ 십 = 십경. 따라서 1달러가 천 원이라면, 백조 달러는 십경 원입니다.'
              },
              {
                id: '16520165738942850',
                type: 'multiple_choice',
                question: '2십억 원짜리 다발이 5만 개 있으면 모두 얼마일까요?',
                options: ['천억 원', '십조 원', '백조 원', '십경 원'],
                correctAnswer: 2,
                explanation: '십십은 백, 만억은 조이므로 5만 × 2십억 = 5 × 만 × 2 × 십 × 억 = 5 × 2 × 십 × 만 × 억 = 십십만억 = 백조. 따라서 2십억 원의 다발이 5만 개 있으면 백조 원입니다.'
              },
              {
                id: '17033672020463697',
                type: 'select_answer',
                question: '다음 식을 보고 빈 칸에 알맞은 답을 선택하세요.',
                example: [ { type: 'text', value: '2십만 323 x 5억 2114' } ],
                expression: '두 수 곱의 끝수는 [빈칸1] 이고, 두 수 곱은 대략 [빈칸2] 예요.',
                options: [ ['2', '3', '4'], ['십조', '백조', '천조'] ],
                correctAnswer: [0, 1],
                explanation: '두 수 곱의 끝수는 3 × 4의 끝수인 2입니다. 두 수 곱의 크기를 대략적으로 알고 싶으면 맨 앞자리끼리의 곱을 구하면 됩니다. 2십만 323 × 5억 2114를 대략 2십만 × 5억으로 생각하면 됩니다. 십십은 백, 만억은 조이므로 두 수의 곱은 대략 2십만 × 5억 = 2 × 십 × 만 × 5 × 억 = 2 × 5 × 십 × 만 × 억 = 십십만억 = 백조입니다.'
              }
            ]
          },
          { lesson_id: 'lesson04', lesson_title: '마이크로와 나노 정말 작네', status: 'not_started', lesson_completed_at: null, progress: 0 },
          { lesson_id: 'lesson05', lesson_title: '바이트, 미디어 단위의 크기', status: 'not_started', lesson_completed_at: null, progress: 0 },
        ]
      },
      {
        module_id: 'module02',
        module_title: '대략적 연산',
        lessons: [
          { lesson_id: 'lesson06', lesson_title: '남겨놓고 빼라', status: 'not_started', lesson_completed_at: null, progress: 0 },
          { lesson_id: 'lesson07', lesson_title: '음수 연산, 깨봉십진수로', status: 'not_started', lesson_completed_at: null, progress: 0 },
          { lesson_id: 'lesson08', lesson_title: '평균, 평평하게 균형을 맞춰라', status: 'not_started', lesson_completed_at: null, progress: 0 },
          { lesson_id: 'lesson09', lesson_title: '반, 반의반, 반의반의 반, 감으로', status: 'not_started', lesson_completed_at: null, progress: 0 },
          { lesson_id: 'lesson10', lesson_title: '도넛 7박스, 11개로 나누기', status: 'not_started', lesson_completed_at: null, progress: 0 },
        ]
      },
      {
        module_id: 'module03',
        module_title: 'Ratio 활용',
        lessons: [
          { lesson_id: 'lesson11', lesson_title: '분수 비교, 기울기와 변화로', status: 'not_started', lesson_completed_at: null, progress: 0 },
          { lesson_id: 'lesson12', lesson_title: '퍼센트 가지고 놀기', status: 'not_started', lesson_completed_at: null, progress: 0 },
          { lesson_id: 'lesson13', lesson_title: '퍼센트가 나오면 기준을 찾아라!', status: 'not_started', lesson_completed_at: null, progress: 0 },
          { lesson_id: 'lesson14', lesson_title: '더하기 퍼센트? 그냥 퍼센트로', status: 'not_started', lesson_completed_at: null, progress: 0 },
          { lesson_id: 'lesson15', lesson_title: '20% 할인 후, 몇 % 올려야?', status: 'not_started', lesson_completed_at: null, progress: 0 },
        ]
      }
    ]
  },
  {
    curriculum_id: 'EQ-C02-001',
    curriculum_title: '천리안으로 내다보는 리더의 남다른 예측력',
    status: 'not_started',
    duration_start: '25.06.05',
    duration_end: '25.06.24',
    curriculum_completed_at: null,
    modules: [
      {
        module_id: 'module04',
        module_title: '무시와 변화',
        lessons: [
          { lesson_id: 'lesson16', lesson_title: '천재의 특징, 피카소와 황소', status: 'not_started', lesson_completed_at: null, progress: 0,
            videoUrl: 'https://youtu.be/OQbcOP6ECdk?si=ywVIWzd0dO5KXtfV',
            quizzes: [
              {
                id: '4242205350864926',
                type: 'multiple_choice',
                question: '다음 중 연결상태가 다른 하나를 고르면?',
                example: [ { type: 'image', value: '/quiz_images/4242205350864926_qz_img.png' } ],
                options: ['A', 'B', 'C', 'D'],
                correctAnswer: 3,
                explanation: '그림의 모양은 무시하고, 선의 연결 상태만 살펴보자. A, B, C, D는 선의 끝과 끝이 연결되어 있지만 C는 연결되어 있지 않다.'
              },
              {
                id: '4242159783946251',
                type: 'multiple_choice',
                question: '다음 세 개의 도형을 똑같다고 하려면 무엇을 무시해야 하는지 모두 고르면? (정답 2개)',
                example: [ { type: 'image', value: '/quiz_images/4242159783946251_qz_img.png' } ],
                options: ['원', '크기', '원 안의 도형', '색깔'],
                correctAnswer: [2, 3],
                explanation: '세 개의 도형은 각각 크기가 다르고, 원 안에 있는 도형이 다르다. 따라서 크기와 원 안의 도형을 무시하면 아래 그림처럼 똑같은 원이 된다.'
              },
              {
                id: '4241978908780578',
                type: 'multiple_choice',
                question: "피카소가 '황소' 그림에서 무시한 것을 모두 고르면? (정답 3개)",
                example: [ { type: 'image', value: '/quiz_images/4241978908780578_qz_img.png' } ],
                options: ['코', '뿔', '다리 두께', '색깔'],
                correctAnswer: [0, 2, 3],
                explanation: '그림에는 황소의 육중함, 사나움(뿔), 성별은 나타나 있지만 코, 다리 두께, 색깔은 나타나 있지 않다.'
              }
            ]
          },
          { lesson_id: 'lesson17', lesson_title: '무시하라, 답이 보인다', status: 'not_started', lesson_completed_at: null, progress: 0 },
          { lesson_id: 'lesson18', lesson_title: '15²에서 16², 날아오는 나비', status: 'not_started', lesson_completed_at: null, progress: 0 },
          { lesson_id: 'lesson19', lesson_title: '변화를 보고, 꺼내고, 예측하라', status: 'not_started', lesson_completed_at: null, progress: 0 },
          { lesson_id: 'lesson20', lesson_title: '공 굴러가유~ 5초 후 어디?', status: 'not_started', lesson_completed_at: null, progress: 0 },
        ]
      },
      {
        module_id: 'module09',
        module_title: '패턴과 예측',
        lessons: [
          { lesson_id: 'lesson21', lesson_title: '공식 말고 직관', status: 'not_started', lesson_completed_at: null, progress: 0 },
          { lesson_id: 'lesson22', lesson_title: '하나, 둘, 셋, 가장 자연스러운 수', status: 'not_started', lesson_completed_at: null, progress: 0 },
          { lesson_id: 'lesson23', lesson_title: '3,5,7,9… 만 번째 수는?', status: 'not_started', lesson_completed_at: null, progress: 0 },
          { lesson_id: 'lesson24', lesson_title: '건너뛰는 수도 하나,둘,셋으로', status: 'not_started', lesson_completed_at: null, progress: 0 },
          { lesson_id: 'lesson25', lesson_title: '등차수열의 항의 개수 세기', status: 'not_started', lesson_completed_at: null, progress: 0 },
        ]
      },
      {
        module_id: 'module14',
        module_title: '분해와 재조합',
        lessons: [
          { lesson_id: 'lesson26', lesson_title: '대나무, d하라, 합하라', status: 'not_started', lesson_completed_at: null, progress: 0 },
          { lesson_id: 'lesson27', lesson_title: '상대 변화는 내 변화의 몇배!', status: 'not_started', lesson_completed_at: null, progress: 0 },
          { lesson_id: 'lesson28', lesson_title: '3차원 미분', status: 'not_started', lesson_completed_at: null, progress: 0 },
          { lesson_id: 'lesson29', lesson_title: '각개격파', status: 'not_started', lesson_completed_at: null, progress: 0 },
          { lesson_id: 'lesson30', lesson_title: '막대 변화 압축', status: 'not_started', lesson_completed_at: null, progress: 0 },
        ]
      }
    ]
  },
  {
    curriculum_id: 'EQ-C03-001',
    curriculum_title: '일머리 좋은 신입 사원의 남다른 데이터 리터러시',
    status: 'not_started',
    duration_start: '25.05.01',
    duration_end: '25.06.09',
    curriculum_completed_at: null,
    modules: [
      { module_id: 'module07', module_title: '평균과 데이터', lessons: [
        { lesson_id: 'lesson31', lesson_title: '막대그래프와 꺾은선그래프', status: 'not_started', lesson_completed_at: null, progress: 0,
          videoUrl: 'https://youtu.be/mA9Oe9mhFck?si=FODDEctFCavDYJY1',
          quizzes: [
            {
              id: '3693272897135260',
              type: 'select_answer',
              question: '빈칸에 알맞은 것을 고르면?',
              example: null,
              expression: '여러 개의 값을 쉽게 비교하기 위해서는 [빈칸1]를 사용하는 것이 편리하고, 어떤 값의 변화를 보기 위해서는 [빈칸2]를 사용하는 것이 편리하다.',
              options: [ ['막대 그래프', '꺾은선 그래프'], ['막대 그래프', '꺾은선 그래프'] ],
              correctAnswer: [0, 1],
              explanation: '막대 그래프에서는 값에 따라 막대의 높이가 정해지므로 그 값들의 크기를 비교하기에 좋고, 꺾은선 그래프는 값이 어떻게 변하는지를 볼 때 좋다.'
            },
            {
              id: '3693413859304113',
              type: 'multiple_choice',
              question: '어떤 과수원의 지난 10년간 사과의 수확량 변화를 그래프로 나타내려고 한다. 이때 시간에 따른 변화의 추이를 쉽게 관찰할 수 있는 그래프는 무엇인지, 가로축과 세로축에 어떤 값을 사용하는 게 좋을지 알맞게 짝 지은 것을 고르면?',
              example: null,
              options: [
                '막대 그래프, 가로축 : 연도, 세로축 : 수확량',
                '막대 그래프, 가로축 : 수확량, 세로축 : 연도',
                '꺾은선 그래프, 가로축 : 연도, 세로축 : 수확량',
                '꺾은선 그래프, 가로축 : 수확량, 세로축 : 연도'
              ],
              correctAnswer: 2,
              explanation: '시간에 따른 변화의 추이를 쉽게 관찰할 수 있는 그래프는 꺾은선 그래프이다. 또한 가로축에는 시간, 세로축에는 수확량을 표시하는 것이 좋다.'
            },
            {
              id: '3846046569964351',
              type: 'multiple_choice',
              question: '다음은 어떤 도시의 시장 선거 결과를 막대그래프로 나타낸 것이다. 그래프를 해석한 것으로 옳은 것을 고르면?',
              example: [
                { type: 'text', value: '※ 주의 : 막대그래프의 아랫부분이 생략되어 있다.' },
                { type: 'image', value: '/quiz_images/3846046569964351_qz_img.png' }
              ],
              options: [
                '후보 A의 득표수를 표시한 막대의 길이가 후보 B의 득표수를 표시한 막대보다 두 배정도 길기 때문에 후보 A의 득표수는 후보 B의 득표수의 약 두 배정도라고 볼 수 있다.',
                '무효표의 수를 나타내는 막대의 길이는 아주 짧기 때문에 무효표는 무시해도 좋다.',
                '그래프에서는 후보 A의 막대가 길지만 A의 득표는 대략 전체의 1/4을 조금 넘었을 뿐이다.',
                '막대의 길이를 보니 후보B와 후보C가 얻은 표의 수를 합쳐도 후보A의 득표수를 넘지 않는다는 것을 알 수 있다.'
              ],
              correctAnswer: 3,
              explanation: '막대가 나타내는 값이 중간에 끊어져 있을 경우에는 그래프를 조심히 해석해야 한다. 막대 길이는 후보 A가 다른 후보들보다 월등히 길지만, 실제 득표 수는 그렇게 많은 차이를 보이지 않는다. 득표 수 차이를 강조하기 위해 불필요한 부분을 생략하고 특정 부분을 확대해서 그린 그래프이기 때문이다. 이런 경우에는 전체에 대해서 어느 정도를 차지하는가를 나타내기 위해 아래 그림처럼 파이차트를 이용하는 것이 편리하다. ① 막대그래프에서는 후보 A의 막대의 길이가 다른 세 막대에 비해서 훨씬 길기 때문에 A의 압승으로 보이지만 실제로 파이차트를 통해 보면 후보 A,B,C의 득표율은 비슷하다고 볼 수 있다.'
            }
          ]
        },
        { lesson_id: 'lesson32', lesson_title: '파이차트', status: 'not_started', lesson_completed_at: null, progress: 0 },
        { lesson_id: 'lesson33', lesson_title: '평균, 평평하게 균형을 맞춰라', status: 'not_started', lesson_completed_at: null, progress: 0 },
        { lesson_id: 'lesson34', lesson_title: '3명 7만원, 2명 6만원, 똑같이 가지려면?', status: 'not_started', lesson_completed_at: null, progress: 0 },
        { lesson_id: 'lesson35', lesson_title: '데이터를 한마디로', status: 'not_started', lesson_completed_at: null, progress: 0 },
      ] },
      { module_id: 'module08', module_title: '평균과 Ratio', lessons: [
        { lesson_id: 'lesson36', lesson_title: '한 시간 시속 100km, 그다음 한 시간 시속 200km, 평균속력은??', status: 'not_started', lesson_completed_at: null, progress: 0 },
        { lesson_id: 'lesson37', lesson_title: '갈 때 100km/h, 올 때 200km/h, 평균은?', status: 'not_started', lesson_completed_at: null, progress: 0 },
        { lesson_id: 'lesson38', lesson_title: '소금물 섞으면 평균이라고?', status: 'not_started', lesson_completed_at: null, progress: 0 },
        { lesson_id: 'lesson39', lesson_title: '좌표평면에서 내분과 외분', status: 'not_started', lesson_completed_at: null, progress: 0 },
        { lesson_id: 'lesson40', lesson_title: '평균 Ratio 종합 응용 1편', status: 'not_started', lesson_completed_at: null, progress: 0 },
      ] },
      { module_id: 'module09', module_title: '여러가지 평균', lessons: [
        { lesson_id: 'lesson41', lesson_title: '가중평균, 중복이 많은 값들의 평균', status: 'not_started', lesson_completed_at: null, progress: 0 },
        { lesson_id: 'lesson42', lesson_title: '내분, Ratio 자동확장응용으로', status: 'not_started', lesson_completed_at: null, progress: 0 },
        { lesson_id: 'lesson43', lesson_title: '시소 타는 가중평균과 내분', status: 'not_started', lesson_completed_at: null, progress: 0 },
        { lesson_id: 'lesson44', lesson_title: '지오평균, 곱하기평균', status: 'not_started', lesson_completed_at: null, progress: 0 },
        { lesson_id: 'lesson45', lesson_title: '깨직삼 속의 피타고라스와 지오평균', status: 'not_started', lesson_completed_at: null, progress: 0 },
      ] },
      { module_id: 'module10', module_title: '경우의 수의 줄 세우기', lessons: [
        { lesson_id: 'lesson46', lesson_title: '전원 줄 세우기, 느낌이 좋아', status: 'not_started', lesson_completed_at: null, progress: 0 },
        { lesson_id: 'lesson47', lesson_title: '몇 명만 줄 세우기, 느낌 이용하여', status: 'not_started', lesson_completed_at: null, progress: 0 },
        { lesson_id: 'lesson48', lesson_title: '경우의 수, 나누기 이용하여', status: 'not_started', lesson_completed_at: null, progress: 0 },
        { lesson_id: 'lesson49', lesson_title: '경우의 수, 더하거나 빼거나', status: 'not_started', lesson_completed_at: null, progress: 0 },
        { lesson_id: 'lesson50', lesson_title: '흑백 줄세우기, 느낌 이용하여', status: 'not_started', lesson_completed_at: null, progress: 0 },
      ] },
      { module_id: 'module11', module_title: '확률은 직사각형', lessons: [
        { lesson_id: 'lesson51', lesson_title: '집합, 멤버냐 아니냐 이것이 중요해', status: 'not_started', lesson_completed_at: null, progress: 0 },
        { lesson_id: 'lesson52', lesson_title: '집합 관계 찾기, 이미지로', status: 'not_started', lesson_completed_at: null, progress: 0 },
        { lesson_id: 'lesson53', lesson_title: '희한하네! 확률이야, 확률은 넓이', status: 'not_started', lesson_completed_at: null, progress: 0 },
        { lesson_id: 'lesson54', lesson_title: '딸 낳을때까지의 확률은?', status: 'not_started', lesson_completed_at: null, progress: 0 },
        { lesson_id: 'lesson55', lesson_title: '조건부 확률', status: 'not_started', lesson_completed_at: null, progress: 0 },
      ] },
      { module_id: 'module12', module_title: '통계와 분포', lessons: [
        { lesson_id: 'lesson56', lesson_title: '표준편차, 차이의 평균', status: 'not_started', lesson_completed_at: null, progress: 0 },
        { lesson_id: 'lesson57', lesson_title: '표준편차, 차이의 2차 평균', status: 'not_started', lesson_completed_at: null, progress: 0 },
        { lesson_id: 'lesson58', lesson_title: '확률분포의 변환 (1) 2X+30', status: 'not_started', lesson_completed_at: null, progress: 0 },
        { lesson_id: 'lesson59', lesson_title: '확률분포의 변환 (2) 샘플평균', status: 'not_started', lesson_completed_at: null, progress: 0 },
        { lesson_id: 'lesson60', lesson_title: '표본조사들의 분포 1편', status: 'not_started', lesson_completed_at: null, progress: 0 },
      ] },
    ]
  },
];

export const completedCurriculumData = [ // 학습 페이지 완료된 커리큘럼 데이터
  {
    curriculum_id: 'EQ-A01-001',
    curriculum_title: '동기부여와 성과관리',
    status: 'completed',
    duration_start: '25.01.15',
    duration_end: '25.01.18',
    curriculum_completed_at: '25.01.16',
    lessonCount: 15,
    modules: []
  },
  {
    curriculum_id: 'EQ-B03-002',
    curriculum_title: '직무교육 A',
    status: 'completed',
    duration_start: '24.11.26',
    duration_end: '24.12.05',
    curriculum_completed_at: '24.12.02',
    lessonCount: 20,
    modules: []
  },
  {
    curriculum_id: 'EQ-B01-001',
    curriculum_title: '프로야구로 보는 코칭 리더십',
    status: 'completed',
    duration_start: '24.10.01',
    duration_end: '24.10.03',
    curriculum_completed_at: '24.10.03',
    lessonCount: 10,
    modules: []
  }
];

export const curriculums: Curriculum[] = [ //학습관리 페이지 커리큘럼 목록
  { id: 'EQ-C01-001', code: 'EQ-C01-001', title: '슥 보면 딱 아는 리더의 남다른 수 감각', period: '25.07.01~25.07.20', status: 'not_started', lessonCount: 30, points: 90, modules: [] },
  { id: 'EQ-C02-001', code: 'EQ-C02-001', title: '천리안으로 내다보는 리더의 남다른 예측력', period: '25.07.01~25.07.20', status: 'not_started', lessonCount: 30, points: 90, modules: [] },
  { id: 'EQ-C03-001', code: 'EQ-C03-001', title: '일머리 좋은 신입 사원의 남다른 데이터 리터러시', period: '25.07.01~25.08.08', status: 'not_started', lessonCount: 50, points: 120, modules: [] },
];

export const learningResults = [ // 학습관리 페이지 사용자별 학습 결과 목록
  {
    user: users[0],
    curriculum: curriculums[0],
    progress: 13,
    status: 'in_progress' as 'in_progress',
    completionDate: undefined,
    points: 240,
  },
  {
    user: users[1],
    curriculum: curriculums[1],
    progress: 50,
    status: 'in_progress' as 'in_progress',
    completionDate: undefined,
    points: 575,
  },
  {
    user: users[2],
    curriculum: curriculums[2],
    progress: 0,
    status: 'not_started' as 'not_started',
    completionDate: undefined,
    points: 195,
  },
  {
    user: users[3],
    curriculum: curriculums[2],
    progress: 60,
    status: 'in_progress' as 'in_progress',
    completionDate: undefined,
    points: 275,
  },
  {
    user: users[4],
    curriculum: curriculums[0],
    progress: 100,
    status: 'completed' as 'completed',
    completionDate: '2025.07.20',
    points: 450,
  },
  {
    user: users[5],
    curriculum: curriculums[1],
    progress: 0,
    status: 'not_started' as 'not_started',
    completionDate: undefined,
    points: 520,
  },
  {
    user: users[6],
    curriculum: curriculums[2],
    progress: 20,
    status: 'in_progress' as 'in_progress',
    completionDate: undefined,
    points: 100,
  },
  {
    user: users[7],
    curriculum: curriculums[2],
    progress: 40,
    status: 'in_progress' as 'in_progress',
    completionDate: undefined,
    points: 270,
  },
  {
    user: users[8],
    curriculum: curriculums[2],
    progress: 100,
    status: 'completed' as 'completed',
    completionDate: '2024.08.08',
    points: 15,
  },
  {
    user: users[9],
    curriculum: curriculums[1],
    progress: 0,
    status: 'not_started' as 'not_started',
    completionDate: undefined,
    points: 870,
  },
  {
    user: users[10],
    curriculum: curriculums[0],
    progress: 70,
    status: 'in_progress' as 'in_progress',
    completionDate: undefined,
    points: 480,
  },
  {
    user: users[11],
    curriculum: curriculums[1],
    progress: 30,
    status: 'in_progress' as 'in_progress',
    completionDate: undefined,
    points: 960,
  },
];

export const userLessonResults = [ // 학습관리 페이지 김학습 사용자의 레슨 결과
  {
    userId: 'student',
    curriculumTitle: '슥 보면 딱 아는 리더의 남다른 수 감각',
    moduleTitle: '단위 환산',
    lessonTitle: '8천, 9천, 그 다음은?',
    progress: 100,
    status: 'completed',
    completedAt: '25.07.01'
  },
  {
    userId: 'student',
    curriculumTitle: '슥 보면 딱 아는 리더의 남다른 수 감각',
    moduleTitle: '단위 환산',
    lessonTitle: '12천, 12개의 천도복숭아',
    progress: 100,
    status: 'completed',
    completedAt: '25.07.02'
  }
];

export const lessonDiaryData = [ // 학습관리 페이지 김학습 사용자의 메타인지 다이어리
  {
    lessonTitle: '8천, 9천, 그 다음은?',
    q1Answer: '영상을 보기 전에는 단순히 암기된 공식을 사용해서 문제를 풀려고 했을 것입니다. 천, 만, 억 같은 단위들을 그냥 외워서 계산하려고 했을 거예요. 특히 큰 수들이 나오면 헷갈려서 실수를 많이 했을 것 같습니다.',
    q2Answer: '이제는 단위의 관계를 이해하고 체계적으로 접근할 수 있습니다. 천은 10³, 만은 10⁴라는 것을 알고, 단위 간의 변환 원리를 이해했어요. 큰 수도 단계별로 나누어서 생각하면 훨씬 쉽게 계산할 수 있다는 것을 배웠습니다.'
  },
  {
    lessonTitle: '12천, 12개의 천도복숭아',
    q1Answer: '예전에는 천도복숭아라는 표현을 그냥 많다는 의미로만 이해했을 것입니다. 12천이라는 숫자도 단순히 12,000으로만 생각했을 거예요. 수의 크기나 단위에 대한 깊은 이해 없이 기계적으로 계산했을 것 같습니다.',
    q2Answer: '이제는 천이라는 단위가 가진 의미와 12천이 실제로 어떤 크기인지 감각적으로 이해할 수 있게 되었습니다. 또한 큰 수들을 비교하고 연산할 때 단위를 활용해서 더 효율적으로 접근할 수 있습니다. 일상생활에서도 이런 수 감각을 활용할 수 있을 것 같아요.'
  }
];

export const lessonReportData = [ // 학습관리 페이지 김학습 사용자의 최종 리포트
  {
    lessonTitle: '8천, 9천, 그 다음은?',
    senseAnswer: '최근 마케팅팀에서 받은 월별 매출 보고서를 분석해보았습니다. 보고서에는 "전월 대비 8천만원 증가"라는 표현이 있었는데, 단위 변환을 통해 보니 이는 0.8억원으로 표현할 수도 있었습니다. 또한 연간 목표 대비 계산에서 십억 단위와 백만 단위가 혼재되어 있어 일관성 있게 억 단위로 통일하여 이해하는 것이 더 적절하다고 판단됩니다.',
    predictAnswer: '우리 팀의 분기별 프로젝트 진행률 데이터를 분석하여 다음 분기 성과를 예측해보았습니다. 변화 요소는 "월별 완료 프로젝트 수"로 정의했고, 계절적 요인이나 휴가철 영향은 무시하고 순수한 업무 효율성 변화만 관찰했습니다. 지난 3개월 데이터의 증가 패턴을 보면 월평균 15% 증가율을 보이고 있어, 다음 달에는 약 12-13개 프로젝트 완료가 예상됩니다.',
    literacyAnswer: '회사 중장기 전략 자료의 시장 점유율 데이터를 살펴보았습니다. 막대그래프로 표현된 점유율(%), 꺾은선 그래프의 매출 추이(억원), 파이차트의 고객 연령대 분포 등이 사용되었습니다. 각 데이터의 표본 크기는 명시되어 있지 않았고, 점유율 데이터에서는 경쟁사 대비 우리 회사의 상대적 위치가 강조되었지만, 전체 시장 규모 변화나 신규 진입업체 영향 등의 숨은 정보는 고려되지 않았습니다.'
  },
  {
    lessonTitle: '12천, 12개의 천도복숭아',
    senseAnswer: '인사팀에서 받은 직원 만족도 조사 결과를 검토했습니다. "12천명 중 85% 만족"이라는 데이터가 있었는데, 실제로는 12,000명이 아니라 1,200명 정도의 표본이었습니다. 천 단위 표기의 정확성을 확인하고, 비율 계산에서도 소수점 처리가 적절히 되었는지 점검했습니다. 전체 직원 수 대비 응답률도 함께 고려하여 데이터의 대표성을 판단했습니다.',
    predictAnswer: '고객 서비스 만족도의 월별 변화를 예측하기 위해 "고객 불만 접수 건수"를 핵심 변수로 설정했습니다. 계절적 요인이나 특별 이벤트 영향은 무시하고, 순수한 서비스 품질 개선 효과만 관찰했습니다. 지난 6개월간 월평균 5% 감소 추세를 보이고 있어, 다음 달에는 현재 대비 약 3-5% 추가 감소가 예상됩니다. 다만 신규 서비스 런칭이나 시스템 업데이트 등의 변수는 별도 고려가 필요합니다.',
    literacyAnswer: '경영진 보고용 성과 대시보드의 KPI 데이터를 분석했습니다. 매출(억원), 고객수(만명), 만족도(점수) 등 다양한 단위의 데이터가 혼재되어 있었고, 각각 평균값과 전년 동기 대비 증감률로 표현되었습니다. 표준편차는 만족도 데이터에서만 제공되었고(±0.3점), 나머지는 단순 평균만 표시되었습니다. 성과 향상이라는 결론 도출을 위해 긍정적 지표는 강조되었지만, 시장 환경 변화나 경쟁사 동향 등의 외부 요인은 충분히 반영되지 않았습니다.'
  }
];