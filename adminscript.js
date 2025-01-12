document.addEventListener("DOMContentLoaded", function() {
    const menuItems = document.querySelectorAll(".sidebar li");
    const adminHomeContainer = document.getElementById("adminhome");
    const menuTitle = document.getElementById("menuTitle");

    menuItems.forEach(item => {
        item.addEventListener("click", function() {
            const menuName = item.id;
            menuTitle.textContent = menuName;
            if (menuName === 'admin-home') {
                // Display admin home content
                adminHomeContainer.innerHTML = `
                    <h2>Welcome to Admin Home</h2>
                    <img src="img/1.png" style="width: 200px; height: auto;">
                `;
            } else if (menuName === 'add-product') {
                // Display add product form
                adminHomeContainer.innerHTML = `
                    <form id="productForm" action="upload_product" method="post">
                        <h3>Add Product</h3>
                        <label for="productImage">Product Image:</label>
                        <input type="file" id="productImage" name="productImage" accept="image/*"><br>
                        <label for="weight">Weight:</label>
                        <input type="text" id="weight" name="weight"><br>
                        <label for="expiryDate">Expiry Date:</label>
                        <input type="date" id="expiryDate" name="expiryDate"><br>
                        <label for="price">Price:</label>
                        <input type="text" id="price" name="price"><br>
                        <button type="submit" style="background-color: blue; color: white;">Upload Product</button>
                    </form>
                `;
            } else if (menuName === 'logout') {
                // Redirect to index.html
                window.location.href = "index.html";
            } else {
                // Display login form for other menus
                adminHomeContainer.innerHTML = `
                    <h3>Login</h3>
                    <form action="LoginServlet" method="post">
                        <label for="username">Username:</label>
                        <input type="text" id="username" name="username" required><br>
                        <label for="password">Password:</label>
                        <input type="password" id="password" name="password" required><br>
                        <button type="submit">Login</button>
                    </form>
                `;
            }
        });
    });
});
