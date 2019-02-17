#!/usr/bin/env node
'use strict';

var lib = require('../lib'),
    fs = require('fs'),
    path = require('path'),
    json5 = require('json5'),
    yargs = require('yargs');

if (require.main === module) {
    var argv = yargs
        .demand(0)
        .usage('usage: $0 [--skin skin_file]')
        .argv;

    main(argv.skin);
}

function main(skinPath) {
    skinPath = skinPath || path.join(__dirname, '../lib/default.svg');
    skinPath = path.join(__dirname, '../lib/default.svg');
    //outputPath = outputPath || 'out.svg';
    fs.readFile(skinPath, 'utf-8', function(err, skin_data) {
        if (err) throw err;
        fs.readFile('/dev/stdin', function(err, netlist_data) {
            if (err) throw err;
            var netlist = json5.parse(netlist_data);
            lib.render(skin_data, netlist, function(err, svg_data) {
                if (err) throw err;
                //fs.writeFile(outputPath, svg_data, 'utf-8', function(err) {
                //    if (err) throw err;
                //});
                console.info(svg_data);
            });
        });
    });
}

module.exports.main = main;
