const Complaints = require('../models/Complaints');
const Jobs = require("../models/Jobs");
const Technicians = require('../models/Technicians');
class ComplaintsController {
    static createComplaint(req, res) {
        try {
            const complaintData = {
                user_id: req.body.user_id,
                technician_id: req.body.technician_id || null,
                job_id: req.body.job_id || null,
                complaint_title: req.body.complaint_title,
                complaint_description: req.body.complaint_description,
                complaint_date: new Date(req.body.complaint_date),
                status: req.body.status || 'pending',
                resolution: req.body.resolution || null,
                resolved_at: req.body.resolved_at ? new Date(req.body.resolved_at) : null,
                created_at: new Date(),
                updated_at: new Date()
            };
            

            Complaints.create(complaintData, (err, results) => {
                if (err) {
                    console.error('Database Error:', err);
                    return res.status(500).json({ error: 'Failed to create job' });
                }
                res.status(200).json({ message: 'complaint created successfully!' });
            });

        } catch (error) {
            console.error('Error in createComplaint:', error);
            res.status(500).json({ error: 'An error occurred while creating the complaint' });
        }
    }
    static getJobById(req,res){
        const { id } = req.params;
        Jobs.getByJobId(id,(err,results)=>{
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);           
        })
    }
    static getMyComplaints(req, res) {
        const { id } = req.params;
        Complaints.getMyComplants(id, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        });
    }
    static getComplaints(req, res) {
        Complaints.getAll((err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        });
    }

    static getComplaintsByID(req, res) {
        const { id } = req.params;
        Complaints.getById(id, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        });
    }

    static updateComplaints(req, res) {
        const { id } = req.params;
        Complaints.update(id, req.body, (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(200).json({ message: 'Complaints updated successfully' });
        });
    }



    static deleteComplaints(req, res) {
        const { id } = req.params;
        Complaints.delete(id, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(204).send();
        });
    }
}

module.exports = ComplaintsController;
