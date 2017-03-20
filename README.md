
# parent-search

 [![Support me on Patreon][badge_patreon]][patreon] [![Buy me a book][badge_amazon]][amazon] [![PayPal][badge_paypal_donate]][paypal-donations] [![Version](https://img.shields.io/npm/v/parent-search.svg)](https://www.npmjs.com/package/parent-search) [![Downloads](https://img.shields.io/npm/dt/parent-search.svg)](https://www.npmjs.com/package/parent-search)

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


## :sparkling_heart: Support my projects

I open-source almost everything I can, and I try to reply everyone needing help using these projects. Obviously,
this takes time. You can integrate and use these projects in your applications *for free*! You can even change the source code and redistribute (even resell it).

However, if you get some profit from this or just want to encourage me to continue creating stuff, there are few ways you can do it:

 - Starring and sharing the projects you like :rocket:
 - [![PayPal][badge_paypal]][paypal-donations]—You can make one-time donations via PayPal. I'll probably buy a ~~coffee~~ tea. :tea:
 - [![Support me on Patreon][badge_patreon]][patreon]—Set up a recurring monthly donation and you will get interesting news about what I'm doing (things that I don't share with everyone).
 - **Bitcoin**—You can send me bitcoins at this address (or scanning the code below): `1P9BRsmazNQcuyTxEqveUsnf5CERdq35V6`

    ![](https://i.imgur.com/z6OQI95.png)

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

[badge_patreon]: http://ionicabizau.github.io/badges/patreon.svg
[badge_amazon]: http://ionicabizau.github.io/badges/amazon.svg
[badge_paypal]: http://ionicabizau.github.io/badges/paypal.svg
[badge_paypal_donate]: http://ionicabizau.github.io/badges/paypal_donate.svg
[patreon]: https://www.patreon.com/ionicabizau
[amazon]: http://amzn.eu/hRo9sIZ
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(https%3A%2F%2Fionicabizau.net)&year=2015#license-mit
[website]: https://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
