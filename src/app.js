import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import authRoutes from "./routes/auth.routes";
import watchedRoutes from "./routes/watched.routes";
import toWatchRoutes from "./routes/toWatch.routes";

//app
const app = express();

//middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.json({
        message: 'mst2 api',
    })
});

//routes
app.use('/auth', authRoutes);
app.use('/watched', watchedRoutes);
app.use('/towatch', toWatchRoutes);

export default app;