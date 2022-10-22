import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

//inital functions
import appInit from './helpers/initApp';
import startChunkingBufferCleaner from './helpers/chunkingBufferCleaner';
import startImageCleaner from './helpers/oldFilesCleaner';
import connectDB from './utils/mongo.connection.utils';

//Configs
import corsConfig from './config/corsConfig';

connectDB();
const app = express();
const port = process.env.PORT || 3001;

//Middlewares
import handleJsonError from './middlewares/JSONValidator';
//import emptyFieldsFilter from './middlewares/EmptyValuesFilter';


app.set('trust proxy', true);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors(corsConfig));
app.use(express.json({ limit: '30mb' }));
app.use('/files', express.static('files'));
app.use(handleJsonError);
//app.use(emptyFieldsFilter);


//Routes
import layoutRoutes from "./routes/layout.routes";
app.use('/layout', layoutRoutes);

import componentRoutes from "./routes/component.routes";
app.use('/component', componentRoutes);

import layoutComponentsRoutes from "./routes/layout-components.routes";
app.use('/layout-components', layoutComponentsRoutes);

import imageRoutes from "./routes/image.routes";
app.use('/image', imageRoutes);

import authRoutes from './routes/auth.routes';
app.use('/auth', authRoutes);


//App init!
startChunkingBufferCleaner();
startImageCleaner()

//Includes functions running only on first run!
appInit();

app.listen(port, () => {
    console.log(`[AppInit] App works on port: ${port}`)
});