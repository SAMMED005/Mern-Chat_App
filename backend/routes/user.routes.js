import express from 'express';
import protectRoute from '../middlewares/protectRoute.js'
import {getusersforsidebar} from '../controllers/user.controllers.js'
const router=express.Router();
router.get('/',protectRoute,getusersforsidebar)
// router.get('/',getusersforsidebar)
export default router;