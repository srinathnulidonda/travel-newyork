function updateTime() {
    const now = new Date();
    const options = { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', hour12: true };
    const timeString = now.toLocaleTimeString('en-US', options);
    document.getElementById('liveTime').textContent = timeString;
}
updateTime();
setInterval(updateTime, 1000);

const nav = document.getElementById('mainNav');
const toggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');

window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

window.addEventListener('scroll', () => {
    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
        const scrolled = window.pageYOffset;
        heroVideo.style.transform = `scale(1.08) translateY(${scrolled * 0.5}px)`;
    }
}, { passive: true });

toggle.addEventListener('click', () => {
    const open = toggle.classList.toggle('open');
    mobileNav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav__mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobileNav.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

const landmarkData = [
    {
        key: 'liberty',
        title: 'Statue of Liberty',
        location: 'Liberty Island',
        desc: 'A colossal neoclassical sculpture on Liberty Island — a gift from France dedicated on October 28, 1886. Now an enduring global symbol of freedom and the American dream.',
        facts: [
            { icon: 'fa-ruler-vertical', label: 'Height', value: '151 ft (46 m)' },
            { icon: 'fa-calendar-alt', label: 'Dedicated', value: 'October 28, 1886' },
            { icon: 'fa-users', label: 'Annual Visitors', value: '4.5 Million' },
        ],
        img: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=1200&q=80',
    },
    {
        key: 'empire',
        title: 'Empire State Building',
        location: 'Midtown Manhattan',
        desc: "Standing at 1,454 feet, the Empire State Building remained the world's tallest building for 40 years. Its 86th-floor observatory offers unparalleled 360° views across five states.",
        facts: [
            { icon: 'fa-ruler-vertical', label: 'Height', value: '1,454 ft (443 m)' },
            { icon: 'fa-calendar-alt', label: 'Completed', value: 'April 11, 1931' },
            { icon: 'fa-users', label: 'Annual Visitors', value: '4 Million' },
        ],
        img: 'https://images.unsplash.com/photo-1555109307-f7d9da25c244?w=1200&q=80',
    },
    {
        key: 'centralpark',
        title: 'Central Park',
        location: 'Upper Manhattan',
        desc: '843 acres of meticulously designed urban parkland in the heart of Manhattan. Home to 50 fountains, 36 bridges, over 9,000 benches, and 500,000 trees.',
        facts: [
            { icon: 'fa-expand-arrows-alt', label: 'Area', value: '843 acres' },
            { icon: 'fa-calendar-alt', label: 'Established', value: '1858' },
            { icon: 'fa-users', label: 'Annual Visitors', value: '42 Million' },
        ],
        img: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1200&q=80',
    },
];

let currentSlide = 0;
const track = document.getElementById('carouselTrack');
const dots = document.querySelectorAll('.carousel__dot');

function goToSlide(index) {
    currentSlide = (index + landmarkData.length) % landmarkData.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((d, i) => {
        d.classList.toggle('active', i === currentSlide);
        d.setAttribute('aria-selected', i === currentSlide);
    });

    const data = landmarkData[currentSlide];
    document.getElementById('landmarkTitle').textContent = data.title;
    document.getElementById('landmarkDesc').textContent = data.desc;

    document.getElementById('landmarkFacts').innerHTML = data.facts.map(f => `
    <li class="landmark-fact">
      <div class="landmark-fact__icon"><i class="fas ${f.icon}" aria-hidden="true"></i></div>
      <div>
        <p class="landmark-fact__label">${f.label}</p>
        <p class="landmark-fact__value">${f.value}</p>
      </div>
    </li>
  `).join('');

    document.getElementById('landmarkBookBtn')
        .setAttribute('onclick', `openModal('${data.key}')`);
}

document.getElementById('carouselNext').addEventListener('click', () => goToSlide(currentSlide + 1));
document.getElementById('carouselPrev').addEventListener('click', () => goToSlide(currentSlide - 1));
dots.forEach(dot => dot.addEventListener('click', () => goToSlide(+dot.dataset.slide)));

let autoSlide = setInterval(() => goToSlide(currentSlide + 1), 5000);

document.querySelector('.carousel').addEventListener('mouseenter', () => clearInterval(autoSlide));
document.querySelector('.carousel').addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => goToSlide(currentSlide + 1), 5000);
});

