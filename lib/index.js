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

function ParentSearch(path, search, options, callback, progress) {

    if (typeof options === "function") {
        progress = callback;
        callback = options;
        options = {};
    }

    options = Ul.merge(options, {
        multiple: false
    });

    var result = null
      , locations = []
      , trg = null
      ;

    function buildRes(input) {
        return options.obj ? input : input.p;
    }

    function nextSync (basepath) {
        if (basepath === "/") { return null; }
        trg = target(basepath, search);
        if (IsThere(trg.p)) {
            return trg;
        } else {
            return nextSync(Path.resolve(basepath, ".."));
        }
    }

    function next (basepath, cb) {
        if (basepath === "/") { return cb(null, null); }
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
        if (options.multiple === false) {
            return result;
        }

        do {
            locations.push(buildRes(result));
        } while ((result = nextSync(result._)) !== null);

        return locations;
    }

    function doSeq(res) {
        next(res._, function (res) {
            if (res === null) {
                callback(locations);
            } else {
                progress(res);
                locations.push(buildRes(res));
                doSeq(res);
            }
        });
    }

    next(path, function (result) {
        progress(result);
        if (options.multiple === false) {
            return callback(buildRes(result));
        }
        locations.push(buildRes(result));
        if (result !== null) {
            return doSeq(result);
        }
        callback(locations);
    });
}

module.exports = ParentSearch;
