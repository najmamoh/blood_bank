import express from 'express'
import {
  createRecipient,
  getAllRecipients,
  getRecipientById,
  updateRecipient,
  deleteRecipient
} from '../Controller/recipientController'

const router = express.Router()

router.post('/', createRecipient)
router.get('/', getAllRecipients)
router.get('/:id', getRecipientById)
router.put('/:id', updateRecipient)
router.delete('/:id', deleteRecipient)

export default router
