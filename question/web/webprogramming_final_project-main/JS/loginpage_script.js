$(document).ready(function() {
    $('#loginButton').click(function() {
      var userId = $('#idlogin').val();
      var userPassword = $('#passwordlogin').val();
  jQuery.support.cors = true;
      $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8080/demo/login', // 실제 서버 URL로 변경 필요
        data: {
          userName: userId,
          passWord: userPassword
        },
		headers:{
			"Access-Control-Allow-Origin":"*"
		},
        success: function(response) {
		response=JSON.parse(response);
          if (response.status === 'success') {
			  localStorage.setItem('userId',userId);
            window.location.href = 'main.html';
          } else if (response.status === 'invalid_password') {
            $('#error-message').text('please check the password');
          } else if (response.status === 'invalid_user') {
            $('#error-message').text('please check the password or ID');
          }
        },
        error: function() {
          $('#error-message').text('Server error, Please try again');
        }
      });
    });
  });
  