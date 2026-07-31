/* ==========================================================================
   Side Drawers & Modals Controller - AFEEM Fragrances (Vanilla JS)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Overlay & Drawer Trigger mappings
    const drawerMappings = [
        { triggerId: "menu-toggle", drawerId: "mobile-menu-drawer" },
        { triggerId: "cart-trigger", drawerId: "cart-drawer" },
        { triggerId: "wishlist-trigger", drawerId: "wishlist-drawer" },
        { triggerId: "account-trigger", drawerId: "account-drawer" }
    ];

    drawerMappings.forEach(({ triggerId, drawerId }) => {
        const trigger = document.getElementById(triggerId);
        const drawer = document.getElementById(drawerId);

        if (trigger && drawer) {
            trigger.addEventListener("click", (e) => {
                e.preventDefault();
                openDrawer(drawer);
            });
        }
    });

    // 2. Search Overlay Trigger Mapping (different structure from normal drawers)
    const searchTrigger = document.getElementById("search-trigger");
    const searchClose = document.getElementById("search-close-btn");
    const searchPanel = document.getElementById("search-panel");

    if (searchTrigger && searchPanel) {
        searchTrigger.addEventListener("click", (e) => {
            e.preventDefault();
            searchPanel.setAttribute("aria-hidden", "false");
            const searchInput = document.getElementById("search-input");
            if (searchInput) setTimeout(() => searchInput.focus(), 200);
        });
    }
    if (searchClose && searchPanel) {
        searchClose.addEventListener("click", () => {
            searchPanel.setAttribute("aria-hidden", "true");
        });
    }

    // 3. Close listener for all drawer overlays & close buttons
    document.querySelectorAll(".drawer").forEach(drawer => {
        const closeBtns = drawer.querySelectorAll(".drawer-close, [data-close]");
        const closeDrawerFn = () => closeDrawer(drawer);

        closeBtns.forEach(btn => btn.addEventListener("click", closeDrawerFn));
    });

    // Close search bg click
    if (searchPanel) {
        const searchBg = searchPanel.querySelector(".search-overlay-bg");
        if (searchBg) {
            searchBg.addEventListener("click", () => {
                searchPanel.setAttribute("aria-hidden", "true");
            });
        }
    }

    // 4. Auth Panel toggler inside Account Drawer
    const accountDrawer = document.getElementById("account-drawer");
    if (accountDrawer) {
        const switchButtons = accountDrawer.querySelectorAll(".switch-panel-btn");
        switchButtons.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const targetPanelId = btn.getAttribute("data-target");
                const targetPanel = document.getElementById(targetPanelId);

                if (targetPanel) {
                    // Hide other panels
                    accountDrawer.querySelectorAll(".account-panel").forEach(p => p.classList.remove("active"));
                    // Show target
                    targetPanel.classList.add("active");

                    // Update drawer header title
                    const titleEl = document.getElementById("account-drawer-title");
                    if (titleEl) {
                        if (targetPanelId === "panel-login") titleEl.textContent = "Login";
                        else if (targetPanelId === "panel-register") titleEl.textContent = "Register";
                        else if (targetPanelId === "panel-recover") titleEl.textContent = "Reset Password";
                    }
                }
            });
        });
    }
});

// Helper Functions
function openDrawer(drawer) {
    drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Prevent body scrolling
}

function closeDrawer(drawer) {
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // Restore body scrolling
}

// Globally expose drawer opening if needed by other files
window.openSiteDrawer = (drawerId) => {
    const drawer = document.getElementById(drawerId);
    if (drawer) openDrawer(drawer);
};
