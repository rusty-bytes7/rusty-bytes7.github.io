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
const skills = [
    { name: 'Python', level: 85, color: 'bg-success', icon: 'fab fa-python' },
    { name: 'SQL / Databases', level: 80, color: 'bg-info', icon: 'fas fa-database' },
    { name: 'JavaScript / Front-end', level: 70, color: 'bg-warning', icon: 'fab fa-js' },
    { name: 'Git / Version Control', level: 75, color: 'bg-primary', icon: 'fab fa-git' },
    { name: 'Lab Informatics / Healthcare IT', level: 78, color: 'bg-secondary', icon: 'fas fa-notes-medical' }
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
                <div class="progress-bar ${s.color}" role="progressbar" style="width:0%" data-target="${s.level}" aria-valuemin="0" aria-valuemax="100">0%</div>
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