const express = require('express');
const app = express();



app.use(express.static('./dist/web-app'));
app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: 'web-app' }
    );
});

app.listen(process.env.PORT || 8080);