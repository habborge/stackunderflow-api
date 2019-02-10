const mongoose = require('mongoose');

const { Schema } = mongoose;

const fields = {
  text: {
    type: String,
    default: '',
    trim: true,
    required: true,
  },
};

const references = {
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
};

const post = new Schema(Object.assign(fields, references), {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
});

const virtuals = {
  comments: {
    ref: 'comment',
    localField: '_id',
    foreignField: 'postId',
  },
};

post.virtual('comments', virtuals.comments);

module.exports = {
  Model: mongoose.model('post', post),
  fields,
  references,
  virtuals,
};
