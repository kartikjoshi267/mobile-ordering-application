module.exports = (err, req, res, next) => {
  console.error(err.stack)
  return res.status(500).json({ error: 'Internal Server Error' });
}