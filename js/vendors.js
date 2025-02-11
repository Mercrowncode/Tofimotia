// Vendor Data
const vendors = [
    {
        id: 1,
        name: "The Grand Ballroom",
        location: "Victoria Island, Lagos",
        category: "wedding",
        rating: 4.8,
        reviews: 128,
        price: "₦500,000",
        capacity: "500-1000",
        image: "public/assets/venue1.jpg",
        featured: true
    },
    {
        id: 2,
        name: "Landmark Event Center",
        location: "Oniru, Lagos",
        category: "corporate",
        rating: 4.9,
        reviews: 256,
        price: "₦750,000",
        capacity: "1000-2000",
        image: "public/assets/venue2.jpg",
        featured: true
    },
    {
        id: 3,
        name: "Balmoral Convention Center",
        location: "Federal Palace Hotel, Lagos",
        category: "corporate",
        rating: 4.7,
        reviews: 189,
        price: "₦650,000",
        capacity: "800-1500",
        image: "public/assets/venue3.jpg",
        featured: true
    },
    {
        id: 4,
        name: "Ocean View Gardens",
        location: "Lekki, Lagos",
        category: "party",
        rating: 4.6,
        reviews: 94,
        price: "₦350,000",
        capacity: "200-400",
        image: "public/assets/venue4.jpg",
        featured: true
    },
    {
        id: 5,
        name: "Eko Hotels & Suites",
        location: "Victoria Island, Lagos",
        category: "wedding",
        rating: 4.9,
        reviews: 312,
        price: "₦1,200,000",
        capacity: "1500-3000",
        image: "public/assets/venue5.jpg",
        featured: true
    },
    {
        id: 6,
        name: "Oriental Hotel",
        location: "Lekki, Lagos",
        category: "corporate",
        rating: 4.7,
        reviews: 167,
        price: "₦850,000",
        capacity: "800-1200",
        image: "public/assets/venue6.jpg",
        featured: true
    },
    {
        id: 7,
        name: "The Civic Center",
        location: "Victoria Island, Lagos",
        category: "corporate",
        rating: 4.8,
        reviews: 203,
        price: "₦950,000",
        capacity: "1000-2500",
        image: "public/assets/venue7.jpg",
        featured: true
    },
    {
        id: 8,
        name: "Muson Centre",
        location: "Onikan, Lagos",
        category: "wedding",
        rating: 4.6,
        reviews: 142,
        price: "₦600,000",
        capacity: "500-800",
        image: "public/assets/venue8.jpg",
        featured: true
    },
    {
        id: 9,
        name: "The Haven Event Center",
        location: "Ikeja GRA, Lagos",
        category: "party",
        rating: 4.7,
        reviews: 98,
        price: "₦450,000",
        capacity: "300-600",
        image: "public/assets/venue9.jpg",
        featured: true
    },
    {
        id: 10,
        name: "Radisson Blu Anchorage",
        location: "Victoria Island, Lagos",
        category: "corporate",
        rating: 4.8,
        reviews: 176,
        price: "₦900,000",
        capacity: "700-1000",
        image: "public/assets/venue10.jpg",
        featured: true
    },
    {
        id: 11,
        name: "The Blue Roof",
        location: "Ikeja, Lagos",
        category: "party",
        rating: 4.5,
        reviews: 87,
        price: "₦400,000",
        capacity: "400-800",
        image: "public/assets/venue11.jpg",
        featured: true
    },
    {
        id: 12,
        name: "LASWA Ferry Terminal",
        location: "Falomo, Lagos",
        category: "party",
        rating: 4.6,
        reviews: 64,
        price: "₦550,000",
        capacity: "200-400",
        image: "public/assets/venue12.jpg",
        featured: true
    },
    {
        id: 13,
        name: "Lagos Continental Hotel",
        location: "Victoria Island, Lagos",
        category: "wedding",
        rating: 4.9,
        reviews: 234,
        price: "₦1,100,000",
        capacity: "1000-2000",
        image: "public/assets/venue13.jpg",
        featured: true
    },
    {
        id: 14,
        name: "The Wheatbaker",
        location: "Ikoyi, Lagos",
        category: "corporate",
        rating: 4.8,
        reviews: 156,
        price: "₦800,000",
        capacity: "400-600",
        image: "public/assets/venue14.jpg",
        featured: true
    },
    {
        id: 15,
        name: "Terra Kulture",
        location: "Victoria Island, Lagos",
        category: "party",
        rating: 4.7,
        reviews: 112,
        price: "₦500,000",
        capacity: "300-500",
        image: "public/assets/venue15.jpg",
        featured: true
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const filtersBtn = document.getElementById('filtersBtn');
    const filtersPanel = document.getElementById('filtersPanel');
    const searchBtn = document.getElementById('searchBtn');
    const vendorSearch = document.getElementById('vendorSearch');
    const locationSearch = document.getElementById('locationSearch');
    const vendorsGrid = document.getElementById('vendorsGrid');

    // Toggle filters panel on mobile
    if (filtersBtn) {
        filtersBtn.addEventListener('click', function() {
            filtersPanel.classList.toggle('active');
        });

        // Close filters panel when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('#filtersPanel') && 
                !e.target.closest('#filtersBtn') && 
                filtersPanel.classList.contains('active')) {
                filtersPanel.classList.remove('active');
            }
        });
    }

    // Handle search
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = vendorSearch.value.toLowerCase();
            const location = locationSearch.value.toLowerCase();
            
            // Filter vendors based on search criteria
            const filteredVendors = vendors.filter(vendor => {
                const matchesSearch = vendor.name.toLowerCase().includes(searchTerm) ||
                                   vendor.category.toLowerCase().includes(searchTerm) ||
                                   vendor.description.toLowerCase().includes(searchTerm);
                const matchesLocation = !location || vendor.location.toLowerCase().includes(location);
                return matchesSearch && matchesLocation;
            });

            displayVendors(filteredVendors);
        });
    }

    // Display vendors in grid
    function displayVendors(vendorsToShow) {
        if (!vendorsGrid) return;

        vendorsGrid.innerHTML = vendorsToShow.map(vendor => `
            <div class="vendor-card">
                <div class="vendor-image">
                    <img src="${vendor.image}" alt="${vendor.name}">
                </div>
                <div class="vendor-info">
                    <h3>${vendor.name}</h3>
                    <div class="vendor-meta">
                        <span class="category">${vendor.category}</span>
                        <span class="rating">
                            <i class="fas fa-star"></i>
                            ${vendor.rating}
                        </span>
                        <span class="price">${vendor.price}</span>
                    </div>
                    <p class="location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${vendor.location}
                    </p>
                    <p class="description">${vendor.description}</p>
                    <button class="view-profile">View Profile</button>
                </div>
            </div>
        `).join('');
    }

    // Initial display of vendors
    displayVendors(vendors);

    // Handle filter changes
    const filterCheckboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Get all selected filters
            const selectedFilters = Array.from(filterCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);

            // Filter vendors based on selected filters
            const filteredVendors = vendors.filter(vendor => {
                if (selectedFilters.length === 0) return true;
                return selectedFilters.some(filter => {
                    // Add filter logic based on your requirements
                    return vendor.category.toLowerCase() === filter ||
                           (filter === '4plus' && vendor.rating >= 4) ||
                           (filter === '3plus' && vendor.rating >= 3);
                });
            });

            displayVendors(filteredVendors);
        });
    });

    const vendorsCarousel = document.querySelector('.vendors-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    let currentCategory = 'all';
    let currentPosition = 0;

    // Create vendor card
    function createVendorCard(vendor) {
        return `
            <div class="vendor-card ${vendor.category}">
                <div class="vendor-image">
                    <img src="${vendor.image}" alt="${vendor.name}">
                    <div class="vendor-category">${vendor.category}</div>
                </div>
                <div class="vendor-info">
                    <h3>${vendor.name}</h3>
                    <p class="location"><i class="fas fa-map-marker-alt"></i> ${vendor.location}</p>
                    <div class="vendor-meta">
                        <div class="rating">
                            <i class="fas fa-star"></i>
                            <span>${vendor.rating}</span>
                            <span class="reviews">(${vendor.reviews} reviews)</span>
                        </div>
                        <div class="capacity">
                            <i class="fas fa-users"></i>
                            <span>${vendor.capacity}</span>
                        </div>
                    </div>
                    <div class="vendor-footer">
                        <div class="price">${vendor.price}</div>
                        <a href="#" class="btn btn-outline">View Details</a>
                    </div>
                </div>
            </div>
        `;
    }

    // Display vendors
    function displayVendorsCarousel() {
        const filteredVendors = currentCategory === 'all' 
            ? vendors 
            : vendors.filter(vendor => vendor.category === currentCategory);
        
        vendorsCarousel.innerHTML = filteredVendors
            .map(vendor => createVendorCard(vendor))
            .join('');
    }

    // Filter vendors
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.filter;
            currentPosition = 0;
            displayVendorsCarousel();
            updateCarouselPosition();
        });
    });

    // Carousel navigation
    function updateCarouselPosition() {
        vendorsCarousel.style.transform = `translateX(-${currentPosition}px)`;
    }

    function moveCarousel(direction) {
        const cardWidth = document.querySelector('.vendor-card').offsetWidth + 24; // card width + gap
        const containerWidth = vendorsCarousel.parentElement.offsetWidth;
        const maxPosition = vendorsCarousel.scrollWidth - containerWidth;

        if (direction === 'next') {
            currentPosition = Math.min(currentPosition + cardWidth, maxPosition);
        } else {
            currentPosition = Math.max(currentPosition - cardWidth, 0);
        }

        updateCarouselPosition();
    }

    nextBtn.addEventListener('click', () => moveCarousel('next'));
    prevBtn.addEventListener('click', () => moveCarousel('prev'));

    // Initial display
    displayVendorsCarousel();
});
