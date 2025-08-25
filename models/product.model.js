// const mongoose = require("mongoose");
// const productSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Please enter product name"],
//     },
//     quantity: {
//       type: Number,
//       required: [true, "Please enter product quantity"],
//       default: 0,
//     },
//     price: {
//       type: Number,
//       required: [true, "Please enter product quantity"],
//       default: 0,
//     },
//     image: {
//       type: String,
//       required: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const product=mongoose.model("Product", productSchema);
// module.exports=product;


const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
    },
    quantity: {
      type: Number,
      required: [true, "Please enter product quantity"],
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"], // Fixed: was "quantity"
      default: 0,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Hide MongoDB _id and __v, show simple id instead
productSchema.set('toJSON', {
  transform: function(doc, ret) {
    ret.id = ret._id;  // Convert _id to id
    delete ret._id;    // Remove _id
    delete ret.__v;    // Remove __v
    return ret;
  }
});

const product = mongoose.model("Product", productSchema);
module.exports = product;