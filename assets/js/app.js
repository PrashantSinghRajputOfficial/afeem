/* ==========================================================================
   Central Application & Cart Controller - AFEEM Fragrances (Vanilla JS)
   ========================================================================== */

// 1. Global Public Coupons Dictionary
const PUBLIC_COUPONS = {
    "DEAL30": { code: "DEAL30", type: "percent", value: 30, description: "30% OFF on all Luxury Perfumes" },
    "AFEEM100": { code: "AFEEM100", type: "flat", value: 100, description: "Flat ₹100 OFF over ₹499" },
    "SHIPFREE": { code: "SHIPFREE", type: "percent", value: 10, description: "Free Express Shipping + 10% OFF" },
    "LUXURY20": { code: "LUXURY20", type: "percent", value: 20, description: "20% OFF Special Concierge Deal" },
    "WELCOME50": { code: "WELCOME50", type: "flat", value: 50, description: "₹50 Welcome Offer" }
};

// 1B. Global Cart Management State Object
const CartManager = {
    items: [],
    appliedCoupon: null,

    init() {
        const stored = localStorage.getItem("afeem_cart");
        if (stored) {
            try { this.items = JSON.parse(stored); } catch (e) { this.items = []; }
        }
        const storedCoupon = localStorage.getItem("afeem_applied_coupon");
        if (storedCoupon) {
            try { this.appliedCoupon = JSON.parse(storedCoupon); } catch (e) { this.appliedCoupon = null; }
        }
        this.updateDOM();
    },

    save() {
        localStorage.setItem("afeem_cart", JSON.stringify(this.items));
        if (this.appliedCoupon) {
            localStorage.setItem("afeem_applied_coupon", JSON.stringify(this.appliedCoupon));
        } else {
            localStorage.removeItem("afeem_applied_coupon");
        }
        this.updateDOM();
    },

    applyCoupon(code) {
        if (!code) return;
        const cleanCode = code.trim().toUpperCase();
        if (PUBLIC_COUPONS[cleanCode]) {
            this.appliedCoupon = PUBLIC_COUPONS[cleanCode];
            this.save();
            if (window.showWishlistToast) {
                window.showWishlistToast(`✓ Coupon "${cleanCode}" Applied Successfully!`);
            }
        } else {
            if (window.showWishlistToast) {
                window.showWishlistToast(`❌ Invalid Coupon Code. Try DEAL30 or AFEEM100.`);
            }
        }
    },

    applyCustomCouponFromInput() {
        const input = document.getElementById("cart-coupon-input");
        if (input && input.value) {
            this.applyCoupon(input.value);
        }
    },

    applySelectedCouponFromDropdown() {
        const select = document.getElementById("cart-coupon-select-dropdown");
        if (select && select.value) {
            this.applyCoupon(select.value);
        } else {
            if (window.showWishlistToast) {
                window.showWishlistToast("Please choose a coupon from the dropdown.");
            }
        }
    },

    removeCoupon() {
        this.appliedCoupon = null;
        this.save();
        if (window.showWishlistToast) {
            window.showWishlistToast("Coupon removed.");
        }
    },

    getDiscountAmount() {
        const subtotal = this.getTotalPrice();
        if (!this.appliedCoupon || subtotal <= 0) return 0;
        if (this.appliedCoupon.type === "percent") {
            return (subtotal * this.appliedCoupon.value) / 100;
        } else if (this.appliedCoupon.type === "flat") {
            return Math.min(subtotal, this.appliedCoupon.value);
        }
        return 0;
    },

    getFinalTotal() {
        return Math.max(0, this.getTotalPrice() - this.getDiscountAmount());
    },

    addItem(item) {
        // Match product by ID and size
        const match = this.items.find(i => i.id === item.id && i.size === item.size);
        if (match) {
            match.qty += item.qty;
        } else {
            this.items.push(item);
        }
        this.save();
        
        // Blink / Pop animation on Header Cart Icon
        const cartBtn = document.getElementById("cart-trigger");
        const cartBadge = document.getElementById("cart-count");
        if (cartBtn) {
            cartBtn.classList.remove("badge-icon-pop");
            void cartBtn.offsetWidth; // Force reflow
            cartBtn.classList.add("badge-icon-pop");
        }
        if (cartBadge) {
            cartBadge.classList.remove("badge-icon-pop");
            void cartBadge.offsetWidth;
            cartBadge.classList.add("badge-icon-pop");
        }

        // Show toast feedback notification without opening drawer overlay
        if (window.showWishlistToast) {
            window.showWishlistToast(`✓ "${item.title || 'Product'}" added to your Bag!`);
        }
    },

    removeItem(id, size) {
        this.items = this.items.filter(i => !(i.id === id && i.size === size));
        this.save();
    },

    updateQty(id, size, delta) {
        const item = this.items.find(i => i.id === id && i.size === size);
        if (item) {
            item.qty += delta;
            if (item.qty <= 0) {
                this.removeItem(id, size);
            } else {
                this.save();
            }
        }
    },

    getTotalPrice() {
        return this.items.reduce((sum, i) => sum + (i.price * i.qty), 0);
    },

    getTotalCount() {
        return this.items.reduce((sum, i) => sum + i.qty, 0);
    },

    updateDOM() {
        const count = this.getTotalCount();
        const subtotal = this.getTotalPrice();
        const discount = this.getDiscountAmount();
        const finalTotal = this.getFinalTotal();

        // Update counts in header badge & drawer header
        const cartBadge = document.getElementById("cart-count");
        const drawerCount = document.getElementById("cart-drawer-count");
        if (cartBadge) cartBadge.textContent = count;
        if (drawerCount) drawerCount.textContent = count;

        // Render Cart Items
        const emptyState = document.getElementById("cart-empty-state");
        const itemsContainer = document.getElementById("cart-items-container");
        const drawerFooter = document.getElementById("cart-drawer-footer");
        const totalPriceEl = document.getElementById("cart-total-price");

        if (this.items.length === 0) {
            if (emptyState) emptyState.classList.remove("hidden");
            if (itemsContainer) {
                itemsContainer.classList.add("hidden");
                itemsContainer.innerHTML = '';
            }
            if (drawerFooter) drawerFooter.classList.add("hidden");
        } else {
            if (emptyState) emptyState.classList.add("hidden");
            if (drawerFooter) drawerFooter.classList.remove("hidden");
            if (totalPriceEl) totalPriceEl.textContent = `Rs. ${finalTotal.toFixed(2)}`;

            if (itemsContainer) {
                itemsContainer.classList.remove("hidden");
                itemsContainer.innerHTML = this.items.map(item => `
                    <div class="cart-item" style="display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--color-border);">
                        <a href="product.html?id=${item.id}" style="width: 70px; height: 70px; overflow: hidden; background-color: var(--color-bg-secondary); border-radius: 6px; flex-shrink: 0; display: block;" title="View ${item.title}">
                            <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover;">
                        </a>
                        <div class="cart-item-details" style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-width: 0;">
                            <div>
                                <h4 style="font-size: var(--font-size-xs); text-transform: uppercase; margin-bottom: 2px; font-weight: 700;">
                                    <a href="product.html?id=${item.id}" style="color: inherit; text-decoration: none;" title="View ${item.title}">${item.title}</a>
                                </h4>
                                <span style="font-size: 11px; color: var(--color-text-muted); display: block; margin-bottom: 4px;">Size: ${item.size}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div class="quantity-picker" style="height: 30px;">
                                    <button class="qty-btn" style="width: 25px; height: 100%;" onclick="CartManager.updateQty('${item.id}', '${item.size}', -1)">&minus;</button>
                                    <span style="width: 30px; text-align: center; font-size: 12px;">${item.qty}</span>
                                    <button class="qty-btn" style="width: 25px; height: 100%;" onclick="CartManager.updateQty('${item.id}', '${item.size}', 1)">&plus;</button>
                                </div>
                                <span style="font-size: var(--font-size-xs); font-weight: 700; color: #111;">Rs. ${(item.price * item.qty).toFixed(2)}</span>
                            </div>
                        </div>
                        <button style="align-self: flex-start; color: var(--color-text-muted); font-size: 18px; padding: 4px; background: none; border: none; cursor: pointer;" onclick="CartManager.removeItem('${item.id}', '${item.size}')">&times;</button>
                    </div>
                `).join('');
            }

            // Dynamic Drawer Footer with Compact Collapsible Coupon Bar & Select Options
            if (drawerFooter) {
                const discountHTML = discount > 0 ? `
                    <div style="display: flex; justify-content: space-between; font-size: 12px; color: #2eaaa0; font-weight: 700; margin-bottom: 6px;">
                        <span>COUPON DISCOUNT (${this.appliedCoupon.code}):</span>
                        <span>- Rs. ${discount.toFixed(2)}</span>
                    </div>
                ` : '';

                const couponSectionHTML = this.appliedCoupon ? `
                    <div style="background: #f0fdfa; border: 1px dashed #2eaaa0; padding: 10px 12px; border-radius: 8px; display: flex; align-items: center; justify-content: space-between;">
                        <div>
                            <span style="font-weight: 800; color: #2eaaa0; font-size: 12px; display: block;">✓ ${this.appliedCoupon.code} APPLIED</span>
                            <span style="font-size: 11px; color: #555;">${this.appliedCoupon.description}</span>
                        </div>
                        <button onclick="CartManager.removeCoupon()" style="background: none; border: none; color: #e74c3c; font-size: 12px; font-weight: 700; cursor: pointer; padding: 4px;">Remove ✕</button>
                    </div>
                ` : `
                    <div class="cart-coupon-box" style="background: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                        <button type="button" onclick="const b=document.getElementById('coupon-expand-body'); if(b) b.classList.toggle('hidden');" style="width: 100%; background: #fafafa; border: none; padding: 10px 12px; display: flex; align-items: center; justify-content: space-between; cursor: pointer;">
                            <span style="font-size: 12px; font-weight: 700; color: #111111; display: flex; align-items: center; gap: 6px;">
                                🏷️ Apply Coupon / Choose Offers
                            </span>
                            <span style="font-size: 11px; font-weight: 700; color: #2eaaa0;">Select ▾</span>
                        </button>

                        <div id="coupon-expand-body" class="hidden" style="padding: 12px; border-top: 1px solid #f0f0f0; background: #ffffff;">
                            <!-- 1. Custom Code Input -->
                            <div style="display: flex; gap: 6px; margin-bottom: 10px;">
                                <input type="text" id="cart-coupon-input" placeholder="ENTER CODE (e.g. DEAL30)" style="flex: 1; padding: 8px 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 11px; text-transform: uppercase; font-weight: 700; outline: none;">
                                <button onclick="CartManager.applyCustomCouponFromInput()" style="background: #111; color: #fff; border: none; padding: 8px 14px; border-radius: 6px; font-size: 11px; font-weight: 700; cursor: pointer; text-transform: uppercase;">CLAIM</button>
                            </div>

                            <!-- 2. Dropdown Offers Selector -->
                            <span style="display: block; font-size: 10px; color: #666; font-weight: 700; margin-bottom: 4px; text-transform: uppercase;">OR SELECT AVAILABLE OFFER:</span>
                            <div style="display: flex; gap: 6px;">
                                <select id="cart-coupon-select-dropdown" style="flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 11px; font-weight: 600; background: #ffffff; color: #333; outline: none; cursor: pointer;">
                                    <option value="">-- Select an Offer --</option>
                                    <option value="DEAL30">DEAL30 - 30% OFF Luxury Perfumes</option>
                                    <option value="AFEEM100">AFEEM100 - Flat ₹100 OFF over ₹499</option>
                                    <option value="SHIPFREE">SHIPFREE - Free Shipping + 10% OFF</option>
                                    <option value="LUXURY20">LUXURY20 - 20% OFF Special Offer</option>
                                    <option value="WELCOME50">WELCOME50 - ₹50 Welcome Offer</option>
                                </select>
                                <button onclick="CartManager.applySelectedCouponFromDropdown()" style="background: #2eaaa0; color: #ffffff; border: none; padding: 8px 12px; border-radius: 6px; font-size: 11px; font-weight: 700; cursor: pointer; text-transform: uppercase;">APPLY</button>
                            </div>
                        </div>
                    </div>
                `;

                drawerFooter.innerHTML = `
                    <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; box-sizing: border-box;">
                        <!-- 1. TOP: Compact Coupon Bar & Selection Dropdown -->
                        ${couponSectionHTML}

                        <!-- 2. MIDDLE: Price Breakdown -->
                        <div style="background: #fafafa; border: 1px solid #eef0f2; border-radius: 10px; padding: 12px 14px;">
                            <div style="display: flex; justify-content: space-between; font-size: 12px; color: #666; margin-bottom: 4px;">
                                <span>SUBTOTAL:</span>
                                <span style="font-weight: 600; color: #111;">Rs. ${subtotal.toFixed(2)}</span>
                            </div>
                            ${discountHTML}
                            <div style="display: flex; justify-content: space-between; font-size: 14px; font-weight: 800; color: #111; border-top: 1px solid #e8e8e8; padding-top: 8px; margin-top: 4px;">
                                <span>TOTAL AMOUNT:</span>
                                <span style="color: #2eaaa0; font-size: 15px;" id="cart-total-price">Rs. ${finalTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <!-- 3. BOTTOM: BUY NOW Button -->
                        <button class="btn btn-primary btn-block" style="background: linear-gradient(135deg, #2eaaa0 0%, #1c6d66 100%); color: #ffffff; width: 100%; padding: 14px; font-weight: 800; font-size: 14px; text-transform: uppercase; border: none; border-radius: 8px; cursor: pointer; letter-spacing: 0.08em; box-shadow: 0 4px 14px rgba(46, 170, 160, 0.35); display: flex; align-items: center; justify-content: center; gap: 8px;" onclick="alert('Proceeding to Checkout with Total: Rs. ${finalTotal.toFixed(2)}')">
                            <span>BUY NOW</span>
                            <span style="font-size: 16px;">➔</span>
                        </button>
                    </div>
                `;
            }
        }
    }
};

