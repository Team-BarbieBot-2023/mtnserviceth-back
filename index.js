const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');

const usersRouter = require('./routes/usersRoutes');
const techniciansRoutes = require('./routes/techniciansRoutes');
const jobsRoutes = require('./routes/jobsRoutes');
const complaintsRoutes = require('./routes/complaintsRoutes');
const reviewRoutes = require('./routes/reviewsRoutes');
const lineRoutes = require('./routes/lineRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');


const app = express();
app.use(cors());

app.use(express.json({ limit: '50mb' }));

app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.use('/users', usersRouter);
app.use('/technicians', techniciansRoutes);
app.use('/jobs', jobsRoutes);
app.use('/complaints', complaintsRoutes);
app.use('/review', reviewRoutes);
app.use('/line', lineRoutes);
app.use('/dashboard', dashboardRoutes);





app.use('/file', express.static(path.join(__dirname, '/uploads')));
app.use('/img', express.static(path.join(__dirname, '/img')));



// app.use('/', (req, res) => {
//     res.send('My APIs Wormsea.com');
// });


const PORT = process.env.PORT || 3002;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});