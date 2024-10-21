const nodemailer = require('nodemailer');
const axios = require('axios');

const notification = {
    // Email function
    email: async (status, email) => {
        console.log(status, email);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mthserviceth@gmail.com',
                pass: 'mthservicethmthserviceth',
            },
        });

        let text = "";

        switch (status) {
            case 'in_progress':
                text = "Your request is currently in progress. Please wait for further updates.";
                break;
            case 'completed':
                text = "Your request has been completed successfully. Thank you for using our service.";
                break;
            case 'canceled':
                text = "Your request has been canceled. If you have any questions, please contact support.";
                break;
            default:
                text = "An update on your request status will be provided soon.";
                break;
        }

        const mailOptions = {
            from: "mthserviceth@gmail.com", // อีเมลผู้ส่ง
            to: email, // อีเมลผู้รับ
            subject: `Status Update: ${status}`, // หัวข้ออีเมล
            text: text, // เนื้อหาอีเมลที่ถูกกำหนดจากสถานะ
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
