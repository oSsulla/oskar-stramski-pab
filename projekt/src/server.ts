import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import sklepRoutes from './routes/Sklep';
import graRoutes from './routes/Gra';

const router = express();

// Łączenie z Mongo //
mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' })
.then(() => { 
    Logging.info('Połączono z MongoDB');
    StartServer();
})
.catch(error => {
    Logging.error('Nie można połączyć: ');
    Logging.error(error);
});

// Startuj serwer tylko jak MongoDB połączy się //
const StartServer = () => {
    router.use((req, res, next) => {
        // Rejestracja prośby //
        Logging.info(`Wywołana -> Metoda: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            // Rejestracja odpowiedzi //
            Logging.info(`Wywołana -> Metoda: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });

        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    // Zasady API //
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
    
        next();
    });

    // Routes //
    router.use('/sklepy', sklepRoutes);
    router.use('/gry', graRoutes)

    // Sprawdzanie stanu //
    router.get('/hello', (req, res, next) => res.status(200).json({ message: 'world' }));

    // Obsługa błędów //
    router.use((req, res, next) => {
        const error = new Error('nie znaleziono');
        
        Logging.error(error);

        return res.status(404).json({ message: error.message });
    });

    http.createServer(router).listen(config.server.port, () => Logging.info(`Serwer działa na porcie ${config.server.port}.`));
};