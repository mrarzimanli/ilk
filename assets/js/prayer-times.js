'use strict';

// ============================================================================
// PRAYER TIMES PAGE CLASS
// ============================================================================

class PrayerTimesPage {
    // ==================== Static Data ====================
    static officialPrayerTimes = {
        baki: {
            2025: {
                10: [
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

    static cityConfigs = {
        agcabedi: { name: 'Ağcabədi', lat: 40.0508, lng: 47.4614, adjust: 2 },
        agdam: { name: 'Ağdam', lat: 40.1486, lng: 46.9214, adjust: 2 },
        agdas: { name: 'Ağdaş', lat: 40.6475, lng: 47.4864, adjust: 1 },
        agdere: { name: 'Ağdərə', lat: 40.2131, lng: 46.7883, adjust: 8 },
        agstafa: { name: 'Ağstafa', lat: 41.1147, lng: 45.4547, adjust: 8 },
        agsu: { name: 'Ağsu', lat: 40.5694, lng: 48.4014, adjust: 2 },
        astara: { name: 'Astara', lat: 38.4558, lng: 48.8722, adjust: -3 },
        babek: { name: 'Babək', lat: 39.3731, lng: 45.2192, adjust: 12 },
        baki: { name: 'Bakı', lat: 40.4093, lng: 49.8671, adjust: 0 },
        balaken: { name: 'Balakən', lat: 41.7333, lng: 46.4097, adjust: 11 },
        beylaqan: { name: 'Beyləqan', lat: 39.7733, lng: 47.6217, adjust: 2 },
        berde: { name: 'Bərdə', lat: 40.3736, lng: 47.1278, adjust: 1 },
        bilesuvar: { name: 'Biləsuvar', lat: 39.4583, lng: 48.5450, adjust: -2 },
        cebrayil: { name: 'Cəbrayıl', lat: 39.4000, lng: 47.0261, adjust: 3 },
        celilabad: { name: 'Cəlilabad', lat: 39.1989, lng: 48.4908, adjust: -2 },
        culfa: { name: 'Culfa', lat: 38.9561, lng: 45.6297, adjust: 13 },
        daskesen: { name: 'Daşkəsən', lat: 40.4694, lng: 46.0717, adjust: 7 },
        asgeran: { name: 'Əsgəran', lat: 39.9381, lng: 46.8261, adjust: 8 },
        fuzuli: { name: 'Füzuli', lat: 39.6006, lng: 47.1453, adjust: 3 },
        gedebey: { name: 'Gədəbəy', lat: 40.5656, lng: 45.8169, adjust: 8 },
        gence: { name: 'Gəncə', lat: 40.6875, lng: 46.3619, adjust: 5 },
        goranboy: { name: 'Goranboy', lat: 40.6103, lng: 46.7897, adjust: 6 },
        goycay: { name: 'Göyçay', lat: 40.6536, lng: 47.7408, adjust: 1 },
        goygol: { name: 'Göygöl', lat: 40.5869, lng: 46.3153, adjust: 6 },
        goytepe: { name: 'Göytəpə', lat: 39.1186, lng: 48.6036, adjust: -1 },
        haciqabul: { name: 'Hacıqabul', lat: 40.0856, lng: 48.9047, adjust: 0 },
        horadiz: { name: 'Horadiz', lat: 39.4467, lng: 47.3353, adjust: 3 },
        khachmaz: { name: 'Xaçmaz', lat: 41.4631, lng: 48.8050, adjust: 5 },
        khankendi: { name: 'Xankəndi', lat: 39.8150, lng: 46.7520, adjust: 8 },
        khirdalan: { name: 'Xırdalan', lat: 40.4483, lng: 49.7564, adjust: 0 },
        khizi: { name: 'Xızı', lat: 40.9058, lng: 49.0725, adjust: 1 },
        khocali: { name: 'Xocalı', lat: 39.9125, lng: 46.7933, adjust: 8 },
        khocavend: { name: 'Xocavənd', lat: 39.7956, lng: 47.1139, adjust: 8 },
        khudat: { name: 'Xudat', lat: 41.6383, lng: 48.6853, adjust: 6 },
        imishli: { name: 'İmişli', lat: 39.8706, lng: 48.0647, adjust: 0 },
        ismayilli: { name: 'İsmayıllı', lat: 40.7850, lng: 48.1519, adjust: 2 },
        kalbacar: { name: 'Kəlbəcər', lat: 40.1025, lng: 46.0386, adjust: 9 },
        kurdemir: { name: 'Kürdəmir', lat: 40.3419, lng: 48.1619, adjust: 1 },
        qax: { name: 'Qax', lat: 41.4244, lng: 46.9167, adjust: 10 },
        qazax: { name: 'Qazax', lat: 41.0911, lng: 45.3636, adjust: 8 },
        qebele: { name: 'Qəbələ', lat: 40.9778, lng: 47.8431, adjust: 4 },
        qobustan: { name: 'Qobustan', lat: 40.0847, lng: 48.9292, adjust: 0 },
        quba: { name: 'Quba', lat: 41.3614, lng: 48.5097, adjust: 4 },
        qubadli: { name: 'Qubadlı', lat: 39.3431, lng: 46.5797, adjust: 9 },
        qusar: { name: 'Qusar', lat: 41.4264, lng: 48.4333, adjust: 5 },
        lachin: { name: 'Laçın', lat: 39.5981, lng: 46.5444, adjust: 10 },
        lerik: { name: 'Lerik', lat: 38.7736, lng: 48.4144, adjust: -2 },
        lankaran: { name: 'Lənkəran', lat: 38.7547, lng: 48.8511, adjust: -2 },
        liman: { name: 'Liman', lat: 38.7061, lng: 48.8575, adjust: -2 },
        masalli: { name: 'Masallı', lat: 39.0356, lng: 48.6656, adjust: -2 },
        mingecevir: { name: 'Mingəçevir', lat: 40.7694, lng: 47.0539, adjust: 3 },
        naftalan: { name: 'Naftalan', lat: 40.5067, lng: 46.8250, adjust: 5 },
        nakhchivan: { name: 'Naxçıvan', lat: 39.2089, lng: 45.4158, adjust: 13 },
        neftcala: { name: 'Neftçala', lat: 39.3764, lng: 49.2475, adjust: 0 },
        oguz: { name: 'Oğuz', lat: 41.0708, lng: 47.4583, adjust: 7 },
        ordubad: { name: 'Ordubad', lat: 38.9064, lng: 46.0233, adjust: 13 },
        saatli: { name: 'Saatlı', lat: 39.9333, lng: 48.3697, adjust: 1 },
        sabirabad: { name: 'Sabirabad', lat: 40.0067, lng: 48.4711, adjust: 0 },
        salyan: { name: 'Salyan', lat: 39.5931, lng: 49.1047, adjust: 0 },
        samux: { name: 'Samux', lat: 40.8144, lng: 46.4031, adjust: 6 },
        sederak: { name: 'Sədərək', lat: 39.7106, lng: 45.1203, adjust: 13 },
        siyezen: { name: 'Siyəzən', lat: 41.0733, lng: 49.1083, adjust: 4 },
        sumqayit: { name: 'Sumqayıt', lat: 40.5897, lng: 50.0061, adjust: 0 },
        shabran: { name: 'Şabran', lat: 41.1739, lng: 48.9942, adjust: 6 },
        shahbuz: { name: 'Şahbuz', lat: 39.4089, lng: 45.5736, adjust: 13 },
        shamakhi: { name: 'Şamaxı', lat: 40.6325, lng: 48.6439, adjust: 2 },
        shaki: { name: 'Şəki', lat: 41.1867, lng: 47.1711, adjust: 7 },
        shamkir: { name: 'Şəmkir', lat: 40.8292, lng: 46.0194, adjust: 7 },
        sherur: { name: 'Şərur', lat: 39.5436, lng: 44.9436, adjust: 13 },
        shirvan: { name: 'Şirvan', lat: 39.9375, lng: 48.9283, adjust: 1 },
        shusha: { name: 'Şuşa', lat: 39.7603, lng: 46.7467, adjust: 8 },
        terter: { name: 'Tərtər', lat: 40.3433, lng: 46.9208, adjust: 7 },
        tovuz: { name: 'Tovuz', lat: 40.9925, lng: 45.6281, adjust: 8 },
        ucar: { name: 'Ucar', lat: 40.5189, lng: 47.6522, adjust: 2 },
        yardimli: { name: 'Yardımlı', lat: 38.9089, lng: 48.2075, adjust: -2 },
        yevlakh: { name: 'Yevlax', lat: 40.6181, lng: 47.1492, adjust: 5 },
        zaqatala: { name: 'Zaqatala', lat: 41.6306, lng: 46.6447, adjust: 9 },
        zengilan: { name: 'Zəngilan', lat: 39.0811, lng: 46.6592, adjust: 9 },
        zerdab: { name: 'Zərdab', lat: 40.2106, lng: 47.7144, adjust: 1 }
    };

    // ==================== Static Utility Methods ====================
    static adjustTime(time, minutes) {
        const [h, m] = time.split(':').map(Number);
        const totalMinutes = h * 60 + m + minutes;
        const newH = Math.floor(totalMinutes / 60) % 24;
        const newM = totalMinutes % 60;
        return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
    }

    static formatDateTime() {
        const now = new Date();
        const day = now.getDate();
        const month = this.getMonthName(now.getMonth());
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${day} ${month} ${year} ${hours}:${minutes}`;
    }

    static getMonthName(monthIndex) {
        const months = [
            'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun',
            'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'
        ];
        return months[monthIndex];
    }

    static getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    static timeToMinutes(time) {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    }

    static getCityKey(cityName) {
        const cityMap = {
            'ağcabədi': 'agcabedi', 'agcabedi': 'agcabedi',
            'ağdam': 'agdam', 'agdam': 'agdam',
            'ağdaş': 'agdas', 'agdas': 'agdas',
            'ağdərə': 'agdere', 'agdere': 'agdere',
            'ağstafa': 'agstafa', 'agstafa': 'agstafa',
            'ağsu': 'agsu', 'agsu': 'agsu',
            'astara': 'astara',
            'babək': 'babek', 'babek': 'babek',
            'bakı': 'baki', 'baku': 'baki',
            'balakən': 'balaken', 'balaken': 'balaken',
            'beyləqan': 'beylaqan', 'beylaqan': 'beylaqan',
            'bərdə': 'berde', 'berde': 'berde',
            'biləsuvar': 'bilesuvar', 'bilesuvar': 'bilesuvar',
            'cəbrayıl': 'cebrayil', 'cebrayil': 'cebrayil',
            'cəlilabad': 'celilabad', 'celilabad': 'celilabad',
            'culfa': 'culfa',
            'daşkəsən': 'daskesen', 'daskesen': 'daskesen',
            'əsgəran': 'asgeran', 'asgeran': 'asgeran',
            'füzuli': 'fuzuli', 'fuzuli': 'fuzuli',
            'gədəbəy': 'gedebey', 'gedebey': 'gedebey',
            'gəncə': 'ganja', 'ganja': 'ganja',
            'goranboy': 'goranboy',
            'göyçay': 'goycay', 'goycay': 'goycay',
            'göygöl': 'goygol', 'goygol': 'goygol',
            'göytəpə': 'goytepe', 'goytepe': 'goytepe',
            'hacıqabul': 'haciqabul', 'haciqabul': 'haciqabul',
            'horadiz': 'horadiz',
            'xaçmaz': 'khachmaz', 'khachmaz': 'khachmaz',
            'xankəndi': 'khankendi', 'khankandi': 'khankendi',
            'xırdalan': 'khirdalan', 'khirdalan': 'khirdalan',
            'xızı': 'khizi', 'khizi': 'khizi',
            'xocalı': 'khocali', 'khocali': 'khocali',
            'xocavənd': 'khocavend', 'khocavend': 'khocavend',
            'xudat': 'khudat', 'khudat': 'khudat',
            'imışli': 'imishli', 'imishli': 'imishli',
            'ismayıllı': 'ismayilli', 'ismayilli': 'ismayilli',
            'kəlbəcər': 'kalbacar', 'kalbacar': 'kalbacar',
            'kürdəmir': 'kurdemir', 'kurdemir': 'kurdemir',
            'qax': 'qax',
            'qazax': 'qazax',
            'qəbələ': 'qebele', 'qebele': 'qebele',
            'qobustan': 'qobustan',
            'quba': 'quba',
            'qubadlı': 'qubadli', 'qubadli': 'qubadli',
            'qusar': 'qusar',
            'laçın': 'lachin', 'lacin': 'lachin',
            'lerik': 'lerik',
            'lənkəran': 'lankaran', 'lankaran': 'lankaran',
            'liman': 'liman',
            'masallı': 'masalli', 'masalli': 'masalli',
            'mingəçevir': 'mingecevir', 'mingecevir': 'mingecevir',
            'naftalan': 'naftalan',
            'naxçıvan': 'nakhchivan', 'nakhchivan': 'nakhchivan',
            'neftçala': 'neftcala', 'neftcala': 'neftcala',
            'oğuz': 'oguz', 'oguz': 'oguz',
            'ordubad': 'ordubad',
            'saatlı': 'saatli', 'saatli': 'saatli',
            'sabirabad': 'sabirabad',
            'salyan': 'salyan',
            'samux': 'samux',
            'sədərək': 'sederak', 'sederak': 'sederak',
            'siyəzən': 'siyezen', 'siyezen': 'siyezen',
            'sumqayıt': 'sumqayit', 'sumqayit': 'sumqayit',
            'şabran': 'shabran', 'shabran': 'shabran',
            'şahbuz': 'shahbuz', 'shahbuz': 'shahbuz',
            'şamaxı': 'shamakhi', 'shamakhi': 'shamakhi',
            'şəki': 'shaki', 'shaki': 'shaki',
            'şəmkir': 'shamkir', 'shamkir': 'shamkir',
            'şərur': 'sherur', 'sherur': 'sherur',
            'şirvan': 'shirvan', 'shirvan': 'shirvan',
            'şuşa': 'shusha', 'shusha': 'shusha',
            'tərtər': 'terter', 'terter': 'terter',
            'tovuz': 'tovuz',
            'ucar': 'ucar',
            'yardımlı': 'yardimli', 'yardimli': 'yardimli',
            'yevlax': 'yevlakh', 'yevlakh': 'yevlakh',
            'zaqatala': 'zaqatala',
            'zəngilan': 'zengilan', 'zangilan': 'zengilan',
            'zərdab': 'zerdab', 'zerdab': 'zerdab'
        };
        return cityMap[cityName.toLowerCase().trim()] || 'baki';
    }

    static hasOfficialData(year, month) {
        return this.officialPrayerTimes.baki?.[year]?.[month + 1] !== undefined;
    }

    static getOfficialMonthData(year, month) {
        const monthData = this.officialPrayerTimes.baki[year][month + 1];
        const monthName = this.getMonthName(month);

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

    static calculatePrayerTime(lat, lng, year, month, day, timeType) {
        const date = new Date(year, month, day);
        const dayOfYear = Math.floor((date - new Date(year, 0, 0)) / 86400000);

        const declination = 23.45 * Math.sin((360 / 365) * (dayOfYear - 81) * Math.PI / 180);
        const latRad = lat * Math.PI / 180;
        const declRad = declination * Math.PI / 180;
        const hourAngle = Math.acos(-Math.tan(latRad) * Math.tan(declRad)) * 180 / Math.PI;

        const solarNoon = 12 + (lng / 15) - (new Date().getTimezoneOffset() / 60);
        const sunriseTime = solarNoon - (hourAngle / 15);
        const sunsetTime = solarNoon + (hourAngle / 15);

        let time;
        switch (timeType) {
            case 'fajr': time = sunriseTime - 1.5; break;
            case 'sunrise': time = sunriseTime; break;
            case 'dhuhr': time = solarNoon + 0.05; break;
            case 'asr': time = solarNoon + 3.5; break;
            case 'maghrib': time = sunsetTime; break;
            case 'isha': time = sunsetTime + 1.5; break;
            case 'midnight': time = 23.75; break;
            default: time = 12;
        }

        const hours = Math.floor(time);
        const minutes = Math.floor((time - hours) * 60);
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }

    static getCalculatedMonthData(cityKey, year, month) {
        const config = this.cityConfigs[cityKey];
        const monthName = this.getMonthName(month);
        const daysInMonth = this.getDaysInMonth(year, month);
        const times = [];

        for (let day = 1; day <= daysInMonth; day++) {
            times.push({
                date: `${day} ${monthName}`,
                fajr: this.calculatePrayerTime(config.lat, config.lng, year, month, day, 'fajr'),
                sunrise: this.calculatePrayerTime(config.lat, config.lng, year, month, day, 'sunrise'),
                dhuhr: this.calculatePrayerTime(config.lat, config.lng, year, month, day, 'dhuhr'),
                asr: this.calculatePrayerTime(config.lat, config.lng, year, month, day, 'asr'),
                maghrib: this.calculatePrayerTime(config.lat, config.lng, year, month, day, 'maghrib'),
                isha: this.calculatePrayerTime(config.lat, config.lng, year, month, day, 'isha'),
                midnight: this.calculatePrayerTime(config.lat, config.lng, year, month, day, 'midnight')
            });
        }
        return times;
    }

    static getPrayerTimes(cityKey, year, month) {
        const config = this.cityConfigs[cityKey];

        if (this.hasOfficialData(year, month)) {
            const bakiData = this.getOfficialMonthData(year, month);
            return bakiData.map(day => ({
                ...day,
                fajr: this.adjustTime(day.fajr, config.adjust),
                sunrise: this.adjustTime(day.sunrise, config.adjust),
                dhuhr: this.adjustTime(day.dhuhr, config.adjust),
                asr: this.adjustTime(day.asr, config.adjust),
                maghrib: this.adjustTime(day.maghrib, config.adjust),
                isha: this.adjustTime(day.isha, config.adjust),
                midnight: this.adjustTime(day.midnight, config.adjust)
            }));
        }

        return this.getCalculatedMonthData(cityKey, year, month);
    }

    static getActivePrayerTime(prayerTimes) {
        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        const fajrMinutes = this.timeToMinutes(prayerTimes.fajr);
        const sunriseMinutes = this.timeToMinutes(prayerTimes.sunrise);
        const dhuhrMinutes = this.timeToMinutes(prayerTimes.dhuhr);
        const asrMinutes = this.timeToMinutes(prayerTimes.asr);
        const maghribMinutes = this.timeToMinutes(prayerTimes.maghrib);
        const ishaMinutes = this.timeToMinutes(prayerTimes.isha);
        const midnightMinutes = this.timeToMinutes(prayerTimes.midnight);

        if (currentMinutes >= ishaMinutes) return 'isha';
        if (currentMinutes >= maghribMinutes) return 'maghrib';
        if (currentMinutes >= asrMinutes) return 'asr';
        if (currentMinutes >= dhuhrMinutes) return 'dhuhr';
        if (currentMinutes >= sunriseMinutes) return 'dhuhr';
        if (currentMinutes >= fajrMinutes) return 'fajr';
        return 'fajr';
    }

    // ==================== Instance Properties ====================
    constructor() {
        this.cityKey = 'baki';
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();

        this.currentCityElement = document.getElementById('currentCity');
        this.currentDateElement = document.getElementById('currentDate');
        this.citySelect = document.getElementById('citySelect');
        this.monthSelect = document.getElementById('monthSelect');

        this.init();
    }

    async init() {
        try {
            const location = await this.getUserLocation();
            this.cityKey = PrayerTimesPage.getCityKey(location.city);
            const config = PrayerTimesPage.cityConfigs[this.cityKey];

            const now = new Date();
            this.currentMonth = now.getMonth();
            this.currentYear = now.getFullYear();

            if (this.currentCityElement) {
                this.currentCityElement.textContent = config.name;
            }

            if (this.currentDateElement) {
                this.currentDateElement.textContent = PrayerTimesPage.formatDateTime();
            }

            this.setupEventListeners();
            this.updatePrayerTimes();
            this.startAutoUpdate();

        } catch (error) {
            console.error('Error initializing prayer times:', error);
            this.updatePrayerTimes();
        }
    }

    setupEventListeners() {
        if (this.citySelect) {
            this.citySelect.value = this.cityKey;

            this.citySelect.addEventListener('change', (e) => {
                this.cityKey = e.target.value;
                const config = PrayerTimesPage.cityConfigs[this.cityKey];

                if (this.currentCityElement && config) {
                    this.currentCityElement.textContent = config.name;
                }
                this.updatePrayerTimes();
            });
        }

        if (this.monthSelect) {
            this.monthSelect.value = this.currentMonth.toString();

            this.monthSelect.addEventListener('change', () => {
                this.currentMonth = parseInt(this.monthSelect.value);
                this.updatePrayerTimes();
            });
        }
    }

    startAutoUpdate() {
        if (this.currentDateElement) {
            setInterval(() => {
                this.currentDateElement.textContent = PrayerTimesPage.formatDateTime();
                this.updatePrayerTimes();
            }, 60000);
        }
    }

    async getUserLocation() {
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
            return { city: 'Bakı', country: 'Azerbaijan' };
        }
    }

    updatePrayerTimes() {
        const now = new Date();
        const currentDay = now.getDate();
        const isCurrentMonth = (this.currentMonth === now.getMonth() && this.currentYear === now.getFullYear());

        const monthData = PrayerTimesPage.getPrayerTimes(this.cityKey, this.currentYear, this.currentMonth);
        const todayData = isCurrentMonth ? monthData[currentDay - 1] || monthData[0] : monthData[0];
        const activePrayerTime = isCurrentMonth ? PrayerTimesPage.getActivePrayerTime(todayData) : null;

        const prayerCards = {
            fajr: document.getElementById('fajr').closest('.prayer-time-card'),
            sunrise: document.getElementById('sunrise').closest('.prayer-time-card'),
            dhuhr: document.getElementById('dhuhr').closest('.prayer-time-card'),
            asr: document.getElementById('asr').closest('.prayer-time-card'),
            maghrib: document.getElementById('maghrib').closest('.prayer-time-card'),
            isha: document.getElementById('isha').closest('.prayer-time-card'),
            midnight: document.getElementById('midnight').closest('.prayer-time-card')
        };

        Object.values(prayerCards).forEach(card => {
            if (card) card.classList.remove('active');
        });

        if (activePrayerTime && prayerCards[activePrayerTime]) {
            prayerCards[activePrayerTime].classList.add('active');
        }

        document.getElementById('fajr').textContent = todayData.fajr;
        document.getElementById('sunrise').textContent = todayData.sunrise;
        document.getElementById('dhuhr').textContent = todayData.dhuhr;
        document.getElementById('asr').textContent = todayData.asr;
        document.getElementById('maghrib').textContent = todayData.maghrib;
        document.getElementById('isha').textContent = todayData.isha;
        document.getElementById('midnight').textContent = todayData.midnight;

        const tableBody = document.getElementById('prayerTimesTableBody');
        tableBody.innerHTML = '';

        monthData.forEach((day, index) => {
            const row = document.createElement('tr');
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

        const monthTitle = document.querySelector('.prayer-times__monthly-title');
        if (monthTitle) {
            const dataSource = PrayerTimesPage.hasOfficialData(this.currentYear, this.currentMonth) ? 'QMİ' : 'Hesablanmış';
            monthTitle.textContent = `${PrayerTimesPage.getMonthName(this.currentMonth)} ${this.currentYear} (${dataSource})`;
        }
    }
}

// ============================================================================
// AUTO-INITIALIZATION
// ============================================================================

// Global instance for inline event handlers
let prayerTimes;

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('prayerTimesPage')) {
        prayerTimes = new PrayerTimesPage();
    }
});