document.querySelector('.carousel').addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
    if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
});

const nyMarkers = [
    { name: 'Statue of Liberty', area: 'Liberty Island', lat: 40.6892, lng: -74.0445 },
    { name: 'Empire State Building', area: 'Midtown Manhattan', lat: 40.7484, lng: -73.9967 },
    { name: 'Central Park', area: 'Upper Manhattan', lat: 40.7851, lng: -73.9683 },
    { name: 'Times Square', area: 'Midtown', lat: 40.7580, lng: -73.9855 },
    { name: 'Brooklyn Bridge', area: 'Lower Manhattan', lat: 40.7061, lng: -73.9969 },
    { name: 'Metropolitan Museum', area: 'Upper East Side', lat: 40.7794, lng: -73.9632 },
    { name: 'One World Trade Center', area: 'Lower Manhattan', lat: 40.7127, lng: -74.0134 },
    { name: 'High Line Park', area: 'Chelsea', lat: 40.7479, lng: -74.0048 },
];

const map = L.map('map', {
    center: [40.7484, -73.9967],
    zoom: 12,
    zoomControl: true,
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20,
}).addTo(map);

const goldIcon = L.divIcon({
    className: '',
    html: `<div style="
    width:32px;height:32px;border-radius:50% 50% 50% 0;
    background:#F7C325;border:2px solid #D4A615;
    transform:rotate(-45deg);
    box-shadow:0 4px 12px rgba(247,195,37,0.5);
  "></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -36],
});

nyMarkers.forEach(m => {
    L.marker([m.lat, m.lng], { icon: goldIcon })
        .addTo(map)
        .bindPopup(`<strong>${m.name}</strong><span>${m.area}</span>`);
});

const list = document.getElementById('landmarkList');
nyMarkers.forEach((m, i) => {
    const li = document.createElement('li');
    li.className = 'map-item';
    li.setAttribute('role', 'listitem');
    li.innerHTML = `
    <div class="map-item__num">${i + 1}</div>
    <div>
      <p class="map-item__name">${m.name}</p>
      <p class="map-item__area">${m.area}</p>
    </div>
    <i class="fas fa-chevron-right map-item__arrow" aria-hidden="true"></i>
  `;
    li.addEventListener('click', () => {
        map.setView([m.lat, m.lng], 15, { animate: true, duration: 1 });
    });
    list.appendChild(li);
});

function renderWeather() {
    document.getElementById('weatherWidget').innerHTML = `
    <div class="weather-main">
      <div class="weather-icon-wrap">
        <i class="fas fa-cloud-sun" aria-hidden="true"></i>
      </div>
      <div class="weather-temp">68°<sup style="font-size:0.45em;font-weight:400;vertical-align:super;">F</sup></div>
      <div class="weather-desc">Partly Cloudy</div>
      <div class="weather-city">
        <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
        New York City, NY
      </div>
    </div>
    <div class="weather-details">
      <div class="weather-detail">
        <div class="weather-detail__icon"><i class="fas fa-tint" aria-hidden="true"></i></div>
        <p class="weather-detail__label">Humidity</p>
        <p class="weather-detail__value">62%</p>
      </div>
      <div class="weather-detail">
        <div class="weather-detail__icon"><i class="fas fa-wind" aria-hidden="true"></i></div>
        <p class="weather-detail__label">Wind</p>
        <p class="weather-detail__value">12 mph</p>
      </div>
      <div class="weather-detail">
        <div class="weather-detail__icon"><i class="fas fa-eye" aria-hidden="true"></i></div>
        <p class="weather-detail__label">Visibility</p>
        <p class="weather-detail__value">10 mi</p>
      </div>
      <div class="weather-detail">
        <div class="weather-detail__icon"><i class="fas fa-thermometer-half" aria-hidden="true"></i></div>
        <p class="weather-detail__label">Feels Like</p>
        <p class="weather-detail__value">65°F</p>
      </div>
      <div class="weather-detail">
        <div class="weather-detail__icon"><i class="fas fa-sun" aria-hidden="true"></i></div>
        <p class="weather-detail__label">UV Index</p>
        <p class="weather-detail__value">Moderate 4</p>
      </div>
      <div class="weather-detail">
        <div class="weather-detail__icon"><i class="fas fa-cloud-rain" aria-hidden="true"></i></div>
        <p class="weather-detail__label">Rain Chance</p>
        <p class="weather-detail__value">15%</p>
      </div>
    </div>
  `;
}

renderWeather();

const ctx = document.getElementById('visitorStats').getContext('2d');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'International',
                data: [2.1, 1.8, 2.9, 3.5, 4.2, 5.8, 6.5, 6.2, 5.1, 4.3, 3.0, 2.5],
                backgroundColor: 'rgba(247,195,37,0.8)',
                borderColor: '#F7C325',
                borderWidth: 0,
                borderRadius: 6,
                borderSkipped: false,
            },
            {
                label: 'Domestic',
                data: [3.2, 2.8, 3.8, 4.6, 5.1, 6.4, 7.2, 7.0, 5.9, 5.2, 4.0, 3.5],
                backgroundColor: 'rgba(79,142,247,0.7)',
                borderColor: '#4F8EF7',
                borderWidth: 0,
                borderRadius: 6,
                borderSkipped: false,
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        interaction: { mode: 'index', intersect: false },
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#16161F',
                borderColor: 'rgba(255,255,255,0.06)',
                borderWidth: 1,
                titleColor: '#F4EFE6',
                bodyColor: 'rgba(244,239,230,0.55)',
                padding: 12,
                callbacks: {
                    label: ctx => ` ${ctx.dataset.label}: ${ctx.raw}M visitors`,
                },
            },
        },
        scales: {
            x: {
                grid: { color: 'rgba(255,255,255,0.04)' },
                ticks: { color: 'rgba(244,239,230,0.4)', font: { size: 12 } },
            },
            y: {
                grid: { color: 'rgba(255,255,255,0.04)' },
                ticks: {
                    color: 'rgba(244,239,230,0.4)',
                    font: { size: 12 },
                    callback: v => v + 'M',
                },
                beginAtZero: true,
            },
        },
    },
});

function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();

    function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4);
        el.textContent = Math.floor(ease * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card__num').forEach(el => counterObserver.observe(el));

function openModal(key) {
    const data = landmarkData.find(d => d.key === key);
    if (!data) return;

    document.getElementById('modalImg').src = data.img;
    document.getElementById('modalImg').alt = data.title;
    document.getElementById('modalEyebrow').textContent = data.location;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDesc').textContent = data.desc;
    document.getElementById('modalFacts').innerHTML = data.facts.map(f => `
    <div class="landmark-fact">
      <div class="landmark-fact__icon"><i class="fas ${f.icon}" aria-hidden="true"></i></div>
      <div>
        <p class="landmark-fact__label">${f.label}</p>
        <p class="landmark-fact__value">${f.value}</p>
      </div>
    </div>
  `).join('');

    const overlay = document.getElementById('landmarkModal');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    overlay.querySelector('.modal__close').focus();
}

function closeModal() {
    document.getElementById('landmarkModal').classList.remove('open');
    document.body.style.overflow = '';
}

document.getElementById('landmarkModal').addEventListener('click', function (e) {
    if (e.target === this) closeModal();
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});

let toastTimer;

function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = msg;
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 4000);
}

document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    showToast("Message sent! We'll be in touch within 24 hours.");
    this.reset();
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

window.addEventListener('load', () => {
    document.querySelectorAll('video').forEach(video => {
        video.play().catch(() => {
            console.log('Video autoplay blocked');
        });
    });
});