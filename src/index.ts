import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { shouldCrawl, crawl } from './crawler'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

setInterval(() => {
  if (shouldCrawl()) crawl()
}, 1000)

serve(app)
