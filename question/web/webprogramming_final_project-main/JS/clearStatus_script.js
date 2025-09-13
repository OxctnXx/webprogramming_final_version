$(document).ready(function() {
    $.ajax({
        url: 'get_clear.jsp',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            if(!response.guideCleared) {
                $('#guide-clear-icon').hide();
            }
            if (!response.mapCleared) {
                $('#map-clear-icon').hide();
            }
            if (!response.typeCleared) {
                $('#type-clear-icon').hide();
            }
        },
        error: function() {
            console.error('Failed to fetch clear status');
        }
    });
});