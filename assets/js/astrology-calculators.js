// ============================================================================
// CONSTANTS
// ============================================================================

// ==================== ZODIAC SIGNS ====================
const ZODIAC_SIGNS = [
    'Qoç', 'Buğa', 'Əkizlər', 'Xərçəng',
    'Şir', 'Qız', 'Tərəzi', 'Əqrəb',
    'Oxatan', 'Oğlaq', 'Dolça', 'Balıq'
];

// ==================== ZODIAC DATA ====================
const ZODIAC_DATA = [
    { name: 'Oğlaq', start: '12-22', end: '01-19', group: 'Torpaq', ruler: 'Saturn' },
    { name: 'Dolça', start: '01-20', end: '02-18', group: 'Hava', ruler: 'Uran' },
    { name: 'Balıq', start: '02-19', end: '03-20', group: 'Su', ruler: 'Neptun' },
    { name: 'Qoç', start: '03-21', end: '04-19', group: 'Od', ruler: 'Mars' },
    { name: 'Buğa', start: '04-20', end: '05-20', group: 'Torpaq', ruler: 'Venera' },
    { name: 'Əkizlər', start: '05-21', end: '06-20', group: 'Hava', ruler: 'Merkuri' },
    { name: 'Xərçəng', start: '06-21', end: '07-22', group: 'Su', ruler: 'Ay' },
    { name: 'Şir', start: '07-23', end: '08-22', group: 'Od', ruler: 'Günəş' },
    { name: 'Qız', start: '08-23', end: '09-22', group: 'Torpaq', ruler: 'Merkuri' },
    { name: 'Tərəzi', start: '09-23', end: '10-22', group: 'Hava', ruler: 'Venera' },
    { name: 'Əqrəb', start: '10-23', end: '11-21', group: 'Su', ruler: 'Pluton' },
    { name: 'Oxatan', start: '11-22', end: '12-21', group: 'Od', ruler: 'Yupiter' },
];

// ==================== ASTRO LIMITS ====================
const ASTRO_LIMITS = {
    DAY: { MIN: 1, MAX: 31 },
    MONTH: { MIN: 1, MAX: 12 },
    YEAR: { MIN: 1900, MAX: 2100 },
    HOUR: { MIN: 0, MAX: 23 },
    MINUTE: { MIN: 0, MAX: 59 }
};

// ==================== AZERBAIJAN CITIES MAP ====================
const AZERBAIJAN_CITIES_MAP = {};
if (typeof AZERBAIJAN_CITIES !== 'undefined') {
    AZERBAIJAN_CITIES.forEach(city => AZERBAIJAN_CITIES_MAP[city.key] = { ...city });
}

// ============================================================================
// COMMON UTILITIES
// ============================================================================

// ==================== PADDING 2 DIGITS ====================
const pad2 = (n) => (n < 10 ? `0${n}` : `${n}`);

// ==================== GET SUN SIGN BY DATE ====================
const getSunSign = (month, day) => {
    const m = month;
    const d = day;
    if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return 'Qoç';
    if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return 'Buğa';
    if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) return 'Əkizlər';
    if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) return 'Xərçəng';
    if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return 'Şir';
    if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return 'Qız';
    if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) return 'Tərəzi';
    if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) return 'Əqrəb';
    if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) return 'Oxatan';
    if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) return 'Oğlaq';
    if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return 'Dolça';
    return 'Balıq';
};

// ==================== FIND ZODIAC BY DATE ====================
const findZodiac = (month, day) => {
    const md = `${pad2(month)}-${pad2(day)}`;
    for (const z of ZODIAC_DATA) {
        if (z.start <= z.end) {
            if (md >= z.start && md <= z.end) return z;
        } else {
            if (md >= z.start || md <= z.end) return z;
        }
    }
    return null;
};

// ==================== DATE UTILITIES ====================
const getWeekday = (year, month, day) => {
    const d = new Date(year, month - 1, day);
    const names = ['Bazar', 'Bazar ertəsi', 'Çərşənbə axşamı', 'Çərşənbə', 'Cümə axşamı', 'Cümə', 'Şənbə'];
    return names[d.getDay()];
};

