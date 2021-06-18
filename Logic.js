var btn = document.getElementById("btn");
var canvas = document.getElementById("chessboard");
var context = canvas.getContext("2d");
var btn_ai=document.getElementById("ai");
var btn_players=document.getElementById("players");
var btn_simple=document.getElementById("simple");
var btn_hard=document.getElementById("hard");
var btn_ex=document.getElementById("ex");
var btn_black=document.getElementById("fieldB");
var btn_white=document.getElementById("fieldW");
var btn_start=document.getElementById("start");



var CHECK=[[0,-1],[11,-1],[-1,0],[-1,11],[0,0],[0,11],[11,0],[11,11]] ;
var JUMP=[[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]] ;
var BACK=[[1,0,-1,0],[0,-1,0,1],[1,1,-1,-1],[1,-1,-1,1],[-1,0,-1,0],[1,0,1,0],[0,-1,0,-1],[0,1,0,1],[-1,-1,-1,-1],[-1,1,-1,1],[1,-1,1,-1],[1,1,1,1]] ;
var POS=['0','0','0','0','0','0','0','0','0','0','0','0'];
var numstring =['0','1','2','3','4','5','6','7','8','9','10','11'];
var chessColor = ["rgba(0,0,0,1)", "rgba(255,255,255,1)"];//棋子颜色

var color;
var score=[];
var BT=[];
var Cb=[];
var BC = 8;
var WC = 8;
var turns = 0;//记录当前回合数
var mode=0;//0AI 1玩家
var difficult=1;//难度1/3/5
var FIELD=1;//1黑2白
var humanField=2;
var setLock=1;
var f_s=0;
var pre_x=0;
var pre_y=0;
var dir=0;
var bcLock=1;

btn_ai.addEventListener("click",function ()
{
    if(!setLock) {
        btn_ai.style.backgroundColor = "#FFFFFF";
        btn_ai.style.color = "#C8C8C8";
        btn_players.style.backgroundColor = "#C8C8C8";
        btn_players.style.color = "#FFFFFF";
        btn_simple.style.backgroundColor = "#FFFFFF";
        btn_simple.style.color = "#C8C8C8";
        btn_white.style.backgroundColor = "#FFFFFF";
        btn_white.style.color = "#C8C8C8";
        mode = 0;
        difficult=1;
        FIELD=1;
        humanField=2;
    }
})
btn_players.addEventListener("click",function ()
{
    if(!setLock) {
        btn_players.style.backgroundColor = "#FFFFFF";
        btn_players.style.color = "#C8C8C8";
        btn_ai.style.backgroundColor = "#C8C8C8";
        btn_ai.style.color = "#FFFFFF";
        btn_simple.style.backgroundColor = "#C8C8C8";
        btn_simple.style.color = "#FFFFFF";
        btn_hard.style.backgroundColor = "#C8C8C8";
        btn_hard.style.color = "#FFFFFF";
        btn_ex.style.backgroundColor = "#C8C8C8";
        btn_ex.style.color = "#FFFFFF";
        btn_black.style.backgroundColor = "#C8C8C8";
        btn_black.style.color = "#FFFFFF";
        btn_white.style.backgroundColor = "#C8C8C8";
        btn_white.style.color = "#FFFFFF";
        mode = 1;
        humanField=1;
    }
})
btn_simple.addEventListener("click",function ()
{
    if(!mode&&!setLock)
    {
        btn_simple.style.backgroundColor = "#FFFFFF";
        btn_simple.style.color = "#C8C8C8";
        btn_hard.style.backgroundColor="#C8C8C8";
        btn_hard.style.color="#FFFFFF";
        btn_ex.style.backgroundColor="#C8C8C8";
        btn_ex.style.color="#FFFFFF";
        difficult=1;
    }
})
btn_hard.addEventListener("click",function ()
{
    if(!mode&&!setLock)
    {
        btn_hard.style.backgroundColor = "#FFFFFF";
        btn_hard.style.color = "#C8C8C8";
        btn_simple.style.backgroundColor="#C8C8C8";
        btn_simple.style.color="#FFFFFF";
        btn_ex.style.backgroundColor="#C8C8C8";
        btn_ex.style.color="#FFFFFF";
        difficult=3;
    }
})
btn_ex.addEventListener("click",function ()
{
    if(!mode&&!setLock)
    {
        btn_ex.style.backgroundColor = "#FFFFFF";
        btn_ex.style.color = "#C8C8C8";
        btn_hard.style.backgroundColor="#C8C8C8";
        btn_hard.style.color="#FFFFFF";
        btn_simple.style.backgroundColor="#C8C8C8";
        btn_simple.style.color="#FFFFFF";
        difficult=5;
    }
})
btn_black.addEventListener("click",function ()
{
    if(!mode&&!setLock)
    {
        btn_black.style.backgroundColor = "#FFFFFF";
        btn_black.style.color = "#C8C8C8";
        btn_white.style.backgroundColor="#C8C8C8";
        btn_white.style.color="#FFFFFF";
        FIELD=2;
        humanField=1;
    }
})
btn_white.addEventListener("click",function ()
{
    if(!mode&&!setLock)
    {
        btn_white.style.backgroundColor = "#FFFFFF";
        btn_white.style.color = "#C8C8C8";
        btn_black.style.backgroundColor="#C8C8C8";
        btn_black.style.color="#FFFFFF";
        FIELD=1;
        humanField=2;
    }
})
btn_start.addEventListener("click",function ()
{
    if(!setLock)
    {
        setLock=1;
        bcLock=0;
        btn_start.textContent="Competing";
        btn_start.style.backgroundColor="#FFFFFF";
        btn_start.style.color="#888888";
        if(!mode)
        {
            AI_origin();
            if(FIELD===1)
                AI_step();
        }
    }
})

