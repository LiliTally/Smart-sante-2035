// Controller : Utilisateurs (admin)
const userModel = require('../models/userModel');

exports.list = async (req, res, next) => {
  try { res.json(await userModel.listAll()); } catch (e) { next(e); }
};

exports.roles = async (req, res, next) => {
  try { res.json(await userModel.listRoles()); } catch (e) { next(e); }
};
