const router = require('express').Router();
const ctrl = require('../controllers/patientController');
const auth = require('../middlewares/auth');
const requireRole = require('../middlewares/role');
const validate = require('../middlewares/validate');

router.use(auth);

router.get('/', ctrl.list);
router.get('/:id', ctrl.show);
router.post('/', validate({ full_name: 'required|min:2' }),
  requireRole(['COMMUNITY_AGENT','MEDICAL_STAFF','DOCTOR','HOSPITAL_ADMIN','SYSTEM_ADMIN']),
  ctrl.create);
router.put('/:id',
  requireRole(['MEDICAL_STAFF','DOCTOR','HOSPITAL_ADMIN','SYSTEM_ADMIN']),
  ctrl.update);
router.delete('/:id',
  requireRole(['DOCTOR','HOSPITAL_ADMIN','SYSTEM_ADMIN']),
  ctrl.remove);

module.exports = router;
