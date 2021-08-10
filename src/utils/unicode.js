function isChinese(e) {
  return /[\u4e00-\u9fa5]/.test(e)
}

export function ch2Unicode(e) {
  if (e) {
    for (var t = "", n = 0; n < e.length; n++) {
      var o = e.charAt(n);
      t += isChinese(o) ? "\\u" + o.charCodeAt(0).toString(16) : o
    }
    return t
  }
}

export function unicode2Ch(e) {
  if (e) {
    for (var t = 1, n = "", o = 0; o < e.length; o += t) {
      t = 1;
      var i = e.charAt(o);
      if ("\\" == i) if ("u" == e.charAt(o + 1)) {
        var r = e.substr(o + 2, 4);
        n += String.fromCharCode(parseInt(r, 16).toString(10)), t = 6
      } else n += i; else n += i
    }
    return n
  }
}