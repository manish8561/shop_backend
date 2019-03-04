const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let OrderSchema = new Schema(
  {
    amazon_order_id: { type: String, required: true },
    amount: { type: Number, required: true, default: 0 },
    order_details: { type: String, default: null, max: 1000 },
    status: { type: String, default: "pending" },
    ip: { type: String, default: "0.0.0.0" },
    phone: { type: String },
    orderBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    remark: {
      type: String,
      default: "Your order is pending need to be review by adminstrator.",
      max: 500
    }
  },
  { timestamps: true }
);

// Export the model
module.exports = mongoose.model("Order", OrderSchema);
