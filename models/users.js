const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullName: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "user",
    },
    photo: { type: String, default: "" },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// UserSchema.methods.matchPassword = async (enteredPassword) => {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// UserSchema.pre("save", async (next) => {
//   // if (!this.isModified("password")) {
//   //   next();
//   // }
//   // next();

//   // const salt = await bcrypt.genSalt(10);
//   // this.password = await bcrypt.hash(this.password, salt);
//   console.log("Password", this.password);
// });

module.exports = mongoose.model("User", UserSchema);
