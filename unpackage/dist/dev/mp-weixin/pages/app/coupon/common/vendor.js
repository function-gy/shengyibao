(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/app/coupon/common/vendor"],{

/***/ 758:
/*!**********************************************************************************************!*\
  !*** /Users/gaoyang/Desktop/CODE/开放平台/tongkask-open-uni/node_modules/pure-svg-code/index.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var barcode = __webpack_require__(/*! ./barcode */ 759);
var qrcode = __webpack_require__(/*! ./qrcode */ 760);
var svg2url = __webpack_require__(/*! ./svg2url */ 761);
module.exports = {
  barcode: barcode,
  qrcode: qrcode,
  svg2url: svg2url
};

/***/ }),

/***/ 759:
/*!******************************************************************************************************!*\
  !*** /Users/gaoyang/Desktop/CODE/开放平台/tongkask-open-uni/node_modules/pure-svg-code/barcode/index.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 13);
var barcode = {
  settings: {
    width: 100,
    barWidth: 1,
    barHeight: 50,
    moduleSize: 1,
    showHRI: false,
    addQuietZone: false,
    marginHRI: 0,
    bgColor: "transparent",
    color: "#000000",
    fontSize: 12,
    output: "svg",
    posX: 0,
    posY: 0
  },
  intval: function intval(val) {
    var type = _typeof(val);
    if (type == 'string') {
      val = val.replace(/[^0-9-.]/g, "");
      val = parseInt(val * 1, 10);
      return isNaN(val) || !isFinite(val) ? 0 : val;
    }
    return type == 'number' && isFinite(val) ? Math.floor(val) : 0;
  },
  i25: {
    // std25 int25
    encoding: ["NNWWN", "WNNNW", "NWNNW", "WWNNN", "NNWNW", "WNWNN", "NWWNN", "NNNWW", "WNNWN", "NWNWN"],
    compute: function compute(code, crc, type) {
      if (!crc) {
        if (code.length % 2 != 0) code = '0' + code;
      } else {
        if (type == "int25" && code.length % 2 == 0) code = '0' + code;
        var odd = true,
          v,
          sum = 0;
        for (var i = code.length - 1; i > -1; i--) {
          v = barcode.intval(code.charAt(i));
          if (isNaN(v)) return "";
          sum += odd ? 3 * v : v;
          odd = !odd;
        }
        code += ((10 - sum % 10) % 10).toString();
      }
      return code;
    },
    getDigit: function getDigit(code, crc, type) {
      code = this.compute(code, crc, type);
      if (code == "") return "";
      result = "";
      var i, j;
      if (type == "int25") {
        // Interleaved 2 of 5

        // start
        result += "1010";

        // digits + CRC
        var c1, c2;
        for (i = 0; i < code.length / 2; i++) {
          c1 = code.charAt(2 * i);
          c2 = code.charAt(2 * i + 1);
          for (j = 0; j < 5; j++) {
            result += '1';
            if (this.encoding[c1].charAt(j) == 'W') result += '1';
            result += '0';
            if (this.encoding[c2].charAt(j) == 'W') result += '0';
          }
        }
        // stop
        result += "1101";
      } else if (type == "std25") {
        // Standard 2 of 5 is a numeric-only barcode that has been in use a long time.
        // Unlike Interleaved 2 of 5, all of the information is encoded in the bars; the spaces are fixed width and are used only to separate the bars.
        // The code is self-checking and does not include a checksum.

        // start
        result += "11011010";

        // digits + CRC
        var c;
        for (var i = 0; i < code.length; i++) {
          c = code.charAt(i);
          for (j = 0; j < 5; j++) {
            result += '1';
            if (this.encoding[c].charAt(j) == 'W') result += "11";
            result += '0';
          }
        }
        // stop
        result += "11010110";
      }
      return result;
    }
  },
  ean: {
    encoding: [["0001101", "0100111", "1110010"], ["0011001", "0110011", "1100110"], ["0010011", "0011011", "1101100"], ["0111101", "0100001", "1000010"], ["0100011", "0011101", "1011100"], ["0110001", "0111001", "1001110"], ["0101111", "0000101", "1010000"], ["0111011", "0010001", "1000100"], ["0110111", "0001001", "1001000"], ["0001011", "0010111", "1110100"]],
    first: ["000000", "001011", "001101", "001110", "010011", "011001", "011100", "010101", "010110", "011010"],
    getDigit: function getDigit(code, type) {
      // Check len (12 for ean13, 7 for ean8)
      var len = type == "ean8" ? 7 : 12;
      code = code.substring(0, len);
      if (code.length != len) return "";
      // Check each digit is numeric
      var c;
      for (var i = 0; i < code.length; i++) {
        c = code.charAt(i);
        if (c < '0' || c > '9') return "";
      }
      // get checksum
      code = this.compute(code, type);

      // process analyse
      var result = "101"; // start

      if (type == "ean8") {
        // process left part
        for (var i = 0; i < 4; i++) {
          result += this.encoding[barcode.intval(code.charAt(i))][0];
        }

        // center guard bars
        result += "01010";

        // process right part
        for (var i = 4; i < 8; i++) {
          result += this.encoding[barcode.intval(code.charAt(i))][2];
        }
      } else {
        // ean13
        // extract first digit and get sequence
        var seq = this.first[barcode.intval(code.charAt(0))];

        // process left part
        for (var i = 1; i < 7; i++) {
          result += this.encoding[barcode.intval(code.charAt(i))][barcode.intval(seq.charAt(i - 1))];
        }

        // center guard bars
        result += "01010";

        // process right part
        for (var i = 7; i < 13; i++) {
          result += this.encoding[barcode.intval(code.charAt(i))][2];
        }
      } // ean13

      result += "101"; // stop
      return result;
    },
    compute: function compute(code, type) {
      var len = type == "ean13" ? 12 : 7;
      code = code.substring(0, len);
      var sum = 0,
        odd = true;
      for (var i = code.length - 1; i > -1; i--) {
        sum += (odd ? 3 : 1) * barcode.intval(code.charAt(i));
        odd = !odd;
      }
      return code + ((10 - sum % 10) % 10).toString();
    }
  },
  upc: {
    getDigit: function getDigit(code) {
      if (code.length < 12) {
        code = '0' + code;
      }
      return barcode.ean.getDigit(code, 'ean13');
    },
    compute: function compute(code) {
      if (code.length < 12) {
        code = '0' + code;
      }
      return barcode.ean.compute(code, 'ean13').substr(1);
    }
  },
  msi: {
    encoding: ["100100100100", "100100100110", "100100110100", "100100110110", "100110100100", "100110100110", "100110110100", "100110110110", "110100100100", "110100100110"],
    compute: function compute(code, crc) {
      if (_typeof(crc) == "object") {
        if (crc.crc1 == "mod10") {
          code = this.computeMod10(code);
        } else if (crc.crc1 == "mod11") {
          code = this.computeMod11(code);
        }
        if (crc.crc2 == "mod10") {
          code = this.computeMod10(code);
        } else if (crc.crc2 == "mod11") {
          code = this.computeMod11(code);
        }
      } else if (typeof crc == "boolean") {
        if (crc) code = this.computeMod10(code);
      }
      return code;
    },
    computeMod10: function computeMod10(code) {
      var i,
        toPart1 = code.length % 2;
      var n1 = 0,
        sum = 0;
      for (i = 0; i < code.length; i++) {
        if (toPart1) {
          n1 = 10 * n1 + barcode.intval(code.charAt(i));
        } else {
          sum += barcode.intval(code.charAt(i));
        }
        toPart1 = !toPart1;
      }
      var s1 = (2 * n1).toString();
      for (i = 0; i < s1.length; i++) {
        sum += barcode.intval(s1.charAt(i));
      }
      return code + ((10 - sum % 10) % 10).toString();
    },
    computeMod11: function computeMod11(code) {
      var sum = 0,
        weight = 2;
      for (var i = code.length - 1; i >= 0; i--) {
        sum += weight * barcode.intval(code.charAt(i));
        weight = weight == 7 ? 2 : weight + 1;
      }
      return code + ((11 - sum % 11) % 11).toString();
    },
    getDigit: function getDigit(code, crc) {
      var table = "0123456789";
      var index = 0;
      var result = "";
      code = this.compute(code, false);

      // start
      result = "110";

      // digits
      for (i = 0; i < code.length; i++) {
        index = table.indexOf(code.charAt(i));
        if (index < 0) return "";
        result += this.encoding[index];
      }

      // stop
      result += "1001";
      return result;
    }
  },
  code11: {
    encoding: ["101011", "1101011", "1001011", "1100101", "1011011", "1101101", "1001101", "1010011", "1101001", "110101", "101101"],
    getDigit: function getDigit(code) {
      var table = "0123456789-";
      var i,
        index,
        result = "",
        intercharacter = '0';

      // start
      result = "1011001" + intercharacter;

      // digits
      for (i = 0; i < code.length; i++) {
        index = table.indexOf(code.charAt(i));
        if (index < 0) return "";
        result += this.encoding[index] + intercharacter;
      }

      // checksum
      var weightC = 0,
        weightSumC = 0,
        weightK = 1,
        // start at 1 because the right-most character is "C" checksum
        weightSumK = 0;
      for (i = code.length - 1; i >= 0; i--) {
        weightC = weightC == 10 ? 1 : weightC + 1;
        weightK = weightK == 10 ? 1 : weightK + 1;
        index = table.indexOf(code.charAt(i));
        weightSumC += weightC * index;
        weightSumK += weightK * index;
      }
      var c = weightSumC % 11;
      weightSumK += c;
      var k = weightSumK % 11;
      result += this.encoding[c] + intercharacter;
      if (code.length >= 10) {
        result += this.encoding[k] + intercharacter;
      }

      // stop
      result += "1011001";
      return result;
    }
  },
  code39: {
    encoding: ["101001101101", "110100101011", "101100101011", "110110010101", "101001101011", "110100110101", "101100110101", "101001011011", "110100101101", "101100101101", "110101001011", "101101001011", "110110100101", "101011001011", "110101100101", "101101100101", "101010011011", "110101001101", "101101001101", "101011001101", "110101010011", "101101010011", "110110101001", "101011010011", "110101101001", "101101101001", "101010110011", "110101011001", "101101011001", "101011011001", "110010101011", "100110101011", "110011010101", "100101101011", "110010110101", "100110110101", "100101011011", "110010101101", "100110101101", "100100100101", "100100101001", "100101001001", "101001001001", "100101101101"],
    getDigit: function getDigit(code) {
      var table = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%*";
      var i,
        index,
        result = "",
        intercharacter = '0';
      if (code.indexOf('*') >= 0) return "";

      // Add Start and Stop charactere : *
      code = ("*" + code + "*").toUpperCase();
      for (i = 0; i < code.length; i++) {
        index = table.indexOf(code.charAt(i));
        if (index < 0) return "";
        if (i > 0) result += intercharacter;
        result += this.encoding[index];
      }
      return result;
    }
  },
  code93: {
    encoding: ["100010100", "101001000", "101000100", "101000010", "100101000", "100100100", "100100010", "101010000", "100010010", "100001010", "110101000", "110100100", "110100010", "110010100", "110010010", "110001010", "101101000", "101100100", "101100010", "100110100", "100011010", "101011000", "101001100", "101000110", "100101100", "100010110", "110110100", "110110010", "110101100", "110100110", "110010110", "110011010", "101101100", "101100110", "100110110", "100111010", "100101110", "111010100", "111010010", "111001010", "101101110", "101110110", "110101110", "100100110", "111011010", "111010110", "100110010", "101011110"],
    getDigit: function getDigit(code, crc) {
      var table = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%____*",
        // _ => ($), (%), (/) et (+)
        c,
        result = "";
      if (code.indexOf('*') >= 0) return "";
      code = code.toUpperCase();

      // start :  *
      result += this.encoding[47];

      // digits
      for (i = 0; i < code.length; i++) {
        c = code.charAt(i);
        index = table.indexOf(c);
        if (c == '_' || index < 0) return "";
        result += this.encoding[index];
      }

      // checksum
      if (crc) {
        var weightC = 0,
          weightSumC = 0,
          weightK = 1,
          // start at 1 because the right-most character is "C" checksum
          weightSumK = 0;
        for (i = code.length - 1; i >= 0; i--) {
          weightC = weightC == 20 ? 1 : weightC + 1;
          weightK = weightK == 15 ? 1 : weightK + 1;
          index = table.indexOf(code.charAt(i));
          weightSumC += weightC * index;
          weightSumK += weightK * index;
        }
        var c = weightSumC % 47;
        weightSumK += c;
        var k = weightSumK % 47;
        result += this.encoding[c];
        result += this.encoding[k];
      }

      // stop : *
      result += this.encoding[47];

      // Terminaison bar
      result += '1';
      return result;
    }
  },
  code128: {
    encoding: ["11011001100", "11001101100", "11001100110", "10010011000", "10010001100", "10001001100", "10011001000", "10011000100", "10001100100", "11001001000", "11001000100", "11000100100", "10110011100", "10011011100", "10011001110", "10111001100", "10011101100", "10011100110", "11001110010", "11001011100", "11001001110", "11011100100", "11001110100", "11101101110", "11101001100", "11100101100", "11100100110", "11101100100", "11100110100", "11100110010", "11011011000", "11011000110", "11000110110", "10100011000", "10001011000", "10001000110", "10110001000", "10001101000", "10001100010", "11010001000", "11000101000", "11000100010", "10110111000", "10110001110", "10001101110", "10111011000", "10111000110", "10001110110", "11101110110", "11010001110", "11000101110", "11011101000", "11011100010", "11011101110", "11101011000", "11101000110", "11100010110", "11101101000", "11101100010", "11100011010", "11101111010", "11001000010", "11110001010", "10100110000", "10100001100", "10010110000", "10010000110", "10000101100", "10000100110", "10110010000", "10110000100", "10011010000", "10011000010", "10000110100", "10000110010", "11000010010", "11001010000", "11110111010", "11000010100", "10001111010", "10100111100", "10010111100", "10010011110", "10111100100", "10011110100", "10011110010", "11110100100", "11110010100", "11110010010", "11011011110", "11011110110", "11110110110", "10101111000", "10100011110", "10001011110", "10111101000", "10111100010", "11110101000", "11110100010", "10111011110", "10111101110", "11101011110", "11110101110", "11010000100", "11010010000", "11010011100", "11000111010"],
    getDigit: function getDigit(code) {
      var tableB = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
      var result = "";
      var sum = 0;
      var isum = 0;
      var i = 0;
      var j = 0;
      var value = 0;

      // check each characters
      for (i = 0; i < code.length; i++) {
        if (tableB.indexOf(code.charAt(i)) == -1) return "";
      }

      // check firsts characters : start with C table only if enought numeric
      var tableCActivated = code.length > 1;
      var c = '';
      for (i = 0; i < 3 && i < code.length; i++) {
        c = code.charAt(i);
        tableCActivated &= c >= '0' && c <= '9';
      }
      sum = tableCActivated ? 105 : 104;

      // start : [105] : C table or [104] : B table
      result = this.encoding[sum];
      i = 0;
      while (i < code.length) {
        if (!tableCActivated) {
          j = 0;
          // check next character to activate C table if interresting
          while (i + j < code.length && code.charAt(i + j) >= '0' && code.charAt(i + j) <= '9') {
            j++;
          }

          // 6 min everywhere or 4 mini at the end
          tableCActivated = j > 5 || i + j - 1 == code.length && j > 3;
          if (tableCActivated) {
            result += this.encoding[99]; // C table
            sum += ++isum * 99;
          }
          //         2 min for table C so need table B
        } else if (i == code.length || code.charAt(i) < '0' || code.charAt(i) > '9' || code.charAt(i + 1) < '0' || code.charAt(i + 1) > '9') {
          tableCActivated = false;
          result += this.encoding[100]; // B table
          sum += ++isum * 100;
        }
        if (tableCActivated) {
          value = barcode.intval(code.charAt(i) + code.charAt(i + 1)); // Add two characters (numeric)
          i += 2;
        } else {
          value = tableB.indexOf(code.charAt(i)); // Add one character
          i += 1;
        }
        result += this.encoding[value];
        sum += ++isum * value;
      }

      // Add CRC
      result += this.encoding[sum % 103];

      // Stop
      result += this.encoding[106];

      // Termination bar
      result += "11";
      return result;
    }
  },
  codabar: {
    encoding: ["101010011", "101011001", "101001011", "110010101", "101101001", "110101001", "100101011", "100101101", "100110101", "110100101", "101001101", "101100101", "1101011011", "1101101011", "1101101101", "1011011011", "1011001001", "1010010011", "1001001011", "1010011001"],
    getDigit: function getDigit(code) {
      var table = "0123456789-$:/.+";
      var i,
        index,
        result = "",
        intercharacter = '0';

      // add start : A->D : arbitrary choose A
      result += this.encoding[16] + intercharacter;
      for (i = 0; i < code.length; i++) {
        index = table.indexOf(code.charAt(i));
        if (index < 0) return "";
        result += this.encoding[index] + intercharacter;
      }

      // add stop : A->D : arbitrary choose A
      result += this.encoding[16];
      return result;
    }
  },
  datamatrix: {
    lengthRows: [10, 12, 14, 16, 18, 20, 22, 24, 26,
    // 24 squares et 6 rectangular
    32, 36, 40, 44, 48, 52, 64, 72, 80, 88, 96, 104, 120, 132, 144, 8, 8, 12, 12, 16, 16],
    lengthCols: [10, 12, 14, 16, 18, 20, 22, 24, 26,
    // Number of columns for the entire datamatrix
    32, 36, 40, 44, 48, 52, 64, 72, 80, 88, 96, 104, 120, 132, 144, 18, 32, 26, 36, 36, 48],
    dataCWCount: [3, 5, 8, 12, 18, 22, 30, 36,
    // Number of data codewords for the datamatrix
    44, 62, 86, 114, 144, 174, 204, 280, 368, 456, 576, 696, 816, 1050, 1304, 1558, 5, 10, 16, 22, 32, 49],
    solomonCWCount: [5, 7, 10, 12, 14, 18, 20, 24, 28,
    // Number of Reed-Solomon codewords for the datamatrix
    36, 42, 48, 56, 68, 84, 112, 144, 192, 224, 272, 336, 408, 496, 620, 7, 11, 14, 18, 24, 28],
    dataRegionRows: [8, 10, 12, 14, 16, 18, 20, 22,
    // Number of rows per region
    24, 14, 16, 18, 20, 22, 24, 14, 16, 18, 20, 22, 24, 18, 20, 22, 6, 6, 10, 10, 14, 14],
    dataRegionCols: [8, 10, 12, 14, 16, 18, 20, 22,
    // Number of columns per region
    24, 14, 16, 18, 20, 22, 24, 14, 16, 18, 20, 22, 24, 18, 20, 22, 16, 14, 24, 16, 16, 22],
    regionRows: [1, 1, 1, 1, 1, 1, 1, 1,
    // Number of regions per row
    1, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 6, 6, 6, 1, 1, 1, 1, 1, 1],
    regionCols: [1, 1, 1, 1, 1, 1, 1, 1,
    // Number of regions per column
    1, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 6, 6, 6, 1, 2, 1, 2, 2, 2],
    interleavedBlocks: [1, 1, 1, 1, 1, 1, 1, 1,
    // Number of blocks
    1, 1, 1, 1, 1, 1, 2, 2, 4, 4, 4, 4, 6, 6, 8, 8, 1, 1, 1, 1, 1, 1],
    logTab: [-255, 255, 1, 240, 2, 225, 241, 53, 3,
    // Table of log for the Galois field
    38, 226, 133, 242, 43, 54, 210, 4, 195, 39, 114, 227, 106, 134, 28, 243, 140, 44, 23, 55, 118, 211, 234, 5, 219, 196, 96, 40, 222, 115, 103, 228, 78, 107, 125, 135, 8, 29, 162, 244, 186, 141, 180, 45, 99, 24, 49, 56, 13, 119, 153, 212, 199, 235, 91, 6, 76, 220, 217, 197, 11, 97, 184, 41, 36, 223, 253, 116, 138, 104, 193, 229, 86, 79, 171, 108, 165, 126, 145, 136, 34, 9, 74, 30, 32, 163, 84, 245, 173, 187, 204, 142, 81, 181, 190, 46, 88, 100, 159, 25, 231, 50, 207, 57, 147, 14, 67, 120, 128, 154, 248, 213, 167, 200, 63, 236, 110, 92, 176, 7, 161, 77, 124, 221, 102, 218, 95, 198, 90, 12, 152, 98, 48, 185, 179, 42, 209, 37, 132, 224, 52, 254, 239, 117, 233, 139, 22, 105, 27, 194, 113, 230, 206, 87, 158, 80, 189, 172, 203, 109, 175, 166, 62, 127, 247, 146, 66, 137, 192, 35, 252, 10, 183, 75, 216, 31, 83, 33, 73, 164, 144, 85, 170, 246, 65, 174, 61, 188, 202, 205, 157, 143, 169, 82, 72, 182, 215, 191, 251, 47, 178, 89, 151, 101, 94, 160, 123, 26, 112, 232, 21, 51, 238, 208, 131, 58, 69, 148, 18, 15, 16, 68, 17, 121, 149, 129, 19, 155, 59, 249, 70, 214, 250, 168, 71, 201, 156, 64, 60, 237, 130, 111, 20, 93, 122, 177, 150],
    aLogTab: [1, 2, 4, 8, 16, 32, 64, 128, 45, 90,
    // Table of aLog for the Galois field
    180, 69, 138, 57, 114, 228, 229, 231, 227, 235, 251, 219, 155, 27, 54, 108, 216, 157, 23, 46, 92, 184, 93, 186, 89, 178, 73, 146, 9, 18, 36, 72, 144, 13, 26, 52, 104, 208, 141, 55, 110, 220, 149, 7, 14, 28, 56, 112, 224, 237, 247, 195, 171, 123, 246, 193, 175, 115, 230, 225, 239, 243, 203, 187, 91, 182, 65, 130, 41, 82, 164, 101, 202, 185, 95, 190, 81, 162, 105, 210, 137, 63, 126, 252, 213, 135, 35, 70, 140, 53, 106, 212, 133, 39, 78, 156, 21, 42, 84, 168, 125, 250, 217, 159, 19, 38, 76, 152, 29, 58, 116, 232, 253, 215, 131, 43, 86, 172, 117, 234, 249, 223, 147, 11, 22, 44, 88, 176, 77, 154, 25, 50, 100, 200, 189, 87, 174, 113, 226, 233, 255, 211, 139, 59, 118, 236, 245, 199, 163, 107, 214, 129, 47, 94, 188, 85, 170, 121, 242, 201, 191, 83, 166, 97, 194, 169, 127, 254, 209, 143, 51, 102, 204, 181, 71, 142, 49, 98, 196, 165, 103, 206, 177, 79, 158, 17, 34, 68, 136, 61, 122, 244, 197, 167, 99, 198, 161, 111, 222, 145, 15, 30, 60, 120, 240, 205, 183, 67, 134, 33, 66, 132, 37, 74, 148, 5, 10, 20, 40, 80, 160, 109, 218, 153, 31, 62, 124, 248, 221, 151, 3, 6, 12, 24, 48, 96, 192, 173, 119, 238, 241, 207, 179, 75, 150, 1],
    champGaloisMult: function champGaloisMult(a, b) {
      // MULTIPLICATION IN GALOIS FIELD GF(2^8)
      if (!a || !b) return 0;
      return this.aLogTab[(this.logTab[a] + this.logTab[b]) % 255];
    },
    champGaloisDoub: function champGaloisDoub(a, b) {
      // THE OPERATION a * 2^b IN GALOIS FIELD GF(2^8)
      if (!a) return 0;
      if (!b) return a;
      return this.aLogTab[(this.logTab[a] + b) % 255];
    },
    champGaloisSum: function champGaloisSum(a, b) {
      // SUM IN GALOIS FIELD GF(2^8)
      return a ^ b;
    },
    selectIndex: function selectIndex(dataCodeWordsCount, rectangular) {
      // CHOOSE THE GOOD INDEX FOR TABLES
      if ((dataCodeWordsCount < 1 || dataCodeWordsCount > 1558) && !rectangular) return -1;
      if ((dataCodeWordsCount < 1 || dataCodeWordsCount > 49) && rectangular) return -1;
      var n = 0;
      if (rectangular) n = 24;
      while (this.dataCWCount[n] < dataCodeWordsCount) {
        n++;
      }
      return n;
    },
    encodeDataCodeWordsASCII: function encodeDataCodeWordsASCII(text) {
      var dataCodeWords = new Array();
      var n = 0,
        i,
        c;
      for (i = 0; i < text.length; i++) {
        c = text.charCodeAt(i);
        if (c > 127) {
          dataCodeWords[n] = 235;
          c = c - 127;
          n++;
        } else if (c >= 48 && c <= 57 && i + 1 < text.length && text.charCodeAt(i + 1) >= 48 && text.charCodeAt(i + 1) <= 57) {
          c = (c - 48) * 10 + (text.charCodeAt(i + 1) - 48);
          c += 130;
          i++;
        } else c++;
        dataCodeWords[n] = c;
        n++;
      }
      return dataCodeWords;
    },
    addPadCW: function addPadCW(tab, from, to) {
      if (from >= to) return;
      tab[from] = 129;
      var r, i;
      for (i = from + 1; i < to; i++) {
        r = 149 * (i + 1) % 253 + 1;
        tab[i] = (129 + r) % 254;
      }
    },
    calculSolFactorTable: function calculSolFactorTable(solomonCWCount) {
      // CALCULATE THE REED SOLOMON FACTORS
      var g = new Array();
      var i, j;
      for (i = 0; i <= solomonCWCount; i++) {
        g[i] = 1;
      }
      for (i = 1; i <= solomonCWCount; i++) {
        for (j = i - 1; j >= 0; j--) {
          g[j] = this.champGaloisDoub(g[j], i);
          if (j > 0) g[j] = this.champGaloisSum(g[j], g[j - 1]);
        }
      }
      return g;
    },
    addReedSolomonCW: function addReedSolomonCW(nSolomonCW, coeffTab, nDataCW, dataTab, blocks) {
      // Add the Reed Solomon codewords
      var temp = 0;
      var errorBlocks = nSolomonCW / blocks;
      var correctionCW = new Array();
      var i, j, k;
      for (k = 0; k < blocks; k++) {
        for (i = 0; i < errorBlocks; i++) {
          correctionCW[i] = 0;
        }
        for (i = k; i < nDataCW; i = i + blocks) {
          temp = this.champGaloisSum(dataTab[i], correctionCW[errorBlocks - 1]);
          for (j = errorBlocks - 1; j >= 0; j--) {
            if (!temp) {
              correctionCW[j] = 0;
            } else {
              correctionCW[j] = this.champGaloisMult(temp, coeffTab[j]);
            }
            if (j > 0) correctionCW[j] = this.champGaloisSum(correctionCW[j - 1], correctionCW[j]);
          }
        }
        // Renversement des blocs calcules
        j = nDataCW + k;
        for (i = errorBlocks - 1; i >= 0; i--) {
          dataTab[j] = correctionCW[i];
          j = j + blocks;
        }
      }
      return dataTab;
    },
    getBits: function getBits(entier) {
      // Transform integer to tab of bits
      var bits = new Array();
      for (var i = 0; i < 8; i++) {
        bits[i] = entier & 128 >> i ? 1 : 0;
      }
      return bits;
    },
    next: function next(etape, totalRows, totalCols, codeWordsBits, datamatrix, assigned) {
      // Place codewords into the matrix
      var chr = 0; // Place of the 8st bit from the first character to [4][0]
      var row = 4;
      var col = 0;
      do {
        // Check for a special case of corner
        if (row == totalRows && col == 0) {
          this.patternShapeSpecial1(datamatrix, assigned, codeWordsBits[chr], totalRows, totalCols);
          chr++;
        } else if (etape < 3 && row == totalRows - 2 && col == 0 && totalCols % 4 != 0) {
          this.patternShapeSpecial2(datamatrix, assigned, codeWordsBits[chr], totalRows, totalCols);
          chr++;
        } else if (row == totalRows - 2 && col == 0 && totalCols % 8 == 4) {
          this.patternShapeSpecial3(datamatrix, assigned, codeWordsBits[chr], totalRows, totalCols);
          chr++;
        } else if (row == totalRows + 4 && col == 2 && totalCols % 8 == 0) {
          this.patternShapeSpecial4(datamatrix, assigned, codeWordsBits[chr], totalRows, totalCols);
          chr++;
        }

        // Go up and right in the datamatrix
        do {
          if (row < totalRows && col >= 0 && assigned[row][col] != 1) {
            this.patternShapeStandard(datamatrix, assigned, codeWordsBits[chr], row, col, totalRows, totalCols);
            chr++;
          }
          row -= 2;
          col += 2;
        } while (row >= 0 && col < totalCols);
        row += 1;
        col += 3;

        // Go down and left in the datamatrix
        do {
          if (row >= 0 && col < totalCols && assigned[row][col] != 1) {
            this.patternShapeStandard(datamatrix, assigned, codeWordsBits[chr], row, col, totalRows, totalCols);
            chr++;
          }
          row += 2;
          col -= 2;
        } while (row < totalRows && col >= 0);
        row += 3;
        col += 1;
      } while (row < totalRows || col < totalCols);
    },
    patternShapeStandard: function patternShapeStandard(datamatrix, assigned, bits, row, col, totalRows, totalCols) {
      // Place bits in the matrix (standard or special case)
      this.placeBitInDatamatrix(datamatrix, assigned, bits[0], row - 2, col - 2, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[1], row - 2, col - 1, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[2], row - 1, col - 2, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[3], row - 1, col - 1, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[4], row - 1, col, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[5], row, col - 2, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[6], row, col - 1, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[7], row, col, totalRows, totalCols);
    },
    patternShapeSpecial1: function patternShapeSpecial1(datamatrix, assigned, bits, totalRows, totalCols) {
      this.placeBitInDatamatrix(datamatrix, assigned, bits[0], totalRows - 1, 0, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[1], totalRows - 1, 1, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[2], totalRows - 1, 2, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[3], 0, totalCols - 2, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[4], 0, totalCols - 1, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[5], 1, totalCols - 1, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[6], 2, totalCols - 1, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[7], 3, totalCols - 1, totalRows, totalCols);
    },
    patternShapeSpecial2: function patternShapeSpecial2(datamatrix, assigned, bits, totalRows, totalCols) {
      this.placeBitInDatamatrix(datamatrix, assigned, bits[0], totalRows - 3, 0, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[1], totalRows - 2, 0, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[2], totalRows - 1, 0, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[3], 0, totalCols - 4, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[4], 0, totalCols - 3, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[5], 0, totalCols - 2, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[6], 0, totalCols - 1, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[7], 1, totalCols - 1, totalRows, totalCols);
    },
    patternShapeSpecial3: function patternShapeSpecial3(datamatrix, assigned, bits, totalRows, totalCols) {
      this.placeBitInDatamatrix(datamatrix, assigned, bits[0], totalRows - 3, 0, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[1], totalRows - 2, 0, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[2], totalRows - 1, 0, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[3], 0, totalCols - 2, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[4], 0, totalCols - 1, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[5], 1, totalCols - 1, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[6], 2, totalCols - 1, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[7], 3, totalCols - 1, totalRows, totalCols);
    },
    patternShapeSpecial4: function patternShapeSpecial4(datamatrix, assigned, bits, totalRows, totalCols) {
      this.placeBitInDatamatrix(datamatrix, assigned, bits[0], totalRows - 1, 0, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[1], totalRows - 1, totalCols - 1, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[2], 0, totalCols - 3, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[3], 0, totalCols - 2, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[4], 0, totalCols - 1, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[5], 1, totalCols - 3, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[6], 1, totalCols - 2, totalRows, totalCols);
      this.placeBitInDatamatrix(datamatrix, assigned, bits[7], 1, totalCols - 1, totalRows, totalCols);
    },
    placeBitInDatamatrix: function placeBitInDatamatrix(datamatrix, assigned, bit, row, col, totalRows, totalCols) {
      // Put a bit into the matrix
      if (row < 0) {
        row += totalRows;
        col += 4 - (totalRows + 4) % 8;
      }
      if (col < 0) {
        col += totalCols;
        row += 4 - (totalCols + 4) % 8;
      }
      if (assigned[row][col] != 1) {
        datamatrix[row][col] = bit;
        assigned[row][col] = 1;
      }
    },
    addFinderPattern: function addFinderPattern(datamatrix, rowsRegion, colsRegion, rowsRegionCW, colsRegionCW) {
      // Add the finder pattern
      var totalRowsCW = (rowsRegionCW + 2) * rowsRegion;
      var totalColsCW = (colsRegionCW + 2) * colsRegion;
      var datamatrixTemp = new Array();
      datamatrixTemp[0] = new Array();
      for (var j = 0; j < totalColsCW + 2; j++) {
        datamatrixTemp[0][j] = 0;
      }
      for (var i = 0; i < totalRowsCW; i++) {
        datamatrixTemp[i + 1] = new Array();
        datamatrixTemp[i + 1][0] = 0;
        datamatrixTemp[i + 1][totalColsCW + 1] = 0;
        for (var j = 0; j < totalColsCW; j++) {
          if (i % (rowsRegionCW + 2) == 0) {
            if (j % 2 == 0) {
              datamatrixTemp[i + 1][j + 1] = 1;
            } else {
              datamatrixTemp[i + 1][j + 1] = 0;
            }
          } else if (i % (rowsRegionCW + 2) == rowsRegionCW + 1) {
            datamatrixTemp[i + 1][j + 1] = 1;
          } else if (j % (colsRegionCW + 2) == colsRegionCW + 1) {
            if (i % 2 == 0) {
              datamatrixTemp[i + 1][j + 1] = 0;
            } else {
              datamatrixTemp[i + 1][j + 1] = 1;
            }
          } else if (j % (colsRegionCW + 2) == 0) {
            datamatrixTemp[i + 1][j + 1] = 1;
          } else {
            datamatrixTemp[i + 1][j + 1] = 0;
            datamatrixTemp[i + 1][j + 1] = datamatrix[i - 1 - 2 * parseInt(i / (rowsRegionCW + 2))][j - 1 - 2 * parseInt(j / (colsRegionCW + 2))];
          }
        }
      }
      datamatrixTemp[totalRowsCW + 1] = new Array();
      for (var j = 0; j < totalColsCW + 2; j++) {
        datamatrixTemp[totalRowsCW + 1][j] = 0;
      }
      return datamatrixTemp;
    },
    getDigit: function getDigit(text, rectangular) {
      var dataCodeWords = this.encodeDataCodeWordsASCII(text); // Code the text in the ASCII mode
      var dataCWCount = dataCodeWords.length;
      var index = this.selectIndex(dataCWCount, rectangular); // Select the index for the data tables
      var totalDataCWCount = this.dataCWCount[index]; // Number of data CW
      var solomonCWCount = this.solomonCWCount[index]; // Number of Reed Solomon CW
      var totalCWCount = totalDataCWCount + solomonCWCount; // Number of CW
      var rowsTotal = this.lengthRows[index]; // Size of symbol
      var colsTotal = this.lengthCols[index];
      var rowsRegion = this.regionRows[index]; // Number of region
      var colsRegion = this.regionCols[index];
      var rowsRegionCW = this.dataRegionRows[index];
      var colsRegionCW = this.dataRegionCols[index];
      var rowsLengthMatrice = rowsTotal - 2 * rowsRegion; // Size of matrice data
      var colsLengthMatrice = colsTotal - 2 * colsRegion;
      var blocks = this.interleavedBlocks[index]; // Number of Reed Solomon blocks
      var errorBlocks = solomonCWCount / blocks;
      this.addPadCW(dataCodeWords, dataCWCount, totalDataCWCount); // Add codewords pads

      var g = this.calculSolFactorTable(errorBlocks); // Calculate correction coefficients

      this.addReedSolomonCW(solomonCWCount, g, totalDataCWCount, dataCodeWords, blocks); // Add Reed Solomon codewords

      var codeWordsBits = new Array(); // Calculte bits from codewords
      for (var i = 0; i < totalCWCount; i++) {
        codeWordsBits[i] = this.getBits(dataCodeWords[i]);
      }
      var datamatrix = new Array(); // Put data in the matrix
      var assigned = new Array();
      for (var i = 0; i < colsLengthMatrice; i++) {
        datamatrix[i] = new Array();
        assigned[i] = new Array();
      }

      // Add the bottom-right corner if needed
      if (rowsLengthMatrice * colsLengthMatrice % 8 == 4) {
        datamatrix[rowsLengthMatrice - 2][colsLengthMatrice - 2] = 1;
        datamatrix[rowsLengthMatrice - 1][colsLengthMatrice - 1] = 1;
        datamatrix[rowsLengthMatrice - 1][colsLengthMatrice - 2] = 0;
        datamatrix[rowsLengthMatrice - 2][colsLengthMatrice - 1] = 0;
        assigned[rowsLengthMatrice - 2][colsLengthMatrice - 2] = 1;
        assigned[rowsLengthMatrice - 1][colsLengthMatrice - 1] = 1;
        assigned[rowsLengthMatrice - 1][colsLengthMatrice - 2] = 1;
        assigned[rowsLengthMatrice - 2][colsLengthMatrice - 1] = 1;
      }

      // Put the codewords into the matrix
      this.next(0, rowsLengthMatrice, colsLengthMatrice, codeWordsBits, datamatrix, assigned);

      // Add the finder pattern
      datamatrix = this.addFinderPattern(datamatrix, rowsRegion, colsRegion, rowsRegionCW, colsRegionCW);
      return datamatrix;
    }
  },
  // little endian convertor
  lec: {
    // convert an int
    cInt: function cInt(value, byteCount) {
      var le = '';
      for (var i = 0; i < byteCount; i++) {
        le += String.fromCharCode(value & 0xFF);
        value = value >> 8;
      }
      return le;
    },
    // return a byte string from rgb values
    cRgb: function cRgb(r, g, b) {
      return String.fromCharCode(b) + String.fromCharCode(g) + String.fromCharCode(r);
    },
    // return a byte string from a hex string color
    cHexColor: function cHexColor(hex) {
      var v = parseInt('0x' + hex.substr(1));
      var b = v & 0xFF;
      v = v >> 8;
      var g = v & 0xFF;
      var r = v >> 8;
      return this.cRgb(r, g, b);
    }
  },
  // convert a bit string to an array of array of bit char
  bitStringTo2DArray: function bitStringTo2DArray(digit) {
    var d = [];
    d[0] = [];
    for (var i = 0; i < digit.length; i++) {
      d[0][i] = digit.charAt(i);
    }
    return d;
  },
  // svg barcode renderer
  digitToSvgRenderer: function digitToSvgRenderer(settings, digit, hri, callback, mwi, mhi) {
    var lines = digit.length;
    var columns = digit[0].length;
    var width = settings.width;
    var mw = width / columns;
    var mh = mhi;
    var height = mh * lines;
    if (settings.showHRI) {
      var fontSize = barcode.intval(settings.fontSize);
      height += barcode.intval(settings.marginHRI) + fontSize;
    }
    // svg header
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 ' + width + ' ' + height + '">';
    if (settings.bgColor !== 'transparent') {
      // background
      svg += '<rect width="' + width + '" height="' + height + '" x="0" y="0" fill="' + settings.bgColor + '"/>';
    }
    var bar1 = '<rect width="&W" height="' + mh + '" x="&X" y="&Y" fill="' + settings.color + '"/>';
    if (settings.color === "#000000") {
      bar1 = '<rect width="&W" height="' + mh + '" x="&X" y="&Y"/>';
    }
    var len, current;
    for (var y = 0; y < lines; y++) {
      len = 0;
      current = digit[y][0];
      for (var x = 0; x < columns; x++) {
        if (current == digit[y][x]) {
          len++;
        } else {
          if (current == '1') {
            svg += bar1.replace("&W", (len * mw).toFixed(1)).replace("&X", ((x - len) * mw).toFixed(1)).replace("&Y", y * mh);
          }
          current = digit[y][x];
          len = 1;
        }
      }
      if (len > 0 && current == '1') {
        svg += bar1.replace("&W", (len * mw).toFixed(1)).replace("&X", ((columns - len) * mw).toFixed(1)).replace("&Y", (y * mh).toFixed(1));
      }
    }
    if (settings.showHRI) {
      svg += '<text transform="translate(50 0)" y="60" text-anchor="middle">' + hri + '</text>';
    }
    // svg footer
    svg += '</svg>';
    return svg;
  },
  // svg 1D barcode renderer
  digitToSvg: function digitToSvg(settings, digit, hri, callback) {
    var w = barcode.intval(settings.barWidth);
    var h = barcode.intval(settings.barHeight);
    return this.digitToSvgRenderer(settings, this.bitStringTo2DArray(digit), hri, callback, w, h);
  },
  // svg 2D barcode renderer
  digitToSvg2D: function digitToSvg2D(settings, digit, hri, callback) {
    var s = barcode.intval(settings.moduleSize);
    return this.digitToSvgRenderer(settings, digit, hri, callback, s, s);
  }
};
module.exports = function (datas, type, settings, callback) {
  var digit = "",
    hri = "",
    code = "",
    crc = true,
    rect = false,
    b2d = false;
  if (typeof datas == "string") {
    code = datas;
  } else if (_typeof(datas) == "object") {
    code = typeof datas.code == "string" ? datas.code : "";
    crc = typeof datas.crc != "undefined" ? datas.crc : true;
    rect = typeof datas.rect != "undefined" ? datas.rect : false;
  }
  if (code == "") return false;
  if (typeof settings == "undefined") settings = [];
  for (var name in barcode.settings) {
    if (settings[name] == undefined) settings[name] = barcode.settings[name];
  }
  switch (type) {
    case "std25":
    case "int25":
      digit = barcode.i25.getDigit(code, crc, type);
      hri = barcode.i25.compute(code, crc, type);
      break;
    case "ean8":
    case "ean13":
      digit = barcode.ean.getDigit(code, type);
      hri = barcode.ean.compute(code, type);
      break;
    case "upc":
      digit = barcode.upc.getDigit(code);
      hri = barcode.upc.compute(code);
      break;
    case "code11":
      digit = barcode.code11.getDigit(code);
      hri = code;
      break;
    case "code39":
      digit = barcode.code39.getDigit(code);
      hri = code;
      break;
    case "code93":
      digit = barcode.code93.getDigit(code, crc);
      hri = code;
      break;
    case "code128":
      digit = barcode.code128.getDigit(code);
      hri = code;
      break;
    case "codabar":
      digit = barcode.codabar.getDigit(code);
      hri = code;
      break;
    case "msi":
      digit = barcode.msi.getDigit(code, crc);
      hri = barcode.msi.compute(code, crc);
      break;
    case "datamatrix":
      digit = barcode.datamatrix.getDigit(code, rect);
      hri = code;
      b2d = true;
      break;
  }
  if (digit.length == 0) return false;

  // Quiet Zone
  if (!b2d && settings.addQuietZone) digit = "0000000000" + digit + "0000000000";
  var fname = 'digitTo' + settings.output.charAt(0).toUpperCase() + settings.output.substr(1) + (b2d ? '2D' : '');
  //if (typeof(barcode[fname]) == 'function' && settings.toFile === false) {
  //    return barcode[fname](settings, digit, hri, callback);
  //}else
  if (typeof barcode[fname] == 'function') {
    return barcode[fname](settings, digit, hri, callback);
  }
};

/***/ }),

