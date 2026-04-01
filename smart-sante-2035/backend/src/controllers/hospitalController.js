// Controller : Hopitaux
const hospitalModel = require('../models/hospitalModel');

exports.list = async (req, res, next) => {
  try { res.json(await hospitalModel.findAll()); }
  catch (e) { next(e); }
};

exports.show = async (req, res, next) => {
  try {
    const h = await hospitalModel.findById(req.params.id);
    if (!h) return res.status(404).json({ error: 'Hopital introuvable' });
    res.json(h);
  } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
  try { res.status(201).json({ id: await hospitalModel.create(req.body) }); }
  catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
  try { await hospitalModel.update(req.params.id, req.body); res.json({ ok: true }); }
  catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try { await hospitalModel.remove(req.params.id); res.json({ ok: true }); }
  catch (e) { next(e); }
};
