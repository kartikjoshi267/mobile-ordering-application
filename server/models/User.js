const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["seller", "buyer"], required: true },
    cart: {
      type: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Mobile" }],
      default: [],
    },
    mobiles: {
      type: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Mobile" }],
      default: [],
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});

userSchema.pre("save", async function (next) {
  const token = jwt.sign(
    { username: this.username, role: this.role },
    "your-secret-key"
  );
  this.token = token;

  next();
});

module.exports = mongoose.model("User", userSchema);
