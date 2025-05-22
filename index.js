const express = require('express');
const { resolve } = require('path');
const app = express();
const port = 3010;

// Dummy student data (you can later replace this with a JSON file or DB)
const students = [
  {
    student_id: "1",
    name: "Alice Johnson",
    marks: {
      math: 85,
      science: 90,
      english: 78,
      history: 88,
      geography: 92
    },
    total: 433
  },
  {
    student_id: "2",
    name: "Bob Smith",
    marks: {
      math: 82,
      science: 80,
      english: 75,
      history: 85,
      geography: 88
    },
    total: 410
  },
  {
    student_id: "3",
    name: "Charlie Davis",
    marks: {
      math: 70,
      science: 72,
      english: 65,
      history: 60,
      geography: 50
    },
    total: 317
  }
];

// Middleware
app.use(express.json()); // Parse JSON body
app.use(express.static('static'));

// HTML Page
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// ✅ API: POST /students/above-threshold
app.post('/students/above-threshold', (req, res) => {
  const { threshold } = req.body;

  // Input validation
  if (typeof threshold !== 'number' || threshold < 0) {
    return res.status(400).json({ error: 'Invalid threshold. Must be a positive number.' });
  }

  // Filter students by total marks
  const result = students
    .filter(student => student.total > threshold)
    .map(student => ({ name: student.name, total: student.total }));

  res.json({
    count: result.length,
    students: result
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
