const express = require('express')
const {Client} = require('@elastic/elasticsearch');
const client = new Client({node: 'http://localhost:9200'});

const app = express()

app.get('', (req, res) => {
    // her må det fylles inn kobling til databasen

    // Her må det fylles inn noe mer
    res.json()
})


// Denne må endres. Bruker 5000 midlertidig for å ha noe å kjøre lokalt
const port = 5000

app.listen(port, () => console.log(`Server started on port ${port}`))
