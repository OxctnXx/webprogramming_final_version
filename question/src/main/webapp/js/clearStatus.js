$(document).ready(function () {
    $.ajax({
        url: '/demo/freshmanQuizScore',
        type: 'GET',
        success: function (response) {
            response = JSON.parse(response).data
            response = JSON.parse(response)

            if (response.guide_score >= 70) {
                $('#guide-clear-icon').show();
            } else{
                $('#guide-clear-icon').hide();
            }

            // 캠퍼스맵 처리
            if (response.map_score >= 70){
                $('#map-lock-icon').show();
            } else {
                $('#map-clear-icon').hide();
            }

            // 대학생 유형 테스트 처리
            if (!response.typeCleared) {
                $('#type-clear-icon').hide();
                $('#type-lock-icon').show();
            } else {
                $('#type-lock-icon').hide();
                if (response.typeScore > 70) {
                    $('#type-clear-icon').show();
                }
            }
        },
        error: function () {
            console.error('Failed to fetch clear status');
        }
    });
});
