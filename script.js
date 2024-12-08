const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const pagination = document.querySelector('.pagination');

let currentIndex = 0;
let interval;


images.forEach((_, index) => {
    const dot = document.createElement('div');
    if (index === 0) dot.classList.add('active');
    pagination.appendChild(dot);
    dot.addEventListener('click', () => navigateTo(index));
});


const navigateTo = (index) => {
    currentIndex = index;
    updateSlider();
};

const updateSlider = () => {
    slides.style.transform = `translateX(${-currentIndex * 100}%)`;
    document.querySelectorAll('.pagination div').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
};

const nextSlide = () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlider();
};

const prevSlide = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlider();
};

const startAutoSlide = () => {
    interval = setInterval(nextSlide, 4000);
};

const stopAutoSlide = () => {
    clearInterval(interval);
};

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);
slides.addEventListener('mouseenter', stopAutoSlide);
slides.addEventListener('mouseleave', startAutoSlide);

let touchStartX = 0;
let touchEndX = 0;

slides.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
});

slides.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    if (touchEndX < touchStartX) nextSlide();
    if (touchEndX > touchStartX) prevSlide();
});

startAutoSlide();
