// ============================================================================
// DEPOSIT CALCULATOR CONSTANTS
// ============================================================================
const DEPOSIT_CONSTANTS = {
    // Input limits
    DEPOSIT_AMOUNT: {
        MIN: 100,
        MAX: 1000000,
        STEP: 100
    },
    INTEREST_RATE: {
        MIN: 1,
        MAX: 50,
        STEP: 0.1
    },
    DEPOSIT_TERM: {
        MIN: 1,
        MAX: 36,
        STEP: 1
    },

    // Calculation constants
    MONTHS_PER_YEAR: 12,
    PERCENTAGE_DIVISOR: 100,
    MAX_DISPLAY_VALUE: 1000000000000,

    // Display constants
    CURRENCY_CODE: 'AZN',
    LOCALE: 'az-AZ',
    DECIMAL_PLACES: 2,

    // CSS classes
    CSS_CLASSES: {
        TABLE_ROW: 'credit-table__row',
        TABLE_ROW_EVEN: 'credit-table__row--even',
        TABLE_COL: 'credit-table__col'
    }
};

// ============================================================================
// DEPOSIT CALCULATOR CLASS
// ============================================================================
class DepositCalculator {
    constructor() {
        this.depositAmountInput = document.getElementById('depositAmount');
        this.interestRateInput = document.getElementById('interestRate');
        this.depositTermInput = document.getElementById('depositTerm');
        this.depositAmountRange = document.getElementById('depositAmountRange');
        this.interestRateRange = document.getElementById('interestRateRange');
        this.depositTermRange = document.getElementById('depositTermRange');

        this.depositAmountResultEl = document.getElementById('depositAmountResult');
        this.interestEarnedEl = document.getElementById('interestEarned');
        this.totalAmountEl = document.getElementById('totalAmount');
        this.depositTermResultEl = document.getElementById('depositTermResult');
        this.interestRateResultEl = document.getElementById('interestRateResult');

        this.init();
    }

    init() {
        this.setDefaultValues();

        // Initialize with valid default values
        this.validateAndClampInput(this.depositAmountInput, DEPOSIT_CONSTANTS.DEPOSIT_AMOUNT.MIN, DEPOSIT_CONSTANTS.DEPOSIT_AMOUNT.MAX, this.depositAmountRange, false);
        this.validateAndClampInput(this.interestRateInput, DEPOSIT_CONSTANTS.INTEREST_RATE.MIN, DEPOSIT_CONSTANTS.INTEREST_RATE.MAX, this.interestRateRange, false);
        this.validateAndClampInput(this.depositTermInput, DEPOSIT_CONSTANTS.DEPOSIT_TERM.MIN, DEPOSIT_CONSTANTS.DEPOSIT_TERM.MAX, this.depositTermRange, true);

        this.setupEventListeners();
        this.calculate();
    }

    validateAndClampInput(input, min, max, rangeInput, isInteger = false, forceValidation = false) {
        if (!input) return;

        let value = input.value.trim();

        // Allow empty value during typing (unless forced validation on blur)
        if (value === '' || value === null || value === undefined) {
            if (forceValidation) {
                // On blur, set to min if empty
                input.value = min;
                if (rangeInput) rangeInput.value = min;
                this.calculate();
            }
            return;
        }

        // Parse value based on type
        let parsedValue = isInteger ? parseInt(value) : parseFloat(value);

        // Check if value is valid number
        if (isNaN(parsedValue) || !isFinite(parsedValue)) {
            // During typing, allow partial input (like "1" when typing "100")
            // Only reject completely invalid inputs (non-numeric characters)
            if (!forceValidation) {
                // Check if string contains only numbers, decimal point, and minus sign
                const isValidPartial = /^[-]?[0-9]*\.?[0-9]*$/.test(value);
                if (isValidPartial) {
                    return; // Allow partial input during typing
                }
            }

            // Invalid number - restore previous valid value or set to min
            const lastValid = input.dataset.lastValid || min;
            input.value = lastValid;
            parsedValue = parseFloat(lastValid);
        } else {
            // Clamp value to min/max range only if it exceeds limits
            if (parsedValue > max) {
                input.value = max;
                parsedValue = max;
            } else if (parsedValue < min && forceValidation) {
                // Only clamp to min on blur, not during typing
                input.value = min;
                parsedValue = min;
            }

            // Store valid value for future reference
            input.dataset.lastValid = parsedValue;
        }

        // Sync with range slider if available
        if (rangeInput) {
            rangeInput.value = parsedValue;
        }

        // Trigger calculation
        this.calculate();
    }

