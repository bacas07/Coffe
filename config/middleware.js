import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

export default (app) => {
    app.use(cors());
    app.use(helmet());
    app.use(morgan('dev'));
}