import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


// CREATE
const prisma = new PrismaClient()

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key' // ku dar .env

// REGISTER
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, role, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: 'Email already exists' });
      return 
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        role,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error: any) {
    console.error('Registration Error:', error);
    res.status(500).json({ error: 'User registration failed' });
  }
};

// LOGIN
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
            console.log("User not found for email:", email);

       res.status(404).json({ error: 'User not found' });
   return }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
            console.log("Password mismatch for user:", email,password);

       res.status(401).json({ error: 'Invalid credentials' });
    return}

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ message: 'Login successful', token });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
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
  const id = Number(req.params.id);

  try {
    const { name, email, phone, role, password } = req.body;

    // Build update object
    const data: any = {
      name,
      email,
      phone,
      role,
    };

    // Only hash password if it's being updated
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      data.password = hashedPassword;
    }

    const updated = await prisma.user.update({
      where: { id },
      data,
    });

    res.json(updated);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Error updating user' });
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
