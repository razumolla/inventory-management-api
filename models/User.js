const mongoose = require("mongoose");
const validator = require("validator");

const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {
      email: {
        type: String,
        validate: [validator.isEmail, "Provide a valid Email"],
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Email address is required"],
      },
      password: {
        type: String,
        required: [true, "Password is required"],
        validate: {
          validator: (value) =>
            validator.isStrongPassword(value, {
              minLength: 6,
              minLowercase: 3,
              minNumbers: 1,
              minUppercase: 1,
              minSymbols: 1,
            }),
          message: "Password {VALUE} is not strong enough.",
        },
      },
      confirmPassword: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
          validator: function (value) {
            return value === this.password;
          },
          message: "Passwords don't match!",
        },
      },
  
      role: {
        type: String,
        enum: ["buyer", "store-manager", "admin"],
        default: "buyer",
      },
  
    firstName: {
        type: String,
        required: [true, "Please provide a first name"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [100, "Name is too large"],
    },
      
      lastName: {
        type: String,
        required: [true, "Please provide a first name"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [100, "Name is too large"],
        },
      
      contactNumber: {
        type: String,
        validate: [validator.isMobilePhone, "Please provide a valid contact number"],
      },
  
      shippingAddress: String,
  
      imageURL: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url"],
        },
      
      status: {
        type: String,
        default: "active",
        enum: ["active", "inactive", "blocked"],
      },
  
    //   confirmationToken: String,
    //   confirmationTokenExpires: Date,
  
      passwordChangedAt: Date,
      passwordResetToken: String,
      passwordResetExpires: Date,
    },
    {
      timestamps: true,
    }
  );

  userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
      //  only run if password is modified, otherwise it will change every time we save the user!
      return next();
    }
    const password = this.password;
  
    const hashedPassword = bcrypt.hashSync(password);
  
    this.password = hashedPassword;
    this.confirmPassword = undefined;
  
    next();
  });

const User = mongoose.model('User', userSchema);
module.exports = User;