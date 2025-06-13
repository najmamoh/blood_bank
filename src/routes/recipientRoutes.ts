import express from 'express'
import {
  createRecipient,
  getAllRecipients,
  getRecipientById,
  updateRecipient,
  deleteRecipient
} from '../Controller/recipientController'
import { authenticate } from '../Auth/authMiddleware'; // adjust path as needed

const router = express.Router()

router.post('/', authenticate,createRecipient)
router.get('/',authenticate, getAllRecipients)
router.get('/:id', authenticate,getRecipientById)
router.put('/:id',authenticate, updateRecipient)
router.delete('/:id',authenticate, deleteRecipient)

export default router