    setupEventListeners() {
        // Validate and clamp input values in real-time as user types
        this.depositAmountInput.addEventListener('input', () => {
            this.validateAndClampInput(this.depositAmountInput, DEPOSIT_CONSTANTS.DEPOSIT_AMOUNT.MIN, DEPOSIT_CONSTANTS.DEPOSIT_AMOUNT.MAX, this.depositAmountRange, false);
        });

        this.interestRateInput.addEventListener('input', () => {
            this.validateAndClampInput(this.interestRateInput, DEPOSIT_CONSTANTS.INTEREST_RATE.MIN, DEPOSIT_CONSTANTS.INTEREST_RATE.MAX, this.interestRateRange, false);
        });

        this.depositTermInput.addEventListener('input', () => {
            this.validateAndClampInput(this.depositTermInput, DEPOSIT_CONSTANTS.DEPOSIT_TERM.MIN, DEPOSIT_CONSTANTS.DEPOSIT_TERM.MAX, this.depositTermRange, true);
        });

        // Validate on paste
        this.depositAmountInput.addEventListener('paste', () => {
            setTimeout(() => {
                this.validateAndClampInput(this.depositAmountInput, DEPOSIT_CONSTANTS.DEPOSIT_AMOUNT.MIN, DEPOSIT_CONSTANTS.DEPOSIT_AMOUNT.MAX, this.depositAmountRange, false);
            }, 0);
        });

        this.interestRateInput.addEventListener('paste', () => {
            setTimeout(() => {
                this.validateAndClampInput(this.interestRateInput, DEPOSIT_CONSTANTS.INTEREST_RATE.MIN, DEPOSIT_CONSTANTS.INTEREST_RATE.MAX, this.interestRateRange, false);
            }, 0);
        });

        this.depositTermInput.addEventListener('paste', () => {
            setTimeout(() => {
                this.validateAndClampInput(this.depositTermInput, DEPOSIT_CONSTANTS.DEPOSIT_TERM.MIN, DEPOSIT_CONSTANTS.DEPOSIT_TERM.MAX, this.depositTermRange, true);
            }, 0);
        });

        // Final validation on blur - force validation
        this.depositAmountInput.addEventListener('blur', () => {
            this.validateAndClampInput(this.depositAmountInput, DEPOSIT_CONSTANTS.DEPOSIT_AMOUNT.MIN, DEPOSIT_CONSTANTS.DEPOSIT_AMOUNT.MAX, this.depositAmountRange, false, true);
        });

        this.interestRateInput.addEventListener('blur', () => {
            this.validateAndClampInput(this.interestRateInput, DEPOSIT_CONSTANTS.INTEREST_RATE.MIN, DEPOSIT_CONSTANTS.INTEREST_RATE.MAX, this.interestRateRange, false, true);
        });

        this.depositTermInput.addEventListener('blur', () => {
            this.validateAndClampInput(this.depositTermInput, DEPOSIT_CONSTANTS.DEPOSIT_TERM.MIN, DEPOSIT_CONSTANTS.DEPOSIT_TERM.MAX, this.depositTermRange, true, true);
        });

        // Sync ranges with inputs
        this.depositAmountRange.addEventListener('input', () => {
            this.depositAmountInput.value = this.depositAmountRange.value;
            this.calculate();
        });
        this.interestRateRange.addEventListener('input', () => {
            this.interestRateInput.value = this.interestRateRange.value;
            this.calculate();
        });
        this.depositTermRange.addEventListener('input', () => {
            this.depositTermInput.value = this.depositTermRange.value;
            this.calculate();
        });

        // No separate actions; calculation happens on input change like credit calculator
    }

