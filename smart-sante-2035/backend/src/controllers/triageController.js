// Controller : Triage
const triageModel = require('../models/triageModel');
const hospitalModel = require('../models/hospitalModel');
const { evaluate, LEVELS } = require('../services/triageScore');
const MaxHeap = require('../services/binaryHeap');
const { recommendHospital } = require('../services/dijkstra');
const { broadcast } = require('../sockets/notifications');

// GET /api/triage/levels - liste des niveaux (avec couleurs, descriptions)
exports.levels = (req, res) => res.json(LEVELS);

// POST /api/triage - cree un triage
exports.create = async (req, res, next) => {
  try {
    const { patient_id, score_vital, score_symptomes, score_antecedents, score_age,
            symptoms, hospital_id } = req.body;
    const { score, level } = evaluate({
      vital: score_vital, symptomes: score_symptomes,
      antecedents: score_antecedents, age: score_age
    });
    const id = await triageModel.create({
      patient_id,
      score_vital, score_symptomes, score_antecedents, score_age,
      score_global: score,
      level: level.code,
      symptoms,
      recommended_action: level.action,
      hospital_id,
      created_by: req.user.id
    });
    const triage = await triageModel.findById(id);

    // Notification temps reel pour les cas graves
    if (level.code === 'CRITIQUE' || level.code === 'TRES_URGENT') {
      broadcast('triage:urgent', {
        triage,
        message: `Nouveau cas ${level.name} : ${triage.patient_name}`
      });
    }

    res.status(201).json({ triage, score, level });
  } catch (e) { next(e); }
};

// GET /api/triage/queue - file de priorite (heap)
exports.queue = async (req, res, next) => {
  try {
    const active = await triageModel.listActive();
    // On utilise le Binary Heap pour montrer l'usage academique
    const heap = new MaxHeap();
    active.forEach(t => heap.insert({ score: Number(t.score_global), data: t }));
    const ordered = heap.toArray().map(x => x.data);
    res.json(ordered);
  } catch (e) { next(e); }
};

exports.list = async (req, res, next) => {
  try {
    res.json(await triageModel.listAll());
  } catch (e) { next(e); }
};

exports.updateStatus = async (req, res, next) => {
  try {
    await triageModel.updateStatus(req.params.id, req.body.status);
    broadcast('triage:updated', { id: Number(req.params.id), status: req.body.status });
    res.json({ ok: true });
  } catch (e) { next(e); }
};

// GET /api/triage/:id/recommend - orientation hospitaliere
exports.recommend = async (req, res, next) => {
  try {
    const triage = await triageModel.findById(req.params.id);
    if (!triage) return res.status(404).json({ error: 'Triage introuvable' });
    const hospitals = await hospitalModel.findAll();
    const routes = await hospitalModel.listRoutes();
    const sourceId = triage.hospital_id || hospitals[0].id;
    const specialty = (triage.level === 'CRITIQUE' || triage.level === 'TRES_URGENT') ? 'urgences' : null;
    const recommendations = recommendHospital(hospitals, routes, sourceId, specialty);
    res.json({ triage, recommendations });
  } catch (e) { next(e); }
};
