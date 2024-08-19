const express = require('express');
const holidayRoutes = require('./routes/holidayRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/api', holidayRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
