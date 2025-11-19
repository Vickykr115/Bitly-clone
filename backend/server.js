const app = require('./app');
const connectDB = require('./config/initializeDb');
const port = process.env.PORT || 4000;


connectDB().then(() => {
app.listen(port, () => {
console.log(`Server running on port ${port}`);
});
}).catch(err => {
console.error('Failed to start server', err);
process.exit(1);
});
