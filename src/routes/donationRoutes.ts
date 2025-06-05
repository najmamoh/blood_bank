import express from 'express'
import {
  createDonation,
  getAllDonations,
  getDonationById,
  updateDonation,
  deleteDonation
} from '../Controller/donationController'

const router = express.Router()

router.post('/', createDonation)
router.get('/', getAllDonations)
router.get('/:id', getDonationById)
router.put('/:id', updateDonation)
router.delete('/:id', deleteDonation)

export default router
