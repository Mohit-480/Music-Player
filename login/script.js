// Function to validate login
function validateLogin() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Simple validation
    if (username === "" || password === "") {
        alert("Please enter both username and password.");
    } else {
        // Check if the user exists in local storage
        var storedUser = localStorage.getItem(username);

        if (storedUser && JSON.parse(storedUser).password === password) {
            // Redirect to the main page (adjust the path accordingly)
            window.location.href = "../index.html";
        } else {
            alert("Invalid username or password. Please try again or sign up.");
        }
    }
}

// Function to handle sign-up
function signUp() {
    var newUsername = document.getElementById("new-username").value;
    var newPassword = document.getElementById("new-password").value;

    // Simple validation
    if (newUsername === "" || newPassword === "") {
        alert("Please enter both username and password for sign-up.");
    } else {
        // Check if the username already exists
        var existingUser = localStorage.getItem(newUsername);

        if (existingUser) {
            alert("Username already exists. Please choose a different one.");
        } else {
            // Save the new user in local storage
            var newUser = { username: newUsername, password: newPassword };
            localStorage.setItem(newUsername, JSON.stringify(newUser));

            alert("Sign-up successful! You can now log in.");
            // Redirect to the login form after successful sign-up
            window.location.href = "login.html";
        }
    }
}

// Function to toggle between login and sign-up forms
function toggleForms() {
    var loginForm = document.getElementById("login-form");
    var signupForm = document.getElementById("signup-form");

    loginForm.classList.toggle("hidden");
    signupForm.classList.toggle("hidden");
}
