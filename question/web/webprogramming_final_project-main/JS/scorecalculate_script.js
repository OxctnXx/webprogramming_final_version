document.addEventListener("DOMContentLoaded", async () => {
    try {
		
		
		$.ajax({
		  type: 'GET',
		  url: 'http://127.0.0.1:8080/demo/quizAnswer', 
		  data: {
		    userName: localStorage.getItem("userName")
		  },
		  success: function(response) {
			response=JSON.parse(response).data;
        let score = 0;
        // 각 문제의 정답을 확인하여 점수를 계산
		response=JSON.parse(response)
        for (let i = 0; i < response.length; i++) {
            if (response[i].userAnswer === response[i].correctAnswer) {
                score += 10;
            }
        }
        // 점수 표시
        document.getElementById("score").textContent = `${score}점`;
		  },
		  error: function() {
		    $('#error-message').text('Server error, Please try again');
		  }
		});
  //       // 계산된 점수를 데이터베이스에 저장하는 API 호출
  //       await fetch('/api/save-score', {
  //           method: 'POST',
  //           headers: {
  //               'Content-Type': 'application/json'
  //           },
  //           body: JSON.stringify({ score })
  //       });
    } catch (error) {
        console.error('오류가 발생했습니다:', error);
        document.getElementById("score").textContent = "오류 발생";
    }
});