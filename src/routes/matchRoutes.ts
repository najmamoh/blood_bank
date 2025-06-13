import express from 'express'
import {
  createMatch,
  getAllMatches,
  getMatchById,
  updateMatch,
  deleteMatch
} from '../Controller/matchController'
import { authenticate } from '../Auth/authMiddleware'; 

const router = express.Router()

router.post('/', authenticate,createMatch)
router.get('/',authenticate, getAllMatches)
router.get('/:id',authenticate, getMatchById)
router.put('/:id',authenticate, updateMatch)
router.delete('/:id',authenticate, deleteMatch)

export default router
