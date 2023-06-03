import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'

const app = new Hono()

app.use('*', poweredBy())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})


app.get('/ticket/:hash', async (c) => {
  const hash = c.req.param('hash')

  let value = await c.env.TICKET.get(hash);

  if (value === null) {
    // Return the value, as is, for the Response

    let value2 = await c.env.TICKET.put(hash, "0");
    return c.json({ message: "ticket created" }, 200);
  } else if (value === "0") {

    // Return the value, as is, for the Response


    return c.json({ message: "ticket already created" }, 500);

  } else {

    // Return the value, as is, for the Response
    return c.json({ message: "something is wrong" }, 500);
  }

})


app.get('/enter/:hash', async (c) => {
  const hash = c.req.param('hash')

  let value = await c.env.TICKET.get(hash);

  if (value === "0") {
    // Return the value, as is, for the Response

    let value2 = await c.env.TICKET.put(hash, "1");
    return c.json({ message: "enter the concert" }, 200);
  } else {

    // Return the value, as is, for the Response
    return c.json({ message: "You can't enter the concert" }, 500);
  }


})

export default app
