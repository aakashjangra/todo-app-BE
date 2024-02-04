import * as dotenv from 'dotenv'
dotenv.config()

import app from './server'

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is listening on http://localhost:${PORT}`)
})

console.log('hello')