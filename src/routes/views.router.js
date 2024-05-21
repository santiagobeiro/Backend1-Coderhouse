import { Router } from "express";
import { ProductManager } from '../managers/product.manager.js';

const productManager = new ProductManager('./src/data/products.json') //Instancio la clase para acceder a sus métodos

const router = Router();

router.get('/home', async (req, res) => {
    try {
        
        const limit = parseInt(req.query.limit) || 0;
        const products = await productManager.getProducts();
    
        const data = {
            limit, // Agrego el limit al parametro que recibe el handlebar para mostrarlo en el front
            limitProducts: limit > 0 ? products.slice(0, limit) : products,
            errorMessage: null,
        };
    
        res.render('home', data);
        
    } catch (error) {
        console.error('Error al obtener productos:', error);
        const data = {
            limit, // Agregamos el valor de limit al objeto de datos
            limitProducts: [],
            errorMessage: 'Error interno del servidor',
        };
        res.render('home', data);
    }      
});



router.get('/realtimeproducts', (req, res) => {
    res.render('realtimeproducts')
});
export default router; 