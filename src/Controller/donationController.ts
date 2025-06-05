import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

export const createDonation = async (req: Request, res: Response) => {
  try {
    const { donorId, date, units } = req.body
    const donation = await prisma.donation.create({
      data: { donorId, date: new Date(date), units },
    })
    res.status(201).json(donation)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create donation' })
  }
}

export const getAllDonations = async (_req: Request, res: Response) => {
  const donations = await prisma.donation.findMany()
  res.json(donations)
}

export const getDonationById = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const donation = await prisma.donation.findUnique({ where: { id } })
  if (!donation){  res.status(404).json({ error: 'Donation not found' })
  res.json(donation)
return
}
}

export const updateDonation = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const { donorId, date, units } = req.body
  try {
    const updated = await prisma.donation.update({
      where: { id },
      data: { donorId, date: new Date(date), units }
    })
    res.json(updated)
  } catch {
    res.status(404).json({ error: 'Donation not found' })
  }
}

export const deleteDonation = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  try {
    await prisma.donation.delete({ where: { id } })
    res.json({ message: 'Donation deleted' })
  } catch {
    res.status(404).json({ error: 'Donation not found' })
  }
}
