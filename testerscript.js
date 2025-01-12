document.addEventListener("DOMContentLoaded", function() {
    const menuItems = document.querySelectorAll(".sidebar li");
    const menuTitle = document.getElementById("menuTitle");
    const productDetailsContainer = document.getElementById("productDetails");
    const searchInput = document.getElementById("searchInput");

    menuItems.forEach(item => {
        item.addEventListener("click", function() {
            const menuName = item.id;
            menuTitle.textContent = menuName;

            if (menuName === 'tester-home') {
                // Display user login form with registration link
                productDetailsContainer.innerHTML = `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Image Display</title>
                    </head>
                    <body>
                        <div>
                            <img src="img/1.jpg" style="width: 600px; height: auto; margin-top: 50px; margin-left: 170px;" >
                        </div> 
                    </body>
                    </html>`;
            } else if (menuName === 'Review-product') {
                // Clear previous content
                productDetailsContainer.innerHTML = "";
                // Fetch product details from the server using AJAX
                fetch("DisplayServlet")
                    .then(response => response.json())
                    .then(data => {
                        // Construct table to display product details
                        const table = document.createElement("table");
                        table.style.borderCollapse = "collapse";
                        table.style.width = "100%";

                        // Header row
                        const headerRow = document.createElement("tr");
                        headerRow.innerHTML = `
                            <th style="border: 1px solid #ddd; padding: 8px;">ID</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Image</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Name</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Manufacture Date</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Expiry Date</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Weight</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Status</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Action</th>
                        `;
                        table.appendChild(headerRow);

                        // Populate table with product details
                        data.forEach(product => {
                            const row = document.createElement("tr");
                            row.innerHTML = `
                                <td style="border: 1px solid #ddd; padding: 8px;">${product.id}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;"><img src="DisplayImage?id=${product.id}" style="width: 100px; height: auto;"></td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${product.name}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${product.manufacture_date}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${product.expiry_date}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${product.weight}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${product.price}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${product.status}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">
                                    <button class="approveButton" data-id="${product.id}">Approve</button>
                                    <button class="rejectButton" data-id="${product.id}">Reject</button>
                                </td>
                            `;
                            table.appendChild(row);
                        });

                        // Append table to the product details container
                        productDetailsContainer.appendChild(table);

                        // Add event listeners to approve and reject buttons
                        const approveButtons = document.querySelectorAll(".approveButton");
                        const rejectButtons = document.querySelectorAll(".rejectButton");

                        approveButtons.forEach(button => {
                            button.addEventListener("click", function() {
                                const productId = button.getAttribute("data-id");
                                updateProductStatus(productId, "approved");
                                // Update status cell in the same row
                                const statusCell = button.parentElement.previousElementSibling;
                                statusCell.textContent = "approved";
                            });
                        });

                        rejectButtons.forEach(button => {
                            button.addEventListener("click", function() {
                                const productId = button.getAttribute("data-id");
                                updateProductStatus(productId, "rejected");
                                // Update status cell in the same row
                                const statusCell = button.parentElement.previousElementSibling;
                                statusCell.textContent = "rejected";
                            });
                        });

                        // Add event listener for search input
                        searchInput.addEventListener("input", function() {
                            const searchTerm = searchInput.value.toLowerCase();
                            const rows = table.querySelectorAll("tr");

                            rows.forEach(row => {
                                const nameCell = row.querySelector("td:nth-child(3)");
                                if (nameCell) {
                                    const name = nameCell.textContent.toLowerCase();
                                    if (name.includes(searchTerm)) {
                                        row.style.display = ""; // Show row if it matches search term
                                    } else {
                                        row.style.display = "none"; // Hide row if it doesn't match search term
                                    }
                                }
                            });
                        });
                    })
                    .catch(error => console.error("Error fetching product details:", error));
            } else if (menuName === 'logout') {
                // Redirect to index.html
                window.location.href = "index.html";
            }
        });
    });

    function updateProductStatus(productId, status) {
        // Send AJAX request to update product status
        console.log("Updating product status:", productId, status);
        fetch("update_product_status", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: productId, status: status })
        })
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                console.error("Failed to update product status:", data.message);
            }
        })
        .catch(error => console.error("Error updating product status:", error));
    }
});
