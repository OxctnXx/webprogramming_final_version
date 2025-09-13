document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('idcircle').style.backgroundColor = 'grey';
  
    document.getElementById('duplicationbutton').addEventListener('click', function() {
      let username = document.getElementById('username').value; // 입력된 아이디
  
      // 입력값이 비어있는지 체크
      if (!username) {
        document.getElementById('idcircle').style.backgroundColor = 'red';
        duelusername = true;
        return;
      }
  
      // 서버에 아이디 중복 확인 요청 보내기 (AJAX 사용)
      fetch('http://127.0.0.1:8080/demo/uerNameValide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `userName=${encodeURIComponent(username)}`
      })
      .then(response => response.text())  // 서버 응답을 텍스트로 받음
      .then(data => {
		  	data=JSON.parse(data);
        if (data.status === 'exists') {
          document.getElementById('idcircle').style.backgroundColor = 'red';
          duelusername = true;
        } else  {
          document.getElementById('idcircle').style.backgroundColor = 'green';
          duelusername = false;
        }
      })
      .catch(error => {
        document.getElementById('idcircle').style.backgroundColor = 'red';
        duelusername = true;
      });
    });
  
    document.getElementById('passcircle').style.backgroundColor = 'grey';
  
    // 두 입력란을 가져오기
    const password = document.getElementById('password');
    const passwordConfirm = document.getElementById('passwordconfirm');
  
    // 패스워드와 패스워드 확인을 실시간으로 비교
    function checkPasswordMatch() {
      document.getElementById('passcircle').style.backgroundColor = 'red';
      if (password.value === passwordConfirm.value && password.value !== '') {
        document.getElementById('passcircle').style.backgroundColor = 'green';
      } else {
        document.getElementById('passcircle').style.backgroundColor = 'red';
      }
    }
  
    // 실시간으로 입력값을 확인
    password.addEventListener('input', checkPasswordMatch);
    passwordConfirm.addEventListener('input', checkPasswordMatch);
  
    const submitBtn = document.getElementById('submitbutton');
    const form = document.getElementById('myForm');
  
    submitBtn.addEventListener('click', function() {
      if (password.value === passwordConfirm.value && password.value !== '') {
    // 서버에 아이디 중복 확인 요청 보내기 (AJAX 사용)
	userName=document.getElementById('username').value,
	passWord=document.getElementById('password').value,
	number=document.getElementById('number').value,
	age=document.getElementById('age').value,
    fetch('http://127.0.0.1:8080/demo/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `userName=${encodeURIComponent(userName)}&passWord=${encodeURIComponent(passWord)}&number=${encodeURIComponent(number)}&age=${encodeURIComponent(age)}`
    })
    .then(response => response.text())  // 서버 응답을 텍스트로 받음
    .then(data => {
    		  	data=JSON.parse(data);
      if (data.status === 'success') {
           window.location.href = 'loginpage.html';
      } else  {
         alert(data.status);
      }
    })
    .catch(error => {
      document.getElementById('idcircle').style.backgroundColor = 'red';
    });
      } else {
        alert("패스워드가 일치하지 않습니다.");
      }
    });
  });
  