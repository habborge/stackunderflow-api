const mongoose = require('mongoose');
const { hash, compare } = require('bcryptjs');

const { Schema } = mongoose;

const fields = {
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: 6,
  },
};

const user = new Schema(fields, {
  timestamps: true,
});

const blacklistFields = ['password'];

user.methods.toJSON = function toJSON() {
  const doc = this.toObject();
  blacklistFields.forEach((field) => {
    if (Object.hasOwnProperty.call(doc, field)) {
      delete doc[field];
    }
  });
  return doc;
};

user.pre('save', function save(next) {
  if (this.isNew || this.isModified('password')) {
    hash(this.password, 10).then((hashText) => {
      this.password = hashText;
      next();
    });
  } else {
    next();
  }
});

user.methods.verifyPassword = function verifyPassword(password) {
  return compare(password, this.password);
};

module.exports = mongoose.model('user', user);
