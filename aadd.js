document.addEventListener("DOMContentLoaded", function() {
    const menuItems = document.querySelectorAll(".sidebar li");
    const loginForm = document.getElementById("adminhome");
    const menuTitle = document.getElementById("menuTitle");
    const productDetailsContainer = document.getElementById("adminhome");

    menuItems.forEach(item => {
        item.addEventListener("click", function() {
            const menuName = item.id;
            menuTitle.textContent = menuName;
            if (menuName === 'admin-home') {
                loginForm.innerHTML = `<img src="img/1.jpg" style="width: 60%; height: auto; margin-top: 20px; margin-left: 20px;">`;
            } else if (menuName === 'add-product') {
                loginForm.innerHTML = `
                    <div id="uploadFormContainer">
                        <h1>Product Management</h1>
                        <form id="uploadForm" enctype="multipart/form-data" action="uploadproduct" method="POST">
                            <label for="productName">Product Name:</label>
                            <input type="text" id="productName" name="productName" required><br><br>
                            <label for="productImage">Product Image:</label>
                            <input type="file" id="productImage" name="productImage" accept="image/*" required><br><br>
                            <label for="weight">Weight:</label>
                            <input type="text" id="weight" name="weight" required><br><br>
                            <label for="manufactureDate">Manufacture Date:</label>
                            <input type="date" id="manufactureDate" name="manufactureDate" required><br><br>
                            <label for="expiryDate">Expiry Date:</label>
                            <input type="date" id="expiryDate" name="expiryDate" required><br><br>
                            <label for="price">Price:</label>
                            <input type="text" id="price" name="price" required><br><br>
                            <input type="submit" value="Upload">
                        </form>
                    </div>
                `;
            } else if (menuName === 'view-product') {
                productDetailsContainer.innerHTML = "";
                fetch("DisplayServlet")
                    .then(response => response.json())
                    .then(data => {
                        const table = document.createElement("table");
                        table.style.borderCollapse = "collapse";
                        table.style.width = "100%";
                        const headerRow = document.createElement("tr");
                        headerRow.innerHTML = `
                            <th style="border: 1px solid #ddd; padding: 8px; color: blue;">ID</th>
                            <th style="border: 1px solid #ddd; padding: 8px; color: blue;">Image</th>
                            <th style="border: 1px solid #ddd; padding: 8px; color: blue;">Name</th>
                            <th style="border: 1px solid #ddd; padding: 8px; color: blue;">Manufacture Date</th>
                            <th style="border: 1px solid #ddd; padding: 8px; color: blue;">Expiry Date</th>
                            <th style="border: 1px solid #ddd; padding: 8px; color: blue;">Weight</th>
                            <th style="border: 1px solid #ddd; padding: 8px; color: blue;">Price</th>
                            <th style="border: 1px solid #ddd; padding: 8px; color: blue;">Status</th>
                        `;
                        table.appendChild(headerRow);
                        data.forEach(product => {
                            const row = document.createElement("tr");
                            row.innerHTML = `
                                <td style="border: 1px solid #ddd; padding: 8px; color: blue;">${product.id}</td>
                                <td style="border: 1px solid #ddd; padding: 8px; color: blue;"><img src="DisplayImage?id=${product.id}" style="width: 100px; height: auto;"></td>
                                <td style="border: 1px solid #ddd; padding: 8px; color: blue;">${product.name}</td>
                                <td style="border: 1px solid #ddd; padding: 8px; color: blue;">${product.manufacture_date}</td>
                                <td style="border: 1px solid #ddd; padding: 8px; color: blue;">${product.expiry_date}</td>
                                <td style="border: 1px solid #ddd; padding: 8px; color: blue;">${product.weight}</td>
                                <td style="border: 1px solid #ddd; padding: 8px; color: blue;">${product.price}</td>
                                <td style="border: 1px solid #ddd; padding: 8px; color: blue;">${product.status}</td>
                            `;
                            table.appendChild(row);
                        });
                        productDetailsContainer.appendChild(table);
                    })
                    .catch(error => console.error("Error fetching product details:", error));
            } else if (menuName === 'logout') {
                window.location.href = "index.html";
            } else {
                loginForm.innerHTML = `<h3>Login</h3>
                                        <form action="LoginServlet" method="post">
                                            <label for="username">Username:</label>
                                            <input type="text" id="username" name="username" required><br>
                                            <label for="password">Password:</label>
                                            <input type="password" id="password" name="password" required><br>
                                            <button type="submit">Login</button>
                                        </form>`;
            }
        });
    });
});
