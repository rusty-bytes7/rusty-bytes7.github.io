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

// Categories & skills (you can edit these levels later)
// pared-down categories with high-priority skills
const CATEGORIES = [
    {
        title: 'Core Technical Skills',
        items: [
            { name: 'Python (pandas, matplotlib)', level: 85, icon: 'fab fa-python', color: PURPLES.mid },
            { name: 'SQL', level: 50, icon: 'fas fa-database', color: PURPLES.light },
            { name: 'JavaScript (front-end)', level: 70, icon: 'fab fa-js', color: PURPLES.deep }
        ]
    },
    {
        title: 'Software Development',
        items: [
            { name: 'Data structures & algorithms', level: 50, icon: 'fas fa-code', color: PURPLES.mid },
            { name: 'Software design principles', level: 70, icon: 'fas fa-project-diagram', color: PURPLES.light }
        ]
    },
    {
        title: 'Version Control & Collaboration',
        items: [
            { name: 'Git & GitHub', level: 75, icon: 'fab fa-git', color: PURPLES.mid }
        ]
    },
    {
        title: 'Healthcare IT & Data',
        items: [
            { name: 'Epic Beaker (LIS)', level: 95, icon: 'fas fa-hospital', color: PURPLES.mid },
            { name: 'Data visualization & dashboards', level: 80, icon: 'fas fa-chart-bar', color: PURPLES.mid },
            { name: 'Data governance, privacy & HIPAA compliance', level: 80, icon: 'fas fa-shield-alt', color: PURPLES.deep }
        ]
    },
    {
        title: 'Domain Expertise',
        items: [
            { name: 'Clinical Laboratory Science', level: 95, icon: 'fas fa-vials', color: PURPLES.deep }
        ]
    }
];

function renderSkills() {
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

    // removed star markup helper — switching to tag-and-level chips below

    // distribute categories alternately between left and right for balance
    CATEGORIES.forEach((cat, idx) => {
        const container = (idx % 2 === 0) ? left : right;
        const catWrap = document.createElement('div');
        catWrap.className = 'skill-category mb-3';
        const title = document.createElement('h4');
        title.textContent = cat.title;
        title.className = 'text-center mb-2';
        catWrap.appendChild(title);

        cat.items.forEach(s => {
            const wrapper = document.createElement('div');
            wrapper.className = 'mb-3 skill-item';
            const levelLabel = levelToLabel(s.level);
            const safeColor = s.color || '#6c757d';
            wrapper.innerHTML = `
                <div class="d-flex align-items-center justify-content-between skill-chip p-2">
                    <div class="d-flex align-items-center">
                        <i class="skill-icon ${s.icon} me-2"></i>
                        <span class="skill-name h6 mb-0">${s.name}</span>
                    </div>
                    <span class="level-pill ms-3" role="status" aria-label="${levelLabel}"
                          style="background:${safeColor}; color: #fff; padding: .25rem .6rem; border-radius:999px; font-weight:600; font-size:.85rem;">
                        ${levelLabel}
                    </span>
                </div>
            `;
            catWrap.appendChild(wrapper);
        });

        container.appendChild(catWrap);
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