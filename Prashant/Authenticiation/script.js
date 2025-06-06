
let users=JSON.parse(localStorage.getItem("users")) || [];  
function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users));
  }
function signup(event){
    event.preventDefault();
    let inputuser=document.getElementById("signupform");
    let username=inputuser.username.value;  
    if(username.length<5) {
        alert("Username must be at least 5 characters long.");
        inputuser.username.value="";
        return;
    }
    for(let user of users) {
        if(user.username===username) {
            alert("Username already exists. Please choose a different username.");
            inputuser.username.value="";
            return;
        }
    }
    let email=inputuser.email.value;
    for(let user of users) {
        if(user.email===email) {
            alert("Email already exists! Please choose a different email.");    
            inputuser.email.value="";
            return;
        }
    }
    let password=inputuser.password.value;
    if(password.length<5) {
        alert("Password must be at least 5 characters long.");
        inputuser.password.value="";
        return;   
    }
    let confirmpassword=inputuser.confirmpassword.value;
    if(password!==confirmpassword) {
        alert("Passwords do not match. Please try again.");
        inputuser.password.value="";
        inputuser.confirmpassword.value="";
        return;
    }

    inputuser.reset();
    users.push({ username, email, password });
    saveUsers();
    alert("Registration successful!");
    inputuser.reset();
}
function login(event) {
    event.preventDefault();
    let found=false;
    let inputuser=document.getElementById("loginform");
    let usernametyped=inputuser.username.value;
    let passwordtyped=inputuser.password.value;
    for(let user of users) {
        if(user.username===usernametyped && user.password===passwordtyped) {
            found=true;
            inputuser.reset();  
            alert("Login successful!");
            return; 
        }
    }
    if(!found) {
        document.getElementById("loginform").reset();
        alert("Login failed! Please check your username and password or if you don't have an account please try to signup");
        return;
    }
}