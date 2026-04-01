// Validation simple des donnees (sans librairie externe lourde)
// Utilisable comme : validate({ email: 'required|email', password: 'required|min:6' })

function validateField(value, rules) {
  for (const rule of rules.split('|')) {
    const [name, param] = rule.split(':');
    if (name === 'required' && (value === undefined || value === null || value === '')) {
      return 'champ requis';
    }
    if (value === undefined || value === null || value === '') continue;
    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value))) {
      return 'email invalide';
    }
    if (name === 'min' && String(value).length < Number(param)) {
      return `min ${param} caracteres`;
    }
    if (name === 'max' && String(value).length > Number(param)) {
      return `max ${param} caracteres`;
    }
    if (name === 'numeric' && isNaN(Number(value))) {
      return 'nombre attendu';
    }
    if (name === 'in' && !param.split(',').includes(String(value))) {
      return `valeur invalide (attendu : ${param})`;
    }
  }
  return null;
}

function validate(schema) {
  return function (req, res, next) {
    const errors = {};
    for (const field in schema) {
      const err = validateField(req.body[field], schema[field]);
      if (err) errors[field] = err;
    }
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ error: 'Validation echouee', fields: errors });
    }
    next();
  };
}

module.exports = validate;
