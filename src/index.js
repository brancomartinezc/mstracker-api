import app from "./app";
import config from "./config";
import './database'

app.listen(config.PORT);

console.log('Server on port ', config.PORT);