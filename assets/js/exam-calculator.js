// Exam Calculator (Az only, simplified)

const examDate = new Date('2026-03-01T10:00:00').getTime();

const groups = [
    { name: 'I Qrup', subjects: ['Riyaziyyat', 'Fizika', 'Kimya'], maxScores: [150, 150, 100] },
    { name: 'II Qrup', subjects: ['Riyaziyyat', 'Coğrafiya', 'Tarix'], maxScores: [150, 100, 150] },
    { name: 'III Qrup', subjects: ['Azərbaycan dili', 'Ədəbiyyat', 'Tarix'], maxScores: [150, 100, 150] },
    { name: 'IV Qrup', subjects: ['Biologiya', 'Kimya', 'Fizika'], maxScores: [100, 150, 100] },
    { name: 'Buraxılış İmtahanı', subjects: ['Riyaziyyat', 'Azərbaycan dili', 'İngilis dili'], maxScores: [100, 100, 100] },
];

let activeGroup = null;
let results = null;
let language = 'az';

const translations = {
    az: {
        title: 'İmtahan Ballarını Hesabla',
        description: 'Doğru, yanlış, açıq və qapalı suallar haqqında məlumat daxil edərək ballarınızı hesablaya bilərsiniz.',
        calculate: 'Hesabla',
        results: 'Nəticələr',
        subject: 'Fənn',
        score: 'Bal',
        saveResults: 'Nəticələri yüklə',
        recalculate: 'Yenidən hesabla',
        correct: 'Doğru Qapalı',
        incorrect: 'Yanlış Qapalı',
        open: 'Açıq',
        closed: 'Qapalı',
        coding: 'Kodlaşdırma',
        days: 'Gün',
        hours: 'Saat',
        minutes: 'Dəqiqə',
        seconds: 'Saniyə',
        examStarted: 'İmtahan başladı!',
        groups: {
            'I Qrup': 'I Qrup',
            'II Qrup': 'II Qrup',
            'III Qrup': 'III Qrup',
            'IV Qrup': 'IV Qrup',
            'Buraxılış İmtahanı': 'Buraxılış İmtahanı'
        },
        subjects: {
            'Riyaziyyat': 'Riyaziyyat',
            'Fizika': 'Fizika',
            'Kimya': 'Kimya',
            'Biologiya': 'Biologiya',
            'Coğrafiya': 'Coğrafiya',
            'Tarix': 'Tarix',
            'Azərbaycan dili': 'Azərbaycan dili',
            'Ədəbiyyat': 'Ədəbiyyat',
            'İngilis dili': 'İngilis dili',
            'Ümumi bal': 'Ümumi bal'
        }
    }
};

const scoreRanges = {
    'I Qrup': {
        max: 400, ranges: [
            { min: 350, max: 400, level: 'excellent' },
            { min: 250, max: 349, level: 'good' },
            { min: 150, max: 249, level: 'average' },
            { min: 0, max: 149, level: 'low' }]
    },
    'II Qrup': {
        max: 400, ranges: [
            { min: 350, max: 400, level: 'excellent' },
            { min: 250, max: 349, level: 'good' },
            { min: 150, max: 249, level: 'average' },
            { min: 0, max: 149, level: 'low' }]
    },
    'III Qrup': {
        max: 400, ranges: [
            { min: 350, max: 400, level: 'excellent' },
            { min: 250, max: 349, level: 'good' },
            { min: 150, max: 249, level: 'average' },
            { min: 0, max: 149, level: 'low' }]
    },
    'IV Qrup': {
        max: 350, ranges: [
            { min: 300, max: 350, level: 'excellent' },
            { min: 200, max: 299, level: 'good' },
            { min: 150, max: 199, level: 'average' },
            { min: 0, max: 149, level: 'low' }]
    },
    'Buraxılış İmtahanı': {
        max: 300, ranges: [
            { min: 250, max: 300, level: 'excellent' },
            { min: 200, max: 249, level: 'good' },
            { min: 150, max: 199, level: 'average' },
            { min: 0, max: 149, level: 'low' }]
    }
};

