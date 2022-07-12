const expresss = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/blogangular'));
app.get('/', (req, res) =>
  res.sendFile('index.html', { roo: 'dist/blogangular' }),
);

app.listen(process.PORT || 8080)
