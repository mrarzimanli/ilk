'use strict';

// ============================================================================
// CURRENCY CONVERTER APPLICATION
// ============================================================================

class CurrencyConverter {
    constructor() {
        this.currencies = new Map();
        this.selectedCurrencies = new Set(['AZN', 'USD', 'EUR']); // Default currencies
        this.exchangeRates = new Map();
        this.baseCurrency = 'AZN';

        this.init();
    }

    async init() {
        this.setupEventListeners();
        this.renderCurrencyCards(true); // Show cards with loading state
        await this.loadCurrencyData();
        this.renderCurrencyCards(false); // Re-render with actual data
        this.setupCurrencyModal();
        this.renderExchangeRatesTable(); // Render the complete rates table
    }

    setupEventListeners() {
        // Add currency button
        const addCurrencyBtn = document.getElementById('addCurrencyBtn');
        if (addCurrencyBtn) {
            addCurrencyBtn.addEventListener('click', () => {
                this.openCurrencyModal();
            });
        }

        // Close modal
        const closeModalBtn = document.getElementById('closeModal');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                this.closeCurrencyModal();
            });
        }

        // Close modal on backdrop click
        const currencyModal = document.getElementById('currencyModal');
        if (currencyModal) {
            currencyModal.addEventListener('click', (e) => {
                if (e.target.id === 'currencyModal') {
                    this.closeCurrencyModal();
                }
            });
        }

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeCurrencyModal();
            }
        });
    }

    generateDateStrings() {
        const dates = [];
        const today = new Date();

        // Generate dates for today and previous 7 days
        for (let i = 0; i < 8; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);

            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const dateString = `${day}.${month}.${year}`;

            dates.push(dateString);
        }

        return dates;
    }

    async loadCurrencyData() {
        try {
            // Show loading state
            this.renderCurrencyCards(true);

            // Load currency definitions in CBAR order
            this.currencies = new Map([
                ['AZN', { code: 'AZN', name: 'AZƏRBAYCAN MANATI', flag: '🇦🇿', rate: 1 }],
                ['USD', { code: 'USD', name: 'ABŞ dolları', flag: '🇺🇸', rate: 1.7 }],
                ['EUR', { code: 'EUR', name: 'Avro', flag: '🇪🇺', rate: 1.9737 }],
                ['AUD', { code: 'AUD', name: 'Avstraliya dolları', flag: '🇦🇺', rate: 1.1052 }],
                ['BYN', { code: 'BYN', name: 'Belarus rublu', flag: '🇧🇾', rate: 0.5594 }],
                ['BGN', { code: 'BGN', name: 'Bolqarıstan levi', flag: '🇧🇬', rate: 1.009 }],
                ['AED', { code: 'AED', name: 'BƏƏ dirhəmi', flag: '🇦🇪', rate: 0.4628 }],
                ['KRW', { code: 'KRW', name: 'Cənubi Koreya vonu', flag: '🇰🇷', rate: 0.119 }],
                ['CZK', { code: 'CZK', name: 'Çexiya kronu', flag: '🇨🇿', rate: 0.0812 }],
                ['CNY', { code: 'CNY', name: 'Çin yuanı', flag: '🇨🇳', rate: 0.2387 }],
                ['DKK', { code: 'DKK', name: 'Danimarka kronu', flag: '🇩🇰', rate: 0.2643 }],
                ['GEL', { code: 'GEL', name: 'Gürcü larisi', flag: '🇬🇪', rate: 0.6279 }],
                ['HKD', { code: 'HKD', name: 'Honq Konq dolları', flag: '🇭🇰', rate: 0.2188 }],
                ['INR', { code: 'INR', name: 'Hindistan rupisi', flag: '🇮🇳', rate: 0.0193 }],
                ['GBP', { code: 'GBP', name: 'İngilis funt sterlinqi', flag: '🇬🇧', rate: 2.2747 }],
                ['SEK', { code: 'SEK', name: 'İsveç kronu', flag: '🇸🇪', rate: 0.1804 }],
                ['CHF', { code: 'CHF', name: 'İsveçrə frankı', flag: '🇨🇭', rate: 2.1363 }],
                ['ILS', { code: 'ILS', name: 'İsrail şekeli', flag: '🇮🇱', rate: 0.5161 }],
                ['CAD', { code: 'CAD', name: 'Kanada dolları', flag: '🇨🇦', rate: 1.2142 }],
                ['KWD', { code: 'KWD', name: 'Küveyt dinarı', flag: '🇰🇼', rate: 5.5495 }],
                ['KZT', { code: 'KZT', name: 'Qazaxıstan tengəsi', flag: '🇰🇿', rate: 0.3156 }],
                ['QAR', { code: 'QAR', name: 'Qətər rialı', flag: '🇶🇦', rate: 0.4664 }],
                ['KGS', { code: 'KGS', name: 'Qırğız somu', flag: '🇰🇬', rate: 0.0195 }],
                ['HUF', { code: 'HUF', name: 'Macarıstan forinti', flag: '🇭🇺', rate: 0.507 }],
                ['MDL', { code: 'MDL', name: 'Moldova leyi', flag: '🇲🇩', rate: 0.1009 }],
                ['NOK', { code: 'NOK', name: 'Norveç kronu', flag: '🇳🇴', rate: 0.1693 }],
                ['UZS', { code: 'UZS', name: 'Özbək somu', flag: '🇺🇿', rate: 0.0142 }],
                ['PKR', { code: 'PKR', name: 'Pakistan rupisi', flag: '🇵🇰', rate: 0.6006 }],
                ['PLN', { code: 'PLN', name: 'Polşa zlotısı', flag: '🇵🇱', rate: 0.4655 }],
                ['RON', { code: 'RON', name: 'Rumıniya leyi', flag: '🇷🇴', rate: 0.3883 }],
                ['RUB', { code: 'RUB', name: 'Rusiya rublu', flag: '🇷🇺', rate: 2.0885 }],
                ['RSD', { code: 'RSD', name: 'Serbiya dinarı', flag: '🇷🇸', rate: 0.0168 }],
                ['SGD', { code: 'SGD', name: 'Sinqapur dolları', flag: '🇸🇬', rate: 1.3102 }],
                ['SAR', { code: 'SAR', name: 'Səudiyyə Ərəbistanı rialı', flag: '🇸🇦', rate: 0.4533 }],
                ['XDR', { code: 'XDR', name: 'SDR (BVF-nin xüsusi borcalma hüquqları)', flag: '🌍', rate: 2.318 }],
                ['TRY', { code: 'TRY', name: 'Türk lirəsi', flag: '🇹🇷', rate: 0.0405 }],
                ['TMT', { code: 'TMT', name: 'Türkmənistan manatı', flag: '🇹🇲', rate: 0.4857 }],
                ['UAH', { code: 'UAH', name: 'Ukrayna qrivnası', flag: '🇺🇦', rate: 0.0407 }],
                ['JPY', { code: 'JPY', name: 'Yapon yeni', flag: '🇯🇵', rate: 1.1202 }],
                ['NZD', { code: 'NZD', name: 'Yeni Zelandiya dolları', flag: '🇳🇿', rate: 0.978 }]
            ]);

            // Fetch real-time data from cbar.az
            await this.fetchExchangeRates();
        } catch (error) {
            console.error('Error loading currency data:', error);
        }
    }

    async fetchExchangeRates() {
        try {
            // Generate date strings for today and previous days (fallback)
            const dates = this.generateDateStrings();

            // Try multiple approaches to fetch data
            let xmlText = null;

            // Try each date until we get data
            for (const dateString of dates) {
                if (xmlText) break; // Stop if we already have data

                // Try direct fetch (might work in some environments)
                try {
                    const response = await fetch(`https://cbar.az/currencies/${dateString}.xml`, {
                        mode: 'cors',
                        headers: {
                            'Accept': 'application/xml, text/xml, */*'
                        }
                    });
                    if (response.ok) {
                        xmlText = await response.text();
                        break;
                    }
                } catch (corsError) {
                    console.log(`Direct fetch failed for ${dateString} due to CORS`);
                }
            }

            // Parse XML if we got data
            if (xmlText) {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
                const currencies = xmlDoc.getElementsByTagName('Valute');

                // Update exchange rates from XML data
                for (let currency of currencies) {
                    const code = currency.getAttribute('Code');
                    const nominal = parseFloat(currency.getElementsByTagName('Nominal')[0].textContent);
                    const value = parseFloat(currency.getElementsByTagName('Value')[0].textContent);

                    if (this.currencies.has(code)) {
                        // Convert to AZN rate (how much AZN for 1 unit of foreign currency)
                        const rate = nominal / value;
                        this.currencies.get(code).rate = rate;
                        this.exchangeRates.set(code, rate);
                    }
                }

                // Update date in UI
                this.updateLastUpdateTime();
                console.log('Exchange rates updated successfully from cbar.az');

                // Update the exchange rates table
                this.renderExchangeRatesTable();
            }

        } catch (error) {
            console.error('Error fetching exchange rates:', error);
            // Use fallback rates if API fails
            this.useFallbackRates();
        }
    }

    useFallbackRates() {
        // Fallback rates (current values from CBAR as of December 2024)
        const fallbackRates = {
            'USD': 1.7,
            'EUR': 1.9737,
            'AUD': 1.1052,
            'BYN': 0.5594,
            'BGN': 1.009,
            'AED': 0.4628,
            'KRW': 0.119,
            'CZK': 0.0812,
            'CNY': 0.2387,
            'DKK': 0.2643,
            'GEL': 0.6279,
            'HKD': 0.2188,
            'INR': 0.0193,
            'GBP': 2.2747,
            'SEK': 0.1804,
            'CHF': 2.1363,
            'ILS': 0.5161,
            'CAD': 1.2142,
            'KWD': 5.5495,
            'KZT': 0.3156,
            'QAR': 0.4664,
            'KGS': 0.0195,
            'HUF': 0.507,
            'MDL': 0.1009,
            'NOK': 0.1693,
            'UZS': 0.0142,
            'PKR': 0.6006,
            'PLN': 0.4655,
            'RON': 0.3883,
            'RUB': 2.0885,
            'RSD': 0.0168,
            'SGD': 1.3102,
            'SAR': 0.4533,
            'XDR': 2.318,
            'TRY': 0.0405,
            'TMT': 0.4857,
            'UAH': 0.0407,
            'JPY': 1.1202,
            'NZD': 0.978
        };

        for (const [code, rate] of Object.entries(fallbackRates)) {
            if (this.currencies.has(code)) {
                this.currencies.get(code).rate = rate;
                this.exchangeRates.set(code, rate);
            }
        }

        // Update date to show fallback
        this.updateLastUpdateTime(true);

        // Update the exchange rates table
        this.renderExchangeRatesTable();

        // Add retry button after 3 seconds
        setTimeout(() => {
            this.addRetryButton();
        }, 3000);
    }

    updateLastUpdateTime(isFallback = false) {
        const now = new Date();
        const dateStr = now.toLocaleDateString('az-AZ', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        // Update all currency cards with the new date
        const dateElements = document.querySelectorAll('.currency-card__date');
        if (dateElements.length > 0) {
            dateElements.forEach(element => {
                if (isFallback) {
                    element.textContent = `${dateStr} | Mənbə: Təxmini məlumatlar`;
                    element.style.color = 'var(--orange-600)';
                } else {
                    element.textContent = `${dateStr} | Mənbə: AR Mərkəzi Bank`;
                    element.style.color = 'var(--base-7)';
                }
            });
        }
    }

    renderCurrencyCards(isLoading = false) {
        const container = document.querySelector('.currency-converter');
        if (!container) {
            console.error('Currency converter container not found');
            return;
        }

        container.innerHTML = '';

        this.selectedCurrencies.forEach(code => {
            const currency = this.currencies.get(code);
            if (currency) {
                const card = this.createCurrencyCard(currency, isLoading);
                container.appendChild(card);
            }
        });
    }

    createCurrencyCard(currency, isLoading = false) {
        const card = document.createElement('div');
        card.className = 'currency-card';
        card.dataset.currency = currency.code;

        const now = new Date();
        const dateStr = now.toLocaleDateString('az-AZ', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        if (isLoading) {
            card.innerHTML = `
                ${currency.code !== 'AZN' ? '<button class="currency-card__remove" onclick="currencyConverter.removeCurrency(\'' + currency.code + '\')"><i class="ri-close-line"></i></button>' : ''}
                <div class="currency-card__header">
                    <div class="currency-card__flag">${currency.flag}</div>
                    <div class="currency-card__info">
                        <h3 class="currency-card__code">${currency.code}</h3>
                        <p class="currency-card__name">${currency.name}</p>
                    </div>
                </div>
                <input type="number" class="currency-card__input" placeholder="0.00" value="0" disabled>
                <div class="currency-card__meta">
                    <span class="currency-card__date">Məlumatlar yüklənir...</span>
                    <span class="currency-card__rate">0 AZN = --.-- ${currency.code}</span>
                </div>
            `;
        } else {
            card.innerHTML = `
                ${currency.code !== 'AZN' ? '<button class="currency-card__remove" onclick="currencyConverter.removeCurrency(\'' + currency.code + '\')"><i class="ri-close-line"></i></button>' : ''}
                <div class="currency-card__header">
                    <div class="currency-card__flag">${currency.flag}</div>
                    <div class="currency-card__info">
                        <h3 class="currency-card__code">${currency.code}</h3>
                        <p class="currency-card__name">${currency.name}</p>
                    </div>
                </div>
                <input type="number" class="currency-card__input" placeholder="0.00" value="0" oninput="currencyConverter.convertCurrency('${currency.code}', this.value)">
                <div class="currency-card__meta">
                    <span class="currency-card__date">${dateStr} | Mənbə: AR Mərkəzi Bank</span>
                    <span class="currency-card__rate">0 AZN = ${currency.rate.toFixed(4)} ${currency.code}</span>
                </div>
            `;
        }

        return card;
    }

    convertCurrency(fromCurrency, amount) {
        const numAmount = parseFloat(amount) || 0;

        this.selectedCurrencies.forEach(code => {
            if (code !== fromCurrency) {
                const convertedAmount = this.calculateConversion(fromCurrency, code, numAmount);
                const input = document.querySelector(`[data-currency="${code}"] .currency-card__input`);
                if (input) {
                    input.value = convertedAmount.toFixed(2);
                }
            }
        });
    }

    calculateConversion(fromCurrency, toCurrency, amount) {
        if (fromCurrency === toCurrency) return amount;

        // Convert to AZN first, then to target currency
        let aznAmount;

        if (fromCurrency === 'AZN') {
            aznAmount = amount;
        } else {
            const fromRate = this.currencies.get(fromCurrency)?.rate || 0;
            aznAmount = amount / fromRate;
        }

        if (toCurrency === 'AZN') {
            return aznAmount;
        } else {
            const toRate = this.currencies.get(toCurrency)?.rate || 0;
            return aznAmount * toRate;
        }
    }

    removeCurrency(code) {
        if (code === 'AZN') return; // Can't remove base currency

        this.selectedCurrencies.delete(code);
        this.renderCurrencyCards();
    }

    setupCurrencyModal() {
        const container = document.getElementById('currencyList');
        container.innerHTML = '';

        // Add all available currencies except already selected ones
        for (const [code, currency] of this.currencies) {
            if (!this.selectedCurrencies.has(code)) {
                const item = this.createCurrencyListItem(currency);
                container.appendChild(item);
            }
        }
    }

    createCurrencyListItem(currency) {
        const item = document.createElement('div');
        item.className = 'currency-item';
        item.onclick = () => this.addCurrency(currency.code);

        item.innerHTML = `
            <div class="currency-item__flag">${currency.flag}</div>
            <div class="currency-item__info">
                <h4 class="currency-item__code">${currency.code}</h4>
                <p class="currency-item__name">${currency.name}</p>
            </div>
        `;

        return item;
    }

    addCurrency(code) {
        this.selectedCurrencies.add(code);
        this.renderCurrencyCards();
        this.setupCurrencyModal();
        this.closeCurrencyModal();
    }

    renderExchangeRatesTable() {
        const tableBody = document.getElementById('exchangeRatesTableBody');
        if (!tableBody) {
            console.error('Exchange rates table body not found');
            return;
        }

        tableBody.innerHTML = '';

        // Display currencies in CBAR order (excluding AZN base currency)
        const currenciesInOrder = Array.from(this.currencies.entries())
            .filter(([code]) => code !== 'AZN'); // Exclude AZN from the table

        currenciesInOrder.forEach(([code, currency]) => {
            const row = this.createExchangeRateRow(currency);
            tableBody.appendChild(row);
        });
    }

    createExchangeRateRow(currency) {
        const row = document.createElement('div');
        row.className = 'exchange-rates-table__row';

        // Generate a random change indicator for demo purposes
        // In a real app, you'd compare with previous day's rates
        const changeType = this.getRandomChangeType();
        const changeIndicator = this.getChangeIndicator(changeType);

        row.innerHTML = `
            <div class="exchange-rates-table__col exchange-rates-table__col--currency">
                ${currency.flag} ${currency.name}
            </div>
            <div class="exchange-rates-table__col exchange-rates-table__col--code">
                ${currency.code}
            </div>
            <div class="exchange-rates-table__col exchange-rates-table__col--rate">
                ${currency.rate.toFixed(4)}
            </div>
            <div class="exchange-rates-table__col exchange-rates-table__col--change">
                ${changeIndicator}
            </div>
        `;

        return row;
    }

    getRandomChangeType() {
        const types = ['up', 'down', 'neutral'];
        return types[Math.floor(Math.random() * types.length)];
    }

    getChangeIndicator(changeType) {
        switch (changeType) {
            case 'up':
                return '<div class="exchange-rate-change exchange-rate-change--up"><i class="ri-arrow-up-line"></i></div>';
            case 'down':
                return '<div class="exchange-rate-change exchange-rate-change--down"><i class="ri-arrow-down-line"></i></div>';
            case 'neutral':
            default:
                return '<div class="exchange-rate-change exchange-rate-change--neutral"><i class="ri-subtract-line"></i></div>';
        }
    }

    openCurrencyModal() {
        document.getElementById('currencyModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeCurrencyModal() {
        document.getElementById('currencyModal').classList.remove('active');
        document.body.style.overflow = '';
    }

    addRetryButton() {
        // Remove existing retry button
        const existingRetry = document.querySelector('.retry-button');
        if (existingRetry) {
            existingRetry.remove();
        }

        const retryButton = document.createElement('button');
        retryButton.className = 'retry-button';
        retryButton.innerHTML = `
            <i class="ri-refresh-line"></i>
            <span>Yenidən cəhd et</span>
        `;

        retryButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--red-500);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
            transition: all 0.3s ease;
        `;

        retryButton.addEventListener('click', async () => {
            retryButton.innerHTML = '<i class="ri-loader-4-line"></i><span>Yüklənir...</span>';
            retryButton.disabled = true;

            try {
                await this.fetchExchangeRates();
                retryButton.remove();
            } catch (error) {
                retryButton.innerHTML = '<i class="ri-refresh-line"></i><span>Yenidən cəhd et</span>';
                retryButton.disabled = false;
            }
        });

        retryButton.addEventListener('mouseenter', () => {
            retryButton.style.background = 'var(--red-600)';
            retryButton.style.transform = 'translateY(-2px)';
        });

        retryButton.addEventListener('mouseleave', () => {
            retryButton.style.background = 'var(--red-500)';
            retryButton.style.transform = 'translateY(0)';
        });

        document.body.appendChild(retryButton);
    }
}

// Initialize the currency converter when DOM is loaded
let currencyConverter;
document.addEventListener('DOMContentLoaded', () => {
    currencyConverter = new CurrencyConverter();
});
