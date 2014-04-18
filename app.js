
/**
 * Module dependencies.
 */
var http = require('http');
var util = require('util');
var express = require('express');
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


var students = [
    { name: 'Lena' },
    { name: 'Sasha ' },
    { name: 'Katia' },
    { name: 'Liza ' }
];


function fetchFromDatabase (query, callback) {
    setTimeout(function () {
        if (query !== 'students') {
            callback('Invalid query');
            return;
        }

        callback(null, students);
    }, 500);
}


app.get('/students', function (req, res, next) {
    fetchFromDatabase('students', function (err, students) {
        if (err) {
            res.send(500, { error: 'Error connecting to database'});
            return;
        }

        res.write(JSON.stringify(students));
        res.end();
    });
});

app.listen(8001);