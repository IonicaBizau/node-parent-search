// Dependencies
var IsThere = require("is-there")
  , Path = require("path")
  , Ul = require("ul")
  ;

function target(path, search) {
    var src = Path.join(path, search);
    return {
        d: Path.dirname(src)
      , b: Path.basename(path)
      , p: src
      , _: Path.dirname(path)
    };
}

/**
 * ParentSearch
 * Searches a file/directory in parent directories.
 *
 * Having the following file structure:
 *
 * ```
 * .
 * ├── example
 * │   └── some
 * │       └── dir
 * └── package.json
 * ```
 *
 * Supposing you want to find the path to the first `package.json`
 * file, starting with `example/some/dir`, just do
 * `ParentSearch("path/to/some/dir", "package.json")`
 *
 * @name ParentSearch
 * @function
 * @param {String} path The start directory path.
 * @param {String} search The file/directory to search.
 * @param {Object} options An object containing the following fields:
 *
 *  - `multiple` (Boolean): If `true`, the search will stop only when it reaches the root directory (default: `false`).
 *  - `obj` (Boolean): If `true`, the results will be objects, otherwise they will be strings.
 *
 * @param {Function} callback The callback function. If not provided,
 * the sync version will be used instead. This is called with an error
 * in first argument and location object/string of the found file/directory.
 * @param {Function} progress The progress function. This is called with an object
 * when the file/directory is found. The object contains:
 *
 *  - `d`: The directory path of the found path.
 *  - `b`: The basename.
 *  - `p`: The absolute path to the file/directory.
 *  - `_`: The directory of searched path.
 *
 * @return {Array|String|Object|null} The location(s) that were found.
 */
function ParentSearch(path, search, options, callback, progress) {

    if (typeof options === "function") {
        progress = callback;
        callback = options;
        options = {};
    }

    options = Ul.merge(options, {
        multiple: false
      , obj: false
    });

    var result = null
      , locations = []
      , trg = null
      , root = Path.parse(path).root
      ;

    function buildRes(input) {
        return options.obj ? input : input.p;
    }

    function nextSync (basepath) {
        if (basepath === root) { return null; }
        trg = target(basepath, search);
        if (IsThere(trg.p)) {
            return trg;
        } else {
            return nextSync(Path.resolve(basepath, ".."));
        }
    }

    function next (basepath, cb) {
        if (basepath === root) { return cb(null, null); }
        trg = target(basepath, search);
        IsThere(trg.p, function (exists) {
            if (exists) {
                return cb(trg);
            }
            next(trg._, cb);
        });
    }

    if (typeof callback === "function") {
        progress = progress || function () {};
    } else {
        result = nextSync(path);
        if (result === null) {
            return null;
        }
        if (options.multiple === false) {
            return buildRes(result);
        }

        do {
            locations.push(buildRes(result));
        } while ((result = nextSync(result._)) !== null);

        return locations;
    }

    function doSeq(res) {
        next(res._, function (res) {
            if (res === null) {
                callback(null, locations);
            } else {
                progress(res);
                locations.push(buildRes(res));
                doSeq(res);
            }
        });
    }

    next(path, function (result) {
        progress(result);
        if (result === null) {
            return callback(null, null);
        }
        if (options.multiple === false) {
            return callback(null, buildRes(result));
        }
        locations.push(buildRes(result));
        if (result !== null) {
            return doSeq(result);
        }
        callback(null, locations);
    });
}

module.exports = ParentSearch;
