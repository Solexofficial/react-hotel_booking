const express = require('express');

const express = express();

express.use(express.json());
express.use(express.urlencoded({ extended: false }));
