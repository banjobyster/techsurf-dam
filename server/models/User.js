import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    files: [
      {
        reference: {
          type: String,
          required: true,
        },
        optimizedReference: {
          type: String,
        },
        name: {
          type: String,
          required: true,
        },
        lastModified: {
          type: Date,
          default: Date.now,
        },
        tags: [
          {
            type: String,
          },
        ],
        properties: {
          padding: {
            x: {
              type: Number,
              default: 1,
            },
            y: {
              type: Number,
              default: 1,
            },
          },
          scale: {
            x: {
              type: Number,
              default: 1,
            },
            y: {
              type: Number,
              default: 1,
            },
          },
          effects: {
            brightness: {
              type: Number,
              min: 0,
              max: 1,
              default: 1,
            },
            contrast: {
              type: Number,
              min: 0,
              max: 2,
              default: 1,
            },
            saturation: {
              type: Number,
              min: 0,
              max: 2,
              default: 1,
            },
            blur: {
              type: Number,
              min: 0,
              max: 10,
              default: 0,
            },
          },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
