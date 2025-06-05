import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

export const createInventory = async (req: Request, res: Response) => {
  try {
    const { blood_type, units_available, last_updated, location } = req.body
    const inventory = await prisma.bloodInventory.create({
      data: {
        blood_type,
        units_available,
        last_updated: new Date(last_updated),
        location
      }
    })
    res.status(201).json(inventory)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create blood inventory' })
    console.log(error);
    
  }
}

export const getAllInventories = async (_req: Request, res: Response) => {
  const inventories = await prisma.bloodInventory.findMany()
  res.json(inventories)
}

export const getInventoryById = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const inventory = await prisma.bloodInventory.findUnique({ where: { id } })
  if (!inventory) { res.status(404).json({ error: 'Inventory not found' })
  res.json(inventory)
return}
}

export const updateInventory = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const { blood_type, units_available, last_updated, location } = req.body
  try {
    const updated = await prisma.bloodInventory.update({
      where: { id },
      data: {
        blood_type,
        units_available,
        last_updated: new Date(last_updated),
        location
      }
    })
    res.json(updated)
  } catch {
    res.status(404).json({ error: 'Inventory not found' })
  }
}

export const deleteInventory = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  try {
    await prisma.bloodInventory.delete({ where: { id } })
    res.json({ message: 'Inventory deleted' })
  } catch {
    res.status(404).json({ error: 'Inventory not found' })
  }
}