// 1B. Global Wishlist Management State Object
const WishlistManager = {
    items: [],

    init() {
        const stored = localStorage.getItem("afeem_wishlist");
        if (stored) {
            try { this.items = JSON.parse(stored); } catch (e) { this.items = []; }
        }
        this.updateDOM();
    },

    save() {
        localStorage.setItem("afeem_wishlist", JSON.stringify(this.items));
        this.updateDOM();
    },

    toggleItem(item) {
        const idx = this.items.findIndex(i => i.id === item.id);
        let isAdded = false;
        if (idx >= 0) {
            this.items.splice(idx, 1);
        } else {
            this.items.push(item);
            isAdded = true;
        }
        this.save();

        // Blink / Pop animation on Header Wishlist Icon
        const wishlistBtn = document.getElementById("wishlist-trigger");
        const wishlistBadge = document.getElementById("wishlist-count");
        if (wishlistBtn) {
            wishlistBtn.classList.remove("badge-icon-pop");
            void wishlistBtn.offsetWidth; // Force reflow
            wishlistBtn.classList.add("badge-icon-pop");
        }
        if (wishlistBadge) {
            wishlistBadge.classList.remove("badge-icon-pop");
            void wishlistBadge.offsetWidth;
            wishlistBadge.classList.add("badge-icon-pop");
        }

        // Show toast feedback notification
        if (window.showWishlistToast) {
            window.showWishlistToast(isAdded ? `✓ "${item.title || 'Product'}" added to your Wishlist!` : `Removed from Wishlist`);
        }
    },

    isWishlisted(id) {
        return this.items.some(i => i.id === id);
    },

    updateDOM() {
        const count = this.items.length;
        const countBadge = document.getElementById("wishlist-count");
        if (countBadge) countBadge.textContent = count;

        const itemsContainer = document.getElementById("wishlist-items-container");
        const emptyState = document.getElementById("wishlist-empty-state");
        const drawerFooter = document.getElementById("wishlist-drawer-footer");

        if (itemsContainer) {
            if (this.items.length === 0) {
                if (emptyState) emptyState.classList.remove("hidden");
                itemsContainer.classList.add("hidden");
                itemsContainer.innerHTML = '';
                if (drawerFooter) drawerFooter.classList.add("hidden");
            } else {
                if (emptyState) emptyState.classList.add("hidden");
                itemsContainer.classList.remove("hidden");
                itemsContainer.innerHTML = this.items.map(item => `
                    <div class="wishlist-item" style="display: flex; align-items: center; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid #eeeeee;">
                        <a href="product.html?id=${item.id}" style="display: flex; align-items: center; gap: 12px; text-decoration: none; color: inherit; flex: 1; min-width: 0; margin-right: 10px;" title="View ${item.title}">
                            <img src="${item.image}" alt="${item.title}" style="width: 56px; height: 56px; object-fit: cover; border-radius: 6px; background-color: #f6f6f6; flex-shrink: 0;">
                            <div style="min-width: 0;">
                                <h4 style="font-size: 13px; font-weight: 600; margin: 0 0 4px 0; color: #111; text-transform: uppercase; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.title}</h4>
                                <span style="font-size: 13px; color: #2eaaa0; font-weight: 700; display: block;">Rs. ${item.price ? item.price.toFixed(2) : '499.00'}</span>
                            </div>
                        </a>
                        <div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
                            <button class="btn btn-primary" style="padding: 8px 14px; font-size: 11px; text-transform: uppercase; background: #2eaaa0; border: none; border-radius: 4px; font-weight: 700;" onclick="CartManager.addItem({id: '${item.id}', title: '${item.title}', size: '100ml', price: ${item.price || 499}, image: '${item.image}', qty: 1})">Add to Bag</button>
                            <button style="background: none; border: none; font-size: 20px; cursor: pointer; color: #999; padding: 4px;" onclick="WishlistManager.toggleItem({id: '${item.id}'})" aria-label="Remove item">&times;</button>
                        </div>
                    </div>
                `).join('');

                if (drawerFooter) {
                    drawerFooter.classList.remove("hidden");
                    drawerFooter.style.padding = "16px";
                    drawerFooter.style.borderTop = "1px solid #eeeeee";
                    drawerFooter.innerHTML = `
                        <a href="profile.html" class="btn btn-primary btn-block" style="background: #111111; color: #ffffff; width: 100%; padding: 14px; font-weight: 800; font-size: 13px; text-transform: uppercase; border: none; border-radius: 6px; cursor: pointer; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                            <span>VIEW FULL WISHLIST</span>
                            <span style="font-size: 16px;">➔</span>
                        </a>
                    `;
                }
            }
        }

        // Update wishlist heart buttons active state (filled red heart)
        document.querySelectorAll(".add-to-wishlist, .wishlist-btn-circle").forEach(btn => {
            const pid = btn.getAttribute("data-product-id");
            if (pid && this.isWishlisted(pid)) {
                btn.classList.add("active");
                btn.style.color = "#e74c3c";
                btn.style.borderColor = "#e74c3c";
                const svg = btn.querySelector("svg");
                if (svg) svg.setAttribute("fill", "#e74c3c");
            } else if (pid) {
                btn.classList.remove("active");
                btn.style.color = "";
                btn.style.borderColor = "";
                const svg = btn.querySelector("svg");
                if (svg) svg.setAttribute("fill", "none");
            }
        });
    }
};

