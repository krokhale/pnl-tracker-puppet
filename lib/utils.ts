// import path from "path";
// const {Op} = require('sequelize')
// const dayjs = require("dayjs");
// const relativeTime = require('dayjs/plugin/relativeTime')
// const duration = require('dayjs/plugin/duration')
// const calendar = require('dayjs/plugin/calendar')
// const timezone = require('dayjs/plugin/timezone')
// dayjs.extend(relativeTime);
// dayjs.extend(duration);
// dayjs.extend(calendar);
// dayjs.extend(timezone);
// dayjs.tz.setDefault("Asia/Colombo")
// import puppeteer, { Browser, Page } from 'puppeteer';
// const modelsPath = path.join(__dirname, '../../src/lib/db/models')
// const models = require(modelsPath);
// const {KiteConnect, KiteTicker} = require("kiteconnect");
//
// const cron = require("node-cron");
import cron from "node-cron"

import {
    BROWSER_SETTINGS,
    TRADING_END_HOUR,
    TRADING_START_HOUR,
    TYPING_DELAY,
    SHORT_DELAY,
    HOLIDAYS,
    dateFormatConstant
} from '@/lib/constants.js';

export const delay = async (time: number): Promise<void> => new Promise(resolve => setTimeout(resolve, time));

// @ts-ignore
export const puppet = async (): Promise<Browser> => puppeteer.launch(BROWSER_SETTINGS);

// export const isTradingDay = (day = dayjs()): boolean => {
//     const today = day.format('MMMM DD,YYYY');
//     const isWeekend = ['Saturday', 'Sunday'].includes(day.format('dddd'));
//     return !isWeekend && !HOLIDAYS.includes(today);
// };
//
// export const findNearestTradingDay = (day: any): any => {
//     while (!isTradingDay(day)) {
//         day = day.subtract(1, 'day');
//     }
//     return day;
// };
//
//
// export const isTradingTime = (day = dayjs()): boolean =>
//     isTradingDay(day) && day.hour() >= TRADING_START_HOUR && day.hour() <= TRADING_END_HOUR;
//
// let kc : typeof KiteConnect
// let kt: any
//
// export const auth = async () => {
//     const kiteAuth = await models.KiteAuth.findOne({
//         where: { zerodha_id: process.env.ZERODHA_ID as string },
//         order: [['createdAt', 'DESC']],
//     } as any);
//
//     if (kiteAuth && kiteAuth.access_token) {
//         kc = new KiteConnect({
//             api_key: process.env.KITE_API_KEY as string, // Cast it to string or the expected type
//             access_token: kiteAuth.access_token
//         });
//     }
//     return kc;
// };
//
// export const authTicker = async () => {
//     const kiteAuth = await models.KiteAuth.findOne({
//         where: { zerodha_id: process.env.ZERODHA_ID as string },
//         order: [['createdAt', 'DESC']],
//     } as any);
//
//     if (kiteAuth && kiteAuth.access_token) {
//         kt = new KiteTicker({
//             api_key: process.env.KITE_API_KEY as string, // Cast it to string or the expected type
//             access_token: kiteAuth.access_token
//         });
//     }
//     return kt;
// };

export const inputTextIntoField = async (page:any, selector: string, text: string) => {
    await page.focus(selector);
    await page.keyboard.type(text, { delay: TYPING_DELAY });
    await delay(SHORT_DELAY);
};

// export const clickOnElement = async (page: Page, selector: string) => {
//     await page.evaluate((sel) => {
//         // @ts-ignore
//         console.log(sel)
//         // @ts-ignore
//         console.log(document.querySelector(sel))
//         // @ts-ignore
//         document.querySelector(sel)?.click();
//     }, selector);
// };
//
// export const clearInputField = async (page: Page, selector: string, delayTime: number) => {
//     await page.focus(selector);
//     await delay(delayTime);
//     await page.evaluate((sel) => {
//         // @ts-ignore
//         const element = document.querySelector<HTMLInputElement>(sel);
//         if (element) {
//             element.value = '';
//         }
//     }, selector);
//     await page.focus(selector); // Refocus after clearing if needed
// };
//
// export const setupNewPage = async (browser: Browser, width: number, height: number): Promise<Page> => {
//     const page = await browser.newPage();
//     await page.setViewport({ width, height, deviceScaleFactor: 1 });
//     return page;
// };
//
// export const logMessage = (message: string, data?: any) => {
//     // For now, just using console.log, but you can replace this with a more advanced logger in the future
//     if (data) {
//         console.log(`${message}:`, data);
//     } else {
//         console.log('\x1b[32m%s\x1b[0m', message)
//         // console.log(message);
//     }
// };
//
//
// export const tradingDays = async (numDays: number, days: any = [], counter: number = 0): Promise<any> => {
//     if (days.length === numDays) {
//         return days;
//     } else {
//         let day = dayjs().subtract(counter, 'day');
//         if (isTradingDay(day)) {
//             days.push(day);
//         }
//         counter = counter + 1;
//         return await tradingDays(numDays, days, counter);
//     }
// };
//
// export const latestTradingDay = async (): Promise<any> => {
//     const days = await tradingDays(1);
//     // console.log("days[3]", days[0].format('YYYY-MM-DD'));
//     return days[0];
//     // const days = await tradingDays(20);
//     // console.log("days[3]", days[3].format('YYYY-MM-DD'));
//     // return days[3];
// };
//
//
//
// type AsyncFunction<A extends any[], R = any> = (...args: A) => Promise<R>;
//
// export const withLogging = <A extends any[], R>(
//     errorTopic: string,
//     fn: AsyncFunction<A, R>
// ): AsyncFunction<A, R> => {
//     return async (...args: A): Promise<R> => {
//         logMessage(`Starting ${errorTopic}`);
//         console.time(`Time taken for ${errorTopic}`);
//         try {
//             const result = await fn(...args);
//             logMessage(`Successfully completed ${errorTopic}`);
//             console.timeEnd(`Time taken for ${errorTopic}`);
//             return result;
//         } catch (error) {
//             logMessage(`An error occurred in ${errorTopic}:`, error);
//             console.timeEnd(`Time taken for ${errorTopic}`);
//             throw error;
//         }
//     };
// };
//
// export const commonDatedFormat = (date: typeof dayjs = dayjs()): string => {
//     // return date.format('YYYY-MM-DD');
//     return date.format(dateFormatConstant);
// }
//
// export const latestDataStore = async (source: string): Promise<typeof models.DataStore | null> => {
//     const dataSource = await models.DataSource.findOne({ where: { name: source } });
//     if (dataSource === null) {
//         return null;
//     }
//     const latestDay = await latestTradingDay()
//     const dataStore = await models.DataStore.findOne({
//         where: {
//             dataSourceId: dataSource.id,
//             dated: commonDatedFormat(latestDay)
//         }
//     });
//     return dataStore;
// };
//
export const startCron = async (
    cronTime: string,
    cronFunc: () => Promise<void>
): Promise<void> => {
    cron.schedule(
        cronTime,
        async () => {
            try {
                await cronFunc();
            } catch (error: any) {
                console.log(`Error executing cron job: ${error.message}`);
                // logMessage(`Error executing cron job: ${error.message}`);
            }
        },
        {
            // scheduled: true,
            timezone: "Asia/Kolkata",
        }
    );
};
//
// export const latestOtp = async (): Promise<typeof models.LoginOtp | null> => {
//     const otp = await models.LoginOtp.findOne({
//         order: [['createdAt', 'DESC']],
//     } as any);
//
//     return otp;
// };
//
//
// export const context = Context.getInstance();
// export { dayjs };
// export { models };

