import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { crawl, lastCrawl } from './crawler'
import { shouldCrawl } from './helpers'
import trips from './trips'
import 'dotenv/config'

const app = new Hono()

app.get('/', (c) => {
  return c.json(lastCrawl)
})

app.route('/trips', trips)

setInterval(() => {
  if (process.env.DISABLE_CRAWLER) return
  if (shouldCrawl()) crawl()
}, 1000)

serve(app)
