export const ONE_SECOND_DELAY = 1000;
export const SHORT_DELAY = 3000;
export const LONG_DELAY = 10000;
export const EXTRA_LONG_DELAY = 20000;
export const MINUTE_LONG_DELAY = 60000;
export const TWO_MINUTE_LONG_DELAY = 120000;
export const TYPING_DELAY = 5;
export const TRADING_START_HOUR = 9;
export const TRADING_END_HOUR = 15;

export const BROWSER_SETTINGS = {
    executablePath: "chromium-browser",
    headless: process.env.SCRAPER_MODE === 'headless' ? "new" : false,
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',

        '--disable-features=site-per-process',
        '--disable-dev-shm-usage', // Reduce memory consumption
        '--disable-gpu', // Disable GPU hardware acceleration
        // '--disable-software-rasterizer',
        '--disable-extensions', // Disable extensions
        '--disable-background-networking',
        '--disable-background-timer-throttling',
        '--disable-breakpad',
        '--disable-client-side-phishing-detection',
        '--disable-default-apps',
        '--disable-hang-monitor',
        '--disable-popup-blocking',
        '--disable-prompt-on-repost',
        '--disable-sync',
        '--disable-translate',
        '--metrics-recording-only',
        '--mute-audio',
        '--no-first-run',
        '--safebrowsing-disable-auto-update',
        '--single-process', // Single process mode
        '--ignore-certificate-errors',
        '--ignore-ssl-errors',
        '--ignore-certificate-errors-spki-list',
    ],
    protocolTimeout: 0,
};

// export const HOLIDAYS: string[] = ['January 26,2022', 'March 01,2022', 'March 18,2022', 'April 14,2022', 'April 15,2022',
//     'May 03,2022', 'August 09,2022', 'August 15,2022', 'August 31,2022', 'October 05,2022', 'October 24,2022',
//     'October 26,2022', 'November 08,2022', 'January 26,2023', 'March 07,2023', 'March 30,2023', 'April 04,2023', 'April 07,2023',
//     'April 14,2023', 'May 01,2023', 'June 28,2023', 'August 15,2023', 'September 19,2023', 'October 02,2023', 'October 24,2023',
//     'November 14,2023', 'November 27,2023', 'December 25,2023']

export const HOLIDAYS: string[] = ['January 26,2024', 'March 08,2024', 'March 25,2024', 'March 29,2024', 'April 11,2024', 'April 17,2024',
    'May 01,2024', 'June 17,2024', 'July 17,2024', 'August 15,2024', 'October 02,2024', 'November 01,2024', 'November 15,2024', 'December 25,2024']

export const DATA_SOURCES = ["tickertape-indicators"]

export const MAX_COHORT_RESULTS = 5;
export const MAX_EQUITY_HOLDING = 100000;
export const CRON_TIMES = {
    LOGIN_PREP_CLONE: '5 7 * * *',
    SOCKET_PREP: '55 8 * * *',

    LOGIN_PREP: '10 7 * * *',
    HISTORY_PREP: '20 7 * * *',
    DATA_PREP: '30 7 * * *',
    DATA_PROVIDERS: '50 7 * * *',
    COHORT_PROCESSOR: '10 8 * * *',
    TRADER_SELL: '55 8 * * *',
    TRADER_BUY: '16 9 * * *',
    DB_BACKUP: '0 3 * * *',
    SELECTED_ITEMS_LOG: '25 9 * * *',
};


export const dateFormatConstant = 'YYYY-MM-DD'

export const DAYS_LIMIT = 12; // Define a maximum number of days to consider

// 8

//
