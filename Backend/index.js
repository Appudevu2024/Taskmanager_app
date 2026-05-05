const express=require('express')
const mongoose=require('mongoose')
const app=express();
const dotenv=require('dotenv')
const authRoutes=require('./routes/auth')
const todoRoutes=require('./routes/todos')
const cors=require('cors');

dotenv.config();
app.use(express.json());
app.use(cors());



const PORT= process.env.PORT || 3005;


mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log('MongoDB connected'))
.catch(err=>console.error('MongoDB connection error',err));

app.use('/api/auth',authRoutes)
app.use('/api/todos',todoRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on the http://localhost:${PORT}`)
})