//新游戏按钮响应函数
btn.addEventListener("click",function(){
    startGame();//开始新游戏
})




//开始新游戏
function startGame()
{
    mode=0;//0AI 1玩家
    difficult=1;//难度1/3/5
    FIELD=1;//1白2黑
    setLock=0;
    Cb=[];
    turns=0;
    BC=8;
    WC=8;
    f_s=0;
    pre_x=0;
    pre_y=0;
    dir=0;
    bcLock=1;
    humanField=2;
    btn_start.textContent="Start";
    btn_start.style.backgroundColor="#888888";
    btn_start.style.color="#FFFFFF";
    btn_ai.style.backgroundColor = "#FFFFFF";
    btn_ai.style.color = "#C8C8C8";
    btn_players.style.backgroundColor = "#C8C8C8";
    btn_players.style.color = "#FFFFFF";
    btn_simple.style.backgroundColor = "#FFFFFF";
    btn_simple.style.color = "#C8C8C8";
    btn_hard.style.backgroundColor = "#C8C8C8";
    btn_hard.style.color = "#FFFFFF";
    btn_ex.style.backgroundColor = "#C8C8C8";
    btn_ex.style.color = "#FFFFFF";
    btn_black.style.backgroundColor = "#C8C8C8";
    btn_black.style.color = "#FFFFFF";
    btn_white.style.backgroundColor = "#FFFFFF";
    btn_white.style.color = "#C8C8C8";

    for (var i = 0; i < 12; i++)
    {
        Cb[i]=[];
        score[i]=[];
        BT[i]=[];
        for (var j = 0; j < 12; j++)
        {
            Cb[i][j] = '0';
            score[i][j]=0;
            BT[i][j]=[];
            for(var k=0;k<8;k++)
                BT[i][j][k]=0;
        }
    }
    Cb[2][2] = '2'; Cb[2][3] = '2'; Cb[2][4] = '2'; Cb[6][6] = '2'; Cb[6][7] = '2'; Cb[6][8] = '2'; Cb[8][2] = '2'; Cb[9][2] = '2';
    Cb[2][9] = '1'; Cb[3][9] = '1'; Cb[5][3] = '1'; Cb[5][4] = '1'; Cb[5][5] = '1'; Cb[9][7] = '1'; Cb[9][8] = '1'; Cb[9][9] = '1';

    cleanChessBoard();
    reSetBoard();

  //  over=false;
   // document.getElementById("BC").innerHTML = ++count;





}

function reSetBoard()
{
    for (var i = 0; i < 15; i++)
    {
        context.strokeStyle="#b9b9b9";
        context.lineWidth='1';
        context.beginPath();
        context.moveTo((i) * 40, 0);
        context.lineTo((i) * 40, canvas.height );
        context.closePath();
        context.stroke();
        context.beginPath();
        context.moveTo(0, (i) * 40);
        context.lineTo(canvas.width , (i) * 40);
        context.closePath();
        context.stroke();
        if(i>1&&i<14)
        {
            context.strokeStyle="#858585";
            context.strokeText(numstring[i-2],40*i-22,22);
            context.strokeText(numstring[i-2],40*i-22,542);
            context.strokeText(numstring[i-2],18,40*i-18);
            context.strokeText(numstring[i-2],538,40*i-18);
        }
    }
    for(var k=0;k<12;k++)
    {
        for (var j = 0; j < 12; j++)
        {
            if(Cb[k][j]==='1')
            {
                drawChess((j+1)*40+20,(k+1)*40+20,chessColor[0]);
            }
            if(Cb[k][j]==='2')
            {
                drawChess((j+1)*40+20,(k+1)*40+20,chessColor[1]);
            }

        }
    }
}

