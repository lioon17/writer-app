 let currentReview = 0;

document.addEventListener('DOMContentLoaded', (event) => {
    showReview(currentReview);

    const serviceDropdown = document.getElementById('serviceDropdown');
    const serviceSelect = document.getElementById('service');

    serviceDropdown.addEventListener('click', function(event) {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            const selectedText = event.target.textContent;
            updateServiceSelect(selectedText);
        }
    });

    function updateServiceSelect(serviceText) {
        for (let i = 0; i < serviceSelect.options.length; i++) {
            if (serviceSelect.options[i].text === serviceText) {
                serviceSelect.selectedIndex = i;
                updateTotalPrice(); // Update total price when service selection changes
                break;
            }
        }
    }
});

function showReview(index) {
    const reviews = document.querySelectorAll('.review-card');
    reviews.forEach((review, i) => {
        review.classList.remove('active');
        if (i === index) {
            review.classList.add('active');
        }
    });
}

function moveCarousel(step) {
    const reviews = document.querySelectorAll('.review-card');
    currentReview = (currentReview + step + reviews.length) % reviews.length;
    showReview(currentReview);
}

// Sidebar functions
function showSidebar() {
    document.querySelector(".sidebar").style.display = "flex";
}

function closeSidebar() {
    document.querySelector(".sidebar").style.display = "none";
}

function redirectToOrderPage() {
    window.location.href = '/order';
}

// Open a specific tab
function openTab(event, tabName) {
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }

    const tabButtons = document.getElementsByClassName('tab-button');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }

    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Switch customer type and update UI
function switchCustomerType(event, customerType) {
    const customerForms = document.getElementsByClassName("customer-form");
    for (let i = 0; i < customerForms.length; i++) {
        customerForms[i].style.display = "none";
        customerForms[i].classList.remove("active");
    }

    const customerButtons = document.getElementsByClassName("customer-button");
    for (let i = 0; i < customerButtons.length; i++) {
        customerButtons[i].classList.remove("active");
    }

    document.getElementById(customerType).style.display = "block";
    document.getElementById(customerType).classList.add("active");
    event.currentTarget.classList.add("active");
}


//calculator
document.addEventListener('DOMContentLoaded', function() {
    const serviceSelect = document.getElementById('service');
    const levelSelect = document.getElementById('level');
    const pagesInput = document.getElementById('pages');
    const deadlineInput = document.getElementById('deadline');
    const totalPriceElement = document.getElementById('totalPrice');
    const pricePerPage = 12.99; // Base price per page

    function updateTotalPrice() {
        const numberOfPages = parseInt(pagesInput.value) || 0;
        const urgencyMultiplier = getUrgencyMultiplier(deadlineInput.value);
        const totalPrice = (numberOfPages * pricePerPage * urgencyMultiplier).toFixed(2);
        totalPriceElement.textContent = '$' + totalPrice;
    }

    function getUrgencyMultiplier(deadline) {
        const daysUntilDeadline = (new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24);
        if (daysUntilDeadline <= 3) return 1.5;
        if (daysUntilDeadline <= 7) return 1.3;
        if (daysUntilDeadline <= 14) return 1.1;
        return 1;
    }

    serviceSelect.addEventListener('change', updateTotalPrice);
    levelSelect.addEventListener('change', updateTotalPrice);
    pagesInput.addEventListener('input', updateTotalPrice);
    deadlineInput.addEventListener('change', updateTotalPrice);

    // Initial price calculation
    updateTotalPrice();
});

function storeFormData() {
    const serviceSelect = document.getElementById('service');
    const levelSelect = document.getElementById('level');
    const pagesInput = document.getElementById('pages');
    const deadlineInput = document.getElementById('deadline');
    const totalPriceElement = document.getElementById('totalPrice');

    const formData = {
        service: serviceSelect.value,
        level: levelSelect.value,
        pages: pagesInput.value,
        deadline: deadlineInput.value,
        totalPrice: totalPriceElement.textContent
    };

    localStorage.setItem('formData', JSON.stringify(formData));

    // Redirect to order page
    window.location.href = '/order';
}

// Display stored form data on order summary
const formData = JSON.parse(localStorage.getItem('formData'));
if (formData) {
    const orderSummaryDiv = document.createElement('div');
    orderSummaryDiv.innerHTML = `
        <h2>Order Summary</h2>
        <p>Type of Service: ${formData.service}</p>
        <p>Academic Level: ${formData.level}</p>
        <p>Number of Pages: ${formData.pages}</p>
        <p>Deadline: ${formData.deadline}</p>
        <p>Total Price: ${formData.totalPrice}</p>
        <button class="next-step" onclick="nextStep()">Next Step</button>
    `;
    document.getElementById('order-summary').appendChild(orderSummaryDiv);
}
