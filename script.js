/* ================= GLOBAL STATE ================= */
let cart = [];
let total = 0;
let freeDessertAdded = false;

/* ================= BUILD MEAL DATA ================= */
const proteins = {
    veg: ["Paneer", "Tofu", "Chana", "Dal"],
    nonveg: ["Chicken", "Fish", "Goat", "Pork"]
};

const stepsData = [
    { title: "Cooking Style", options: ["Grilled", "Fried", "Roasted"] },
    { title: "Spice Level", options: ["Mild", "Medium", "Spicy"] },
    { title: "Side Vegetables", options: ["Salad", "Mixed Veg", "Roasted Veg"] },
    { title: "Extra Sides", options: ["Fries", "Rice", "Bread"] },
    { title: "Sauces", options: ["Butter Sauce", "Mint Chutney", "Makhani", "Spicy Masala"] }
];

/* ================= DOM ELEMENTS ================= */
const categoryButtons = document.querySelectorAll(".category");
const proteinStep = document.getElementById("protein-step");
const proteinOptions = document.getElementById("protein-options");
const dynamicSteps = document.getElementById("dynamic-steps");

const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

const confirmationPopup = document.getElementById("confirmation-popup");
const paymentPopup = document.getElementById("payment-popup");

/* ================= CATEGORY SELECTION ================= */
categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const type = btn.dataset.type;

        proteinOptions.innerHTML = "";
        proteinStep.classList.remove("hidden");

        proteins[type].forEach(item => {
            const div = document.createElement("div");
            div.innerText = item;

            div.addEventListener("click", () => startSteps(item));
            proteinOptions.appendChild(div);
        });
    });
});

/* ================= STEP FLOW ================= */
function startSteps(selectedProtein) {
    dynamicSteps.innerHTML = "";

    let currentStep = 0;
    let selections = [selectedProtein];

    showStep();

    function showStep() {
        if (currentStep >= stepsData.length) {
            addToCart("Custom Meal", 350);
            showConfirmation();
            return;
        }

        const step = stepsData[currentStep];

        const stepDiv = document.createElement("div");
        stepDiv.classList.add("step");

        const title = document.createElement("h3");
        title.innerText = step.title;

        const optionsDiv = document.createElement("div");
        optionsDiv.classList.add("options");

        step.options.forEach(opt => {
            const option = document.createElement("div");
            option.innerText = opt;

            option.addEventListener("click", () => {
                selections.push(opt);
                currentStep++;

                dynamicSteps.innerHTML = "";
                showStep();
            });

            optionsDiv.appendChild(option);
        });

        stepDiv.appendChild(title);
        stepDiv.appendChild(optionsDiv);
        dynamicSteps.appendChild(stepDiv);
    }
}

/* ================= TAB SWITCHING ================= */
const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".menu-content");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));

        tab.classList.add("active");
        document.getElementById(tab.dataset.tab).classList.add("active");
    });
});

/* ================= MENU + DESSERT DATA ================= */
function generateItems(containerId, count, baseName, priceStart) {
    const container = document.getElementById(containerId);

    for (let i = 1; i <= count; i++) {
        const item = document.createElement("div");
        item.classList.add("menu-item");

        const name = `${baseName} ${i}`;
        const price = priceStart + i * 10;

        item.innerHTML = `
            <h4>${name}</h4>
            <p>Delicious and freshly made</p>
            <p>₹${price}</p>
            <button onclick="addToCart('${name}', ${price})">Add to Cart</button>
        `;

        container.appendChild(item);
    }
}
const vegHealthyItems = [
    {
        name: "Paneer Buddha Bowl",
        desc: "Grilled paneer, quinoa, roasted veggies & tahini",
        price: 299  
    },
    {
        name: "Dal Tadka Thali",
        desc: "Protein-rich dal with steamed rice & sabzi",
        price: 249  
    },
    {
        name: "Tofu Wrap",
        desc: "Spiced tofu in whole wheat wrap with greens",
        price: 219 
    },
    {
        name: "Rajma Rice Bowl",
        desc: "Kidney beans curry with brown rice",
        price: 229
    },
    {
        name: "Palak Paneer Lite",
        desc: "Spinach & cottage cheese, light cream base",
        price: 279
    },
    {
        name: "Chana Salad Bowl",
        desc: "Chickpea salad with lemon herb dressing",
        price: 189  
    },
    {
        name: "Avocado Toast Platter",
        desc: "Multigrain toast with avocado & sprouts",
        price: 249 
    },
    {
        name: "Sprout Chaat",
        desc: "Mixed sprouts tossed in tangy masala",
        price: 159  
    },
    {
        name: "Vegetable Khichdi",
        desc: "Comforting lentil-rice with veggies",
        price: 199
    },
    {
        name: "Ragi Roti Combo",
        desc: "Finger millet rotis with sabzi & curd",
        price: 229
    }
];
function renderVegHealthy() {
    const container = document.getElementById("veg-healthy");
    container.innerHTML = "";

    vegHealthyItems.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("menu-item");

        div.innerHTML = `
            <div class="card-top">
                <img src="${item.img}">
            </div>

            <div class="card-bottom">
                <h3>${item.name}</h3>
                <p>${item.desc}</p>

                <div class="card-footer">
                    <span class="price">₹${item.price}</span>
                    <button onclick="addToCart('${item.name}', ${item.price})">
                        + Add
                    </button>
                </div>
            </div>
        `;

        container.appendChild(div);
    });
}

