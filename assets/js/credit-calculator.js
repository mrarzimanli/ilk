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
        this.setupEventListeners();
        this.calculate();
    }

    setupEventListeners() {
        // Sync number inputs with range sliders with validation
        this.loanAmountInput.addEventListener('input', () => {
            let value = Math.max(1000, Math.min(parseFloat(this.loanAmountInput.value) || 1000, 500000));
            this.loanAmountInput.value = value;
            this.loanAmountRange.value = value;
            this.calculate();
        });

        this.interestRateInput.addEventListener('input', () => {
            let value = Math.max(1, Math.min(parseFloat(this.interestRateInput.value) || 1, 50));
            this.interestRateInput.value = value;
            this.interestRateRange.value = value;
            this.calculate();
        });

        this.loanTermInput.addEventListener('input', () => {
            let value = Math.max(1, Math.min(parseInt(this.loanTermInput.value) || 1, 84));
            this.loanTermInput.value = value;
            this.loanTermRange.value = value;
            this.calculate();
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

    calculate() {
        let loanAmount = parseFloat(this.loanAmountInput.value) || 0;
        let interestRate = parseFloat(this.interestRateInput.value) || 0;
        let loanTerm = parseInt(this.loanTermInput.value) || 0;

        // Set limits to prevent extreme values
        loanAmount = Math.max(0, Math.min(loanAmount, 1000000)); // Max 1 million AZN
        interestRate = Math.max(0, Math.min(interestRate, 100)); // Max 100%
        loanTerm = Math.max(0, Math.min(loanTerm, 240)); // Max 20 years (240 months)

        if (loanAmount <= 0 || interestRate < 0 || loanTerm <= 0) {
            this.showEmptyResults();
            return;
        }

        // Calculate monthly payment using the standard loan payment formula
        const monthlyRate = interestRate / 100 / 12; // Convert to monthly decimal

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
        this.monthlyPaymentEl.textContent = `${this.formatCurrency(monthlyPayment)} AZN`;
        this.totalPaymentEl.textContent = `${this.formatCurrency(totalPayment)} AZN`;
        this.totalInterestEl.textContent = `${this.formatCurrency(totalInterest)} AZN`;

        // Generate payment schedule
        this.generatePaymentSchedule(loanAmount, interestRate, loanTerm, monthlyPayment);
    }

    generatePaymentSchedule(loanAmount, interestRate, loanTerm, monthlyPayment) {
        const schedule = [];
        let remainingBalance = loanAmount;

        for (let month = 1; month <= loanTerm; month++) {
            const monthlyRate = interestRate / 100 / 12;
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
            row.className = `credit-table__row ${isEven ? 'credit-table__row--even' : ''}`;

            row.innerHTML = `
                <div class="credit-table__col">${payment.month}</div>
                <div class="credit-table__col">${this.formatCurrency(payment.principal)}</div>
                <div class="credit-table__col">${this.formatCurrency(payment.interest)}</div>
                <div class="credit-table__col">${this.formatCurrency(payment.balance)}</div>
            `;

            this.paymentScheduleEl.appendChild(row);
        });
    }

    showEmptyResults() {
        this.monthlyPaymentEl.textContent = '0 AZN';
        this.totalPaymentEl.textContent = '0 AZN';
        this.totalInterestEl.textContent = '0 AZN';
        this.paymentScheduleEl.innerHTML = '';
    }

    formatCurrency(value) {
        // Prevent extremely large numbers from displaying
        if (!isFinite(value) || isNaN(value) || value > 1000000000000) {
            return '0.00';
        }

        return new Intl.NumberFormat('az-AZ', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
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