    setDefaultValues() {
        // Set reasonable defaults
        this.depositAmountInput.value = 10000;
        this.interestRateInput.value = 8.5;
        this.depositTermInput.value = 12;
        this.depositAmountRange.value = 10000;
        this.interestRateRange.value = 8.5;
        this.depositTermRange.value = 12;
        // No type select
    }

    calculate() {
        const depositAmount = parseFloat(this.depositAmountInput.value) || 0;
        const interestRate = parseFloat(this.interestRateInput.value) || 0;
        const depositTermMonths = parseInt(this.depositTermInput.value) || 0;
        const depositType = 'compound';

        // Validate inputs
        if (depositAmount <= 0 || interestRate <= 0 || depositTermMonths <= 0) {
            this.hideResults();
            return;
        }

        // Calculate interest earned
        let interestEarned;
        if (depositType === 'simple') {
            // Simple interest: P * r * t
            const years = depositTermMonths / DEPOSIT_CONSTANTS.MONTHS_PER_YEAR;
            interestEarned = depositAmount * (interestRate / DEPOSIT_CONSTANTS.PERCENTAGE_DIVISOR) * years;
        } else {
            // Compound interest: P * (1 + r/n)^(n*t) - P
            const years = depositTermMonths / DEPOSIT_CONSTANTS.MONTHS_PER_YEAR;
            const monthlyRate = interestRate / DEPOSIT_CONSTANTS.PERCENTAGE_DIVISOR / DEPOSIT_CONSTANTS.MONTHS_PER_YEAR;
            const totalAmount = depositAmount * Math.pow(1 + monthlyRate, depositTermMonths);
            interestEarned = totalAmount - depositAmount;
        }

        const totalAmount = depositAmount + interestEarned;

        // Update results
        this.depositAmountResultEl.textContent = `${this.formatCurrency(depositAmount)} ${DEPOSIT_CONSTANTS.CURRENCY_CODE}`;
        this.interestEarnedEl.textContent = `${this.formatCurrency(interestEarned)} ${DEPOSIT_CONSTANTS.CURRENCY_CODE}`;
        this.totalAmountEl.textContent = `${this.formatCurrency(totalAmount)} ${DEPOSIT_CONSTANTS.CURRENCY_CODE}`;
        this.depositTermResultEl.textContent = `${depositTermMonths} ay`;
        this.interestRateResultEl.textContent = `${interestRate}%`;
        this.showResults();
    }

    reset() {
        this.depositAmountInput.value = '';
        this.interestRateInput.value = '';
        this.depositTermSelect.value = '';
        this.hideResults();
    }

    showResults() {
        document.getElementById('depositResults').classList.remove('is-hidden');
    }

    hideResults() {
        document.getElementById('depositResults').classList.add('is-hidden');
    }

    formatCurrency(value) {
        // Prevent extremely large numbers from displaying
        if (!isFinite(value) || isNaN(value) || value > DEPOSIT_CONSTANTS.MAX_DISPLAY_VALUE) {
            return '0.00';
        }

        return new Intl.NumberFormat(DEPOSIT_CONSTANTS.LOCALE, {
            minimumFractionDigits: DEPOSIT_CONSTANTS.DECIMAL_PLACES,
            maximumFractionDigits: DEPOSIT_CONSTANTS.DECIMAL_PLACES
        }).format(value);
    }
}

// ============================================================================
// AUTO-INITIALIZATION
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('depositCalculatorPage')) {
        new DepositCalculator();
    }
});
