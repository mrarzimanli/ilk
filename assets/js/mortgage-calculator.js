// ============================================================================
// MORTGAGE CALCULATOR CONSTANTS
// ============================================================================
const MORTGAGE_CONSTANTS = {
    // Input limits
    DOWN_PAYMENT_RATE: {
        MIN: 0,
        MAX: 50,
        STEP: 0.5
    },
    PROPERTY_VALUE: {
        MIN: 50000,
        MAX: 1000000,
        STEP: 1000
    },
    LOAN_TERM: {
        MIN: 1,
        MAX: 30,
        STEP: 1
    },

    // Calculation constants
    ANNUAL_INTEREST_RATE: 25,
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
// MORTGAGE CALCULATOR CLASS
// ============================================================================
class MortgageCalculator {
    constructor() {
        this.downPaymentRateInput = document.getElementById('downPaymentRate');
        this.propertyValueInput = document.getElementById('propertyValue');
        this.loanTermInput = document.getElementById('loanTerm');

        this.downPaymentRateRange = document.getElementById('downPaymentRateRange');
        this.propertyValueRange = document.getElementById('propertyValueRange');
        this.loanTermRange = document.getElementById('loanTermRange');

        this.minDownPaymentEl = document.getElementById('minDownPayment');
        this.monthlyPaymentEl = document.getElementById('monthlyPayment');
        this.loanAmountEl = document.getElementById('loanAmount');
        this.annualRateEl = document.getElementById('annualRate');
        this.paymentScheduleEl = document.getElementById('paymentSchedule');

        this.init();
    }

    init() {
        // Initialize with valid default values
        this.validateAndClampInput(this.downPaymentRateInput, MORTGAGE_CONSTANTS.DOWN_PAYMENT_RATE.MIN, MORTGAGE_CONSTANTS.DOWN_PAYMENT_RATE.MAX, this.downPaymentRateRange, false);
        this.validateAndClampInput(this.propertyValueInput, MORTGAGE_CONSTANTS.PROPERTY_VALUE.MIN, MORTGAGE_CONSTANTS.PROPERTY_VALUE.MAX, this.propertyValueRange, false);
        this.validateAndClampInput(this.loanTermInput, MORTGAGE_CONSTANTS.LOAN_TERM.MIN, MORTGAGE_CONSTANTS.LOAN_TERM.MAX, this.loanTermRange, true);

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
        this.downPaymentRateInput.addEventListener('input', () => {
            this.validateAndClampInput(this.downPaymentRateInput, MORTGAGE_CONSTANTS.DOWN_PAYMENT_RATE.MIN, MORTGAGE_CONSTANTS.DOWN_PAYMENT_RATE.MAX, this.downPaymentRateRange, false);
        });

        this.propertyValueInput.addEventListener('input', () => {
            this.validateAndClampInput(this.propertyValueInput, MORTGAGE_CONSTANTS.PROPERTY_VALUE.MIN, MORTGAGE_CONSTANTS.PROPERTY_VALUE.MAX, this.propertyValueRange, false);
        });

        this.loanTermInput.addEventListener('input', () => {
            this.validateAndClampInput(this.loanTermInput, MORTGAGE_CONSTANTS.LOAN_TERM.MIN, MORTGAGE_CONSTANTS.LOAN_TERM.MAX, this.loanTermRange, true);
        });

        // Validate on paste
        this.downPaymentRateInput.addEventListener('paste', () => {
            setTimeout(() => {
                this.validateAndClampInput(this.downPaymentRateInput, MORTGAGE_CONSTANTS.DOWN_PAYMENT_RATE.MIN, MORTGAGE_CONSTANTS.DOWN_PAYMENT_RATE.MAX, this.downPaymentRateRange, false);
            }, 0);
        });

        this.propertyValueInput.addEventListener('paste', () => {
            setTimeout(() => {
                this.validateAndClampInput(this.propertyValueInput, MORTGAGE_CONSTANTS.PROPERTY_VALUE.MIN, MORTGAGE_CONSTANTS.PROPERTY_VALUE.MAX, this.propertyValueRange, false);
            }, 0);
        });

        this.loanTermInput.addEventListener('paste', () => {
            setTimeout(() => {
                this.validateAndClampInput(this.loanTermInput, MORTGAGE_CONSTANTS.LOAN_TERM.MIN, MORTGAGE_CONSTANTS.LOAN_TERM.MAX, this.loanTermRange, true);
            }, 0);
        });

        // Final validation on blur - force validation
        this.downPaymentRateInput.addEventListener('blur', () => {
            this.validateAndClampInput(this.downPaymentRateInput, MORTGAGE_CONSTANTS.DOWN_PAYMENT_RATE.MIN, MORTGAGE_CONSTANTS.DOWN_PAYMENT_RATE.MAX, this.downPaymentRateRange, false, true);
        });

        this.propertyValueInput.addEventListener('blur', () => {
            this.validateAndClampInput(this.propertyValueInput, MORTGAGE_CONSTANTS.PROPERTY_VALUE.MIN, MORTGAGE_CONSTANTS.PROPERTY_VALUE.MAX, this.propertyValueRange, false, true);
        });

        this.loanTermInput.addEventListener('blur', () => {
            this.validateAndClampInput(this.loanTermInput, MORTGAGE_CONSTANTS.LOAN_TERM.MIN, MORTGAGE_CONSTANTS.LOAN_TERM.MAX, this.loanTermRange, true, true);
        });

        // Sync range sliders with number inputs
        this.downPaymentRateRange.addEventListener('input', () => {
            this.downPaymentRateInput.value = this.downPaymentRateRange.value;
            this.calculate();
        });

        this.propertyValueRange.addEventListener('input', () => {
            this.propertyValueInput.value = this.propertyValueRange.value;
            this.calculate();
        });

        this.loanTermRange.addEventListener('input', () => {
            this.loanTermInput.value = this.loanTermRange.value;
            this.calculate();
        });
    }

    calculate() {
        const downPaymentRate = parseFloat(this.downPaymentRateInput.value);
        const propertyValue = parseFloat(this.propertyValueInput.value);
        const loanTermYears = parseInt(this.loanTermInput.value);

        // Validate inputs
        if (downPaymentRate < 0 || propertyValue <= 0 || loanTermYears <= 0) {
            this.showEmptyResults();
            return;
        }

        // Calculate minimal down payment
        const minDownPayment = (propertyValue * downPaymentRate) / MORTGAGE_CONSTANTS.PERCENTAGE_DIVISOR;

        // Calculate loan amount
        const loanAmount = propertyValue - minDownPayment;

        // Calculate monthly payment
        const loanTermMonths = loanTermYears * MORTGAGE_CONSTANTS.MONTHS_PER_YEAR;
        const monthlyRate = (MORTGAGE_CONSTANTS.ANNUAL_INTEREST_RATE / MORTGAGE_CONSTANTS.PERCENTAGE_DIVISOR) / MORTGAGE_CONSTANTS.MONTHS_PER_YEAR;

        let monthlyPayment = 0;
        if (loanAmount > 0 && monthlyRate > 0) {
            monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths))
                / (Math.pow(1 + monthlyRate, loanTermMonths) - 1);
        } else if (loanAmount > 0) {
            monthlyPayment = loanAmount / loanTermMonths;
        }

        // Check for invalid results
        if (!isFinite(monthlyPayment) || isNaN(monthlyPayment) || monthlyPayment < 0) {
            monthlyPayment = 0;
        }

        // Update result displays
        this.minDownPaymentEl.textContent = `${this.formatNumber(Math.round(minDownPayment))} ${MORTGAGE_CONSTANTS.CURRENCY_CODE}`;
        this.monthlyPaymentEl.textContent = `${this.formatCurrency(monthlyPayment)} ${MORTGAGE_CONSTANTS.CURRENCY_CODE}`;
        this.loanAmountEl.textContent = `${this.formatNumber(Math.round(loanAmount))} ${MORTGAGE_CONSTANTS.CURRENCY_CODE}`;
        this.annualRateEl.textContent = `${MORTGAGE_CONSTANTS.ANNUAL_INTEREST_RATE}%`;

        // Generate payment schedule
        this.generatePaymentSchedule(loanAmount, loanTermYears, monthlyPayment);
    }

    showEmptyResults() {
        this.minDownPaymentEl.textContent = `0 ${MORTGAGE_CONSTANTS.CURRENCY_CODE}`;
        this.monthlyPaymentEl.textContent = `0.00 ${MORTGAGE_CONSTANTS.CURRENCY_CODE}`;
        this.loanAmountEl.textContent = `0 ${MORTGAGE_CONSTANTS.CURRENCY_CODE}`;
        this.annualRateEl.textContent = '0%';
        this.paymentScheduleEl.innerHTML = '';
    }

    generatePaymentSchedule(loanAmount, loanTermYears, monthlyPayment) {
        const schedule = [];
        let remainingBalance = loanAmount;
        const loanTermMonths = loanTermYears * MORTGAGE_CONSTANTS.MONTHS_PER_YEAR;
        const monthlyRate = (MORTGAGE_CONSTANTS.ANNUAL_INTEREST_RATE / MORTGAGE_CONSTANTS.PERCENTAGE_DIVISOR) / MORTGAGE_CONSTANTS.MONTHS_PER_YEAR;

        for (let month = 1; month <= loanTermMonths; month++) {
            const interestPayment = remainingBalance * monthlyRate;
            const principalPayment = monthlyPayment - interestPayment;
            remainingBalance = Math.max(0, remainingBalance - principalPayment);

            schedule.push({
                month,
                principal: principalPayment,
                interest: interestPayment,
                balance: remainingBalance
            });
        }

        this.displayPaymentSchedule(schedule);
    }

    displayPaymentSchedule(schedule) {
        this.paymentScheduleEl.innerHTML = '';

        schedule.forEach((payment, index) => {
            const isEven = index % 2 === 0;
            const row = document.createElement('div');
            row.className = `${MORTGAGE_CONSTANTS.CSS_CLASSES.TABLE_ROW} ${isEven ? MORTGAGE_CONSTANTS.CSS_CLASSES.TABLE_ROW_EVEN : ''}`;

            row.innerHTML = `
                <div class="${MORTGAGE_CONSTANTS.CSS_CLASSES.TABLE_COL}">${payment.month}</div>
                <div class="${MORTGAGE_CONSTANTS.CSS_CLASSES.TABLE_COL}">${this.formatCurrency(payment.principal)}</div>
                <div class="${MORTGAGE_CONSTANTS.CSS_CLASSES.TABLE_COL}">${this.formatCurrency(payment.interest)}</div>
                <div class="${MORTGAGE_CONSTANTS.CSS_CLASSES.TABLE_COL}">${this.formatCurrency(payment.balance)}</div>
            `;

            this.paymentScheduleEl.appendChild(row);
        });
    }

    formatNumber(value) {
        if (!isFinite(value) || isNaN(value)) {
            return '0';
        }

        return new Intl.NumberFormat(MORTGAGE_CONSTANTS.LOCALE, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    }

    formatCurrency(value) {
        // Prevent extremely large numbers from displaying
        if (!isFinite(value) || isNaN(value) || value > MORTGAGE_CONSTANTS.MAX_DISPLAY_VALUE) {
            return '0.00';
        }

        return new Intl.NumberFormat(MORTGAGE_CONSTANTS.LOCALE, {
            minimumFractionDigits: MORTGAGE_CONSTANTS.DECIMAL_PLACES,
            maximumFractionDigits: MORTGAGE_CONSTANTS.DECIMAL_PLACES
        }).format(value);
    }
}

// ============================================================================
// AUTO-INITIALIZATION
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('mortgageCalculatorPage')) {
        new MortgageCalculator();
    }
});

