const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');
const chalk = require('chalk');
const dotenv = require('dotenv');
const initDatabase = require('./start/initDatabase');
const routes = require('./routes');

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/api', routes);

const PORT = config.get('port') ?? 8080;

async function start() {
  try {
    mongoose.connection.once('open', () => {
      initDatabase();
    });
    await mongoose.connect(process.env.MONGO_URI);
    console.log(chalk.green('MongoDB connected.'));
    app.listen(PORT, () => console.log(chalk.green(`Server has been started on port ${PORT}...`)));
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }
}

start();
