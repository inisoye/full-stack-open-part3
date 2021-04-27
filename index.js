/**
 * Doesnt work in Heroku production:
 * https://stackoverflow.com/a/40138520/15063835
 */
require('dotenv').config();

const express = require('express');

const app = express();

const cors = require('cors');
const morgan = require('morgan');
const Person = require('./models/person');

app.use(cors());
app.use(express.static('build'));
/**
 * Middleware (json-parser) used in post and put requests.
 * Explained here: https://stackoverflow.com/a/51844327/15063835
 */
app.use(express.json());

// Create custom morgan token that returns the body of a request
// Explained: https://www.digitalocean.com/community/tutorials/nodejs-getting-started-morgan
morgan.token('data', (request) => {
  return JSON.stringify(request.body);
});

// Use morgan middleware with custom token created above
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get('/info', (request, response) => {
  Person.find({}).then((persons) => {
    response.send(
      `<p>Phonebook has info for ${persons.length} people</p><p>${new Date().toString()}</p>`
    );
  });
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      // Prevent undefined responses
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (request, response, next) => {
  /**
   * Note: the post method depends on the express.json()
   * json parser called at start of script
   */
  const { body } = request;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number is missing',
    });
  }

  let previousPersons;
  Person.find({}).then((persons) => {
    previousPersons = persons;
  });

  const isNameInPhonebook = previousPersons.map((person) => person.name).includes(body.name);
  if (isNameInPhonebook) {
    return response.status(409).json({
      error: 'name must be unique',
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => response.json(savedPerson))
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const { body } = request;

  const person = {
    name: body.name,
    number: body.number,
  };

  // new: true causes event handler to be called with the new modified document instead of the original
  // runValidators: true makes mongoose validators run on update operation. this is off by default
  // context: 'query' prevents a weird error. Useful link: https://github.com/Automattic/mongoose/issues/4850#issuecomment-270281618
  const updateOptions = { new: true, runValidators: true, context: 'query' };

  Person.findByIdAndUpdate(request.params.id, person, updateOptions)
    .then((updatedPerson) => {
      response.json(updatedPerson.toJSON());
    })
    .catch((error) => next(error));
});

// Middleware for handling requests with no known endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

// Middleware for handling errors
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
