var login = document.getElementById("login");
var signup = document.getElementById("singup");
var logout = document.getElementById("logout");
var loginBtn = document.getElementById("loginBtn");
var signUpBtn = document.getElementById("signUpBtn");
// Small Buttons
var newSignUpBtn = document.getElementById("NewsignUpBtn");
var signInSmallBtm = document.getElementById("signedAlready");
var logoutBtn = document.getElementById("logoutBtn");
// Inputs sign in page
var email = document.getElementById("userEmail");
var password = document.getElementById("userPassword");
// Inputs New sign up
var newUsername = document.getElementById("newUserName");
var newEmail = document.getElementById("newUserEmail");
var newPassword = document.getElementById("newUserPassword");
// Greeting Span
var greetings = document.getElementById("greeting");
// Current DB
var currentUsers = [];
// RegEx Email
var emailRegEx = /^[\w\-\.]+@([\w-]+\.)+[\w\-]{2,4}$/;
// NotValid
var hintsignUp = document.getElementById("hintSignUpBtn");
var hintSignIn = document.getElementById("hintSignIn");


// Checking DB
if(window.localStorage.getItem("currentUsers")){
    currentUsers = JSON.parse(window.localStorage.getItem("currentUsers"));
}

// validation for Signing Up
signUpBtn.addEventListener("click",newSignUp);
// Login Page
loginBtn.addEventListener("click",loginCheck);


// SignUp Function
function newSignUp(){
    var thenewUserName = newUsername.value;
    var thenewUserEmail = newEmail.value;
    var thenewUserPassword = newPassword.value;
    var availabile = 0;

    if(thenewUserName == "" || thenewUserEmail == "" || thenewUserPassword == ""){
        hintsignUp.innerHTML = "All inputs is required";
    } else{
        if(emailRegEx.test(thenewUserEmail) == false){
            hintsignUp.innerHTML = "* You have entered an invalid Email";
        }else{
            hintsignUp.innerHTML = "";
            if(currentUsers.length == 0){
                var newUser = {
                    userName : thenewUserName,
                    userEmail : thenewUserEmail,
                    userPassword : thenewUserPassword
                };
                currentUsers.push(newUser);
                signedIn();
                clearInputs();
            } else{
                for(var i=0;i<currentUsers.length;i++){
                    if(currentUsers[i].userEmail == thenewUserEmail){
                        hintsignUp.innerHTML = "* This email is already registered";
                        availabile++
                    }
                }
                if(availabile == 0){
                    var newUser = {
                        userName : thenewUserName,
                        userEmail : thenewUserEmail,
                        userPassword : thenewUserPassword
                    };
                    currentUsers.push(newUser);
                    signedIn();
                    clearInputs();
                }
            }
        };
    }

    window.localStorage.setItem("currentUsers",JSON.stringify(currentUsers));
};

// Login Function
function loginCheck(){
    var theEmail = email.value;
    var thePassword = password.value;

    if(currentUsers.length == 0){
        hintSignIn.innerHTML = "* The email is not registered. Sign up First";
    } else{
        if(emailRegEx.test(theEmail) == false){
            hintSignIn.innerHTML = "* You have entered an invalid Email";
        } else{
            for(var i = 0; i<currentUsers.length; i++){
                if(currentUsers[i].userEmail == theEmail){
                    if(thePassword == ""){
                        hintSignIn.innerHTML = "* Please enter the password";
                    } else{
                        if(currentUsers[i].userPassword == thePassword){
                            greetings.innerHTML = currentUsers[i].userName;
                            loginNow();
                            clearLoginInputs();
                            hintSignIn.innerHTML = "";
                        } else{
                            hintSignIn.innerHTML = "* The password is incorrect";
                        }
                    }
                } else{
                    hintSignIn.innerHTML = "* The email is not registered";
                }
            }
        }
    }
};


// Small Buttons Functions
newSignUpBtn.addEventListener("click",newSigning);
signInSmallBtm.addEventListener("click",signedIn);
logoutBtn.addEventListener("click",logoutNow);

function newSigning(){
    login.style.display="none";
    signup.style.display="block";
    hintSignIn.innerHTML = ""
};

function signedIn(){
    login.style.display="block";
    signup.style.display="none";
};

function logoutNow(){
    login.style.display="block";
    logout.style.display="none";
};

function loginNow(){
    login.style.display="none";
    logout.style.display="block";
};

// Clear Inputs
function clearInputs(){
    newUsername.value = "";
    newEmail.value = "";
    newPassword.value = "";
};

function clearLoginInputs(){
    email.value = "";
    password.value = "";
}

// To clear the local storage
// window.localStorage.clear()