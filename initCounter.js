const mongoose = require('mongoose');
const Counter = require('./models/counter'); // Ensure the correct path to the Counter model
const db = 'mongodb://127.0.0.1:27017/writers'; // Your MongoDB URI

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected');

    // Check if the counter exists
    const counter = await Counter.findOne({ name: 'orderId' });
    if (!counter) {
      // If the counter does not exist, create it
      const newCounter = new Counter({ name: 'orderId', seq: 100000 });
      await newCounter.save();
      console.log('Counter initialized');
    } else {
      // If the counter exists, update the seq value to 100000
      counter.seq = 100000;
      await counter.save();
      console.log('Counter updated');
    }

    mongoose.connection.close();
  })
  .catch(err => console.log(err));
