document.addEventListener("DOMContentLoaded", function() {
    const productContainer = document.getElementById("userhome");

    $(document).ready(function() {
        $("#viewProductsBtn").click(function() {
            $.ajax({
                type: "GET",
                url: "DisplayServlet",
                dataType: "json",
                success: function(products) {
                    $("#productList").empty();
                    products.forEach(function(product) {
                        var productDiv = $("<div class='product'>");
                        var img = $("<img>").attr("src", "DisplayImage?id=" + product.id);
                        var details = $("<p>").html(
                            "<strong>Name:</strong> " + product.name + "<br>" +
                            "<strong>Weight:</strong> " + product.weight + "<br>" +
                            "<strong>Manufacture Date:</strong> " + product.manufactureDate + "<br>" +
                            "<strong>Expiry Date:</strong> " + product.expiryDate + "<br>" +
                            "<strong>Price:</strong> " + product.price
                        );
                        productDiv.append(img).append(details);
                        $("#productList").append(productDiv);
                    });
                },
                error: function(xhr, status, error) {
                    console.error(error);
                    alert("Failed to fetch products. .");
                }
            });
        });
    });
});

// Your other code can go here
