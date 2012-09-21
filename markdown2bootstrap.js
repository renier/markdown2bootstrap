#!/usr/bin/env node
var argv = require('optimist').
        usage('Usage: $0 [options] <doc.md>').
        demand(1).
        boolean('n').
        describe('n', 'Turn off numbered sections').
        boolean('h').
        describe('h', 'Turn on bootstrap page header.').
        describe('title', 'Set a title for the page.').
        default('title', 'TITLE HERE').
        describe('subtitle', 'Set a subtitle for the page header.').
        default('subtitle', 'SUBTITLE HERE').
        argv,
    pagedown = require('pagedown'),
    converter = new pagedown.Converter(),
    path = require('path'),
    fs = require('fs'),
    md, levels = {}, output, nextId = 0, toc = [], tocHtml = "";

md = fs.readFileSync(argv._[0]).toString();

// Add sections
converter.hooks.set("postConversion", function(text) {
    return text.replace(/<(h(\d))>/g, function(match, p1, p2, offset, str) {
        var i, levelStr = "";

        levels[p1] = levels[p1] || 0;
        
        // Figure out section number
	if (!argv.n) {
            // reset lower levels
            for (i = Number(p2) + 1; levels["h"+i]; i++) {
                levels["h"+i] = 0;
            }
	
            // grab higher levels
            for (i = Number(p2) - 1; levels["h"+i]; i--) {
                levelStr = levels["h"+i] + "." + levelStr;
            }
        
            levels[p1] = levels[p1] + 1;
            levelStr = levelStr + levels[p1] + ". ";
        }

        // Add toc entry
        toc.push({
            levelStr: levelStr,
            id: ++nextId,
            title: str.slice(offset+4, str.slice(offset).indexOf("</h")+offset)
        });

        return "<h" + p2 + ' id="' + nextId + '">' + levelStr;
    }).replace(/<pre>/g, '<pre class="prettyprint">');
});

output = converter.makeHtml(md);

// Add table of contents
tocHtml += '<div class="span3 bs-docs-sidebar"><ul class="nav nav-list bs-docs-sidenav">';
toc.forEach(function(entry) {
    tocHtml += '<li><a href="#' + entry.id + '">' + entry.levelStr + entry.title + '</a></li>';
});
tocHtml += '</ul></div><div class="span9">';

// Bootstrap-fy
output = 
    fs.readFileSync(__dirname + "/parts/top.html").toString().replace(/{{header}}/, function() {
        if (argv.h) {
            return '<header class="jumbotron subhead" id="overview">' +
                   '<div class="container">' +
                   '<h1>' + argv.title  + '</h1>' +
                   '<p class="lead">' + argv.subtitle + '</p>' +
                   '</div></header>';
        } else {
            return "";
        }
    }).replace(/{{title}}/, argv.title === "TITLE HERE" ? "" : argv.title) +
    tocHtml +
    output +
    fs.readFileSync(__dirname + "/parts/bottom.html").toString();

console.log(output);
