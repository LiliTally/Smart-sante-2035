const router = require('express').Router();
const ctrl = require('../controllers/userController');
const auth = require('../middlewares/auth');
const requireRole = require('../middlewares/role');

router.use(auth);
router.get('/', requireRole(['SYSTEM_ADMIN','REGIONAL_MANAGER']), ctrl.list);
router.get('/roles', ctrl.roles);

module.exports = router;
