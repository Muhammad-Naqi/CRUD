import express from 'express';
const router = express.Router();
import {createUser,getAllusers,getUserById,deleteUser,updateUser,login,reset} from '../controllers/controller.js';



router.post('/user',createUser)
router.get('/user',getAllusers)
router.get('/user/:_id',getUserById)
router.delete('/user/:_id?',deleteUser)
router.put('/user/:_id',updateUser)
router.post('/login',login);
router.patch('/reset',reset)



export default router;