function handleGroupClick(groupName) {
    activeGroup = groups.find(g => g.name === groupName);
    document.querySelectorAll('#examCalculatorTabs .btn').forEach(btn => {
        const isActive = btn.textContent === translations[language].groups[groupName];
        if (isActive) {
            btn.classList.remove('btn--stroked');
            btn.classList.add('btn--filled');
        } else {
            btn.classList.remove('btn--filled');
            btn.classList.add('btn--stroked');
        }
    });

    const formWrapper = document.getElementById('examCalculatorForm');
    const resultsWrapper = document.getElementById('examCalculatorResults');
    if (formWrapper) formWrapper.classList.remove('is-hidden');
    if (resultsWrapper) resultsWrapper.classList.add('is-hidden');
    formWrapper?.scrollIntoView({ behavior: 'smooth' });

    generateForm();
}

function generateForm() {
    const form = document.querySelector('#examCalculatorForm .form__fields');
    form.innerHTML = '';
    const titleEl = document.querySelector('#examCalculatorForm .form__header__title');
    if (titleEl) titleEl.textContent = translations[language].groups[activeGroup.name];

    activeGroup.subjects.forEach((subject, index) => {
        const group = document.createElement('div');
        group.className = 'form__fields__group';

        let inputFields = '';
        if (activeGroup.name === 'Buraxılış İmtahanı') {
            const maxClosed = subject === 'İngilis dili' ? 23 : (subject === 'Azərbaycan dili' ? 20 : 13);
            const maxOpen = subject === 'İngilis dili' ? 7 : (subject === 'Azərbaycan dili' ? 10 : 7);
            inputFields = `
                <div class="form-row form-row--4">
                    <div class="form-group form-group--lg">
                        <label class="form-label form-label--lg">
                            <i class="ri-checkbox-circle-line"></i>
                            ${translations[language].closed}
                        </label>
                        <div class="form-control-wrapper">
                            <input type="number" name="${subject}-closed" min="0" max="${maxClosed}" class="form-control form-control--lg form-control--with-suffix" placeholder="0">
                            <span class="form-control-suffix form-control-suffix--text">ədəd</span>
                        </div>
                        <div class="form-error"></div>
                    </div>
                    <div class="form-group form-group--lg">
                        <label class="form-label form-label--lg">
                            <i class="ri-edit-2-line"></i>
                            ${translations[language].open}
                        </label>
                        <div class="form-control-wrapper">
                            <input type="number" name="${subject}-open" min="0" max="${maxOpen}" class="form-control form-control--lg form-control--with-suffix" placeholder="0">
                            <span class="form-control-suffix form-control-suffix--text">ədəd</span>
                        </div>
                        <div class="form-error"></div>
                    </div>`;
            if (subject === 'Riyaziyyat') {
                inputFields += `
                    <div class="form-group form-group--lg">
                        <label class="form-label form-label--lg">
                            <i class="ri-code-line"></i>
                            ${translations[language].coding}
                        </label>
                        <div class="form-control-wrapper">
                            <input type="number" name="${subject}-coding" min="0" max="5" class="form-control form-control--lg form-control--with-suffix" placeholder="0">
                            <span class="form-control-suffix form-control-suffix--text">ədəd</span>
                        </div>
                        <div class="form-error"></div>
                    </div>`;
            }
            inputFields += `</div>`;
        } else {
            inputFields = `
                <div class="form-row form-row--4">
                    <div class="form-group form-group--lg">
                        <label class="form-label form-label--lg">
                            <i class="ri-check-line"></i>
                            ${translations[language].correct}
                        </label>
                        <div class="form-control-wrapper">
                            <input type="number" name="${subject}-correct" min="0" max="22" class="form-control form-control--lg form-control--with-suffix" placeholder="0">
                            <span class="form-control-suffix form-control-suffix--text">ədəd</span>
                        </div>
                        <div class="form-error"></div>
                    </div>
                    <div class="form-group form-group--lg">
                        <label class="form-label form-label--lg">
                            <i class="ri-close-line"></i>
                            ${translations[language].incorrect}
                        </label>
                        <div class="form-control-wrapper">
                            <input type="number" name="${subject}-incorrect" min="0" max="22" class="form-control form-control--lg form-control--with-suffix" placeholder="0">
                            <span class="form-control-suffix form-control-suffix--text">ədəd</span>
                        </div>
                        <div class="form-error"></div>
                    </div>
                    <div class="form-group form-group--lg">
                        <label class="form-label form-label--lg">
                            <i class="ri-code-line"></i>
                            ${translations[language].coding}
                        </label>
                        <div class="form-control-wrapper">
                            <input type="number" name="${subject}-coding" min="0" max="5" class="form-control form-control--lg form-control--with-suffix" placeholder="0">
                            <span class="form-control-suffix form-control-suffix--text">ədəd</span>
                        </div>
                        <div class="form-error"></div>
                    </div>
                    <div class="form-group form-group--lg">
                        <label class="form-label form-label--lg">
                            <i class="ri-edit-2-line"></i>
                            ${translations[language].open}
                        </label>
                        <div class="form-control-wrapper">
                            <input type="number" name="${subject}-open" min="0" max="3" class="form-control form-control--lg form-control--with-suffix" placeholder="0">
                            <span class="form-control-suffix form-control-suffix--text">ədəd</span>
                        </div>
                        <div class="form-error"></div>
                    </div>
                </div>`;
        }
        group.innerHTML = `
            <div class="form__fields__group__header">
                <h3 class="form__fields__group__title">${translations[language].subjects[subject]} (${activeGroup.maxScores[index]} ${translations[language].score})</h3>
            </div>
            ${inputFields}`;
        form.appendChild(group);
    });

    document.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('input', validateInput);
        input.addEventListener('blur', validateInput);
    });
    updateCalculateState();
}

