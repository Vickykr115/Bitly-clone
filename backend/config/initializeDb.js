const mongoose = require('mongoose');

async function initializeDbConnection() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error('Database connection string not provided (MONGODB_URI)');
    }

    // connect with recommended options
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB -> connected');
}

module.exports = initializeDbConnection;
