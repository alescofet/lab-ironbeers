const express = require('express');

const hbs = require('hbs');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views',__dirname+'/views');

app.use(express.static(__dirname+'/public'));

// Register the location for handlebars partials here:

hbs.registerPartials(__dirname+"/views/partials")

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then((beersFromApi) => {
    /* console.log(`Beers from the database: `, beersFromApi) */
    res.render('beers', {beer: beersFromApi});
  })
  .catch((error) => {console.log(error)})
  
});

app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then((beerRandom) => {
    console.log(`Beers from the database: `, beerRandom)
    res.render('random-beer', beerRandom[0]);
  })
  .catch((error) => {console.log(error)})
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));