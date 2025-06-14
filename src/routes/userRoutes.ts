import { Router } from 'express'
import {
  createUser,
  loginUser ,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../Controller/UserController'

const router = Router()

router.post('/', createUser)          
router.get('/', getUsers)             
router.get('/:id', getUserById)       
router.put('/:id', updateUser)        
router.delete('/:id', deleteUser)      
router.post('/login', loginUser)

export default router
