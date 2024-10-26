const nodemailer = require('nodemailer');
const axios = require('axios');

const User = require('../models/User');

const notification = {
    // Email function
    email: async (item) => {
        const getEmail = await new Promise((resolve, reject) => {
            User.getByid(item.to, (err, user) => {
                if (err) {
                    return reject(err);
                }
                resolve(user.length > 0 ? user[0].email : null);
            });
        }).catch(error => {
            console.error('Error fetching email:', error);
            return null;
        });

        if (!getEmail) {
            console.log('No email found for this user.');
            return;
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mtnseviceth@gmail.com',
                pass: 'vofz luxc rnbo cfja',
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: "mtnseviceth@gmail.com",
            to: getEmail,
            subject: item.subject,
            text: item.text,
        };

        try {
            let info = await transporter.sendMail(mailOptions);
            console.log('Email sent: ' + info.response);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    },

    // LINE function
    line: async (item) => {
        const LINE_ACCESS_TOKEN = 'your-line-access-token';

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LINE_ACCESS_TOKEN}`,
        };

        const body = {
            to: item.to,
            messages: [
                {
                    type: 'text',
                    text: item.text,
                },
            ],
        };

        try {
            let response = await axios.post('https://api.line.me/v2/bot/message/push', body, { headers });
            console.log('LINE message sent:', response.data);
        } catch (error) {
            console.error('Error sending LINE message:', error);
        }
    },
};

module.exports = notification;
