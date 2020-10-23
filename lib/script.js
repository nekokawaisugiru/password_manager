var card =
  '<div class="card">' +
  '        <div class="title row"><span class="name"></span><button class="btn btn-mini right card_delete"><i class="fas fa-trash-alt"></i></button><button class="card_edit btn btn-mini right"><i class="fas fa-edit"></i></button></div>' +
  '        <div class="row">' +
  '          <div class="clmn_1">ID</div>' +
  '          <div class="clmn_9"><input type="text" class="id" value="a@a.com" onfocus="this.select();" readonly/><button class="btn btn-mini clip_board"><i class="fas fa-clipboard"></i></button></div>' +
  "        </div>" +
  '        <div class="row">' +
  '          <div class="clmn_1">PW</div>' +
  '          <div class="clmn_9"><input type="text" class="pw" value="asdfqwer" onfocus="this.select();" readonly/><button class="btn btn-mini clip_board"><i class="fas fa-clipboard"></i></button></div>' +
  "        </div>" +
  "      </div>";

$(function () {
  $(".add_btn").on("click", function () {
    $("#new_account").find("#modal_title").text("新規アカウント追加");
    $("#new_account").find("#name").val("");
    $("#new_account").find("#id").val("");
    $("#new_account").find("#pw").val("");
    $("#new_account").fadeIn();
  });
  $("#register").on("click", function () {
    new_card($("#name").val(),$("#id").val(),$("#pw").val())
  });
  $(".js-modal-close").on("click", function () {
    $(this).closest(".js-modal").fadeOut();
    return false;
  });
});

function new_card(name,id,pw){
  var $card = $(card);
  $card.css("display", "none");
  $card.find(".name").text(name);
  $card.find(".id").val(id);
  $card.find(".pw").val(pw);
  $(".add_card").before($card);
  $card.fadeIn();
  $(".card_edit").on("click", function () {
    $("#new_account").find("#modal_title").text("アカウント編集");
    $card = $(this).closest(".card");
    $("#new_account").find("#name").val($card.find(".name").text());
    $("#new_account").find("#id").val($card.find(".id").val());
    $("#new_account").find("#pw").val($card.find(".pw").val());
    $("#new_account").fadeIn();
  });
  $(".card_delete").on("click", function () {
    $(this)
      .closest(".card")
      .fadeOut(function () {
        $(this).remove();
      });
    return false;
  });
  $(".clip_board").on("click", function () {
    var str = $(this).prev().val();
    var listener = function (e) {
      e.clipboardData.setData("text/plain", str);
      e.preventDefault();
      document.removeEventListener("copy", listener);
    };
  
    document.addEventListener("copy", listener);
    document.execCommand("copy");
    $("#message_modal").find(".message").text("クリップボードにコピーしました")
    $("#message_modal").fadeIn();
    return false;
  });
}

function import_data() {
  $("#import_modal").find("#import_text").val('')
  $("#import_modal").fadeIn();
  $("#import_ok").on("click", function () {
    var en_text = $("#import_text").val();
    var text = decrypt(en_text);
    var datas = JSON.parse(text)
    datas.forEach( data =>{
      new_card(data[0],data[1],data[2]);
    })
    return false;
  });
}

function export_data() {
  var cards = $(".card");
  var datas = []
  cards.each(function(index, element){
    $elem = $(element);
    if($elem.hasClass('add_card')){return};
    var data = [];
    data.push($elem.find('.name').text());
    data.push($elem.find('.id').val());
    data.push($elem.find('.pw').val());
    datas.push(data);
  })
  datas = JSON.stringify(datas)
  var str = encrypt(datas);

  var listener = function (e) {
    e.clipboardData.setData("text/plain", str);
    e.preventDefault();
    document.removeEventListener("copy", listener);
  };

  document.addEventListener("copy", listener);
  document.execCommand("copy");
  $("#message_modal").find(".message").text("暗号文をクリップボードにコピーしました")
  $("#message_modal").fadeIn();
}
key = 123; // key
function encrypt(str) {
  // 暗号化
  str2 = "";
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
  str2 = "";
  for (nn = 0; nn < str.length; ++nn) {
    cd = str.charAt(nn).charCodeAt() - key;
    if (cd <= 0x1f) cd = cd + 0x5f;
    str2 = str2 + String.fromCharCode(cd);
  }
  str2 = unescape(str2);
  return str2;
}