const router = require('express').Router();
const ctrl = require('../controllers/triageController');
const auth = require('../middlewares/auth');
const requireRole = require('../middlewares/role');

router.get('/levels', ctrl.levels); // public (utilise par le mobile offline)
router.use(auth);

router.get('/', ctrl.list);
router.get('/queue', ctrl.queue);
router.post('/',
  requireRole(['COMMUNITY_AGENT','MEDICAL_STAFF','DOCTOR','HOSPITAL_ADMIN']),
  ctrl.create);
router.put('/:id/status',
  requireRole(['MEDICAL_STAFF','DOCTOR','HOSPITAL_ADMIN']),
  ctrl.updateStatus);
router.get('/:id/recommend', ctrl.recommend);

module.exports = router;
