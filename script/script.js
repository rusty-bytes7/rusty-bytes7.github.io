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
    const left = document.getElementById('skills-list-left');
    const right = document.getElementById('skills-list-right');
    if (!left || !right) return;

    // helper: map numeric level (0-100) to qualitative label
    function levelToLabel(level) {
        if (level >= 90) return 'Expert';
        if (level >= 70) return 'Advanced';
        if (level >= 40) return 'Intermediate';
        return 'Beginner';
    }

    // helper: return star markup (0..5) using Font Awesome
    function starsMarkup(level) {
        const count = Math.round(level / 20); // 0..5
        let html = '';
        for (let i = 1; i <= 5; i++) {
            html += `<i class="${i <= count ? 'fas' : 'far'} fa-star skill-star me-1"></i>`;
        }
        return html;
    }

    skills.forEach((s, idx) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'mb-3 skill-item';

        wrapper.innerHTML = `
            <div class="d-flex align-items-center mb-2 justify-content-center">
                <i class="skill-icon ${s.icon} me-2"></i>
                <h5 class="mb-0 me-3">${s.name}</h5>
                <div class="skill-stars">${starsMarkup(s.level)}</div>
                <small class="text-muted ms-3">${levelToLabel(s.level)}</small>
            </div>
        `;

        // append alternately to left and right to keep balance
        if (idx % 2 === 0) left.appendChild(wrapper);
        else right.appendChild(wrapper);
    });
}

function animateSkills(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.skill-item');
            items.forEach((it, idx) => {
                // stagger reveal slightly
                setTimeout(() => it.classList.add('skill-reveal'), idx * 120);
            });
            observer.unobserve(entry.target);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderSkills();
    const skillsRow = document.getElementById('skills-row');
    if (skillsRow) {
        const obs = new IntersectionObserver(animateSkills, { threshold: 0.2 });
        obs.observe(skillsRow);
    }
});