// // import {
// //     delay,
// //     puppet,
// //     inputTextIntoField,
// //     clickOnElement,
// //     setupNewPage, withLogging,
// //     context, latestOtp
// // } from '../utils';
// // import {EXTRA_LONG_DELAY, LONG_DELAY, MINUTE_LONG_DELAY, SHORT_DELAY, TWO_MINUTE_LONG_DELAY} from "../constants";
// import {Browser, Page} from "puppeteer-core";
// import {delay, inputTextIntoField} from "@/lib/utils.js";
// import {LONG_DELAY, MINUTE_LONG_DELAY, SHORT_DELAY} from "@/lib/constants.js";
//
// // const totp = require("totp-generator");
// // const {
// //     ZERODHA_ID,
// //     ZERODHA_PASSWORD,
// //     ZERODHA_TOTP_KEY,
// //     MOBILE_NUMBER_LOGIN,
// // } = context.getConfig([
// //     'ZERODHA_ID',
// //     'ZERODHA_PASSWORD',
// //     'ZERODHA_TOTP_KEY',
// //     'MOBILE_NUMBER_LOGIN'
// // ])
//
//
// const navigateAndLoginTickerTape = async (page: Page, browser: Browser) => {
//     await page.goto('https://www.tickertape.in/login', { waitUntil: 'networkidle2' });
//     await delay(SHORT_DELAY);
//
//     await inputTextIntoField(page, '#phoneNumber', "8983505121" as string);
//     // await clickOnElement(page, '.button-root.primary');
//     // await clickOnElement(page, '.button-root');
//     // await clickOnElement(page, 'button');
//     // await page.focus('.button-root');
//     // await page.click('.button-root');
//     // await delay(SHORT_DELAY);
//     // await page.focus('button');
//     // await page.click('button');
//     // const rect = await page.evaluate(selector => {
//     //     const element = document.querySelector(selector);
//     //     const {x, y} = element.getBoundingClientRect();
//     //     return {x, y};
//     // }, 'button');
//
//     // await page.mouse.click(rect.x, rect.y);
//     // await delay(TWO_MINUTE_LONG_DELAY);
//     await delay(MINUTE_LONG_DELAY);
//     // await delay(EXTRA_LONG_DELAY);
//
//     const otp = await latestOtp()
//     const [digit1, digit2, digit3, digit4] = otp.otp.split('')
//     console.log('otp', digit1, digit2, digit3, digit4)
//
//     await inputTextIntoField(page, '[aria-label="Please enter verification code. Digit 1"]', digit1);
//     await delay(EXTRA_LONG_DELAY);
//     await inputTextIntoField(page, '[aria-label="Digit 2"]', digit2);
//     await delay(EXTRA_LONG_DELAY);
//     await inputTextIntoField(page, '[aria-label="Digit 3"]', digit3);
//     await delay(EXTRA_LONG_DELAY);
//     await inputTextIntoField(page, '[aria-label="Digit 4"]', digit4);
//     await delay(EXTRA_LONG_DELAY);
//
//     // await page.evaluate(() => {
//     //     // @ts-ignore
//     //     const buttons = document.querySelectorAll('button')
//     //     // @ts-ignore
//     //     Array.from(buttons).find((button) => button.innerText === 'Zerodha')?.click()
//     // });
//     // await delay(LONG_DELAY);
//     //
//     // const elementHandle = await page.$('.scdk-middle-frame');
//     // const frame = await elementHandle?.contentFrame();
//     //
//     // const kitePageLoginPromise = new Promise(((resolve, reject) => {
//     //     browser.once('targetcreated', async function (target) {
//     //         const p = await target.page()
//     //         resolve(p)
//     //     });
//     // }))
//     //
//     // await delay(LONG_DELAY);
//     //
//     // await frame?.evaluate(() => {
//     //     // @ts-ignore
//     //     document.querySelector('#click-to-continue').click()
//     // });
//     //
//     // const kitePageLogin = await kitePageLoginPromise as Page;
//     // await kitePageLogin.bringToFront()
//     // await kitePageLogin.waitForTimeout(LONG_DELAY);
//     // await inputTextIntoField(kitePageLogin, '#userid', ZERODHA_ID as string);
//     // await inputTextIntoField(kitePageLogin, '#password', ZERODHA_PASSWORD as string);
//     // await clickOnElement(kitePageLogin, 'button[type=submit]');
//     // await kitePageLogin.waitForTimeout(LONG_DELAY);
//     // const otp = totp(ZERODHA_TOTP_KEY)
//     // await inputTextIntoField(kitePageLogin, 'input', otp);
//     // await delay(LONG_DELAY);
//     // await page.bringToFront()
//     await delay(LONG_DELAY);
//
//     return page
// };
//
//
// const main = async (pageForTickerTapeLogin: Page, browser: Browser) => {
//     // const browser = await puppet();
//     // const pageForTickerTapeLogin = await setupNewPage(browser, 400, 500);
//     const page = await withLogging('navigateAndLoginTickerTape', navigateAndLoginTickerTape)(pageForTickerTapeLogin, browser);
//     return {page, browser}
//
// };
//
//
// export default main;
