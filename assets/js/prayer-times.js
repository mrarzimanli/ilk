'use strict';

// ============================================================================
// DATA SECTION
// ============================================================================

// ==================== Official Prayer Times from QMİ ====================
const officialPrayerTimes = {
    baki: {
        2025: {
            10: [
                // October 2025
                { day: 1, fajr: '05:17', sunrise: '06:37', dhuhr: '12:30', asr: '16:37', maghrib: '18:36', isha: '19:37', midnight: '23:50' },
                { day: 2, fajr: '05:18', sunrise: '06:38', dhuhr: '12:29', asr: '16:35', maghrib: '18:34', isha: '19:35', midnight: '23:50' },
                { day: 3, fajr: '05:19', sunrise: '06:39', dhuhr: '12:29', asr: '16:34', maghrib: '18:33', isha: '19:33', midnight: '23:50' },
                { day: 4, fajr: '05:20', sunrise: '06:40', dhuhr: '12:29', asr: '16:32', maghrib: '18:31', isha: '19:32', midnight: '23:49' },
                { day: 5, fajr: '05:21', sunrise: '06:41', dhuhr: '12:29', asr: '16:31', maghrib: '18:30', isha: '19:30', midnight: '23:49' },
                { day: 6, fajr: '05:22', sunrise: '06:42', dhuhr: '12:28', asr: '16:30', maghrib: '18:28', isha: '19:28', midnight: '23:49' },
                { day: 7, fajr: '05:23', sunrise: '06:43', dhuhr: '12:28', asr: '16:28', maghrib: '18:26', isha: '19:27', midnight: '23:48' },
                { day: 8, fajr: '05:25', sunrise: '06:44', dhuhr: '12:28', asr: '16:27', maghrib: '18:25', isha: '19:25', midnight: '23:48' },
                { day: 9, fajr: '05:26', sunrise: '06:45', dhuhr: '12:27', asr: '16:25', maghrib: '18:23', isha: '19:24', midnight: '23:48' },
                { day: 10, fajr: '05:27', sunrise: '06:47', dhuhr: '12:27', asr: '16:24', maghrib: '18:22', isha: '19:22', midnight: '23:48' },
                { day: 11, fajr: '05:28', sunrise: '06:48', dhuhr: '12:27', asr: '16:23', maghrib: '18:20', isha: '19:21', midnight: '23:47' },
                { day: 12, fajr: '05:29', sunrise: '06:49', dhuhr: '12:27', asr: '16:21', maghrib: '18:19', isha: '19:19', midnight: '23:47' },
                { day: 13, fajr: '05:30', sunrise: '06:50', dhuhr: '12:26', asr: '16:20', maghrib: '18:17', isha: '19:18', midnight: '23:47' },
                { day: 14, fajr: '05:31', sunrise: '06:51', dhuhr: '12:26', asr: '16:18', maghrib: '18:16', isha: '19:16', midnight: '23:47' },
                { day: 15, fajr: '05:32', sunrise: '06:52', dhuhr: '12:26', asr: '16:17', maghrib: '18:14', isha: '19:15', midnight: '23:46' },
                { day: 16, fajr: '05:33', sunrise: '06:53', dhuhr: '12:26', asr: '16:16', maghrib: '18:13', isha: '19:13', midnight: '23:46' },
                { day: 17, fajr: '05:34', sunrise: '06:54', dhuhr: '12:26', asr: '16:14', maghrib: '18:11', isha: '19:12', midnight: '23:46' },
                { day: 18, fajr: '05:35', sunrise: '06:55', dhuhr: '12:25', asr: '16:13', maghrib: '18:10', isha: '19:10', midnight: '23:46' },
                { day: 19, fajr: '05:36', sunrise: '06:56', dhuhr: '12:25', asr: '16:12', maghrib: '18:08', isha: '19:09', midnight: '23:45' },
                { day: 20, fajr: '05:37', sunrise: '06:57', dhuhr: '12:25', asr: '16:10', maghrib: '18:07', isha: '19:08', midnight: '23:45' },
                { day: 21, fajr: '05:38', sunrise: '06:58', dhuhr: '12:25', asr: '16:09', maghrib: '18:06', isha: '19:06', midnight: '23:45' },
                { day: 22, fajr: '05:39', sunrise: '06:59', dhuhr: '12:25', asr: '16:08', maghrib: '18:04', isha: '19:05', midnight: '23:45' },
                { day: 23, fajr: '05:40', sunrise: '07:01', dhuhr: '12:25', asr: '16:06', maghrib: '18:03', isha: '19:04', midnight: '23:45' },
                { day: 24, fajr: '05:41', sunrise: '07:02', dhuhr: '12:24', asr: '16:05', maghrib: '18:02', isha: '19:03', midnight: '23:44' },
                { day: 25, fajr: '05:42', sunrise: '07:03', dhuhr: '12:24', asr: '16:04', maghrib: '18:00', isha: '19:01', midnight: '23:44' },
                { day: 26, fajr: '05:43', sunrise: '07:04', dhuhr: '12:24', asr: '16:03', maghrib: '17:59', isha: '19:00', midnight: '23:44' },
                { day: 27, fajr: '05:44', sunrise: '07:05', dhuhr: '12:24', asr: '16:01', maghrib: '17:58', isha: '18:59', midnight: '23:44' },
                { day: 28, fajr: '05:45', sunrise: '07:06', dhuhr: '12:24', asr: '16:00', maghrib: '17:56', isha: '18:58', midnight: '23:44' },
                { day: 29, fajr: '05:46', sunrise: '07:07', dhuhr: '12:24', asr: '15:59', maghrib: '17:55', isha: '18:57', midnight: '23:44' },
                { day: 30, fajr: '05:47', sunrise: '07:08', dhuhr: '12:24', asr: '15:58', maghrib: '17:54', isha: '18:55', midnight: '23:44' },
                { day: 31, fajr: '05:48', sunrise: '07:10', dhuhr: '12:24', asr: '15:57', maghrib: '17:53', isha: '18:54', midnight: '23:44' }
            ],
            11: [
                // November 2025
                { day: 1, fajr: '05:49', sunrise: '07:11', dhuhr: '12:24', asr: '15:56', maghrib: '17:52', isha: '18:53', midnight: '23:43' },
                { day: 2, fajr: '05:50', sunrise: '07:12', dhuhr: '12:24', asr: '15:54', maghrib: '17:50', isha: '18:52', midnight: '23:43' },
                { day: 3, fajr: '05:51', sunrise: '07:13', dhuhr: '12:24', asr: '15:53', maghrib: '17:49', isha: '18:51', midnight: '23:43' },
                { day: 4, fajr: '05:52', sunrise: '07:14', dhuhr: '12:24', asr: '15:52', maghrib: '17:48', isha: '18:50', midnight: '23:43' },
                { day: 5, fajr: '05:53', sunrise: '07:15', dhuhr: '12:24', asr: '15:51', maghrib: '17:47', isha: '18:49', midnight: '23:43' },
                { day: 6, fajr: '05:54', sunrise: '07:17', dhuhr: '12:24', asr: '15:50', maghrib: '17:46', isha: '18:48', midnight: '23:43' },
                { day: 7, fajr: '05:55', sunrise: '07:18', dhuhr: '12:24', asr: '15:49', maghrib: '17:45', isha: '18:47', midnight: '23:43' },
                { day: 8, fajr: '05:56', sunrise: '07:19', dhuhr: '12:24', asr: '15:48', maghrib: '17:44', isha: '18:47', midnight: '23:43' },
                { day: 9, fajr: '05:57', sunrise: '07:20', dhuhr: '12:24', asr: '15:47', maghrib: '17:43', isha: '18:46', midnight: '23:43' },
                { day: 10, fajr: '05:58', sunrise: '07:21', dhuhr: '12:24', asr: '15:46', maghrib: '17:42', isha: '18:45', midnight: '23:43' },
                { day: 11, fajr: '05:59', sunrise: '07:22', dhuhr: '12:24', asr: '15:45', maghrib: '17:41', isha: '18:44', midnight: '23:43' },
                { day: 12, fajr: '06:00', sunrise: '07:24', dhuhr: '12:25', asr: '15:45', maghrib: '17:41', isha: '18:43', midnight: '23:43' },
                { day: 13, fajr: '06:01', sunrise: '07:25', dhuhr: '12:25', asr: '15:44', maghrib: '17:40', isha: '18:43', midnight: '23:43' },
                { day: 14, fajr: '06:02', sunrise: '07:26', dhuhr: '12:25', asr: '15:43', maghrib: '17:39', isha: '18:42', midnight: '23:44' },
                { day: 15, fajr: '06:03', sunrise: '07:27', dhuhr: '12:25', asr: '15:42', maghrib: '17:38', isha: '18:41', midnight: '23:44' },
                { day: 16, fajr: '06:04', sunrise: '07:28', dhuhr: '12:25', asr: '15:41', maghrib: '17:37', isha: '18:41', midnight: '23:44' },
                { day: 17, fajr: '06:05', sunrise: '07:29', dhuhr: '12:25', asr: '15:41', maghrib: '17:37', isha: '18:40', midnight: '23:44' },
                { day: 18, fajr: '06:06', sunrise: '07:31', dhuhr: '12:26', asr: '15:40', maghrib: '17:36', isha: '18:40', midnight: '23:44' },
                { day: 19, fajr: '06:07', sunrise: '07:32', dhuhr: '12:26', asr: '15:39', maghrib: '17:35', isha: '18:39', midnight: '23:44' },
                { day: 20, fajr: '06:08', sunrise: '07:33', dhuhr: '12:26', asr: '15:39', maghrib: '17:35', isha: '18:38', midnight: '23:44' },
                { day: 21, fajr: '06:09', sunrise: '07:34', dhuhr: '12:26', asr: '15:38', maghrib: '17:34', isha: '18:38', midnight: '23:44' },
                { day: 22, fajr: '06:10', sunrise: '07:35', dhuhr: '12:27', asr: '15:38', maghrib: '17:34', isha: '18:38', midnight: '23:45' },
                { day: 23, fajr: '06:11', sunrise: '07:36', dhuhr: '12:27', asr: '15:37', maghrib: '17:33', isha: '18:37', midnight: '23:45' },
                { day: 24, fajr: '06:12', sunrise: '07:37', dhuhr: '12:27', asr: '15:37', maghrib: '17:33', isha: '18:37', midnight: '23:45' },
                { day: 25, fajr: '06:13', sunrise: '07:38', dhuhr: '12:28', asr: '15:36', maghrib: '17:32', isha: '18:36', midnight: '23:45' },
                { day: 26, fajr: '06:14', sunrise: '07:39', dhuhr: '12:28', asr: '15:36', maghrib: '17:32', isha: '18:36', midnight: '23:46' },
                { day: 27, fajr: '06:15', sunrise: '07:41', dhuhr: '12:28', asr: '15:35', maghrib: '17:31', isha: '18:36', midnight: '23:46' },
                { day: 28, fajr: '06:16', sunrise: '07:42', dhuhr: '12:29', asr: '15:35', maghrib: '17:31', isha: '18:36', midnight: '23:46' },
                { day: 29, fajr: '06:17', sunrise: '07:43', dhuhr: '12:29', asr: '15:35', maghrib: '17:31', isha: '18:35', midnight: '23:46' },
                { day: 30, fajr: '06:18', sunrise: '07:44', dhuhr: '12:29', asr: '15:34', maghrib: '17:31', isha: '18:35', midnight: '23:47' }
            ],
            12: [
                // December 2025
                { day: 1, fajr: '06:19', sunrise: '07:45', dhuhr: '12:30', asr: '15:34', maghrib: '17:30', isha: '18:35', midnight: '23:47' },
                { day: 2, fajr: '06:19', sunrise: '07:46', dhuhr: '12:30', asr: '15:34', maghrib: '17:30', isha: '18:35', midnight: '23:47' },
                { day: 3, fajr: '06:20', sunrise: '07:47', dhuhr: '12:30', asr: '15:34', maghrib: '17:30', isha: '18:35', midnight: '23:48' },
                { day: 4, fajr: '06:21', sunrise: '07:48', dhuhr: '12:31', asr: '15:33', maghrib: '17:30', isha: '18:35', midnight: '23:48' },
                { day: 5, fajr: '06:22', sunrise: '07:49', dhuhr: '12:31', asr: '15:33', maghrib: '17:30', isha: '18:35', midnight: '23:48' },
                { day: 6, fajr: '06:23', sunrise: '07:49', dhuhr: '12:32', asr: '15:33', maghrib: '17:30', isha: '18:35', midnight: '23:49' },
                { day: 7, fajr: '06:24', sunrise: '07:50', dhuhr: '12:32', asr: '15:33', maghrib: '17:30', isha: '18:35', midnight: '23:49' },
                { day: 8, fajr: '06:24', sunrise: '07:51', dhuhr: '12:33', asr: '15:33', maghrib: '17:30', isha: '18:35', midnight: '23:50' },
                { day: 9, fajr: '06:25', sunrise: '07:52', dhuhr: '12:33', asr: '15:33', maghrib: '17:30', isha: '18:35', midnight: '23:50' },
                { day: 10, fajr: '06:26', sunrise: '07:53', dhuhr: '12:33', asr: '15:33', maghrib: '17:30', isha: '18:35', midnight: '23:50' },
                { day: 11, fajr: '06:27', sunrise: '07:54', dhuhr: '12:34', asr: '15:34', maghrib: '17:30', isha: '18:36', midnight: '23:51' },
                { day: 12, fajr: '06:27', sunrise: '07:55', dhuhr: '12:34', asr: '15:34', maghrib: '17:30', isha: '18:36', midnight: '23:51' },
                { day: 13, fajr: '06:28', sunrise: '07:55', dhuhr: '12:35', asr: '15:34', maghrib: '17:31', isha: '18:36', midnight: '23:52' },
                { day: 14, fajr: '06:29', sunrise: '07:56', dhuhr: '12:35', asr: '15:34', maghrib: '17:31', isha: '18:36', midnight: '23:52' },
                { day: 15, fajr: '06:29', sunrise: '07:57', dhuhr: '12:36', asr: '15:35', maghrib: '17:31', isha: '18:37', midnight: '23:53' },
                { day: 16, fajr: '06:30', sunrise: '07:57', dhuhr: '12:36', asr: '15:35', maghrib: '17:31', isha: '18:37', midnight: '23:53' },
                { day: 17, fajr: '06:31', sunrise: '07:58', dhuhr: '12:37', asr: '15:35', maghrib: '17:32', isha: '18:38', midnight: '23:53' },
                { day: 18, fajr: '06:31', sunrise: '07:59', dhuhr: '12:37', asr: '15:36', maghrib: '17:32', isha: '18:38', midnight: '23:54' },
                { day: 19, fajr: '06:32', sunrise: '07:59', dhuhr: '12:38', asr: '15:36', maghrib: '17:33', isha: '18:38', midnight: '23:54' },
                { day: 20, fajr: '06:32', sunrise: '08:00', dhuhr: '12:38', asr: '15:36', maghrib: '17:33', isha: '18:39', midnight: '23:55' },
                { day: 21, fajr: '06:33', sunrise: '08:00', dhuhr: '12:39', asr: '15:37', maghrib: '17:34', isha: '18:39', midnight: '23:55' },
                { day: 22, fajr: '06:33', sunrise: '08:01', dhuhr: '12:39', asr: '15:37', maghrib: '17:34', isha: '18:40', midnight: '23:56' },
                { day: 23, fajr: '06:34', sunrise: '08:01', dhuhr: '12:40', asr: '15:38', maghrib: '17:35', isha: '18:40', midnight: '23:56' },
                { day: 24, fajr: '06:34', sunrise: '08:02', dhuhr: '12:40', asr: '15:39', maghrib: '17:35', isha: '18:41', midnight: '23:57' },
                { day: 25, fajr: '06:35', sunrise: '08:02', dhuhr: '12:41', asr: '15:39', maghrib: '17:36', isha: '18:42', midnight: '23:57' },
                { day: 26, fajr: '06:35', sunrise: '08:02', dhuhr: '12:41', asr: '15:40', maghrib: '17:36', isha: '18:42', midnight: '23:58' },
                { day: 27, fajr: '06:35', sunrise: '08:03', dhuhr: '12:42', asr: '15:41', maghrib: '17:37', isha: '18:43', midnight: '23:58' },
                { day: 28, fajr: '06:36', sunrise: '08:03', dhuhr: '12:42', asr: '15:41', maghrib: '17:38', isha: '18:44', midnight: '23:59' },
                { day: 29, fajr: '06:36', sunrise: '08:03', dhuhr: '12:43', asr: '15:42', maghrib: '17:39', isha: '18:44', midnight: '23:59' },
                { day: 30, fajr: '06:36', sunrise: '08:03', dhuhr: '12:43', asr: '15:43', maghrib: '17:39', isha: '18:45', midnight: '00:00' },
                { day: 31, fajr: '06:36', sunrise: '08:03', dhuhr: '12:43', asr: '15:43', maghrib: '17:39', isha: '18:45', midnight: '00:00' }
            ]
        }
    }
};

