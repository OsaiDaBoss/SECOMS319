// Your solution goes here
function isStrongPassword(pwd) {
  if(pwd.length < 8) {
    return false;
  }
  if(pwd.indexOf("password") != -1) {
    return false;
  }
  var upper_char_found = false;
  for(var i=0;i<pwd.length;i++) {
    var code=pwd.charCodeAt(i);
    if(code>=65 && code<=90) {
      upper_char_found = true;
      break;
    }
  }
  return upper_char_found;
}
