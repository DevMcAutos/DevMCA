async function errorHandler (err, req, res, next) {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ error: err.message });
    }
    return res.status(500).json({ error: 'Error interno del servidor' });
};

module.exports = errorHandler;