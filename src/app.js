const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('../models/user.js');

app.use(express.json());

app.get("/", async function(req, res) {
  let limit = parseInt(req.query.limit) || 5;
  let offset = parseInt(req.query.offset) || 0;
  let users = await User.find({}, '_id')
                        .skip(limit * offset)
                        .limit(limit);
  let ids = users.map(user => user._id);
  res.send(ids);
});

module.exports = app;
