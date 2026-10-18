const user = {
  id: "asd@naver.com",
  pw: "spdlqj123!@",
};

/*

1. email 정규표현식을 사용한 validation
2. pw 정규표현식을 사용한 validation
3. 상태 변수 관리
4. 로그인 버튼을 클릭시 조건처리

*/

function emailReg(text) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(text).toLowerCase());
}

function pwReg(text) {
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return re.test(String(text).toLowerCase());
}

const userEmail = document.querySelector("#userEmail");
const userPassword = document.querySelector("#userPassword");
const loginButton = document.querySelector(".btn-login");


function debounce(f, limit = 1000) {
  let timeout;

  return function(e) {
    clearTimeout(timeout);
    timeout = setTimeout(()=> {
      f.call(this,e); 
    }, limit)
  }
}

let emailStatus = false;

function emailHandler(e) {
  let input = e.target;
  input.classList.add('is--invalid');

  if(emailReg(input.value)) {
    input.classList.remove('is--invalid');
    emailStatus = true;
    return;
  }
}

userEmail.addEventListener("input", debounce(emailHandler, 500));


let pwdStatus = false;

function pwdHandler(e) {
  let input = e.target;
  input.classList.add('is--invalid');

  if(pwReg(input.value)) {
    input.classList.remove('is--invalid');
    pwdStatus = true;
    return;
  }
}

userPassword.addEventListener("input", pwdHandler);

function loginHandler(e) {
  e.preventDefault();

  // 유효성 검사 통과 여부 확인
  if(!(emailStatus && pwdStatus)) {
    return;
  }

  try {
    // 입력값과 비교
    if(user.id === userEmail.value) {
      if(user.pw === userPassword.value) {
            location.href = 'http://localhost:5500/welcome.html';
      } else {
        throw '아이디 또는 비밀번호가 일치하지 않습니다.';
      }
    } else {
      throw '아이디 또는 비밀번호가 일치하지 않습니다.';
    }
  } catch(error) {
    alert(error);
  }
}

loginButton.addEventListener('click', loginHandler);