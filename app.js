const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// middlewares for
app.use(express.json());
app.use(cors());


// Schema --> Model --> Query 

// schema Design 
const productSchema = new  mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name for this product"],
    trim: true,
    unique: [true, "Name must be unique"],
    minLength: [3, "Name must be at least 3 characters"],
    maxLength: [100, "Name is too large"]
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required : true,
    min: [0, "Price Can't be Negative"]
  },
  unit: {
    type : String,
    required : true,
    enum:{
      values: ["kg", "litre", "pcs"],
      message: "Unit value can't be {VALUE}, must be kg/litre/pcs"
    }
  },
  quantity:{
    type: Number,
    required: true,
    min: [0, "Quantity can't be negative"],
    validate:{
      validator: (value) =>{
        const isInteger= Number.isInteger(value); 
        if(isInteger){
            return true;
        }else{
            return false;
        }
      }
    },
    message: "Quantity must be an integer"
  },
  status: {
      type: String,
      required: true,
      enum: {
          values: ["in-stock", "out-of-stock","discontinued" ],
          message: "Status can't be {VALUE}"
      }
  }

    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // },
    // updateAt:{
    //     type: Date,
    //     default: Date.now,
    // },
    
    // supplier:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Supplier"
    // },
    // categories:[{
    //     name: {
    //         type:String,
    //         required:true
    //     },
    //     _id: mongoose.Schema.Types.ObjectId
    // }]
}, 
{
  timestamps: true, //mongoose schema automatically generate: create and update time 
  // _id:false // id can't go to mongoDB 
});

// mongoose middleware for saving data:pre/post
productSchema.pre('save',function (next) {
  console.log('Before saving data');
  if(this.quantity == 0){
    this.status='out-of-stock';
  }

  next();
})

// productSchema.post('save',function (doc,next) {
//   console.log("After saving data");

//   next();
// });

productSchema.methods.logger= function () {
  console.log(`Data saved for ${this.name}`);
}




//================ Model Design ===============
const Product=mongoose.model('Product',productSchema);



app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

//================ Query Design ===============

// posting data to database 
app.post('/api/v1/product', async (req, res, next) => {
  console.log(req.body)
  try {
    //  create or save
    // const result = await Product.create(req.body)
    
    // save
    const product = new Product(req.body);
    // instnce creation --> Do something --> save()
    if(product.quantity ==0){
      product.status= 'out-of-stock';
    }
    const result = await product.save();

    res.status(200).json({
      status: 'success',
      message: 'Data inserted successfully!',
      data: result
    });
  } catch (error) {
      res.status(400).json({
        status: 'error',
        message: 'Data is not inserted',
        error: error.message
      })
    }
});


module.exports = app;