import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

export const createRecipient = async (req: Request, res: Response) => {
  try {
    const { userId, request_date, units_needed, status } = req.body;

    // Log data to confirm it's being received
    console.log('Incoming recipient data:', req.body);

    const recipient = await prisma.recipient.create({
      data: {
        userId,
        request_date: new Date(request_date),
        units_needed,
        status,
      },
    });

    res.status(201).json(recipient);
  } catch (error: any) {
    // Log the actual error for debugging
    console.error('Recipient creation error:', error);
    res.status(500).json({ error: 'Failed to create recipient', details: error.message });
  }
};


export const getAllRecipients = async (_req: Request, res: Response) => {
  const recipients = await prisma.recipient.findMany()
  res.json(recipients)
}

export const getRecipientById = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const recipient = await prisma.recipient.findUnique({ where: { id } })
  if (!recipient){
      res.status(404).json({ error: 'Recipient not found' })
return}  res.json(recipient)

}

export const updateRecipient = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const { userId, request_date, units_needed, status } = req.body
  try {
    const updated = await prisma.recipient.update({
      where: { id },
      data: {
        userId,
        request_date: new Date(request_date),
        units_needed,
        status
      }
    })
    res.json(updated)
  } catch {
    res.status(404).json({ error: 'Recipient not found' })
  }
}

export const deleteRecipient = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  try {
    await prisma.recipient.delete({ where: { id } })
    res.json({ message: 'Recipient deleted' })
  } catch {
    res.status(404).json({ error: 'Recipient not found' })
  }
}
