const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// middlewares for
app.use(express.json());
app.use(cors());

// schema Design 
const productSchema= mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name for this product"],
        trim: true, //reduce extrea  space before and after this -name
        unique: [true, "Name must be unique"],
        minLength: [3, "Name must be at least 3 characters"],
        maxLength: [100, "Name is too large"],
    },
    description: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required : true,
        min: [0, "Price Can't be Negative"]
    },
    unit:{
        type : String,
        required : true,
        enum:{
            value: ["kg", "litre", "pcs"],
            message: "Unit value can't be {VALUE}, must be kg/litre/pcs"
        }
    },
    quentity:{
        type: Number,
        required: true,
        min: [0, "Quantity can't be negative"],
        validate:{
            validator: (value)=>{
                const isInteger=Number.isInteger(value); 
                if(isInteger){
                    return true;
                }else{
                    return false;
                }
            }
        },
        messages: "Quantity must be an integer" // if validator returns false- then return this message
    },
    status: {
        type: String,
        required: true,
        enum: {
            value: ["in-stock", "out-of-stock","discountinued" ],
            message: "Status can't be {VALUE}",
        }
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // },
    // updateAt:{
    //     type: Date,
    //     default: Date.now,
    // },
    supplier:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier"
    },
    categories:[{
        name: {
            type:String,
            required:true
        },
        _id: mongoose.Schema.Types.ObjectId
    }]
},{
    timestamps: true, //mongoose schema automatically generate: create and update time 
    // _id:false // id can't go to mongoDB 
})


app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});


module.exports = app;