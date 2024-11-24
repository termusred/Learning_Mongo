import express from "express";
import isLoggedIn from "../Auth/IsLoggedIn.js";
import { 
  DeleteUser, 
  GetAllUsers, 
  GetUserById, 
  GetUserId, 
  GetUserToken, 
  Login, 
  PatchUser, 
  Register 
} from "./__controller.js";
import { 
  registerSchema, 
  loginSchema, 
  patchUserSchema, 
  deleteUserSchema, 
  getUserByIdSchema, 
  getAllUsersSchema, 
  validate 
} from "./__schema.js";

const router = express.Router();

router.get('/users', isLoggedIn, validate(getAllUsersSchema), GetAllUsers);
router.get("/userId", isLoggedIn, GetUserId);
router.get("/userToken", isLoggedIn, GetUserToken);
router.get('/users/:userId', isLoggedIn, validate(getUserByIdSchema), GetUserById);

router.post("/register", validate(registerSchema), Register);
router.post("/login", validate(loginSchema), Login);

router.delete("/users", isLoggedIn, validate(deleteUserSchema), DeleteUser);

router.patch("/user", isLoggedIn, validate(patchUserSchema), PatchUser);

export default router;
