// src/browser.ts
import puppeteer, { Browser, Page } from "puppeteer";

let browser: Browser | null = null;
let page: Page | null = null;

export async function startBrowser() {
    if (browser) return { browser, page: page! };

    browser = await puppeteer.launch({
        headless: false, // must be false to see it over VNC
        // executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || "/usr/bin/chromium",
        // userDataDir: "/usr/src/app/chrome-profile",
        defaultViewport: null, // use real window size
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--window-size=1920,1080",
            "--window-position=0,0",

            // keep work running when tab/window not focused or minimized
            '--disable-background-timer-throttling',
            '--disable-renderer-backgrounding',
            '--disable-backgrounding-occluded-windows',
            // Windows-specific occlusion detector:
            '--disable-features=CalculateNativeWinOcclusion',

            // "--no-sandbox",
            // "--disable-setuid-sandbox",
            // "--disable-dev-shm-usage",
            // "--window-size=1920,1080",
            // "--window-position=0,0",
            // "--start-maximized",
            // "--mute-audio",
            // "--disable-extensions",
            // "--disable-background-networking",
            // "--disable-sync",
        ],
    });

    page = await browser.newPage();
    await page.goto("https://www.tickertape.in", { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.bringToFront();

    return { browser, page };
}

export function getPage() {
    return page;
}

export async function stopBrowser() {
    if (browser) {
        await browser.close();
        browser = null;
        page = null;
    }
}




// // const { Cluster } = require('puppeteer-cluster');
// import {Cluster} from "puppeteer-cluster"
//
// let cluster: any = null;
//
//
// export async function initializeCluster() {
//     if (!cluster) {
//         cluster = await Cluster.launch({
//             concurrency: Cluster.CONCURRENCY_PAGE,
//             maxConcurrency: 2, // Adjust based on your resources
//         // /usr/bin/chromium-browser
//             puppeteerOptions: {
//                 headless: false,
//                 args: [
//                     // '--no-sandbox',
//                     // '--disable-setuid-sandbox',
//                     // '--disable-web-security',
//
//                     // '--disable-gpu',
//
//                     '--disable-dev-shm-usage',
//                     '--window-size=1920,1080',
//
//                     '--no-sandbox',
//                     '--headless=new',
//                     // '--font-render-hinting=none',
//                     // '--enable-features=NetworkService,NetworkServiceInProcess',
//                     // '--force-color-profile=srgb',
//                     '--disable-setuid-sandbox',
//                     // '--enable-webgl',           // Enables WebGL for better rendering
//                     // '--use-gl=egl',             // Forces the use of OpenGL for rendering
//                     // '--enable-gpu-rasterization', // Offload rasterization to the GPU
//                     // '--enable-zero-copy',       // Reduces memory usage by allowing direct GPU access
//                     // '--disable-software-rasterizer', // Ensures GPU is used instead of software rendering
//                     // '--window-size=1920,1080',  //
//                     // '--disable-dev-shm-usage',
//                     // '--no-zygote',
//                     // '--hide-scrollbars',
//                     // '--single-process',
//                     // '--no-first-run',
//                     // '--export-tagged-pdf',
//
//
//                     '--mute-audio',
//                     '--disable-extensions',
//                     '--disable-background-networking',
//                     '--disable-sync',
//                     '--disable-web-security',
//                     // '--disable-features=Translate,BackForwardCache,AcceptCHFrame,MediaRouter,OptimizationHints,AudioServiceOutOfProcess,IsolateOrigins,site-per-process',
//
//                 ],
//                 // defaultViewport: {
//                 //     width: 1920,
//                 //     height: 1080, // Match window size for rendering consistency
//                 // },
//             },
//         });
//
//         console.log('Puppeteer Cluster Initialized');
//
//         await cluster.execute(async ({ page }: any) => {
//             await page.emulateMediaType('screen');
//             console.time("waiting for page to load");
//             await page.goto("https://www.cnn.com", {waitUntil: 'networkidle2'});
//         })
//         // await cluster.task(async ({ page, data: url }: any) => {
//         //     await page.goto(url, { waitUntil: "domcontentloaded" });
//         // });
//         //
//         // // Queue CNN as the first job
//         // cluster.queue("https://www.cnn.com");
//     }
//     return cluster;
// }
//
// async function closeCluster() {
//     if (cluster) {
//         await cluster.idle();
//         await cluster.close();
//         console.log('Puppeteer Cluster Closed');
//     }
// }
//
// export async function getCluster() {
//     if (!cluster) {
//         await initializeCluster();
//     }
//     return cluster;
// }
//
