import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

// CREATE
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, role } = req.body;

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        role,

      },
    });

    res.status(201).json(user);
  }catch (error: any) {
    console.error('Error details:', error);
    res.status(500).json({ error: error.message || 'User creation failed' });
  }
  
};

// GET ALL
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {

        donations :true,
    recipient :true, 
    matchesAsDonor  :true ,  
    matchesAsRecipient :true
        }
    })
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
};

// GET BY ID
export const getUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  try {
    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' })
  }
};

// UPDATE
export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  try {
    const updated = await prisma.user.update({
      where: { id },
      data: req.body,
    })
    res.json(updated)
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' })
  }
};

// DELETE
export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  try {
    const deleted = await prisma.user.delete({ where: { id } })
    res.json(deleted)
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' })
  }
};
