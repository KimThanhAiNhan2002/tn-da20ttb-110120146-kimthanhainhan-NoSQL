import express from 'express';
import touristSpotRouter from './touristSpotRouter.js';
import accommodationRouter from './accommodationRouter.js';
import restaurantRouter from './restaurantRouter.js';
import specialtyRouter from './specialtyRouter.js';
import serviceRouter from './serviceRouter.js';
import souvenirRouter from './souvenirRouter.js';
import imageUploadRouter from './imageUpload.js'; // Import router cho việc tải lên hình ảnh
import authRouter from './auth.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const initRouter = (app) => {
    // Router cho phần xác thực
    app.use('/api/auth', authRouter);

    // Router cho các phần khác nhau
    app.use('/api/touristSpots', touristSpotRouter);
    app.use('/api/touristSpots', accommodationRouter);
    app.use('/api/touristSpots', restaurantRouter);
    app.use('/api/touristSpots', specialtyRouter);
    app.use('/api/touristSpots', serviceRouter);
    app.use('/api/touristSpots', souvenirRouter);

    app.use('/admin', authMiddleware, (req, res) => {
        res.send('Welcome to admin area');});

    // Router cho việc tải lên hình ảnh
    app.use('/api/image', imageUploadRouter);

    // Route mặc định khi không khớp với bất kỳ router nào khác
    app.use('*', (req, res) => {
        res.status(404).send('Not Found');
    });
};

export default initRouter;
