/* ==========================================================================
   Product Detail & Rendering Script - AFEEM Fragrances (Vanilla JS)
   ========================================================================== */

// 1. Product Database (To be fetched via WP REST API in Phase 7)
const PRODUCT_DATABASE = {
    "afeem-loop": {
        id: "afeem-loop",
        title: "Afeem - Loop",
        brand: "AFEEM FRAGRANCES",
        price: 499.00,
        comparePrice: 999.00,
        rating: 4.9,
        reviewCount: 38,
        stock: 3,
        soldInHour: 12,
        visitors: 18,
        images: [
            "assets/images/products/loop-1.webp",
            "assets/images/products/loop-2.webp"
        ],
        category: "100ml new",
        scentFamily: "Woody Amber Musk",
        description: "Afeem - Loop is a captivating Eau de Parfum crafted for the modern Indian who loves making a statement. This French-inspired fragrance blends sophisticated notes with an irresistible charm that keeps people intrigued. Whether you're heading to a night out or want to elevate your everyday moments, Loop delivers an enchanting aura that lingers beautifully. Experience the perfect fusion of Parisian elegance and contemporary flair—because sometimes the best conversations start with a great scent.",
        specs: {
            "Concentration": "Eau de Parfum (EDP)",
            "Scent Family": "Woody Amber, Spiced Musk",
            "Top Notes": "Bergamot, Spicy Cardamom, Grapefruit",
            "Heart Notes": "Lavender, Warm Amber, Sage",
            "Base Notes": "Rich Patchouli, Cedarwood, Vetiver, Musk",
            "Size Options": "50ml, 100ml, 150ml",
            "Origin": "French Sourced Raw Oils, Bottled in India"
        },
        headNotes: [
            { name: "Lavender", img: "assets/images/notes/lavender.jpg" },
            { name: "Saffron", img: "assets/images/notes/lavender.jpg" },
            { name: "Nutmeg", img: "assets/images/notes/lavender.jpg" }
        ],
        heartNotes: [
            { name: "Agarwood (Oud)", img: "assets/images/notes/agarwood-oud.jpg" }
        ],
        baseNotes: [
            { name: "Patchouli", img: "assets/images/notes/lavender.jpg" },
            { name: "Musk", img: "assets/images/notes/agarwood-oud.jpg" }
        ],
        reviews: [
            {
                author: "Rohit K.",
                stars: 5,
                date: "July 24, 2026",
                title: "Incredible fragrance and packaging!",
                body: "Loop smells extremely luxurious. The woody musky notes are prominent and last a solid 8-10 hours. I have received so many compliments since I started wearing this!"
            },
            {
                author: "Ananya S.",
                stars: 5,
                date: "June 18, 2026",
                title: "My favorite scent!",
                body: "This has a beautiful, elegant warm amber opening. It is not overpowering and dries down to a clean woody scent. Absolutely perfect."
            }
        ]
    },
    "afeem-ocean": {
        id: "afeem-ocean",
        title: "Afeem - Ocean",
        brand: "AFEEM FRAGRANCES",
        price: 499.00,
        comparePrice: 999.00,
        rating: 4.8,
        reviewCount: 42,
        stock: 5,
        soldInHour: 15,
        visitors: 22,
        images: [
            "assets/images/products/ocean-1.webp",
            "assets/images/products/ocean-2.webp"
        ],
        category: "100ml new",
        scentFamily: "Oceanic Citrus Woody",
        description: "Afeem - Ocean is a captivating Eau de Parfum crafted for the modern Indian who loves making a statement. This French-inspired fragrance blends sophisticated notes with an irresistible charm that keeps people intrigued. Whether you're heading to a night out or want to elevate your everyday moments, Ocean delivers an enchanting aura that lingers beautifully. Experience the perfect fusion of Parisian elegance and contemporary flair.",
        specs: {
            "Concentration": "Eau de Parfum (EDP)",
            "Scent Family": "Oceanic Marine, Fresh Citrus, Mossy Woods",
            "Top Notes": "Sea Salt, Zesty Grapefruit, Mandarin Orange",
            "Heart Notes": "Jasmine Flower, Fresh Bay Leaf",
            "Base Notes": "Guaiac Wood, Oakmoss, Warm Ambergris, Patchouli",
            "Size Options": "50ml, 100ml, 150ml",
            "Origin": "French Sourced Raw Oils, Bottled in India"
        },
        reviews: [
            {
                author: "Aman V.",
                stars: 5,
                date: "July 12, 2026",
                title: "Pure freshness!",
                body: "If you love clean, fresh aquatic scents, this is it. It has that premium French marine vibe. Highly recommended for daily office wear."
            }
        ]
    },
    "afeem-combat": {
        id: "afeem-combat",
        title: "Afeem - Combat",
        brand: "AFEEM FRAGRANCES",
        price: 499.00,
        comparePrice: 999.00,
        rating: 4.7,
        reviewCount: 29,
        stock: 4,
        soldInHour: 8,
        visitors: 14,
        images: [
            "assets/images/products/combat-1.webp",
            "assets/images/products/loop-2.webp"
        ],
        category: "100ml new",
        scentFamily: "Spicy Leather Tobacco",
        description: "Afeem - Combat is a bold and powerful scent that commands attention. Formulated with rich notes of leather, spices, and cedarwood, it provides a masculine scent profile ideal for formal occasions and evening wear.",
        specs: {
            "Concentration": "Eau de Parfum (EDP)",
            "Scent Family": "Spicy Leather, Rich Tobacco Woods",
            "Top Notes": "Black Pepper, Nutmeg, Coriander",
            "Heart Notes": "Tobacco Leaf, Leather Accord, Labdanum",
            "Base Notes": "Sandalwood, Tonka Bean, Cedarwood, Vetiver",
            "Size Options": "50ml, 100ml, 150ml",
            "Origin": "French Sourced Raw Oils, Bottled in India"
        },
        reviews: [
            {
                author: "Vikram S.",
                stars: 4,
                date: "May 20, 2026",
                title: "Strong and masculine",
                body: "This is a heavy, warm fragrance. Best suited for winters or evening parties. The tobacco and leather notes feel very premium."
            }
        ]
    },
    "afeem-buzz": {
        id: "afeem-buzz",
        title: "Afeem - Buzz",
        brand: "AFEEM FRAGRANCES",
        price: 499.00,
        comparePrice: 999.00,
        rating: 4.6,
        reviewCount: 31,
        stock: 6,
        soldInHour: 10,
        visitors: 11,
        images: [
            "assets/images/products/buzz-1.webp",
            "assets/images/products/buzz-2.webp"
        ],
        category: "100ml new",
        scentFamily: "Fresh Citrus Minty Green",
        description: "Afeem - Buzz gives an instant energizing burst. Combining sharp citrus peel with cooling mint and earthy moss, it is the perfect daily wear fragrance for warm days and active mornings.",
        specs: {
            "Concentration": "Eau de Parfum (EDP)",
            "Scent Family": "Zesty Citrus, Cool Mint, Green Woods",
            "Top Notes": "Lemon Peel, Fresh Mint, Green Apple",
            "Heart Notes": "Geranium Flower, Sage, Ambroxan",
            "Base Notes": "Earthy Vetiver, Oakmoss, Virginia Cedarwood",
            "Size Options": "50ml, 100ml, 150ml",
            "Origin": "French Sourced Raw Oils, Bottled in India"
        },
        reviews: [
            {
                author: "Divya M.",
                stars: 5,
                date: "June 30, 2026",
                title: "Super fresh!",
                body: "Awesome refreshing scent. The mint and lemon combination wakes you up immediately. Great sillage for a fresh fragrance."
            }
        ]
    },
    "afeem-aura": {
        id: "afeem-aura",
        title: "Afeem - Aura",
        brand: "AFEEM FRAGRANCES",
        price: 299.00,
        comparePrice: 499.00,
        rating: 4.9,
        reviewCount: 15,
        stock: 8,
        soldInHour: 5,
        visitors: 12,
        images: [
            "assets/images/products/aura-1.webp",
            "assets/images/products/ocean-2.webp"
        ],
        category: "2026 new",
        scentFamily: "Floral Fruity Sweet",
        description: "Afeem - Aura is a soft, enchanting fragrance designed to linger like a gentle breeze. Combining sweet raspberry with delicate jasmine and warm vanilla notes.",
        specs: {
            "Concentration": "Eau de Parfum (EDP)",
            "Scent Family": "Floral Fruity, Sweet Vanilla Musk",
            "Top Notes": "Red Raspberry, Sweet Pear, Bergamot",
            "Heart Notes": "Jasmine Petals, Orange Blossom",
            "Base Notes": "Warm Vanilla, Patchouli, Honey, White Musk",
            "Size Options": "50ml, 100ml, 150ml",
            "Origin": "French Sourced Raw Oils, Bottled in India"
        },
        reviews: [
            {
                author: "Pooja P.",
                stars: 5,
                date: "June 14, 2026",
                title: "Sweet and gorgeous!",
                body: "Very feminine and beautiful. The vanilla and honey dry down is warm, cozy, and highly addictive."
            }
        ]
    },
    "afeem-guilty": {
        id: "afeem-guilty",
        title: "Afeem - Guilty",
        brand: "AFEEM FRAGRANCES",
        price: 299.00,
        comparePrice: 499.00,
        rating: 4.8,
        reviewCount: 24,
        stock: 5,
        soldInHour: 9,
        visitors: 15,
        images: ["assets/images/products/combat-1.webp", "assets/images/products/combat-2.webp"],
        category: "2026 new",
        scentFamily: "Oriental Spicy Warm Amber",
        description: "Afeem - Guilty is a provocative, rich oriental fragrance featuring warm amber, spicy cardamoms, and velvet vanilla.",
        specs: {
            "Concentration": "Eau de Parfum (EDP)",
            "Scent Family": "Oriental Amber, Warm Spice",
            "Top Notes": "Cardamom, Pink Pepper",
            "Heart Notes": "Violet Leaf, Cinnamon, Sage",
            "Base Notes": "Chestnut, Vanilla, Amberwood",
            "Size Options": "50ml, 100ml, 150ml",
            "Origin": "French Sourced Raw Oils, Bottled in India"
        },
        reviews: [{ author: "Karan T.", stars: 5, date: "May 10, 2026", title: "Pure luxury!", body: "Smells like a high-end designer fragrance. Highly recommend!" }]
    },
    "afeem-pure": {
        id: "afeem-pure",
        title: "Afeem - Pure",
        brand: "AFEEM FRAGRANCES",
        price: 299.00,
        comparePrice: 499.00,
        rating: 4.7,
        reviewCount: 19,
        stock: 7,
        soldInHour: 6,
        visitors: 11,
        images: ["assets/images/products/ocean-1.webp", "assets/images/products/buzz-2.webp"],
        category: "2026 new",
        scentFamily: "Clean Linen White Musk",
        description: "Afeem - Pure captures the fresh crispness of clean white linen drying under morning sun. A timeless everyday signature.",
        specs: {
            "Concentration": "Eau de Parfum (EDP)",
            "Scent Family": "Fresh Cotton, White Musk",
            "Top Notes": "Aldehydes, White Lily",
            "Heart Notes": "Cotton Blossom, Iris",
            "Base Notes": "Clean Musk, Sandalwood",
            "Size Options": "50ml, 100ml, 150ml",
            "Origin": "French Sourced Raw Oils, Bottled in India"
        },
        reviews: [{ author: "Neha S.", stars: 5, date: "April 18, 2026", title: "So clean and fresh", body: "Very gentle and uplifting daily wear scent." }]
    },
    "afeem-raid": {
        id: "afeem-raid",
        title: "Afeem - Raid",
        brand: "AFEEM FRAGRANCES",
        price: 299.00,
        comparePrice: 499.00,
        rating: 4.9,
        reviewCount: 33,
        stock: 4,
        soldInHour: 14,
        visitors: 20,
        images: ["assets/images/products/loop-1.webp", "assets/images/products/ocean-1.webp"],
        category: "2026 new",
        scentFamily: "Intense Smoky Woods",
        description: "Afeem - Raid is a dark, magnetic, smoky wood fragrance crafted with rare agarwood and spiced vetiver.",
        specs: {
            "Concentration": "Eau de Parfum (EDP)",
            "Scent Family": "Smoky Wood, Dark Oud",
            "Top Notes": "Smoky Incense, Bergamot",
            "Heart Notes": "Guaiac Wood, Cedarwood",
            "Base Notes": "Agarwood Oud, Vetiver, Amber",
            "Size Options": "50ml, 100ml, 150ml",
            "Origin": "French Sourced Raw Oils, Bottled in India"
        },
        reviews: [{ author: "Siddharth R.", stars: 5, date: "June 02, 2026", title: "Intense and long lasting", body: "Lasts easily 12+ hours on clothes!" }]
    },
    "afeem-royal": {
        id: "afeem-royal",
        title: "Afeem - Royal",
        brand: "AFEEM FRAGRANCES",
        price: 299.00,
        comparePrice: 499.00,
        rating: 5.0,
        reviewCount: 52,
        stock: 3,
        soldInHour: 18,
        visitors: 30,
        images: ["assets/images/products/buzz-1.webp", "assets/images/products/loop-2.webp"],
        category: "prime 2026",
        scentFamily: "Oudh & Royal Spices",
        description: "Afeem - Royal is an authentic royal Arabic attar oil infused with pure Kashmiri saffron, Cambodian Oudh, and Damascus rose.",
        specs: {
            "Concentration": "Concentrated Perfume Oil (Attar)",
            "Scent Family": "Royal Oudh, Kashmiri Saffron",
            "Top Notes": "Kashmiri Saffron, Rose Petals",
            "Heart Notes": "Damascus Rose, Sandalwood",
            "Base Notes": "Cambodian Oudh, Amber, Musk",
            "Size Options": "12ml, 50ml",
            "Origin": "Pure Concentrated Oil, Alcohol-Free"
        },
        reviews: [{ author: "Tariq M.", stars: 5, date: "July 01, 2026", title: "Authentic Oudh", body: "Zero alcohol, pure rich oudh oil. Masterpiece!" }]
    },
    "afeem-intense-ocean": {
        id: "afeem-intense-ocean",
        title: "Afeem - Intense Ocean",
        brand: "AFEEM FRAGRANCES",
        price: 599.00,
        comparePrice: 1099.00,
        rating: 4.9,
        reviewCount: 67,
        stock: 2,
        soldInHour: 22,
        visitors: 45,
        images: ["assets/images/products/ocean-2.webp", "assets/images/products/ocean-1.webp"],
        category: "prime 2026",
        scentFamily: "Concentrated Oceanic Marine",
        description: "Afeem - Intense Ocean is an extra concentrated version of our signature Ocean scent, packed with high oil sillage for 14-hour longevity.",
        specs: {
            "Concentration": "Extrait de Parfum (30% Oil)",
            "Scent Family": "Deep Marine, Ambergris",
            "Top Notes": "Icy Bergamot, Sea Salt, Ozone",
            "Heart Notes": "Seaweed Accord, Neroli",
            "Base Notes": "Ambergris, Oakmoss, Teakwood",
            "Size Options": "100ml",
            "Origin": "French Sourced Raw Oils, Bottled in India"
        },
        reviews: [{ author: "Rahul P.", stars: 5, date: "July 20, 2026", title: "Beast mode performance!", body: "Stays strong all day long!" }]
    },
    "afeem-velvet": {
        id: "afeem-velvet",
        title: "Afeem - Velvet Scent",
        brand: "AFEEM FRAGRANCES",
        price: 399.00,
        comparePrice: 699.00,
        rating: 4.8,
        reviewCount: 28,
        stock: 6,
        soldInHour: 8,
        visitors: 16,
        images: ["assets/images/products/aura-1.webp", "assets/images/products/buzz-1.webp"],
        category: "100ml old",
        scentFamily: "Velvet Vanilla Rose",
        description: "Afeem - Velvet Scent wraps you in plush luxury with sweet French vanilla, velvety red rose petals, and warm tonka bean.",
        specs: {
            "Concentration": "Eau de Parfum (EDP)",
            "Scent Family": "Velvet Rose, Sweet Vanilla",
            "Top Notes": "Red Apple, Pink Pepper",
            "Heart Notes": "Velvet Rose, Jasmine",
            "Base Notes": "French Vanilla, Tonka Bean, Musk",
            "Size Options": "50ml, 100ml",
            "Origin": "French Sourced Raw Oils, Bottled in India"
        },
        reviews: [{ author: "Megha C.", stars: 5, date: "May 29, 2026", title: "So luxurious", body: "Very smooth and creamy vanilla rose!" }]
    },
    "afeem-midnight": {
        id: "afeem-midnight",
        title: "Afeem - Midnight Secret",
        brand: "AFEEM FRAGRANCES",
        price: 499.00,
        comparePrice: 899.00,
        rating: 4.9,
        reviewCount: 45,
        stock: 4,
        soldInHour: 16,
        visitors: 28,
        images: ["assets/images/products/loop-2.webp", "assets/images/products/combat-1.webp"],
        category: "100ml old",
        scentFamily: "Midnight Amber & Bergamot",
        description: "Afeem - Midnight Secret is an intriguing night-time fragrance combining sparkling Italian bergamot with dark resinous amber.",
        specs: {
            "Concentration": "Eau de Parfum (EDP)",
            "Scent Family": "Dark Amber, Citrus Bergamot",
            "Top Notes": "Italian Bergamot, Lime",
            "Heart Notes": "Nutmeg, Leather, Cardamom",
            "Base Notes": "Resinous Amber, Patchouli, Benzoin",
            "Size Options": "50ml, 100ml, 150ml",
            "Origin": "French Sourced Raw Oils, Bottled in India"
        },
        reviews: [{ author: "Harsh V.", stars: 5, date: "June 25, 2026", title: "Perfect evening scent!", body: "Gets compliments every time I wear it to dinner." }]
    }
};

