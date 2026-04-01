const router = require('express').Router();
const ctrl = require('../controllers/hospitalController');
const auth = require('../middlewares/auth');
const requireRole = require('../middlewares/role');

router.use(auth);
router.get('/', ctrl.list);
router.get('/:id', ctrl.show);
router.post('/', requireRole(['HOSPITAL_ADMIN','REGIONAL_MANAGER','SYSTEM_ADMIN']), ctrl.create);
router.put('/:id', requireRole(['HOSPITAL_ADMIN','REGIONAL_MANAGER','SYSTEM_ADMIN']), ctrl.update);
router.delete('/:id', requireRole(['SYSTEM_ADMIN']), ctrl.remove);

module.exports = router;
