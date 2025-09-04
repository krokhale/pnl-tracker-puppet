// import {LoginPrep} from './login-prep';
// import {DataPrep} from './data-prep';
// import {DataProviders} from './data-providers';
// import {CohortProcessor} from './cohort-processor';
// import {Trader} from './trader';
// import {SocketPrep} from './day-trading/socket-prep';
// import {context, startCron } from "../utils";
// import {CRON_TIMES} from "../constants";
// import sync from "./sync";
// import syncDataStores from "./misc/sync-data-stores";
// import {HistoryPrep} from "./history-prep";
// import {gapUp} from "./day-trading/strategies/gap-up";
// console.log(`http://localhost:3005/tickertape/otp?otp=1234`)
// import {sendEmail} from "./mailer"

import {DataProviders} from "@/lib/trading-engine/data-providers.js";

const main = async () => {
    // context.updateForceTasks({DataProviders: true});
    // const { PLACE_ORDERS } = context.getConfig(['PLACE_ORDERS']);
    // await startCron(CRON_TIMES.LOGIN_PREP_CLONE, LoginPrep.main);
    // await startCron(CRON_TIMES.SOCKET_PREP, SocketPrep.main);


    // await startCron(CRON_TIMES.LOGIN_PREP, LoginPrep.main);
    // await startCron(CRON_TIMES.DATA_PREP, DataPrep.main);
    // await startCron(CRON_TIMES.HISTORY_PREP, HistoryPrep.main);
    // await startCron(CRON_TIMES.DATA_PROVIDERS, DataProviders.main);
    // await startCron(CRON_TIMES.COHORT_PROCESSOR, CohortProcessor.main);
    // await startCron(CRON_TIMES.TRADER_SELL, Trader.sell);
    // await startCron(CRON_TIMES.TRADER_BUY, Trader.buy);



    // await startCron(CRON_TIMES.SELECTED_ITEMS_LOG, async () => {
    //     await sync()
    //     console.log(await Trader.pickInstruments('top-one-from-top-five'))
    // });

    // await SocketPrep.main();


    // if(PLACE_ORDERS === 'no'){
    //     await LoginPrep.main();
    //     await DataPrep.main();
        // await HistoryPrep.main();
        await DataProviders.main();
    //
    // console.log(await Trader.pickInstruments('top-one-from-top-five'))
    // console.log(await Trader.pickInstruments('top-pnl-diff-top-one-from-top-five'))
    // console.log(await Trader.pickInstruments('top-three-from-top-five'))

        // await CohortProcessor.main();
    //     await syncDataStores();
    //     await sync()
    //     console.log(await Trader.pickInstruments('top-one-from-top-five'))
    //     await Trader.main();
    //     await Trader.sell();
    //     await Trader.buy();
    // }

    // await gapUp.initializeSocket();
    // await SocketPrep.main()



};

export default main;
