// @ts-nocheck
// const {Op} = require('sequelize')
// import {
//     delay, withLogging, latestTradingDay, models, commonDatedFormat, logMessage, context,
// } from '../utils';
// import {DATA_SOURCES, EXTRA_LONG_DELAY, MINUTE_LONG_DELAY} from "../constants";
// import {Browser, Page} from "puppeteer";
import {delay, startCron} from "@/lib/utils.js";
import {EXTRA_LONG_DELAY, MINUTE_LONG_DELAY} from "@/lib/constants.js";
import fs from "node:fs/promises";
import path from "node:path";

// export const createItems = async (items) => {
//     const latestDay = await latestTradingDay()
//
//     const instruments = await models.Instrument.findAll({})
//
//     for(const [index, item] of items.entries()){
//         const instrumentBySymbol = instruments.find(instrument => (instrument.tradingsymbol === item.tradingsymbol) || (instrument.tradingsymbol === item.name))
//         const instrumentByName = instruments.find(instrument => (instrument.name === item.tradingsymbol) || (instrument.name === item.name))
//
//         if(instrumentByName || instrumentBySymbol){
//             if(instrumentBySymbol){
//                 items[index]['instrument_token'] = Number(instrumentBySymbol.instrument_token)
//             }
//             if(instrumentByName){
//                 items[index]['instrument_token'] = Number(instrumentByName.instrument_token)
//             }
//         }
//     }
//
//     const dataSource = await models.DataSource.findOne({where: {name: DATA_SOURCES[0]}})
//     const dataStore = await models.DataStore.findOne({where: {dataSourceId: dataSource.id, dated: commonDatedFormat(latestDay)}})
//     if(dataStore){
//         await models.DataStore.destroy({where: {id: dataStore.id}})
//     }
//     await models.DataStore.create({
//         dataSourceId: dataSource.id,
//         dated: commonDatedFormat(latestDay),
//         data: items
//     })
//     logMessage(`DataStore completed`)
// };
//

export const storeItems = async (items: any) => {
    if (!Array.isArray(items)) {
        console.error("storeItems: expected array, got:", items);
        return;
    }
    const dumpsDir = path.resolve(process.cwd(), "dumps");
    await fs.mkdir(dumpsDir, { recursive: true });
    const filePath = path.join(dumpsDir, `${Date.now()}.json`);
    await fs.writeFile(filePath, JSON.stringify(items, null, 2), "utf8");
    console.log(`✅ Stored ${items.length} items -> ${filePath}`);
};

// // @ts-ignore
export const tickerTapeScrapeTable = async (page, storeItems) => {
    const finals = await page.evaluate(async () => {
        // @ts-ignore
        let titles = Array.from(document.getElementById('screener-table').children[1].children[0].children[0].children)
        let finalTitles = []
        titles.map((title, idx) => {
            // @ts-ignore
            title.innerText.trim().length>0 && finalTitles.push(title.innerText.trim())
        })
        finalTitles[0] = 'Name'

        for(const num of [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]){
            // @ts-ignore
            const button = document.querySelector('.table-loadmore-container button')
            button?.click()
            await new Promise(resolve => setTimeout(resolve, 2000));
            // @ts-ignore
            document.querySelector('#screener-table').scrollTop = document.querySelector('#screener-table').scrollHeight
            await new Promise(resolve => setTimeout(resolve, 2000));
            // @ts-ignore
            document.querySelector('#screener-table').scrollTop = document.querySelector('#screener-table').scrollHeight
            await new Promise(resolve => setTimeout(resolve, 2000));
        }

        // @ts-ignore
        let columns = Array.from(document.getElementById('screener-table').children[1].children[1].children)


        // let count = 0
        const finals = []
        for(const div of columns){
            const indicatorChildren = Array.from(div.children)
            const finalItem = {}
            for (const [index, indicatorChild] of indicatorChildren.entries()) {
                if(index>0){
                    if(index === 1){
                        const symbol = indicatorChild.children[0].getAttribute('data-row').trim()
                        const name = indicatorChild.innerText.trim()

                        if(symbol.length>0){
                            finalItem['name'] = name
                            finalItem['tradingsymbol'] = symbol
                        }
                    } else {
                        const indicatorChildText = indicatorChild.innerText.trim()
                        const colTitle = finalTitles[index-1]
                        if(indicatorChildText && colTitle){
                            finalItem[colTitle] = indicatorChildText
                        }
                    }
                    console.log("finalItem", finalItem)
                    console.log("index", index)
                }
            }
            finals.push(finalItem)
        }

        console.log("finals", finals)
        return finals;

        // await createItems(finals)
        // await storeItems(finals)
        // return true;
    });
    return finals;

    // await page.goto('https://www.google.com', {waitUntil: 'networkidle2', timeout: 60000});
};


const navigateAndScrapeTickerTape = async (page, browser) => {
    // const contextState = context.getState()
    await page.goto('https://www.tickertape.in/screener/equity/user/Y44D9H6TbpcYjpGh', {waitUntil: 'networkidle2'});
    await delay(EXTRA_LONG_DELAY)
    // await delay(EXTRA_LONG_DELAY)
    // await delay(MINUTE_LONG_DELAY)
    // await delay(MINUTE_LONG_DELAY)
    // await page.exposeFunction("createItems", createItems);
    await page.exposeFunction("storeItems", storeItems);
    await page.exposeFunction("tickerTapeScrapeTable", tickerTapeScrapeTable);
    // if (!contextState?.functionsExposed) {
    //     await page.exposeFunction("createItems", createItems);
    //     await page.exposeFunction("tickerTapeScrapeTable", tickerTapeScrapeTable);
    //     context.setState({...contextState, functionsExposed: true});
    // }
    // await tickerTapeScrapeTable(page, createItems)
    // await tickerTapeScrapeTable(page, storeItems)
    const finals = await tickerTapeScrapeTable(page); // ⬅️ get data from page
    await storeItems(finals);
    // await delay(EXTRA_LONG_DELAY)
    await page.goto('https://www.google.com', {waitUntil: 'networkidle2', timeout: 60000});
};


const main = async (page?: Page, browser?: Browser) => {
    await delay(MINUTE_LONG_DELAY)
    // await delay(MINUTE_LONG_DELAY)
    // await delay(MINUTE_LONG_DELAY)
    startCron('0 8 * * *', () => navigateAndScrapeTickerTape(page, browser));
    // await navigateAndScrapeTickerTape(page, browser);
    // await withLogging('navigateAndScrapeTickerTape', navigateAndScrapeTickerTape)(page, browser);
    // browser && await browser.close();
};


export default main;
