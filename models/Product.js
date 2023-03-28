const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
// Schema --> (Model) --> Query

// schema Design
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name for this product"],
      trim: true,
      unique: [true, "Name must be unique"],
      loewrcase: true,
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [100, "Name is too large"],
    },
    description: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs","bag"],
        message: "Unit value can't be {VALUE}, must be kg/litre/pcs/bag",
      },
    },

    // imageURLs: [{
    //   type: String,
    //   required: true,
    //   validate: {
    //     validator: (value) => {
    //       if(!Array.isArray(value)){
    //         return false;
    //       }
    //       let isValid = true;
    //       value.forEach(url => {
    //         if(!validator.isURL(url)){
    //           isValid =  false;
    //         }
    //       });
    //       return isValid;
    //     },
    //     message: "Please provide valid image urls"
    //   }
    // }],

    imageURLs: [{
      type: String,
      required: true,
      validate: [validator.isURL, "wrong url"]
    }],

    category: {
      type: String,
      required: true
    },
    brand: {
      name: {
        type: String,
        required: true
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true
      }
    }
  },
  {
    timestamps: true, //mongoose schema automatically generate: create and update time
    // _id:false // id can't go to mongoDB
  }
);

// mongoose middleware for saving data:pre/post
productSchema.pre("save", function (next) {
  console.log("Before saving data");

  if (this.quantity == 0) {
    this.status = "out-of-stock";
  }
  next();
});

// productSchema.post('save',function (doc,next) {
//   console.log("After saving data");
//   next();
// });

// productSchema.methods.logger = function () {
//   console.log(`Data saved for ${this.name}`);
// };

//================ Model Design ===============
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
