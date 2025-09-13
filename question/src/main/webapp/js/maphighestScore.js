document.addEventListener("DOMContentLoaded", async () => {
    try {
        $.ajax({
            type: 'GET',
            url: '/demo/freshmanQuizScore',
            success: function (response) {
                try {
                    response = JSON.parse(response).data;
                    const highScoreElement = document.getElementById("high-score");
                    if (response.map_score) {
                        highScoreElement.textContent = `최고: ${response.map_score}점`;
                    } else {
                        highScoreElement.textContent = "기록된 최고 점수가 없습니다.";
                    }
                }catch (error){
                    window.location.href="loginpage.html";
                }

            },
            error: function () {
                $('#error-message').text('Server error, Please try again');
            }
        });
    } catch (error) {
        console.error('오류가 발생했습니다:', error);
        const highScoreElement = document.getElementById("high-score");
        highScoreElement.textContent = "오류 발생";
    }
});