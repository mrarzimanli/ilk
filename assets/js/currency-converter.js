'use strict';

// ============================================================================
// CURRENCY CONVERTER CLASS
// ============================================================================

class CurrencyConverter {
    constructor() {
        this.currencies = new Map();
        this.previousCurrencies = new Map();
        this.selectedCurrencies = new Set(['AZN', 'USD', 'EUR']);
        this.commodities = new Map();
        this.isUsingFallback = false; // Track if we're using fallback data

        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.loadAllData();
        this.renderExchangeRatesTable();
        this.renderCommoditiesTable();
        this.setupCurrencyModal();
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

    async loadAllData() {
        try {
            // Show loading state
            this.renderCurrencyCards(true);

            // Load currency definitions in CBAR order
            this.currencies = new Map([
                ['AZN', { code: 'AZN', name: 'AZƏRBAYCAN MANATI', flag: '🇦🇿', rate: 1, value: 0 }],
                ['USD', { code: 'USD', name: 'ABŞ dolları', flag: '🇺🇸', rate: 1.7, value: 0 }],
                ['EUR', { code: 'EUR', name: 'Avro', flag: '🇪🇺', rate: 1.9737, value: 0 }],
                ['AUD', { code: 'AUD', name: 'Avstraliya dolları', flag: '🇦🇺', rate: 1.1052, value: 0 }],
                ['BYN', { code: 'BYN', name: 'Belarus rublu', flag: '🇧🇾', rate: 0.5594, value: 0 }],
                ['BGN', { code: 'BGN', name: 'Bolqarıstan levi', flag: '🇧🇬', rate: 1.009, value: 0 }],
                ['AED', { code: 'AED', name: 'BƏƏ dirhəmi', flag: '🇦🇪', rate: 0.4628, value: 0 }],
                ['KRW', { code: 'KRW', name: 'Cənubi Koreya vonu', flag: '🇰🇷', rate: 0.119, value: 0 }],
                ['CZK', { code: 'CZK', name: 'Çexiya kronu', flag: '🇨🇿', rate: 0.0812, value: 0 }],
                ['CNY', { code: 'CNY', name: 'Çin yuanı', flag: '🇨🇳', rate: 0.2387, value: 0 }],
                ['DKK', { code: 'DKK', name: 'Danimarka kronu', flag: '🇩🇰', rate: 0.2643, value: 0 }],
                ['GEL', { code: 'GEL', name: 'Gürcü larisi', flag: '🇬🇪', rate: 0.6279, value: 0 }],
                ['HKD', { code: 'HKD', name: 'Honq Konq dolları', flag: '🇭🇰', rate: 0.2188, value: 0 }],
                ['INR', { code: 'INR', name: 'Hindistan rupisi', flag: '🇮🇳', rate: 0.0193, value: 0 }],
                ['GBP', { code: 'GBP', name: 'İngilis funt sterlinqi', flag: '🇬🇧', rate: 2.2747, value: 0 }],
                ['SEK', { code: 'SEK', name: 'İsveç kronu', flag: '🇸🇪', rate: 0.1804, value: 0 }],
                ['CHF', { code: 'CHF', name: 'İsveçrə frankı', flag: '🇨🇭', rate: 2.1363, value: 0 }],
                ['ILS', { code: 'ILS', name: 'İsrail şekeli', flag: '🇮🇱', rate: 0.5161, value: 0 }],
                ['CAD', { code: 'CAD', name: 'Kanada dolları', flag: '🇨🇦', rate: 1.2142, value: 0 }],
                ['KWD', { code: 'KWD', name: 'Küveyt dinarı', flag: '🇰🇼', rate: 5.5495, value: 0 }],
                ['KZT', { code: 'KZT', name: 'Qazaxıstan tengəsi', flag: '🇰🇿', rate: 0.3156, value: 0 }],
                ['QAR', { code: 'QAR', name: 'Qətər rialı', flag: '🇶🇦', rate: 0.4664, value: 0 }],
                ['KGS', { code: 'KGS', name: 'Qırğız somu', flag: '🇰🇬', rate: 0.0195, value: 0 }],
                ['HUF', { code: 'HUF', name: 'Macarıstan forinti', flag: '🇭🇺', rate: 0.507, value: 0 }],
                ['MDL', { code: 'MDL', name: 'Moldova leyi', flag: '🇲🇩', rate: 0.1009, value: 0 }],
                ['NOK', { code: 'NOK', name: 'Norveç kronu', flag: '🇳🇴', rate: 0.1693, value: 0 }],
                ['UZS', { code: 'UZS', name: 'Özbək somu', flag: '🇺🇿', rate: 0.0142, value: 0 }],
                ['PKR', { code: 'PKR', name: 'Pakistan rupisi', flag: '🇵🇰', rate: 0.6006, value: 0 }],
                ['PLN', { code: 'PLN', name: 'Polşa zlotısı', flag: '🇵🇱', rate: 0.4655, value: 0 }],
                ['RON', { code: 'RON', name: 'Rumıniya leyi', flag: '🇷🇴', rate: 0.3883, value: 0 }],
                ['RUB', { code: 'RUB', name: 'Rusiya rublu', flag: '🇷🇺', rate: 2.0885, value: 0 }],
                ['RSD', { code: 'RSD', name: 'Serbiya dinarı', flag: '🇷🇸', rate: 0.0168, value: 0 }],
                ['SGD', { code: 'SGD', name: 'Sinqapur dolları', flag: '🇸🇬', rate: 1.3102, value: 0 }],
                ['SAR', { code: 'SAR', name: 'Səudiyyə Ərəbistanı rialı', flag: '🇸🇦', rate: 0.4533, value: 0 }],
                ['SDR', { code: 'SDR', name: 'SDR (BVF-nin xüsusi borcalma hüquqları)', flag: '🌍', rate: 2.318, value: 0 }],
                ['TRY', { code: 'TRY', name: 'Türk lirəsi', flag: '🇹🇷', rate: 0.0405, value: 0 }],
                ['TMT', { code: 'TMT', name: 'Türkmənistan manatı', flag: '🇹🇲', rate: 0.4857, value: 0 }],
                ['UAH', { code: 'UAH', name: 'Ukrayna qrivnası', flag: '🇺🇦', rate: 0.0407, value: 0 }],
                ['JPY', { code: 'JPY', name: 'Yapon yeni', flag: '🇯🇵', rate: 1.1202, value: 0 }],
                ['NZD', { code: 'NZD', name: 'Yeni Zelandiya dolları', flag: '🇳🇿', rate: 0.978, value: 0 }]
            ]);

            // Fetch all data (currencies and commodities) in one request
            await this.fetchAllData();
        } catch (error) {
            console.error('Error loading all data:', error);
        }
    }

    async fetchAllData() {
        try {
            // Get today's date and yesterday's date
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);

            const todayString = this.formatDate(today);
            const yesterdayString = this.formatDate(yesterday);

            // Fetch both today's and yesterday's data
            const [todayData, yesterdayData] = await Promise.all([
                this.fetchDataForDate(todayString),
                this.fetchDataForDate(yesterdayString)
            ]);

            if (todayData && yesterdayData) {
                // Store yesterday's rates for comparison
                this.storePreviousRates(yesterdayData);

                // Process today's data
                this.processTodayData(todayData);
            } else if (todayData) {
                // Only today's data available, use fallback
                this.processTodayData(todayData);
            } else {
                throw new Error('Could not fetch data from API server');
            }

            this.renderCurrencyCards(false);

        } catch (error) {
            console.error('Error fetching all data:', error);
            // Use fallback rates if API fails
            this.showFallbackNotification();
            this.useFallbackRates();
            this.useFallbackCommoditiesData();
        }
    }

