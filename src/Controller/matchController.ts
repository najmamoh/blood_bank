import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { log } from 'node:console'


const prisma = new PrismaClient()

export const createMatch = async (req: Request, res: Response) => {
  try {
    const { donorId, recipientId, match_date, status } = req.body
    const match = await prisma.match.create({
      data: {
        donorId,
        recipientId,
        match_date: new Date(match_date),
        status
      }
    })
    res.status(201).json(match)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create match' })
    console.log(error);
    
  }
}

export const getAllMatches = async (_req: Request, res: Response) => {
  const matches = await prisma.match.findMany()
  res.json(matches)
}

export const getMatchById = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const match = await prisma.match.findUnique({ where: { id } })
  if (!match) { res.status(404).json({ error: 'Match not found' })
  res.json(match)
return}
}

export const updateMatch = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const { donorId, recipientId, match_date, status } = req.body
  try {
    const updated = await prisma.match.update({
      where: { id },
      data: {
        donorId,
        recipientId,
        match_date: new Date(match_date),
        status
      }
    })
    res.json(updated)
  } catch {
    res.status(404).json({ error: 'Match not found' })
  }
}

export const deleteMatch = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  try {
    await prisma.match.delete({ where: { id } })
    res.json({ message: 'Match deleted' })
  } catch {
    res.status(404).json({ error: 'Match not found' })
  }
}
