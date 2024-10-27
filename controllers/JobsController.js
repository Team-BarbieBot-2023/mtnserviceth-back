const notification = require('../function/notification');
const Jobs = require('../models/Jobs');
const Technicians = require('../models/Technicians');
const multer = require('multer');
const upload = multer({ dest: '../storage/file' });

class JobsController {
    static createJobs(req, res) {
        try {

            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ error: 'No files uploaded' });
            }

            const customerDetails = JSON.parse(req.body.customer_details);
            const imgDescription = JSON.parse(req.body.img_description);

            const jobData = {
                user_id: req.body.user_id,
                phone: req.body.phone,
                job_title: req.body.job_title,
                job_type: req.body.job_type,
                scheduled_datetime: new Date(req.body.scheduled_datetime),
                urgency: req.body.urgency,
                job_description: req.body.job_description,
                customer_details: customerDetails,
                img_description: imgDescription,
                status: 'pending',
                created_at: new Date(),
                updated_at: new Date(),
                completion_confirmed: false
            };



            Jobs.create(jobData, async (err, results) => {
                if (err) {
                    console.error('Database Error:', err);
                    return res.status(500).json({ error: 'Failed to create job' });
                }
                await notification.line();


                res.status(200).json({ message: 'Job created successfully!' });
            });

        } catch (error) {
            console.error('Error in createJobs:', error);
            res.status(500).json({ error: 'An error occurred while creating the job' });
        }
    }

    static getJobs(req, res) {
        Jobs.getAll((err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        });
    }

    static getJobsByAdmin(req, res) {
        Jobs.getJobsByAdmin((err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        });
    }

    static getJobsByID(req, res) {
        const { id } = req.params;
        Jobs.getById(id, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        });
    }

    static updateJobs(req, res) {
        const { id } = req.params;
        Jobs.update(id, req.body, (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(200).json({ message: 'Jobs updated successfully' });
        });
    }

    static cancelJobs(req, res) {
        const { id } = req.params;
        Jobs.cancelJob(id, req.body, (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(200).json({ message: 'Jobs updated successfully' });
        });
    }

    static removeTechniciant(req, res) {
        const { id } = req.params;
        Jobs.removeTechniciant(id, req.body, (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(200).json({ message: 'Jobs updated successfully' });
        });
    }

    static async updateStatusJobsCompleted(req, res) {
        const { id } = req.params;
        const data = req.body;

        const setEmail = {
            to: data.user_id,
            subject: `Status Update: ${data.status}`,
            text: "สถานะงานของท่าน สำเร็จแล้ว",
        }

        await notification.email(setEmail)
        
        Jobs.updateStatusCompleted(id, data, (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(200).json({ message: 'Jobs updated successfully' });
        });
    }

    static async updateStatusJobsInprogress(req, res) {
        const { id } = req.params;
        const data = req.body;

        const setEmail = {
            to: data.to,
            subject: `Status Update: ${data.status}`,
            text: "สถานะงานของท่าน มีช่างรับงานแล้ว",
        }

        await notification.email(setEmail)

        Technicians.getByUserId(data.user_id, (err, results) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }


            console.log(results);
            data.technician_id = results[0].id

            Jobs.updateStatus(id, data, (err) => {
                if (err) {
                    return res.status(400).json({ error: err.message });
                }

                Technicians.updateCurrentJobs(data.user_id, id, (err) => {
                    if (err) {
                        return res.status(400).json({ error: err.message });
                    }

                    res.status(200).json({ message: 'Jobs updated successfully' });
                })

            });
        });
    }

    static getJobsByTechnicianID(req, res) {
        const { id } = req.params;
        Technicians.getByUserId(id, (err, results) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }

            let id = results[0].id

            Jobs.getByTechnicianID(id, (err, results) => {
                if (err) {
                    return res.status(400).json({ error: err.message });
                }
                res.status(200).json(results);

            });
        });
    }

    static deleteJobs(req, res) {
        const { id } = req.params;
        Jobs.delete(id, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(204).send();
        });
    }
}

module.exports = JobsController;