    async fetchDataForDate(dateString) {
        try {
            const response = await fetch(`http://localhost:3001/api/currencies/${dateString}`);

            if (response.ok) {
                const result = await response.json();
                if (result.success && result.currencies) {
                    return result.currencies;
                }
            }
            return null;
        } catch (error) {
            console.log(`Failed to fetch data for ${dateString}:`, error.message);
            return null;
        }
    }

    formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }

    storePreviousRates(yesterdayData) {
        // Store yesterday's rates for comparison
        for (const currency of yesterdayData) {
            const { code, value } = currency;
            this.previousCurrencies.set(code, value);
        }
    }

    processTodayData(todayData) {
        // Update currency rates
        for (const currency of todayData) {
            const { code, rate, value, nominal } = currency;

            if (this.currencies.has(code)) {
                this.currencies.get(code).rate = rate;
                this.currencies.get(code).value = value;
                this.currencies.get(code).nominal = nominal;
            }
        }

        // Process commodities data (bank metals)
        this.commodities = new Map();
        const bankMetals = todayData.filter(currency =>
            ['XAU', 'XAG', 'XPT', 'XPD'].includes(currency.code)
        );

        for (const commodity of bankMetals) {
            const { code, value } = commodity;

            // Map commodity codes to display names and icons
            const commodityInfo = this.getCommodityInfo(code);

            this.commodities.set(code, {
                code: code,
                name: commodityInfo.name,
                icon: commodityInfo.icon,
                symbol: commodityInfo.symbol,
                price: value,
                change: this.calculateRealChange(code, value),
                unit: 't.u.'
            });
        }

        // Update date in UI
        this.isUsingFallback = false;
        this.updateLastUpdateTime();
    }

    getCommodityInfo(code) {
        const commodityMap = {
            'XAU': { name: 'Qızıl', icon: 'commodity-icon--gold', symbol: 'Au' },
            'XAG': { name: 'Gümüş', icon: 'commodity-icon--silver', symbol: 'Ag' },
            'XPT': { name: 'Platin', icon: 'commodity-icon--platinum', symbol: 'Pt' },
            'XPD': { name: 'Palladium', icon: 'commodity-icon--palladium', symbol: 'Pd' }
        };

        return commodityMap[code] || { name: code, icon: 'commodity-icon--default', symbol: code };
    }

    useFallbackCommoditiesData() {
        // Fallback commodities data (current values from CBAR as of 24.10.2025)
        this.commodities = new Map([
            ['XAU', {
                code: 'XAU',
                name: 'Qızıl',
                symbol: 'Au',
                price: 6989.975,
                change: 'neutral',
                unit: 't.u.',
            }],
            ['XAG', {
                code: 'XAG',
                name: 'Gümüş',
                symbol: 'Ag',
                price: 82.5619,
                change: 'neutral',
                unit: 't.u.'
            }],
            ['XPT', {
                code: 'XPT',
                name: 'Platin',
                symbol: 'Pt',
                price: 2767.3365,
                change: 'neutral',
                unit: 't.u.'
            }],
            ['XPD', {
                code: 'XPD',
                name: 'Palladium',
                symbol: 'Pd',
                price: 2435.3435,
                change: 'neutral',
                unit: 't.u.'
            }]
        ]);

        this.renderCommoditiesTable();
        this.updateCommoditiesLastUpdateTime();
    }

    useFallbackRates() {
        // Fallback rates (current values from CBAR as of 24.10.2025)
        const fallbackRates = {
            'USD': { rate: 0.5882, value: 1.7, nominal: 1 },
            'EUR': { rate: 0.5068, value: 1.9733, nominal: 1 },
            'AUD': { rate: 0.9047, value: 1.1053, nominal: 1 },
            'BYN': { rate: 1.7876, value: 0.5594, nominal: 1 },
            'BGN': { rate: 0.9912, value: 1.0089, nominal: 1 },
            'AED': { rate: 2.1603, value: 0.4629, nominal: 1 },
            'KRW': { rate: 846.0, value: 0.1182, nominal: 100 },
            'CZK': { rate: 12.33, value: 0.0811, nominal: 1 },
            'CNY': { rate: 4.1911, value: 0.2386, nominal: 1 },
            'DKK': { rate: 3.7850, value: 0.2642, nominal: 1 },
            'GEL': { rate: 1.6003, value: 0.6249, nominal: 1 },
            'HKD': { rate: 4.5725, value: 0.2187, nominal: 1 },
            'INR': { rate: 51.5464, value: 0.0194, nominal: 1 },
            'GBP': { rate: 0.4416, value: 2.2645, nominal: 1 },
            'SEK': { rate: 5.5276, value: 0.1809, nominal: 1 },
            'CHF': { rate: 0.4683, value: 2.1354, nominal: 1 },
            'ILS': { rate: 1.9327, value: 0.5174, nominal: 1 },
            'CAD': { rate: 0.8241, value: 1.2133, nominal: 1 },
            'KWD': { rate: 0.1804, value: 5.5436, nominal: 1 },
            'KZT': { rate: 3.1639, value: 0.3161, nominal: 100 },
            'QAR': { rate: 2.1441, value: 0.4664, nominal: 1 },
            'KGS': { rate: 51.2821, value: 0.0195, nominal: 1 },
            'HUF': { rate: 1.9771, value: 0.5058, nominal: 100 },
            'MDL': { rate: 10.0503, value: 0.0995, nominal: 1 },
            'NOK': { rate: 5.8754, value: 0.1702, nominal: 1 },
            'UZS': { rate: 7142.8571, value: 0.014, nominal: 100 },
            'PKR': { rate: 1.6653, value: 0.6005, nominal: 100 },
            'PLN': { rate: 2.1441, value: 0.4664, nominal: 1 },
            'RON': { rate: 2.5767, value: 0.3881, nominal: 1 },
            'RUB': { rate: 0.4790, value: 2.0876, nominal: 100 },
            'RSD': { rate: 59.5238, value: 0.0168, nominal: 1 },
            'SGD': { rate: 0.7644, value: 1.3083, nominal: 1 },
            'SAR': { rate: 2.2058, value: 0.4533, nominal: 1 },
            'SDR': { rate: 0.4321, value: 2.3144, nominal: 1 },
            'TRY': { rate: 24.7525, value: 0.0404, nominal: 1 },
            'TMT': { rate: 2.0588, value: 0.4857, nominal: 1 },
            'UAH': { rate: 24.6305, value: 0.0406, nominal: 1 },
            'JPY': { rate: 0.8994, value: 1.1118, nominal: 100 },
            'NZD': { rate: 1.0234, value: 0.9771, nominal: 1 }
        };

        for (const [code, data] of Object.entries(fallbackRates)) {
            if (this.currencies.has(code)) {
                this.currencies.get(code).rate = data.rate;
                this.currencies.get(code).value = data.value;
                this.currencies.get(code).nominal = data.nominal;
            }
        }

        // Clear previous rates for fallback to show neutral indicators
        this.previousCurrencies.clear();

        // Re-render currency cards with fallback data
        this.renderCurrencyCards(false);

        // Update date to show fallback
        this.isUsingFallback = true;
        this.updateLastUpdateTime(true);

        // Update the exchange rates table
        this.renderExchangeRatesTable();
    }

    updateLastUpdateTime(isFallback = false) {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const dateStr = `${day}.${month}.${year}`;

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
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const dateStr = `${day}.${month}.${year}`;

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
                    <span class="currency-card__rate">1 AZN = --.-- ${currency.code}</span>
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
                    <span class="currency-card__date">${dateStr} | Mənbə: ${this.isUsingFallback ? 'Təxmini məlumatlar' : 'AR Mərkəzi Bank'}</span>
                    <span class="currency-card__rate">1 AZN = ${currency.rate.toFixed(4)} ${currency.code}</span>
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
                    input.value = convertedAmount.toFixed(4);
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
        this.updateLastUpdateTime(this.isUsingFallback);
        this.setupCurrencyModal();
        this.closeCurrencyModal();
    }

    renderExchangeRatesTable() {
        const tableBody = document.getElementById('exchangeRatesTableBody');
        if (!tableBody) {
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

        // Calculate real change indicator using value for comparison
        const changeType = this.calculateRealChange(currency.code, currency.value);
        const changeIndicator = this.getChangeIndicator(changeType);

        row.innerHTML = `
            <div class="exchange-rates-table__col exchange-rates-table__col--currency">
                ${currency.nominal} ${currency.name}
            </div>
            <div class="exchange-rates-table__col exchange-rates-table__col--code">
                ${currency.code}
            </div>
            <div class="exchange-rates-table__col exchange-rates-table__col--rate">
                ${currency.value}
            </div>
            <div class="exchange-rates-table__col exchange-rates-table__col--change">
                ${changeIndicator}
            </div>
        `;

        return row;
    }

    calculateRealChange(code, currentValue) {
        const previousValue = this.previousCurrencies.get(code);

        if (!previousValue || previousValue === 0) {
            // No previous data available, show neutral
            return 'neutral';
        }

        const changePercent = ((currentValue - previousValue) / previousValue) * 100;

        // Consider changes less than 0.01% as neutral (more sensitive threshold)
        if (Math.abs(changePercent) < 0.01) {
            return 'neutral';
        }

        return changePercent > 0 ? 'up' : 'down';
    }

    getChangeIndicator(changeType) {
        switch (changeType) {
            case 'up':
                return '<div class="exchange-rate-change exchange-rate-change--up"><i class="ri-arrow-up-line"></i></div>';
            case 'down':
                return '<div class="exchange-rate-change exchange-rate-change--down"><i class="ri-arrow-down-line"></i></div>';
            case 'neutral':
            default:
                return '<div class="exchange-rate-change exchange-rate-change--neutral"><div class="change-dot"></div></div>';
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

    renderCommoditiesTable() {
        const tableBody = document.getElementById('commoditiesTableBody');
        if (!tableBody) {
            return;
        }

        tableBody.innerHTML = '';

        // Display commodities in order
        const commoditiesInOrder = Array.from(this.commodities.entries());

        commoditiesInOrder.forEach(([code, commodity]) => {
            const row = this.createCommodityRow(commodity);
            tableBody.appendChild(row);
        });
    }

    createCommodityRow(commodity) {
        const row = document.createElement('div');
        row.className = 'exchange-rates-table__row';

        // Calculate real change indicator
        const changeType = this.calculateRealChange(commodity.code, commodity.price);
        const changeIndicator = this.getChangeIndicator(changeType);

        row.innerHTML = `
            <div class="exchange-rates-table__col exchange-rates-table__col--currency">
                (${commodity.symbol}) ${commodity.name}
            </div>
            <div class="exchange-rates-table__col exchange-rates-table__col--code">
                ${commodity.code}
            </div>
            <div class="exchange-rates-table__col exchange-rates-table__col--rate">
                $${commodity.price.toFixed(4)}
            </div>
            <div class="exchange-rates-table__col exchange-rates-table__col--change">
                ${changeIndicator}
            </div>
        `;

        return row;
    }

    updateCommoditiesLastUpdateTime() {
        const lastUpdateElement = document.getElementById('commoditiesLastUpdate');
        if (lastUpdateElement) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('az-AZ', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            lastUpdateElement.textContent = timeString;
        }
    }

    showFallbackNotification() {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'fallback-notification';
        notification.innerHTML = `
            <div class="fallback-notification__content">
                <div class="fallback-notification__icon">⚠️</div>
                <div class="fallback-notification__text">
                    <h4>Məlumatlar yüklənə bilmədi</h4>
                    <p>Canlı məlumatlar əldə edilə bilmədiyi üçün son məlumatlar göstərilir.</p>
                    <div class="fallback-notification__actions">
                        <button class="fallback-notification__retry" onclick="this.retryConnection()">Yenidən cəhd et</button>
                        <button class="fallback-notification__close" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
                    </div>
                </div>
            </div>
        `;

        // Add retry functionality
        const retryButton = notification.querySelector('.fallback-notification__retry');
        retryButton.retryConnection = () => {
            this.retryDataConnection(notification);
        };

        // Add to page
        document.body.appendChild(notification);

        // Auto remove after 15 seconds (increased for retry option)
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 15000);
    }

    async retryDataConnection(notification) {
        const retryButton = notification.querySelector('.fallback-notification__retry');
        const originalText = retryButton.textContent;

        // Show loading state
        retryButton.textContent = 'Yüklənir...';
        retryButton.disabled = true;

        try {
            // Try to fetch data again
            await this.loadAllData();

            // If successful, remove notification
            notification.remove();

        } catch (error) {
            // If still fails, reset button and show error
            retryButton.textContent = originalText;
            retryButton.disabled = false;
        }
    }
}

// ============================================================================
// AUTO-INITIALIZATION
// ============================================================================

// Global instance for inline event handlers
let currencyConverter;

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('currencyConverterPage')) {
        currencyConverter = new CurrencyConverter();
    }
});
