const ctrl = {};
const bcrypt = require('bcryptjs')
const User = require("./src/models/User.model");
const {v4} = require('uuid')

//Routes

ctrl.home = (req, res) => {
  res.send('Hey Home')
}

ctrl.login = async (req, res) => {
    const {username, password} = req.params
    const searchUsername = await User.findOne({username})
    if (searchUsername) {
        const passwordValidator = bcrypt.compareSync(password, searchUsername.password)
        if (passwordValidator) {
            const {email, id, picture} = searchUsername
            return res.json({
                username, email, id, picture
            })
        }else{
            return res.status(404).json({
                ok: false,
                msg: 'Incorrect Password'
            })
        }
    }else {
        return res.status(404).json({
            ok: false,
            msg: 'Incorrect Username'
        })
    }
}


ctrl.register = async (req, res) => {
  console.log(req.body)
  const {username, email, password} = req.body
  const searchUsername = await User.findOne({username})
  const searchEmail = await User.findOne({email})
  if (searchUsername) {
    return res.status(406).json({
        ok:false,
        msg: "Username already taken"
    })
  }
  if (searchEmail) {
    return res.status(406).json({
        ok: false,
        msg: "Email already in use"
    })
  }
  const salt = bcrypt.genSaltSync()
  const cryptPass = bcrypt.hashSync(password, salt)

  const id = v4();
  const newUser = new User({
    username, email, password: cryptPass, id
  })
  await newUser.save()
  const picture = 'https://res.cloudinary.com/comicseries/image/upload/v1649827898/imgThumb_svogrq.png'
  res.json({username, email, id, picture})
}

module.exports = ctrl