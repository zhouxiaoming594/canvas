// JavaScript Document
var MARGIN_LEFT  //定义左边缘
var MARGIN_TOP	//定义上边距
var RADIUS		//定义小球半径
const endTime =new Date();     
endTime.setTime(endTime.getTime()+3600*1000);   //获取现在时间的后一小时,在此处可以更改设定倒计时时间

var balls=[]; 
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]

window.onload=function(){
	//获取当前视窗的大小
	WINDOW_WIDTH=document.documentElement.clientWidth|document.body.clientWidth;
	WINDOW_HEIGHT=document.documentElement.clientHeight|document.body.clientHeight;
	
	//定义参数使窗口能自适应
	MARGIN_LEFT=Math.round(WINDOW_WIDTH/10);
	MARGIN_TOP=Math.round(WINDOW_HEIGHT/5);
	RADIUS=Math.round(WINDOW_WIDTH*4/5/108)-1;
	
	var canvas=document.getElementById("canvas");
		canvas.width=WINDOW_WIDTH;
		canvas.height=WINDOW_HEIGHT;
	if(canvas.getContext("2d")){
		var context=canvas.getContext("2d");
	}else{
		alert('当前浏览器不支持Canvas，请更换浏览器后再试');	
	}
	curShowTimeSecond=getCurrentShowTimeSeconds();
	//刷新页面
	setInterval(function(){					 
		render(context); //绘制时钟小球
		update();     
	},50);
}

//时钟状态更新
function update(){
	var nextShowTimeSecond=getCurrentShowTimeSeconds();
	
	var nexthours=parseInt(nextShowTimeSecond/3600);
	var nextminutes=parseInt((nextShowTimeSecond-3600*nexthours)/60);
	var nextSeconds=parseInt(nextShowTimeSecond%60);
	
	var curhours=parseInt(curShowTimeSecond/3600);
	var curminutes=parseInt((curShowTimeSecond-3600*curhours)/60);
	var curSeconds=parseInt(curShowTimeSecond%60);
	//秒针跳动后调用刷新函数
	if(nextSeconds!=curSeconds)
	{
		//判断哪个数字改变使其在对应位置产生小球
		if(parseInt(nexthours/10)!=parseInt(curhours/10)){
			addBalls(MARGIN_LEFT+0 ,MARGIN_TOP,parseInt(curhours/10));
		}
		if(parseInt(nexthours%10)!=parseInt(curhours%10)){
			addBalls(MARGIN_LEFT+15*(RADIUS+1) ,MARGIN_TOP,parseInt(curhours%10));
		}
		
		if(parseInt(nextminutes/10)!=parseInt(curminutes/10)){
			addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(curminutes/10));
		}
		if(parseInt(nextminutes%10)!=parseInt(curminutes%10)){
			addBalls(MARGIN_LEFT+54*(RADIUS+1) ,MARGIN_TOP,parseInt(curminutes%10));
		}
		
		if(parseInt(nextSeconds/10)!=parseInt(curSeconds/10)){
			addBalls(MARGIN_LEFT+78*(RADIUS+1) ,MARGIN_TOP,parseInt(curSeconds/10));
		}
		if(parseInt(nextSeconds%10)!=parseInt(curSeconds%10)){
			addBalls(MARGIN_LEFT+93*(RADIUS+1) ,MARGIN_TOP,parseInt(curSeconds%10));
		}
		curShowTimeSecond=nextShowTimeSecond;  //更新时间变量
	}
	updateBalls();          
	console.log( balls.length) //打印页面内彩色小球个数
}

//更新彩色小球状态函数
function updateBalls(){
	for(var i=0;i<balls.length;i++){
		balls[i].x+=balls[i].vx;   //小球X坐标位置更新
		balls[i].y+=balls[i].vy;	//小球Y左边位置更新
		balls[i].vy+=balls[i].g;	//小球速度更新
		
		if(balls[i].y>=WINDOW_HEIGHT-RADIUS)   	//小球碰撞下边缘检测
			{
				balls[i].y=	WINDOW_HEIGHT-RADIUS;
				balls[i].vy=-balls[i].vy*0.75;
			}
	}
	//去除走出边缘的小球，优化函数性能防止页面内添加小球过多
	var cnt=0;
	for(var i=0;i<balls.length;i++){
		if(balls[i].x+RADIUS>0 && balls[i].x-RADIUS<WINDOW_WIDTH) //判断小球是否还在窗口内
			balls[cnt++]=balls[i];   //必定i>cnt 
	}
	while(balls.length>cnt)
		balls.pop();        //去除前面产生的小球
}
//增加彩色小球函数
function addBalls(x,y,num){
	for (i=0;i<number[num].length;i++)
		for (j=0;j<number[num][i].length;j++)
			if(number[num][i][j]==1){
				var aBall={
					x:x+j*2*(RADIUS+1)+(RADIUS+1),
					y:y+i*2*(RADIUS+1)+(RADIUS+1),
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(aBall);
		}
}
//获取倒计时剩余时间函数
function getCurrentShowTimeSeconds(){
	var curTime=new Date();
	var ret=endTime.getTime()-curTime.getTime();
	ret=Math.round(ret/1000)
	
	return ret>=0? ret:0;
}
//在canvas画布上绘制图案
function render(cxt){
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT); //清除矩形选框内的图案
	
	var hours=parseInt(curShowTimeSecond/3600);
	var minutes=parseInt((curShowTimeSecond-3600*hours)/60);
	var seconds=parseInt(curShowTimeSecond%60);
	
	renderNumber(MARGIN_LEFT ,MARGIN_TOP, parseInt(hours/10), cxt);
	renderNumber(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
	renderNumber(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);
	renderNumber(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
	renderNumber(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
	renderNumber(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt);
	renderNumber(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
	renderNumber(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);
	//绘制彩色动态小球函数
	for(var i=0 ;i<balls.length;i++)
	{
		cxt.fillStyle=balls[i].color;
		
		cxt.beginPath();
		cxt.arc(balls[i].x,balls[i].y,RADIUS,0,Math.PI*2);
		cxt.closePath();
		cxt.fill();
	}
}
//绘制时间小球函数
function renderNumber(x,y,num,cxt){
	cxt.fillStyle="rgb(0,102,153)";
	
	for (i=0;i<number[num].length;i++)
		for (j=0;j<number[num][i].length;j++)
			if(number[num][i][j]==1){
				cxt.beginPath();
				cxt.arc((x+j*2*(RADIUS+1)+(RADIUS+1)),(y+i*2*(RADIUS+1)+(RADIUS+1)),RADIUS,0,2*Math.PI); 
				cxt.closePath();
				
				cxt.fill();
				}
}