// ===============signup form start======================
var formContainer = document.getElementById("formContainer");
var signupForm = document.getElementById("signupForm");
var signinForm = document.getElementById("signinForm");
var signupEmail = document.getElementById("signupEmail");
var signupPassword1 = document.getElementById("signupPassword1");
var signupPassword2 = document.getElementById("signupPassword2");
var signupStorage = [];
var todoStorage = [];
// ===============Buttons functions start==================
function showSignin() {
  signupForm.style.display = "none";
  signinForm.style.display = "block";
}
function showSignup() {
  signinForm.style.display = "none";
  signupForm.style.display = "block";
  signupreset();
}
// ===============Buttons functions end==================
// ===========New Data Update Start=============
function newSignUp(){
  var obj = {
    signupEmail: signupEmail.value,
    signupPassword: signupPassword1.value,
  } 
  signupStorage.push(obj)
  var jsonStorage = JSON.stringify(signupStorage);
  localStorage.setItem('SignupValue', jsonStorage)
}
// ===========New Data Update End=============
// ===========Check Duplicate Start=============
function CheckSignup() {
  var checkUser = false;
  var temp = signupEmail.value;
  for (var i = 0; i < signupStorage.length; i++) {
    if (temp === signupStorage[i].signupEmail) {
      console.log("Already Available");
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
  if (signupEmail.value && signupPassword1.value && signupPassword2.value && signupPassword1.value === signupPassword2.value) {
    if(CheckSignup() === false){
      newSignUp()
      var temp = signupEmail.value;
      signupreset();
      showSignin();
      signinEmail.value = temp;
      signinPassword.value = "";
    
    }  
     else{
      console.log('User already available');
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
  return
}

// ===========Signup reset end=============
// ===============signup form end======================
// ===============signin form start======================

var signinEmail = document.getElementById("signinEmail");
var signinPassword = document.getElementById("signinPassword");
var welcome = document.getElementById("welcome");
var signinStorage = [];
var activeUser = '';
function newSignIn(){
  var obj = {
    loginEmail: signinEmail.value,
    loginPassword: signinPassword.value,
  }
  signinStorage.push(obj)
  var jsonStorage = JSON.stringify(signinStorage);
  localStorage.setItem('SigninValue', jsonStorage)
}
function signinreset() {
  signinEmail.value = "";
  signinPassword.value = "";
  return
}
function saveSignin() {
  var checkEmail = false; 
  var getSignupId = localStorage.getItem('SignupValue')
  console.log(signupStorage)
  signupStorage = JSON.parse(getSignupId)
  for (var i = 0; i < signupStorage.length; i++) {
    if (signinEmail.value === signupStorage[i].signupEmail && signinPassword.value === signupStorage[i].signupPassword) {
      console.log("ID Available");
      checkEmail = true;
      newSignIn()

      alert("Welcome ", signinEmail)
      welcome.style.display = "flex";
      formContainer.style.display = "none";
      activeUser = signinEmail.value;
      disable()
      console.log(activeUser)
      return checkEmail, activeUser;
    } 

 else {
    console.log("Incorrect Email or Password");
    alert("Incorrect Email or Password");
}}}
// ===============signin form end======================
// ===============signout form start======================
function logout() {
  activeUser = '';
  welcome.style.display = "none";
  formContainer.style.display = "block";
  signinreset()
}

function disable(){
  var logouta = document.getElementById('logout');
  if(activeUser !== ''){
    logouta.style.disabled = 'disabled';
  }

}
// ===============signout form end======================
function memoryClear() {
  localStorage.clear();
}
