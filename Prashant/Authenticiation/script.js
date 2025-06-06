let users = JSON.parse(localStorage.getItem("users")) || [];

function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

function signup(event) {
  event.preventDefault();
  const inputuser = document.getElementById("signupform");
  const username = inputuser.username.value.trim();
  const email = inputuser.email.value.trim();
  const password = inputuser.password.value;
  const confirmpassword = inputuser.confirmpassword.value;

  if (username.length < 5) {
    alert("Username must be at least 5 characters long.");
    inputuser.username.value = "";
    return;
  }

  if (users.some(user => user.username === username)) {
    alert("Username already exists. Please choose a different username.");
    inputuser.username.value = "";
    return;
  }

  if (users.some(user => user.email === email)) {
    alert("Email already exists! Please choose a different email.");
    inputuser.email.value = "";
    return;
  }

  if (password.length < 5) {
    alert("Password must be at least 5 characters long.");
    inputuser.password.value = "";
    return;
  }

  if (password !== confirmpassword) {
    alert("Passwords do not match. Please try again.");
    inputuser.password.value = "";
    inputuser.confirmpassword.value = "";
    return;
  }

  users.push({ username, email, password });
  saveUsers();
  alert("Registration successful!");
  inputuser.reset();
}

function login(event) {
  event.preventDefault();
  const inputuser = document.getElementById("loginform");
  const usernametyped = inputuser.username.value.trim();
  const passwordtyped = inputuser.password.value;

  const user = users.find(user => user.username === usernametyped && user.password === passwordtyped);
  
  if (user) {
    alert("Login successful!");
    inputuser.reset();
    // You can redirect or store session data here if needed
  } else {
    alert("Login failed! Please check your username and password or sign up if you don't have an account.");
    inputuser.reset();
  }
}