// Expose CartManager & WishlistManager globally for HTML inline onclick event handlers
window.CartManager = CartManager;
window.WishlistManager = WishlistManager;

// 2. Global Site Initializer
document.addEventListener("DOMContentLoaded", () => {
    // A. Init Cart & Wishlist Managers
    CartManager.init();
    WishlistManager.init();

    // Wishlist click handler delegation
    document.addEventListener("click", (e) => {
        const wishBtn = e.target.closest(".add-to-wishlist, .wishlist-btn-circle");
        if (!wishBtn) return;
        
        e.preventDefault();
        const pid = wishBtn.getAttribute("data-product-id");
        if (!pid) return;

        let title = "Afeem Perfume";
        let image = "assets/images/products/loop-1.webp";
        let price = 499.00;

        if (typeof PRODUCT_DATABASE !== "undefined" && PRODUCT_DATABASE[pid]) {
            title = PRODUCT_DATABASE[pid].title;
            image = PRODUCT_DATABASE[pid].images[0];
            price = PRODUCT_DATABASE[pid].price;
        }

        WishlistManager.toggleItem({ id: pid, title, image, price });
    });

    // B. Sticky Header scroll styling
    const siteHeader = document.getElementById("site-header");
    if (siteHeader) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 40) {
                siteHeader.classList.add("scrolled");
            } else {
                siteHeader.classList.remove("scrolled");
            }
        });
    }

    // C. Cookies Consent Bar Trigger
    const cookiesConsentBar = document.getElementById("cookies-consent-bar");
    const acceptCookiesBtn = document.getElementById("accept-cookies");

    if (cookiesConsentBar && acceptCookiesBtn) {
        const cookiesAccepted = localStorage.getItem("afeem_cookies_accepted");
        if (!cookiesAccepted) {
            setTimeout(() => {
                cookiesConsentBar.classList.add("show");
            }, 1000);
        }

        acceptCookiesBtn.addEventListener("click", () => {
            localStorage.setItem("afeem_cookies_accepted", "true");
            cookiesConsentBar.classList.remove("show");
        });
    }

    // D. Direct Product Details Page View Navigation on Eye Icon Click
    document.addEventListener("click", (e) => {
        const qvBtn = e.target.closest(".quick-view");
        if (!qvBtn) return;

        e.preventDefault();
        e.stopPropagation();
        const productId = qvBtn.getAttribute("data-product-id");
        if (productId) {
            window.location.href = `product.html?id=${productId}`;
        }
    });

    // Close buttons for modals (Quick View specific)
    const qvModal = document.getElementById("quickview-modal");
    if (qvModal) {
        const closeBtn = qvModal.querySelector(".modal-close");
        const overlay = qvModal.querySelector(".modal-overlay");
        const closeModal = () => qvModal.setAttribute("aria-hidden", "true");

        if (closeBtn) closeBtn.addEventListener("click", closeModal);
        if (overlay) overlay.addEventListener("click", closeModal);
    }

    // E. Flash Deal Countdown Timer Live Ticker
    const hoursEl = document.getElementById("timer-hours");
    const minsEl = document.getElementById("timer-mins");
    const secsEl = document.getElementById("timer-secs");

    if (hoursEl && minsEl && secsEl) {
        let totalSeconds = (8 * 3600) + (42 * 60) + 19;
        setInterval(() => {
            if (totalSeconds <= 0) return;
            totalSeconds--;

            const h = Math.floor(totalSeconds / 3600);
            const m = Math.floor((totalSeconds % 3600) / 60);
            const s = totalSeconds % 60;

            hoursEl.textContent = String(h).padStart(2, "0");
            minsEl.textContent = String(m).padStart(2, "0");
            secsEl.textContent = String(s).padStart(2, "0");
        }, 1000);
    }

    // F. 3D Coverflow Showcase Carousel Controller (Continuous Motion)
    const coverflowContainer = document.getElementById("coverflow-carousel");
    if (coverflowContainer) {
        const cards = Array.from(coverflowContainer.querySelectorAll(".coverflow-card"));
        const dotsContainer = document.getElementById("c3d-dots");

        if (cards.length > 0) {
            let activeIdx = 2; // Center card (Combat/Raid) default
            let autoplayTimer;

            if (dotsContainer) {
                dotsContainer.innerHTML = cards.map((_, i) => `<span class="dot ${i === activeIdx ? 'active' : ''}" data-index="${i}"></span>`).join('');
            }

            const updateCoverflow = (index) => {
                activeIdx = (index + cards.length) % cards.length;
                const total = cards.length;

                cards.forEach((card, i) => {
                    let diff = i - activeIdx;
                    if (diff > total / 2) diff -= total;
                    if (diff < -total / 2) diff += total;

                    if (diff === 0) {
                        card.style.transform = `translateX(0px) rotateY(0deg) scale(1.1)`;
                        card.style.zIndex = "30";
                        card.style.opacity = "1";
                        card.style.boxShadow = "0 22px 50px rgba(108, 92, 231, 0.28)";
                    } else if (diff === -1) {
                        card.style.transform = `translateX(-310px) rotateY(32deg) scale(0.88)`;
                        card.style.zIndex = "20";
                        card.style.opacity = "0.95";
                        card.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.12)";
                    } else if (diff === 1) {
                        card.style.transform = `translateX(310px) rotateY(-32deg) scale(0.88)`;
                        card.style.zIndex = "20";
                        card.style.opacity = "0.95";
                        card.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.12)";
                    } else if (diff < -1) {
                        card.style.transform = `translateX(-540px) rotateY(48deg) scale(0.72)`;
                        card.style.zIndex = "10";
                        card.style.opacity = "0.6";
                        card.style.boxShadow = "none";
                    } else {
                        card.style.transform = `translateX(540px) rotateY(-48deg) scale(0.72)`;
                        card.style.zIndex = "10";
                        card.style.opacity = "0.6";
                        card.style.boxShadow = "none";
                    }
                });

                if (dotsContainer) {
                    const dots = dotsContainer.querySelectorAll(".dot");
                    dots.forEach((d, idx) => d.classList.toggle("active", idx === activeIdx));
                }
            };

            cards.forEach((card, i) => {
                card.addEventListener("click", (e) => {
                    // Let quick view modal or direct anchor link clicks proceed naturally
                    if (e.target.closest(".quick-view")) {
                        return;
                    }
                    if (e.target.closest("a")) {
                        return;
                    }

                    const productId = card.getAttribute("data-product-id");

                    if (i === activeIdx) {
                        // Active center card clicked -> navigate directly to product page
                        if (productId) {
                            window.location.href = `product.html?id=${productId}`;
                        }
                    } else {
                        // Side card clicked -> rotate to center
                        updateCoverflow(i);
                        resetAutoplay();
                    }
                });
            });

            if (dotsContainer) {
                dotsContainer.addEventListener("click", (e) => {
                    if (e.target.classList.contains("dot")) {
                        const targetIdx = parseInt(e.target.getAttribute("data-index"));
                        updateCoverflow(targetIdx);
                        resetAutoplay();
                    }
                });
            }

            const stopAutoplay = () => {
                if (autoplayTimer) clearInterval(autoplayTimer);
            };

            const startAutoplay = () => {
                stopAutoplay();
                autoplayTimer = setInterval(() => {
                    updateCoverflow(activeIdx + 1);
                }, 3500);
            };

            const resetAutoplay = () => {
                stopAutoplay();
                startAutoplay();
            };

            // Pause 3D Coverflow Carousel ONLY on Individual Card Hover
            const coverflowCards = coverflowContainer ? coverflowContainer.querySelectorAll(".coverflow-card") : [];
            coverflowCards.forEach(card => {
                card.addEventListener("mouseenter", stopAutoplay);
                card.addEventListener("mouseleave", startAutoplay);
            });

            updateCoverflow(activeIdx);
            startAutoplay();
        }
    }

    // F2. Best Sellers Continuous 1-Direction Right-to-Left Infinite Slider (Card-Specific Hover Pause)
    const bsTrack = document.getElementById("bestsellers-slider-track");
    const bsWrapper = document.getElementById("bestsellers-slider-wrapper");
    const bsPrevBtn = document.getElementById("bs-prev-btn");
    const bsNextBtn = document.getElementById("bs-next-btn");

    if (bsTrack && bsWrapper) {
        let bsIndex = 0;
        let bsInterval = null;
        const totalUniqueItems = 5; // 5 unique items before cloned items

        const updateBsSlider = (useTransition = true) => {
            if (useTransition) {
                bsTrack.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
            } else {
                bsTrack.style.transition = "none";
            }

            const firstCard = bsTrack.children[0];
            if (firstCard) {
                const cardWidth = firstCard.getBoundingClientRect().width;
                const gap = 24; // gap between cards
                const moveAmount = (cardWidth + gap) * bsIndex;
                bsTrack.style.transform = `translateX(-${moveAmount}px)`;
            }
        };

        const nextBsSlide = () => {
            bsIndex++;
            updateBsSlider(true);

            // Seamless infinite loop check: when reaching the cloned start (index 5)
            if (bsIndex >= totalUniqueItems) {
                setTimeout(() => {
                    bsIndex = 0;
                    updateBsSlider(false);
                }, 600); // match transition duration
            }
        };

        const prevBsSlide = () => {
            if (bsIndex <= 0) {
                bsIndex = totalUniqueItems - 1;
                updateBsSlider(false);
                setTimeout(() => {
                    bsIndex = totalUniqueItems - 2;
                    updateBsSlider(true);
                }, 20);
            } else {
                bsIndex--;
                updateBsSlider(true);
            }
        };

        const startBsAutoplay = () => {
            stopBsAutoplay();
            bsInterval = setInterval(nextBsSlide, 3000);
        };

        const stopBsAutoplay = () => {
            if (bsInterval) clearInterval(bsInterval);
        };

        // Pause ONLY when hovering on individual product cards
        const bsCards = bsTrack.querySelectorAll(".afeem-product-card");
        bsCards.forEach(card => {
            card.addEventListener("mouseenter", stopBsAutoplay);
            card.addEventListener("mouseleave", startBsAutoplay);
        });

        if (bsPrevBtn) bsPrevBtn.addEventListener("click", () => { prevBsSlide(); stopBsAutoplay(); startBsAutoplay(); });
        if (bsNextBtn) bsNextBtn.addEventListener("click", () => { nextBsSlide(); stopBsAutoplay(); startBsAutoplay(); });

        window.addEventListener("resize", () => updateBsSlider(false));

        updateBsSlider(false);
        startBsAutoplay();
    }

    // G. Search Overlay & Real-time Matching Controller
    const searchTrigger = document.getElementById("search-trigger");
    const searchPanel = document.getElementById("search-panel");
    const searchCloseBtn = document.getElementById("search-close-btn");
    const searchInput = document.getElementById("search-input");
    const searchForm = document.getElementById("search-panel-form");
    const searchResultsPreview = document.getElementById("search-results-preview");

    if (searchTrigger && searchPanel) {
        searchTrigger.addEventListener("click", () => {
            searchPanel.setAttribute("aria-hidden", "false");
            if (searchInput) {
                setTimeout(() => searchInput.focus(), 200);
            }
        });
    }

    const closeSearchPanel = () => {
        if (searchPanel) {
            searchPanel.setAttribute("aria-hidden", "true");
        }
    };

    if (searchCloseBtn) searchCloseBtn.addEventListener("click", closeSearchPanel);
    if (searchPanel) {
        searchPanel.addEventListener("click", (e) => {
            if (e.target.classList.contains("search-overlay-bg") || e.target.hasAttribute("data-close")) {
                closeSearchPanel();
            }
        });
    }

    // Live search input matching
    if (searchInput && searchResultsPreview) {
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.trim().toLowerCase();
            if (!query) {
                searchResultsPreview.innerHTML = '';
                return;
            }

            const productsList = [
                { id: "afeem-ocean", title: "Afeem - Ocean", price: 499, image: "assets/images/products/ocean-1.webp", scent: "Oceanic Marine" },
                { id: "afeem-loop", title: "Afeem - Loop", price: 499, image: "assets/images/products/loop-1.webp", scent: "Woody Amber" },
                { id: "afeem-combat", title: "Afeem - Combat", price: 499, image: "assets/images/products/combat-1.webp", scent: "Spicy Leather" },
                { id: "afeem-buzz", title: "Afeem - Buzz", price: 499, image: "assets/images/products/buzz-1.webp", scent: "Fresh Citrus" },
                { id: "afeem-aura", title: "Afeem - Aura", price: 299, image: "assets/images/products/aura-1.webp", scent: "Floral Sweet" },
                { id: "afeem-guilty", title: "Afeem - Guilty", price: 299, image: "assets/images/products/combat-1.webp", scent: "Oriental Spice" },
                { id: "afeem-pure", title: "Afeem - Pure", price: 299, image: "assets/images/products/ocean-1.webp", scent: "Clean White Musk" },
                { id: "afeem-raid", title: "Afeem - Raid", price: 299, image: "assets/images/products/loop-1.webp", scent: "Smoky Wood Oud" },
                { id: "afeem-royal", title: "Afeem - Royal", price: 299, image: "assets/images/products/buzz-1.webp", scent: "Royal Oudh Saffron" },
                { id: "afeem-intense-ocean", title: "Afeem - Intense Ocean", price: 599, image: "assets/images/products/ocean-2.webp", scent: "Extrait Marine" },
                { id: "afeem-velvet", title: "Afeem - Velvet Scent", price: 399, image: "assets/images/products/aura-1.webp", scent: "Vanilla Rose" },
                { id: "afeem-midnight", title: "Afeem - Midnight Secret", price: 499, image: "assets/images/products/loop-2.webp", scent: "Dark Amber Bergamot" }
            ];

            const matches = productsList.filter(p => 
                p.title.toLowerCase().includes(query) || 
                p.scent.toLowerCase().includes(query)
            );

            if (matches.length === 0) {
                searchResultsPreview.innerHTML = `<div style="padding: 16px; text-align: center; color: #888;">No perfumes match "${query}". Press Enter to view full catalog.</div>`;
            } else {
                searchResultsPreview.innerHTML = `
                    <div style="padding: 12px 0 6px; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; color: #888; text-transform: uppercase;">MATCHING PERFUMES (${matches.length})</div>
                    ${matches.slice(0, 4).map(p => `
                        <a href="shop.html?search=${encodeURIComponent(p.title)}" style="display: flex; align-items: center; gap: 14px; padding: 10px 0; border-bottom: 1px solid #f0f0f0; text-decoration: none; color: inherit;">
                            <img src="${p.image}" alt="${p.title}" style="width: 48px; height: 48px; object-fit: cover; border-radius: 6px; background-color: #f6f6f6;">
                            <div>
                                <h4 style="font-size: 13px; font-weight: 600; margin: 0 0 2px 0; color: #111;">${p.title}</h4>
                                <span style="font-size: 11px; color: #777;">Scent: ${p.scent} &bull; <strong style="color: #2eaaa0;">Rs. ${p.price.toFixed(2)}</strong></span>
                            </div>
                        </a>
                    `).join('')}
                    <a href="shop.html?search=${encodeURIComponent(query)}" style="display: block; text-align: center; padding: 12px 0 0; font-size: 12px; font-weight: 700; color: #2eaaa0; text-decoration: none;">View All Results in Catalog &rarr;</a>
                `;
            }
        });
    }

    // Submit form -> redirect to shop.html?search=query
    if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const query = searchInput ? searchInput.value.trim() : "";
            if (query) {
                window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
            } else {
                window.location.href = `shop.html`;
            }
        });
    }

    // H. Pre-fill Account Drawer Credentials & Login Redirect
    const loginEmailInput = document.getElementById("login-email");
    const loginPasswordInput = document.getElementById("login-password");
    if (loginEmailInput && !loginEmailInput.value) {
        loginEmailInput.value = "vip.user@afeem.in";
    }
    if (loginPasswordInput && !loginPasswordInput.value) {
        loginPasswordInput.value = "AfeemLuxury#2026";
    }

    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            window.location.href = "profile.html";
        });
    }

    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            window.location.href = "profile.html";
        });
    }
});

