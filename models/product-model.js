const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true
    },
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
      required: [true, "Please enter product price"],
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

// Auto-increment ID middleware
productSchema.pre('save', async function(next) {
  if (this.isNew) {
    try {
      const lastProduct = await this.constructor.findOne({}, {}, { sort: { 'id': -1 } });
      this.id = lastProduct ? lastProduct.id + 1 : 1;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

// Hide MongoDB _id and __v, show simple id instead
productSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const product = mongoose.model("Product", productSchema);
module.exports = product;