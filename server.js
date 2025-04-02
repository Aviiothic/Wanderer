const port = 8080;
import app from './app.js';


app.listen(port, ()=>{
    console.log(`Server is running on at http://localhost:${port}`)
});