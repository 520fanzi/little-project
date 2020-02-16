var wrap = document.getElementsByClassName("wrap")[0];
for (var i = 0; i < 36; i++) {
    var oDiv = document.createElement("div");
    oDiv.className = "rib";
    // 画36条心形曲线
    oDiv.style.transform = "rotateY(" + 10 * i + "deg) rotateZ(45deg) translateX(30px)";
    var n = 0;
    setInterval(function() {
        if (n < 36) {
            document.getElementsByClassName('rib')[n].style.borderColor = getRandomColor();
            n = n + 1;
        } else {
            n = 0;
        }
    },1000)
    console.log(n)
    wrap.appendChild(oDiv);
}

// 随机色
var getRandomColor = function(){
    return  '#' +
        (function(color){
            return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])
            && (color.length === 6) ?  color : arguments.callee(color);
        })('');
}
