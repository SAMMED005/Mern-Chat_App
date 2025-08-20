import express from 'express'
import { sendmessage,getmessages } from '../controllers/message.controller.js';

import protectRoute from '../middlewares/protectRoute.js'
const router=express.Router();
router.post('/send/:id',protectRoute,sendmessage)
router.get('/:id',protectRoute,getmessages)
export default router;