/***/ 760:
/*!*****************************************************************************************************!*\
  !*** /Users/gaoyang/Desktop/CODE/开放平台/tongkask-open-uni/node_modules/pure-svg-code/qrcode/index.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function QR8bitByte(data) {
  this.mode = QRMode.MODE_8BIT_BYTE;
  this.data = data;
  this.parsedData = [];

  // Added to support UTF-8 Characters
  for (var i = 0, l = this.data.length; i < l; i++) {
    var byteArray = [];
    var code = this.data.charCodeAt(i);
    if (code > 0x10000) {
      byteArray[0] = 0xF0 | (code & 0x1C0000) >>> 18;
      byteArray[1] = 0x80 | (code & 0x3F000) >>> 12;
      byteArray[2] = 0x80 | (code & 0xFC0) >>> 6;
      byteArray[3] = 0x80 | code & 0x3F;
    } else if (code > 0x800) {
      byteArray[0] = 0xE0 | (code & 0xF000) >>> 12;
      byteArray[1] = 0x80 | (code & 0xFC0) >>> 6;
      byteArray[2] = 0x80 | code & 0x3F;
    } else if (code > 0x80) {
      byteArray[0] = 0xC0 | (code & 0x7C0) >>> 6;
      byteArray[1] = 0x80 | code & 0x3F;
    } else {
      byteArray[0] = code;
    }
    this.parsedData.push(byteArray);
  }
  this.parsedData = Array.prototype.concat.apply([], this.parsedData);
  if (this.parsedData.length != this.data.length) {
    this.parsedData.unshift(191);
    this.parsedData.unshift(187);
    this.parsedData.unshift(239);
  }
}
QR8bitByte.prototype = {
  getLength: function getLength(buffer) {
    return this.parsedData.length;
  },
  write: function write(buffer) {
    for (var i = 0, l = this.parsedData.length; i < l; i++) {
      buffer.put(this.parsedData[i], 8);
    }
  }
};
function QRCodeModel(typeNumber, errorCorrectLevel) {
  this.typeNumber = typeNumber;
  this.errorCorrectLevel = errorCorrectLevel;
  this.modules = null;
  this.moduleCount = 0;
  this.dataCache = null;
  this.dataList = [];
}
QRCodeModel.prototype = {
  addData: function addData(data) {
    var newData = new QR8bitByte(data);
    this.dataList.push(newData);
    this.dataCache = null;
  },
  isDark: function isDark(row, col) {
    if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
      throw new Error(row + "," + col);
    }
    return this.modules[row][col];
  },
  getModuleCount: function getModuleCount() {
    return this.moduleCount;
  },
  make: function make() {
    this.makeImpl(false, this.getBestMaskPattern());
  },
  makeImpl: function makeImpl(test, maskPattern) {
    this.moduleCount = this.typeNumber * 4 + 17;
    this.modules = new Array(this.moduleCount);
    for (var row = 0; row < this.moduleCount; row++) {
      this.modules[row] = new Array(this.moduleCount);
      for (var col = 0; col < this.moduleCount; col++) {
        this.modules[row][col] = null;
      }
    }
    this.setupPositionProbePattern(0, 0);
    this.setupPositionProbePattern(this.moduleCount - 7, 0);
    this.setupPositionProbePattern(0, this.moduleCount - 7);
    this.setupPositionAdjustPattern();
    this.setupTimingPattern();
    this.setupTypeInfo(test, maskPattern);
    if (this.typeNumber >= 7) {
      this.setupTypeNumber(test);
    }
    if (this.dataCache == null) {
      this.dataCache = QRCodeModel.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
    }
    this.mapData(this.dataCache, maskPattern);
  },
  setupPositionProbePattern: function setupPositionProbePattern(row, col) {
    for (var r = -1; r <= 7; r++) {
      if (row + r <= -1 || this.moduleCount <= row + r) continue;
      for (var c = -1; c <= 7; c++) {
        if (col + c <= -1 || this.moduleCount <= col + c) continue;
        if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
          this.modules[row + r][col + c] = true;
        } else {
          this.modules[row + r][col + c] = false;
        }
      }
    }
  },
  getBestMaskPattern: function getBestMaskPattern() {
    var minLostPoint = 0;
    var pattern = 0;
    for (var i = 0; i < 8; i++) {
      this.makeImpl(true, i);
      var lostPoint = QRUtil.getLostPoint(this);
      if (i == 0 || minLostPoint > lostPoint) {
        minLostPoint = lostPoint;
        pattern = i;
      }
    }
    return pattern;
  },
  createMovieClip: function createMovieClip(target_mc, instance_name, depth) {
    var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
    var cs = 1;
    this.make();
    for (var row = 0; row < this.modules.length; row++) {
      var y = row * cs;
      for (var col = 0; col < this.modules[row].length; col++) {
        var x = col * cs;
        var dark = this.modules[row][col];
        if (dark) {
          qr_mc.beginFill(0, 100);
          qr_mc.moveTo(x, y);
          qr_mc.lineTo(x + cs, y);
          qr_mc.lineTo(x + cs, y + cs);
          qr_mc.lineTo(x, y + cs);
          qr_mc.endFill();
        }
      }
    }
    return qr_mc;
  },
  setupTimingPattern: function setupTimingPattern() {
    for (var r = 8; r < this.moduleCount - 8; r++) {
      if (this.modules[r][6] != null) {
        continue;
      }
      this.modules[r][6] = r % 2 == 0;
    }
    for (var c = 8; c < this.moduleCount - 8; c++) {
      if (this.modules[6][c] != null) {
        continue;
      }
      this.modules[6][c] = c % 2 == 0;
    }
  },
  setupPositionAdjustPattern: function setupPositionAdjustPattern() {
    var pos = QRUtil.getPatternPosition(this.typeNumber);
    for (var i = 0; i < pos.length; i++) {
      for (var j = 0; j < pos.length; j++) {
        var row = pos[i];
        var col = pos[j];
        if (this.modules[row][col] != null) {
          continue;
        }
        for (var r = -2; r <= 2; r++) {
          for (var c = -2; c <= 2; c++) {
            if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) {
              this.modules[row + r][col + c] = true;
            } else {
              this.modules[row + r][col + c] = false;
            }
          }
        }
      }
    }
  },
  setupTypeNumber: function setupTypeNumber(test) {
    var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
    for (var i = 0; i < 18; i++) {
      var mod = !test && (bits >> i & 1) == 1;
      this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
    }
    for (var i = 0; i < 18; i++) {
      var mod = !test && (bits >> i & 1) == 1;
      this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
    }
  },
  setupTypeInfo: function setupTypeInfo(test, maskPattern) {
    var data = this.errorCorrectLevel << 3 | maskPattern;
    var bits = QRUtil.getBCHTypeInfo(data);
    for (var i = 0; i < 15; i++) {
      var mod = !test && (bits >> i & 1) == 1;
      if (i < 6) {
        this.modules[i][8] = mod;
      } else if (i < 8) {
        this.modules[i + 1][8] = mod;
      } else {
        this.modules[this.moduleCount - 15 + i][8] = mod;
      }
    }
    for (var i = 0; i < 15; i++) {
      var mod = !test && (bits >> i & 1) == 1;
      if (i < 8) {
        this.modules[8][this.moduleCount - i - 1] = mod;
      } else if (i < 9) {
        this.modules[8][15 - i - 1 + 1] = mod;
      } else {
        this.modules[8][15 - i - 1] = mod;
      }
    }
    this.modules[this.moduleCount - 8][8] = !test;
  },
  mapData: function mapData(data, maskPattern) {
    var inc = -1;
    var row = this.moduleCount - 1;
    var bitIndex = 7;
    var byteIndex = 0;
    for (var col = this.moduleCount - 1; col > 0; col -= 2) {
      if (col == 6) col--;
      while (true) {
        for (var c = 0; c < 2; c++) {
          if (this.modules[row][col - c] == null) {
            var dark = false;
            if (byteIndex < data.length) {
              dark = (data[byteIndex] >>> bitIndex & 1) == 1;
            }
            var mask = QRUtil.getMask(maskPattern, row, col - c);
            if (mask) {
              dark = !dark;
            }
            this.modules[row][col - c] = dark;
            bitIndex--;
            if (bitIndex == -1) {
              byteIndex++;
              bitIndex = 7;
            }
          }
        }
        row += inc;
        if (row < 0 || this.moduleCount <= row) {
          row -= inc;
          inc = -inc;
          break;
        }
      }
    }
  }
};
QRCodeModel.PAD0 = 0xEC;
QRCodeModel.PAD1 = 0x11;
QRCodeModel.createData = function (typeNumber, errorCorrectLevel, dataList) {
  var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
  var buffer = new QRBitBuffer();
  for (var i = 0; i < dataList.length; i++) {
    var data = dataList[i];
    buffer.put(data.mode, 4);
    buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
    data.write(buffer);
  }
  var totalDataCount = 0;
  for (var i = 0; i < rsBlocks.length; i++) {
    totalDataCount += rsBlocks[i].dataCount;
  }
  if (buffer.getLengthInBits() > totalDataCount * 8) {
    throw new Error("code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")");
  }
  if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
    buffer.put(0, 4);
  }
  while (buffer.getLengthInBits() % 8 != 0) {
    buffer.putBit(false);
  }
  while (true) {
    if (buffer.getLengthInBits() >= totalDataCount * 8) {
      break;
    }
    buffer.put(QRCodeModel.PAD0, 8);
    if (buffer.getLengthInBits() >= totalDataCount * 8) {
      break;
    }
    buffer.put(QRCodeModel.PAD1, 8);
  }
  return QRCodeModel.createBytes(buffer, rsBlocks);
};
QRCodeModel.createBytes = function (buffer, rsBlocks) {
  var offset = 0;
  var maxDcCount = 0;
  var maxEcCount = 0;
  var dcdata = new Array(rsBlocks.length);
  var ecdata = new Array(rsBlocks.length);
  for (var r = 0; r < rsBlocks.length; r++) {
    var dcCount = rsBlocks[r].dataCount;
    var ecCount = rsBlocks[r].totalCount - dcCount;
    maxDcCount = Math.max(maxDcCount, dcCount);
    maxEcCount = Math.max(maxEcCount, ecCount);
    dcdata[r] = new Array(dcCount);
    for (var i = 0; i < dcdata[r].length; i++) {
      dcdata[r][i] = 0xff & buffer.buffer[i + offset];
    }
    offset += dcCount;
    var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
    var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
    var modPoly = rawPoly.mod(rsPoly);
    ecdata[r] = new Array(rsPoly.getLength() - 1);
    for (var i = 0; i < ecdata[r].length; i++) {
      var modIndex = i + modPoly.getLength() - ecdata[r].length;
      ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
    }
  }
  var totalCodeCount = 0;
  for (var i = 0; i < rsBlocks.length; i++) {
    totalCodeCount += rsBlocks[i].totalCount;
  }
  var data = new Array(totalCodeCount);
  var index = 0;
  for (var i = 0; i < maxDcCount; i++) {
    for (var r = 0; r < rsBlocks.length; r++) {
      if (i < dcdata[r].length) {
        data[index++] = dcdata[r][i];
      }
    }
  }
  for (var i = 0; i < maxEcCount; i++) {
    for (var r = 0; r < rsBlocks.length; r++) {
      if (i < ecdata[r].length) {
        data[index++] = ecdata[r][i];
      }
    }
  }
  return data;
};
var QRMode = {
  MODE_NUMBER: 1 << 0,
  MODE_ALPHA_NUM: 1 << 1,
  MODE_8BIT_BYTE: 1 << 2,
  MODE_KANJI: 1 << 3
};
var QRErrorCorrectLevel = {
  L: 1,
  M: 0,
  Q: 3,
  H: 2
};
var QRMaskPattern = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7
};
var QRUtil = {
  PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
  G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
  G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
  G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,
  getBCHTypeInfo: function getBCHTypeInfo(data) {
    var d = data << 10;
    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
      d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
    }
    return (data << 10 | d) ^ QRUtil.G15_MASK;
  },
  getBCHTypeNumber: function getBCHTypeNumber(data) {
    var d = data << 12;
    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
      d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
    }
    return data << 12 | d;
  },
  getBCHDigit: function getBCHDigit(data) {
    var digit = 0;
    while (data != 0) {
      digit++;
      data >>>= 1;
    }
    return digit;
  },
  getPatternPosition: function getPatternPosition(typeNumber) {
    return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
  },
  getMask: function getMask(maskPattern, i, j) {
    switch (maskPattern) {
      case QRMaskPattern.PATTERN000:
        return (i + j) % 2 == 0;
      case QRMaskPattern.PATTERN001:
        return i % 2 == 0;
      case QRMaskPattern.PATTERN010:
        return j % 3 == 0;
      case QRMaskPattern.PATTERN011:
        return (i + j) % 3 == 0;
      case QRMaskPattern.PATTERN100:
        return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
      case QRMaskPattern.PATTERN101:
        return i * j % 2 + i * j % 3 == 0;
      case QRMaskPattern.PATTERN110:
        return (i * j % 2 + i * j % 3) % 2 == 0;
      case QRMaskPattern.PATTERN111:
        return (i * j % 3 + (i + j) % 2) % 2 == 0;
      default:
        throw new Error("bad maskPattern:" + maskPattern);
    }
  },
  getErrorCorrectPolynomial: function getErrorCorrectPolynomial(errorCorrectLength) {
    var a = new QRPolynomial([1], 0);
    for (var i = 0; i < errorCorrectLength; i++) {
      a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
    }
    return a;
  },
  getLengthInBits: function getLengthInBits(mode, type) {
    if (1 <= type && type < 10) {
      switch (mode) {
        case QRMode.MODE_NUMBER:
          return 10;
        case QRMode.MODE_ALPHA_NUM:
          return 9;
        case QRMode.MODE_8BIT_BYTE:
          return 8;
        case QRMode.MODE_KANJI:
          return 8;
        default:
          throw new Error("mode:" + mode);
      }
    } else if (type < 27) {
      switch (mode) {
        case QRMode.MODE_NUMBER:
          return 12;
        case QRMode.MODE_ALPHA_NUM:
          return 11;
        case QRMode.MODE_8BIT_BYTE:
          return 16;
        case QRMode.MODE_KANJI:
          return 10;
        default:
          throw new Error("mode:" + mode);
      }
    } else if (type < 41) {
      switch (mode) {
        case QRMode.MODE_NUMBER:
          return 14;
        case QRMode.MODE_ALPHA_NUM:
          return 13;
        case QRMode.MODE_8BIT_BYTE:
          return 16;
        case QRMode.MODE_KANJI:
          return 12;
        default:
          throw new Error("mode:" + mode);
      }
    } else {
      throw new Error("type:" + type);
    }
  },
  getLostPoint: function getLostPoint(qrCode) {
    var moduleCount = qrCode.getModuleCount();
    var lostPoint = 0;
    for (var row = 0; row < moduleCount; row++) {
      for (var col = 0; col < moduleCount; col++) {
        var sameCount = 0;
        var dark = qrCode.isDark(row, col);
        for (var r = -1; r <= 1; r++) {
          if (row + r < 0 || moduleCount <= row + r) {
            continue;
          }
          for (var c = -1; c <= 1; c++) {
            if (col + c < 0 || moduleCount <= col + c) {
              continue;
            }
            if (r == 0 && c == 0) {
              continue;
            }
            if (dark == qrCode.isDark(row + r, col + c)) {
              sameCount++;
            }
          }
        }
        if (sameCount > 5) {
          lostPoint += 3 + sameCount - 5;
        }
      }
    }
    for (var row = 0; row < moduleCount - 1; row++) {
      for (var col = 0; col < moduleCount - 1; col++) {
        var count = 0;
        if (qrCode.isDark(row, col)) count++;
        if (qrCode.isDark(row + 1, col)) count++;
        if (qrCode.isDark(row, col + 1)) count++;
        if (qrCode.isDark(row + 1, col + 1)) count++;
        if (count == 0 || count == 4) {
          lostPoint += 3;
        }
      }
    }
    for (var row = 0; row < moduleCount; row++) {
      for (var col = 0; col < moduleCount - 6; col++) {
        if (qrCode.isDark(row, col) && !qrCode.isDark(row, col + 1) && qrCode.isDark(row, col + 2) && qrCode.isDark(row, col + 3) && qrCode.isDark(row, col + 4) && !qrCode.isDark(row, col + 5) && qrCode.isDark(row, col + 6)) {
          lostPoint += 40;
        }
      }
    }
    for (var col = 0; col < moduleCount; col++) {
      for (var row = 0; row < moduleCount - 6; row++) {
        if (qrCode.isDark(row, col) && !qrCode.isDark(row + 1, col) && qrCode.isDark(row + 2, col) && qrCode.isDark(row + 3, col) && qrCode.isDark(row + 4, col) && !qrCode.isDark(row + 5, col) && qrCode.isDark(row + 6, col)) {
          lostPoint += 40;
        }
      }
    }
    var darkCount = 0;
    for (var col = 0; col < moduleCount; col++) {
      for (var row = 0; row < moduleCount; row++) {
        if (qrCode.isDark(row, col)) {
          darkCount++;
        }
      }
    }
    var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
    lostPoint += ratio * 10;
    return lostPoint;
  }
};
var QRMath = {
  glog: function glog(n) {
    if (n < 1) {
      throw new Error("glog(" + n + ")");
    }
    return QRMath.LOG_TABLE[n];
  },
  gexp: function gexp(n) {
    while (n < 0) {
      n += 255;
    }
    while (n >= 256) {
      n -= 255;
    }
    return QRMath.EXP_TABLE[n];
  },
  EXP_TABLE: new Array(256),
  LOG_TABLE: new Array(256)
};
for (var i = 0; i < 8; i++) {
  QRMath.EXP_TABLE[i] = 1 << i;
}
for (var i = 8; i < 256; i++) {
  QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
}
for (var i = 0; i < 255; i++) {
  QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
}
function QRPolynomial(num, shift) {
  if (num.length == undefined) {
    throw new Error(num.length + "/" + shift);
  }
  var offset = 0;
  while (offset < num.length && num[offset] == 0) {
    offset++;
  }
  this.num = new Array(num.length - offset + shift);
  for (var i = 0; i < num.length - offset; i++) {
    this.num[i] = num[i + offset];
  }
}
QRPolynomial.prototype = {
  get: function get(index) {
    return this.num[index];
  },
  getLength: function getLength() {
    return this.num.length;
  },
  multiply: function multiply(e) {
    var num = new Array(this.getLength() + e.getLength() - 1);
    for (var i = 0; i < this.getLength(); i++) {
      for (var j = 0; j < e.getLength(); j++) {
        num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
      }
    }
    return new QRPolynomial(num, 0);
  },
  mod: function mod(e) {
    if (this.getLength() - e.getLength() < 0) {
      return this;
    }
    var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));
    var num = new Array(this.getLength());
    for (var i = 0; i < this.getLength(); i++) {
      num[i] = this.get(i);
    }
    for (var i = 0; i < e.getLength(); i++) {
      num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
    }
    return new QRPolynomial(num, 0).mod(e);
  }
};
function QRRSBlock(totalCount, dataCount) {
  this.totalCount = totalCount;
  this.dataCount = dataCount;
}
QRRSBlock.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]];
QRRSBlock.getRSBlocks = function (typeNumber, errorCorrectLevel) {
  var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
  if (rsBlock == undefined) {
    throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
  }
  var length = rsBlock.length / 3;
  var list = [];
  for (var i = 0; i < length; i++) {
    var count = rsBlock[i * 3 + 0];
    var totalCount = rsBlock[i * 3 + 1];
    var dataCount = rsBlock[i * 3 + 2];
    for (var j = 0; j < count; j++) {
      list.push(new QRRSBlock(totalCount, dataCount));
    }
  }
  return list;
};
QRRSBlock.getRsBlockTable = function (typeNumber, errorCorrectLevel) {
  switch (errorCorrectLevel) {
    case QRErrorCorrectLevel.L:
      return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
    case QRErrorCorrectLevel.M:
      return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
    case QRErrorCorrectLevel.Q:
      return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
    case QRErrorCorrectLevel.H:
      return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
    default:
      return undefined;
  }
};
function QRBitBuffer() {
  this.buffer = [];
  this.length = 0;
}
QRBitBuffer.prototype = {
  get: function get(index) {
    var bufIndex = Math.floor(index / 8);
    return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
  },
  put: function put(num, length) {
    for (var i = 0; i < length; i++) {
      this.putBit((num >>> length - i - 1 & 1) == 1);
    }
  },
  getLengthInBits: function getLengthInBits() {
    return this.length;
  },
  putBit: function putBit(bit) {
    var bufIndex = Math.floor(this.length / 8);
    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0);
    }
    if (bit) {
      this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
    }
    this.length++;
  }
};
var QRCodeLimitLength = [[17, 14, 11, 7], [32, 26, 20, 14], [53, 42, 32, 24], [78, 62, 46, 34], [106, 84, 60, 44], [134, 106, 74, 58], [154, 122, 86, 64], [192, 152, 108, 84], [230, 180, 130, 98], [271, 213, 151, 119], [321, 251, 177, 137], [367, 287, 203, 155], [425, 331, 241, 177], [458, 362, 258, 194], [520, 412, 292, 220], [586, 450, 322, 250], [644, 504, 364, 280], [718, 560, 394, 310], [792, 624, 442, 338], [858, 666, 482, 382], [929, 711, 509, 403], [1003, 779, 565, 439], [1091, 857, 611, 461], [1171, 911, 661, 511], [1273, 997, 715, 535], [1367, 1059, 751, 593], [1465, 1125, 805, 625], [1528, 1190, 868, 658], [1628, 1264, 908, 698], [1732, 1370, 982, 742], [1840, 1452, 1030, 790], [1952, 1538, 1112, 842], [2068, 1628, 1168, 898], [2188, 1722, 1228, 958], [2303, 1809, 1283, 983], [2431, 1911, 1351, 1051], [2563, 1989, 1423, 1093], [2699, 2099, 1499, 1139], [2809, 2213, 1579, 1219], [2953, 2331, 1663, 1273]];

/** Constructor */
function QRCode(options) {
  var instance = this;

  //Default options
  this.options = {
    padding: 0,
    width: 256,
    height: 256,
    typeNumber: 4,
    color: "#000000",
    background: "#ffffff",
    ecl: "M"
  };

  //In case the options is string
  if (typeof options === 'string') {
    options = {
      content: options
    };
  }

  //Merge options
  if (options) {
    for (var i in options) {
      this.options[i] = options[i];
    }
  }
  if (typeof this.options.content !== 'string') {
    throw new Error("Expected 'content' as string!");
  }
  if (this.options.content.length === 0 /* || this.options.content.length > 7089 */) {
    throw new Error("Expected 'content' to be non-empty!");
  }
  if (!(this.options.padding >= 0)) {
    throw new Error("Expected 'padding' value to be non-negative!");
  }
  if (!(this.options.width > 0) || !(this.options.height > 0)) {
    throw new Error("Expected 'width' or 'height' value to be higher than zero!");
  }

  //Gets the error correction level
  function _getErrorCorrectLevel(ecl) {
    switch (ecl) {
      case "L":
        return QRErrorCorrectLevel.L;
      case "M":
        return QRErrorCorrectLevel.M;
      case "Q":
        return QRErrorCorrectLevel.Q;
      case "H":
        return QRErrorCorrectLevel.H;
      default:
        throw new Error("Unknwon error correction level: " + ecl);
    }
  }

  //Get type number
  function _getTypeNumber(content, ecl) {
    var length = _getUTF8Length(content);
    var type = 1;
    var limit = 0;
    for (var i = 0, len = QRCodeLimitLength.length; i <= len; i++) {
      var table = QRCodeLimitLength[i];
      if (!table) {
        throw new Error("Content too long: expected " + limit + " but got " + length);
      }
      switch (ecl) {
        case "L":
          limit = table[0];
          break;
        case "M":
          limit = table[1];
          break;
        case "Q":
          limit = table[2];
          break;
        case "H":
          limit = table[3];
          break;
        default:
          throw new Error("Unknwon error correction level: " + ecl);
      }
      if (length <= limit) {
        break;
      }
      type++;
    }
    if (type > QRCodeLimitLength.length) {
      throw new Error("Content too long");
    }
    return type;
  }

  //Gets text length
  function _getUTF8Length(content) {
    var result = encodeURI(content).toString().replace(/\%[0-9a-fA-F]{2}/g, 'a');
    return result.length + (result.length != content ? 3 : 0);
  }

  //Generate QR Code matrix
  var content = this.options.content;
  var type = _getTypeNumber(content, this.options.ecl);
  var ecl = _getErrorCorrectLevel(this.options.ecl);
  this.qrcode = new QRCodeModel(type, ecl);
  this.qrcode.addData(content);
  this.qrcode.make();
}