const calcAge = (year, month, day) => {
    const today = new Date();
    let age = today.getFullYear() - year;
    const m = today.getMonth() + 1 - month;
    const d = today.getDate() - day;
    if (m < 0 || (m === 0 && d < 0)) age--;
    return age;
};

const daysUntilNextBirthday = (year, month, day) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    let next = new Date(currentYear, month - 1, day);
    if (next < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
        next = new Date(currentYear + 1, month - 1, day);
    }
    const ms = next - today;
    return Math.ceil(ms / (1000 * 60 * 60 * 24));
};

// ============================================================================
// ASCENDANT CALCULATOR UTILITIES
// ============================================================================

// ==================== DEGREES TO SIGN ====================
const degreesToSign = (degrees) => {
    const normalizedDegrees = ((degrees % 360) + 360) % 360;
    const signIndex = Math.floor(normalizedDegrees / 30);
    const signDegrees = normalizedDegrees % 30;

    return {
        sign: ZODIAC_SIGNS[signIndex],
        degrees: signDegrees.toFixed(2),
        fullDegrees: normalizedDegrees.toFixed(2)
    };
};

// ==================== CALCULATE SIDEREAL TIME ====================
const calculateSiderealTime = (jd, longitude) => {
    const T = (jd - 2451545.0) / 36525.0;
    const GMST = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T - T * T * T / 38710000;
    const LST = (GMST + longitude) % 360;
    return LST < 0 ? LST + 360 : LST;
};

// ==================== CALCULATE ASCENDANT ====================
const calculateAscendant = (jd, latitude, longitude) => {
    const LST = calculateSiderealTime(jd, longitude);
    const latRad = latitude * Math.PI / 180;
    const ascendantDegrees = Math.atan2(
        Math.cos(LST * Math.PI / 180),
        -Math.sin(LST * Math.PI / 180) * Math.sin(latRad)
    ) * 180 / Math.PI;
    return ((ascendantDegrees % 360) + 360) % 360;
};

// ==================== JULIAN DAY ====================
const julianDay = (year, month, day, hour, minute) => {
    const a = Math.floor((14 - month) / 12);
    const y = year + 4800 - a;
    const m = month + 12 * a - 3;
    const jd = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
    return jd + (hour + minute / 60) / 24;
};

// ==================== CONVERT TO UTC ====================
const convertToUTC = (localTime, timezoneOffset) => {
    return localTime - timezoneOffset;
};

// ============================================================================
// ZODIACS CALCULATOR CLASS
// ============================================================================
class ZodiacsCalculator {
    constructor() {
        this.daySelect = document.getElementById('birthDay');
        this.monthSelect = document.getElementById('birthMonth');
        this.yearSelect = document.getElementById('birthYear');

        this.zodiacNameEl = document.getElementById('zodiacName');
        this.zodiacGroupEl = document.getElementById('zodiacGroup');
        this.zodiacRulerEl = document.getElementById('zodiacRuler');
        this.zodiacAgeEl = document.getElementById('zodiacAge');
        this.zodiacWeekdayEl = document.getElementById('zodiacWeekday');
        this.zodiacDaysLeftEl = document.getElementById('zodiacDaysLeft');

        this.resultsEl = document.getElementById('zodiacResults');

        this.init();
    }

    init() {
        this.populateDaySelect();
        this.populateYearSelect();
        this.setDefaultsToToday();
        this.setupEventListeners();
        this.calculate();
    }

    populateDaySelect() {
        if (!this.daySelect) return;
        const frag = document.createDocumentFragment();
        for (let i = 1; i <= 31; i++) {
            const opt = document.createElement('option');
            opt.value = i;
            opt.textContent = i;
            frag.appendChild(opt);
        }
        this.daySelect.appendChild(frag);
    }

    populateYearSelect() {
        if (!this.yearSelect) return;
        const frag = document.createDocumentFragment();
        for (let i = ASTRO_LIMITS.YEAR.MAX; i >= ASTRO_LIMITS.YEAR.MIN; i--) {
            const opt = document.createElement('option');
            opt.value = i;
            opt.textContent = i;
            frag.appendChild(opt);
        }
        this.yearSelect.appendChild(frag);
    }

