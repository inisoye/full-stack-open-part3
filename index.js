const { response } = require('express');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

/* Middleware (json-parser) used in post and put requests. Explained here: 
https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded/51844327 */
app.use(express.json());

// Create custom morgan token
morgan.token('data', (req, res) => {
  return JSON.stringify(req.body);
});
// Use morgan middleware with custom token created above
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
);

app.use(cors());

app.use(express.static('build'));

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
  response.json(persons);
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

const generateID = () => {
  // random number between 1 and 100
  return Math.floor(Math.random() * 100) + 1;
};

app.post('/api/persons', (request, response) => {
  /* Note: the post method depends on the express.json() 
called at start of script */
  const body = request.body;

  // Use length of filtered array to check if name exists
  const nameAlreadyExists = persons.filter((eachPerson) => {
    return eachPerson.name === body.name;
  }).length;

  if (!body.name) {
    return response.status(400).json({
      error: 'name is missing',
    });
  } else if (!body.number) {
    return response.status(400).json({
      error: 'number is missing',
    });
  } else if (nameAlreadyExists) {
    return response.status(400).json({
      error: 'name must be unique',
    });
  }

  const person = {
    id: generateID(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  response.json(persons);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