// 2. Global DOM Utility Functions
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// 3. Single Product Initializer
document.addEventListener("DOMContentLoaded", () => {
    // Only execute on product details page
    if (!document.getElementById("product-details-container")) return;

    let productId = getQueryParam("id");
    // Fallback default: show Loop if no param or invalid param is passed
    if (!productId || !PRODUCT_DATABASE[productId]) {
        productId = "afeem-loop";
    }

    const product = PRODUCT_DATABASE[productId];
    renderProductPage(product);
    initProductInteractions(product);
});

// 4. Render Product Details dynamically
function renderProductPage(product) {
    // A. Breadcrumbs
    const crumbName = document.getElementById("breadcrumb-product-name");
    if (crumbName) crumbName.textContent = product.title;

    // B. Prev/Next Navigation
    const productKeys = Object.keys(PRODUCT_DATABASE);
    const currentIndex = productKeys.indexOf(product.id);
    const prevKey = productKeys[(currentIndex - 1 + productKeys.length) % productKeys.length];
    const nextKey = productKeys[(currentIndex + 1) % productKeys.length];

    const prevLink = document.getElementById("prev-product-link");
    const nextLink = document.getElementById("next-product-link");
    if (prevLink) prevLink.setAttribute("href", `product.html?id=${prevKey}`);
    if (nextLink) nextLink.setAttribute("href", `product.html?id=${nextKey}`);

    // C. Gallery Stacked Images & Video rendering with Left Thumbnail Navigation Strip
    const galleryContainer = document.getElementById("product-gallery-list");
    if (galleryContainer) {
        const productVideos = product.videos && product.videos.length > 0 ? product.videos : ["assets/videos/product/Rosila Video.mp4"];
        const productImages = product.images || [];

        // Build Left Thumbnail Cards HTML
        const imageThumbsHtml = productImages.map((imgUrl, idx) => `
            <button type="button" class="thumb-card ${idx === 0 ? 'active' : ''}" onclick="scrollToGalleryMedia('gallery-img-${idx}', this)" title="View Photo ${idx + 1}">
                <img src="${imgUrl}" alt="Photo ${idx + 1}">
            </button>
        `).join('');

        const videoThumbsHtml = productVideos.map((videoUrl, vIdx) => `
            <button type="button" class="thumb-card thumb-video-card" onclick="scrollToGalleryMedia('gallery-video-${vIdx}', this)" title="Direct View Video">
                <div class="thumb-video-poster">
                    <img src="${productImages[0] || 'assets/images/products/loop-1.webp'}" alt="Video Thumbnail">
                    <span class="thumb-play-badge">▶ VIDEO</span>
                </div>
            </button>
        `).join('');

        // Build Main Media Stack HTML (Images first, Video at end)
        const imageMediaHtml = productImages.map((imgUrl, idx) => `
            <div class="gallery-stacked-image" id="gallery-img-${idx}">
                <img src="${imgUrl}" alt="${product.title} View ${idx + 1}">
            </div>
        `).join('');

        const videoMediaHtml = productVideos.map((videoUrl, vIdx) => `
            <div class="gallery-stacked-video" id="gallery-video-${vIdx}">
                <video src="${videoUrl}" controls autoplay muted loop playsinline class="product-feature-video" poster="${productImages[0]}">
                    Your browser does not support HTML5 video.
                </video>
            </div>
        `).join('');

        galleryContainer.innerHTML = `
            <div class="product-gallery-wrapper">
                <aside class="product-thumbnails-nav-strip">
                    ${imageThumbsHtml}
                    ${videoThumbsHtml}
                </aside>
                <div class="product-main-media-stack">
                    ${imageMediaHtml}
                    ${videoMediaHtml}
                </div>
            </div>
        `;
    }

    // D. Selected Size Badge on Left Column replacing price
    const leftSizeBadge = document.getElementById("left-selected-size-badge");
    if (leftSizeBadge) {
        leftSizeBadge.innerHTML = `Selected Size: <strong>100ml EDP</strong>`;
    }

    // E. Fragrance Notes Component Rendering (Image 4 Style: HEAD NOTES, HEART NOTES, BASE NOTES)
    const notesContainer = document.getElementById("notes-grid-container");
    if (notesContainer) {
        const headNotes = product.headNotes || [
            { name: "Lavender", img: "assets/images/notes/lavender.jpg" },
            { name: "Saffron", img: "assets/images/notes/lavender.jpg" },
            { name: "Nutmeg", img: "assets/images/notes/lavender.jpg" }
        ];

        const heartNotes = product.heartNotes || [
            { name: "Agarwood (Oud)", img: "assets/images/notes/agarwood-oud.jpg" }
        ];

        const baseNotes = product.baseNotes || [
            { name: "Patchouli", img: "assets/images/notes/lavender.jpg" },
            { name: "Musk", img: "assets/images/notes/agarwood-oud.jpg" }
        ];

        const renderNoteGroup = (title, items) => `
            <div class="note-column-image4">
                <div class="note-column-title-bar">
                    <h4 class="note-column-title">${title}</h4>
                </div>
                <div class="note-ingredients-row">
                    ${items.map(item => `
                        <div class="ingredient-item-box">
                            <div class="ingredient-img-wrapper">
                                <img src="${item.img}" alt="${item.name}">
                            </div>
                            <span class="ingredient-label-name">${item.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        notesContainer.innerHTML = `
            <div class="fragrance-notes-section-image4">
                <div class="fragrance-notes-image4-grid">
                    ${renderNoteGroup("HEAD NOTES", headNotes)}
                    ${renderNoteGroup("HEART NOTES", heartNotes)}
                    ${renderNoteGroup("BASE NOTES", baseNotes)}
                </div>
            </div>
        `;
    }

    // F. BEST FOR Occasion Tags Rendering (Compact 2-Column Cards with Tick Badge)
    const occasionsContainer = document.getElementById("occasions-pills-wrap");
    if (occasionsContainer) {
        const allOccasions = [
            { name: "Daily Wear", icon: "☀️" },
            { name: "Party & Night Out", icon: "✨" },
            { name: "Office & Formal", icon: "💼" },
            { name: "Date Night", icon: "🌙" },
            { name: "Gym & Active", icon: "⚡" }
        ];

        const activeOccasions = product.bestFor || ["Party & Night Out", "Date Night", "Daily Wear"];

        occasionsContainer.innerHTML = allOccasions.map(occ => {
            const isBest = activeOccasions.includes(occ.name);
            return `
                <div class="occasion-card ${isBest ? 'is-recommended' : ''}">
                    ${isBest ? '<span class="recommend-check-badge">✓</span>' : ''}
                    <span class="occ-icon">${occ.icon}</span>
                    <span class="occ-name">${occ.name}</span>
                </div>
            `;
        }).join('');
    }

    // G. Titles, Brands and Prices
    const headingTitle = document.getElementById("product-title-heading");
    if (headingTitle) headingTitle.textContent = product.title;

    const currentPriceDisplay = document.getElementById("product-price-display");
    const comparePriceDisplay = document.getElementById("product-compare-display");
    if (currentPriceDisplay) currentPriceDisplay.textContent = `Rs. ${product.price.toFixed(2)}`;
    if (comparePriceDisplay) {
        if (product.comparePrice) {
            comparePriceDisplay.textContent = `Rs. ${product.comparePrice.toFixed(2)}`;
            comparePriceDisplay.classList.remove("hidden");
        } else {
            comparePriceDisplay.classList.add("hidden");
        }
    }

    // H. Urgency features
    const visitorsEl = document.getElementById("realtime-visitors");
    if (visitorsEl) visitorsEl.textContent = product.visitors;

    const stockEl = document.getElementById("stock-level");
    if (stockEl) stockEl.textContent = product.stock;

    const progressFill = document.getElementById("stock-progress-fill");
    if (progressFill) {
        const percentage = Math.min(100, Math.max(10, (product.stock / 20) * 100));
        progressFill.style.width = `${percentage}%`;
    }

    const soldEl = document.getElementById("sold-count");
    if (soldEl) soldEl.textContent = product.soldInHour;

    const categoryEl = document.getElementById("product-category-list");
    if (categoryEl) categoryEl.textContent = `${product.category}, Home page`;

    // Dynamic COLLECTION RANGE Swatch Grid & Active Current Product Highlighting
    const rightScentsGrid = document.getElementById("right-scents-grid");
    const variantLabel = document.querySelector(".scents-variant-selector .variant-label");
    const currentRange = product.category || "100ml new";

    if (variantLabel) {
        variantLabel.innerHTML = `COLLECTION RANGE: <strong style="color: #2f889a; font-weight: 800;">${currentRange}</strong>`;
    }

    if (rightScentsGrid) {
        // Filter all products belonging to the SAME RANGE as the current product
        let sameRangeProducts = Object.values(PRODUCT_DATABASE).filter(p => p.category === product.category);

        // If fewer than 4 products in this range, include other top perfumes
        if (sameRangeProducts.length < 4) {
            const others = Object.values(PRODUCT_DATABASE).filter(p => p.category !== product.category);
            sameRangeProducts = sameRangeProducts.concat(others);
        }

        // Ensure current active product is included
        if (!sameRangeProducts.some(p => p.id === product.id)) {
            sameRangeProducts.unshift(product);
        }

        // Limit to 4 swatches
        sameRangeProducts = sameRangeProducts.slice(0, 4);

        rightScentsGrid.innerHTML = sameRangeProducts.map(item => {
            const isCurrent = (item.id === product.id);
            const activeStyle = isCurrent 
                ? 'border: 2px solid #2f889a; background: #f0fdfa; box-shadow: 0 4px 12px rgba(47, 136, 154, 0.3); transform: translateY(-2px); position: relative;' 
                : 'border: 1px solid #e2e8f0; background: #ffffff; cursor: pointer; transition: all 0.2s ease;';

            return `
                <a href="product.html?id=${item.id}" class="scent-swatch-card ${isCurrent ? 'active-same-range' : ''}" style="text-decoration: none; display: flex; flex-direction: column; align-items: center; padding: 8px; border-radius: 10px; ${activeStyle}" title="${item.title}">
                    ${isCurrent ? '<span style="position: absolute; top: -6px; right: -6px; background: #2f889a; color: #ffffff; border-radius: 50%; width: 18px; height: 18px; font-size: 11px; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid #ffffff;">✓</span>' : ''}
                    <img src="${item.images[0]}" alt="${item.title}" style="width: 48px; height: 48px; object-fit: cover; border-radius: 6px; margin-bottom: 4px;">
                    <span style="font-size: 11px; font-weight: ${isCurrent ? '800' : '600'}; color: ${isCurrent ? '#2f889a' : '#444444'}; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 65px;">${item.title.replace('Afeem - ', '')}</span>
                </a>
            `;
        }).join('');
    }

    // Dynamic Right Column Rating summary
    const rightRatingSummary = document.getElementById("right-rating-summary");
    if (rightRatingSummary) {
        const starsHTML = '★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating));
        rightRatingSummary.innerHTML = `
            <div class="right-column-rating">
                <span class="rating-stars-gold">${starsHTML}</span>
                <span class="rating-value-count">${product.rating.toFixed(1)} (${product.reviewCount} customer reviews)</span>
            </div>
        `;
    }

    // Dynamic Sticky Bottom Bar setup
    const stickyTitle = document.getElementById("sticky-title-display");
    const stickyPrice = document.getElementById("sticky-price-display");
    if (stickyTitle) stickyTitle.textContent = product.title;
    if (stickyPrice) stickyPrice.textContent = `Rs. ${product.price.toFixed(2)}`;

    // F. Tabs panels
    // 1. Description tab
    const descText = document.getElementById("product-desc-text");
    if (descText) descText.textContent = product.description;

    // 2. Additional Info table
    const specsTable = document.querySelector(".specs-table tbody");
    if (specsTable) {
        specsTable.innerHTML = Object.entries(product.specs).map(([key, val]) => `
            <tr>
                <th>${key}</th>
                <td>${val}</td>
            </tr>
        `).join('');
    }

    // 3. Reviews Render
    renderReviews(product);

    // G. Related Products Grid
    renderRelatedProducts(product);
}

// 5. Render Reviews dynamically with 2-Column Split Layout, 5-Item Limit, All Reviews Modal & Compact Media
function renderReviews(product) {
    const reviewsSection = document.getElementById("reviews");
    if (!reviewsSection) return;

    const average = product.rating;
    const count = product.reviews.length;

    const getStarsHTML = (stars) => {
        let starsStr = '';
        for (let i = 1; i <= 5; i++) {
            starsStr += i <= stars ? '★' : '☆';
        }
        return starsStr;
    };

    const ratingFeedbackMap = {
        1: "1 / 5 - Poor",
        2: "2 / 5 - Fair",
        3: "3 / 5 - Good",
        4: "4 / 5 - Very Good",
        5: "5 / 5 - Excellent"
    };

    const renderSingleReviewCard = (rev) => {
        const initial = rev.author ? rev.author.charAt(0).toUpperCase() : 'U';
        const hasPhotos = rev.photos && rev.photos.length > 0;
        const hasVideo = !!rev.video;

        const mediaStripHTML = (hasPhotos || hasVideo) ? `
            <div class="review-customer-media-strip inline-strip">
                <span class="media-strip-label-inline">CUSTOMER MEDIA GALLERY:</span>
                <div class="media-thumbs-grid-inline">
                    ${hasPhotos ? rev.photos.map(p => `
                        <div class="customer-media-thumb compact-thumb photo-thumb" onclick="openReviewMediaLightbox('${p}', 'image')" title="Click to view full photo">
                            <img src="${p}" alt="Customer photo">
                            <span class="thumb-hover-icon">🔍</span>
                        </div>
                    `).join('') : ''}
                    ${hasVideo ? `
                        <div class="customer-media-thumb compact-thumb video-thumb" onclick="openReviewMediaLightbox('${rev.video}', 'video')" title="Click to play customer video">
                            <div class="video-thumb-content">
                                <span class="video-play-icon">▶</span>
                                <span class="video-thumb-tag">VIDEO</span>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        ` : '';

        const fullBody = rev.body || '';
        const isLongText = fullBody.length > 180;

        const bodyHTML = isLongText ? `
            <div class="review-body-wrap">
                <p class="review-body-text clamp-2-lines">${fullBody}</p>
                <button type="button" class="read-more-toggle-btn" onclick="toggleReviewText(this)">Read More</button>
            </div>
        ` : `
            <p class="review-body-text">${fullBody}</p>
        `;

        return `
            <div class="review-card-item">
                <div class="review-card-header">
                    <div class="reviewer-profile-info">
                        <div class="reviewer-avatar">${initial}</div>
                        <div class="reviewer-meta">
                            <div class="reviewer-name-row">
                                <strong class="reviewer-name">${rev.author}</strong>
                                <span class="verified-badge">✓ Verified Buyer</span>
                            </div>
                            <span class="review-date">${rev.date || 'Verified Reviewer'}</span>
                        </div>
                    </div>
                    <!-- Bold Rating Number + Larger Bold Gold Stars -->
                    <div class="review-stars-display-box">
                        <span class="review-numeric-score">${(rev.stars || 5).toFixed(1)}</span>
                        <span class="review-bold-gold-stars">${getStarsHTML(rev.stars)}</span>
                    </div>
                </div>

                <h4 class="review-title">${rev.title}</h4>
                ${bodyHTML}
                ${mediaStripHTML}
            </div>
        `;
    };

    // Limit main display to Latest 5 Reviews
    const latest5Reviews = product.reviews.slice(0, 5);
    const listHTML = latest5Reviews.map(renderSingleReviewCard).join('');
    const allReviewsHTML = product.reviews.map(renderSingleReviewCard).join('');

    reviewsSection.innerHTML = `
        <div class="reviews-split-wrapper">
            <!-- Left Column: Rating Summary & In-Place Form Toggle -->
            <aside class="reviews-left-col">
                <div class="rating-summary-card" id="rating-summary-card">
                    <h3 class="summary-heading">OVERALL RATING</h3>
                    
                    <div class="summary-score-box">
                        <span class="big-rating-number">${average.toFixed(1)}</span>
                        <div class="summary-stars-column">
                            <div class="gold-stars">${getStarsHTML(Math.round(average))}</div>
                            <span class="total-reviews-count">Based on ${count} verified reviews</span>
                        </div>
                    </div>

                    <div class="rating-bars-breakdown">
                        <div class="r-bar-row"><span>5 ★</span><div class="r-bar-track"><div class="r-bar-fill" style="width: 85%;"></div></div><span>85%</span></div>
                        <div class="r-bar-row"><span>4 ★</span><div class="r-bar-track"><div class="r-bar-fill" style="width: 12%;"></div></div><span>12%</span></div>
                        <div class="r-bar-row"><span>3 ★</span><div class="r-bar-track"><div class="r-bar-fill" style="width: 3%;"></div></div><span>3%</span></div>
                    </div>

                    <button type="button" class="btn write-review-cta-btn" id="write-review-btn">✍️ WRITE A REVIEW</button>
                </div>

                <!-- In-Place Review Form -->
                <div class="review-form-card hidden" id="new-review-form-wrapper">
                    <div class="form-card-header">
                        <h4>WRITE YOUR REVIEW</h4>
                        <button type="button" class="close-form-btn" id="cancel-review-btn">&times;</button>
                    </div>
                    
                    <form id="submit-review-form" class="compact-review-form">
                        <!-- Editable 5-Star Rating Picker -->
                        <div class="form-group star-picker-group">
                            <label class="input-label">YOUR RATING *</label>
                            <div class="interactive-star-picker-box">
                                <div class="interactive-star-picker" id="interactive-star-picker">
                                    <span class="star-pick active" data-value="1">★</span>
                                    <span class="star-pick active" data-value="2">★</span>
                                    <span class="star-pick active" data-value="3">★</span>
                                    <span class="star-pick active" data-value="4">★</span>
                                    <span class="star-pick active" data-value="5">★</span>
                                </div>
                                <span id="star-rating-feedback" class="rating-feedback-text">(5 / 5 - Excellent)</span>
                            </div>
                            <input type="hidden" id="review-stars-input" value="5" required>
                        </div>

                        <!-- Name & Email 2-Column Row with maxlength limits -->
                        <div class="form-row-2col">
                            <div class="form-group">
                                <input type="text" id="review-author" placeholder="Your Name *" maxlength="35" required class="compact-input">
                            </div>
                            <div class="form-group">
                                <input type="email" id="review-email" placeholder="Your Email *" maxlength="50" required class="compact-input">
                            </div>
                        </div>

                        <div class="form-group">
                            <input type="text" id="review-title" placeholder="Review Headline *" maxlength="80" required class="compact-input">
                        </div>
                        <div class="form-group">
                            <textarea id="review-body" rows="3" placeholder="Share your scent experience (max 500 chars)..." maxlength="500" required class="compact-input"></textarea>
                        </div>

                        <!-- Single Unified Media Upload Button -->
                        <div class="form-group unified-media-group">
                            <label class="single-media-upload-btn">
                                <span class="upload-btn-icon">📷 / 🎥</span>
                                <span class="upload-btn-text">Add Photo or Video (Optional)</span>
                                <input type="file" id="review-unified-media-input" accept="image/*,video/*" multiple style="display:none;">
                            </label>
                            <div id="review-media-preview-container" class="media-preview-row"></div>
                        </div>

                        <div class="form-actions-row">
                            <button type="submit" class="btn submit-review-btn">SUBMIT REVIEW</button>
                        </div>
                    </form>
                </div>
            </aside>

            <!-- Right Column: Customer Reviews List (Max 5 Displayed) -->
            <main class="reviews-right-col">
                <div class="reviews-list-container">
                    ${listHTML || '<p class="no-reviews-msg">No reviews yet. Be the first to write a review!</p>'}
                </div>

                ${count > 5 ? `
                    <div class="view-all-reviews-wrap">
                        <button type="button" class="btn view-all-reviews-btn" onclick="openAllReviewsModal()">VIEW ALL ${count} REVIEWS ➔</button>
                    </div>
                ` : ''}
            </main>
        </div>

        <!-- Pop Tab Modal for All Customer Reviews -->
        <div class="all-reviews-modal-overlay hidden" id="all-reviews-modal" aria-hidden="true">
            <div class="all-reviews-modal-dialog">
                <div class="all-reviews-modal-header">
                    <h3 class="modal-title">ALL CUSTOMER REVIEWS (${count})</h3>
                    <button type="button" class="close-all-modal-btn" onclick="closeAllReviewsModal()">&times;</button>
                </div>
                <div class="all-reviews-modal-body">
                    ${allReviewsHTML}
                </div>
            </div>
        </div>

        <!-- Fullscreen Media Lightbox Modal -->
        <div class="review-lightbox-modal hidden" id="review-media-lightbox" aria-hidden="true">
            <div class="lightbox-backdrop" onclick="closeReviewMediaLightbox()"></div>
            <div class="lightbox-dialog">
                <button type="button" class="lightbox-close-btn" onclick="closeReviewMediaLightbox()">&times;</button>
                <div class="lightbox-content-body" id="lightbox-content-body"></div>
            </div>
        </div>
    `;

    // Interactive Star Picker Logic
    const starPicks = document.querySelectorAll("#interactive-star-picker .star-pick");
    const starsInput = document.getElementById("review-stars-input");
    const starFeedback = document.getElementById("star-rating-feedback");

    if (starPicks.length > 0 && starsInput) {
        starPicks.forEach(star => {
            star.addEventListener("mouseover", () => {
                const val = parseInt(star.getAttribute("data-value"));
                if (starFeedback && ratingFeedbackMap[val]) starFeedback.textContent = `(${ratingFeedbackMap[val]})`;
                starPicks.forEach(s => {
                    const sVal = parseInt(s.getAttribute("data-value"));
                    s.style.color = sVal <= val ? "#f59e0b" : "#cbd5e1";
                    s.style.textShadow = sVal <= val ? "0 0 12px rgba(245, 158, 11, 0.6)" : "none";
                });
            });

            star.addEventListener("mouseleave", () => {
                const currentVal = parseInt(starsInput.value) || 5;
                if (starFeedback && ratingFeedbackMap[currentVal]) starFeedback.textContent = `(${ratingFeedbackMap[currentVal]})`;
                starPicks.forEach(s => {
                    const sVal = parseInt(s.getAttribute("data-value"));
                    s.style.color = sVal <= currentVal ? "#f59e0b" : "#cbd5e1";
                    s.style.textShadow = sVal <= currentVal ? "0 0 10px rgba(245, 158, 11, 0.5)" : "none";
                });
            });

            star.addEventListener("click", () => {
                const val = parseInt(star.getAttribute("data-value"));
                starsInput.value = val;
                if (starFeedback && ratingFeedbackMap[val]) starFeedback.textContent = `(${ratingFeedbackMap[val]})`;
                starPicks.forEach(s => {
                    const sVal = parseInt(s.getAttribute("data-value"));
                    s.style.color = sVal <= val ? "#f59e0b" : "#cbd5e1";
                    s.style.textShadow = sVal <= val ? "0 0 12px rgba(245, 158, 11, 0.6)" : "none";
                });
            });
        });
    }

    // Unified Photo & Video File Upload Preview Handler
    let uploadedPhotos = [];
    let uploadedVideo = null;

    const unifiedInput = document.getElementById("review-unified-media-input");
    const mediaPreview = document.getElementById("review-media-preview-container");

    if (unifiedInput) {
        unifiedInput.addEventListener("change", (e) => {
            const files = Array.from(e.target.files);
            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = (evt) => {
                    if (file.type.startsWith("image/")) {
                        uploadedPhotos.push(evt.target.result);
                        if (mediaPreview) {
                            const img = document.createElement("img");
                            img.src = evt.target.result;
                            img.className = "preview-thumb-img";
                            img.style.cssText = "width: 50px; height: 50px; object-fit: cover; border-radius: 6px; border: 2px solid #2eaaa0;";
                            mediaPreview.appendChild(img);
                        }
                    } else if (file.type.startsWith("video/")) {
                        uploadedVideo = evt.target.result;
                        if (mediaPreview) {
                            const vid = document.createElement("video");
                            vid.src = evt.target.result;
                            vid.className = "preview-thumb-video";
                            vid.style.cssText = "width: 70px; height: 50px; object-fit: cover; border-radius: 6px; border: 2px solid #e74c3c;";
                            mediaPreview.appendChild(vid);
                        }
                    }
                };
                reader.readAsDataURL(file);
            });
        });
    }

    // Left Column Form Toggle Handlers
    const writeReviewBtn = document.getElementById("write-review-btn");
    const cancelReviewBtn = document.getElementById("cancel-review-btn");
    const summaryCard = document.getElementById("rating-summary-card");
    const formWrapper = document.getElementById("new-review-form-wrapper");

    if (writeReviewBtn && summaryCard && formWrapper) {
        writeReviewBtn.addEventListener("click", () => {
            summaryCard.classList.add("hidden");
            formWrapper.classList.remove("hidden");
        });
    }

    if (cancelReviewBtn && summaryCard && formWrapper) {
        cancelReviewBtn.addEventListener("click", () => {
            formWrapper.classList.add("hidden");
            summaryCard.classList.remove("hidden");
        });
    }

    // Submit Review Form Handler
    const submitReviewForm = document.getElementById("submit-review-form");
    if (submitReviewForm) {
        submitReviewForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("review-author").value;
            const email = document.getElementById("review-email").value;
            const ratingVal = parseInt(document.getElementById("review-stars-input").value) || 5;
            const titleVal = document.getElementById("review-title").value;
            const bodyVal = document.getElementById("review-body").value;

            product.reviews.unshift({
                author: name,
                email: email,
                stars: ratingVal,
                date: "Just Now",
                title: titleVal,
                body: bodyVal,
                photos: uploadedPhotos,
                video: uploadedVideo
            });

            const sum = product.reviews.reduce((acc, rev) => acc + rev.stars, 0);
            product.rating = sum / product.reviews.length;
            product.reviewCount = product.reviews.length;

            renderReviews(product);

            if (window.showWishlistToast) {
                window.showWishlistToast("✓ Thank you! Your review has been published.");
            }
        });
    }
}

// Global All Reviews Pop Modal Handlers
window.openAllReviewsModal = function() {
    const modal = document.getElementById("all-reviews-modal");
    if (modal) {
        modal.classList.remove("hidden");
        modal.setAttribute("aria-hidden", "false");
    }
};

window.closeAllReviewsModal = function() {
    const modal = document.getElementById("all-reviews-modal");
    if (modal) {
        modal.classList.add("hidden");
        modal.setAttribute("aria-hidden", "true");
    }
};

window.toggleReviewText = function(btn) {
    const wrap = btn.closest('.review-body-wrap');
    const bodyText = wrap ? wrap.querySelector('.review-body-text') : null;
    if (bodyText) {
        bodyText.classList.toggle('clamp-2-lines');
        bodyText.classList.toggle('expanded');
        btn.textContent = bodyText.classList.contains('expanded') ? 'Read Less' : 'Read More';
    }
};

// Global Media Lightbox Handlers
window.openReviewMediaLightbox = function(src, type) {
    const lightbox = document.getElementById("review-media-lightbox");
    const container = document.getElementById("lightbox-content-body");
    if (!lightbox || !container) return;

    if (type === 'image') {
        container.innerHTML = `<img src="${src}" alt="Customer Review Photo" style="max-width: 90vw; max-height: 80vh; object-fit: contain; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.5);">`;
    } else if (type === 'video') {
        container.innerHTML = `<video src="${src}" controls autoplay style="max-width: 90vw; max-height: 80vh; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.5);"></video>`;
    }

    lightbox.classList.remove("hidden");
    lightbox.setAttribute("aria-hidden", "false");
};

window.closeReviewMediaLightbox = function() {
    const lightbox = document.getElementById("review-media-lightbox");
    const container = document.getElementById("lightbox-content-body");
    if (lightbox) {
        lightbox.classList.add("hidden");
        lightbox.setAttribute("aria-hidden", "true");
    }
    if (container) container.innerHTML = '';
};

window.openSocialVideoModal = function(videoId) {
    const modal = document.getElementById("social-video-modal");
    const container = document.getElementById("social-video-iframe-container");
    if (!modal || !container) return;

    const isShort = (videoId === 'n8IexNP6e5E' || videoId === 'FZXiWHJtzQo');
    container.className = isShort ? "social-video-iframe-wrap portrait-wrap" : "social-video-iframe-wrap";
    
    container.innerHTML = `
        <iframe src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1" 
                title="Afeem Luxury Fragrance Video" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen></iframe>
    `;

    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
};

window.closeSocialVideoModal = function() {
    const modal = document.getElementById("social-video-modal");
    const container = document.getElementById("social-video-iframe-container");
    if (modal) {
        modal.classList.add("hidden");
        modal.setAttribute("aria-hidden", "true");
    }
    if (container) {
        container.innerHTML = "";
    }
};

// 6. Render Related Products dynamically
function renderRelatedProducts(product) {
    const relatedGrid = document.getElementById("related-products-grid");
    if (!relatedGrid) return;

    // Filter DB for related items, excluding current, slicing exactly 3 products
    const relatedList = Object.values(PRODUCT_DATABASE)
        .filter(item => item.id !== product.id)
        .slice(0, 3);

    relatedGrid.innerHTML = relatedList.map(item => `
        <article class="afeem-product-card product-card" data-product-id="${item.id}">
            <div class="afeem-card-img-link">
                <span class="card-badge sale-badge">-50% OFF</span>
                <span class="card-badge stock-badge">In Stock</span>
                <a href="product.html?id=${item.id}">
                    <img src="${item.images[0]}" alt="${item.title}" class="afeem-card-img main-image">
                    <img src="${item.images[1] || item.images[0]}" alt="${item.title}" class="afeem-card-img hover-image">
                </a>
                <div class="afeem-card-actions">
                    <button class="action-btn add-to-wishlist" data-product-id="${item.id}" aria-label="Add to Wishlist" title="Wishlist">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </button>
                    <button class="action-btn quick-view" data-product-id="${item.id}" aria-label="Quick View" title="Quick View">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    </button>
                </div>
                <button class="card-slide-cart-btn quick-add-btn" data-product-id="${item.id}" onclick="CartManager.addItem({id:'${item.id}', title:'${item.title}', size:'100ml', price:${item.price}, image:'${item.images[0]}', qty:1})">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                    Add to Bag
                </button>
            </div>
            <div class="afeem-card-info">
                <div class="card-rating">
                    <span class="stars">★★★★★</span>
                    <span class="rating-count">(${item.reviewCount || 25})</span>
                </div>
                <h3 class="afeem-card-name"><a href="product.html?id=${item.id}">${item.title}</a></h3>
                <div class="afeem-card-price">
                    <span class="price-current">Rs. ${item.price.toFixed(2)}</span>
                    <span class="price-strike">Rs. ${item.comparePrice ? item.comparePrice.toFixed(2) : '999.00'}</span>
                </div>
            </div>
        </article>
    `).join('');

    if (window.WishlistManager) {
        window.WishlistManager.updateDOM();
    }
}

// 7. Interactive Features & Listeners
function initProductInteractions(product) {
    // A. Scent Variant Switcher clicks
    document.querySelectorAll('.scent-swatch-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const scentId = card.getAttribute('data-scent-id');
            if (scentId && scentId !== product.id) {
                history.pushState(null, '', `product.html?id=${scentId}`);
                const newProduct = PRODUCT_DATABASE[scentId];
                renderProductPage(newProduct);
                initProductInteractions(newProduct);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    // B. Quantity pickers (linked to sticky quant picker)
    const qtyMinus = document.getElementById("qty-minus");
    const qtyPlus = document.getElementById("qty-plus");
    const qtyInput = document.getElementById("purchase-qty");

    const stickyQtyMinus = document.getElementById("sticky-qty-minus");
    const stickyQtyPlus = document.getElementById("sticky-qty-plus");
    const stickyQtyInput = document.getElementById("sticky-qty-input");

    const syncQuantity = (val) => {
        if (qtyInput) qtyInput.value = val;
        if (stickyQtyInput) stickyQtyInput.value = val;
    };

    if (qtyMinus && qtyPlus) {
        qtyMinus.addEventListener("click", () => {
            let val = parseInt(qtyInput.value) || 1;
            if (val > 1) syncQuantity(val - 1);
        });
        qtyPlus.addEventListener("click", () => {
            let val = parseInt(qtyInput.value) || 1;
            if (val < 10) syncQuantity(val + 1);
        });
    }

    if (stickyQtyMinus && stickyQtyPlus) {
        stickyQtyMinus.addEventListener("click", () => {
            let val = parseInt(stickyQtyInput.value) || 1;
            if (val > 1) syncQuantity(val - 1);
        });
        stickyQtyPlus.addEventListener("click", () => {
            let val = parseInt(stickyQtyInput.value) || 1;
            if (val < 10) syncQuantity(val + 1);
        });
    }

    // C. Option Size updates pricing
    const sizeSelectors = document.querySelectorAll('input[name="option-size"]');
    const stickySizeSelect = document.getElementById("sticky-size-select-input");
    const selectedSizeLabel = document.getElementById("selected-size-label");
    const currentPriceEl = document.getElementById("product-price-display");
    const stickyPriceEl = document.getElementById("sticky-price-display");

    const updateSizeAndPrice = (size) => {
        if (selectedSizeLabel) selectedSizeLabel.textContent = size;
        
        // Update Left Column size badge
        const leftSizeBadge = document.getElementById("left-selected-size-badge");
        if (leftSizeBadge) {
            leftSizeBadge.innerHTML = `Selected Size: <strong>${size.toUpperCase()} EDP</strong>`;
        }

        // Sync radio swatches
        const radio = document.querySelector(`input[name="option-size"][value="${size}"]`);
        if (radio) radio.checked = true;

        // Sync sticky select dropdown
        if (stickySizeSelect) stickySizeSelect.value = size;

        // Dynamic Product Image Variant Switching on Size Change
        const mainImgEl = document.querySelector("#gallery-img-0 img");
        const thumbImgEl = document.querySelector(".product-thumbnails-nav-strip .thumb-card:first-child img");

        if (mainImgEl) {
            let variantImg = product.images[0];
            if (size === "50ml") {
                variantImg = product.images[1] || "assets/images/products/aura-1.webp";
            } else if (size === "150ml") {
                variantImg = product.images[0];
            }
            mainImgEl.src = variantImg;
            if (thumbImgEl) thumbImgEl.src = variantImg;
        }

        // Adjust pricing dynamically
        let priceMultiplier = 1.0;
        if (size === "50ml") priceMultiplier = 0.6;
        else if (size === "150ml") priceMultiplier = 1.4;

        const newPrice = product.price * priceMultiplier;
        if (currentPriceEl) currentPriceEl.textContent = `Rs. ${newPrice.toFixed(2)}`;
        if (stickyPriceEl) stickyPriceEl.textContent = `Rs. ${newPrice.toFixed(2)}`;
    };

    if (sizeSelectors) {
        sizeSelectors.forEach(radio => {
            radio.addEventListener("change", (e) => {
                updateSizeAndPrice(e.target.value);
            });
        });
    }

    if (stickySizeSelect) {
        stickySizeSelect.addEventListener("change", (e) => {
            updateSizeAndPrice(e.target.value);
        });
    }

    // D. Urgency simulations
    if (window.urgencyInterval) clearInterval(window.urgencyInterval);
    window.urgencyInterval = setInterval(() => {
        const visitorsEl = document.getElementById("realtime-visitors");
        if (visitorsEl) {
            let current = parseInt(visitorsEl.textContent) || 20;
            let shift = Math.floor(Math.random() * 7) - 3;
            let updated = current + shift;
            if (updated < 5) updated = 5;
            if (updated > 45) updated = 45;
            visitorsEl.textContent = updated;
        }
    }, 4000);

    // E. Modals hooks
    const modalsMap = {
        "size-guide-btn": "size-guide-modal",
        "delivery-info-trigger": "delivery-modal",
        "ask-question-trigger": "question-modal"
    };

    Object.entries(modalsMap).forEach(([btnId, modalId]) => {
        const btn = document.getElementById(btnId);
        const modal = document.getElementById(modalId);
        if (btn && modal) {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                modal.setAttribute("aria-hidden", "false");
            });
        }
    });

    document.querySelectorAll(".modal").forEach(modal => {
        const closeBtn = modal.querySelector(".modal-close");
        const overlay = modal.querySelector(".modal-overlay");
        const closeModal = () => modal.setAttribute("aria-hidden", "true");
        if (closeBtn) closeBtn.addEventListener("click", closeModal);
        if (overlay) overlay.addEventListener("click", closeModal);
    });

    // Q&A inquiry form submit
    const askQuestionForm = document.getElementById("ask-question-form");
    if (askQuestionForm) {
        askQuestionForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Thank you! Your inquiry was submitted successfully. We will get back to you shortly.");
            askQuestionForm.reset();
            const modal = document.getElementById("question-modal");
            if (modal) modal.setAttribute("aria-hidden", "true");
        });
    }

    // F. Tabs switches
    const tabBtns = document.querySelectorAll("#product-extra-info .tab-btn");
    const tabPanels = document.querySelectorAll("#product-extra-info .tab-panel");

    if (tabBtns) {
        tabBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                tabBtns.forEach(b => {
                    b.classList.remove("active");
                    b.setAttribute("aria-selected", "false");
                });
                tabPanels.forEach(p => p.classList.remove("active"));
                btn.classList.add("active");
                btn.setAttribute("aria-selected", "true");
                const targetPanelId = btn.getAttribute("aria-controls");
                const targetPanel = document.getElementById(targetPanelId);
                if (targetPanel) targetPanel.classList.add("active");
            });
        });
    }

    // G. Form purchase Add to Cart submission
    const buyForm = document.getElementById("product-buy-form");
    if (buyForm) {
        buyForm.addEventListener("submit", (e) => {
            e.preventDefault();
            triggerAddToCart();
        });
    }

// Global Gallery Navigation helper for left thumbnail strip
window.scrollToGalleryMedia = function(targetId, btnEl) {
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Active border toggle
        document.querySelectorAll('.product-thumbnails-nav-strip .thumb-card').forEach(b => b.classList.remove('active'));
        if (btnEl) btnEl.classList.add('active');

        // Play video automatically if target media is video
        const video = targetEl.querySelector('video');
        if (video) {
            video.play().catch(() => {});
        }
    }
};

    // Sticky bar Add to Cart button trigger
    const stickyAddToCartBtn = document.getElementById("sticky-add-to-cart-submit-btn");
    if (stickyAddToCartBtn) {
        // Remove previous event listener just in case by cloning
        const newBtn = stickyAddToCartBtn.cloneNode(true);
        stickyAddToCartBtn.parentNode.replaceChild(newBtn, stickyAddToCartBtn);
        newBtn.addEventListener("click", (e) => {
            e.preventDefault();
            triggerAddToCart();
        });
    }

    const triggerAddToCart = () => {
        const selectedSize = stickySizeSelect ? stickySizeSelect.value : "100ml";
        const quantity = parseInt(stickyQtyInput ? stickyQtyInput.value : 1) || 1;
        
        let priceMultiplier = 1.0;
        if (selectedSize === "50ml") priceMultiplier = 0.6;
        else if (selectedSize === "150ml") priceMultiplier = 1.4;
        const finalPrice = product.price * priceMultiplier;

        if (window.CartManager) {
            window.CartManager.addItem({
                id: product.id,
                title: product.title,
                size: selectedSize,
                price: finalPrice,
                image: product.images[0],
                qty: quantity
            });
        } else {
            alert(`Added to Cart: ${quantity} x ${product.title} (${selectedSize})`);
        }
    };

    // Sticky Bottom Bar visibility on scroll
    const stickyBar = document.getElementById("sticky-bottom-bar");
    if (stickyBar) {
        stickyBar.classList.add("visible");
    }

    // Initialize Collection Range Filtered Shoppable Video Reels Carousel
    initProductRangeReelsCarousel(product);
}

function initProductRangeReelsCarousel(product) {
    const track = document.getElementById("reels-carousel-track");
    if (!track) return;

    const allReels = window.AFEEM_REELS_DATA || [];
    if (!allReels.length) return;

    const currentCategory = (product.category || "100ml new").toLowerCase().trim();

    // WooCommerce Friendly: Match all products in PRODUCT_DATABASE sharing the exact Collection Range (category)
    const matchingProductIds = Object.keys(PRODUCT_DATABASE || {}).filter(key => {
        const prod = PRODUCT_DATABASE[key];
        return prod && prod.category && prod.category.toLowerCase().trim() === currentCategory;
    });

    // Ensure current product ID is included
    if (!matchingProductIds.includes(product.id)) {
        matchingProductIds.push(product.id);
    }

    // Filter reels matching products in this Collection Range
    let rangeReels = allReels.filter(reel => {
        const reelId = (reel.id || "").toLowerCase();
        const reelPage = (reel.productPage || "").toLowerCase();
        return matchingProductIds.some(pid => {
            const cleanPid = pid.toLowerCase();
            return reelId === cleanPid || reelPage.includes(cleanPid);
        });
    });

    // Fallback if specific range reels not found: match by first category keyword or fallback slice
    if (!rangeReels.length) {
        rangeReels = allReels.filter(reel => reel.id.includes(currentCategory.split(' ')[0])) || allReels.slice(0, 6);
    }

    // Multiply array items to form seamless infinite marquee scroll track
    let infiniteRangeData = [...rangeReels];
    while (infiniteRangeData.length < 10) {
        infiniteRangeData = [...infiniteRangeData, ...rangeReels];
    }

    // Render WooCommerce-ready cards with data-collection-range & data-product-id
    track.innerHTML = infiniteRangeData.map((reel) => {
        const globalIndex = allReels.findIndex(r => r.id === reel.id || r.externalUrl === reel.externalUrl);
        return `
            <div class="reel-item-card" data-collection-range="${currentCategory}" data-product-id="${reel.id}" onclick="openReelModalByData(window.AFEEM_REELS_DATA[${globalIndex >= 0 ? globalIndex : 0}])">
                <div class="reel-video-box">
                    <video class="reel-card-video" src="${reel.videoUrl}" autoplay loop muted playsinline disablePictureInPicture controlsList="nodownload nofullscreen noremoteplayback" poster="${reel.img}"></video>
                    <div class="reel-badge-thumb">
                        <img src="${reel.img}" alt="${reel.title}">
                    </div>
                </div>
                <div class="reel-item-meta">
                    <h4 class="reel-item-title">${reel.title}</h4>
                    <div class="reel-item-price-row">
                        <span class="reel-curr-price">₹${reel.price}</span>
                        <span class="reel-old-price">₹${reel.originalPrice}</span>
                        <span class="reel-disc-badge">${reel.discount}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}
