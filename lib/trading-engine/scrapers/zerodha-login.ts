// import {
//     delay,
//     puppet,
//     inputTextIntoField,
//     clickOnElement,
//     setupNewPage,
//     clearInputField, logMessage, context
// } from '../utils';
// import { SHORT_DELAY, LONG_DELAY } from "../constants";
// import { Page } from "puppeteer";
//
// const totp = require("totp-generator");
//
//
// const {
//     KITE_API_KEY,
//     ZERODHA_ID,
//     ZERODHA_PASSWORD,
//     ZERODHA_TOTP_KEY,
//     KITE_TRADER_EMAIL,
//     KITE_TRADER_PASSWORD,
//     KITE_TRADER_URL,
//     KITE_TRADER_APP_URL
// } = context.getConfig([
//     'KITE_API_KEY',
//     'ZERODHA_ID',
//     'ZERODHA_PASSWORD',
//     'ZERODHA_TOTP_KEY',
//     'KITE_TRADER_EMAIL',
//     'KITE_TRADER_PASSWORD',
//     'KITE_TRADER_URL',
//     'KITE_TRADER_APP_URL'
// ]);
//
// const defaultUrl = `https://kite.trade/connect/login?v=3&api_key=${KITE_API_KEY}`;
//
// const navigateAndLoginKiteTrader = async (page: Page) => {
//     try {
//         await page.goto('https://developers.kite.trade/login');
//         await delay(SHORT_DELAY);
//
//         await inputTextIntoField(page, '#id_email', KITE_TRADER_EMAIL as string);
//         await inputTextIntoField(page, '#id_password', KITE_TRADER_PASSWORD as string);
//         await clickOnElement(page, 'input[type=submit]');
//
//         await delay(SHORT_DELAY);
//         await page.goto(KITE_TRADER_APP_URL as string); // consider handling this with a null check or default value instead of using ts-ignore
//
//         await clearInputField(page, '#id_redirect_url', SHORT_DELAY);
//         await inputTextIntoField(page, '#id_redirect_url', KITE_TRADER_URL as string);
//
//         await clickOnElement(page, 'input[type=submit]');
//         await delay(LONG_DELAY);
//
//         await page.close(); // Close the tab when done, to free resources
//     } catch (error) {
//         logMessage('Error in navigateAndLoginKiteTrader:', error)
//     }
// };
//
// const navigateAndLoginZerodha = async (page: Page) => {
//     try {
//         await page.goto(defaultUrl);
//         await delay(SHORT_DELAY);
//
//         await inputTextIntoField(page, '#userid', ZERODHA_ID as string);
//         await inputTextIntoField(page, '#password', ZERODHA_PASSWORD as string);
//
//         await clickOnElement(page, 'button[type=submit]');
//         await delay(SHORT_DELAY);
//
//         const otp = totp(ZERODHA_TOTP_KEY);
//         await page.keyboard.type(otp);
//
//         await clickOnElement(page, 'button[type=submit]');
//         await delay(LONG_DELAY);
//         await page.close(); // Close the tab when done, to free resources
//     } catch (error) {
//         logMessage('Error in navigateAndLoginZerodha:', error)
//     }
// };
//
// const main = async () => {
//     const browser = await puppet();
//
//     try {
//         const pageForKite = await setupNewPage(browser, 1920, 1080);
//         await navigateAndLoginKiteTrader(pageForKite);
//
//         const pageForZerodha = await setupNewPage(browser, 400, 500);
//         await navigateAndLoginZerodha(pageForZerodha);
//
//         await browser.close();
//     } catch (error) {
//         logMessage('An error occurred in main:', error)
//     }
// };
//
// export default main;
