const express = require("express");

const  bodyParser = require('body-parser')

const mongoose = require("mongoose");

const cors = require("cors");

const errorHandler = require('./middlewares/errorHandler')

const authRoutes = require("./routes/auth")

const productRoutes = require('./routes/products')

const app = express();

const port = process.env.port || 2000;

require("dotenv").config();

app.use(cors());

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Health
app.get('/', (req, res) => res.json({ status: 'success', message: 'API up' }));

// Error handler (last)
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Database connected");

    app.listen(port, () => {
      console.log(`server is running on PORT ${port}`);
    });
  } catch (err) {
    console.error(err);
    console.log("unable to connect");
  }
};

start();

// i44ELgkR5B8pnWKa
// andrewmjr2_db_user
// mongodb+srv://andrewmjr2_db_user:i44ELgkR5B8pnWKa@cluster0.z2ram7o.mongodb.net/?appName=Cluster0
