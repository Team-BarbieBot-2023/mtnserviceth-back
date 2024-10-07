const express = require('express');
const http = require('http');

const usersRouter = require('./routes/usersRoutes');

const app = express();

app.use(express.json());

app.use('/users', usersRouter);

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
