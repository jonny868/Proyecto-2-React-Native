const { Schema, model, default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, minlength: 6, required: true },
  email: { type: String, required: true },
  id: { type: String, required: true },
  picture: {
    type: String,
    default:
      "https://res.cloudinary.com/comicseries/image/upload/v1649827898/imgThumb_svogrq.png",
    required: true,
  },
});

//Encriptar password
UserSchema.methods.ecryptPassword = async (password) => {
  const salt = bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};

//Funcion para comparar password introducido con password de base de datos

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("user", UserSchema);
module.exports = User;
