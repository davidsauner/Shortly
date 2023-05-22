import { signIn, signUp } from "../controllers/Auth.js"
import { Router } from 'express'
import { validateSchema } from "../middlewares/ValidateSchema.js";

import  SignUpSchema  from "../model/SingUpSchema.js";
import SignInSchema from "../model/SingInSchema.js";

const UserRouter = Router();

UserRouter.post("/signup", validateSchema(SignUpSchema), signUp);
UserRouter.post("/signin", validateSchema(SignInSchema), signIn);



export default UserRouter;