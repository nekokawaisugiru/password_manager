
function import_data() {
  var en_text = window.prompt('入力データを貼り付けてください', '');
  $('#text_area textarea').val(decrypt(en_text));
}
function export_data() {
  var text = $('#text_area textarea').val();
  var str = encrypt(text);

  var listener = function (e) {
    e.clipboardData.setData('text/plain', str);
    e.preventDefault();
    document.removeEventListener('copy', listener);
  };

  document.addEventListener('copy', listener);
  document.execCommand('copy');
  alert('クリップボードにコピーしました')
}
key = 123; // key
function encrypt(str) {
  // 暗号化
  str2 = '';
  str = escape(str);
  for (nn = 0; nn < str.length; ++nn) {
    cd = str.charAt(nn).charCodeAt() + key;
    if (cd >= 0x7f) cd = cd - 0x5f;
    str2 = str2 + String.fromCharCode(cd);
  }
  return str2;
}
function decrypt(str) {
  // 復号化
  str2 = '';
  for (nn = 0; nn < str.length; ++nn) {
    cd = str.charAt(nn).charCodeAt() - key;
    if (cd <= 0x1f) cd = cd + 0x5f;
    str2 = str2 + String.fromCharCode(cd);
  }
  str2 = unescape(str2);
  return str2;
}

