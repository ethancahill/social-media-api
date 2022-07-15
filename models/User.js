const { Schema, model } = require("mongoose");

const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: "You must input a username",
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: "You must enter an email",
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJson: {
      virtuals: true,
    },
    id: false,
  }
);

UserSchema.virtual("friendCount").get(function () {
    return this.friends.length
})

UserSchema.post('deleteOne', function(doc) {
    Event.remove({_id: { $in: doc.thoughts}})
})

const User = model("User", UserSchema);

module.exports = User