function validateInput(event) {
    const input = event.target;
    const min = Number(input.min || 0);
    const max = Number(input.max || Infinity);
    let value = input.value === '' ? '' : Number(input.value);
    const errorEl = input.closest('.form-group')?.querySelector('.form-error');

    if (!errorEl) return;

    // Default state
    errorEl.textContent = '';
    input.classList.remove('is-invalid');
    input.removeAttribute('aria-invalid');

    if (input.value === '') {
        updateCalculateState();
        return;
    }

    if (!Number.isFinite(value)) {
        errorEl.textContent = 'Yalnız rəqəm daxil edin.';
        input.classList.add('is-invalid');
        input.setAttribute('aria-invalid', 'true');
        updateCalculateState();
        return;
    }

    // Clamp decimals to integer
    if (!Number.isInteger(value)) {
        value = Math.round(value);
        input.value = String(value);
    }

    // Range validation
    if (value < min || value > max) {
        errorEl.textContent = `Dəyər ${min} və ${max} arasında olmalıdır.`;
        input.classList.add('is-invalid');
        input.setAttribute('aria-invalid', 'true');
    }

    // Additional rule: for qapalı suallar (correct+incorrect) cəmi ≤ 22 (qrup imtahanları)
    if (activeGroup && activeGroup.name !== 'Buraxılış İmtahanı') {
        const name = input.getAttribute('name') || '';
        const subject = name.split('-')[0];
        if (name.endsWith('-correct') || name.endsWith('-incorrect')) {
            const correct = document.querySelector(`[name="${subject}-correct"]`);
            const incorrect = document.querySelector(`[name="${subject}-incorrect"]`);
            const cVal = Number(correct?.value || 0);
            const iVal = Number(incorrect?.value || 0);
            const correctErr = (correct?.closest('.form-group')?.querySelector('.form-error'));
            const incorrectErr = (incorrect?.closest('.form-group')?.querySelector('.form-error'));
            const msg = 'Doğru və yanlış cəmi 22-dən çox ola bilməz.';
            const sum = (Number.isFinite(cVal) ? cVal : 0) + (Number.isFinite(iVal) ? iVal : 0);
            if (sum > 22) {
                // Yalnız dəyişən inputun altında göstər
                errorEl.textContent = msg;
                input.classList.add('is-invalid');
                input.setAttribute('aria-invalid', 'true');
            } else {
                // Sum qaydasını hər iki inputdan təmizlə, digər xətalara toxunma
                if (correctErr && correctErr.textContent === msg) correctErr.textContent = '';
                if (incorrectErr && incorrectErr.textContent === msg) incorrectErr.textContent = '';
                correct?.classList.remove('is-invalid');
                incorrect?.classList.remove('is-invalid');
                correct?.removeAttribute('aria-invalid');
                incorrect?.removeAttribute('aria-invalid');
            }
        }
    }

    updateCalculateState();
}

