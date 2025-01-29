document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const carousel = document.querySelector('.vendors-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const vendorCards = document.querySelectorAll('.vendor-card');

    // Carousel Navigation
    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: 320,
            behavior: 'smooth'
        });
    });

    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: -320,
            behavior: 'smooth'
        });
    });

    // Category Filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            vendorCards.forEach(card => {
                if (filter === 'all' || card.dataset.category.includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // View Details Button
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const vendorName = this.closest('.vendor-info').querySelector('h3').textContent;
            alert(`Viewing details for ${vendorName}`); // Replace with actual implementation
        });
    });

    // View All Button
    const viewAllBtn = document.querySelector('.view-all-btn');
    viewAllBtn.addEventListener('click', () => {
        alert('Redirecting to all vendors page'); // Replace with actual implementation
    });

    // Smooth scrolling for the carousel
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.style.cursor = 'grabbing';
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });
});
