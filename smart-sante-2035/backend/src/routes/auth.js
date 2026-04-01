// Routes : Authentification
const router = require('express').Router();
const ctrl = require('../controllers/authController');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');

router.post('/register', validate({
  full_name: 'required|min:3',
  email: 'required|email',
  password: 'required|min:6',
  role_code: 'required'
}), ctrl.register);

router.post('/login', validate({
  email: 'required|email',
  password: 'required'
}), ctrl.login);

router.post('/refresh', ctrl.refresh);
router.get('/me', auth, ctrl.me);

module.exports = router;
