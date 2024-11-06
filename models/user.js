import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required!'],
    },
    email: {
      type: String,
      unique: [true, 'Email already exists!'],
      required: [true, 'Email is required!'],
    },
    password: {
      type: String,
      required: [true, 'password is required!'],
    },
    role: {
      type: String,
      required: [true, 'role is required!'],
    },
    status: {
      type: String,
      required: [true, 'status is required!'],
    },
    city: {
      type: String,
      required: [true, 'city is required!'],
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Middleware to hash the password before saving
UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

//Generate JWT Token
// UserSchema.methods.generateAuthToken = async function () {
//   const user = this;
//   console.log(user+'generateAuthToken-----------------------')
//   const token = jwt.sign(
//     { _id: user._id, role: user.role },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: '30d',
//     }
//   );
//   return token;
// };

UserSchema.method("generateAuthToken", async function () {
  const user = this;
  console.log(user+'generateAuthToken-----------------------')
  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
  return token;
})









//Find using email and check if the password matched
UserSchema.statics.findUserByCredentials = async (email, password) => {
  const user = await User.find({ email }, { _id: 1, password: 1 });
  if (!user[0]) throw new Error('Invalid login credentials');
  const isPasswordMatched = await bcrypt.compare(password, user[0].password);
  if (!isPasswordMatched) throw new Error('Invalid login credentials');
  return user[0];
};

const User = models.User || model('User', UserSchema);

export default User;

