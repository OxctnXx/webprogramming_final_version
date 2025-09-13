let count = 1; // 초기 값 설정
let answer = [];
let quiz = new Map(); // Map 구조로 변경
let correctAnswers = new Map(); // 정답 저장
let randomizedKeys = []; // 랜덤 퀴즈 키
let interval;

// 요소 가져오기
const counterElement = document.getElementById('counter');
const quize = document.getElementById('quiz');
const timebar = document.getElementById('timeb');
const buttonO = document.getElementById('incrementButtonO');
const buttonX = document.getElementById('incrementButtonx');

// DB에서 퀴즈와 정답 가져오기
function initializeQuizzes() {
  $.ajax({
    url: '/getQuizAndAnswers', // 퀴즈 및 정답 가져오는 API
    method: 'GET',
    success: function (response) {
      const data = JSON.parse(response); // 서버에서 가져온 퀴즈 데이터
      data.forEach((item) => {
        quiz.set(item.id, item.quiz_text); // id를 키로 설정
        correctAnswers.set(item.id, item.quiz_answer); // id를 키로 정답 저장
      });

      randomizedKeys = shuffleArray(Array.from(quiz.keys())); // 퀴즈 키를 랜덤으로 섞음
      answer = Array.from({ length: quiz.size }, () => "n"); // 답변 배열 초기화
      updateQuiz();
    },
    error: function (err) {
      console.error("퀴즈 데이터를 가져오는데 실패했습니다:", err);
    }
  });
}

// 배열 섞기 함수
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// O 버튼 클릭 이벤트
buttonO.addEventListener('click', function () {
  handleAnswer("o");
});

// X 버튼 클릭 이벤트
buttonX.addEventListener('click', function () {
  handleAnswer("x");
});

// 정답 처리 함수
function handleAnswer(userAnswer) {
  const currentQuizKey = randomizedKeys[count - 1];

  answer[count - 1] = userAnswer; // 유저 답 저장
  count++;

  if (count > quiz.size) {
    calculateAndSubmitScore();
  } else {
    updateQuiz();
    resetTimeBarAnimation();
  }
}

// 퀴즈 업데이트 함수
function updateQuiz() {
  if (count <= quiz.size) {
    const currentQuizKey = randomizedKeys[count - 1];
    quize.textContent = quiz.get(currentQuizKey); // 랜덤 순서의 퀴즈 출력
    counterElement.textContent = `${count}번`;
  } else {
    quize.textContent = "퀴즈 끝";
  }
}

// 점수 계산 및 서버 업데이트
function calculateAndSubmitScore() {
  let totalScore = 0;

  // 정답과 유저 입력 비교하여 점수 계산
  randomizedKeys.forEach((quizId, index) => {
    if (answer[index] === correctAnswers.get(quizId)) {
      totalScore += 10; // 정답일 경우 10점 추가
    }
  });

  // 서버에 점수 업데이트
  $.ajax({
    url: '/updateUserScore', // 점수 업데이트 API
    method: 'POST',
    data: {
      userName: localStorage.getItem("userName"),
      score: totalScore
    },
    success: function () {
      console.log(`점수 ${totalScore}이 저장되었습니다.`);
      window.location.href = 'quizresult.html';
    },
    error: function (err) {
      console.error("점수 저장 실패:", err);
    }
  });
}

// 타임바 애니메이션 리셋
function resetTimeBarAnimation() {
  clearInterval(interval);
  timebar.style.animation = 'none';
  timebar.offsetWidth; // reflow to restart animation
  timebar.style.animation = 'shrink 15s linear forwards';

  // 타임바가 15초 후 자동으로 다음 문제로 넘어가도록 설정
  interval = setInterval(checkBarWidth, 50);
}

// 타임바 상태 체크
function checkBarWidth() {
  const transformValue = window.getComputedStyle(timebar).transform;

  if (transformValue === 'none') return;

  const scaleX = parseFloat(transformValue.split(',')[0].replace('matrix(', '').trim());

  if (scaleX === 0) {
    clearInterval(interval);
    onBarEmpty();
  }
}

function onBarEmpty() {
  console.log("시간 초과! 자동으로 다음 문제로 이동합니다.");
  handleAnswer("n"); // 답변 "n"으로 자동 처리
}

// 페이지 로딩 시 초기화
document.addEventListener('DOMContentLoaded', function () {
  initializeQuizzes();
});
