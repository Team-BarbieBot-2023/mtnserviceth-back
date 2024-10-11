const express = require('express');
const http = require('http');
const cors = require('cors');

const usersRouter = require('./routes/usersRoutes');
const techniciansRoutes = require('./routes/techniciansRoutes');

const app = express();
app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.use('/users', usersRouter);
app.use('/technicians', techniciansRoutes);

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
