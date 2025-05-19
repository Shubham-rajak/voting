import express from 'express';
import {auth} from '../MiddleWare/auth.middleware';
import { voteForCandidate } from '../Controllers/vote.Controller';

const router = express.Router();

router.post('/vote', auth, voteForCandidate);

export default router;