/* ==========================================================================
   Shoppable Video Reels Controller (Matching Reference Screenshots 1 & 2)
   ========================================================================== */
const AFEEM_REELS_DATA = [
    {
        id: "afeem-loop",
        title: "Afeem Loop - 100ml",
        price: 499,
        originalPrice: 999,
        discount: "50% OFF",
        img: "assets/images/products/loop-1.webp",
        youtubeId: "X9oGw8cJ_Pw",
        desc: "GILDED. GRAND. GLORIOUS. Quiet luxury and effortlessly premium handcrafted EDP.",
        productPage: "product.html?id=afeem-loop"
    },
    {
        id: "afeem-ocean",
        title: "Afeem Ocean - 100ml",
        price: 499,
        originalPrice: 999,
        discount: "50% OFF",
        img: "assets/images/products/ocean-1.webp",
        youtubeId: "3RGKaBxLV-0",
        desc: "DEEP. MARINE. VIBRANT. Fresh sea breeze notes for high-power daytime confidence.",
        productPage: "product.html?id=afeem-ocean"
    },
    {
        id: "afeem-combat",
        title: "Afeem Combat - 100ml",
        price: 499,
        originalPrice: 999,
        discount: "50% OFF",
        img: "assets/images/products/combat-1.webp",
        youtubeId: "FZXiWHJtzQo",
        desc: "BOLD. LEATHER. INTENSE. Warm spicy leather accord crafted for evening presence.",
        productPage: "product.html?id=afeem-combat"
    },
    {
        id: "afeem-buzz",
        title: "Afeem Buzz - 100ml",
        price: 499,
        originalPrice: 999,
        discount: "50% OFF",
        img: "assets/images/products/buzz-1.webp",
        youtubeId: "bNLaCgR6SBk",
        desc: "ELECTRIC. CITRUS. CHARMING. High energy zesty opening with smooth amber trail.",
        productPage: "product.html?id=afeem-buzz"
    },
    {
        id: "afeem-aura",
        title: "Afeem Aura - 100ml",
        price: 499,
        originalPrice: 999,
        discount: "50% OFF",
        img: "assets/images/products/aura-1.webp",
        youtubeId: "qF3jAq8v3qQ",
        desc: "SOPHISTICATED. MYSTICAL. LUXE. French-inspired master perfumery signature.",
        productPage: "product.html?id=afeem-aura"
    },
    {
        id: "afeem-pure",
        title: "Afeem Pure - 100ml",
        price: 499,
        originalPrice: 999,
        discount: "50% OFF",
        img: "assets/images/products/pure-1.webp",
        youtubeId: "3VQfDTdWXAI",
        desc: "PURE. ELEGANT. SILK. 24hr duration handcrafted French EDP experience.",
        productPage: "product.html?id=afeem-pure"
    },
    {
        id: "afeem-raid",
        title: "Afeem Raid - 100ml",
        price: 499,
        originalPrice: 999,
        discount: "50% OFF",
        img: "assets/images/products/raid-1.webp",
        youtubeId: "DlkKiwFdKuw",
        desc: "RAW. POWERFUL. MAGNETIC. Spicy oriental blend for unstoppable charisma.",
        productPage: "product.html?id=afeem-raid"
    },
    {
        id: "afeem-guilty",
        title: "Afeem Guilty - 100ml",
        price: 499,
        originalPrice: 999,
        discount: "50% OFF",
        img: "assets/images/products/guilty-1.webp",
        youtubeId: "W0irE55U8XQ",
        desc: "SEDUCTIVE. DARK. AMBER. Midnight luxury perfume for late-night impression.",
        productPage: "product.html?id=afeem-guilty"
    },
    {
        id: "afeem-royal",
        title: "Afeem Royal - 100ml",
        price: 499,
        originalPrice: 999,
        discount: "50% OFF",
        img: "assets/images/products/royal-1.webp",
        youtubeId: "R8TDppYuQe4",
        desc: "KINGS. MAJESTIC. OUD. Imperial rich oud blend crafted for royalty.",
        productPage: "product.html?id=afeem-royal"
    },
    {
        id: "afeem-story",
        title: "Afeem Story - 100ml",
        price: 499,
        originalPrice: 999,
        discount: "50% OFF",
        img: "assets/images/products/loop-2.webp",
        youtubeId: "n8IexNP6e5E",
        desc: "UNFORGETTABLE. MEMORY. ROSE. Enchanting floral woody accord.",
        productPage: "product.html?id=afeem-story"
    },
    {
        id: "afeem-gold",
        title: "Afeem Gold - 100ml",
        price: 499,
        originalPrice: 999,
        discount: "50% OFF",
        img: "assets/images/products/aura-2.webp",
        youtubeId: "s4eG-Zz87dU",
        desc: "GILDED. RADIANT. WARM. 24karat liquid gold scent experience.",
        productPage: "product.html?id=afeem-gold"
    }
];

