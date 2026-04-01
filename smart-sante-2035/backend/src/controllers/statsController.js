// Controller : Statistiques + exports
const db = require('../config/db');
const triageModel = require('../models/triageModel');
const PDFDocument = require('pdfkit');
const { Parser } = require('json2csv');

exports.dashboard = async (req, res, next) => {
  try {
    const triageStats = await triageModel.stats();
    const [[patients]] = await db.query('SELECT COUNT(*) AS total FROM patients');
    const [[hospitals]] = await db.query('SELECT COUNT(*) AS total FROM hospitals');
    const [[beds]] = await db.query(
      'SELECT SUM(total_beds) AS total, SUM(available_beds) AS available FROM hospitals'
    );
    const [byRegion] = await db.query(
      `SELECT region, COUNT(*) AS total FROM patients GROUP BY region ORDER BY total DESC LIMIT 8`
    );
    const [perDay] = await db.query(
      `SELECT DATE(created_at) AS day, COUNT(*) AS total
       FROM triages WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
       GROUP BY DATE(created_at) ORDER BY day`
    );
    const occupation = beds.total > 0
      ? Math.round(((beds.total - beds.available) / beds.total) * 100)
      : 0;
    res.json({
      patients: patients.total,
      hospitals: hospitals.total,
      beds: { total: beds.total || 0, available: beds.available || 0, occupation },
      triages: triageStats,
      byRegion,
      perDay
    });
  } catch (e) { next(e); }
};

exports.exportCsv = async (req, res, next) => {
  try {
    const data = await triageModel.listAll();
    const fields = ['id','patient_name','level','score_global','status','hospital_name','created_at'];
    const parser = new Parser({ fields });
    const csv = parser.parse(data);
    res.header('Content-Type', 'text/csv');
    res.attachment('triages.csv');
    res.send(csv);
  } catch (e) { next(e); }
};

exports.exportPdf = async (req, res, next) => {
  try {
    const data = await triageModel.listAll();
    const doc = new PDFDocument({ margin: 40 });
    res.header('Content-Type', 'application/pdf');
    res.attachment('rapport-triages.pdf');
    doc.pipe(res);
    doc.fontSize(18).text('Smart Sante 2035 - Rapport des triages', { align: 'center' });
    doc.moveDown();
    doc.fontSize(10).text(`Genere le ${new Date().toLocaleString()}`);
    doc.moveDown();
    data.slice(0, 60).forEach(t => {
      doc.fontSize(11).text(
        `#${t.id} | ${t.patient_name} | ${t.level} | Score ${t.score_global} | ${t.status}`
      );
    });
    doc.end();
  } catch (e) { next(e); }
};
