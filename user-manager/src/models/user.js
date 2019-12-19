const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

let userSchema = new Schema(
  {
    name: String,
    password: String
  },
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.pre("save", function(next) {
  const user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  bcrypt.hash(user.password, 10, (error, encrypted) => {
    if (error) return next(error);
    user.password = encrypted;
    next();
  });
});

module.exports = mongoose.model("User", userSchema, "users");
