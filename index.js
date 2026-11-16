'use strict';

// One local-time snapshot keeps every field consistent at date boundaries.
function randomNumberGenerator(now = new Date(), random = Math.random) {
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hour = now.getHours();
    const standardHour = hour % 12 || 12;
    const minute = now.getMinutes();
    const second = now.getSeconds();
    const millisecond = now.getMilliseconds();
    const pad = value => String(value).padStart(2, '0');
    const show = (id, ...lines) => {
        const element = document.getElementById(id);
        element.replaceChildren();
        lines.forEach((line, index) => {
            if (index) element.append(document.createElement('br'));
            element.append(document.createTextNode(String(line)));
        });
        element.hidden = false;
    };

    show('datetime', `${month}/${day}/${year}`,
        `${standardHour}:${pad(minute)}:${pad(second)} ${hour < 12 ? 'AM' : 'PM'}`);
    const subtractedYear = year - Math.floor(random() * 2200 + 1) - Math.floor(random() * 1000 + 1);
    // Preserve the original whimsical arithmetic, including its small-year branch.
    const divideYear = subtractedYear >= 200 || subtractedYear < 0;
    const workingYear = divideYear ? subtractedYear / 20 : subtractedYear;
    const roundedYear = divideYear ? Math.round(workingYear) : 0;
    const adjustedYear = roundedYear < 0 ? roundedYear * -10 : roundedYear;
    const workingMilli = millisecond >= 100 ? Math.round(millisecond / 60) : millisecond;

    show('yeara', 'Year:', year);
    show('yearb', '(Year minus random number) minus random number:', subtractedYear);
    show('yearc', 'Year ÷ 20 (rounded):', divideYear ? roundedYear : null);
    show('yeard', 'Negative result × -10:', roundedYear < 0 ? adjustedYear : null);
    show('month', 'Month', month);
    show('day', 'Day', day);
    show('houra', 'Hour', hour);
    show('hourb', 'Standard format:', `${standardHour} ${hour < 12 ? 'AM' : 'PM'}`);
    show('min', 'Minute', minute);
    show('sec', 'Second', second);
    show('millia', 'Millisecond', millisecond);
    show('millib', 'Milliseconds ≥ 100 divided by 60 (rounded; null when not applied):', millisecond >= 100 ? workingMilli : null);

    const firstBound = workingMilli + day - standardHour - month;
    const secondBound = Math.round(workingYear + adjustedYear + minute);
    const low = Math.min(firstBound, secondBound);
    const high = Math.max(firstBound, secondBound);
    show('lMath', `${workingMilli} + ${day} − ${standardHour} − ${month} = ${firstBound}`);
    show('hMath', `${workingYear} + ${adjustedYear} + ${minute} ≈ ${secondBound}`);
    show('low', `Lowest number: ${low}`);
    show('high', `Highest number: ${high}`);
    // Sorting the bounds eliminates retries; both endpoints are valid results.
    show('ran', `Random number: ${Math.floor(random() * (high - low + 1)) + low}`);
}

randomNumberGenerator();
setInterval(randomNumberGenerator, 100);

/* The quick links float over the clock; they never alter its layout. */
const quickLinksDrawer = document.getElementById('quick-links-drawer');
const quickLinksPanel = document.getElementById('quick-links-panel');
const quickLinksToggle = document.getElementById('quick-links-toggle');
let quickLinksOpen = false;

function setQuickLinksOpen(open) {
    quickLinksOpen = open;
    quickLinksDrawer.classList.toggle('is-open', open);
    quickLinksToggle.setAttribute('aria-expanded', String(open));
    quickLinksToggle.setAttribute('aria-label', open ? 'Close quick links' : 'Open quick links');
    quickLinksPanel.setAttribute('aria-hidden', String(!open));
    quickLinksPanel.inert = !open;
}

quickLinksToggle.addEventListener('click', () => setQuickLinksOpen(!quickLinksOpen));
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && quickLinksOpen) {
        setQuickLinksOpen(false);
        quickLinksToggle.focus();
    }
});
document.addEventListener('pointerdown', event => {
    if (quickLinksOpen && !quickLinksDrawer.contains(event.target)) {
        setQuickLinksOpen(false);
    }
});

/* Show the existing frog website over the clock on local Wednesdays only.
   FormSubmit redirects successful submissions to ?wednesday=complete.
   The completion marker lasts until the viewer's next local Wednesday. */
const wednesdayGate = document.getElementById('wednesday-gate');
const wednesdayFrame = document.getElementById('wednesday-gate-frame');
const WEDNESDAY_PAGE = 'https://kordldurham.github.io/SparkyArcingPotato/';
const WEDNESDAY_COMPLETE_KEY = 'wednesday-form-completed';
let wednesdayGateVisible = false;

function localDayStamp(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function syncWednesdayGate() {
    const isWednesday = new Date().getDay() === 3;
    let completedToday = false;
    try {
        completedToday = sessionStorage.getItem(WEDNESDAY_COMPLETE_KEY) === localDayStamp();
    } catch (_) {
        // Storage may be disabled; the URL redirect still dismisses the gate.
    }

    const shouldShow = isWednesday && !completedToday;
    if (shouldShow === wednesdayGateVisible) return;

    wednesdayGateVisible = shouldShow;
    wednesdayGate.hidden = !shouldShow;
    document.body.classList.toggle('wednesday-gated', shouldShow);
    if (shouldShow) {
        wednesdayFrame.src = WEDNESDAY_PAGE;
    } else {
        wednesdayFrame.removeAttribute('src');
    }
}

const wednesdayParams = new URLSearchParams(window.location.search);
if (wednesdayParams.get('wednesday') === 'complete') {
    try {
        sessionStorage.setItem(WEDNESDAY_COMPLETE_KEY, localDayStamp());
    } catch (_) { /* Private browsing can block storage. */ }
    // Hide the overlay even if storage is unavailable, on this landing page.
    if (new Date().getDay() === 3) {
        wednesdayGateVisible = false;
    }
    wednesdayParams.delete('wednesday');
    const cleanQuery = wednesdayParams.toString();
    history.replaceState(null, '', window.location.pathname +
        (cleanQuery ? '?' + cleanQuery : '') + window.location.hash);
}
syncWednesdayGate();
setInterval(syncWednesdayGate, 60000);
