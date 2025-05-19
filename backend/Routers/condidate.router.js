import express from 'express';
import { addCandidate, deleteCandidate, getCandidateById,getCandidates, updateCandidate } from '../Controllers/candidate.Controller';
import {auth,admin} from '../MiddleWare/auth.middleware';


const router = express.Router();

router.post('/add-candidate' ,addCandidate);
router.get('/get-candidates', getCandidates);
router.get('/get-candidate/:candidate_id', getCandidateById);
router.put('/update-candidate/:candidate_id', updateCandidate)
router.delete('/delete-candidate/:candidate_id',deleteCandidate)

export default router;
