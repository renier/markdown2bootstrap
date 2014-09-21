// コードブロックでQiitaのタイトル書式対応
function set_code_title() {
    var li_pun_class = document.getElementsByClassName('pun');
    for(var i=0; i<li_pun_class.length; i++) {
        if (li_pun_class[i].innerHTML.match(/^:/)) {
		li_pun_class[i].parentNode.className = 'code_title';
	}
    }
}
set_code_title();

// 1行目はタイトルとみなす。Kobitoからのコピペ対応
function first_line_as_h1() {
    var body = document.getElementsByTagName("body")[0];
    var pattern = /<div class="span9"><p>(.*)?<\/p>/;
    var replacement = '<div class="span9"><h1>$1<\/h1>';
    body.innerHTML = body.innerHTML.replace(pattern, replacement);
}
first_line_as_h1();

// コードブロック中に#を書くとh1になる不具合をねじ伏せる
function fix_codeblock_bug() {
    var codeblock = document.getElementsByTagName("li");
    for(var i=0; i<codeblock.length; i++) {
        codeblock[i].innerHTML = codeblock[i].innerHTML.replace(/<h1/,'<text');
        codeblock[i].innerHTML = codeblock[i].innerHTML.replace(/<\/h1>/,'</text>');
    }
}
fix_codeblock_bug();
