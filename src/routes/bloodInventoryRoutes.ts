import express from 'express'
import {
  createInventory,
  getAllInventories,
  getInventoryById,
  updateInventory,
  deleteInventory
} from '../Controller/bloodInventoryContrr'

const router = express.Router()

router.post('/', createInventory)
router.get('/', getAllInventories)
router.get('/:id', getInventoryById)
router.put('/:id', updateInventory)
router.delete('/:id', deleteInventory)

export default router
