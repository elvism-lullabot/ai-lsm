// Roadmap Visualizer app (gh-pages ready)
// Placeholder SVG images are included in /assets. Replace them with your AI-generated images if you prefer.

const PHASES = [
  {
    id: 1,
    title: "Local Dev",
    description: "Where ideas take shape — rapid edits, immediate feedback, and the freedom to experiment locally.",
    image: "assets/phase1.svg"
  },
  {
    id: 2,
    title: "Version Control",
    description: "Team collaboration and history: branches, PRs, and the safety net of source control.",
    image: "assets/phase2.svg"
  },
  {
    id: 3,
    title: "CI Pipelines",
    description: "Automated builds & gating: the pipeline becomes the guardian of quality and consistency.",
    image: "assets/phase3.svg"
  },
  {
    id: 4,
    title: "Automated Tests",
    description: "Confidence through repeatable tests — the scaffolding that lets teams move faster with less fear.",
    image: "assets/phase4.svg"
  },
  {
    id: 5,
    title: "Containerization",
    description: "Portable runtime environments that tame 'it works on my machine' into reproducible deployables.",
    image: "assets/phase5.svg"
  },
  {
    id: 6,
    title: "Scripted Deploys",
    description: "Fully automated deployments, rollbacks and auditable releases — the final step toward reliable delivery.",
    image: "assets/phase6.svg"
  }
];

const stepsEl = document.getElementById('steps');
const progressFill = document.getElementById('progressFill');
const phaseImage = document.getElementById('phaseImage');
const descriptionEl = document.getElementById('description');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let current = 0;

// Build step buttons
PHASES.forEach((phase, idx) => {
  const li = document.createElement('li');
  const btn = document.createElement('button');
  btn.className = 'step-btn';
  btn.setAttribute('role','tab');
  btn.setAttribute('aria-selected','false');
  btn.dataset.index = idx;
  btn.innerHTML = `<span class="step-number">${idx+1}</span><span class="step-label">${phase.title}</span>`;
  btn.addEventListener('click', () => goTo(idx));
  li.appendChild(btn);
  stepsEl.appendChild(li);
});

// Helpers
function updateProgressBar() {
  const percent = (current) / (PHASES.length - 1) * 100;
  progressFill.style.width = percent + '%';
}

function setActiveStep() {
  const btns = stepsEl.querySelectorAll('.step-btn');
  btns.forEach((b, i) => {
    const active = i === current;
    b.classList.toggle('active', active);
    b.setAttribute('aria-selected', String(active));
    b.setAttribute('tabindex', active ? '0' : '-1');
  });
}

function renderDescription(phase) {
  descriptionEl.innerHTML = `<h2>${phase.title}</h2><p>${phase.description}</p>`;
  descriptionEl.focus();
}

// Image fade-in: set opacity 0, change src, onload set opacity 1.
// Provide onerror fallback to inline SVG placeholder.
function showImage(src, title) {
  phaseImage.style.opacity = 0;
  // small timeout to allow opacity transition out
  setTimeout(() => {
    phaseImage.src = src;
    phaseImage.alt = title;
  }, 120);
}

// Fallback SVG if image fails to load
function svgPlaceholder(title, idx) {
  const colors = ['#7dd3fc','#60a5fa','#a78bfa','#f9a8d4','#fbcfe8','#86efac'];
  const bg = colors[idx % colors.length];
  const svg = `
    data:image/svg+xml;utf8,
    <svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'>
      <rect width='100%' height='100%' fill='${bg}' />
      <g fill='rgba(2,6,23,0.06)'>
        <circle cx='150' cy='150' r='110'/>
        <circle cx='1050' cy='650' r='180'/>
      </g>
      <text x='50%' y='50%' alignment-baseline='middle' text-anchor='middle'
            font-family='Arial' font-size='36' fill='#04263a'>${encodeURIComponent(title)}</text>
    </svg>`.replace(/\n/g,'');
  return svg;
}

// Initialize
function goTo(index) {
  if (index < 0) index = 0;
  if (index > PHASES.length - 1) index = PHASES.length - 1;
  current = index;
  const phase = PHASES[current];

  updateProgressBar();
  setActiveStep();
  renderDescription(phase);
  showImage(phase.image, phase.title);
}

// Prev / Next
prevBtn.addEventListener('click', () => goTo(current - 1));
nextBtn.addEventListener('click', () => goTo(current + 1));

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') { goTo(current - 1); }
  if (e.key === 'ArrowRight') { goTo(current + 1); }
});

// Image onload => fade in; onerror => fallback svg
phaseImage.addEventListener('load', () => {
  phaseImage.style.opacity = 1;
});
phaseImage.addEventListener('error', () => {
  const fallback = svgPlaceholder(PHASES[current].title, current);
  phaseImage.src = fallback;
});

// Start at first phase
goTo(0);
