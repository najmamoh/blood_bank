import express from 'express'
import {
  createInventory,
  getAllInventories,
  getInventoryById,
  updateInventory,
  deleteInventory
} from '../Controller/bloodInventoryContrr'
import { authenticate } from '../Auth/authMiddleware'; 

const router = express.Router()

router.post('/',authenticate, createInventory)
router.get('/',authenticate, getAllInventories)
router.get('/:id', authenticate,getInventoryById)
router.put('/:id',authenticate, updateInventory)
router.delete('/:id', authenticate,deleteInventory)

export default router
