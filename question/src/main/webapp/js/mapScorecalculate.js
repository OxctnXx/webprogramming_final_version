document.addEventListener("DOMContentLoaded", async () => {
    try {
        $.ajax({
            type: 'GET',
            url: '/demo/freshmanQuizScore',
            success: function (response) {
                response = JSON.parse(response).data;
                // 점수 표시
                document.getElementById("score").textContent = `${response.map_score}점`;
            },
            error: function () {
                $('#error-message').text('Server error, Please try again');
            }
        });
    } catch (error) {
        console.error('오류가 발생했습니다:', error);
        document.getElementById("score").textContent = "오류 발생";
    }
});