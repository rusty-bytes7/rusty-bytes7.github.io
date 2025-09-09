// add class navbarDark on navbar scroll
const header = document.querySelector('.navbar');
console.log(header)
window.onscroll = function() {
    const top = window.scrollY;
    if(top >=100) {
        header.classList.add('navbarDark');
    }
    else {
        header.classList.remove('navbarDark');
    }
}
// collapse navbar after click on small devices
const navLinks = document.querySelectorAll('.nav-item')
const menuToggle = document.getElementById('navbarSupportedContent')

navLinks.forEach((l) => {
    l.addEventListener('click', () => { new bootstrap.Collapse(menuToggle).toggle() })
})

// Skills rendering and animation
// purple theme colors (adjust to taste)
const PURPLES = {
    deep: '#4b1f6f',
    mid: '#6f3fa6',
    light: '#a87be0'
};

const skills = [
    { name: 'Python', level: 85, color: PURPLES.mid, icon: 'fab fa-python' },
    { name: 'SQL / Databases', level: 70, color: PURPLES.light, icon: 'fas fa-database' },
    { name: 'JavaScript / Front-end', level: 50, color: PURPLES.deep, icon: 'fab fa-js' },
    { name: 'Git / Version Control', level: 75, color: PURPLES.mid, icon: 'fab fa-git' },
    { name: 'Laboratory Skills', level: 99, color: PURPLES.light, icon: 'fas fa-notes-medical' }
];

function renderSkills() {
    const container = document.getElementById('skills-list');
    if (!container) return;
    const fragment = document.createDocumentFragment();

    skills.forEach(s => {
        const wrapper = document.createElement('div');
        wrapper.className = 'mb-3 skill-item';

        wrapper.innerHTML = `
            <div class="d-flex align-items-center mb-1">
                <i class="skill-icon ${s.icon} me-2"></i>
                <h5 class="mb-0">${s.name}</h5>
            </div>
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width:0%;background:${s.color};" data-target="${s.level}" aria-valuemin="0" aria-valuemax="100">0%</div>
            </div>
        `;

        fragment.appendChild(wrapper);
    });

    container.appendChild(fragment);
}

function animateSkills(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.progress-bar');
            bars.forEach(bar => {
                const target = bar.getAttribute('data-target');
                bar.style.width = target + '%';
                bar.textContent = target + '%';
            });
            observer.unobserve(entry.target);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderSkills();
    const skillsCol = document.getElementById('skills-column');
    if (skillsCol) {
        const obs = new IntersectionObserver(animateSkills, { threshold: 0.3 });
        obs.observe(skillsCol);
    }
});