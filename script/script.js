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
const CATEGORIES = [
    // Core Technical Skills group (left column)
    {
        title: 'Core Technical Programming Skills',
        items: [
            { name: 'Python (pandas, matplotlib, data analysis)', level: 85, icon: 'fab fa-python', color: PURPLES.mid },
            { name: 'JavaScript (front-end)', level: 50, icon: 'fab fa-js', color: PURPLES.deep },
            { name: 'SQL', level: 50, icon: 'fas fa-database', color: PURPLES.light }
        ]
    },
    {
        title: 'Software Development',
        items: [
            { name: 'Data structures & algorithms', level: 70, icon: 'fas fa-code', color: PURPLES.mid },
            { name: 'Object-oriented programming', level: 75, icon: 'fas fa-cubes', color: PURPLES.mid },
            { name: 'Software design principles', level: 70, icon: 'fas fa-project-diagram', color: PURPLES.light }
        ]
    },
    
    {
        title: 'Web Development',
        items: [
            { name: 'HTML / CSS / Bootstrap', level: 65, icon: 'fab fa-html5', color: PURPLES.mid }
        ]
    },
    // Healthcare IT & Data group (right column)
    {
        title: 'Healthcare IT & Data',
        items: [
            { name: 'Laboratory Information Systems (Epic Beaker)', level: 90, icon: 'fas fa-hospital', color: PURPLES.mid },
            { name: 'Clinical Workflows & Lab Informatics', level: 90, icon: 'fas fa-notes-medical', color: PURPLES.mid },
            { name: 'HL7 / FHIR (familiar)', level: 30, icon: 'fas fa-exchange-alt', color: PURPLES.light },
            { name: 'Data Visualization & Dashboards (pandas, matplotlib, seaborn)', level: 80, icon: 'fas fa-chart-bar', color: PURPLES.mid }
        ]
    },
    // Domain Expertise group (right column)
    {
        title: 'Domain Expertise',
        items: [
            { name: 'Clinical Laboratory Science (diagnostics, instrumentation)', level: 100, icon: 'fas fa-vials', color: PURPLES.deep },
            { name: 'Healthcare Operations & Workflow Optimization', level: 80, icon: 'fas fa-tasks', color: PURPLES.mid },
            { name: 'Kaizen / Continuous Improvement (KPI, Lean concepts)', level: 80, icon: 'fas fa-chart-line', color: PURPLES.light }
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

    // helper: return star markup (0..5) using Font Awesome
    function starsMarkup(level) {
        const count = Math.round(level / 20); // 0..5
        let html = '';
        for (let i = 1; i <= 5; i++) {
            html += `<i class="${i <= count ? 'fas' : 'far'} fa-star skill-star me-1"></i>`;
        }
        return html;
    }

    // split categories into left and right columns
    const leftCats = CATEGORIES.slice(0, 4);
    const rightCats = CATEGORIES.slice(4);

    function renderCategory(cat, container) {
        const catWrap = document.createElement('div');
        catWrap.className = 'skill-category mb-3';
        const title = document.createElement('h4');
        title.textContent = cat.title;
        title.className = 'text-center mb-2';
        catWrap.appendChild(title);

        cat.items.forEach(s => {
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
            catWrap.appendChild(wrapper);
        });

        container.appendChild(catWrap);
    }

    leftCats.forEach(cat => renderCategory(cat, left));
    rightCats.forEach(cat => renderCategory(cat, right));
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