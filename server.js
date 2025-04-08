import './dotenv-config.js';
const port = process.env.PORT || 3000;

import app from './app.js';

app.listen(port, ()=>{
    console.log(`Server is running on at http://localhost:${port}`)
});
