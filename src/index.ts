import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { lastCrawl } from './crawler'
import trips from './trips'
import { crawlScheduler } from './helpers'

const app = new Hono()

app.get('/', (c) => c.json(lastCrawl))
app.route('/trips', trips)

setInterval(() => crawlScheduler, 1000)

serve(app)
