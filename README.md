# Installing

	$ npm install markdown2bootstrap

# Usage

	$ node_modules/.bin/markdown2bootstrap doc.md > doc.html
	$ cp -a node_modules/markdown2bootstrap/bootstrap ./

Now open `doc.html` in a web browser. You will notice that section numbers are automatically added along with a floating table of contents bootstrap-style. If you want to turn off section numbering use the `-n` option:

	$ node_modules/.bin/markdown2bootstrap -n doc.md > doc.html

You can also turn on a boostrap page header by passing `-h`. You will need to pass a title (`--title`) string and a subtitle (`--subtitle`) string:

	$ node_modules/.bin/markdown2bootstrap -h --title Documentation --subtitle "For users"  doc.md > doc.html

You can pass `--title` as an option to give the webpage a proper html title.
