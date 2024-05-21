export const productValidator = (req, res, next) => {
    const { title, description, price, thumbnail, code, stock, category } = req.body;
    if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
        res.status(404).send({ message: 'Todos los campos son obligatorios' });
    } else {
        next()
    }

}