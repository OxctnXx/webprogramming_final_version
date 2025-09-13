$(document).ready(function() {
    // AJAX request to get the user's name from the database
    $.ajax({
      url: 'get_user_name.jsp', // Replace with your server-side script
      type: 'GET',
      success: function(response) {
        // Set the user's name in the profile section
        $('#user-name').text(response);
      },
      error: function() {
        console.error('Failed to fetch user name');
      }
    });
});