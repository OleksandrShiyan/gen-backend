const express = require('express')

const routesRouter = require('./routes/routes.routes');
const vehicleRouter = require('./routes/vehicle.routes')

const app = express()
const port = process.env.PORT || 3500

const bodyParser = require('body-parser')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
        return res.status(200).json({})
    }
    next();
});

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/routes', routesRouter)
app.use('/api/vehicles', vehicleRouter)

app.listen(port, () => {
    console.log(`App listen on port ${port}`)
})