const router = require('express').Router();
const ctrl = require('../controllers/statsController');
const auth = require('../middlewares/auth');

router.use(auth);
router.get('/dashboard', ctrl.dashboard);
router.get('/export/csv', ctrl.exportCsv);
router.get('/export/pdf', ctrl.exportPdf);

module.exports = router;
