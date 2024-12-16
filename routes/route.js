import express from 'express';
const router = express.Router();
import {createUser,getAllusers,getUserById,deleteUser,updateUser,login,reset} from '../controllers/controller.js';



router.post('/createUser',createUser)
router.get('/getAllusers',getAllusers)
router.get('/getUserById/:_id',getUserById)
router.delete('/deleteUser/:_id?',deleteUser)
router.put('/updateUser/:_id',updateUser)
router.post('/login',login);
router.patch('/reset',reset)



export default router;