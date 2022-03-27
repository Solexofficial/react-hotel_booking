const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');
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

const PORT = process.env.PORT || config.get('port') || 8080;
app.use('/images', express.static(path.join(__dirname, 'images')));
if (process.env.NODE_ENV === 'production') {
  console.log('production');
  app.use('/', express.static(path.join(__dirname, 'client')));
  app.use('/images', express.static(path.join(__dirname, 'images')));

  const indexPath = path.join(__dirname, 'client', 'index.html');

  app.get('*', (req, res) => {
    res.sendFile(indexPath);
  });
}

async function start() {
  try {
    mongoose.connection.once('open', () => {
      initDatabase();
    });
    await mongoose.connect(
      'mongodb+srv://solexofficial:solexofficial123@cluster0.ijqvj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    );
    console.log(chalk.green('MongoDB connected.'));
    app.listen(PORT, () => console.log(chalk.green(`Server has been started on port ${PORT}...`)));
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }
}

start();
