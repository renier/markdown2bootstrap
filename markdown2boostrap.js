var pagedown = require('pagedown'),
    converter = new pagedown.Converter(),
    path = require('path'),
    fs = require('fs'),
    md, levels = {}, output, nextId = 0, toc = [], tocHtml = "";

if (process.argv.length < 3 || !fs.existsSync(process.argv[2])) {
    console.log("Usage: " + process.argv[0] + " " +
            path.basename(process.argv[1])  + " <filename>");
    process.exit();
}

md = fs.readFileSync(process.argv[process.argv.length-1]).toString();

// Add sections
converter.hooks.set("postConversion", function(text) {
    return text.replace(/<(h(\d))>/g, function(match, p1, p2, offset, str) {
        var i, levelStr = "";
        levels[p1] = levels[p1] || 0;
        
        // reset lower levels
        for (i = p2 + 1; levels["h"+i]; i++) {
            levels["h"+i] = 0;
        }

        // grab higher levels
        for (i = p2 - 1; levels["h"+i]; i--) {
            levelStr = levels["h"+i] + "." + levelStr;
        }
        
        levels[p1] = levels[p1] + 1;
        levelStr = levelStr + levels[p1] + ". ";

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
    fs.readFileSync("parts/top.html") +
    tocHtml +
    output +
    fs.readFileSync("parts/bottom.html");

console.log(output);