    setDefaultsToToday() {
        const today = new Date();
        if (this.daySelect) {
            this.daySelect.value = today.getDate();
            this.updateSelectStyle(this.daySelect);
        }
        if (this.monthSelect) {
            this.monthSelect.value = today.getMonth() + 1;
            this.updateSelectStyle(this.monthSelect);
        }
        if (this.yearSelect) {
            this.yearSelect.value = today.getFullYear();
            this.updateSelectStyle(this.yearSelect);
        }
    }

    setupEventListeners() {
        const handleChange = (select) => {
            this.updateSelectStyle(select);
            this.calculate();
        };

        if (this.daySelect) {
            this.daySelect.addEventListener('change', () => handleChange(this.daySelect));
            this.updateSelectStyle(this.daySelect);
        }
        if (this.monthSelect) {
            this.monthSelect.addEventListener('change', () => handleChange(this.monthSelect));
            this.updateSelectStyle(this.monthSelect);
        }
        if (this.yearSelect) {
            this.yearSelect.addEventListener('change', () => handleChange(this.yearSelect));
            this.updateSelectStyle(this.yearSelect);
        }
    }

    updateSelectStyle(select) {
        if (!select) return;
        const hasValue = select.value && select.value !== '' && !select.options[select.selectedIndex]?.disabled;
        if (hasValue) {
            select.classList.add('has-value');
        } else {
            select.classList.remove('has-value');
        }
    }

    calculate() {
        const day = parseInt(this.daySelect?.value, 10);
        const month = parseInt(this.monthSelect?.value, 10);
        const year = parseInt(this.yearSelect?.value, 10);

        if (!day || !month || !year || isNaN(day) || isNaN(month) || isNaN(year)) {
            this.resultsEl.classList.add('is-hidden');
            return;
        }

        const zodiac = findZodiac(month, day);
        const age = calcAge(year, month, day);
        const weekday = getWeekday(year, month, day);
        const daysLeft = daysUntilNextBirthday(year, month, day);

        this.updateResults({ zodiac, age, weekday, daysLeft });
        this.resultsEl.classList.remove('is-hidden');
    }

    updateResults({ zodiac, age, weekday, daysLeft }) {
        this.zodiacNameEl.textContent = zodiac?.name || '-';
        this.zodiacGroupEl.textContent = zodiac?.group || '-';
        this.zodiacRulerEl.textContent = zodiac?.ruler || '-';
        this.zodiacAgeEl.textContent = isFinite(age) ? `${age}` : '-';
        this.zodiacWeekdayEl.textContent = weekday || '-';
        this.zodiacDaysLeftEl.textContent = isFinite(daysLeft) ? `${daysLeft}` : '-';
    }
}

// ============================================================================
// ASCENDANT CALCULATOR CLASS
// ============================================================================
class AscendantCalculator {
    constructor() {
        this.daySelect = document.getElementById('birthDay');
        this.monthSelect = document.getElementById('birthMonth');
        this.yearSelect = document.getElementById('birthYear');
        this.hourSelect = document.getElementById('birthHour');
        this.minuteSelect = document.getElementById('birthMinute');
        this.citySelect = document.getElementById('birthCity');

        this.ascendantSignEl = document.getElementById('ascendantSign');
        this.descendantSignEl = document.getElementById('descendantSign');
        this.sunSignEl = document.getElementById('sunSign');
        this.ascendantDegreeEl = document.getElementById('ascendantDegree');
        this.descendantDegreeEl = document.getElementById('descendantDegree');

        this.resultsEl = document.getElementById('ascendantResults');
        this.calculateBtn = document.getElementById('ascendantCalculate');

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.populateCitySelect();
        this.updateAllSelectStyles();
    }

    populateCitySelect() {
        if (!this.citySelect || typeof AZERBAIJAN_CITIES === 'undefined') return;
        const frag = document.createDocumentFragment();

        AZERBAIJAN_CITIES.forEach(city => {
            const opt = document.createElement('option');
            opt.value = city.key;
            opt.textContent = city.name;
            frag.appendChild(opt);
        });

        this.citySelect.appendChild(frag);
    }

    updateSelectStyle(select) {
        if (!select) return;
        const hasValue = select.value && select.value !== '' && !select.options[select.selectedIndex]?.disabled;
        if (hasValue) {
            select.classList.add('has-value');
        } else {
            select.classList.remove('has-value');
        }
    }

