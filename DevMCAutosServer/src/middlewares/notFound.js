
async function notFound(req, res, next){
    res.status(404).send('Página no encontrada');
};

module.exports = notFound