function initShoppableReelsCarousel() {
    const track = document.getElementById("reels-carousel-track");
    if (!track) return;

    // Double the array for 100% seamless infinite 0% to -50% marquee loop
    const infiniteReelsData = [...AFEEM_REELS_DATA, ...AFEEM_REELS_DATA];

    track.innerHTML = infiniteReelsData.map((reel, index) => {
        const realDataIndex = index % AFEEM_REELS_DATA.length;
        return `
            <div class="reel-item-card" onclick="openReelModal(${realDataIndex})">
                <div class="reel-video-box">
                    <iframe class="reel-card-video" src="https://www.youtube-nocookie.com/embed/${reel.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${reel.youtubeId}&playsinline=1" title="${reel.title}" frameborder="0" allow="autoplay; encrypted-media" style="width:100%; height:100%; pointer-events:none; border:none;"></iframe>
                    <div class="reel-play-icon-overlay">▶</div>
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

window.scrollReelsCarousel = function(direction) {
    const track = document.getElementById("reels-carousel-track");
    if (track) {
        track.scrollBy({ left: direction * 450, behavior: 'smooth' });
    }
};

let isReelModalMuted = false;

window.openReelModal = function(index) {
    const reel = AFEEM_REELS_DATA[index];
    if (!reel) return;
    isReelModalMuted = false;

    const modal = document.getElementById("shoppable-reel-modal");
    const videoPanel = document.querySelector(".reel-video-panel");
    const img = document.getElementById("reel-modal-prod-img");
    const title = document.getElementById("reel-modal-prod-title");
    const price = document.getElementById("reel-modal-prod-price");
    const strike = document.getElementById("reel-modal-prod-strike");
    const discount = document.getElementById("reel-modal-prod-discount");
    const desc = document.getElementById("reel-modal-prod-desc");
    const addCartBtn = document.getElementById("reel-modal-add-cart-btn");
    const moreInfoBtn = document.getElementById("reel-modal-more-info-btn");

    if (modal && videoPanel) {
        videoPanel.innerHTML = `
            <iframe id="reel-modal-video-iframe" class="reel-modal-video" src="https://www.youtube-nocookie.com/embed/${reel.youtubeId}?autoplay=1&mute=0&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&loop=1&playlist=${reel.youtubeId}&playsinline=1&enablejsapi=1" title="${reel.title}" frameborder="0" allow="autoplay; encrypted-media"></iframe>
            <button class="reel-sound-toggle" id="reel-sound-toggle" onclick="toggleReelModalSound()" aria-label="Toggle Sound">
                <span id="reel-sound-icon">🔊</span>
            </button>
        `;

        if (img) img.src = reel.img;
        if (title) title.textContent = reel.title;
        if (price) price.textContent = `₹${reel.price}`;
        if (strike) strike.textContent = `₹${reel.originalPrice}`;
        if (discount) discount.textContent = reel.discount;
        if (desc) desc.textContent = reel.desc;

        if (addCartBtn) {
            addCartBtn.onclick = function() {
                CartManager.addItem({
                    id: reel.id,
                    title: reel.title,
                    size: '100ml',
                    price: reel.price,
                    image: reel.img,
                    qty: 1
                });
                closeReelModal();
            };
        }

        if (moreInfoBtn) {
            moreInfoBtn.href = reel.productPage;
        }

        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }
};

window.closeReelModal = function() {
    const modal = document.getElementById("shoppable-reel-modal");
    const videoPanel = document.querySelector(".reel-video-panel");
    if (modal) {
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }
    if (videoPanel) {
        videoPanel.innerHTML = "";
    }
};

window.toggleReelModalSound = function() {
    const iframe = document.getElementById("reel-modal-video-iframe");
    const soundIcon = document.getElementById("reel-sound-icon");
    if (!iframe) return;

    isReelModalMuted = !isReelModalMuted;
    if (isReelModalMuted) {
        iframe.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
        if (soundIcon) soundIcon.textContent = "🔇";
    } else {
        iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
        if (soundIcon) soundIcon.textContent = "🔊";
    }
};

document.addEventListener("DOMContentLoaded", function() {
    initShoppableReelsCarousel();
});


