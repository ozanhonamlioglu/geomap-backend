const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers
const rest = require('./routers/rest');

// routing
app.use('/', rest);

// start server
const PORT = process.env.PORT || 8888;
return app.listen(PORT, _ => console.log(`Server is running on port ${PORT}`));
