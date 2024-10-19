import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { crawl, lastCrawl } from './crawler'
import { shouldCrawl } from './helpers'

const app = new Hono()

app.get('/', (c) => {
  return c.json(lastCrawl)
})

setInterval(() => {
  if (shouldCrawl()) crawl()
}, 1000)

serve(app)
