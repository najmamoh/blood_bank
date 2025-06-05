import express from 'express'
import userRoutes from './routes/userRoutes'
import RecipientRoutes from './routes/recipientRoutes'
import MatchRoutes from './routes/matchRoutes'
import DonationRoutes from './routes/donationRoutes'
import BloodInventoryRoutes from './routes/bloodInventoryRoutes'

const app = express()

app.use(express.json())
app.use('/api/users', userRoutes)  
app.use('/api/recipent', RecipientRoutes)  
app.use('/api/matches', MatchRoutes)  
app.use('/api/donation', DonationRoutes)  
app.use('/api/blood', BloodInventoryRoutes)  

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
