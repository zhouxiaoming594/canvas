// JavaScript Document
var MARGIN_LEFT
var MARGIN_TOP
var RADIUS

var balls=[];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]

window.onload=function(){
	//获取当前视窗的大小
	WINDOW_WIDTH=document.documentElement.clientWidth|document.body.clientWidth;
	WINDOW_HEIGHT=document.documentElement.clientHeight|document.body.clientHeight;
	
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
	setInterval(function(){					 
		render(context);
		update();
	},50);
}

function update(){
	var nextShowTimeSecond=getCurrentShowTimeSeconds();
	
	var nexthours=parseInt(nextShowTimeSecond/3600);
	var nextminutes=parseInt((nextShowTimeSecond-3600*nexthours)/60);
	var nextSeconds=parseInt(nextShowTimeSecond%60);
	
	var curhours=parseInt(curShowTimeSecond/3600);
	var curminutes=parseInt((curShowTimeSecond-3600*curhours)/60);
	var curSeconds=parseInt(curShowTimeSecond%60);
	
	if(nextSeconds!=curSeconds)
	{
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
		curShowTimeSecond=nextShowTimeSecond;
	}
	updateBalls();
	console.log( balls.length)
}

function updateBalls(){
	for(var i=0;i<balls.length;i++){
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;
		
		if(balls[i].y>=WINDOW_HEIGHT-RADIUS)
			{
				balls[i].y=	WINDOW_HEIGHT-RADIUS;
				balls[i].vy=-balls[i].vy*0.75;
			}
	}	
	var cnt=0;
	for(var i=0;i<balls.length;i++){
		if(balls[i].x+RADIUS>0 && balls[i].x-RADIUS<WINDOW_WIDTH)
			balls[cnt++]=balls[i];
	}
	while(balls.length>cnt)
		balls.pop();
}

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

function getCurrentShowTimeSeconds(){
	var curTime=new Date();
	var ret=curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();
	
	return ret;
}
function render(cxt){
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	
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
	
	for(var i=0 ;i<balls.length;i++)
	{
		cxt.fillStyle=balls[i].color;
		
		cxt.beginPath();
		cxt.arc(balls[i].x,balls[i].y,RADIUS,0,Math.PI*2);
		cxt.closePath();
		cxt.fill();
	}
}

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