function updateCalculateState() {
    const hasError = Array.from(document.querySelectorAll('#examCalculatorForm .form-error'))
        .some(el => el.textContent && el.textContent.trim().length > 0);
    const calcBtn = document.getElementById('btnCalculate');
    if (calcBtn) calcBtn.disabled = hasError;
}

function getSubjectScores(subject) {
    return {
        correct: parseInt(document.querySelector(`[name="${subject}-correct"]`)?.value) || 0,
        incorrect: parseInt(document.querySelector(`[name="${subject}-incorrect"]`)?.value) || 0,
        open: parseInt(document.querySelector(`[name="${subject}-open"]`)?.value) || 0,
        closed: parseInt(document.querySelector(`[name="${subject}-closed"]`)?.value) || 0,
        coding: parseInt(document.querySelector(`[name="${subject}-coding"]`)?.value) || 0
    };
}

function calculateScores() {
    results = {};
    let totalScore = 0;

    if (activeGroup.name === 'I Qrup') {
        const r = getSubjectScores('Riyaziyyat');
        const f = getSubjectScores('Fizika');
        const k = getSubjectScores('Kimya');
        results['Riyaziyyat'] = 1.5 * 100 / 33 * ((r.correct - r.incorrect / 4) + (2 * r.open + r.coding));
        results['Fizika'] = 1.5 * 100 / 33 * ((f.correct - f.incorrect / 4) + (2 * f.open + f.coding));
        results['Kimya'] = 100 / 33 * ((k.correct - k.incorrect / 4) + (2 * k.open + k.coding));
    } else if (activeGroup.name === 'II Qrup') {
        const r = getSubjectScores('Riyaziyyat');
        const c = getSubjectScores('Coğrafiya');
        const t = getSubjectScores('Tarix');
        results['Riyaziyyat'] = 1.5 * 100 / 33 * ((r.correct - r.incorrect / 4) + (2 * r.open + r.coding));
        results['Coğrafiya'] = 100 / 33 * ((c.correct - c.incorrect / 4) + (2 * c.open + c.coding));
        results['Tarix'] = 1.5 * 100 / 33 * ((t.correct - t.incorrect / 4) + (2 * t.open + t.coding));
    } else if (activeGroup.name === 'III Qrup') {
        const a = getSubjectScores('Azərbaycan dili');
        const e = getSubjectScores('Ədəbiyyat');
        const t = getSubjectScores('Tarix');
        results['Azərbaycan dili'] = 1.5 * 100 / 33 * ((a.correct - a.incorrect / 4) + (2 * a.open + a.coding));
        results['Ədəbiyyat'] = 100 / 33 * ((e.correct - e.incorrect / 4) + (2 * e.open + e.coding));
        results['Tarix'] = 1.5 * 100 / 33 * ((t.correct - t.incorrect / 4) + (2 * t.open + t.coding));
    } else if (activeGroup.name === 'IV Qrup') {
        const b = getSubjectScores('Biologiya');
        const k = getSubjectScores('Kimya');
        const f = getSubjectScores('Fizika');
        results['Biologiya'] = 100 / 33 * ((b.correct - b.incorrect / 4) + (2 * b.open + b.coding));
        results['Kimya'] = 1.5 * 100 / 33 * ((k.correct - k.incorrect / 4) + (2 * k.open + k.coding));
        results['Fizika'] = 100 / 33 * ((f.correct - f.incorrect / 4) + (2 * f.open + f.coding));
    } else if (activeGroup.name === 'Buraxılış İmtahanı') {
        const r = getSubjectScores('Riyaziyyat');
        const a = getSubjectScores('Azərbaycan dili');
        const i = getSubjectScores('İngilis dili');
        results['Riyaziyyat'] = 25 / 8 * (2 * r.open + r.closed + r.coding);
        results['Azərbaycan dili'] = 2.5 * (2 * a.open + a.closed);
        results['İngilis dili'] = 100 / 37 * (2 * i.open + i.closed);
    }

    for (const score of Object.values(results)) totalScore += score;
    results['Ümumi bal'] = totalScore;
    displayResults();
}

