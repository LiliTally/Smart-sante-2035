// Controller : Patients
const patientModel = require('../models/patientModel');

exports.create = async (req, res, next) => {
  try {
    const p = await patientModel.create(req.body, req.user.id);
    res.status(201).json(p);
  } catch (e) { next(e); }
};

exports.list = async (req, res, next) => {
  try {
    const { search = '', page = 1, limit = 20 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const result = await patientModel.findAll({ search, limit, offset });
    res.json({ ...result, page: Number(page), limit: Number(limit) });
  } catch (e) { next(e); }
};

exports.show = async (req, res, next) => {
  try {
    const p = await patientModel.findById(req.params.id);
    if (!p) return res.status(404).json({ error: 'Patient introuvable' });
    const history = await patientModel.getHistory(p.id);
    res.json({ patient: p, history });
  } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
  try {
    await patientModel.update(req.params.id, req.body);
    res.json({ ok: true });
  } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    await patientModel.remove(req.params.id);
    res.json({ ok: true });
  } catch (e) { next(e); }
};
