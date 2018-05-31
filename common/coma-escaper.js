 
const char = '\u26d4';

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

exports.escape = (string) => {
    return string.replaceAll(',', char);
}

exports.unescape = (string) => {
    return string.replaceAll(char, ',');
}
