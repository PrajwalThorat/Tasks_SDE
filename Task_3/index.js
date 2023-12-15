const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello, this is a simple calendar server!');
});

app.get('/calendar', (req, res) => {
  const { action, value, date } = req.query;

  if (!action || !value) {
    return res.status(400).send('Invalid request. Please provide action and value.');
  }

  let resultDate;

  switch (action.toLowerCase()) {
    case 'add':
      resultDate = addDays(date || new Date(), parseInt(value));
      break;
    case 'subtract':
      resultDate = subtractDays(date || new Date(), parseInt(value));
      break;
    default:
      return res.status(400).send('Invalid action. Supported actions are "add" and "subtract".');
  }

  res.send(`Result date: ${resultDate}`);
});

function addDays(date, days) {
  const resultDate = new Date(date);
  resultDate.setDate(resultDate.getDate() + days);
  return resultDate.toISOString().split('T')[0];
}

function subtractDays(date, days) {
  const resultDate = new Date(date);
  resultDate.setDate(resultDate.getDate() - days);
  return resultDate.toISOString().split('T')[0];
}

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
