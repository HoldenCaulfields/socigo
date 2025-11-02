// models/User.js

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, default: '' },
  passwordHash: { type: String, required: function() {
    // Only require passwordHash if not using Google Auth
    return !this.googleId; 
  }}, 
  avatarUrl: { type: String, default: '' },
  role: { type: String, enum: ['user', 'partner', 'admin'], default: 'user' },
  points: { type: Number, default: 0 },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // danh sách bạn bè
  googleId: { type: String, unique: true, sparse: true }, // For Google Auth

}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// **Helper Method to check password (will be used in Login)**
userSchema.methods.matchPassword = async function (enteredPassword) {
  // Compare the plain text enteredPassword with the hashed passwordHash in the DB
  return await bcrypt.compare(enteredPassword, this.passwordHash);
};

// **Pre-save middleware to hash password before saving (will be used in Signup)**
// Only hash if the passwordHash field is being modified
userSchema.pre('save', async function (next) {
  // Skip if password is not modified or if using Google Auth (no password provided)
  if (!this.isModified('passwordHash') || this.googleId) {
    return next();
  }

  // Generate salt and hash the password
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  next();
});

const User = mongoose.model('User', userSchema);

export default User;