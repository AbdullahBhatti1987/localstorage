var formContainer = document.getElementById("formContainer");
var welcome = document.getElementById("welcome");
function screenRefresh(){
  if(localStorage.getItem('SigninValue')){
    welcome.style.display = 'flex';
    formContainer.style.display = 'none';
  }
}
screenRefresh()
// ===============signup form start======================

var signupForm = document.getElementById("signupForm");
var signinForm = document.getElementById("signinForm");
var signupEmail = document.getElementById("signupEmail");
var signupPassword1 = document.getElementById("signupPassword1");
var signupPassword2 = document.getElementById("signupPassword2");
var signupStorage = [];

// ===============Buttons functions start==================
function showSignup() {
  signinForm.style.display = "none";
  signupForm.style.display = "block";
  signupreset();
  }
function showSignin() {
  signupForm.style.display = "none";
  signinForm.style.display = "block";
  localStorage.removeItem('SigninValue');  
  signinreset()
    }
// ===========Buttons functions end=============
// ===========New Data Update Start=============
function newSignUp() {
  var obj = {
    signupEmail: signupEmail.value,
    signupPassword: signupPassword1.value,
  };
  signupStorage.push(obj);
  var getStorage = JSON.stringify(signupStorage);
  localStorage.setItem("SignupValue", getStorage);
  // console.log(localStorage.getItem('SignupValue'));
}
// ===========New Data Update End=============
// ===========Check Duplicate Start=============
function checkSignup() {
  var checkUser = false;
  var temp = signupEmail.value;
  for (var i = 0; i < signupStorage.length; i++) {
    if (temp === signupStorage[i].signupEmail) {
      console.log("Already user available");
      checkUser = true;
      alert("Already Available");
      return checkUser;
    }
  }
  return checkUser;
}
// ===========Check Duplicate end=============
// ===========Signup Email Start=============
function saveSignup() {
  if (
    signupEmail.value &&
    signupPassword1.value &&
    signupPassword2.value &&
    signupPassword1.value === signupPassword2.value
  ) {
    if (checkSignup() === false) {
      newSignUp();
      var temp = signupEmail.value;
      signupreset();
      showSignin();
      signinEmail.value = temp;
      signinPassword.value = "";
    } else {
      console.log("Provided email already available");
    }
  } else {
    alert("Enter Correct Password");
  }
}
// ===========Signup Email End=============
// ===========Signup reset start=============
function signupreset() {
  signupEmail.value = "";
  signupPassword1.value = "";
  signupPassword2.value = "";
}
function signinreset() {
  signinEmail.value = "";
  signinPassword.value = "";
}
// ===========Signup reset end=============
// ===============signup form end======================
// ===============signin form start======================

var signinEmail = document.getElementById("signinEmail");
var signinPassword = document.getElementById("signinPassword");
var signinStorage = [];
var activeUser = "";


function newSignIn() {

  var obj = {
    loginEmail: signinEmail.value,
    loginPassword: signinPassword.value,
  };
  signinStorage.push(obj);
  var getStorage = JSON.stringify(signinStorage);
  localStorage.setItem("SigninValue", getStorage);
}
function signinreset() {
  signinEmail.value = "";
  signinPassword.value = "";
}
function saveSignin() {
  var checkSignupEmail = false;
  var getSignupValue = localStorage.getItem("SignupValue");
  if (getSignupValue === null) {
    alert("User not found");
    signinPassword.value = "";
    return;
  }
  console.log("User found");
  signupStorage = JSON.parse(getSignupValue);
  for (var i = 0; i < signupStorage.length; i++) {
    if (
      signinEmail.value === signupStorage[i].signupEmail &&
      signinPassword.value === signupStorage[i].signupPassword
    ) {
      console.log("ID Available");
      checkSignupEmail = true;
      newSignIn();
      console.log("Welcome to Todo App");
      welcome.style.display = "flex";
      formContainer.style.display = "none";
      activeUser = signinEmail.value;
      localStorage.setItem('SigninValue', activeUser)
      console.log("User login");
      eventfun();
      userkiHeading()
      break;
    }
  }
  if (!checkSignupEmail) {
    console.log("Incorrect Email or Password");
    alert("Incorrect Email or Password");
  }
  
}
// ===============signin form end========================
// ===============signout form start======================
function logout() {
  activeUser = '';
  localStorage.removeItem('SigninValue')
  formContainer.style.display = 'block';
  welcome.style.display = 'none';
  signinreset();
  userkiHeading()
  }
// ===============signout form end======================
function memoryClear() {
  welcome.style.display = 'none';
  localStorage.clear();
  userkiHeading()
}

// ====================Signin form end===================
// =======================Todo start===================
var listContainer = document.getElementById('listContainer');
var input = document.getElementById('new-task');
var add_btn = document.getElementById("add-task-btn");
var task_list = document.getElementById("task-list");
var todoStorage = [];

function newTodo() {
  var now = new Date();
  if (input.value) {
    var obj = {
      emailID: localStorage.getItem('SigninValue'),
      toDo: input.value,
      date: now.toLocaleDateString(),
    }
    var new_task = `<li class="task-item">
    <span class="userName" style="display: none";>${obj.emailID}</span>
    <span class="task-text">${obj.toDo}</span>
    <span class="number" id="number"></span>
    <div class="task-buttons">
    <span class="task-date">${obj.date}</span>
    <button class="edit-btn" onclick="edit_btn(this)">✎</button>
    <button class="delete-btn" onclick="delete_btn(this)">&times;</button>
    </div></li>`;
    task_list.innerHTML += new_task;
    input.value = "";
    todoStorage.push(obj);
  }
  console.log('Stage-01')
 }
add_btn.addEventListener("click", function () {
  newTodo();
  console.log('Stage-02')
  localStorage.setItem('ToDos', JSON.stringify(todoStorage))

  userkiHeading()
  eventfun()
});
function edit_btn(element) {
  var temp = prompt("Enter updated value", "Enter new value");
  element.parentElement.previousElementSibling.previousElementSibling.innerText =
    temp;
}
function delete_btn(element) {
  element.parentElement.parentElement.remove();
}


function eventfun(){
  var myTodos = [];
  console.log('1')
  var loginUser = localStorage.getItem('SigninValue');
  console.log(loginUser)
  todoStorage.forEach(function (data, ind){
    if(loginUser === data.emailID){
      myTodos.push(data);
    }

  });
  
  // for(var i = 0; i < todoStorage.length; i++){
  //   console.log('5')
  //   if(loginUser === todoStorage[i].emailID){
  //     myTodos.push(todoStorage[i])
  //     }   
  //   console.log('7')
  //   }
  console.log('8')
  console.log('last line')
}

function userkiHeading(){
  var username1 = document.getElementById('userHeading')
  username1.innerText = localStorage.getItem('SigninValue')
}