/** Generates QR Code as SVG image */
QRCode.prototype.svg = function () {
  var options = this.options;
  var modules = this.qrcode.modules;
  var width = options.width;
  var height = options.height;
  var length = modules.length;
  var xsize = width / (length + 2 * options.padding);
  var ysize = height / (length + 2 * options.padding);
  var rect = '<rect x="0" y="0" width="' + width + '" height="' + height + '" style="fill:' + options.background + ';shape-rendering:crispEdges;"/>';
  for (var y = 0; y < length; y++) {
    for (var x = 0; x < length; x++) {
      var module = modules[x][y];
      if (module) {
        var px = (x * xsize + options.padding * xsize).toString();
        var py = (y * ysize + options.padding * ysize).toString();
        rect += '<rect x="' + px + '" y="' + py + '" width="' + xsize + '" height="' + ysize + '" style="fill:' + options.color + ';shape-rendering:crispEdges;"/>';
      }
    }
  }
  var svg = '<?xml version="1.0" standalone="yes"?>' + '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="' + width + '" height="' + height + '">';
  svg += rect;
  svg += '</svg>';
  return svg;
};
module.exports = function (options) {
  return new QRCode(options).svg();
};

/***/ }),

/***/ 761:
/*!******************************************************************************************************!*\
  !*** /Users/gaoyang/Desktop/CODE/开放平台/tongkask-open-uni/node_modules/pure-svg-code/svg2url/index.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function svg2Url(svgString) {
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svgString);
};

/***/ })

}]);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/app/coupon/common/vendor.js.map