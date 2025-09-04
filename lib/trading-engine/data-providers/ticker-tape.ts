// import tickerTapeLogin from "../../scrapers/ticker-tape-login";
// import tickerTapeIndicators from "../../scrapers/ticker-tape-indicators";
// import {latestDataStore, logMessage, context, puppet, setupNewPage} from "../../utils";
// import {DATA_SOURCES} from "../../constants";

import {startBrowser} from "@/lib/cluster.js";
import tickerTapeIndicators from "@/lib/trading-engine/scrapers/ticker-tape-indicators.js";
// import tickerTapeLogin from "@/lib/trading-engine/scrapers/ticker-tape-login.js";

const main = async () => {

    const {browser, page} = await startBrowser();
    await tickerTapeIndicators(page, browser)
    // await tickerTapeLogin(page, browser)

    // const dataStore = await latestDataStore(DATA_SOURCES[0]);
    // const isForced = context.getForceTask('DataProviders');
    // const contextState = context.getState()
    // if(!dataStore || isForced){
    //     const browserForTickerTapeLogin = contextState?.browserForTickerTapeLogin || await puppet();
    //     const pageForTickerTapeLogin = contextState?.pageForTickerTapeLogin || await setupNewPage(browserForTickerTapeLogin, 400, 500);
    //     context.setState({...contextState, browserForTickerTapeLogin, pageForTickerTapeLogin})
    //     if(!contextState?.pageForTickerTapeLogin){
    //         logMessage(`Page for ticker tape login not found, creating new page`)
    //         const {page, browser} = await tickerTapeLogin(pageForTickerTapeLogin, browserForTickerTapeLogin);
    //         await tickerTapeIndicators(page, browser)
    //     } else {
    //         logMessage(`Page for ticker tape login found, using existing page`)
    //         await tickerTapeIndicators(contextState?.pageForTickerTapeLogin, contextState?.browserForTickerTapeLogin)
    //     }
    //     // const {page, browser} = await tickerTapeLogin(pageForTickerTapeLogin, browserForTickerTapeLogin);
    //     // await tickerTapeIndicators(page, browser)
    // } else {
    //     logMessage(`Data already exists for today ${DATA_SOURCES[0]}, not running data provider`);
    // }
};

export default main;
