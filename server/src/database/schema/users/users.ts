import { Schema } from 'mongoose'

export const userSchema = new Schema({
  username: {
    type: String,
    required: 'Username is required',
    unique: 'Such username exists',
    lowercase: true,
    trim: true,
    // minLength: [8, 'Username must have at least 8 characters'],
    // maxLength: [20, 'Username is too large. The maximum number of characters is 20'],
    //eslint-disable-line
    // match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, 'Username is not valid'],
    match: [/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm, 'Username is not valid'],
  },
  role: {
    type: String,
    required: true,
    enum: {
      values: ['admin', 'moderator', 'user'],
      message: '{VALUE} is not supported',
    },
  },
  email: {
    type: String,
    required: 'Email address is required',
    unique: 'Such email is registered',
    trim: true,
    lowercase: true,
    /* eslint-disable-next-line */
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    trim: true,
    required: 'Password is required',
    // minLength: [8, 'Password must have at least 8 characters'],
    // maxLength: [20, 'Password is too large. The maximum number of characters is 20'],
  },
  image: {
    type: Schema.Types.Buffer,
  },
  bio: {
    type: String,
    trim: true,
    maxLength: [256, 'Bio is too large. The maximum number of characters is 256'],
  },
  paymant: {
    type: String,
    trim: true,
    unique: 'This account is already in use',
    sparse: true,
  },
  contact: {
    type: String,
    trim: true,
    lowercase: true,
    /* eslint-disable-next-line */
    match: [/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/, 'Contact link is not valid'],
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});
