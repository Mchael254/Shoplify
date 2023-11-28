<<<<<<< HEAD
import Router from "express";
import {
  checkUserDetails,
  loginUser,
  registerUser,
} from "../controllers/userControllers";
import { verifyToken } from "../middleware/tokenVerify";

const user_router = Router();

// user_router.get('/',verifyToken,getAllUsers)
user_router.post("/register", registerUser);
user_router.post("/login", loginUser);
user_router.get("/check_user_details", verifyToken, checkUserDetails);


export default user_router;
=======
import Router from 'express'
import { checkUserDetails, loginUser, registerUser } from '../controllers/userControllers'
import { verifyToken } from '../middleware/tokenVerify'




const user_router = Router()

// user_router.get('/',verifyToken,getAllUsers)
user_router.post('/register', registerUser)
user_router.post('/login', loginUser)
user_router.get('/check_user_details', verifyToken, checkUserDetails)
// user_router.post('/sendReview', sendReview)
// user_router.get('/allReviews', getAllReviews)
// user_router.put('/updateProfile', updateProfile)
// user_router.get('/userDetails', fecthUserDetails)
// user_router.post('/checkUserEmail', checkUserEmail);
// user_router.post('/requestPassword', initiate_password_reset)
// user_router.post('/resetPassword', resetPassword)
// user_router.get('/allUsers', getAllUsers)
// user_router.delete('/deleteUser', deleteUser)

export default user_router
>>>>>>> fa2e0f8fa302592d0ae834416a4405abcd659d0f
