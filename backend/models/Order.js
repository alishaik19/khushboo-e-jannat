const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        name: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },

        qty: {
          type: Number,
          required: true,
          min: 1,
        },

        image: String,
      },
    ],

    shippingDetails: {
      fullName: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      pincode: {
        type: String,
        required: true,
      },
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentId: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: [
        "Placed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
        "Return Requested",
        "Return Processing",
        "Returned",
        "Return Rejected",
      ],
      default: "Placed",
    },
    returnReason: {
      type: String,
      default: "",
    },

    adminHidden: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
  
);

module.exports = mongoose.model("Order", orderSchema);
