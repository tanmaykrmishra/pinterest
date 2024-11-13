import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  pin: {
    //user ka description
    type: String,
    required: true,
  },
  owner: {
    //create kisne kiya
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    // On cloudinary we get id and url
    id: String,
    url: String,
  },
  comments: [
    {
      user: {
        //id
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
}, {
    timestamps: true
}
);

export const Pin = mongoose.model("Pin", schema);
