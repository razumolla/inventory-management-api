const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const brandSchema = mongoose.Schema({

    products: [{
        type: ObjectId,
        ref: "Product"
    }],
    name: {
        type: String,
        trim: true,
        required: [true, "Please provide a brand name"],
        minLength: 3,
        maxLength: 100,
        unique: true, //we can't provide error messages: mongoose handle this error message
        lowercase: true
    },
    description: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        validate: [validator.isEmail, "Provide a valid email"]
    },
    website: {
        type: String,
        validate: [validator.isURL, "Provide a valid URL"]
    },
    location: {
        type: String,
    },
    suppliers: [{
        name: String,
        contactNumber: String,
        id: {
            type: ObjectId,
            ref: "Supplier"
        }
    }],
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, {
    timestamps: true,
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;