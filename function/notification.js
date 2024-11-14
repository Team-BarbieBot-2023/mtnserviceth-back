const nodemailer = require('nodemailer');
const axios = require('axios');

const User = require('../models/User');
const Line = require('../models/Line');

require('dotenv').config();

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

    line: async (text) => {
        try {
            const textSend = text || "มีงานเข้ามาใหม่แล้ว กรุณาตรวจสอบรายละเอียดในระบบ"
            const getLine = await new Promise((resolve, reject) => {
                Line.getLineAll((err, line) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(line);
                });
            });

            if (!getLine || getLine.length === 0) {
                console.log('No users with LINE ID found.');
                return;
            }

            const TOKEN = process.env.LINE_ACCESS_TOKEN;

            for (const user of getLine) {
                if (user.line_id) {
                    const headers = {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${TOKEN}`,
                    };

                    const body = {
                        to: user.line_id,
                        messages: [
                            {
                                type: 'text',
                                text: textSend,
                            },
                        ],
                    };

                    try {
                        const response = await axios.post('https://api.line.me/v2/bot/message/push', body, { headers });
                    } catch (error) {
                        console.error(`Error sending LINE message to ${user.line_id}:`, error.response ? error.response.data : error.message);
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching users or sending LINE message:', error);
        }
    },
};

module.exports = notification;
