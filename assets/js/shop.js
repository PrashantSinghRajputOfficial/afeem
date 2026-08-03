/* ==========================================================================
   Catalog Page Controller - Real-time Filter & Sort Engine (Vanilla JS)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Full Real Catalog Products Data (Scraped from afeem.in)
    const CATALOG_PRODUCTS = [
        {
            id: "afeem-ocean",
            title: "Afeem - Ocean",
            price: 499.00,
            comparePrice: 999.00,
            rating: 4.8,
            reviewCount: 42,
            isBestSeller: true,
            category: "100ml new",
            scentFamily: "Oceanic",
            images: ["assets/images/products/ocean-1.webp", "assets/images/products/ocean-2.webp"]
        },
        {
            id: "afeem-loop",
            title: "Afeem - Loop",
            price: 499.00,
            comparePrice: 999.00,
            rating: 4.9,
            reviewCount: 38,
            isBestSeller: true,
            category: "100ml new",
            scentFamily: "Woody",
            images: ["assets/images/products/loop-1.webp", "assets/images/products/loop-2.webp"]
        },
        {
            id: "afeem-combat",
            title: "Afeem - Combat",
            price: 499.00,
            comparePrice: 999.00,
            rating: 4.7,
            reviewCount: 29,
            isBestSeller: true,
            category: "100ml new",
            scentFamily: "Spicy",
            images: ["assets/images/products/combat-1.webp", "assets/images/products/loop-2.webp"]
        },
        {
            id: "afeem-buzz",
            title: "Afeem - Buzz",
            price: 499.00,
            comparePrice: 999.00,
            rating: 4.6,
            reviewCount: 31,
            isBestSeller: false,
            category: "100ml new",
            scentFamily: "Citrus",
            images: ["assets/images/products/buzz-1.webp", "assets/images/products/buzz-2.webp"]
        },
        {
            id: "afeem-aura",
            title: "Afeem - Aura",
            price: 299.00,
            comparePrice: 499.00,
            rating: 4.9,
            reviewCount: 15,
            isBestSeller: false,
            category: "2026 new",
            scentFamily: "Floral",
            images: ["assets/images/products/aura-1.webp", "assets/images/products/ocean-2.webp"]
        },
        {
            id: "afeem-guilty",
            title: "Afeem - Guilty",
            price: 299.00,
            comparePrice: 499.00,
            rating: 4.8,
            reviewCount: 24,
            isBestSeller: false,
            category: "2026 new",
            scentFamily: "Spicy",
            images: ["assets/images/products/combat-1.webp", "assets/images/products/combat-2.webp"]
        },
        {
            id: "afeem-pure",
            title: "Afeem - Pure",
            price: 299.00,
            comparePrice: 499.00,
            rating: 4.7,
            reviewCount: 19,
            isBestSeller: false,
            category: "2026 new",
            scentFamily: "Fresh",
            images: ["assets/images/products/ocean-1.webp", "assets/images/products/buzz-2.webp"]
        },
        {
            id: "afeem-raid",
            title: "Afeem - Raid",
            price: 299.00,
            comparePrice: 499.00,
            rating: 4.9,
            reviewCount: 33,
            isBestSeller: false,
            category: "2026 new",
            scentFamily: "Woody",
            images: ["assets/images/products/loop-1.webp", "assets/images/products/ocean-1.webp"]
        },
        {
            id: "afeem-royal",
            title: "Afeem - Royal",
            price: 299.00,
            comparePrice: 499.00,
            rating: 5.0,
            reviewCount: 52,
            isBestSeller: false,
            category: "prime 2026",
            scentFamily: "Oudh",
            images: ["assets/images/products/buzz-1.webp", "assets/images/products/loop-2.webp"]
        },
        {
            id: "afeem-intense-ocean",
            title: "Afeem - Intense Ocean",
            price: 599.00,
            comparePrice: 1099.00,
            rating: 4.9,
            reviewCount: 67,
            isBestSeller: true,
            category: "prime 2026",
            scentFamily: "Oceanic",
            images: ["assets/images/products/ocean-2.webp", "assets/images/products/ocean-1.webp"]
        },
        {
            id: "afeem-velvet",
            title: "Afeem - Velvet Scent",
            price: 399.00,
            comparePrice: 699.00,
            rating: 4.8,
            reviewCount: 28,
            isBestSeller: false,
            category: "100ml old",
            scentFamily: "Floral",
            images: ["assets/images/products/aura-1.webp", "assets/images/products/buzz-1.webp"]
        },
        {
            id: "afeem-midnight",
            title: "Afeem - Midnight Secret",
            price: 499.00,
            comparePrice: 899.00,
            rating: 4.9,
            reviewCount: 45,
            isBestSeller: false,
            category: "100ml old",
            scentFamily: "Amber",
            images: ["assets/images/products/loop-2.webp", "assets/images/products/combat-1.webp"]
        }
    ];

    // State
    let currentProducts = [...CATALOG_PRODUCTS];
    let activeCategory = "all";
    let selectedPriceRanges = [];
    let activeScent = "all";
    let currentSort = "default";

    // Element references
    const bestSellersGrid = document.getElementById("bestsellers-product-grid");
    const allProductsGrid = document.getElementById("all-products-grid");
    const sortSelect = document.getElementById("catalog-sort");
    const openFilterBtn = document.getElementById("open-filter-drawer-btn");
    const topFilterPanel = document.getElementById("top-filter-panel");

    // B. Render All Products Collection Grid
    function renderAllProducts() {
        if (!allProductsGrid) return;

        if (currentProducts.length === 0) {
            allProductsGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px 0; color: #777;">
                    <h4>No fragrances match your selected filters.</h4>
                    <p style="font-size: 13px;">Try clearing filters or selecting another scent notes option.</p>
                </div>
            `;
            return;
        }

        allProductsGrid.innerHTML = currentProducts.map(p => `
            <article class="afeem-product-card product-card" data-product-id="${p.id}">
                <div class="afeem-card-img-link">
                    <span class="badge sale">Sale</span>
                    <a href="product.html?id=${p.id}">
                        <img src="${p.images[0]}" alt="${p.title}" class="afeem-card-img main-image">
                        <img src="${p.images[1] || p.images[0]}" alt="${p.title}" class="afeem-card-img hover-image">
                    </a>
                    <div class="afeem-card-actions">
                        <button class="action-btn quick-view" data-product-id="${p.id}" aria-label="Quick View">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        </button>
                        <button class="action-btn add-to-wishlist" data-product-id="${p.id}" aria-label="Wishlist">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        </button>
                    </div>
                </div>
                <div class="afeem-card-info">
                    <h3 class="afeem-card-name"><a href="product.html?id=${p.id}">${p.title}</a></h3>
                    <div class="afeem-card-rating">
                        <span class="stars-gold">★★★★★</span>
                        <span class="rating-count">(${p.reviewCount})</span>
                    </div>
                    <div class="afeem-card-price">
                        <span class="price-current">Rs. ${p.price.toFixed(2)}</span>
                        <span class="price-strike">Rs. ${p.comparePrice ? p.comparePrice.toFixed(2) : '999.00'}</span>
                    </div>
                </div>
            </article>
        `).join('');

        // Trigger Wishlist state sync after DOM update
        if (window.WishlistManager) {
            window.WishlistManager.updateDOM();
        }
    }

    // C. Central Real-Time Filter & Sort Processor
    function applyFiltersAndSort() {
        let filtered = [...CATALOG_PRODUCTS];

        // 1. Filter by Category / Collection Range
        if (activeCategory && activeCategory !== "all") {
            filtered = filtered.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
        }

        // 2. Filter by Price Range Checkboxes
        if (selectedPriceRanges.length > 0) {
            filtered = filtered.filter(p => {
                return selectedPriceRanges.some(range => {
                    if (range === "100-200") return p.price >= 100 && p.price <= 200;
                    if (range === "200-300") return p.price >= 200 && p.price <= 300;
                    if (range === "300-400") return p.price >= 300 && p.price <= 400;
                    if (range === "400-500") return p.price >= 400 && p.price <= 500;
                    if (range === "500-1000") return p.price >= 500;
                    return true;
                });
            });
        }

        // 3. Filter by Scent Family
        if (activeScent && activeScent !== "all") {
            filtered = filtered.filter(p => p.scentFamily.toLowerCase().includes(activeScent.toLowerCase()));
        }

        // 4. Sorting
        if (currentSort === "bestseller") {
            filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        } else if (currentSort === "price-low-high") {
            filtered.sort((a, b) => a.price - b.price);
        } else if (currentSort === "price-high-low") {
            filtered.sort((a, b) => b.price - a.price);
        } else if (currentSort === "rating") {
            filtered.sort((a, b) => b.rating - a.rating);
        }

        currentProducts = filtered;
        renderAllProducts();

        // Update live status text label
        const statusLabel = document.getElementById("filter-active-count-label");
        if (statusLabel) {
            statusLabel.textContent = `Showing ${filtered.length} of ${CATALOG_PRODUCTS.length} Fragrances`;
        }
    }

    // D. Event Listeners for Filters & Sorting
    
    // 1. Category Links Click Listener
    document.querySelectorAll(".filter-link-list a").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelectorAll(".filter-link-list a").forEach(l => l.classList.remove("active"));
            link.classList.add("active");
            activeCategory = link.getAttribute("data-category") || "all";
            applyFiltersAndSort();
        });
    });

    // 2. Price Checkboxes Change Listener
    document.querySelectorAll('input[name="filter-price"]').forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            selectedPriceRanges = Array.from(document.querySelectorAll('input[name="filter-price"]:checked')).map(cb => cb.value);
            applyFiltersAndSort();
        });
    });

    // 3. Size Swatch Click Listener
    document.querySelectorAll(".size-swatch-boxes .size-box").forEach(box => {
        box.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelectorAll(".size-swatch-boxes .size-box").forEach(b => b.classList.remove("active"));
            box.classList.add("active");
            applyFiltersAndSort();
        });
    });

    // 4. Color & Scent Notes Click Listener
    document.querySelectorAll(".color-dots-list li").forEach(item => {
        item.addEventListener("click", () => {
            const isAlreadyActive = item.classList.contains("active");
            document.querySelectorAll(".color-dots-list li").forEach(i => i.classList.remove("active"));
            
            if (!isAlreadyActive) {
                item.classList.add("active");
                activeScent = item.getAttribute("data-scent") || "all";
            } else {
                activeScent = "all";
            }
            applyFiltersAndSort();
        });
    });

    // 5. Reset All Filters Button
    const clearFiltersBtn = document.getElementById("clear-all-filters-btn");
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener("click", () => {
            activeCategory = "all";
            selectedPriceRanges = [];
            activeScent = "all";
            currentSort = "default";

            document.querySelectorAll(".filter-link-list a").forEach(l => l.classList.remove("active"));
            const defaultCat = document.querySelector('.filter-link-list a[data-category="all"]');
            if (defaultCat) defaultCat.classList.add("active");

            document.querySelectorAll('input[name="filter-price"]').forEach(cb => cb.checked = false);

            document.querySelectorAll(".size-swatch-boxes .size-box").forEach(b => b.classList.remove("active"));
            const defaultSize = document.querySelector('.size-swatch-boxes .size-box[data-size="all"]');
            if (defaultSize) defaultSize.classList.add("active");

            document.querySelectorAll(".color-dots-list li").forEach(i => i.classList.remove("active"));

            if (sortSelect) sortSelect.value = "default";

            applyFiltersAndSort();
        });
    }

    // 5. Sorting Dropdown Listener
    if (sortSelect) {
        sortSelect.addEventListener("change", (e) => {
            currentSort = e.target.value;
            applyFiltersAndSort();
        });
    }

    // Top Horizontal Dropdown Filters Click Handlers (Image 3 Wireframe)
    const dropdownWrappers = document.querySelectorAll(".filter-dropdown-wrapper");
    dropdownWrappers.forEach(wrapper => {
        const btn = wrapper.querySelector(".filter-dropdown-btn");
        if (btn) {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                dropdownWrappers.forEach(other => {
                    if (other !== wrapper) other.classList.remove("open");
                });
                wrapper.classList.toggle("open");
            });
        }
    });

    document.addEventListener("click", () => {
        dropdownWrappers.forEach(wrapper => wrapper.classList.remove("open"));
    });

    // Mobile Filter Drawer Controls (<768px Phone Only)
    const mobileDrawer = document.getElementById("mobile-filter-drawer");
    const openMobileDrawerBtn = document.getElementById("open-mobile-filter-drawer-btn");
    const closeMobileDrawerBtn = document.getElementById("close-mobile-filter-drawer-btn");
    const mobileBackdrop = document.getElementById("mobile-filter-backdrop");
    const mobileApplyBtn = document.getElementById("mobile-apply-filters-btn");
    const mobileResetBtn = document.getElementById("mobile-reset-filters-btn");
    const mobileSortSelect = document.getElementById("mobile-catalog-sort");

    const openMobileDrawer = () => {
        if (mobileDrawer) {
            mobileDrawer.classList.remove("hidden");
            mobileDrawer.setAttribute("aria-hidden", "false");
        }
    };

    const closeMobileDrawer = () => {
        if (mobileDrawer) {
            mobileDrawer.classList.add("hidden");
            mobileDrawer.setAttribute("aria-hidden", "true");
        }
    };

    if (openMobileDrawerBtn) openMobileDrawerBtn.addEventListener("click", openMobileDrawer);
    if (closeMobileDrawerBtn) closeMobileDrawerBtn.addEventListener("click", closeMobileDrawer);
    if (mobileBackdrop) mobileBackdrop.addEventListener("click", closeMobileDrawer);

    // Mobile Category Dropdown Selector Sync
    const mobileCatSelect = document.getElementById("mobile-category-select");
    if (mobileCatSelect) {
        mobileCatSelect.addEventListener("change", (e) => {
            const cat = e.target.value;
            activeCategory = cat;
            document.querySelectorAll(".filter-link-list a").forEach(l => {
                if ((l.getAttribute("data-category") || "all") === cat) l.classList.add("active");
                else l.classList.remove("active");
            });
            applyFiltersAndSort();
        });
    }

    // Mobile Price Checkbox Sync
    document.querySelectorAll('input[name="mobile-filter-price"]').forEach(cb => {
        cb.addEventListener("change", () => {
            selectedPriceRanges = Array.from(document.querySelectorAll('input[name="mobile-filter-price"]:checked')).map(c => c.value);
            document.querySelectorAll('input[name="filter-price"]').forEach(dCb => {
                dCb.checked = selectedPriceRanges.includes(dCb.value);
            });
        });
    });

    // Mobile Size Swatches Sync
    document.querySelectorAll(".mobile-size-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelectorAll(".mobile-size-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const sz = btn.getAttribute("data-size") || "all";
            document.querySelectorAll(".size-swatch-boxes .size-box").forEach(dB => {
                if ((dB.getAttribute("data-size") || "all") === sz) dB.classList.add("active");
                else dB.classList.remove("active");
            });
        });
    });

    // Mobile Scent Grid Sync
    document.querySelectorAll(".mobile-scent-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelectorAll(".mobile-scent-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const sct = btn.getAttribute("data-scent") || "all";
            activeScent = sct;
            document.querySelectorAll(".color-dots-list li").forEach(dL => {
                if ((dL.getAttribute("data-scent") || "all") === sct) dL.classList.add("active");
                else dL.classList.remove("active");
            });
        });
    });

    // Mobile Sort Sync
    if (mobileSortSelect) {
        mobileSortSelect.addEventListener("change", (e) => {
            currentSort = e.target.value;
            if (sortSelect) sortSelect.value = currentSort;
        });
    }

    // Mobile Apply Button
    if (mobileApplyBtn) {
        mobileApplyBtn.addEventListener("click", () => {
            applyFiltersAndSort();
            closeMobileDrawer();
        });
    }

    // Mobile Reset Button
    if (mobileResetBtn) {
        mobileResetBtn.addEventListener("click", () => {
            if (clearFiltersBtn) clearFiltersBtn.click();
            document.querySelectorAll('input[name="mobile-filter-price"]').forEach(c => c.checked = false);
            document.querySelectorAll(".mobile-size-btn").forEach(b => b.classList.remove("active"));
            const defaultMobileSize = document.querySelector('.mobile-size-btn[data-size="all"]');
            if (defaultMobileSize) defaultMobileSize.classList.add("active");

            document.querySelectorAll(".mobile-scent-btn").forEach(b => b.classList.remove("active"));
            const defaultMobileScent = document.querySelector('.mobile-scent-btn[data-scent="all"]');
            if (defaultMobileScent) defaultMobileScent.classList.add("active");

            if (mobileSortSelect) mobileSortSelect.value = "default";
            applyFiltersAndSort();
            closeMobileDrawer();
        });
    }

    // F. Process URL Search Parameters (Redirected from Search Bar)
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const searchQuery = getQueryParam("search");
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        currentProducts = CATALOG_PRODUCTS.filter(p => 
            p.title.toLowerCase().includes(q) || 
            p.scentFamily.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
        );

        // Render search result pill banner at top of catalog header
        const catalogHeader = document.querySelector(".catalog-header-section .container");
        if (catalogHeader) {
            const pill = document.createElement("div");
            pill.style.cssText = "margin-top: 14px; display: inline-flex; align-items: center; gap: 10px; background: #eef8f7; border: 1px solid #2eaaa0; padding: 6px 18px; border-radius: 20px; font-size: 13px; color: #111;";
            pill.innerHTML = `
                <span>Showing search results for: <strong>"${searchQuery}"</strong> (${currentProducts.length} ${currentProducts.length === 1 ? 'item' : 'items'})</span>
                <a href="shop.html" style="color: #e74c3c; text-decoration: none; font-weight: bold; margin-left: 6px;" title="Clear Search">&times; Clear</a>
            `;
            catalogHeader.appendChild(pill);
        }
    }

    // Initialize Catalog Page
    renderAllProducts();
});