function getResultLevel(score, groupName) {
    const ranges = scoreRanges[groupName].ranges;
    for (const r of ranges) if (score >= r.min && score <= r.max) return r.level;
    return 'low';
}


function displayResults(preventScroll = false) {
    const resultsWrapper = document.getElementById('examCalculatorResults');
    const body = resultsWrapper?.querySelector('.form__fields');
    if (!body) return;
    body.innerHTML = '';

    const tableWrapper = document.createElement('div');
    tableWrapper.className = 'table-wrapper';

    const table = document.createElement('table');
    table.className = 'table';
    const thead = document.createElement('thead');
    thead.innerHTML = '<tr><th>Fənn</th><th>Bal</th></tr>';
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    for (const [subject, score] of Object.entries(results)) {
        const row = document.createElement('tr');
        const c1 = document.createElement('td');
        c1.textContent = translations.az.subjects[subject] || subject;
        const c2 = document.createElement('td');
        c2.textContent = score.toFixed(1);
        row.appendChild(c1);
        row.appendChild(c2);
        if (subject === 'Ümumi bal') row.classList.add('table-row--danger');
        tbody.appendChild(row);
    }
    tableWrapper.appendChild(table);
    body.appendChild(tableWrapper);
    const formWrapper = document.getElementById('examCalculatorForm');
    resultsWrapper?.classList.remove('is-hidden');
    formWrapper?.classList.remove('is-hidden');
    if (!preventScroll) resultsWrapper?.scrollIntoView({ behavior: 'smooth' });
}

function resetForm() {
    const formWrapper = document.getElementById('examCalculatorForm');
    const resultsWrapper = document.getElementById('examCalculatorResults');
    resultsWrapper?.classList.add('is-hidden');
    formWrapper?.classList.remove('is-hidden');
    formWrapper?.scrollIntoView({ behavior: 'smooth' });
}

function downloadResults() {
    if (!results) return;
    const resultsText = Object.entries(results)
        .map(([subject, score]) => `${subject}: ${score.toFixed(1)}`)
        .join('\n');
    const blob = new Blob([resultsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'imtahan_neticeleri.txt';
    a.click();
    URL.revokeObjectURL(url);
}

function startCountdown() {
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = examDate - now;
        if (timeLeft < 0) {
            document.querySelector('.countdown-container').innerHTML =
                `<h2 style="text-align:center;font-size:2rem;">${translations.az.examStarted}</h2>`;
            return;
        }
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function init() {
    const buttonContainer = document.getElementById('examCalculatorTabs');
    if (buttonContainer) buttonContainer.innerHTML = '';
    groups.forEach(group => {
        const button = document.createElement('button');
        button.className = 'btn btn--stroked btn--lg btn--blue';
        button.textContent = translations.az.groups[group.name];
        button.addEventListener('click', () => handleGroupClick(group.name));
        buttonContainer?.appendChild(button);
    });
    document.getElementById('btnCalculate')?.addEventListener('click', calculateScores);
    document.getElementById('btnRecalculate')?.addEventListener('click', resetForm);
    document.getElementById('btnDownload')?.addEventListener('click', downloadResults);
}

document.addEventListener('DOMContentLoaded', () => {
    init();
    startCountdown();
});


