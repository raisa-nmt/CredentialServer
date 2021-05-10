const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');


let index = 0;
const dataset = [ [], [], [] ];
const servers = [];
let ds_index = [0, 0, 0];

fs.createReadStream(path.resolve(__dirname, '../csv/servers.csv')).pipe(csv()).on('data', function(data) {
    servers.push(data);
});

fs.createReadStream(path.resolve(__dirname, '../csv/set_1.csv')).pipe(csv()).on('data', function(data) {
    dataset[0].push(data);
});
fs.createReadStream(path.resolve(__dirname, '../csv/set_2.csv')).pipe(csv()).on('data', function(data) {
    dataset[1].push(data);
});
fs.createReadStream(path.resolve(__dirname, '../csv/set_3.csv')).pipe(csv()).on('data', function(data) {
    dataset[2].push(data);
});


exports.index = function (req, res) {
    const server = servers[index].NAME;
    const user = dataset[index][ds_index[index]];

    // change dataset index value
    ds_index[index]++;
    ds_index[index] = (ds_index[index] < dataset[index].length) ? ds_index[index] : 0;

    // change server index value
    index++;
    index = (index < servers.length) ? index : 0;

    res.render('index', {
        server: server,
        counter : process.env.COUNTER || 120,
        user: {
            username: user.USERNAME,
            password: user.PASSWORD,
        },
    });
};