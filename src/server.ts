import express from 'express';  
import cors from 'cors'
import { protect } from './modules/auth';
import router from './router';
import { createNewUser, signinUser } from './handlers/user';
const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.status(200)
  res.json({message: 'hey there!'})
})

//protected routes
app.use('/api', protect, router)

//unprotected routes
app.post('/user', createNewUser)
app.get('/signin', signinUser)

export default app;