renderVegHealthy();
const vegUnhealthyItems = [
    {
        name: "Paneer Tikka Pizza",
        desc: "Marinated paneer on buttery pizza base",
        price: 349
    },
    {
        name: "Cheese Stuffed Paratha",
        desc: "Double stuffed with processed & cheddar",
        price: 189
    },
    {
        name: "Masala Fries",
        desc: "Thick-cut fries in chaat masala & sauce",
        price: 149
    },
    {
        name: "Fried Vada Pav",
        desc: "Mumbai classic with green chutney",
        price: 99
    },
    {
        name: "Butter Paneer Masala",
        desc: "Rich, creamy buttery gravy, lots of cream",
        price: 299
    },
    {
        name: "Cheese Veggie Burrito",
        desc: "Loaded with cheese, beans & sour cream",
        price: 269
    },
    {
        name: "Grilled Cheese Sandwich",
        desc: "Triple cheese, butter-grilled bread",
        price: 199
    },
    {
        name: "Peri Peri Makhana",
        desc: "Foxnuts in spicy peri-peri butter",
        price: 129
    },
    {
        name: "Chocolate Waffle",
        desc: "Crispy waffle topped with chocolate",
        price: 179
    },
    {
        name: "Aloo Tikki Burger",
        desc: "Crispy patty with sauces & veggies",
        price: 149
    }
];
function renderVegUnhealthy() {
    const container = document.getElementById("veg-unhealthy");
    container.innerHTML = "";

    vegUnhealthyItems.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("menu-item");

        div.innerHTML = `
            <div class="card-bottom">
                <h3>${item.name}</h3>
                <p>${item.desc}</p>

                <div class="card-footer">
                    <span class="price">₹${item.price}</span>
                    <button onclick="addToCart('${item.name}', ${item.price})">
                        + Add
                    </button>
                </div>
            </div>
        `;

        container.appendChild(div);
    });
}

renderVegUnhealthy();
const nonVegHealthyItems = [
    {
        name: "Grilled Chicken Bowl",
        desc: "Herb-marinated chicken with quinoa & greens",
        price: 329
    },
    {
        name: "Baked Fish Thali",
        desc: "Baked fish with steamed rice & dal",
        price: 349
    },
    {
        name: "Chicken Salad",
        desc: "Grilled chicken strips on greens with lemon dressing",
        price: 279
    },
    {
        name: "Mutton Shorba",
        desc: "Lean mutton broth with vegetables & herbs",
        price: 299
    },
    {
        name: "Fish Wrap",
        desc: "Grilled fish in whole wheat wrap",
        price: 249
    },
    {
        name: "Egg Curry Thali",
        desc: "Country egg curry with brown rice",
        price: 229
    },
    {
        name: "Chicken Rajma Bowl",
        desc: "Spiced chicken with kidney beans",
        price: 299
    },
    {
        name: "Chicken Lettuce Tacos",
        desc: "Minced chicken in lettuce cups",
        price: 269
    },
    {
        name: "Pork Congee",
        desc: "Slow-cooked pork rice porridge",
        price: 259
    },
    {
        name: "Bento Chicken Box",
        desc: "Teriyaki chicken, rice, salad",
        price: 319
    }
];
function renderNonVegHealthy() {
    const container = document.getElementById("nonveg-healthy");
    container.innerHTML = "";

    nonVegHealthyItems.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("menu-item");

        div.innerHTML = `
            <div class="card-bottom">
                <h3>${item.name}</h3>
                <p>${item.desc}</p>

                <div class="card-footer">
                    <span class="price">₹${item.price}</span>
                    <button onclick="addToCart('${item.name}', ${item.price})">
                        + Add
                    </button>
                </div>
            </div>
        `;

        container.appendChild(div);
    });
}

