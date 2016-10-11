
# parent-search

 [![Patreon](https://img.shields.io/badge/Support%20me%20on-Patreon-%23e6461a.svg)][paypal-donations] [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![AMA](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Version](https://img.shields.io/npm/v/parent-search.svg)](https://www.npmjs.com/package/parent-search) [![Downloads](https://img.shields.io/npm/dt/parent-search.svg)](https://www.npmjs.com/package/parent-search) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> Search files and folders in parent directories.

## :cloud: Installation

```sh
$ npm i --save parent-search
```


## :clipboard: Example



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

## :memo: Documentation


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



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## :moneybag: Donations

Another way to support the development of my open-source modules is
to [set up a recurring donation, via Patreon][patreon]. :rocket:

[PayPal donations][paypal-donations] are appreciated too! Each dollar helps.

Thanks! :heart:

## :dizzy: Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:


 - [`blah`](https://github.com/IonicaBizau/blah)—A command line tool to optimize the repetitive actions.
 - [`comet-platform`](https://github.com/comet-platform/comet-platform#readme) (by Sam Vervaeck)—A platform for building awesome JavaScript applications
 - [`esf-bsc`](https://github.com/bondden/esf-bsc/blob/master/README.md) (by Denis Bondarenko)—ESF Basic class with loading/reloading configuration functionality
 - [`git-stats-importer`](https://github.com/IonicaBizau/git-stats-importer)—Imports your commits from a repository into git-stats history.
 - [`ssh-remote`](https://github.com/IonicaBizau/ssh-remote)—Automagically switch on the SSH remote url in a Git repository.

## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[patreon]: https://www.patreon.com/ionicabizau
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2015#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
