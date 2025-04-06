const express = require('express');
const mongoose = require('mongoose');
const playerRouter = require('./routes/playerRoutes');

const app = express();

const cors = require('cors');
app.use(cors());

app.use("/", playerRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const queryString = process.env.MONGODB_URI || "mongodb+srv://dobalam:dobalam-it4409@lamdb-it4409.ybiwz.mongodb.net/College?retryWrites=true&w=majority&appName=lamdb-it4409";

//configure mongoose
mongoose.connect(queryString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected!'))
    .catch(err => console.log('MongoDB connection error:', err.message));

module.exports = app;