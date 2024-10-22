import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { crawl, lastCrawl } from './crawler'
import trips from './trips'
import { shouldCrawl } from './helpers'

const app = new Hono()

app.get('/', (c) => c.json(lastCrawl))
app.route('/trips', trips)

setInterval(() => {
  if (shouldCrawl()) crawl()
}, 1000)

serve(app)
