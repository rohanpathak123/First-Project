function func() {
    var secs = document.getElementsByTagName("section");
    for(var i=0;i<secs.length;i++) {
        secs[i].className="hide";
    }
    var select = document.getElementById("selectbox");
    var category = select.options[select.selectedIndex].value;
    var sec = document.getElementById(category);
    if(sec.className=="hide") {
        sec.className="";
    }
    else {
        sec.className="hide";
    }     
}
var rem_buttons = document.querySelectorAll(".remove");
var add_buttons = document.querySelectorAll(".add");
for(var i=0;i<rem_buttons.length;i++) {
    rem_buttons[i].addEventListener("click",remove_one);
    add_buttons[i].addEventListener("click",add_one);
}
function add_one() {
    var qty = this.previousElementSibling;
    var qty_val = parseFloat(qty.innerHTML);
    qty_val = qty_val + 1;
    qty.innerHTML = qty_val;
}   
function remove_one() {
    var qty = this.nextElementSibling;
    var qty_val = parseFloat(qty.innerHTML);
    if(qty_val>0) {
    qty_val = qty_val - 1;
    qty.innerHTML = qty_val;
    }
}

