const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./config')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers
const rest = require('./routers/rest');

// routing
app.use('/', rest);

// start server
const PORT = process.env.PORT || config.PORT;
return app.listen(PORT, _ => console.log(`Server is running on port ${PORT}`));
