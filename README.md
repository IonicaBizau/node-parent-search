# parent-search [![Support this project][donate-now]][paypal-donations]

Search files and folders in parent directories.

## Installation

```sh
$ npm i parent-search
```

## Example

```js
// Dependencies
var ParentSearch = require("parent-search");

// Search all package.json files starting with this example path
ParentSearch(__dirname + "/path/to/some/directory", "package.json", {
    multiple: true
}, function (err, data) {
    console.log(err || data);
}, function (path, dirname) {
    console.log("Found " + path.p + " in " + path.d);
});

// Search all package.json files starting with this example path
console.log(ParentSearch(__dirname + "/path/to/some/directory", "package.json", { multiple: true }));
console.log(ParentSearch(__dirname + "/path/to/some/directory", "package.json"));
console.log(ParentSearch(__dirname, "index.js", { obj: true }));
```

## Documentation

### `ParentSearch(path, search, options, callback, progress)`
Searches a file/directory in parent directories.

Having the following file structure:

```
.
├── example
│   └── some
│       └── dir
└── package.json
```

Supposing you want to find the path to the first `package.json`
file, starting with `example/some/dir`, just do
`ParentSearch("path/to/some/dir", "package.json")`

#### Params
- **String** `path`: The start directory path.
- **String** `search`: The file/directory to search.
- **Object** `options`: An object containing the following fields:
 - `multiple` (Boolean): If `true`, the search will stop only when it reaches the root directory (default: `false`).
 - `obj` (Boolean): If `true`, the results will be objects, otherwise they will be strings.
- **Function** `callback`: The callback function. If not provided, the sync version will be used instead. This is called with an error
in first argument and location object/string of the found file/directory.
- **Function** `progress`: The progress function. This is called with an object when the file/directory is found. The object contains:

 - `d`: The directory path of the found path.
 - `b`: The basename.
 - `p`: The absolute path to the file/directory.
 - `_`: The directory of searched path.

#### Return
- **Array|String|Object** The location(s) that were found.

## How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:

 - [`blah`](https://github.com/IonicaBizau/blah)

 - [`git-stats-importer`](https://github.com/IonicaBizau/git-stats-importer)

 - [`ssh-remote`](https://github.com/IonicaBizau/ssh-remote)

## License

[KINDLY][license] © [Ionică Bizău][website]

[license]: http://ionicabizau.github.io/kindly-license/?author=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica@gmail.com%3E&year=2015

[website]: http://ionicabizau.net
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md