// ==================== City Configurations ====================
const cityConfigs = {
    agdam: { name: 'Ağdam', lat: 39.9889, lng: 46.9267, adjust: 2 },
    astara: { name: 'Astara', lat: 38.4575, lng: 48.8744, adjust: -3 },
    baki: { name: 'Bakı', lat: 40.4093, lng: 49.8671, adjust: 0 },
    cebrayil: { name: 'Cəbrayıl', lat: 39.3986, lng: 47.0278, adjust: 3 },
    fuzuli: { name: 'Füzuli', lat: 39.6003, lng: 47.1419, adjust: 3 },
    ganja: { name: 'Gəncə', lat: 40.6828, lng: 46.3606, adjust: 5 },
    goycay: { name: 'Göyçay', lat: 40.6528, lng: 47.7389, adjust: 1 },
    kalbacar: { name: 'Kəlbəcər', lat: 40.1008, lng: 46.0364, adjust: 9 },
    lacin: { name: 'Laçın', lat: 39.6378, lng: 46.5467, adjust: 10 },
    lankaran: { name: 'Lənkəran', lat: 38.7542, lng: 48.8514, adjust: -2 },
    masalli: { name: 'Masallı', lat: 39.0350, lng: 48.6628, adjust: -2 },
    nakhchivan: { name: 'Naxçıvan', lat: 39.2092, lng: 45.4128, adjust: 13 },
    neftcala: { name: 'Neftçala', lat: 39.3783, lng: 49.2469, adjust: 0 },
    qazax: { name: 'Qazax', lat: 41.0928, lng: 45.3661, adjust: 8 },
    quba: { name: 'Quba', lat: 41.3619, lng: 48.5136, adjust: 4 },
    qubadli: { name: 'Qubadlı', lat: 39.3450, lng: 46.5811, adjust: 9 },
    qusar: { name: 'Qusar', lat: 41.4272, lng: 48.4303, adjust: 5 },
    saatli: { name: 'Saatlı', lat: 39.9303, lng: 48.3681, adjust: 1 },
    sabirabad: { name: 'Sabirabad', lat: 40.0139, lng: 48.4764, adjust: 0 },
    salyan: { name: 'Salyan', lat: 39.5969, lng: 48.9794, adjust: 0 },
    shamakhi: { name: 'Şamaxı', lat: 40.6317, lng: 48.6411, adjust: 2 },
    shaki: { name: 'Şəki', lat: 41.1975, lng: 47.1914, adjust: 7 },
    shusha: { name: 'Şuşa', lat: 39.7592, lng: 46.7461, adjust: 8 },
    sumqayit: { name: 'Sumqayıt', lat: 40.5892, lng: 49.6328, adjust: 0 },
    khachmaz: { name: 'Xaçmaz', lat: 41.4586, lng: 48.8050, adjust: 5 },
    khankandi: { name: 'Xankəndi', lat: 39.8264, lng: 46.7656, adjust: 8 },
    khocali: { name: 'Xocalı', lat: 39.9147, lng: 46.7908, adjust: 8 },
    yevlakh: { name: 'Yevlax', lat: 40.6175, lng: 47.1500, adjust: 5 },
    zaqatala: { name: 'Zaqatala', lat: 41.6317, lng: 46.6444, adjust: 9 },
    zangilan: { name: 'Zəngilan', lat: 39.0856, lng: 46.6528, adjust: 9 }
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// ==================== Time Utilities ====================
/**
 * Adjust time by adding/subtracting minutes
 * @param {string} time - Time in HH:MM format
 * @param {number} minutes - Minutes to adjust (can be negative)
 * @returns {string} Adjusted time in HH:MM format
 */
function adjustTime(time, minutes) {
    const [h, m] = time.split(':').map(Number);
    const totalMinutes = h * 60 + m + minutes;
    const newH = Math.floor(totalMinutes / 60) % 24;
    const newM = totalMinutes % 60;
    return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
}

/**
 * Format current date and time
 * @returns {string} Formatted date and time
 */
function formatDateTime() {
    const now = new Date();
    const day = now.getDate();
    const month = getMonthName(now.getMonth());
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${day} ${month} ${year} ${hours}:${minutes}`;
}

// ==================== Date Utilities ====================
/**
 * Get month name in Azerbaijani
 * @param {number} monthIndex - Month index (0-11)
 * @returns {string} Month name in Azerbaijani
 */
function getMonthName(monthIndex) {
    const months = [
        'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun',
        'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'
    ];
    return months[monthIndex];
}

/**
 * Get number of days in a month
 * @param {number} year - Year
 * @param {number} month - Month index (0-11)
 * @returns {number} Number of days
 */
function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

// ==================== City Mapping ====================
/**
 * Map city name to data key
 * @param {string} cityName - City name (Azerbaijani or Latin)
 * @returns {string} City key for data lookup
 */
function getCityKey(cityName) {
    const cityMap = {
        'bakı': 'baki', 'baku': 'baki',
        'gəncə': 'ganja', 'ganja': 'ganja',
        'sumqayıt': 'sumqayit', 'sumqayit': 'sumqayit',
        'ağdam': 'agdam', 'agdam': 'agdam',
        'astara': 'astara',
        'cəbrayıl': 'cebrayil', 'cebrayil': 'cebrayil',
        'füzuli': 'fuzuli', 'fuzuli': 'fuzuli',
        'göyçay': 'goycay', 'goycay': 'goycay',
        'kəlbəcər': 'kalbacar', 'kalbacar': 'kalbacar',
        'laçın': 'lacin', 'lacin': 'lacin',
        'lənkəran': 'lankaran', 'lankaran': 'lankaran',
        'masallı': 'masalli', 'masalli': 'masalli',
        'naxçıvan': 'nakhchivan', 'nakhchivan': 'nakhchivan',
        'neftçala': 'neftcala', 'neftcala': 'neftcala',
        'qazax': 'qazax', 'quba': 'quba',
        'qubadlı': 'qubadli', 'qubadli': 'qubadli',
        'qusar': 'qusar',
        'saatlı': 'saatli', 'saatli': 'saatli',
        'sabirabad': 'sabirabad', 'salyan': 'salyan',
        'şamaxı': 'shamakhi', 'shamakhi': 'shamakhi',
        'şəki': 'shaki', 'shaki': 'shaki',
        'şuşa': 'shusha', 'shusha': 'shusha',
        'xaçmaz': 'khachmaz', 'khachmaz': 'khachmaz',
        'xankəndi': 'khankandi', 'khankandi': 'khankandi',
        'xocalı': 'khocali', 'khocali': 'khocali',
        'yevlax': 'yevlakh', 'yevlakh': 'yevlakh',
        'zaqatala': 'zaqatala',
        'zəngilan': 'zangilan', 'zangilan': 'zangilan'
    };

    return cityMap[cityName.toLowerCase().trim()] || 'baki';
}

// ============================================================================
// DATA RETRIEVAL FUNCTIONS
// ============================================================================

// ==================== Official Data Functions ====================
/**
 * Check if official QMİ data exists for a specific month
 * @param {number} year - Year
 * @param {number} month - Month index (0-11)
 * @returns {boolean} True if official data exists
 */
function hasOfficialData(year, month) {
    return officialPrayerTimes.baki?.[year]?.[month + 1] !== undefined;
}

/**
 * Get official prayer times from QMİ for Bakı
 * @param {number} year - Year
 * @param {number} month - Month index (0-11)
 * @returns {Array} Array of prayer times for each day
 */
function getOfficialMonthData(year, month) {
    const monthData = officialPrayerTimes.baki[year][month + 1];
    const monthName = getMonthName(month);

    return monthData.map(dayData => ({
        date: `${dayData.day} ${monthName}`,
        fajr: dayData.fajr,
        sunrise: dayData.sunrise,
        dhuhr: dayData.dhuhr,
        asr: dayData.asr,
        maghrib: dayData.maghrib,
        isha: dayData.isha,
        midnight: dayData.midnight
    }));
}

// ==================== Calculation Functions ====================
/**
 * Calculate prayer time using simplified astronomical formulas
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {number} year - Year
 * @param {number} month - Month index (0-11)
 * @param {number} day - Day of month
 * @param {string} timeType - Type of prayer time
 * @returns {string} Calculated time in HH:MM format
 */
function calculatePrayerTime(lat, lng, year, month, day, timeType) {
    const date = new Date(year, month, day);
    const dayOfYear = Math.floor((date - new Date(year, 0, 0)) / 86400000);

    // Solar declination (simplified)
    const declination = 23.45 * Math.sin((360 / 365) * (dayOfYear - 81) * Math.PI / 180);

    // Hour angle for sunrise/sunset
    const latRad = lat * Math.PI / 180;
    const declRad = declination * Math.PI / 180;
    const hourAngle = Math.acos(-Math.tan(latRad) * Math.tan(declRad)) * 180 / Math.PI;

    // Approximate times
    const solarNoon = 12 + (lng / 15) - (new Date().getTimezoneOffset() / 60);
    const sunriseTime = solarNoon - (hourAngle / 15);
    const sunsetTime = solarNoon + (hourAngle / 15);

    let time;
    switch (timeType) {
        case 'fajr':
            time = sunriseTime - 1.5;
            break;
        case 'sunrise':
            time = sunriseTime;
            break;
        case 'dhuhr':
            time = solarNoon + 0.05;
            break;
        case 'asr':
            time = solarNoon + 3.5;
            break;
        case 'maghrib':
            time = sunsetTime;
            break;
        case 'isha':
            time = sunsetTime + 1.5;
            break;
        case 'midnight':
            time = 23.75;
            break;
        default:
            time = 12;
    }

    const hours = Math.floor(time);
    const minutes = Math.floor((time - hours) * 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

/**
 * Get calculated prayer times for a full month (fallback)
 * @param {string} cityKey - City key
 * @param {number} year - Year
 * @param {number} month - Month index (0-11)
 * @returns {Array} Array of calculated prayer times
 */
function getCalculatedMonthData(cityKey, year, month) {
    const config = cityConfigs[cityKey];
    const monthName = getMonthName(month);
    const daysInMonth = getDaysInMonth(year, month);
    const times = [];

    for (let day = 1; day <= daysInMonth; day++) {
        times.push({
            date: `${day} ${monthName}`,
            fajr: calculatePrayerTime(config.lat, config.lng, year, month, day, 'fajr'),
            sunrise: calculatePrayerTime(config.lat, config.lng, year, month, day, 'sunrise'),
            dhuhr: calculatePrayerTime(config.lat, config.lng, year, month, day, 'dhuhr'),
            asr: calculatePrayerTime(config.lat, config.lng, year, month, day, 'asr'),
            maghrib: calculatePrayerTime(config.lat, config.lng, year, month, day, 'maghrib'),
            isha: calculatePrayerTime(config.lat, config.lng, year, month, day, 'isha'),
            midnight: calculatePrayerTime(config.lat, config.lng, year, month, day, 'midnight')
        });
    }

    return times;
}

// ==================== Main Data Retrieval ====================
/**
 * Get prayer times for any city, month, and year
 * Uses official QMİ data when available, falls back to calculations
 * @param {string} cityKey - City key
 * @param {number} year - Year
 * @param {number} month - Month index (0-11)
 * @returns {Array} Array of prayer times for the month
 */
function getPrayerTimes(cityKey, year, month) {
    const config = cityConfigs[cityKey];

    // Try to use official QMİ data first
    if (hasOfficialData(year, month)) {
        const bakiData = getOfficialMonthData(year, month);

        // Apply city-specific time adjustments
        return bakiData.map(day => ({
            ...day,
            fajr: adjustTime(day.fajr, config.adjust),
            sunrise: adjustTime(day.sunrise, config.adjust),
            dhuhr: adjustTime(day.dhuhr, config.adjust),
            asr: adjustTime(day.asr, config.adjust),
            maghrib: adjustTime(day.maghrib, config.adjust),
            isha: adjustTime(day.isha, config.adjust),
            midnight: adjustTime(day.midnight, config.adjust)
        }));
    }

    // Fallback to astronomical calculations
    return getCalculatedMonthData(cityKey, year, month);
}

// ============================================================================
// LOCATION FUNCTIONS
// ============================================================================

/**
 * Get user's location based on IP address
 * @returns {Promise<Object>} Location data
 */
async function getUserLocation() {
    try {
        const response = await fetch('https://ipapi.co/json/', {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch location');
        }

        const data = await response.json();

        return {
            city: data.city || 'Bakı',
            country: data.country_name || 'Azerbaijan',
            latitude: data.latitude,
            longitude: data.longitude
        };
    } catch (error) {
        console.log('Using default location (Bakı)');
        return {
            city: 'Bakı',
            country: 'Azerbaijan'
        };
    }
}

// ============================================================================
// UI UPDATE FUNCTIONS
// ============================================================================

/**
 * Get current time in minutes since midnight
 * @returns {number} Minutes since midnight
 */
function getCurrentTimeInMinutes() {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
}

/**
 * Convert time string to minutes since midnight
 * @param {string} time - Time in HH:MM format
 * @returns {number} Minutes since midnight
 */
function timeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}

/**
 * Determine which prayer time is currently active (next prayer to be performed)
 * @param {Object} prayerTimes - Object containing all prayer times
 * @returns {string} Active prayer time name (the next one to pray)
 */
function getActivePrayerTime(prayerTimes) {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const fajrMinutes = timeToMinutes(prayerTimes.fajr);
    const sunriseMinutes = timeToMinutes(prayerTimes.sunrise);
    const dhuhrMinutes = timeToMinutes(prayerTimes.dhuhr);
    const asrMinutes = timeToMinutes(prayerTimes.asr);
    const maghribMinutes = timeToMinutes(prayerTimes.maghrib);
    const ishaMinutes = timeToMinutes(prayerTimes.isha);
    const midnightMinutes = timeToMinutes(prayerTimes.midnight);

    // Find which prayer time is active (upcoming or current)
    if (currentMinutes >= ishaMinutes) {
        return 'isha';
    } else if (currentMinutes >= maghribMinutes) {
        return 'maghrib';
    } else if (currentMinutes >= asrMinutes) {
        return 'asr';
    } else if (currentMinutes >= dhuhrMinutes) {
        return 'dhuhr';
    } else if (currentMinutes >= sunriseMinutes) {
        return 'dhuhr'; // After sunrise, next prayer is Dhuhr
    } else if (currentMinutes >= fajrMinutes) {
        return 'fajr';
    } else {
        return 'fajr'; // Before Fajr time, Fajr is the next prayer
    }
}

/**
 * Update prayer times display in the UI
 * @param {string} cityKey - City key
 * @param {number} year - Year (optional, defaults to current year)
 * @param {number} month - Month index (optional, defaults to current month)
 */
function updatePrayerTimes(cityKey, year, month) {
    const now = new Date();
    const currentYear = year || now.getFullYear();
    const currentMonth = month !== undefined ? month : now.getMonth();
    const currentDay = now.getDate();

    // Check if we're viewing the current month and year
    const isCurrentMonth = (currentMonth === now.getMonth() && currentYear === now.getFullYear());

    // Get prayer times for the month
    const monthData = getPrayerTimes(cityKey, currentYear, currentMonth);

    // For today's times, use current day if viewing current month, otherwise use first day
    const todayData = isCurrentMonth ? monthData[currentDay - 1] || monthData[0] : monthData[0];

    // Get active prayer time (only if viewing current month)
    const activePrayerTime = isCurrentMonth ? getActivePrayerTime(todayData) : null;

    // Update today's prayer times cards
    const prayerCards = {
        fajr: document.getElementById('fajr').closest('.prayer-time-card'),
        sunrise: document.getElementById('sunrise').closest('.prayer-time-card'),
        dhuhr: document.getElementById('dhuhr').closest('.prayer-time-card'),
        asr: document.getElementById('asr').closest('.prayer-time-card'),
        maghrib: document.getElementById('maghrib').closest('.prayer-time-card'),
        isha: document.getElementById('isha').closest('.prayer-time-card'),
        midnight: document.getElementById('midnight').closest('.prayer-time-card')
    };

    // Remove active class from all cards
    Object.values(prayerCards).forEach(card => {
        if (card) {
            card.classList.remove('active');
        }
    });

    // Add active class to current prayer time card
    if (activePrayerTime && prayerCards[activePrayerTime]) {
        prayerCards[activePrayerTime].classList.add('active');
    }

    // Update prayer time values
    document.getElementById('fajr').textContent = todayData.fajr;
    document.getElementById('sunrise').textContent = todayData.sunrise;
    document.getElementById('dhuhr').textContent = todayData.dhuhr;
    document.getElementById('asr').textContent = todayData.asr;
    document.getElementById('maghrib').textContent = todayData.maghrib;
    document.getElementById('isha').textContent = todayData.isha;
    document.getElementById('midnight').textContent = todayData.midnight;

    // Update monthly table
    const tableBody = document.getElementById('prayerTimesTableBody');
    tableBody.innerHTML = '';

    monthData.forEach((day, index) => {
        const row = document.createElement('tr');

        // Highlight current day ONLY if viewing current month
        if (isCurrentMonth && index === currentDay - 1) {
            row.classList.add('current-day');
        }

        row.innerHTML = `
            <td><strong>${day.date}</strong></td>
            <td>${day.fajr}</td>
            <td>${day.sunrise}</td>
            <td>${day.dhuhr}</td>
            <td>${day.asr}</td>
            <td>${day.maghrib}</td>
            <td>${day.isha}</td>
            <td>${day.midnight}</td>
        `;

        tableBody.appendChild(row);
    });

    // Update month title with data source
    const monthTitle = document.querySelector('.prayer-times__monthly-title');
    if (monthTitle) {
        const dataSource = hasOfficialData(currentYear, currentMonth) ? 'QMİ' : 'Hesablanmış';
        monthTitle.textContent = `${getMonthName(currentMonth)} ${currentYear} (${dataSource})`;
    }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Show loading state
 */
function showLoading() {
    // Show global loading overlay
    if (window.Loading) {
        window.Loading.show('Namaz vaxtları yüklənir...');
        // Also show section loading for smooth transition
        window.Loading.showSections(['#todaySection', '#monthlySection']);
    }
}

/**
 * Hide loading state
 */
function hideLoading() {
    // Hide global loading overlay
    if (window.Loading) {
        window.Loading.hide();
        // Hide section loading
        window.Loading.hideSections(['#todaySection', '#monthlySection']);
    }
}

/**
 * Initialize prayer times page
 * Sets up location detection, event listeners, and initial data display
 */
async function initPrayerTimes() {
    try {
        // Show loading state
        showLoading();

        // Get user's location
        const location = await getUserLocation();
        const cityKey = getCityKey(location.city);
        const config = cityConfigs[cityKey];

        // Get current date
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        // Get DOM elements
        const currentCityElement = document.getElementById('currentCity');
        const currentDateElement = document.getElementById('currentDate');
        const citySelect = document.getElementById('citySelect');
        const monthSelect = document.getElementById('monthSelect');

        // Update current city display
        if (currentCityElement) {
            currentCityElement.textContent = config.name;
        }

        // Update current date/time display
        if (currentDateElement) {
            currentDateElement.textContent = formatDateTime();
        }

        // Setup city selector
        if (citySelect) {
            citySelect.value = cityKey;

            citySelect.addEventListener('change', (e) => {
                const selectedCity = e.target.value;
                const selectedConfig = cityConfigs[selectedCity];

                if (currentCityElement && selectedConfig) {
                    currentCityElement.textContent = selectedConfig.name;
                }

                const selectedMonth = monthSelect ? parseInt(monthSelect.value) : currentMonth;
                const selectedYear = new Date().getFullYear();

                updatePrayerTimes(selectedCity, selectedYear, selectedMonth);
            });
        }

        // Setup month selector
        if (monthSelect) {
            monthSelect.value = currentMonth.toString();

            monthSelect.addEventListener('change', () => {
                const selectedCity = citySelect ? citySelect.value : cityKey;
                const selectedMonth = parseInt(monthSelect.value);
                const selectedYear = new Date().getFullYear();

                updatePrayerTimes(selectedCity, selectedYear, selectedMonth);
            });
        }

        // Initial prayer times display
        updatePrayerTimes(cityKey, currentYear, currentMonth);

        // Hide loading state after data is loaded
        hideLoading();

        // Update clock and active prayer time every minute
        if (currentDateElement) {
            setInterval(() => {
                currentDateElement.textContent = formatDateTime();

                // Also update prayer times to refresh active card
                const selectedCity = citySelect ? citySelect.value : cityKey;
                const selectedMonth = monthSelect ? parseInt(monthSelect.value) : currentMonth;
                const selectedYear = new Date().getFullYear();

                updatePrayerTimes(selectedCity, selectedYear, selectedMonth);
            }, 60000);
        }
    } catch (error) {
        console.error('Error initializing prayer times:', error);

        // Hide loading state even on error
        hideLoading();

        // Fallback to Bakı if initialization fails
        const now = new Date();
        updatePrayerTimes('baki', now.getFullYear(), now.getMonth());
    }
}

// ============================================================================
// AUTO-INITIALIZATION
// ============================================================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPrayerTimes);
} else {
    initPrayerTimes();
}
