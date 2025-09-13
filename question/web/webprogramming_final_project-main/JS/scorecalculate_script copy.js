document.addEventListener("DOMContentLoaded", async () => {
    try {
        // 데이터베이스에서 현재 사용자와 문제의 정답을 가져오는 API 호출
        const response = await fetch('/api/get-quiz-result', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('점수 정보를 가져오는 데 실패했습니다.');
        }

        const { correctAnswers, userAnswers } = await response.json();
        let score = 0;

        // 각 문제의 정답을 확인하여 점수를 계산
        for (let i = 0; i < correctAnswers.length; i++) {
            if (userAnswers[i] === correctAnswers[i]) {
                score += 10;
            }
        }

        // 점수 표시
        document.getElementById("score").textContent = `${score}점`;

        // 계산된 점수를 데이터베이스에 저장하는 API 호출
        await fetch('/api/save-score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ score })
        });
    } catch (error) {
        console.error('오류가 발생했습니다:', error);
        document.getElementById("score").textContent = "오류 발생";
    }
});