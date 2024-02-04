import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash)
}

export const hashPassword = (password) => {
  const hashedPassword = bcrypt.hash(password, Number(process.env.BCRYPT_SALT))
  return hashedPassword
}

export const createJWT = (user) => {
  const token = jwt.sign({
    id: user.id, 
    username: user.username
  }, process.env.JWT_SALT);

  return token
}

const resNotAuthorized = (res) => {
  res.status(401).json({message: "User not authorized"})
}

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization

  if(!bearer){
    resNotAuthorized(res)
    return
  }

  const [, token] = bearer.split(' ');
  if(!token){
    resNotAuthorized(res)
    return
  }

  try{
    const user = jwt.verify(token, process.env.JWT_SALT);
    req.user = user;
    next()
  } catch(err){
    console.log(err)

    res.status(400).json({message: "Invalid token"})
    return
  }
  
}