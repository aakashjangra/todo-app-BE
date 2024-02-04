import { Router } from "express";
import { createTodo, deleteTodo, getTodos, updateTodo } from "./handlers/todo";

const router = Router();

router.get('/todos', getTodos);

router.post('/todo', createTodo)

router.put('/todo/:id', updateTodo)

router.delete('/todo/:id', deleteTodo)

export default router