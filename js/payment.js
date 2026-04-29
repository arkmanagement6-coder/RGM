/**
 * Revanta Growth Media - Global Payment Logic
 */

// Inject Payment Modal HTML into the page automatically
const injectPaymentModal = () => {
    if (document.getElementById('globalPaymentModal')) return;

    const modalHTML = `
    <div id="globalPaymentModal" class="payment-modal-overlay" style="display:none;">
        <div class="payment-modal-card">
            <button class="close-modal" onclick="closeGlobalPaymentModal()"><i class="fa-solid fa-xmark"></i></button>
            <h3>Secure Payment</h3>
            <p style="margin-bottom: 20px; color: #cbd5e1;">Enter your details and the amount you wish to pay.</p>
            
            <form id="globalPaymentForm" onsubmit="handleGlobalPaymentSubmit(event)">
                <div class="input-group">
                    <label>Full Name</label>
                    <input type="text" id="gCustName" required placeholder="John Doe">
                </div>
                <div class="input-group">
                    <label>Email Address</label>
                    <input type="email" id="gCustEmail" required placeholder="john@example.com">
                </div>
                <div class="input-group">
                    <label>Phone Number</label>
                    <input type="tel" id="gCustPhone" required placeholder="9876543210" pattern="[0-9]{10}">
                </div>
                <div class="input-group">
                    <label>Amount (INR)</label>
                    <input type="number" id="gAmount" required placeholder="Enter Amount" min="1">
                </div>
                <button type="submit" id="gPayBtn" class="btn btn-primary" style="width: 100%; border:none; cursor:pointer; margin-top: 10px; background: #22c55e;">
                    Pay Now
                </button>
            </form>
        </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
};

window.openGlobalPaymentModal = () => {
    injectPaymentModal();
    document.getElementById('globalPaymentModal').style.display = 'flex';
};

window.closeGlobalPaymentModal = () => {
    const modal = document.getElementById('globalPaymentModal');
    if (modal) modal.style.display = 'none';
};

window.handleGlobalPaymentSubmit = async (e) => {
    e.preventDefault();
    
    const btn = document.getElementById('gPayBtn');
    const originalText = btn.innerText;
    btn.innerText = "Processing...";
    btn.disabled = true;

    const name = document.getElementById('gCustName').value;
    const email = document.getElementById('gCustEmail').value;
    const phone = document.getElementById('gCustPhone').value;
    const amount = document.getElementById('gAmount').value;

    try {
        const response = await fetch('/api/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone, amount })
        });

        const data = await response.json();

        if (!data.success) {
            alert("Failed to initialize payment. Please try again.");
            btn.innerText = originalText;
            btn.disabled = false;
            return;
        }

        const options = {
            key: data.key_id,
            amount: data.order.amount,
            currency: data.order.currency,
            name: "Revanta Growth Media",
            description: "Custom Payment",
            order_id: data.order.id,
            handler: function (response) {
                window.location.href = `payment-success.html?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}&amount=${amount}`;
            },
            prefill: {
                name: name,
                email: email,
                contact: phone
            },
            theme: {
                color: "#0a255c"
            }
        };

        const rzp = new Razorpay(options);
        rzp.open();
        closeGlobalPaymentModal();

    } catch (error) {
        console.error(error);
        alert("An error occurred. Please try again.");
    } finally {
        btn.innerText = originalText;
        btn.disabled = false;
    }
};

// Auto-inject Razorpay script if not present
if (!window.Razorpay) {
    const script = document.createElement('script');
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.head.appendChild(script);
}
