import {Router} from "express";

import * as authControllers from "../controllers/auth.js";
//import {requestResetEmailController, resetPasswordController} from "../controllers/auth.js";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";

import {userRegisterSchema, userLoginSchema, requestResetEmailSchema, resetPasswordSchema, userLoginWithGoogleOAuthSchema } from "../validation/users.js";

const authRouter = Router();

authRouter.post("/register", validateBody(userRegisterSchema), ctrlWrapper(authControllers.registerController));

authRouter.get("/google-oauth-url", ctrlWrapper(authControllers.getGoogleOauthUrlController));

authRouter.post("/confirm-google-auth", validateBody(userLoginWithGoogleOAuthSchema), ctrlWrapper(authControllers.loginWithGoogleOAuthController));

// authRouter.get("/verify", ctrlWrapper(authControllers.verifyController));

//6.1
authRouter.post('/send-reset-email', validateBody(requestResetEmailSchema), ctrlWrapper(authControllers.requestResetEmailController));
  
authRouter.post('/reset-pwd',validateBody(resetPasswordSchema),ctrlWrapper(authControllers.resetPasswordController));
//

authRouter.post("/login", validateBody(userLoginSchema), ctrlWrapper(authControllers.loginController));

authRouter.post("/refresh", ctrlWrapper(authControllers.refreshController));

authRouter.post("/logout", ctrlWrapper(authControllers.logoutController));

export default authRouter;