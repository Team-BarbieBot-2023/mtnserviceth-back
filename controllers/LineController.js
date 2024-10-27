const Line = require('../models/Line');
const express = require('express');
const axios = require('axios');
const util = require('util');

require('dotenv').config();

const getLineByLineID = util.promisify(Line.getLineByLineID);
const getLineAll = util.promisify(Line.getLineAll);
const updateLine = util.promisify(Line.update);

class LineController {
    static getLineByUserID(req, res) {
        const { id } = req.params
        Line.getLineByUserID(id, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results[0]);
        });
    }

    static async webhook(req, res) {
        if (!req.body || !req.body.events || req.body.events.length === 0) {
            return res.status(400).send("No events found.");
        }

        const TOKEN = process.env.LINE_ACCESS_TOKEN;
        const event = req.body.events[0];
        const lineID = event.source.userId;
        const userMessage = event.message.text;

        if (event.type !== "message") {
            return res.status(200).send("Event type is not 'message'");
        }

        try {
            const existingUser = await getLineByLineID(lineID);
            if (existingUser.length === 0) {
                const allCodes = await getLineAll();
                const matchingCode = allCodes.find(code => code.vardify_code === userMessage);

                if (matchingCode) {
                    matchingCode.status = "A";
                    matchingCode.line_id = lineID;
                    await updateLine(matchingCode);

                    await sendReply(event.replyToken, "VerificationCode successfully", TOKEN);
                    return res.status(200).send("Verification code matched and updated");
                }
            } else {
                if (existingUser[0].status === "A") {
                    await sendReply(event.replyToken, "กรุณารอสักครู่ค่ะ/ครับ เจ้าหน้าที่ของเรากำลังดำเนินการและจะตอบกลับในไม่ช้านี้", TOKEN);
                    return res.status(200).send("Message sent to existing user with status A");
                }
            }

            await sendReply(event.replyToken, "Hello, user\nMay I help you?", TOKEN);

        } catch (error) {
            res.status(500).send("Internal server error");
        }
    }
}

async function sendReply(replyToken, message, token) {
    const data = {
        replyToken,
        messages: [{ type: "text", text: message }],
    };

    await axios.post("https://api.line.me/v2/bot/message/reply", data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

module.exports = LineController;
