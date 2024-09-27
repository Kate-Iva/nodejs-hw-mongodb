import * as authServices from "../services/auth.js";
import { requestResetToken } from '../services/auth.js';
import { resetPassword } from '../services/auth.js';


const setupSession = (res, session) => {
    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expire: new Date(Date.now() + session.refreshTokenValidUntil),
    });

    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expire: new Date(Date.now() + session.refreshTokenValidUntil),
    });
};


export const registerController = async(req, res)=> {
    const newUser = await authServices.register(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully registered a user!",
        data: newUser,
    });
};

//6
// export const verifyController = async(req, res)=> {
   // const {token} = req.query;
   // await authServices.verify(token);

   // res.json({
    //    status: 200,
     //   message: "Email verified successfully",
      //  data: {},
   // });
// };
//6//
export const loginController = async(req, res)=> {
    const session = await authServices.login(req.body);

    setupSession(res, session);

    res.json({
        status: 200,
        message: "Successfully login",
        data: {
            accessToken: session.accessToken,
        }
    });
};

export const refreshController = async(req, res)=> {
    const {refreshToken, sessionId} = req.cookies;
    const session = await authServices.refreshSession({refreshToken, sessionId});
    
    setupSession(res, session);

    res.json({
        status: 200,
        message: "Successfully refresh session",
        data: {
            accessToken: session.accessToken,
        }
    });
};


export const logoutController = async(req, res)=> {
    const {sessionId} = req.cookies;
    if(sessionId) {
        await authServices.logout(sessionId);
    }

    res.clearCookie("sessionId");
    res.clearCookie("refreshToken");

    res.status(204).send();
};


//6.1

export const requestResetEmailController = async (req, res) => {
    await requestResetToken(req.body.email);
  
    res.status(200).json({
      status: 200,
      message: 'Reset password email was successfully sent!',
      data: {},
    });
  };
  
  export const resetPasswordController = async (req, res) => {
    await resetPassword(req.body);
  
    res.status(200).json({
      status: 200,
      message: 'Password was successfully reset!',
      data: {},
    });
  };

  //
