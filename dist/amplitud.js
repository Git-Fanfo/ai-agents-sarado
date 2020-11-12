/**
 * ai-agents-sarado
 * @version v1.0.0
 * @link https://github.com/Git-Fanfo/ai-agents-sarado#readme
 * @license ISC
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('util'), require('os'), require('events'), require('fs'), require('readline')) :
	typeof define === 'function' && define.amd ? define(['util', 'os', 'events', 'fs', 'readline'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.aiAgentsSarado = factory(global.util, global.os, global.require$$0, global.require$$1, global.require$$2));
}(this, (function (util, os, require$$0, require$$1, require$$2) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var util__default = /*#__PURE__*/_interopDefaultLegacy(util);
	var os__default = /*#__PURE__*/_interopDefaultLegacy(os);
	var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
	var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
	var require$$2__default = /*#__PURE__*/_interopDefaultLegacy(require$$2);

	function createCommonjsModule(fn, basedir, module) {
		return module = {
			path: basedir,
			exports: {},
			require: function (path, base) {
				return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
			}
		}, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	var styles_1 = createCommonjsModule(function (module) {
	  /*
	  The MIT License (MIT)
	  
	  Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)
	  
	  Permission is hereby granted, free of charge, to any person obtaining a copy
	  of this software and associated documentation files (the "Software"), to deal
	  in the Software without restriction, including without limitation the rights
	  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	  copies of the Software, and to permit persons to whom the Software is
	  furnished to do so, subject to the following conditions:
	  
	  The above copyright notice and this permission notice shall be included in
	  all copies or substantial portions of the Software.
	  
	  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	  THE SOFTWARE.
	  
	  */
	  var styles = {};
	  module['exports'] = styles;
	  var codes = {
	    reset: [0, 0],
	    bold: [1, 22],
	    dim: [2, 22],
	    italic: [3, 23],
	    underline: [4, 24],
	    inverse: [7, 27],
	    hidden: [8, 28],
	    strikethrough: [9, 29],
	    black: [30, 39],
	    red: [31, 39],
	    green: [32, 39],
	    yellow: [33, 39],
	    blue: [34, 39],
	    magenta: [35, 39],
	    cyan: [36, 39],
	    white: [37, 39],
	    gray: [90, 39],
	    grey: [90, 39],
	    brightRed: [91, 39],
	    brightGreen: [92, 39],
	    brightYellow: [93, 39],
	    brightBlue: [94, 39],
	    brightMagenta: [95, 39],
	    brightCyan: [96, 39],
	    brightWhite: [97, 39],
	    bgBlack: [40, 49],
	    bgRed: [41, 49],
	    bgGreen: [42, 49],
	    bgYellow: [43, 49],
	    bgBlue: [44, 49],
	    bgMagenta: [45, 49],
	    bgCyan: [46, 49],
	    bgWhite: [47, 49],
	    bgGray: [100, 49],
	    bgGrey: [100, 49],
	    bgBrightRed: [101, 49],
	    bgBrightGreen: [102, 49],
	    bgBrightYellow: [103, 49],
	    bgBrightBlue: [104, 49],
	    bgBrightMagenta: [105, 49],
	    bgBrightCyan: [106, 49],
	    bgBrightWhite: [107, 49],
	    // legacy styles for colors pre v1.0.0
	    blackBG: [40, 49],
	    redBG: [41, 49],
	    greenBG: [42, 49],
	    yellowBG: [43, 49],
	    blueBG: [44, 49],
	    magentaBG: [45, 49],
	    cyanBG: [46, 49],
	    whiteBG: [47, 49]
	  };
	  Object.keys(codes).forEach(function (key) {
	    var val = codes[key];
	    var style = styles[key] = [];
	    style.open = '\u001b[' + val[0] + 'm';
	    style.close = '\u001b[' + val[1] + 'm';
	  });
	});

	/*
	MIT License

	Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

	Permission is hereby granted, free of charge, to any person obtaining a copy of
	this software and associated documentation files (the "Software"), to deal in
	the Software without restriction, including without limitation the rights to
	use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
	of the Software, and to permit persons to whom the Software is furnished to do
	so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
	*/

	var hasFlag = function (flag, argv) {
	  argv = argv || process.argv;
	  var terminatorPos = argv.indexOf('--');
	  var prefix = /^-{1,2}/.test(flag) ? '' : '--';
	  var pos = argv.indexOf(prefix + flag);
	  return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
	};

	var env = process.env;
	var forceColor = void 0;

	if (hasFlag('no-color') || hasFlag('no-colors') || hasFlag('color=false')) {
	  forceColor = false;
	} else if (hasFlag('color') || hasFlag('colors') || hasFlag('color=true') || hasFlag('color=always')) {
	  forceColor = true;
	}

	if ('FORCE_COLOR' in env) {
	  forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
	}

	function translateLevel(level) {
	  if (level === 0) {
	    return false;
	  }

	  return {
	    level: level,
	    hasBasic: true,
	    has256: level >= 2,
	    has16m: level >= 3
	  };
	}

	function supportsColor(stream) {
	  if (forceColor === false) {
	    return 0;
	  }

	  if (hasFlag('color=16m') || hasFlag('color=full') || hasFlag('color=truecolor')) {
	    return 3;
	  }

	  if (hasFlag('color=256')) {
	    return 2;
	  }

	  if (stream && !stream.isTTY && forceColor !== true) {
	    return 0;
	  }

	  var min = forceColor ? 1 : 0;

	  if (process.platform === 'win32') {
	    // Node.js 7.5.0 is the first version of Node.js to include a patch to
	    // libuv that enables 256 color output on Windows. Anything earlier and it
	    // won't work. However, here we target Node.js 8 at minimum as it is an LTS
	    // release, and Node.js 7 is not. Windows 10 build 10586 is the first
	    // Windows release that supports 256 colors. Windows 10 build 14931 is the
	    // first release that supports 16m/TrueColor.
	    var osRelease = os__default['default'].release().split('.');

	    if (Number(process.versions.node.split('.')[0]) >= 8 && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
	      return Number(osRelease[2]) >= 14931 ? 3 : 2;
	    }

	    return 1;
	  }

	  if ('CI' in env) {
	    if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(function (sign) {
	      return sign in env;
	    }) || env.CI_NAME === 'codeship') {
	      return 1;
	    }

	    return min;
	  }

	  if ('TEAMCITY_VERSION' in env) {
	    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	  }

	  if ('TERM_PROGRAM' in env) {
	    var version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

	    switch (env.TERM_PROGRAM) {
	      case 'iTerm.app':
	        return version >= 3 ? 3 : 2;

	      case 'Hyper':
	        return 3;

	      case 'Apple_Terminal':
	        return 2;
	      // No default
	    }
	  }

	  if (/-256(color)?$/i.test(env.TERM)) {
	    return 2;
	  }

	  if (/^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
	    return 1;
	  }

	  if ('COLORTERM' in env) {
	    return 1;
	  }

	  if (env.TERM === 'dumb') {
	    return min;
	  }

	  return min;
	}

	function getSupportLevel(stream) {
	  var level = supportsColor(stream);
	  return translateLevel(level);
	}

	var supportsColors = {
	  supportsColor: getSupportLevel,
	  stdout: getSupportLevel(process.stdout),
	  stderr: getSupportLevel(process.stderr)
	};

	var trap = createCommonjsModule(function (module) {
	  module['exports'] = function runTheTrap(text, options) {
	    var result = '';
	    text = text || 'Run the trap, drop the bass';
	    text = text.split('');
	    var trap = {
	      a: ['\u0040', '\u0104', '\u023a', '\u0245', '\u0394', '\u039b', '\u0414'],
	      b: ['\u00df', '\u0181', '\u0243', '\u026e', '\u03b2', '\u0e3f'],
	      c: ['\u00a9', '\u023b', '\u03fe'],
	      d: ['\u00d0', '\u018a', '\u0500', '\u0501', '\u0502', '\u0503'],
	      e: ['\u00cb', '\u0115', '\u018e', '\u0258', '\u03a3', '\u03be', '\u04bc', '\u0a6c'],
	      f: ['\u04fa'],
	      g: ['\u0262'],
	      h: ['\u0126', '\u0195', '\u04a2', '\u04ba', '\u04c7', '\u050a'],
	      i: ['\u0f0f'],
	      j: ['\u0134'],
	      k: ['\u0138', '\u04a0', '\u04c3', '\u051e'],
	      l: ['\u0139'],
	      m: ['\u028d', '\u04cd', '\u04ce', '\u0520', '\u0521', '\u0d69'],
	      n: ['\u00d1', '\u014b', '\u019d', '\u0376', '\u03a0', '\u048a'],
	      o: ['\u00d8', '\u00f5', '\u00f8', '\u01fe', '\u0298', '\u047a', '\u05dd', '\u06dd', '\u0e4f'],
	      p: ['\u01f7', '\u048e'],
	      q: ['\u09cd'],
	      r: ['\u00ae', '\u01a6', '\u0210', '\u024c', '\u0280', '\u042f'],
	      s: ['\u00a7', '\u03de', '\u03df', '\u03e8'],
	      t: ['\u0141', '\u0166', '\u0373'],
	      u: ['\u01b1', '\u054d'],
	      v: ['\u05d8'],
	      w: ['\u0428', '\u0460', '\u047c', '\u0d70'],
	      x: ['\u04b2', '\u04fe', '\u04fc', '\u04fd'],
	      y: ['\u00a5', '\u04b0', '\u04cb'],
	      z: ['\u01b5', '\u0240']
	    };
	    text.forEach(function (c) {
	      c = c.toLowerCase();
	      var chars = trap[c] || [' '];
	      var rand = Math.floor(Math.random() * chars.length);

	      if (typeof trap[c] !== 'undefined') {
	        result += trap[c][rand];
	      } else {
	        result += c;
	      }
	    });
	    return result;
	  };
	});

	var zalgo = createCommonjsModule(function (module) {
	  // please no
	  module['exports'] = function zalgo(text, options) {
	    text = text || '   he is here   ';
	    var soul = {
	      'up': ['̍', '̎', '̄', '̅', '̿', '̑', '̆', '̐', '͒', '͗', '͑', '̇', '̈', '̊', '͂', '̓', '̈', '͊', '͋', '͌', '̃', '̂', '̌', '͐', '̀', '́', '̋', '̏', '̒', '̓', '̔', '̽', '̉', 'ͣ', 'ͤ', 'ͥ', 'ͦ', 'ͧ', 'ͨ', 'ͩ', 'ͪ', 'ͫ', 'ͬ', 'ͭ', 'ͮ', 'ͯ', '̾', '͛', '͆', '̚'],
	      'down': ['̖', '̗', '̘', '̙', '̜', '̝', '̞', '̟', '̠', '̤', '̥', '̦', '̩', '̪', '̫', '̬', '̭', '̮', '̯', '̰', '̱', '̲', '̳', '̹', '̺', '̻', '̼', 'ͅ', '͇', '͈', '͉', '͍', '͎', '͓', '͔', '͕', '͖', '͙', '͚', '̣'],
	      'mid': ['̕', '̛', '̀', '́', '͘', '̡', '̢', '̧', '̨', '̴', '̵', '̶', '͜', '͝', '͞', '͟', '͠', '͢', '̸', '̷', '͡', ' ҉']
	    };
	    var all = [].concat(soul.up, soul.down, soul.mid);

	    function randomNumber(range) {
	      var r = Math.floor(Math.random() * range);
	      return r;
	    }

	    function isChar(character) {
	      var bool = false;
	      all.filter(function (i) {
	        bool = i === character;
	      });
	      return bool;
	    }

	    function heComes(text, options) {
	      var result = '';
	      var counts;
	      var l;
	      options = options || {};
	      options['up'] = typeof options['up'] !== 'undefined' ? options['up'] : true;
	      options['mid'] = typeof options['mid'] !== 'undefined' ? options['mid'] : true;
	      options['down'] = typeof options['down'] !== 'undefined' ? options['down'] : true;
	      options['size'] = typeof options['size'] !== 'undefined' ? options['size'] : 'maxi';
	      text = text.split('');

	      for (l in text) {
	        if (isChar(l)) {
	          continue;
	        }

	        result = result + text[l];
	        counts = {
	          'up': 0,
	          'down': 0,
	          'mid': 0
	        };

	        switch (options.size) {
	          case 'mini':
	            counts.up = randomNumber(8);
	            counts.mid = randomNumber(2);
	            counts.down = randomNumber(8);
	            break;

	          case 'maxi':
	            counts.up = randomNumber(16) + 3;
	            counts.mid = randomNumber(4) + 1;
	            counts.down = randomNumber(64) + 3;
	            break;

	          default:
	            counts.up = randomNumber(8) + 1;
	            counts.mid = randomNumber(6) / 2;
	            counts.down = randomNumber(8) + 1;
	            break;
	        }

	        var arr = ['up', 'mid', 'down'];

	        for (var d in arr) {
	          var index = arr[d];

	          for (var i = 0; i <= counts[index]; i++) {
	            if (options[index]) {
	              result = result + soul[index][randomNumber(soul[index].length)];
	            }
	          }
	        }
	      }

	      return result;
	    } // don't summon him


	    return heComes(text, options);
	  };
	});

	var america = createCommonjsModule(function (module) {
	  module['exports'] = function (colors) {
	    return function (letter, i, exploded) {
	      if (letter === ' ') return letter;

	      switch (i % 3) {
	        case 0:
	          return colors.red(letter);

	        case 1:
	          return colors.white(letter);

	        case 2:
	          return colors.blue(letter);
	      }
	    };
	  };
	});

	var zebra = createCommonjsModule(function (module) {
	  module['exports'] = function (colors) {
	    return function (letter, i, exploded) {
	      return i % 2 === 0 ? letter : colors.inverse(letter);
	    };
	  };
	});

	var rainbow = createCommonjsModule(function (module) {
	  module['exports'] = function (colors) {
	    // RoY G BiV
	    var rainbowColors = ['red', 'yellow', 'green', 'blue', 'magenta'];
	    return function (letter, i, exploded) {
	      if (letter === ' ') {
	        return letter;
	      } else {
	        return colors[rainbowColors[i++ % rainbowColors.length]](letter);
	      }
	    };
	  };
	});

	var random = createCommonjsModule(function (module) {
	  module['exports'] = function (colors) {
	    var available = ['underline', 'inverse', 'grey', 'yellow', 'red', 'green', 'blue', 'white', 'cyan', 'magenta', 'brightYellow', 'brightRed', 'brightGreen', 'brightBlue', 'brightWhite', 'brightCyan', 'brightMagenta'];
	    return function (letter, i, exploded) {
	      return letter === ' ' ? letter : colors[available[Math.round(Math.random() * (available.length - 2))]](letter);
	    };
	  };
	});

	var colors_1 = createCommonjsModule(function (module) {
	  /*
	  
	  The MIT License (MIT)
	  
	  Original Library
	    - Copyright (c) Marak Squires
	  
	  Additional functionality
	   - Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)
	  
	  Permission is hereby granted, free of charge, to any person obtaining a copy
	  of this software and associated documentation files (the "Software"), to deal
	  in the Software without restriction, including without limitation the rights
	  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	  copies of the Software, and to permit persons to whom the Software is
	  furnished to do so, subject to the following conditions:
	  
	  The above copyright notice and this permission notice shall be included in
	  all copies or substantial portions of the Software.
	  
	  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	  THE SOFTWARE.
	  
	  */
	  var colors = {};
	  module['exports'] = colors;
	  colors.themes = {};
	  var ansiStyles = colors.styles = styles_1;
	  var defineProps = Object.defineProperties;
	  var newLineRegex = new RegExp(/[\r\n]+/g);
	  colors.supportsColor = supportsColors.supportsColor;

	  if (typeof colors.enabled === 'undefined') {
	    colors.enabled = colors.supportsColor() !== false;
	  }

	  colors.enable = function () {
	    colors.enabled = true;
	  };

	  colors.disable = function () {
	    colors.enabled = false;
	  };

	  colors.stripColors = colors.strip = function (str) {
	    return ('' + str).replace(/\x1B\[\d+m/g, '');
	  }; // eslint-disable-next-line no-unused-vars


	  var stylize = colors.stylize = function stylize(str, style) {
	    if (!colors.enabled) {
	      return str + '';
	    }

	    var styleMap = ansiStyles[style]; // Stylize should work for non-ANSI styles, too

	    if (!styleMap && style in colors) {
	      // Style maps like trap operate as functions on strings;
	      // they don't have properties like open or close.
	      return colors[style](str);
	    }

	    return styleMap.open + str + styleMap.close;
	  };

	  var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

	  var escapeStringRegexp = function (str) {
	    if (typeof str !== 'string') {
	      throw new TypeError('Expected a string');
	    }

	    return str.replace(matchOperatorsRe, '\\$&');
	  };

	  function build(_styles) {
	    var builder = function builder() {
	      return applyStyle.apply(builder, arguments);
	    };

	    builder._styles = _styles; // __proto__ is used because we must return a function, but there is
	    // no way to create a function with a different prototype.

	    builder.__proto__ = proto;
	    return builder;
	  }

	  var styles = function () {
	    var ret = {};
	    ansiStyles.grey = ansiStyles.gray;
	    Object.keys(ansiStyles).forEach(function (key) {
	      ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');
	      ret[key] = {
	        get: function () {
	          return build(this._styles.concat(key));
	        }
	      };
	    });
	    return ret;
	  }();

	  var proto = defineProps(function colors() {}, styles);

	  function applyStyle() {
	    var args = Array.prototype.slice.call(arguments);
	    var str = args.map(function (arg) {
	      // Use weak equality check so we can colorize null/undefined in safe mode
	      if (arg != null && arg.constructor === String) {
	        return arg;
	      } else {
	        return util__default['default'].inspect(arg);
	      }
	    }).join(' ');

	    if (!colors.enabled || !str) {
	      return str;
	    }

	    var newLinesPresent = str.indexOf('\n') != -1;
	    var nestedStyles = this._styles;
	    var i = nestedStyles.length;

	    while (i--) {
	      var code = ansiStyles[nestedStyles[i]];
	      str = code.open + str.replace(code.closeRe, code.open) + code.close;

	      if (newLinesPresent) {
	        str = str.replace(newLineRegex, function (match) {
	          return code.close + match + code.open;
	        });
	      }
	    }

	    return str;
	  }

	  colors.setTheme = function (theme) {
	    if (typeof theme === 'string') {
	      console.log('colors.setTheme now only accepts an object, not a string.  ' + 'If you are trying to set a theme from a file, it is now your (the ' + 'caller\'s) responsibility to require the file.  The old syntax ' + 'looked like colors.setTheme(__dirname + ' + '\'/../themes/generic-logging.js\'); The new syntax looks like ' + 'colors.setTheme(require(__dirname + ' + '\'/../themes/generic-logging.js\'));');
	      return;
	    }

	    for (var style in theme) {
	      (function (style) {
	        colors[style] = function (str) {
	          if (typeof theme[style] === 'object') {
	            var out = str;

	            for (var i in theme[style]) {
	              out = colors[theme[style][i]](out);
	            }

	            return out;
	          }

	          return colors[theme[style]](str);
	        };
	      })(style);
	    }
	  };

	  function init() {
	    var ret = {};
	    Object.keys(styles).forEach(function (name) {
	      ret[name] = {
	        get: function () {
	          return build([name]);
	        }
	      };
	    });
	    return ret;
	  }

	  var sequencer = function sequencer(map, str) {
	    var exploded = str.split('');
	    exploded = exploded.map(map);
	    return exploded.join('');
	  }; // custom formatter methods


	  colors.trap = trap;
	  colors.zalgo = zalgo; // maps

	  colors.maps = {};
	  colors.maps.america = america(colors);
	  colors.maps.zebra = zebra(colors);
	  colors.maps.rainbow = rainbow(colors);
	  colors.maps.random = random(colors);

	  for (var map in colors.maps) {
	    (function (map) {
	      colors[map] = function (str) {
	        return sequencer(colors.maps[map], str);
	      };
	    })(map);
	  }

	  defineProps(colors, init());
	});

	var extendStringPrototype = createCommonjsModule(function (module) {
	  module['exports'] = function () {
	    //
	    // Extends prototype of native string object to allow for "foo".red syntax
	    //
	    var addProperty = function (color, func) {
	      String.prototype.__defineGetter__(color, func);
	    };

	    addProperty('strip', function () {
	      return colors_1.strip(this);
	    });
	    addProperty('stripColors', function () {
	      return colors_1.strip(this);
	    });
	    addProperty('trap', function () {
	      return colors_1.trap(this);
	    });
	    addProperty('zalgo', function () {
	      return colors_1.zalgo(this);
	    });
	    addProperty('zebra', function () {
	      return colors_1.zebra(this);
	    });
	    addProperty('rainbow', function () {
	      return colors_1.rainbow(this);
	    });
	    addProperty('random', function () {
	      return colors_1.random(this);
	    });
	    addProperty('america', function () {
	      return colors_1.america(this);
	    }); //
	    // Iterate through all default styles and colors
	    //

	    var x = Object.keys(colors_1.styles);
	    x.forEach(function (style) {
	      addProperty(style, function () {
	        return colors_1.stylize(this, style);
	      });
	    });

	    function applyTheme(theme) {
	      //
	      // Remark: This is a list of methods that exist
	      // on String that you should not overwrite.
	      //
	      var stringPrototypeBlacklist = ['__defineGetter__', '__defineSetter__', '__lookupGetter__', '__lookupSetter__', 'charAt', 'constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf', 'charCodeAt', 'indexOf', 'lastIndexOf', 'length', 'localeCompare', 'match', 'repeat', 'replace', 'search', 'slice', 'split', 'substring', 'toLocaleLowerCase', 'toLocaleUpperCase', 'toLowerCase', 'toUpperCase', 'trim', 'trimLeft', 'trimRight'];
	      Object.keys(theme).forEach(function (prop) {
	        if (stringPrototypeBlacklist.indexOf(prop) !== -1) {
	          console.log('warn: '.red + ('String.prototype' + prop).magenta + ' is probably something you don\'t want to override.  ' + 'Ignoring style name');
	        } else {
	          if (typeof theme[prop] === 'string') {
	            colors_1[prop] = colors_1[theme[prop]];
	            addProperty(prop, function () {
	              return colors_1[prop](this);
	            });
	          } else {
	            var themePropApplicator = function (str) {
	              var ret = str || this;

	              for (var t = 0; t < theme[prop].length; t++) {
	                ret = colors_1[theme[prop][t]](ret);
	              }

	              return ret;
	            };

	            addProperty(prop, themePropApplicator);

	            colors_1[prop] = function (str) {
	              return themePropApplicator(str);
	            };
	          }
	        }
	      });
	    }

	    colors_1.setTheme = function (theme) {
	      if (typeof theme === 'string') {
	        console.log('colors.setTheme now only accepts an object, not a string. ' + 'If you are trying to set a theme from a file, it is now your (the ' + 'caller\'s) responsibility to require the file.  The old syntax ' + 'looked like colors.setTheme(__dirname + ' + '\'/../themes/generic-logging.js\'); The new syntax looks like ' + 'colors.setTheme(require(__dirname + ' + '\'/../themes/generic-logging.js\'));');
	        return;
	      } else {
	        applyTheme(theme);
	      }
	    };
	  };
	});

	var lib = createCommonjsModule(function (module) {
	  module['exports'] = colors_1; // Remark: By default, colors will add style properties to String.prototype.
	  //
	  // If you don't wish to extend String.prototype, you can do this instead and
	  // native String will not be touched:
	  //
	  //   var colors = require('colors/safe);
	  //   colors.red("foo")
	  //
	  //

	  extendStringPrototype();
	});

	const {
	  once
	} = require$$0__default['default'];
	const {
	  createReadStream
	} = require$$1__default['default'];
	const {
	  createInterface
	} = require$$2__default['default'];
	var box2move;
	var hash = [];

	async function processLineByLine() {
	  const arrayInput = [];
	  const level = [];
	  const positions = [];

	  try {
	    const rl = createInterface({
	      input: createReadStream(process.argv[2]),
	      crlfDelay: Infinity
	    });
	    rl.on('line', line => {
	      arrayInput.push(`${line}`); // Process the line.
	    });
	    await once(rl, 'close');

	    try {
	      console.log(lib.brightMagenta('Loading data...\n')); //Crear el maze

	      for (let i = 0; i < arrayInput.length && arrayInput[i].indexOf(',') == -1; i = 0) {
	        level.push(arrayOfArrays(i));
	        arrayInput.shift();
	      } //Crear las posiciones


	      for (let i = 0; i < arrayInput.length; i++) {
	        if (arrayInput[i] != []) {
	          positions.push(arrayOfArrays(i).map(function (x) {
	            return parseInt(x, 10);
	          }));
	        }
	      }

	      function arrayOfArrays(i) {
	        let place = [];

	        for (let j = 0; j < arrayInput[i].length; j++) {
	          if (arrayInput[i][j] != ',') {
	            place.push(arrayInput[i][j]);
	          }
	        }

	        return place;
	      }

	      console.log(lib.brightCyan('Data has been loaded succesfully\n'));
	    } catch (err) {
	      console.log(lib.brightRed('An error has ocurred loading the data: ' + err + ' \nCheck your input\n'));
	    } finally {
	      //console.log(level)
	      return [level, positions];
	    }
	  } catch (err) {
	    console.error(err);
	  }
	}

	async function fetchingData() {
	  console.log(lib.brightMagenta('\nAwaiting for data...\n'));
	  const processoFetched = await processLineByLine();
	  console.log(lib.brightMagenta('\nFetching...\n'));
	  let maze = processoFetched[0];
	  let player = processoFetched[1][0];
	  processoFetched[1].shift();
	  let boxes = processoFetched[1];
	  let goal = setGoal(maze);
	  console.log(lib.brightYellow('Entries:\n'));
	  console.log(lib.brightRed('Maze:'));
	  console.log(maze);
	  console.log(lib.brightRed('Player:'));
	  console.log(player);
	  console.log(lib.brightRed('Boxes:'));
	  console.log(boxes);
	  console.log(lib.brightRed('Goal:'));
	  console.log(goal); // De aquí para abajo estan los maravillosos Arboles

	  let root = {
	    pos: player,
	    pos_Box: boxes,
	    level: 0,
	    parent: null,
	    action: null
	  };
	  let problem = {
	    maze,
	    goal
	  };
	  var start = new Date().getTime();
	  console.log('Going wide...');
	  console.log(solve(problem, root));
	  var end = new Date().getTime();
	  var time = (end - start) / 1000;
	  console.log('time: ', time, 's');

	  function testGoal(node, problem) {
	    //console.log(problem);
	    let aux = node.pos_Box;
	    aux = aux.map(function (x) {
	      return compare(x, problem);
	    });
	    return !aux.includes(false);
	  }

	  function compare(node, problem) {
	    let psx = node[0];
	    let psy = node[1];
	    let bool = false;

	    for (let i = 0; i < problem.goal.length; i++) {
	      if (psx == problem.goal[i][0] && psy == problem.goal[i][1]) {
	        bool = true;
	      }
	    }

	    return bool;
	  }

	  function hashNodeToInt(node) {
	    let hashNum = 0;
	    hashNum += node.pos[0] + 10 * node.pos[1];

	    for (let i = 0; i < node.pos_Box.length; i++) {
	      hashNum += 100 ** (i + 1) * (node.pos_Box[i][0] + 10 * node.pos_Box[i][1]);
	    }

	    return hashNum;
	  }

	  function avoidRepeatedState(node) {
	    let hashNum = hashNodeToInt(node); //console.log(hashNum);

	    if (hash.includes(hashNum)) {
	      return false;
	    }

	    hash.push(hashNum); //console.log(hash);

	    return true;
	  }

	  function solve(problem, nodo) {
	    let solution = [];
	    let level;
	    let nodos = [];
	    let nodoEvaluado = nodo;

	    while (!testGoal(nodoEvaluado, problem)) {
	      /* console.log('\n\nnodo: ', nodoEvaluado.pos);
	      console.log(
	          'parent-action: ',
	          nodoEvaluado.parent == null ? null : nodoEvaluado.parent.action
	      );
	      console.log('action: ', nodoEvaluado.action);
	      console.log('level: ', nodoEvaluado.level, '\n');
	      if (nodoEvaluado.level > 1) {
	          console.log(
	              'parent pos: ',
	              nodoEvaluado.parent.parent.pos,
	              '\npos:        ',
	              nodoEvaluado.pos,
	              '\nparent posBox: ',
	              nodoEvaluado.parent.parent.pos_Box,
	              '\nposBox:        ',
	              nodoEvaluado.pos_Box
	          );
	          if (
	              nodoEvaluado.level > 1 &&
	              nodoEvaluado.parent.parent.pos[0] == nodoEvaluado.pos[0] &&
	              nodoEvaluado.parent.parent.pos[1] == nodoEvaluado.pos[1]
	          ) {
	              console.log('pos=parentPos');
	          }
	      } */
	      if ( // no sobre pase el límite de profundidad.
	      nodoEvaluado.level < 64 && // evite acciones repetitivas.
	      avoidRepeatedState(nodoEvaluado)) {
	        agregarNodos(problem.maze, nodoEvaluado, nodos);
	      }

	      if (nodos[0] == null) {
	        solution = 'No hay solución';
	        level = nodoEvaluado.level;
	        return {
	          solution,
	          level
	        };
	      }

	      nodoEvaluado = nodos.shift(); //console.log(nodoEvaluado);
	    }

	    level = nodoEvaluado.level;
	    trazarRuta(nodoEvaluado, solution);
	    return {
	      solution,
	      level
	    };
	  }

	  function moveBox(Boxes, box2move, side) {
	    //console.log('boxes: ', Boxes);
	    switch (side) {
	      case 'U':
	        Boxes[box2move][0]--;
	        break;

	      case 'D':
	        Boxes[box2move][0]++;
	        break;

	      case 'L':
	        Boxes[box2move][1]--;
	        break;

	      case 'R':
	        Boxes[box2move][1]++;
	        break;

	      default:
	        console.log("something's wrong with moveBox");
	        break;
	    } //console.log('boxes after move: ', Boxes);

	  }

	  function crearNodo(pos, pos_Box, level, parent, action) {
	    let node = {
	      pos: pos,
	      pos_Box: pos_Box,
	      level: level + 1,
	      parent: parent,
	      action: action
	    };
	    return node;
	  }
	  /**
	   * Se encarga de añadir los posibles caminos a seguir para una posicion en maze. En este caso toma
	   * la primera posicion, pues es la de menor costo segun nuestro BubbleSort.
	   * @param {Array} maze
	   * @param {Object} padre
	   * @param {Array} nodos
	   */


	  function agregarNodos(maze, padre, nodos) {
	    let moves = ['U', 'D', 'L', 'R'];

	    for (let i = 0; i < moves.length; i++) {
	      let canMov = canMove(maze, padre, moves[i]);

	      if (canMov > 0) {
	        let row = padre.pos[0];
	        let column = padre.pos[1];

	        switch (moves[i]) {
	          case 'U':
	            row--;
	            break;

	          case 'D':
	            row++;
	            break;

	          case 'L':
	            column--;
	            break;

	          case 'R':
	            column++;
	            break;

	          default:
	            console.log("something's wrong with the switch");
	            break;
	        }

	        let pos_Box = padre.pos_Box; // console.log(moves[i],' move : ', canMov);

	        if (canMov === 2) {
	          pos_Box = [];

	          for (let i = 0; i < padre.pos_Box.length; i++) {
	            pos_Box.push(padre.pos_Box[i].slice());
	          }

	          moveBox(pos_Box, box2move, moves[i]);
	        }

	        nodos.push(crearNodo([row, column], pos_Box, padre.level, padre, moves[i]));
	      }
	    }
	  }

	  function compareBox(paPosY, paPosX, pos_Box) {
	    for (let i = 0; i < pos_Box.length; i++) {
	      if (paPosY == pos_Box[i][0] && paPosX == pos_Box[i][1]) {
	        box2move = i;
	        return true;
	      }
	    }

	    return false;
	  }

	  function isBoxAtSide(padre, side, plusOne) {
	    //complete
	    let paPos = {
	      y: padre.pos[0],
	      x: padre.pos[1]
	    };

	    switch (side) {
	      case 'U':
	        if (compareBox(paPos.y - 1 - plusOne, paPos.x, padre.pos_Box)) {
	          return true;
	        }

	        break;

	      case 'D':
	        if (compareBox(paPos.y + 1 + plusOne, paPos.x, padre.pos_Box)) {
	          return true;
	        }

	        break;

	      case 'L':
	        if (compareBox(paPos.y, paPos.x - 1 - plusOne, padre.pos_Box)) {
	          return true;
	        }

	        break;

	      case 'R':
	        if (compareBox(paPos.y, paPos.x + 1 + plusOne, padre.pos_Box)) {
	          return true;
	        }

	        break;

	      default:
	        console.log("something's wrong with the switch");
	        break;
	    }

	    return false;
	  }

	  function isWallAtSide(maze, padre, side, plusOne) {
	    //completed
	    let paPos = {
	      y: padre.pos[0],
	      x: padre.pos[1]
	    };

	    switch (side) {
	      case 'U':
	        if (maze[paPos.y - 1 - plusOne][paPos.x] == 'W') {
	          return true;
	        }

	        break;

	      case 'D':
	        if (maze[paPos.y + 1 + plusOne][paPos.x] == 'W') {
	          return true;
	        }

	        break;

	      case 'L':
	        if (maze[paPos.y][paPos.x - 1 - plusOne] == 'W') {
	          return true;
	        }

	        break;

	      case 'R':
	        if (maze[paPos.y][paPos.x + 1 + plusOne] == 'W') {
	          return true;
	        }

	        break;

	      default:
	        console.log("something's wrong with the switch");
	        break;
	    }

	    return false;
	  }

	  function canMove(maze, padre, side) {
	    if (isBoxAtSide(padre, side, 0)) {
	      if (isWallAtSide(maze, padre, side, 1)) {
	        return 0;
	      } else if (isBoxAtSide(padre, side, 1)) {
	        return 0;
	      } else return 2;
	    } else {
	      return isWallAtSide(maze, padre, side, 0) ? 0 : 1;
	    }
	  }

	  function trazarRuta(nodo, array) {
	    //let index = nodo;
	    let posPath = []; // Crea el Array recorriendo los padres desde la hoja en la posicion 0 del Array tree

	    while (nodo.parent != null) {
	      array.unshift(nodo.action);
	      posPath.push('[' + nodo.pos + ']');
	      nodo = nodo.parent;
	    } //console.log("PosPath: " +"["+posPath+"]");

	  } //console.log(solve(problem, root));

	}

	fetchingData();

	function setGoal(maze) {
	  let goal = [];

	  for (let i = 0; i < maze.length; i++) {
	    for (let j = 0; j < maze[1].length; j++) {
	      if (maze[i][j] == 'X') {
	        goal.push([i, j]);
	      }
	    }
	  }

	  return goal;
	}
	/*
	for(var i = 0;array[i].chartAt[1] || array[i].chartAt[1] != ',';i++){
	    console.log(array[i]);
	}
	*/
	//process.argv.forEach(function (val, index, array) {
	//    console.log(index + ': ' + val);
	//  });
	//console.log('\nola estoy aqui para explicar');
	//console.log(process.argv[2]);


	var amplitud = {};

	return amplitud;

})));
