import prisma from "../modules/db"

export const getTodos = async(req, res) => {
  
  const todos = await prisma.task.findMany({
    where: {
      userId: req.user.id
    }
  })

  res.json({data: todos})
}

export const createTodo = async(req, res) => {
  const todo = await prisma.task.create({
    data: {
      title: req.body.title,
      description: req.body.description,
      userId: req.user.id
    }
  })

  res.json({data: todo})
}

export const updateTodo = async(req, res) => {
  const updated = await prisma.task.update({
    where: {
      id: req.params.id
    }, 
    data: {
      title: req.body.title,
      description: req.body.description
    }
  })

  res.json({data: updated})
}

export const deleteTodo = async(req, res) => {
  const deletedTodo = await prisma.task.delete({
    where: {
      id: req.params.id
    }
  })

  res.json({data: deletedTodo})
}
