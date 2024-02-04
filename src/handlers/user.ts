import { comparePassword, createJWT, hashPassword } from "../modules/auth"
import prisma from "../modules/db"

export const createNewUser = async (req, res) => {  
  console.log('req body - ', req.body)

  try{
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
        name: req.body.name
      }
    })

    console.log('user created is: ', user);

    const token = await createJWT(user)

    res.status(200).json({token})

  } catch (e){
    console.log(e);
    res.status(400).json({message: 'Username already exists!'})
  }
  
}

export const signinUser = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username
    }
  })

  if(!user){
    res.status(400).json({message: 'User not found'})
    return 
  }

  const passwordMatched = comparePassword(req.body.password, user.password);

  if(!passwordMatched) {
    res.status(400).json({message: 'Password mismatch'})
    return
  }

  const token = await createJWT(user) 
  res.status(200).json({token});
}