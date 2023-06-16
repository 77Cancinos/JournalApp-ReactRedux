
// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch
import 'setimmediate';
import { getEnvironments } from './src/helpers/getEnvironmets';

require('dotenv').config({
    path: '.env.test'
})


jest.mock('./src/helpers/getEnvironmets', () => ({
    getEnvironments: () => ({ ...process.env })
}));

