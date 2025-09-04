import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import {startBrowser} from "../lib/cluster.js";
import {init} from "../lib/init.js";



const app = new Hono()

app.get('/', async (c) => {
    // const cluster = await getCluster();
  // return c.text('Hello Hono!')
})

serve({
  fetch: app.fetch,
  port: process.env.PORT ? Number(process.env.PORT) : 3000
}, (info) => {
    // startBrowser()
    init()
  console.log(`Server is running on http://localhost:${info.port}`)
})

// vnc://127.0.0.1:5905
// -v $(pwd)/chrome-profile:/usr/src/app/chrome-profile \

// docker build -t puppeteer-app:latest .
//
// docker run --rm -it \
//   -e VNC_PASSWORD='supersecret' \
//   -e VNC_PORT=5905 \
//   -p 3000:3000 -p 5905:5905 \
//   puppeteer-app:latest
