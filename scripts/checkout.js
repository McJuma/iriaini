document.addEventListener("DOMContentLoaded", function () {
    // Retrieve cart data from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Calculate the total amount from the cart
    let totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    // Display the total amount on the page
    document.getElementById("total-amount").textContent = `Ksh ${totalAmount.toFixed(2)}`;

    // Add event listener to the pay button
    document.getElementById("payButton").addEventListener("click", function () {
        const phoneNumber = document.getElementById("phone-number").value.trim();

        // Validate phone number
        if (!phoneNumber || !phoneNumber.startsWith("254") || phoneNumber.length !== 12) {
            document.getElementById("response").innerText = "Please enter a valid phone number starting with 254.";
            return;
        }

        document.getElementById("response").innerText = "Processing Payment...";

        // Send request to your backend
        fetch("https://mpesa-backend-theta.vercel.app/stkpush", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                phone: phoneNumber,
                amount: totalAmount.toFixed(0), // Ensure amount is whole number
            }),
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            document.getElementById("response").innerText = result.ResponseDescription || "Payment request sent!";
        })
        .catch(error => {
            console.error(error);
            document.getElementById("response").innerText = "Error processing payment!";
        });
    });
});