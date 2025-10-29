// ============================================================================
// CREDIT CALCULATOR CONSTANTS
// ============================================================================
const CREDIT_CONSTANTS = {
    // Input limits
    LOAN_AMOUNT: {
        MIN: 1000,
        MAX: 500000,
        MAX_SAFETY: 1000000,
        STEP: 100
    },
    INTEREST_RATE: {
        MIN: 1,
        MAX: 50,
        MAX_SAFETY: 100,
        STEP: 0.1
    },
    LOAN_TERM: {
        MIN: 1,
        MAX: 84,
        MAX_SAFETY: 240, // 20 years in months
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
// CREDIT CALCULATOR CLASS
// ============================================================================
class CreditCalculator {
    constructor() {
        this.loanAmountInput = document.getElementById('loanAmount');
        this.interestRateInput = document.getElementById('interestRate');
        this.loanTermInput = document.getElementById('loanTerm');
        this.loanAmountRange = document.getElementById('loanAmountRange');
        this.interestRateRange = document.getElementById('interestRateRange');
        this.loanTermRange = document.getElementById('loanTermRange');

        this.monthlyPaymentEl = document.getElementById('monthlyPayment');
        this.totalPaymentEl = document.getElementById('totalPayment');
        this.totalInterestEl = document.getElementById('totalInterest');
        this.paymentScheduleEl = document.getElementById('paymentSchedule');

        this.init();
    }

    init() {
        // Initialize with valid default values
        this.validateAndClampInput(this.loanAmountInput, CREDIT_CONSTANTS.LOAN_AMOUNT.MIN, CREDIT_CONSTANTS.LOAN_AMOUNT.MAX, this.loanAmountRange, false);
        this.validateAndClampInput(this.interestRateInput, CREDIT_CONSTANTS.INTEREST_RATE.MIN, CREDIT_CONSTANTS.INTEREST_RATE.MAX, this.interestRateRange, false);
        this.validateAndClampInput(this.loanTermInput, CREDIT_CONSTANTS.LOAN_TERM.MIN, CREDIT_CONSTANTS.LOAN_TERM.MAX, this.loanTermRange, true);

        this.setupEventListeners();
        this.calculate();
    }

    setupEventListeners() {
        // Validate and clamp input values in real-time as user types
        this.loanAmountInput.addEventListener('input', () => {
            this.validateAndClampInput(this.loanAmountInput, CREDIT_CONSTANTS.LOAN_AMOUNT.MIN, CREDIT_CONSTANTS.LOAN_AMOUNT.MAX, this.loanAmountRange, false);
        });

        this.interestRateInput.addEventListener('input', () => {
            this.validateAndClampInput(this.interestRateInput, CREDIT_CONSTANTS.INTEREST_RATE.MIN, CREDIT_CONSTANTS.INTEREST_RATE.MAX, this.interestRateRange, false);
        });

        this.loanTermInput.addEventListener('input', () => {
            this.validateAndClampInput(this.loanTermInput, CREDIT_CONSTANTS.LOAN_TERM.MIN, CREDIT_CONSTANTS.LOAN_TERM.MAX, this.loanTermRange, true);
        });

        // Validate on paste (when user pastes a value)
        this.loanAmountInput.addEventListener('paste', (e) => {
            setTimeout(() => {
                this.validateAndClampInput(this.loanAmountInput, CREDIT_CONSTANTS.LOAN_AMOUNT.MIN, CREDIT_CONSTANTS.LOAN_AMOUNT.MAX, this.loanAmountRange, false);
            }, 0);
        });

        this.interestRateInput.addEventListener('paste', (e) => {
            setTimeout(() => {
                this.validateAndClampInput(this.interestRateInput, CREDIT_CONSTANTS.INTEREST_RATE.MIN, CREDIT_CONSTANTS.INTEREST_RATE.MAX, this.interestRateRange, false);
            }, 0);
        });

        this.loanTermInput.addEventListener('paste', (e) => {
            setTimeout(() => {
                this.validateAndClampInput(this.loanTermInput, CREDIT_CONSTANTS.LOAN_TERM.MIN, CREDIT_CONSTANTS.LOAN_TERM.MAX, this.loanTermRange, true);
            }, 0);
        });

        // Final validation on blur (when user leaves the input) - force validation
        this.loanAmountInput.addEventListener('blur', () => {
            this.validateAndClampInput(this.loanAmountInput, CREDIT_CONSTANTS.LOAN_AMOUNT.MIN, CREDIT_CONSTANTS.LOAN_AMOUNT.MAX, this.loanAmountRange, false, true);
        });

        this.interestRateInput.addEventListener('blur', () => {
            this.validateAndClampInput(this.interestRateInput, CREDIT_CONSTANTS.INTEREST_RATE.MIN, CREDIT_CONSTANTS.INTEREST_RATE.MAX, this.interestRateRange, false, true);
        });

        this.loanTermInput.addEventListener('blur', () => {
            this.validateAndClampInput(this.loanTermInput, CREDIT_CONSTANTS.LOAN_TERM.MIN, CREDIT_CONSTANTS.LOAN_TERM.MAX, this.loanTermRange, true, true);
        });

        // Sync range sliders with number inputs
        this.loanAmountRange.addEventListener('input', () => {
            this.loanAmountInput.value = this.loanAmountRange.value;
            this.calculate();
        });

        this.interestRateRange.addEventListener('input', () => {
            this.interestRateInput.value = this.interestRateRange.value;
            this.calculate();
        });

        this.loanTermRange.addEventListener('input', () => {
            this.loanTermInput.value = this.loanTermRange.value;
            this.calculate();
        });
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

    calculate() {
        let loanAmount = parseFloat(this.loanAmountInput.value) || 0;
        let interestRate = parseFloat(this.interestRateInput.value) || 0;
        let loanTerm = parseInt(this.loanTermInput.value) || 0;

        // Set limits to prevent extreme values
        loanAmount = Math.max(0, Math.min(loanAmount, CREDIT_CONSTANTS.LOAN_AMOUNT.MAX_SAFETY));
        interestRate = Math.max(0, Math.min(interestRate, CREDIT_CONSTANTS.INTEREST_RATE.MAX_SAFETY));
        loanTerm = Math.max(0, Math.min(loanTerm, CREDIT_CONSTANTS.LOAN_TERM.MAX_SAFETY));

        if (loanAmount <= 0 || interestRate < 0 || loanTerm <= 0) {
            this.showEmptyResults();
            return;
        }

        // Calculate monthly payment using the standard loan payment formula
        const monthlyRate = interestRate / CREDIT_CONSTANTS.PERCENTAGE_DIVISOR / CREDIT_CONSTANTS.MONTHS_PER_YEAR;

        // Prevent invalid calculations
        if (monthlyRate >= 1 || isNaN(monthlyRate) || !isFinite(monthlyRate)) {
            this.showEmptyResults();
            return;
        }

        const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm))
            / (Math.pow(1 + monthlyRate, loanTerm) - 1);

        // Check for invalid results
        if (!isFinite(monthlyPayment) || monthlyPayment <= 0 || isNaN(monthlyPayment)) {
            this.showEmptyResults();
            return;
        }

        const totalPayment = monthlyPayment * loanTerm;
        const totalInterest = totalPayment - loanAmount;

        // Update results
        this.monthlyPaymentEl.textContent = `${this.formatCurrency(monthlyPayment)} ${CREDIT_CONSTANTS.CURRENCY_CODE}`;
        this.totalPaymentEl.textContent = `${this.formatCurrency(totalPayment)} ${CREDIT_CONSTANTS.CURRENCY_CODE}`;
        this.totalInterestEl.textContent = `${this.formatCurrency(totalInterest)} ${CREDIT_CONSTANTS.CURRENCY_CODE}`;

        // Generate payment schedule
        this.generatePaymentSchedule(loanAmount, interestRate, loanTerm, monthlyPayment);
    }

    generatePaymentSchedule(loanAmount, interestRate, loanTerm, monthlyPayment) {
        const schedule = [];
        let remainingBalance = loanAmount;

        for (let month = 1; month <= loanTerm; month++) {
            const monthlyRate = interestRate / CREDIT_CONSTANTS.PERCENTAGE_DIVISOR / CREDIT_CONSTANTS.MONTHS_PER_YEAR;
            const interestPayment = remainingBalance * monthlyRate;
            const principalPayment = monthlyPayment - interestPayment;
            remainingBalance = remainingBalance - principalPayment;

            schedule.push({
                month,
                principal: principalPayment,
                interest: interestPayment,
                balance: Math.max(0, remainingBalance)
            });
        }

        this.displayPaymentSchedule(schedule);
    }

    displayPaymentSchedule(schedule) {
        this.paymentScheduleEl.innerHTML = '';

        schedule.forEach((payment, index) => {
            const isEven = index % 2 === 0;
            const row = document.createElement('div');
            row.className = `${CREDIT_CONSTANTS.CSS_CLASSES.TABLE_ROW} ${isEven ? CREDIT_CONSTANTS.CSS_CLASSES.TABLE_ROW_EVEN : ''}`;

            row.innerHTML = `
                <div class="${CREDIT_CONSTANTS.CSS_CLASSES.TABLE_COL}">${payment.month}</div>
                <div class="${CREDIT_CONSTANTS.CSS_CLASSES.TABLE_COL}">${this.formatCurrency(payment.principal)}</div>
                <div class="${CREDIT_CONSTANTS.CSS_CLASSES.TABLE_COL}">${this.formatCurrency(payment.interest)}</div>
                <div class="${CREDIT_CONSTANTS.CSS_CLASSES.TABLE_COL}">${this.formatCurrency(payment.balance)}</div>
            `;

            this.paymentScheduleEl.appendChild(row);
        });
    }

    showEmptyResults() {
        this.monthlyPaymentEl.textContent = `0 ${CREDIT_CONSTANTS.CURRENCY_CODE}`;
        this.totalPaymentEl.textContent = `0 ${CREDIT_CONSTANTS.CURRENCY_CODE}`;
        this.totalInterestEl.textContent = `0 ${CREDIT_CONSTANTS.CURRENCY_CODE}`;
        this.paymentScheduleEl.innerHTML = '';
    }

    formatCurrency(value) {
        // Prevent extremely large numbers from displaying
        if (!isFinite(value) || isNaN(value) || value > CREDIT_CONSTANTS.MAX_DISPLAY_VALUE) {
            return '0.00';
        }

        return new Intl.NumberFormat(CREDIT_CONSTANTS.LOCALE, {
            minimumFractionDigits: CREDIT_CONSTANTS.DECIMAL_PLACES,
            maximumFractionDigits: CREDIT_CONSTANTS.DECIMAL_PLACES
        }).format(value);
    }
}

// ============================================================================
// AUTO-INITIALIZATION
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('creditCalculatorPage')) {
        new CreditCalculator();
    }
});

