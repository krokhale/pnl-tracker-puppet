import tradingEngine from "@/lib/trading-engine/index.js";

export const init = async () => {
    await tradingEngine();
};

// init().then(() => {
//     console.log("Completed")
// })