function cleanChessBoard()
{
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle= "rgba(255,255,255,0.3)";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawChess(x,y,color)
{
    context.beginPath();
    context.arc(x,y,15,0,Math.PI*2,false);
    context.closePath();
    context.fillStyle = color;
    context.fill();
}
function holdChess(x,y)
{
    context.beginPath();
    context.arc(x,y,16,0,Math.PI*2,false);
    context.closePath();
    context.fillStyle = "rgba(166,191,96,0.7)";
    context.fill();
}
function releaseChess(x,y)
{
    context.clearRect(x-19, y-19, 38, 38);
    context.fillStyle= "rgba(255,255,255,0.3)";
    context.fillRect(x-19, y-19, 38, 38);
}



//下棋落子(canvas点击响应函数)
canvas.addEventListener("click",function(e){
    if(bcLock)
    {
        return;
    }

    //判断点击范围是否越出棋盘
    if(e.offsetX < 41 || e.offsetX > 519 || e.offsetY < 41 || e.offsetY > 519)
    {
        return;
    }
    var dx = Math.floor(e.offsetY/40)-1;//x/y转置
    var dy = Math.floor(e.offsetX/40)-1;
    var color='1';
    if(humanField===2)color='2';//white
    else color='1';//white
    if(Cb[dx][dy]===color)
    {
        if(f_s){
            releaseChess((pre_y+1)*40+20,(pre_x+1)*40+20);
            drawChess((pre_y+1)*40+20,(pre_x+1)*40+20,chessColor[humanField-1]);
        }
        f_s=1;
        pre_x=dx;
        pre_y=dy;
        holdChess((dy+1)*40+20,(dx+1)*40+20);
    }
    else if(f_s&&Cb[dx][dy]==='0'&&Math.abs(dx-pre_x)<2&&Math.abs(dy-pre_y)<2)
    {
        releaseChess((pre_y+1)*40+20,(pre_x+1)*40+20);
        drawChess((dy+1)*40+20,(dx+1)*40+20,chessColor[humanField-1]);
        f_s=0;
        dirDeal(pre_x,pre_y,dx,dy);
        Jump(pre_x,pre_y,dir);
        Turns();
        setTimeout( function()
        {
            boardEat(pre_x,pre_y);
        },  500 );

        turns++;
        document.getElementById("turns").innerHTML = turns;
        if(!mode)//AI
        {
            setTimeout( function()
            {
                AI_step();
            },  1000 );

        }
        else//players
        {
            if(humanField===1)humanField=2;
            else humanField=1;
        }



    }
});

function AI_origin()
{
    if(FIELD===1)
    {
        scoreset1();
        color ='1';
    }
    else if(FIELD===2)
    {
        scoreset2();
        color ='2';
    }
}
function AI_step()
{
    bcLock=1;
    if(turns===0&&FIELD===1)
    {
        pre_x=9;
        pre_y=7;
        dir=4;
    }
    else
    {
        Search(1,color,20000);
        for(var i=0;i<12;i++)
            for(var j=0;j<12;j++)
                for(var k=0;k<8;k++)
                    BT[i][j][k]=0;
    }
    releaseChess((pre_y+1)*40+20,(pre_x+1)*40+20);
    Jump(pre_x,pre_y,dir);
    Turns();
    drawChess((pre_y+1)*40+20,(pre_x+1)*40+20,chessColor[FIELD-1]);
    setTimeout( function()
    {
        boardEat(pre_x,pre_y);
    },  500 );


    turns++;
    document.getElementById("turns").innerHTML = turns;
    bcLock=0;
}

function scoreset1()
{   score[6][10]=score[5][10]=score[4][10]=30;
    score[3][4]=score[3][5]=score[3][6]=68;	score[4][3]=score[6][3]=69;score[5][3]=70;score[7][4]=score[7][5]=score[7][6]=68;
    score[4][8]=score[5][8]=score[6][8]=60;  score[4][7]=score[6][7]=score[7][7]=67; score[6][9]=score[5][9]=score[4][9]=50;
    score[8][4]=68; score[8][5]=64;score[8][6]=60;score[9][6]=50;score[9][7]=score[8][7]=20;score[7][8]=50;score[8][8]=20;score[9][8]=0;
    score[8][9]=25;score[9][9]=0;score[9][10]=-10;score[7][9]=43;score[3][7]=55;score[3][8]=55;score[3][9]=35;score[2][9]=31;
    score[4][4]=score[4][5]=score[4][6]=score[5][4]=score[5][5]=score[5][6]=score[6][4]=score[6][5]=score[6][6]=70;score[5][7]=70;
}

function scoreset2()
{   score[8][7]=score[8][6]=score[8][5]=68;
    score[7][8]=score[6][8]=score[5][8]=69;score[4][7]=score[4][6]=score[4][5]=68; score[7][3]=score[6][3]=score[5][3]=60;
    score[7][4]=score[5][4]=score[6][4]=score[4][4]=67; score[5][2]=score[6][2]=score[7][2]=50;score[5][1]=score[6][1]=score[7][1]=30;
    score[3][7]=68; score[3][6]=64;score[3][5]=60;score[2][5]=50;score[2][4]=score[3][4]=20;score[4][3]=50;score[3][3]=20;score[2][3]=0;
    score[3][2]=25;score[2][2]=0;score[2][1]=-10;score[4][2]=43;score[8][4]=55;score[8][3]=55;score[8][2]=35;score[9][2]=31;
    score[7][7]=score[7][6]=score[7][5]=score[6][7]=score[6][6]=score[6][5]=score[5][7]=score[5][6]=score[5][5]=70;
}

/**
 * @return {number}
 */
function Score()
{
    var black = 0, white = 0, derta;
    var scoresum, scor2=0,scor3=0,scor4=0;
    var score1=0,score2=0,score3=0,score4=0,Score5=0;
    var score0=0;
    var can1=0,can2=0,can3=0,can4=0;
    var a;
    for (var w = 0; w < 12; w++)
    for (var e = 0; e < 12; e++)
    {if (Cb[w][e] === '1'){black++;scor2=scor2+score[w][e];}
    else if (Cb[w][e] === '2'){white++;scor3=scor3+score[w][e];}
    }
    for(var i=2;i<10;i++)
    for(var j=2;j<10;j++)
    {
        if (Cb[i][j] === '1')
        {
        a='2';
            if(Cb[i][j-2]===Cb[i+2][j]&&Cb[i][j-2]===a&&Cb[i+1][j-1]==='0'){score1++;}
            if(Cb[i][j-1]===Cb[i+2][j-1]&&Cb[i][j-1]===a&&Cb[i+1][j-1]==='0'){score1++;}
            if(Cb[i+1][j]===Cb[i+1][j-2]&&Cb[i][j]===a&&Cb[i+1][j-1]==='0'){score1++;}
            if(Cb[i-2][j]===Cb[i][j-2]&&Cb[i][j-2]===a&&Cb[i-1][j-1]==='0'){score1++;}
            if(Cb[i-2][j-1]===Cb[i][j-1]&&Cb[i][j-1]===a&&Cb[i-1][j-1]==='0'){score1++;}
            if(Cb[i-1][j-2]===Cb[i-1][j]&&Cb[i-1][j]===a&&Cb[i-1][j-1]==='0'){score1++;}
            if(Cb[i-2][j]===Cb[i][j+2]&&Cb[i][j+2]===a&&Cb[i-1][j+1]==='0'){score1++;}
            if(Cb[i-1][j]===Cb[i-1][j+2]&&Cb[i-1][j]===a&&Cb[i-1][j+1]==='0'){score1++;}
            if(Cb[i-2][j+1]===Cb[i][j+1]&&Cb[i][j+1]===a&&Cb[i-1][j+1]==='0'){score1++;}
            if(Cb[i+2][j]===Cb[i][j+2]&&Cb[i+2][j]===a&&Cb[i+1][j+1]==='0'){score1++;}
            if(Cb[i+2][j+1]===Cb[i][j+1]&&Cb[i][j+1]===a&&Cb[i+1][j+1]==='0'){score1++;}
            if(Cb[i+1][j]===Cb[i+1][j+2]&&Cb[i+1][j]===a&&Cb[i+1][j+1]==='0'){score1++;}
            if(Cb[i+1][j-1]===Cb[i-1][j-1]&&Cb[i-1][j-1]===a&&Cb[i][j-1]==='0'){score1++;}
            if(Cb[i+1][j+1]===Cb[i-1][j+1]&&Cb[i-1][j+1]===a&&Cb[i][j+1]==='0'){score1++;}
            if(Cb[i+1][j-1]===Cb[i+1][j+1]&&Cb[i+1][j-1]===a&&Cb[i+1][j]==='0'){score1++;}
            if(Cb[i-1][j+1]===Cb[i-1][j-1]&&Cb[i-1][j-1]===a&&Cb[i-1][j]==='0'){score1++;}
            if(Cb[i-1][j]===a&&Cb[i+1][j]==='0'&&(Cb[i][j-1]===a||Cb[i+1][j-1]===a||Cb[i+2][j-1]===a||Cb[i+2][j]===a||Cb[i+2][j+1]===a||Cb[i+1][j+1]===a||Cb[i][j+1]===a)) {score2++;}
            else if(Cb[i+1][j]===a&&Cb[i-1][j]==='0'&&(Cb[i][j-1]===a||Cb[i-1][j-1]===a||Cb[i-2][j-1]===a||Cb[i-2][j]===a||Cb[i-2][j+1]===a||Cb[i-1][j+1]===a||Cb[i][j+1]===a)) {score2++;}
            else if(Cb[i][j-1]===a&&Cb[i][j+1]==='0'&&(Cb[i-1][j]===a||Cb[i-1][j+1]===a||Cb[i-1][j+2]===a||Cb[i][j+2]===a||Cb[i+1][j+2]===a||Cb[i+1][j+1]===a||Cb[i+1][j]===a)) {score2++;}
            else if(Cb[i][j+1]===a&&Cb[i][j-1]==='0'&&(Cb[i-1][j]===a||Cb[i-1][j-1]===a||Cb[i-1][j-2]===a||Cb[i][j-2]===a||Cb[i+1][j-2]===a||Cb[i+1][j-1]===a||Cb[i+1][j]===a)) {score2++;}
            else if(Cb[i-1][j-1]===a&&Cb[i+1][j+1]==='0'&&(Cb[i+1][j]===a||Cb[i+2][j]===a||Cb[i+2][j+1]===a||Cb[i+2][j+2]===a||Cb[i+1][j+2]===a||Cb[i][j+2]===a||Cb[i][j+1]===a)) {score2++;}
            else if(Cb[i+1][j-1]===a&&Cb[i-1][j+1]==='0'&&(Cb[i-1][j]===a||Cb[i-2][j]===a||Cb[i-2][j+1]===a||Cb[i-2][j+2]===a||Cb[i-1][j+2]===a||Cb[i][j+2]===a||Cb[i][j+1]===a)) {score2++;}
            else if(Cb[i-1][j+1]===a&&Cb[i+1][j-1]==='0'&&(Cb[i+1][j]===a||Cb[i+2][j]===a||Cb[i+2][j-1]===a||Cb[i+2][j-2]===a||Cb[i+1][j-2]===a||Cb[i][j-2]===a||Cb[i][j-1]===a)) {score2++;}
            else if(Cb[i+1][j+1]===a&&Cb[i-1][j-1]==='0'&&(Cb[i-1][j]===a||Cb[i-2][j]===a||Cb[i-2][j-1]===a||Cb[i-2][j-2]===a||Cb[i-1][j-2]===a||Cb[i][j-2]===a||Cb[i][j-1]===a)) {score2++;}
        }
        if (Cb[i][j] === '2')
        {
            a='1';
            if(Cb[i][j-2]===Cb[i+2][j]&&Cb[i][j-2]===a&&Cb[i+1][j-1]==='0'){score3++;}
            if(Cb[i][j-1]===Cb[i+2][j-1]&&Cb[i][j-1]===a&&Cb[i+1][j-1]==='0'){score3++;}
            if(Cb[i+1][j]===Cb[i+1][j-2]&&Cb[i][j]===a&&Cb[i+1][j-1]==='0'){score3++;}
            if(Cb[i-2][j]===Cb[i][j-2]&&Cb[i][j-2]===a&&Cb[i-1][j-1]==='0'){score3++;}
            if(Cb[i-2][j-1]===Cb[i][j-1]&&Cb[i][j-1]===a&&Cb[i-1][j-1]==='0'){score3++;}
            if(Cb[i-1][j-2]===Cb[i-1][j]&&Cb[i-1][j]===a&&Cb[i-1][j-1]==='0'){score3++;}
            if(Cb[i-2][j]===Cb[i][j+2]&&Cb[i][j+2]===a&&Cb[i-1][j+1]==='0'){score3++;}
            if(Cb[i-1][j]===Cb[i-1][j+2]&&Cb[i-1][j]===a&&Cb[i-1][j+1]==='0'){score3++;}
            if(Cb[i-2][j+1]===Cb[i][j+1]&&Cb[i][j+1]===a&&Cb[i-1][j+1]==='0'){score3++;}
            if(Cb[i+2][j]===Cb[i][j+2]&&Cb[i+2][j]===a&&Cb[i+1][j+1]==='0'){score3++;}
            if(Cb[i+2][j+1]===Cb[i][j+1]&&Cb[i][j+1]===a&&Cb[i+1][j+1]==='0'){score3++;}
            if(Cb[i+1][j]===Cb[i+1][j+2]&&Cb[i+1][j]===a&&Cb[i+1][j+1]==='0'){score3++;}
            if(Cb[i+1][j-1]===Cb[i-1][j-1]&&Cb[i-1][j-1]===a&&Cb[i][j-1]==='0'){score3++;}
            if(Cb[i+1][j+1]===Cb[i-1][j+1]&&Cb[i-1][j+1]===a&&Cb[i][j+1]==='0'){score3++;}
            if(Cb[i+1][j-1]===Cb[i+1][j+1]&&Cb[i+1][j-1]===a&&Cb[i+1][j]==='0'){score3++;}
            if(Cb[i-1][j+1]===Cb[i-1][j-1]&&Cb[i-1][j-1]===a&&Cb[i-1][j]==='0'){score3++;}
            if(Cb[i-1][j]===a&&Cb[i+1][j]==='0'&&(Cb[i][j-1]===a||Cb[i+1][j-1]===a||Cb[i+2][j-1]===a||Cb[i+2][j]===a||Cb[i+2][j+1]===a||Cb[i+1][j+1]===a||Cb[i][j+1]===a)) {score4++;}
            else if(Cb[i+1][j]===a&&Cb[i-1][j]==='0'&&(Cb[i][j-1]===a||Cb[i-1][j-1]===a||Cb[i-2][j-1]===a||Cb[i-2][j]===a||Cb[i-2][j+1]===a||Cb[i-1][j+1]===a||Cb[i][j+1]===a)) {score4++;}
            else if(Cb[i][j-1]===a&&Cb[i][j+1]==='0'&&(Cb[i-1][j]===a||Cb[i-1][j+1]===a||Cb[i-1][j+2]===a||Cb[i][j+2]===a||Cb[i+1][j+2]===a||Cb[i+1][j+1]===a||Cb[i+1][j]===a)) {score4++;}
            else if(Cb[i][j+1]===a&&Cb[i][j-1]==='0'&&(Cb[i-1][j]===a||Cb[i-1][j-1]===a||Cb[i-1][j-2]===a||Cb[i][j-2]===a||Cb[i+1][j-2]===a||Cb[i+1][j-1]===a||Cb[i+1][j]===a)) {score4++;}
            else if(Cb[i-1][j-1]===a&&Cb[i+1][j+1]==='0'&&(Cb[i+1][j]===a||Cb[i+2][j]===a||Cb[i+2][j+1]===a||Cb[i+2][j+2]===a||Cb[i+1][j+2]===a||Cb[i][j+2]===a||Cb[i][j+1]===a)) {score4++;}
            else if(Cb[i+1][j-1]===a&&Cb[i-1][j+1]==='0'&&(Cb[i-1][j]===a||Cb[i-2][j]===a||Cb[i-2][j+1]===a||Cb[i-2][j+2]===a||Cb[i-1][j+2]===a||Cb[i][j+2]===a||Cb[i][j+1]===a)) {score4++;}
            else if(Cb[i-1][j+1]===a&&Cb[i+1][j-1]==='0'&&(Cb[i+1][j]===a||Cb[i+2][j]===a||Cb[i+2][j-1]===a||Cb[i+2][j-2]===a||Cb[i+1][j-2]===a||Cb[i][j-2]===a||Cb[i][j-1]===a)) {score4++;}
            else if(Cb[i+1][j+1]===a&&Cb[i-1][j-1]==='0'&&(Cb[i-1][j]===a||Cb[i-2][j]===a||Cb[i-2][j-1]===a||Cb[i-2][j-2]===a||Cb[i-1][j-2]===a||Cb[i][j-2]===a||Cb[i][j-1]===a)) {score4++;}
        }

    }
    if (FIELD === 1)
    {
        derta = black - white;
        scor4=scor2;
        if(derta>=4){can1=0.5;can2=2;can3=2;can4=0;}
        else if(derta<4&&derta>0){ can1=1;can2=1;can3=1;can4=1;}
        else if(derta<=0) {can1=2;can2=1;can3=0;can4=2;}
        Score5=300*(can1*(score1+score4)-can2*(score2+score3));
    }

    else if(FIELD===2)
    {
        derta = white - black;
        scor4=scor3;
        if(derta>=4){ can1=0.5;can2=2;can3=2;can4=0;}
        else if(derta<4&&derta>0){can1=1;can2=1;can3=1;can4=1;}
        else if(derta<=0) {can1=2;can2=1;can3=0;can4=2;}
        Score5=300*(can1*(score2+score3)-can2*(score1+score4));}
    for (var o = 1; o < 11; o++)
    for (var p = 1; p < 11; p++)
    {
        if(FIELD===1)
        {
            if(Cb[o][p]==='1')
            {
                for(var z=o-1;z<o+2;z++)
                    for(var v=p-1;v<p+2;v++)
                    {
                        if(Cb[z][v]==='1')score0+=can3;
                        else if(Cb[z][v]==='2')score0+=can4;
                    }
                score0-=can3;
            }
        }
        if(FIELD===2)
        {
            if(Cb[o][p]==='2')
            {
                for(var m=o-1;m<o+2;m++)
                    for(var n=p-1;n<p+2;n++)
                    {
                        if(Cb[m][n]==='2')score0+=can3;
                        else if(Cb[m][n]==='1')score0+=can4;
                    }
                score0-=can3;
            }
        }
    }

    if(turns>=40){scoresum = 1000 * derta+30*score0+Score5;}
    if(turns<40){scoresum = 1000 * derta+scor4+Score5;}
    return scoresum;
}
/**
 * @return {number}
 */
function Check( i, j,  dir1)
{	var judge = 0;
    if (i !== CHECK[dir1][0] && j !== CHECK[dir1][1]&& Cb[i + JUMP[dir1][0]][j + JUMP[dir1][1]] === '0')
        judge = 1;
    return judge;
}

function Jump( i,  j, dir1)
{	var t;
    t = Cb[i][j];
    Cb[i][j] = Cb[i +JUMP[dir1][0]][j+JUMP[dir1][1]];
    Cb[i +JUMP[dir1][0]][j+JUMP[dir1][1]] = t;
}

function Turns()
{	pre_x+=JUMP[dir][0];
    pre_y+=JUMP[dir][1];
}

function Eat( x,  y)
{   for(var i=0;i<12;i++){POS[i]='0';}
    var a = Cb[x][y];
    var c;
    if (a === '1')c = '2';
    else c = '1';
    if (x !== 0 && x !== 11 && Cb[x - 1][y] === c && Cb[x + 1][y] === Cb[x - 1][y]) { Cb[x + 1][y] = Cb[x - 1][y] = a; POS[0] = '1'; }
    if (y !== 0 && y !== 11 && Cb[x][y - 1] === c && Cb[x][y + 1] === Cb[x][y - 1]) { Cb[x][y - 1] = Cb[x][y + 1] = a; POS[1] = '1'; }
    if (x !== 0 && x !== 11 && y !== 0 && y !== 11 && Cb[x - 1][y - 1] === c && Cb[x + 1][y + 1] === Cb[x - 1][y - 1]) { Cb[x + 1][y + 1] = Cb[x - 1][y - 1] = a; POS[2] = '1'; }
    if (x !== 0 && x !== 11 && y !== 0 && y !== 11 && Cb[x - 1][y + 1] === c && Cb[x + 1][y - 1] === Cb[x - 1][y + 1]) { Cb[x + 1][y - 1] = Cb[x - 1][y + 1] = a; POS[3] = '1'; }
    if (x > 1 && Cb[x - 2][y] === a && Cb[x - 1][y] === c) { Cb[x - 1][y] = a; POS[4] = '1'; }
    if (x < 10 && Cb[x + 2][y] === a && Cb[x + 1][y] === c) { Cb[x + 1][y] = a; POS[5] = '1'; }
    if (y > 1 && Cb[x][y - 2] === a && Cb[x][y - 1] === c) { Cb[x][y - 1] = a; POS[6] = '1'; }
    if (y < 10 && Cb[x][y + 2] === a && Cb[x][y + 1] === c) { Cb[x][y + 1] = a; POS[7] = '1'; }
    if (x > 1 && y > 1 && Cb[x - 2][y - 2] === a && Cb[x - 1][y - 1] === c) { Cb[x - 1][y - 1] = a; POS[8] = '1'; }
    if (x > 1 && y < 10 && Cb[x - 2][y + 2] === a && Cb[x - 1][y + 1] === c) { Cb[x - 1][y + 1] = a; POS[9] = '1'; }
    if (x < 10 && y>1 && Cb[x + 2][y - 2] === a && Cb[x + 1][y - 1] === c) { Cb[x + 1][y - 1] = a; POS[10] = '1'; }
    if (x < 10 && y < 10 && Cb[x + 2][y + 2] === a && Cb[x + 1][y + 1] === c) { Cb[x + 1][y + 1] = a; POS[11] = '1'; }
}
function boardEat( x,  y)
{
    var a = Cb[x][y];
    var ia;
    var c;
    if (a === '1')
    {
        c = '2';
        ia=0;
    }
    else
    {
        c = '1';
        ia=1;
    }
    if (x !== 0 && x !== 11 && Cb[x - 1][y] === c && Cb[x + 1][y] === Cb[x - 1][y])
    {
        Cb[x + 1][y] = Cb[x - 1][y] = a;
        releaseChess((y+1)*40+20,((x+1)+1)*40+20);
        releaseChess((y+1)*40+20,((x-1)+1)*40+20);
        drawChess((y+1)*40+20,((x+1)+1)*40+20,chessColor[ia]);
        drawChess((y+1)*40+20,((x-1)+1)*40+20,chessColor[ia]);
        if(!ia) {BC+=2;WC-=2;}
        else {WC+=2;BC-=2;}

    }
    if (y !== 0 && y !== 11 && Cb[x][y - 1] === c && Cb[x][y + 1] === Cb[x][y - 1])
    {
        Cb[x][y - 1] = Cb[x][y + 1] = a;
        releaseChess(((y-1) + 1)*40+20,((x)+1)*40+20);
        releaseChess(((y+1)+1)*40+20,((x)+1)*40+20);
        drawChess(((y-1) + 1)*40+20,((x)+1)*40+20,chessColor[ia]);
        drawChess(((y+1)+1)*40+20,((x)+1)*40+20,chessColor[ia]);
        if(!ia) {BC+=2;WC-=2;}
        else {WC+=2;BC-=2;}
    }
    if (x !== 0 && x !== 11 && y !== 0 && y !== 11 && Cb[x - 1][y - 1] === c && Cb[x + 1][y + 1] === Cb[x - 1][y - 1])
    {
        Cb[x + 1][y + 1] = Cb[x - 1][y - 1] = a;
        releaseChess(((y+1) + 1)*40+20,((x+1)+1)*40+20);
        releaseChess(((y-1)+1)*40+20,((x-1)+1)*40+20);
        drawChess(((y+1) + 1)*40+20,((x+1)+1)*40+20,chessColor[ia]);
        drawChess(((y-1)+1)*40+20,((x-1)+1)*40+20,chessColor[ia]);
        if(!ia) {BC+=2;WC-=2;}
        else {WC+=2;BC-=2;}
    }
    if (x !== 0 && x !== 11 && y !== 0 && y !== 11 && Cb[x - 1][y + 1] === c && Cb[x + 1][y - 1] === Cb[x - 1][y + 1])
    {
        Cb[x + 1][y - 1] = Cb[x - 1][y + 1] = a;
        releaseChess(((y-1) + 1)*40+20,((x+1)+1)*40+20);
        releaseChess(((y+1)+1)*40+20,((x-1)+1)*40+20);
        drawChess(((y-1) + 1)*40+20,((x+1)+1)*40+20,chessColor[ia]);
        drawChess(((y+1)+1)*40+20,((x-1)+1)*40+20,chessColor[ia]);
        if(!ia) {BC+=2;WC-=2;}
        else {WC+=2;BC-=2;}
    }
    if (x > 1 && Cb[x - 2][y] === a && Cb[x - 1][y] === c)
    {
        Cb[x - 1][y] = a;
        releaseChess(((y) +1)*40+20,((x-1)+1)*40+20);
        drawChess(((y) +1)*40+20,((x-1)+1)*40+20,chessColor[ia]);
        if(!ia) {BC+=1;WC-=1;}
        else {WC+=1;BC-=1;}
    }
    if (x < 10 && Cb[x + 2][y] === a && Cb[x + 1][y] === c)
    {
        Cb[x + 1][y] = a;
        releaseChess(((y)+1)*40+20,((x+1)+1)*40+20);
        drawChess(((y)+1)*40+20,((x+1)+1)*40+20,chessColor[ia]);
        if(!ia) {BC+=1;WC-=1;}
        else {WC+=1;BC-=1;}
    }
    if (y > 1 && Cb[x][y - 2] === a && Cb[x][y - 1] === c)
    {
        Cb[x][y - 1] = a;
        releaseChess(((y-1)+1)*40+20,((x)+1)*40+20);
        drawChess(((y-1)+1)*40+20,((x)+1)*40+20,chessColor[ia]);
        if(!ia) {BC+=1;WC-=1;}
        else {WC+=1;BC-=1;}
    }
    if (y < 10 && Cb[x][y + 2] === a && Cb[x][y + 1] === c)
    {
        Cb[x][y + 1] = a;
        releaseChess(((y+1) + 1)*40+20,((x)+1)*40+20);
        drawChess(((y+1) + 1)*40+20,((x)+1)*40+20,chessColor[ia]);
        if(!ia) {BC+=1;WC-=1;}
        else {WC+=1;BC-=1;}
    }
    if (x > 1 && y > 1 && Cb[x - 2][y - 2] === a && Cb[x - 1][y - 1] === c)
    {
        Cb[x - 1][y - 1] = a;
        releaseChess(((y-1) + 1)*40+20,((x-1)+1)*40+20);
        drawChess(((y-1) + 1)*40+20,((x-1)+1)*40+20,chessColor[ia]);
        if(!ia) {BC+=1;WC-=1;}
        else {WC+=1;BC-=1;}
    }
    if (x > 1 && y < 10 && Cb[x - 2][y + 2] === a && Cb[x - 1][y + 1] === c)
    {
        Cb[x - 1][y + 1] = a;
        releaseChess(((y+1) + 1)*40+20,((x-1)+1)*40+20);
        drawChess(((y+1) + 1)*40+20,((x-1)+1)*40+20,chessColor[ia]);
        if(!ia) {BC+=1;WC-=1;}
        else {WC+=1;BC-=1;}
    }
    if (x < 10 && y>1 && Cb[x + 2][y - 2] === a && Cb[x + 1][y - 1] === c)
    {
        Cb[x + 1][y - 1] = a;
        releaseChess(((y-1) + 1)*40+20,((x+1)+1)*40+20);
        drawChess(((y-1) + 1)*40+20,((x+1)+1)*40+20,chessColor[ia]);
        if(!ia) {BC+=1;WC-=1;}
        else {WC+=1;BC-=1;}
    }
    if (x < 10 && y < 10 && Cb[x + 2][y + 2] === a && Cb[x + 1][y + 1] === c)
    {
        Cb[x + 1][y + 1] = a;
        releaseChess(((y+1) + 1)*40+20,((x+1)+1)*40+20);
        drawChess(((y+1) + 1)*40+20,((x+1)+1)*40+20,chessColor[ia]);
        if(!ia) {BC+=1;WC-=1;}
        else {WC+=1;BC-=1;}
    }

     document.getElementById("BC").innerHTML = BC;
     document.getElementById("WC").innerHTML = WC;

}

function Back( x, y,  pos)
{
    var a = Cb[x][y];
    var b;
    if (a === '1')b = '2';
    else b = '1';
    for (var i = 0; i < 12; i++)
    {
        if (pos[i] === '1')
           {
               Cb[x + BACK[i][0]][y +BACK[i][1]] = Cb[x +BACK[i][2]][y +BACK[i][3]] = b;
           }
    }
}

/**
 * @return {number}
 */
function Search( deep,  color, beta)
{
    var alpha=-20000, scoresum = -20000,score=0, i=0, j=0, a=0,I=0,J=0,A=0,judge=0,count=0,Q=0;
    var pos=['1','1','1','1','1','1','1','1','1','1','1','1'];
    var color1,t;
    var num=[];
    var checkCB=[];
    for(var w=0;w<128;w++)
    {
        num[w]=[];
        for(var e=0;e<4;e++)
            num[w][e]=0;
    }
    if (color === '1')color1 = '2';
    else if (color === '2') color1 = '1';
    for ( i = 0; i < 12; i++)
    {
        for ( j = 0; j < 12; j++)
    {
        if (Cb[i][j] === color)
    {
        for ( a = 7; a >= 0; a--)
    {
        judge=Check(i,j,a);
        if (judge === 0) {  }
        else if(judge===1)
        {	num[count][0] = i;
            num[count][1] = j;
            num[count][2] = a;
            num[count][3] = BT[i][j][a];
            if (num[count][3] !== 0)
            { Q = 1; }
            count++;
        }
    }
    }
    }
    }
    if(count===0){return -18000;}
    if (Q !== 0) { num.sort(function (x,y) {
        return x[3]<y[3]?1:-1;
    }); }//sort
    for (var k = 0; k < 128; k++)
    {	i = num[k][0];
        j = num[k][1];
        a = num[k][2];
        if (i!==0||j!==0||a!==0)
        {
            Jump(i, j, a);
             Eat(i +JUMP[a][0], j+JUMP[a][1]);
             //字符赋值
            for(var ck=0;ck<12;ck++)
                pos[ck]=POS[ck];

            if (deep >= difficult)
            {
                score = Score();
            }

            else
                {
                    score = -Search(deep + 1, color1,-alpha);
                }
            if(pos[0]!=='0'||pos[1]!=='0'||pos[2]!=='0'||pos[3]!=='0'||pos[4]!=='0'||pos[5]!=='0'||pos[6]!=='0'||pos[7]!=='0'||pos[8]!=='0'||pos[9]!=='0'||pos[10]!=='0'||pos[11]!=='0')//字符比较
            {
                Back(i +JUMP[a][0], j+JUMP[a][1], pos);


            }
            t = Cb[i][j];
            Cb[i][j] = Cb[i +JUMP[a][0]][j+JUMP[a][1]];
            Cb[i +JUMP[a][0]][j+JUMP[a][1]] = t;
            if (scoresum < score)
            {
                scoresum = score;
                alpha=score;
                I = i;
                J = j;
                A = a;
            }
            if(alpha>=beta)
            {
                BT[i][j][a]+=(6-deep)*(6-deep);
                return beta;
            }
        }
    }
    BT[I][J][A]+=(6-deep)*(6-deep);
    if(deep===1){
        pre_x=I;pre_y=J;dir=A;
    }
    return scoresum;
}

function dirDeal(x1,y1,x2,y2)
{
    var dertaX=x2-x1;
    var dertaY=y2-y1;
    if(dertaX===-1&&dertaY===0)dir=0;
    if(dertaX===1&&dertaY===0)dir=1;
    if(dertaX===0&&dertaY===-1)dir=2;
    if(dertaX===0&&dertaY===1)dir=3;
    if(dertaX===-1&&dertaY===-1)dir=4;
    if(dertaX===-1&&dertaY===1)dir=5;
    if(dertaX===1&&dertaY===-1)dir=6;
    if(dertaX===1&&dertaY===1)dir=7;

}

//胜负判断函数
function checkWin(x,y,color,mode)
{
    var count = 1;//记录分数
    for(var i=1;i<5;i++){
        if(chessMapArr[x + i * mode[0]]){
            if(chessMapArr[x + i * mode[0]][y + i * mode[1]] == color){
                count++;
            }else{
                break;
            }
        }
    }

    for(var j=1;j<5;j++){
        if(chessMapArr[x - j * mode[0]]){
            if(chessMapArr[x - j * mode[0]][y - j * mode[1]] == color){
                count++;
            }else{
                break;
            }
        }
    }
    if(mode == checkMode[0])
    { console.log("水平方向有： " + count + "个" + color);}
    if(mode == checkMode[1])
    { console.log("竖直方向有： " + count + "个" + color);}
    if(mode == checkMode[2])
    { console.log("左斜方向有： " + count + "个" + color);}
    if(mode == checkMode[3])
    { console.log("右斜方向有： " + count + "个" + color);}

    if(count >= 5){
        alert(color + " you habe win!" + "帅~");
        // 游戏结束
        flag = true;
    }
}

//粒子效果

!function(){ //匿名函数 立即执行
    function n(n,e,t){ //函数嵌套
        return n.getAttribute(e)||t
    }

    function e(n){
        return document.getElementsByTagName(n)
    }

    function t(){
        var t=e("script"),o=t.length,i=t[o-1];
        return{
            l:o,z:n(i,"zIndex",-1),o:n(i,"opacity",.5),c:n(i,"color","0,0,0"),n:n(i,"count",99)
        }
    }

    function o(){
        a=m.width=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,
            c=m.height=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight
    }

    function i(){
        r.clearRect(0,0,a,c);
        var n,e,t,o,m,l;
        s.forEach(function(i,x){
            for(i.x+=i.xa,i.y+=i.ya,i.xa*=i.x>a||i.x<0?-1:1,i.ya*=i.y>c||i.y<0?-1:1,r.fillRect(i.x-.5,i.y-.5,1,1),e=x+1;e<u.length;e++)n=u[e],
            null!==n.x&&null!==n.y&&(o=i.x-n.x,m=i.y-n.y,
                l=o*o+m*m,l<n.max&&(n===y&&l>=n.max/2&&(i.x-=.03*o,i.y-=.03*m),
                t=(n.max-l)/n.max,r.beginPath(),r.lineWidth=t/2,r.strokeStyle="rgba("+d.c+","+(t+.2)+")",r.moveTo(i.x,i.y),r.lineTo(n.x,n.y),r.stroke()))
        }), x(i)
    }

    var a,c,u,m=document.createElement("canvas"),
        d=t(),l="c_n"+d.l,r=m.getContext("2d"),
        x=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||
            function(n){
                window.setTimeout(n,1e3/45)
            },
        w=Math.random,y={x:null,y:null,max:2e4};m.id=l,m.style.cssText="position:fixed;top:0;left:0;z-index:"+d.z+";opacity:"+d.o,e("body")[0].appendChild(m),o(),window.οnresize=o,
        window.onmousemove=function(n){
            n=n||window.event,y.x=n.clientX,y.y=n.clientY
        },
        window.onmouseout=function(){
            y.x=null,y.y=null
        };
    for(var s=[],f=0;d.n>f;f++){
        var h=w()*a,g=w()*c,v=2*w()-1,p=2*w()-1;s.push({x:h,y:g,xa:v,ya:p,max:6e3})
    }
    u=s.concat([y]),
        setTimeout(function(){i()},100)
}();

