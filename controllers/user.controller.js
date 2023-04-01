const {
    signupService,
    findUserByEmail
} = require("../services/user.service");

const { generateToken } = require("../utils/token");

exports.signup = async (req, res) => {
    try {
        const user = await signupService(req.body);

        res.status(200).json({
            status: "success",
            message: " successfully signed up",

        })

    } catch (error) {
        res.status(500).json({
        status: "fail",
        error,
    });
    }
}


/**
 * 1. Check if Email and password are given
 * 2. Load user with email
 * 3. if not user send res- provide email and password/vreate account
 * 4. compare password
 * 5. if password not correct send res- your login credentials incorrect
 * 6. check if user is active
 * 7. if not active send res- you need to active acc
 * 8. generate token
 * 9. send user and token
 */
exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(401).json({
          status: "fail",
          error: "Please provide your credentials",
        });
      }
  
      const user = await findUserByEmail(email);
  
      if (!user) {
        return res.status(401).json({
          status: "fail",
          error: "No user found. Please create an account",
        });
      }
  
      const isPasswordValid = user.comparePassword(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(403).json({
          status: "fail",
          error: "Password is not correct",
        });
      }
  
      if (user.status != "active") {
        return res.status(401).json({
          status: "fail",
          error: "Your account is not active yet.",
        });
      }
  
      const token = generateToken(user);
  
      const { password: pwd, ...others } = user.toObject();
  
      res.status(200).json({
        status: "success",
        message: "Successfully logged in",
        data: {
          user: others,
          token,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "fail",
        error,
      });
    }
  };
  