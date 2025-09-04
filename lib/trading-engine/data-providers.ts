import tickerTape from "@/lib/trading-engine/data-providers/ticker-tape.js";

export const DataProviders = {
    tickerTape: async (): Promise<void> => {
        await tickerTape();
    },
    main: async (): Promise<void> => {
        await DataProviders.tickerTape();
    }
};
