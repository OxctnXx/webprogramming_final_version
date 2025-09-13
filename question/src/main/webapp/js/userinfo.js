$(document).ready(function() {
    $.ajax({
      url: '/demo/userInfo',
      type: 'GET',
      success: function(response) {
          response=JSON.parse(response);
        // Set the user's name in the profile section
        $('#user-name').text(response.data);
      },
      error: function() {
        console.error('Failed to fetch user name');
      }
    });
});