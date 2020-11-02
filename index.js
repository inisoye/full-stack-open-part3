require('dotenv').config();
const express = require('express');
const app = express();
const Person = require('./models/person');
const morgan = require('morgan');
const cors = require('cors');

app.use(express.static('build'));
/* Middleware (json-parser) used in post and put requests. Explained here: 
https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded/51844327 */
app.use(express.json());
app.use(cors());

// Create custom morgan token
morgan.token('data', (req, res) => {
  return JSON.stringify(req.body);
});
// Use morgan middleware with custom token created above
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
);

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons.map((eachPerson) => eachPerson.toJSON()));
  });
});

app.get('/info', (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
  );
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((eachPerson) => eachPerson.id === id);

  // Prevent undefined responses
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((eachPerson) => eachPerson.id !== id);

  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  /* Note: the post method depends on the express.json() 
called at start of script */
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: 'name is missing',
    });
  } else if (!body.number) {
    return response.status(400).json({
      error: 'number is missing',
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson.toJSON());
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