renderNonVegHealthy();
const nonVegUnhealthyItems = [
    {
        name: "Butter Chicken",
        desc: "The OG — rich buttery tomato cream sauce",
        price: 379
    },
    {
        name: "Double Chicken Burger",
        desc: "Two patties, extra cheese, special sauce",
        price: 329
    },
    {
        name: "Fish & Chips",
        desc: "Beer-battered fish with crispy fries",
        price: 349
    },
    {
        name: "Mutton Biryani",
        desc: "Slow-cooked dum biryani with raita",
        price: 449
    },
    {
        name: "BBQ Pork Ribs",
        desc: "Fall-off-the-bone ribs in smoky glaze",
        price: 499
    },
    {
        name: "Chicken Kathi Roll",
        desc: "Spicy egg-coated chicken in paratha",
        price: 199
    },
    {
        name: "Pepperoni-style Pizza",
        desc: "Chicken pepperoni on buttery crust",
        price: 399
    },
    {
        name: "Pork Momos (Fried)",
        desc: "Crispy fried pork dumplings",
        price: 179
    },
    {
        name: "Chicken Korma",
        desc: "Nutty, creamy slow-cooked korma",
        price: 299
    },
    {
        name: "Pulled Chicken Tacos",
        desc: "BBQ pulled chicken in corn tortillas",
        price: 269
    }
];
function renderNonVegUnhealthy() {
    const container = document.getElementById("nonveg-unhealthy");
    container.innerHTML = "";

    nonVegUnhealthyItems.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("menu-item");

        div.innerHTML = `
            <div class="card-bottom">
                <h3>${item.name}</h3>
                <p>${item.desc}</p>

                <div class="card-footer">
                    <span class="price">₹${item.price}</span>
                    <button onclick="addToCart('${item.name}', ${item.price})">
                        + Add
                    </button>
                </div>
            </div>
        `;

        container.appendChild(div);
    });
}

renderNonVegUnhealthy();
const desserts = [
    { name: "Kulfi Falooda", price: 149 },
    { name: "Gulab Jamun Cake", price: 189 },
    { name: "Shahi Tukda", price: 129 },
    { name: "Ras Malai Cupcake", price: 159 },
    { name: "Chocolate Barfi", price: 119 },

    { name: "Phirni", price: 99 },
    { name: "Mango Waffle", price: 199 },
    { name: "Butter Donut", price: 89 },
    { name: "Malai Ice Cream", price: 109 },
    { name: "Kheer Cheesecake", price: 229 },

    { name: "Paan Ice Cream", price: 119 },
    { name: "Gulab Jamun", price: 79 },
    { name: "Coconut Ladoo", price: 89 },
    { name: "Nankhatai", price: 99 },
    { name: "Moong Dal Halwa", price: 149 },

    { name: "Meethi Paratha", price: 109 },
    { name: "Carrot Halwa Tart", price: 179 },
    { name: "Caramel Pudding", price: 139 },
    { name: "Jalebi Pancakes", price: 169 },
    { name: "Besan Ladoo", price: 79 }
];
function renderDesserts() {
    const container = document.getElementById("desserts");
    container.innerHTML = "";

    desserts.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("menu-item");

        div.innerHTML = `
            <div class="card-bottom">
                <h3>${item.name}</h3>

                <div class="card-footer">
                    <span class="price">₹${item.price}</span>
                    <button onclick="addToCart('${item.name}', ${item.price})">
                        + Add
                    </button>
                </div>
            </div>
        `;

        container.appendChild(div);
    });
}

renderDesserts();


/* ================= CART SYSTEM ================= */
function addToCart(name, price) {
    cart.push({ name, price });

    total += price;

    renderCart();

    checkFreeDessert();
}

function renderCart() {
    cartItems.innerHTML = "";

    cart.forEach(item => {
        const div = document.createElement("div");
        div.innerText = `${item.name} - ₹${item.price}`;
        cartItems.appendChild(div);
    });

    totalPrice.innerText = total;
}

/* ================= FREE DESSERT ================= */
function checkFreeDessert() {
    if (total > 1000 && !freeDessertAdded) {
        cart.push({ name: "FREE Dessert", price: 0 });
        freeDessertAdded = true;

        renderCart();
    }
}

/* ================= CONFIRMATION ================= */
function showConfirmation() {
    confirmationPopup.classList.remove("hidden");

    setTimeout(() => {
        confirmationPopup.classList.add("hidden");
    }, 2500);
}

/* ================= CHECKOUT ================= */
document.getElementById("checkout-btn").addEventListener("click", () => {
    paymentPopup.classList.remove("hidden");
});

/* ================= DRAGGABLE CART ================= */
const cartBox = document.getElementById("cart");

let isDragging = false;
let offsetX, offsetY;

cartBox.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - cartBox.offsetLeft;
    offsetY = e.clientY - cartBox.offsetTop;
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        cartBox.style.left = (e.clientX - offsetX) + "px";
        cartBox.style.top = (e.clientY - offsetY) + "px";
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});
document.getElementById("close-payment").addEventListener("click", () => {
    paymentPopup.classList.add("hidden");
});