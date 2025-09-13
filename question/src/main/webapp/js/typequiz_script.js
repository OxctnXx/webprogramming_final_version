// 문제 데이터 설정
const questions = Array.from({ length: 24 }, (_, i) => ({
    key: `Q${i + 1}`, // 문제의 고유 키
    text: `문제 ${i + 1}번의 질문 내용은 여기에 표시됩니다.`,
    options: i % 6 >= 4 // 각 그룹의 마지막 두 문제에 0점을 피하는 점수 구성 적용
        ? [
            { value: -1.5, text: "선택지 1" },
            { value: -0.8, text: "선택지 2" },
            { value: null, text: "선택지 3 (NULL)" },
            { value: 0.9, text: "선택지 4" },
            { value: 1.7, text: "선택지 5" }
        ]
        : [
            { value: -2, text: "선택지 1" },
            { value: -1, text: "선택지 2" },
            { value: null, text: "선택지 3 (NULL)" },
            { value: 1, text: "선택지 4" },
            { value: 2, text: "선택지 5" }
        ]
}));

// 문제를 랜덤으로 섞기
const shuffledQuestions = questions.sort(() => Math.random() - 0.5);

// 결과 저장용 변수
const answers = new Map();

// 문제 렌더링
function renderQuestions() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = ''; // 초기화

    shuffledQuestions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <p>${index + 1}. ${question.text}</p>
            ${question.options.map((opt) => `
                <label>
                    <input type="radio" name="${question.key}" value="${opt.value}" onchange="handleAnswerChange('${question.key}', ${opt.value})">
                    ${opt.text}
                </label><br>
            `).join('')}
        `;
        quizContainer.appendChild(questionDiv);
    });
}

// 답변 변경 핸들러
function handleAnswerChange(key, value) {
    if (value === null) {
        alert("NULL값을 선택할 수 없습니다. 다른 선택지를 고르세요.");
        document.querySelector(`input[name="${key}"][value="null"]`).checked = false; // 선택 해제
        return;
    }
    answers.set(key, value);
}

// 제출 버튼 핸들러
async function handleSubmit() {
    if (answers.size < 24) {
        alert("모든 문제를 풀어야 제출할 수 있습니다.");
        return;
    }

    // 점수 계산
    let IE = 0, SN = 0, FT = 0, PJ = 0;
    shuffledQuestions.forEach((question, index) => {
        const score = answers.get(question.key);
        if (index < 6) IE += score; // IE 그룹
        else if (index < 12) SN += score; // SN 그룹
        else if (index < 18) FT += score; // FT 그룹
        else PJ += score; // PJ 그룹
    });

    // 최종 결과 계산
    const result = [
        IE > 0 ? "I" : "E", // I 또는 E
        SN > 0 ? "S" : "N", // S 또는 N
        FT > 0 ? "F" : "T", // F 또는 T
        PJ > 0 ? "P" : "J"  // P 또는 J
    ].join("");

    // 결과 표시
    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = `
        <h2>결과: ${result}</h2>
        <p>IE 점수: ${IE.toFixed(2)}</p>
        <p>SN 점수: ${SN.toFixed(2)}</p>
        <p>FT 점수: ${FT.toFixed(2)}</p>
        <p>PJ 점수: ${PJ.toFixed(2)}</p>
    `;

    // 데이터베이스로 전송
    try {
        const response = await fetch('/demo/submitQuiz', { // 서버 URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                answers: Object.fromEntries(answers),
                result: result,
                scores: {
                    IE: IE.toFixed(2),
                    SN: SN.toFixed(2),
                    FT: FT.toFixed(2),
                    PJ: PJ.toFixed(2)
                }
            })
        });

        const resultData = await response.json();
        alert(`결과가 저장되었습니다: ${resultData.message}`);
    } catch (error) {
        console.error("Error submitting quiz:", error);
        alert("결과 저장 중 오류가 발생했습니다.");
    }
}

// 페이지 로드 시 문제 렌더링
window.onload = renderQuestions;
