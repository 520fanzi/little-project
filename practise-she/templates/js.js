var canvas=document.getElementById("canvas");
var context = canvas.getContext('2d');

function restart() {
    location.reload();
}
var x = 0;
function checkcount() {
    x=x+1;
    return x;
}
function suspend() {
    // clearInterval(online_send);
    checkcount();
    if(x%2!==0){
        clearInterval(online_send);
    }
}

//    context是canvas的上下文对象，对象的函数可以自己来用
<!--    构造方块对象-->
function block(x,y,w,h,color) {
    //在水平位置的什么位置上方块
    this.x = x;
    //在数值方向上的什么位置上有方块
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
}
//添加画方块的方法
block.prototype.draw=function () {
    //开始画图
    context. beginPath();
    //   可以用什么来填充  填充的颜色
    context.fillStyle=this.color;
    //    在画布上画方块，即调用函数
    //    ??????这里是真的不明白?????
    context.rect(this.x,this.y,this.w,this.h);
    //    可以填充了
    context.fill();
    //可以呈现在网页上
    context.stroke();
    /*
    绘制 150*100 像素的矩形，然后用红色来给它填色：
    * var c=document.getElementById("myCanvas");
    * var ctx=c.getContext("2d");
    * ctx.rect(20,20,150,100);
    * ctx.fillStyle="red";
    * ctx.fill();
    * */
}
// new block(20,20,20,20,"red").draw();
//    构造蛇对象
//    用一个数组来构造蛇对象
function Snake() {
    //定义一个数组用来放蛇
    //????new Array()和【】的区别
    var snake = [];
    //初始化蛇的长度
    for(i=0;i<4;i++)
    {
        var rect=new block(i*20,40,20,20,"gray");
        snake.splice(0,0,rect);
    }
    //    蛇头用红色来表示
    var head = snake[0];
    head.color="red";

    //变成这个函数的一个变量
    this.head = head;
    //初始化这个数组
    this.snake = snake;
    //初始化这个方向
    this.direction = 39;
}
//    画蛇的方法
//    这里好像是移动蛇的方法
//    1、在与蛇的头部重叠的位置添加一个方块
//    2、如果吃到了食物就蛇头可以移动
//    3、否则剪掉最末尾的一个方块
//    ///prototype是全局属性，所有里面的对象都可以用这个方法//
Snake.prototype.Draw= function () {
    for(var i=0;i<this.snake.length;i++){
        this.snake[i].draw()
    }
}
//    开始画出初始的蛇和食物
var snake=new Snake();
snake.Draw();
var food=new Getfoodrandom();
// new Snake().Draw();
//    蛇的移动
Snake.prototype.move=function(){
    var Block=new block(this.head.x,this.head.y,20,20,"gray");
    this.snake.splice(1,0,Block);
    if(Iseat()){
        food = new Getfoodrandom();
    }else{
        snake.snake.pop();
    }
    switch (this.direction) {
        case 37:
            this.head.x -= this.head.w
            break;
        case 38:
            //竖的是高   减的是蛇的头部的高
            this.head.y -= this.head.h
            break;
        case 39:
            this.head.x += this.head.w
            break;
        case 40:
            this.head.y += this.head.h
            break;
        default:
            break;
    }
    end();
};
/**
 * @return {boolean}
 */
var Iseat=function () {
    return snake.head.x === food.x && snake.head.y === food.y;
};


//    食物的随机给取规则
function Getfoodrandom() {
    var isOnesnake = true;
    while (isOnesnake) {
        isOnesnake = false;
        var X =Innumber(0,canvas.width/20-1);
        var Y =Innumber(0,canvas.height/20-1);
        var Block = new block(X*20,Y*20,20,20,"green");
        for(var i = 0; i<snake.snake.length; i++){
            if(snake.snake[i].x === Block.x&&snake.snake[i].y === Block.y){
                isOnesnake = true;
                break;
            }
        }
    }
    return Block;
}
//这里是随机数的选取


//    随机数的选取
//    ????如何判断是否函数需要参数？？？
/**
 * @return {number}
 */
function Innumber(min,max) {
    var range = max - min;
    var r= Math.random();
    return Math.round(r * range + min)
}

//    键盘事件绑定
document.onkeydown = function(e){
    var e = window.event||e;
    switch (e.keyCode) {
        case 37:
        {
            if (snake.direction !== 39)
                snake.direction=37;
        }
            break;
        case 38:
        {
            if (snake.direction !== 40)
                snake.direction=38;
        }
            break;
        case 39:
        {
            if (snake.direction !== 37)
                snake.direction=39;
        }
            break;
        case 40:
        {
            if (snake.direction !== 38)
                snake.direction=40;
        }
            break;
    }
    // e.preventDefault();
};
//    游戏结束的时候撞墙或者是咬到了自己
var end = function () {
    if(snake.head.x>=canvas.width||snake.head.y>=canvas.height||snake.head.x < 0||snake.head.y < 0){
        clearInterval(online_send);
        // window.open ('page.html');
        //  alert("你撞墙'死'啦!haha!再接再厉呦！");
        // location.reload();
        canvas.style=`
            display: block;
            background-color:#000;
            background-image: url("images/laji.gif");
            background-repeat: no-repeat;
            box-shadow: 1px 6px 20px black;
            text-align: center;
            margin:0 auto;
            background-position: 50%;
            z-index:1;
            opacity:0.1;
            `;
        // context.font="100px Georgia";
        // context.fillText("你输啦！",245,440)
    }
    for(var i=1;i<snake.snake.length;i++)
    {
        if(snake.snake[i].x===snake.head.x&&snake.snake[i].y===snake.head.y){
            clearInterval(online_send);
            // alert("你自己咬'死'自己啦!haha!再接再厉呦！");
            canvas.style=`
            display: block;
            background-color:#000;
            background-image: url("images/bao.jpg");
            background-repeat: no-repeat;
            box-shadow: 1px 6px 20px black;
            text-align: center;
             margin:0 auto;
            background-position: 50%;
            z-index:1;
            opacity:0.1;
            `;
            // context.font="100px Georgia";
            // context.fillText("你输啦！",245,440)
        }
    }
};
//    计时器
var online_send = setInterval(function () {
    context.clearRect(0,0,canvas.width,canvas.height);
    food.draw();
    snake.move();
    snake.Draw();
}, 100);
