function collapsePolymer (polymerString) {
  var collapsedString = polymerString
  var intermediateString = ''
  const polymerPairs = /aA|Aa|bB|Bb|cC|Cc|dD|Dd|eE|Ee|fF|Ff|gG|Gg|hH|Hh|iI|Ii|jJ|Jj|kK|Kk|lL|Ll|mM|Mm|nN|Nn|oO|Oo|pP|Pp|qQ|Qq|rR|Rr|sS|Ss|tT|Tt|uU|Uu|vV|Vv|wW|Ww|xX|Xx|yY|Yy|zZ|Zz/gm
  while (collapsedString.length !== intermediateString.length) {
    intermediateString = collapsedString
    collapsedString = intermediateString.replace(polymerPairs, '')
  }

  return collapsedString.length
}

function findTheBestCollapse (polymerString) {
  var upperCase = 65 // digital representation of A
  var lowerCase = 97 // digital representation of a
  var bestCollapsedStringLength = polymerString.length
  var reducedString = ''
  var collapsedStringLength = 0

  for (var i = 0; i < 26; i++) {
    // create regular expression for each upper and lower case letter
    var expression = new RegExp(String.fromCodePoint(lowerCase + i) + '|' + String.fromCodePoint(upperCase + i), 'gm')
    reducedString = polymerString.replace(expression, '')
    collapsedStringLength = collapsePolymer(reducedString)
    if (collapsedStringLength < bestCollapsedStringLength) {
      bestCollapsedStringLength = collapsedStringLength
    }
  }

  return bestCollapsedStringLength
}
exports.collapsePolymer = collapsePolymer
exports.findTheBestCollapse = findTheBestCollapse
