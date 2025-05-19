import CandidateModel from "../Models/Candidate.model";
import { storage } from "../utility/storage";
import multer from "multer";
import path from 'path';
import fs from 'fs'


const upload = multer({ storage: storage })

// Add a new candidate
    export const addCandidate = async (req, res) => {
        try {
            // if (!req.user && !req.user.isAdmin) {
            //     return res.status(403).json({
            //         message: "You are not authorized to perform this action",
            //         success: false
            //     });
            // }
            // Handle image upload
            const updateData = upload.single('image'); 
            
            updateData(req, res, async function (err) {
                if (err) return res.status(400).json({ message: err.message }); 

                console.log('body', req.body)
                console.log('file', req.file)

                let filename = null;
                if (req.file) {
                    filename = req.file.filename; 
                }

                const { name } = req.body;

                // Validate that name is provided
                if (!name) {
                    return res.status(400).json({ message: "Name is required" });
                }

                const newCandidate = await CandidateModel.findOne({
                    name
                })
                
               const created = await CandidateModel.create({
                name:name,
                image:filename
               })

                return res.status(201).json({
                    data: created,
                    message: "Candidate added successfully"
                });
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    };


// Get all candidates
export const getCandidates = async (req, res) => {
    try {
        const candidates = await CandidateModel.find();
        return res.status(200).json({
            data: candidates,
            message: "All candidates fetched",
            filepath:process.env.FILE_URL
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

// Get a specific candidate by ID
export const getCandidateById = async (req, res) => {
    try {
        const candidateId = req.params.candidate_id;
        const candidate = await CandidateModel.findById(candidateId);
        if (candidate) {
            return res.status(200).json({
                data: candidate,
                message: "Candidate fetched successfully"
            });
        } else {
            return res.status(404).json({
                message: "Candidate not found"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

// Update a candidate by ID

export const updateCandidate = async (req, res) => {
    try {
        const candidateId = req.params.candidate_id;

        // Handle image upload
        const updateData = upload.single('image');
        
        updateData(req, res, async function (err) {
            if (err) return res.status(400).json({ message: err.message });

            const { name } = req.body;
            const existingCandidate = await CandidateModel.findById(candidateId);

            if (!existingCandidate) {
                return res.status(404).json({ message: "Candidate not found" });
            }

            let filename = existingCandidate.image; // Default to existing image if no new image

            // If a new image is uploaded, replace the old one
            if (req.file) {
                filename = req.file.filename;
                // Delete the old image if it exists
                const oldImagePath = path.join(__dirname, '../uploads/candidates', existingCandidate.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            // Update candidate data
            const updatedCandidate = await CandidateModel.findByIdAndUpdate(
                candidateId,
                { name, image: filename }, // Update name and image fields
                { new: true } // Return updated candidate
            );

            return res.status(200).json({
                data: updatedCandidate,
                message: "Candidate updated successfully"
            });
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

// Delete a candidate by ID

export const deleteCandidate = async (req, res) => {
    try {
        const candidateId = req.params.candidate_id;

        // Find the candidate by ID
        const existingCandidate = await CandidateModel.findOne({ _id: candidateId });

        // If the candidate doesn't exist
        if (!existingCandidate) {
            return res.status(404).json({
                message: "Candidate not found"
            });
        }

        // Delete the candidate record
        const deleteResult = await CandidateModel.deleteOne({ _id: candidateId });

        if (deleteResult.acknowledged) {
            // Check if the candidate has an image and delete the image
            if (existingCandidate.image) {
                const imagePath = path.join(__dirname, '../uploads', existingCandidate.image);

                // If the image exists, delete it
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                } else {
                    console.log("Image file not found:", imagePath);
                }
            }

            return res.status(200).json({
                message: "Candidate and their image deleted successfully"
            });
        } else {
            return res.status(400).json({
                message: "Failed to delete candidate"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
