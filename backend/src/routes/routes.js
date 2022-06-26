const { Router } = require("express");
const { home, login, register } = require("../../controller");

const router = Router();


router.get('/', home)

router.get('/login/:username/:password', login)
router.post('/register', register)

module.exports = router