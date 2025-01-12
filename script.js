document.addEventListener("DOMContentLoaded", function() {
    const menuItems = document.querySelectorAll(".sidebar li");
    const loginForm = document.getElementById("loginForm");
    const menuTitle = document.getElementById("menuTitle");

    menuItems.forEach(item => {
        item.addEventListener("click", function() {
            const menuName = item.id;
            menuTitle.textContent = menuName;

            if (menuName === 'user') {
                // Display user login form with registration link
                loginForm.innerHTML = `
                    <div class="login-form" style="opacity: 0; transition: opacity 0.5s;">
                        <h1>Login</h1>
                        <form action="ulogin" method="post">
                            <div class="input-group">
                                <label for="email">Email ID</label>
                                <input type="email" id="email" name="email" required>
                            </div>
                            <div class="input-group">
                                <label for="password">Password</label>
                                <input type="password" id="password" name="password" required>
                            </div>
                            <button type="submit">Login</button>
                            <p class="register-link">Don't have an account? <a href="#" id="registerLink">Register</a></p>
                        </form>
                    </div>
                `;

                // Add event listener for the register link
                document.getElementById("registerLink").addEventListener("click", function(event) {
                    event.preventDefault(); // Prevent default link behavior
                    // Replace login form with registration form
                    loginForm.innerHTML = `
                        <div class="register-form" style="opacity: 0; transition: opacity 0.5s;">
                            <form id="registerForm" action="register" method="post">
                                <h3>Sign Up</h3>
                                <p>Enter your personal details below:</p>
                                <div class="control-group">
                                    <label for="fullname">Full Name:</label>
                                    <input type="text" id="fullname" name="fullname" required><br>
                                </div>
                                <div class="control-group">
                                    <label for="email">Email:</label>
                                    <input type="email" id="email" name="email" required><br>
                                </div>
                                <div class="control-group">
                                    <label for="address">Address:</label>
                                    <input type="text" id="address" name="address" required><br>
                                </div>
                                <div class="control-group">
                                    <label for="city">City/Town:</label>
                                    <input type="text" id="city" name="city" required><br>
                                </div>
                                <div class="control-group">
                                    <label for="country">Country:</label>
                                    <select id="country" name="country" required>
                                        <option value="">Select Country</option>
                                        <option value="ZM">Zambia</option>
                                        <option value="ZW">Zimbabwe</option>
                                    </select>
                                </div>
                                <p>Enter your account details below:</p>
                                <div class="control-group">
                                    <label for="username">Username:</label>
                                    <input type="text" id="username" name="username" required><br>
                                </div>
                                <div class="control-group">
                                    <label for="password">Password:</label>
                                    <input type="password" id="password" name="password" required><br>
                                </div>
                                <div class="control-group">
                                    <label for="retype_password">Re-type Your Password:</label>
                                    <input type="password" id="retype_password" name="retype_password" required><br>
                                </div>
                                <button type="submit">Sign Up</button>
                            </form>
                        </div>
                    `;

                    // Add validation for the re-type password field
                    const registerForm = document.getElementById("registerForm");
                    registerForm.addEventListener("submit", function(event) {
                        const password = document.getElementById("password").value;
                        const retypePassword = document.getElementById("retype_password").value;
                        if (password !== retypePassword) {
                            event.preventDefault(); // Prevent form submission
                            alert("Passwords do not match. Please re-enter your password.");
                        }
                    });

                    // Set a small timeout to ensure the form is added to the DOM before changing its opacity
                    setTimeout(() => {
                        loginForm.querySelector('.register-form').style.opacity = 1;
                    }, 100);
                });
            } else {
                // Display only the login form for other menus
                loginForm.innerHTML = `
                    <div class="login-form" style="opacity: 0; transition: opacity 0.5s;">
                        <h3>Login</h3>
                        <form action="LoginServlet" method="post">
                            <label for="username">Username:</label>
                            <input type="text" id="username" name="username" required><br>
                            <label for="password">Password:</label>
                            <input type="password" id="password" name="password" required><br>
                            <button type="submit">Login</button>
                        </form>
                    </div>
                `;
            }

            // Set a small timeout to ensure the form is added to the DOM before changing its opacity
            setTimeout(() => {
                loginForm.querySelector('.login-form').style.opacity = 1;
            }, 100);
        });
    });
});