    updateAllSelectStyles() {
        this.updateSelectStyle(this.daySelect);
        this.updateSelectStyle(this.monthSelect);
        this.updateSelectStyle(this.yearSelect);
        this.updateSelectStyle(this.hourSelect);
        this.updateSelectStyle(this.minuteSelect);
        this.updateSelectStyle(this.citySelect);
    }

    setupEventListeners() {
        if (this.calculateBtn) {
            this.calculateBtn.addEventListener('click', () => {
                this.updateAllSelectStyles();
                this.calculate();
            });
        }

        // Update styles on select change
        const selects = [this.daySelect, this.monthSelect, this.yearSelect, this.hourSelect, this.minuteSelect, this.citySelect];
        selects.forEach(select => {
            if (select) {
                select.addEventListener('change', () => this.updateSelectStyle(select));
            }
        });
    }

    calculate() {
        const day = parseInt(this.daySelect.value);
        const month = parseInt(this.monthSelect.value);
        const year = parseInt(this.yearSelect.value);
        const hour = parseInt(this.hourSelect.value);
        const minute = parseInt(this.minuteSelect.value);
        const selectedCity = this.citySelect.value;
        const cityData = AZERBAIJAN_CITIES_MAP[selectedCity];
        const latitude = cityData ? cityData.lat : AZERBAIJAN_CITIES_MAP['baki']?.lat || 40.4093;
        const longitude = cityData ? cityData.lng : AZERBAIJAN_CITIES_MAP['baki']?.lng || 49.8671;
        const timezone = 4; // Azerbaijan fixed UTC+4

        // Validation
        if (!day || !month || !year || isNaN(hour) || isNaN(minute) || !selectedCity) {
            alert('Zəhmət olmasa bütün məlumatları daxil edin.');
            return;
        }

        if (day < ASTRO_LIMITS.DAY.MIN || day > ASTRO_LIMITS.DAY.MAX ||
            month < ASTRO_LIMITS.MONTH.MIN || month > ASTRO_LIMITS.MONTH.MAX ||
            year < ASTRO_LIMITS.YEAR.MIN || year > ASTRO_LIMITS.YEAR.MAX) {
            alert('Tarix məlumatları düzgün deyil.');
            return;
        }

        if (hour < ASTRO_LIMITS.HOUR.MIN || hour > ASTRO_LIMITS.HOUR.MAX ||
            minute < ASTRO_LIMITS.MINUTE.MIN || minute > ASTRO_LIMITS.MINUTE.MAX) {
            alert('Vaxt məlumatları düzgün deyil.');
            return;
        }

        try {
            const utcHour = convertToUTC(hour, timezone);
            const jd = julianDay(year, month, day, utcHour, minute);
            const ascendantDegrees = calculateAscendant(jd, latitude, longitude);
            const descendantDegrees = (ascendantDegrees + 180) % 360;

            const ascendant = degreesToSign(ascendantDegrees);
            const descendant = degreesToSign(descendantDegrees);
            const sunSign = getSunSign(month, day);

            this.updateResults(ascendant, descendant, sunSign);
            this.showResults();
        } catch (error) {
            console.error('Calculation error:', error);
        }
    }

    updateResults(ascendant, descendant, sunSign) {
        this.ascendantSignEl.textContent = ascendant.sign;
        this.descendantSignEl.textContent = descendant.sign;
        if (this.sunSignEl) this.sunSignEl.textContent = sunSign;
        this.ascendantDegreeEl.textContent = `${ascendant.degrees}°`;
        this.descendantDegreeEl.textContent = `${descendant.degrees}°`;
    }

    showResults() {
        this.resultsEl.classList.remove('is-hidden');
    }

    hideResults() {
        this.resultsEl.classList.add('is-hidden');
    }
}

// ============================================================================
// AUTO-INITIALIZATION
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize ZodiacsCalculator on zodiacs.html
    if (document.getElementById('zodiacsPage')) {
        new ZodiacsCalculator();
    }

    // Initialize AscendantCalculator on ascendant.html
    if (document.getElementById('ascendantResults')) {
        new AscendantCalculator();
    }
});

