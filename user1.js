document.addEventListener("DOMContentLoaded", function() {
    const productContainer = document.getElementById("userhome");
    const sidebar = document.querySelector(".sidebar");
    const searchInput = document.getElementById("searchInput");
    const menuItems = document.querySelectorAll(".sidebar ul li");
    const menuTitle = document.getElementById("menuTitle");

    // Function to handle logout
    function handleLogout() {
        // Clear session storage or cookies if any
        sessionStorage.clear();
        // Redirect to the index page
        window.location.href = "index.html";
    }

    // Function to fetch user details from the server
    function fetchUserDetails() {
        return fetch("UserDetailsServlet")
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error(data.error);
                    // Handle the error appropriately, e.g., redirect to login page
                    window.location.href = "index.html"; // Redirect to the index page
                    return null;
                } else {
                    return { userId: data.userId, email: data.email, username: data.username, address: data.address };
                }
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
                return null;
            });
    }

    // Function to fetch product details from the server
    function fetchProductDetails(userId, username, address) {
        fetch("DisplayServlet")
            .then(response => response.json())
            .then(data => {
                data.forEach(product => {
                    const productDiv = document.createElement("div");
                    productDiv.classList.add("product-container");

                    const productImage = document.createElement("img");
                    productImage.classList.add("product-image");
                    productImage.src = `DisplayImage?id=${product.id}`;
                    productImage.alt = "Product Image";
                    productImage.style.width = "300px";
                    productImage.style.height = "auto";

                    const detailsDiv = document.createElement("div");
                    detailsDiv.classList.add("product-details");
                    detailsDiv.innerHTML = `
                        <p><strong>Name:</strong> ${product.name}</p>
                        <p><strong>Manufacture Date:</strong> ${product.manufacture_date}</p>
                        <p><strong>Expiry Date:</strong> ${product.expiry_date}</p>
                        <p><strong>Weight:</strong> ${product.weight}</p>
                        <p><strong>Price:</strong> ${product.price}</p>
                    `;

                    const quantityInput = document.createElement("input");
                    quantityInput.type = "number";
                    quantityInput.min = "1";
                    quantityInput.placeholder = "Quantity";
                    quantityInput.classList.add("quantity-input");

                    const buyButton = document.createElement("button");
                    buyButton.classList.add("buy-button");
                    buyButton.textContent = "Buy";
                    buyButton.style.marginLeft = "10px";
                    buyButton.addEventListener("click", function() {
                        const quantity = quantityInput.value;
                        if (quantity > 0) {
                            window.location.href = `buyproduct.html?id=${product.id}&quantity=${quantity}&userId=${userId}&username=${encodeURIComponent(username)}&address=${encodeURIComponent(address)}&productname=${encodeURIComponent(product.name)}&image=${encodeURIComponent(productImage.src)}&price=${product.price}`;
                        } else {
                            alert("Please enter a valid quantity.");
                        }
                    });

                    const buttonContainer = document.createElement("div");
                    buttonContainer.appendChild(quantityInput);
                    buttonContainer.appendChild(buyButton);
                    detailsDiv.appendChild(buttonContainer);

                    productDiv.appendChild(productImage);
                    productDiv.appendChild(detailsDiv);

                    const hr = document.createElement("hr");
                    hr.style.height = "2px";
                    hr.style.backgroundColor = "black";
                    hr.style.margin = "40px 0";
                    productDiv.appendChild(hr);

                    productContainer.appendChild(productDiv);
                });

                updateSidebarHeight();
            })
            .catch(error => {
                console.error('Error:', error);
                productContainer.innerHTML = "<p>Failed to fetch product details. Please try again later.</p>";
            });
    }

    function updateSidebarHeight() {
        const products = document.querySelectorAll(".product-container");
        const newHeight = products.length * 500;

        sidebar.style.height = newHeight + "px";
    }

    function filterProducts(searchTerm) {
        const products = document.querySelectorAll(".product-container");

        products.forEach(product => {
            const name = product.querySelector(".product-details p:first-child").textContent.toLowerCase();
            if (name.includes(searchTerm.toLowerCase())) {
                product.style.display = "";
            } else {
                product.style.display = "none";
            }
        });
    }

    searchInput.addEventListener("input", function() {
        const searchTerm = searchInput.value.trim();
        filterProducts(searchTerm);
    });

    // Fetch user details and then fetch product details
    fetchUserDetails().then(userDetails => {
        if (userDetails) {
            fetchProductDetails(userDetails.userId, userDetails.username, userDetails.address);
        }
    });

    // Add event listeners for menu items
    menuItems.forEach(item => {
        item.addEventListener("click", function() {
            const menuName = item.id;
            menuTitle.textContent = menuName;
            if (menuName === 'logout') {
                handleLogout();
            } else if (menuName === 'my-orders') {
                window.location.href = "vieworders.html";
            }
        });
    });
});
