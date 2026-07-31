/* ==========================================================================
   Full-Screen Luxury User Profile Controller - AFEEM Fragrances (Vanilla JS)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Address Database Manager State
    let userAddresses = [
        {
            id: "addr-1",
            name: "Rahul Sharma",
            line: "Boutique Headquarters, Sector 62",
            city: "Noida",
            state: "Uttar Pradesh",
            pincode: "201301",
            phone: "+91 98765 43210",
            isDefault: true
        },
        {
            id: "addr-2",
            name: "Rahul Sharma (Office)",
            line: "4th Floor, DLF Cyber Tower, Connaught Place",
            city: "New Delhi",
            state: "Delhi",
            pincode: "110001",
            phone: "+91 98765 43210",
            isDefault: false
        }
    ];

    // 2. Tab Navigation Controller
    const tabBtns = document.querySelectorAll(".profile-nav-btn");
    const tabPanels = document.querySelectorAll(".profile-tab-panel");

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetTab = btn.getAttribute("data-tab");
            
            tabBtns.forEach(b => b.classList.remove("active"));
            tabPanels.forEach(p => p.classList.remove("active"));

            btn.classList.add("active");
            const activePanel = document.getElementById(`panel-${targetTab}`);
            if (activePanel) {
                activePanel.classList.add("active");
            }
        });
    });

    // Toast Feedback Generator for Wishlist Actions
    function showWishlistToast(msg) {
        let toast = document.getElementById("wishlist-toast-feedback");
        if (!toast) {
            toast = document.createElement("div");
            toast.id = "wishlist-toast-feedback";
            toast.style.cssText = "position: fixed; top: 90px; right: 30px; background: #111111; color: #ffffff; padding: 14px 24px; border-radius: 10px; font-size: 14px; font-weight: 600; box-shadow: 0 10px 30px rgba(0,0,0,0.3); z-index: 9999; display: flex; align-items: center; gap: 10px; border-left: 4px solid #2eaaa0; transition: all 0.3s ease;";
            document.body.appendChild(toast);
        }
        toast.innerHTML = `<span>${msg}</span>`;
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";

        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateY(-10px)";
        }, 3000);
    }

    // Global Add Wishlist Item to Cart Handler
    window.addWishlistItemToCart = function(id, title, price, image) {
        if (window.CartManager) {
            window.CartManager.addItem({
                id: id,
                title: title,
                size: '100ml',
                price: parseFloat(price) || 499.00,
                image: image,
                qty: 1
            });
        }

        if (window.syncProfileCart) {
            window.syncProfileCart();
        }

        // Show visual toast notification
        showWishlistToast(`✓ "${title}" added to your Shopping Bag!`);

        // Open Shopping Cart Drawer automatically
        if (window.openSiteDrawer) {
            window.openSiteDrawer("cart-drawer");
        }
    };

    // 3. Sync Wishlist Grid inside Profile Tab with working Add to Bag & Remove buttons
    function syncProfileWishlist() {
        const wishlistContainer = document.getElementById("profile-wishlist-container");
        const emptyState = document.getElementById("profile-wishlist-empty");

        if (!wishlistContainer) return;

        const wishlist = window.WishlistManager ? window.WishlistManager.items : [];

        if (wishlist.length === 0) {
            if (emptyState) emptyState.style.display = "block";
            wishlistContainer.style.display = "none";
            wishlistContainer.innerHTML = '';
        } else {
            if (emptyState) emptyState.style.display = "none";
            wishlistContainer.style.display = "grid";
            wishlistContainer.innerHTML = wishlist.map(item => {
                const safeTitle = (item.title || 'Afeem Perfume').replace(/'/g, "\\'");
                return `
                <div class="profile-product-card" style="border: 1px solid #eef0f2; padding: 18px; border-radius: 14px; background: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.02); display: flex; flex-direction: column; justify-content: space-between;">
                    <a href="product.html?id=${item.id}" style="text-decoration: none; color: inherit; display: block; cursor: pointer;" title="View ${item.title}">
                        <div style="position: relative; overflow: hidden; border-radius: 10px; margin-bottom: 14px; aspect-ratio: 1/1; background: #f8fafc;">
                            <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;">
                        </div>
                        <h4 style="font-size: 15px; font-weight: 700; margin-bottom: 6px; color: #111; text-transform: uppercase;">${item.title}</h4>
                        <div style="font-size: 14px; color: #2eaaa0; font-weight: 700; margin-bottom: 16px;">Rs. ${item.price ? item.price.toFixed(2) : '499.00'}</div>
                    </a>
                    <div style="display: flex; gap: 10px; flex-direction: column;">
                        <button class="btn btn-primary" style="width: 100%; font-size: 12px; padding: 12px; background: #2f889a; color: #ffffff; border: none; border-radius: 6px; font-weight: 700; cursor: pointer; text-transform: uppercase;" onclick="addWishlistItemToCart('${item.id}', '${safeTitle}', ${item.price || 499}, '${item.image}')">Add to Bag</button>
                        <button class="btn" style="width: 100%; padding: 10px; font-size: 12px; color: #e74c3c; border: 1px solid #fecaca; background: #fff5f5; border-radius: 6px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;" onclick="WishlistManager.toggleItem({id: '${item.id}'}); syncProfileWishlist(); showWishlistToast('Removed from Wishlist');">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                            Remove Item
                        </button>
                    </div>
                </div>
            `;
            }).join('');
        }
    }

    // 4. Sync Shopping Bag inside Profile Tab with Quantity (+/-), Delete & Coupon system
    function syncProfileCart() {
        const cartContainer = document.getElementById("profile-cart-container");
        const emptyState = document.getElementById("profile-cart-empty");
        const cartFooter = document.getElementById("profile-cart-footer-section");

        if (!cartContainer) return;

        const cartItems = window.CartManager ? window.CartManager.items : [];
        const subtotal = window.CartManager ? window.CartManager.getTotalPrice() : 0;
        const discount = window.CartManager ? window.CartManager.getDiscountAmount() : 0;
        const finalTotal = window.CartManager ? window.CartManager.getFinalTotal() : 0;

        if (cartItems.length === 0) {
            if (emptyState) emptyState.style.display = "block";
            cartContainer.style.display = "none";
            cartContainer.innerHTML = '';
            if (cartFooter) cartFooter.style.display = "none";
        } else {
            if (emptyState) emptyState.style.display = "none";
            if (cartFooter) cartFooter.style.display = "block";
            cartContainer.style.display = "flex";
            cartContainer.innerHTML = cartItems.map(item => `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 18px 0; border-bottom: 1px solid #f0f0f0;">
                    <a href="product.html?id=${item.id}" style="display: flex; align-items: center; gap: 16px; text-decoration: none; color: inherit; cursor: pointer;" title="View ${item.title}">
                        <img src="${item.image}" alt="${item.title}" style="width: 64px; height: 64px; object-fit: cover; border-radius: 10px; background: #f8fafc; flex-shrink: 0;">
                        <div>
                            <h4 style="font-size: 15px; font-weight: 700; margin: 0 0 4px 0; color: #111; text-transform: uppercase;">${item.title}</h4>
                            <span style="font-size: 12px; color: #777;">Size: ${item.size} &bull; Unit Price: Rs. ${item.price.toFixed(2)}</span>
                        </div>
                    </a>
                    <div style="display: flex; align-items: center; gap: 24px;">
                        <!-- Quantity Increment/Decrement Controls -->
                        <div style="display: flex; align-items: center; border: 1px solid #dddddd; border-radius: 6px; overflow: hidden; background: #ffffff;">
                            <button style="padding: 6px 14px; border: none; background: #f6f6f6; cursor: pointer; font-weight: bold; font-size: 14px;" onclick="CartManager.updateQty('${item.id}', '${item.size}', -1); syncProfileCart();">-</button>
                            <span style="padding: 6px 14px; font-size: 13px; font-weight: 700;">${item.qty}</span>
                            <button style="padding: 6px 14px; border: none; background: #f6f6f6; cursor: pointer; font-weight: bold; font-size: 14px;" onclick="CartManager.updateQty('${item.id}', '${item.size}', 1); syncProfileCart();">+</button>
                        </div>
                        <div style="font-size: 15px; font-weight: 700; color: #111; min-width: 100px; text-align: right;">
                            Rs. ${(item.price * item.qty).toFixed(2)}
                        </div>
                        <button style="background: #fff5f5; border: 1px solid #fecaca; border-radius: 6px; padding: 8px 12px; font-size: 12px; color: #e74c3c; cursor: pointer; font-weight: 600;" onclick="CartManager.removeItem('${item.id}', '${item.size}'); syncProfileCart();" title="Remove item">
                            🗑️ Delete
                        </button>
                    </div>
                </div>
            `).join('');

            // Render Coupon Section & Total Price Breakdown in Profile Cart Footer
            if (cartFooter) {
                const appliedCoupon = window.CartManager ? window.CartManager.appliedCoupon : null;

                const discountHTML = discount > 0 ? `
                    <div style="display: flex; justify-content: space-between; font-size: 14px; color: #2eaaa0; font-weight: 700; margin-bottom: 6px;">
                        <span>COUPON DISCOUNT (${appliedCoupon.code}):</span>
                        <span>- Rs. ${discount.toFixed(2)}</span>
                    </div>
                ` : '';

                const couponSectionHTML = appliedCoupon ? `
                    <div style="background: #f0fdfa; border: 1px dashed #2eaaa0; padding: 12px 16px; border-radius: 8px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between;">
                        <div>
                            <span style="font-weight: 800; color: #2eaaa0; font-size: 13px; display: block;">✓ ${appliedCoupon.code} APPLIED</span>
                            <span style="font-size: 12px; color: #555;">${appliedCoupon.description}</span>
                        </div>
                        <button onclick="CartManager.removeCoupon(); syncProfileCart();" style="background: none; border: none; color: #e74c3c; font-size: 13px; font-weight: 700; cursor: pointer; padding: 4px;">Remove ✕</button>
                    </div>
                ` : `
                    <div class="cart-coupon-box" style="background: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
                        <button type="button" onclick="const b=document.getElementById('profile-coupon-expand-body'); if(b) b.classList.toggle('hidden');" style="width: 100%; background: #fafafa; border: none; padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; cursor: pointer;">
                            <span style="font-size: 13px; font-weight: 700; color: #111111; display: flex; align-items: center; gap: 8px;">
                                🏷️ Apply Coupon / Choose Offers
                            </span>
                            <span style="font-size: 12px; font-weight: 700; color: #2eaaa0;">Select ▾</span>
                        </button>

                        <div id="profile-coupon-expand-body" class="hidden" style="padding: 16px; border-top: 1px solid #f0f0f0; background: #ffffff;">
                            <!-- 1. Custom Code Input -->
                            <div style="display: flex; gap: 8px; margin-bottom: 12px; max-width: 450px;">
                                <input type="text" id="profile-coupon-input" placeholder="ENTER CODE (e.g. DEAL30)" style="flex: 1; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 12px; text-transform: uppercase; font-weight: 700; outline: none;">
                                <button onclick="if(window.CartManager){ const inp=document.getElementById('profile-coupon-input'); if(inp && inp.value){ CartManager.applyCoupon(inp.value); syncProfileCart(); } }" style="background: #111; color: #fff; border: none; padding: 10px 18px; border-radius: 6px; font-size: 12px; font-weight: 700; cursor: pointer; text-transform: uppercase;">CLAIM</button>
                            </div>

                            <!-- 2. Dropdown Offers Selector -->
                            <span style="display: block; font-size: 11px; color: #666; font-weight: 700; margin-bottom: 6px; text-transform: uppercase;">OR SELECT AVAILABLE OFFER:</span>
                            <div style="display: flex; gap: 8px; max-width: 450px;">
                                <select id="profile-coupon-select-dropdown" style="flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 12px; font-weight: 600; background: #ffffff; color: #333; outline: none; cursor: pointer;">
                                    <option value="">-- Select an Offer --</option>
                                    <option value="DEAL30">DEAL30 - 30% OFF Luxury Perfumes</option>
                                    <option value="AFEEM100">AFEEM100 - Flat ₹100 OFF over ₹499</option>
                                    <option value="SHIPFREE">SHIPFREE - Free Shipping + 10% OFF</option>
                                    <option value="LUXURY20">LUXURY20 - 20% OFF Special Offer</option>
                                    <option value="WELCOME50">WELCOME50 - ₹50 Welcome Offer</option>
                                </select>
                                <button onclick="if(window.CartManager){ const sel=document.getElementById('profile-coupon-select-dropdown'); if(sel && sel.value){ CartManager.applyCoupon(sel.value); syncProfileCart(); } }" style="background: #2eaaa0; color: #ffffff; border: none; padding: 10px 18px; border-radius: 6px; font-size: 12px; font-weight: 700; cursor: pointer; text-transform: uppercase;">APPLY</button>
                            </div>
                        </div>
                    </div>
                `;

                cartFooter.innerHTML = `
                    ${couponSectionHTML}
                    <div style="background: #fafafa; border: 1px solid #eef0f2; border-radius: 10px; padding: 16px; margin-bottom: 24px;">
                        <div style="display: flex; justify-content: space-between; font-size: 14px; color: #666; margin-bottom: 6px;">
                            <span>SUBTOTAL:</span>
                            <span style="font-weight: 600; color: #111;">Rs. ${subtotal.toFixed(2)}</span>
                        </div>
                        ${discountHTML}
                        <div style="display: flex; justify-content: space-between; font-size: 16px; font-weight: 800; color: #111; border-top: 2px solid #111; padding-top: 12px; margin-top: 8px;">
                            <span>TOTAL CART VALUE:</span>
                            <span style="color: #2f889a; font-size: 22px;">Rs. ${finalTotal.toFixed(2)}</span>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <a href="shop.html" class="btn" style="background: linear-gradient(135deg, #2f889a 0%, #1c6d66 100%); color: #ffffff; padding: 16px 48px; font-size: 15px; font-weight: 800; border-radius: 8px; text-decoration: none; display: inline-block; box-shadow: 0 8px 24px rgba(47, 136, 154, 0.38); text-transform: uppercase; letter-spacing: 0.06em;" onclick="alert('Proceeding to Checkout with Total: Rs. ${finalTotal.toFixed(2)}')">BUY NOW &rarr;</a>
                    </div>
                `;
            }
        }
    }

    // 5. Render Address Cards dynamically with Edit, Delete, Set Default actions
    function renderAddressCards() {
        const addressGrid = document.getElementById("profile-address-grid");
        if (!addressGrid) return;

        addressGrid.innerHTML = userAddresses.map(addr => `
            <div style="border: 1px solid ${addr.isDefault ? '#2eaaa0' : '#eef0f2'}; border-radius: 14px; padding: 22px; background: ${addr.isDefault ? '#fafefd' : '#ffffff'}; position: relative; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
                ${addr.isDefault ? '<span style="position: absolute; top: 16px; right: 16px; background: #2eaaa0; color: #fff; padding: 3px 10px; border-radius: 20px; font-size: 10px; font-weight: 700; text-transform: uppercase;">DEFAULT SHIPPING</span>' : ''}
                <h4 style="font-size: 16px; font-weight: 700; margin: 0 0 8px 0;">${addr.name}</h4>
                <p style="font-size: 13px; color: #555; line-height: 1.6; margin: 0 0 16px 0;">
                    ${addr.line}<br>
                    ${addr.city}, ${addr.state} - ${addr.pincode}<br>
                    Phone: ${addr.phone}
                </p>
                <div style="display: flex; gap: 10px; align-items: center; border-top: 1px solid #f0f0f0; padding-top: 14px;">
                    ${!addr.isDefault ? `<button class="btn btn-secondary" style="padding: 6px 12px; font-size: 11px;" onclick="setDefaultAddress('${addr.id}')">Set as Default</button>` : ''}
                    <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 11px;" onclick="editAddress('${addr.id}')">Edit</button>
                    <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 11px; color: #e74c3c; border-color: #fecaca;" onclick="deleteAddress('${addr.id}')">Delete</button>
                </div>
            </div>
        `).join('');
    }

    // Address Action Handlers
    window.setDefaultAddress = function(id) {
        userAddresses.forEach(a => a.isDefault = (a.id === id));
        renderAddressCards();
    };

    window.deleteAddress = function(id) {
        if (confirm("Are you sure you want to delete this address?")) {
            userAddresses = userAddresses.filter(a => a.id !== id);
            renderAddressCards();
        }
    };

    window.editAddress = function(id) {
        const addr = userAddresses.find(a => a.id === id);
        if (!addr) return;
        const newStreet = prompt("Update address line:", addr.line);
        if (newStreet) {
            addr.line = newStreet;
            renderAddressCards();
        }
    };

    // Add New Address Modal Toggle
    const addAddressBtn = document.getElementById("add-address-btn");
    const addressModal = document.getElementById("add-address-modal");
    const closeAddressModalBtn = document.getElementById("close-address-modal");
    const addressForm = document.getElementById("new-address-form");

    if (addAddressBtn && addressModal) {
        addAddressBtn.addEventListener("click", () => {
            addressModal.style.display = "flex";
        });
    }

    if (closeAddressModalBtn && addressModal) {
        closeAddressModalBtn.addEventListener("click", () => {
            addressModal.style.display = "none";
        });
    }

    if (addressForm) {
        addressForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const newAddr = {
                id: "addr-" + Date.now(),
                name: document.getElementById("addr-name").value,
                line: document.getElementById("addr-line").value,
                city: document.getElementById("addr-city").value,
                state: document.getElementById("addr-state").value,
                pincode: document.getElementById("addr-pincode").value,
                phone: document.getElementById("addr-phone").value,
                isDefault: userAddresses.length === 0
            };
            userAddresses.push(newAddr);
            renderAddressCards();
            addressModal.style.display = "none";
            addressForm.reset();
        });
    }

    // Profile Photo Change Handler
    const avatarInput = document.getElementById("avatar-file-input");
    const avatarPreview = document.getElementById("profile-avatar-preview");
    if (avatarInput && avatarPreview) {
        avatarInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    avatarPreview.innerHTML = `<img src="${evt.target.result}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Expose sync functions globally
    window.syncProfileWishlist = syncProfileWishlist;
    window.syncProfileCart = syncProfileCart;
    window.renderAddressCards = renderAddressCards;
    window.showWishlistToast = showWishlistToast;

    // Profile Form Save Feedback
    const profileForm = document.getElementById("personal-info-form");
    if (profileForm) {
        profileForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const toast = document.getElementById("profile-save-toast");
            if (toast) {
                toast.style.display = "block";
                setTimeout(() => toast.style.display = "none", 3000);
            }
        });
    }

    // Initial Sync Execution
    syncProfileWishlist();
    syncProfileCart();
    renderAddressCards();
});
