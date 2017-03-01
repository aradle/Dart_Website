//*****************************************
//     mixedScript.js
//     Script for Mixed_Cricket.html
//*****************************************
var throwCounter = 1;
var roundCounter = 1;

var playerStack = new Array();
var scoreStack = new Array();
var pStack = new Array();
var mStack = new Array();
var pHStack = new Array();
var throwStack = new Array();
var roundStack = new Array();
var x1Stack = new Array();
var x2Stack = new Array();
var x3Stack = new Array();
var x4Stack = new Array();
var x5Stack = new Array();
var x6Stack = new Array();

playerStack.push(-1);

//******************************
//      SETS NUMBERS FOR START
//******************************
function setNumbers()
{
    var checkLabel;
    var checkNumber;
    for(x=1; x<=6; x++)
    {   
        //Creates random number(7-20) to hit
        var currNum = Math.floor(Math.random()*14)+7;
        //Label for which position that number will be
        var label = "num" + x;
        
        //Check for no repeats        
        for(y=x; y>=1; y--)
        {
            checkLabel = "num" + y;
            checkNumber = document.getElementById(checkLabel).innerHTML;
            if(checkNumber == currNum)
            {
                currNum = Math.floor(Math.random()*14)+7;
                y= x;
            }
        }  
        //sets the random number to appropriate label
        document.getElementById(label).innerHTML = currNum; 
    }  
}

//******************************
//      SETS BUTTONS FOR START
//******************************
function setButtons()
{
    var x1 = document.getElementById("num1").innerHTML;
    var x2 = document.getElementById("num2").innerHTML;
    var x3 = document.getElementById("num3").innerHTML;
    var x4 = document.getElementById("num4").innerHTML;
    var x5 = document.getElementById("num5").innerHTML;
    var x6 = document.getElementById("num6").innerHTML;
    
    document.getElementById("x1SingleB").innerHTML = x1;
    document.getElementById("x1DoubleB").innerHTML = "Double " + x1;
    document.getElementById("x1TripleB").innerHTML = "Triple " + x1;
    
    document.getElementById("x2SingleB").innerHTML = x2;
    document.getElementById("x2DoubleB").innerHTML = "Double " + x2;
    document.getElementById("x2TripleB").innerHTML = "Triple " + x2;
    
    document.getElementById("x3SingleB").innerHTML = x3;
    document.getElementById("x3DoubleB").innerHTML = "Double " + x3;
    document.getElementById("x3TripleB").innerHTML = "Triple " + x3;
    
    document.getElementById("x4SingleB").innerHTML = x4;
    document.getElementById("x4DoubleB").innerHTML = "Double " + x4;
    document.getElementById("x4TripleB").innerHTML = "Triple " + x4;
    
    document.getElementById("x5SingleB").innerHTML = x5;
    document.getElementById("x5DoubleB").innerHTML = "Double " + x5;
    document.getElementById("x5TripleB").innerHTML = "Triple " + x5;
    
    document.getElementById("x6SingleB").innerHTML = x6;
    document.getElementById("x6DoubleB").innerHTML = "Double " + x6;
    document.getElementById("x6TripleB").innerHTML = "Triple " + x6;   
}

//******************************
//      UPDATE POINTS
//******************************
function getPoints(buttonID, multiplier, numHit)
{    
    var pvalue = document.getElementById(buttonID).innerHTML; //Get the value
    var playerScore = findPlayer() + "Score";
    var oppositePlayer;
    var player;
    
    playerStack.push(findPlayer());
    scoreStack.push(document.getElementById(playerScore).innerHTML);
    mStack.push(multiplier);
    throwStack.push(throwCounter);
    roundStack.push(roundCounter);
    x1Stack.push(document.getElementById("num1").innerHTML);
    x2Stack.push(document.getElementById("num2").innerHTML);
    x3Stack.push(document.getElementById("num3").innerHTML);
    x4Stack.push(document.getElementById("num4").innerHTML);
    x5Stack.push(document.getElementById("num5").innerHTML);
    x6Stack.push(document.getElementById("num6").innerHTML);
    
    
    //Convert if Bull to a number
    if(pvalue.localeCompare("Single Bull") == 0)     
    {
        pvalue = 25;
    }
    else if(pvalue.localeCompare("Double Bull") == 0)
    {
        pvalue = 50;
    }
    pvalue = parseInt(pvalue, 10);
    
    
    //Find the number which was hit
    if(numHit!=0)
    {
        player = findPlayer() + "num" + numHit;
        oppositePlayer = findOppositePlayer() + "num" + numHit;
    }
    else if(numHit==0)
    {
        player = findPlayer() + "BullMark";
        oppositePlayer = findOppositePlayer() + "BullMark";
    }
    
    var pHitCounter = document.getElementById(player).innerHTML;
    var oppHitCounter = document.getElementById(oppositePlayer).innerHTML;
    
    pStack.push(pvalue);
    pHStack.push(player);
    
    for(x=1; x<=multiplier; x++)
    {
        pHitCounter++;
        if(pHitCounter>3)
        {
            if(oppHitCounter<3)
            {
                var oldScore = document.getElementById(playerScore).innerHTML;
                var newScore = parseInt(oldScore, 10) + pvalue;
                document.getElementById(playerScore).innerHTML = newScore;
            }
        }
    }
    
    document.getElementById(player).innerHTML = pHitCounter;
    
    if(checkScore())    //If player has a winning score, check for win
    {    checkWinner();}
    
    updateLabels(); //updates throw/round/turn marker
}

//***********************
//      UPDATE LABELS
//***********************
function updateLabels()
{
    throwCounter++;
    
    if(throwCounter==7){
        roundCounter++;
        document.getElementById("roundCountLabel").innerHTML = roundCounter;
        throwCounter = 1;
        document.getElementById("throwCountLabel").innerHTML = throwCounter;
        document.getElementById("cP1Mark").style.display = "";
        document.getElementById("cP2Mark").style.display ="none";
        changeNumbers();
    } 
    else if(throwCounter>=4){
        document.getElementById("throwCountLabel").innerHTML = throwCounter-3;
        document.getElementById("cP1Mark").style.display = "none";
        document.getElementById("cP2Mark").style.display ="";
    }
    else
        document.getElementById("throwCountLabel").innerHTML = throwCounter;
}

//***********************
//    FINDS PLAYER
//***********************
function findPlayer()
{
    if(document.getElementById("cP1Mark").style.display == "none")
    {
        return "p2";        
    }
    else
    {
        return "p1";       
    }
}

//***********************
//  FINDS OTHER PLAYER
//***********************
function findOppositePlayer()
{
     if(document.getElementById("cP1Mark").style.display == "none")
    {
        return "p1";        
    }
    else
    {
        return "p2";       
    }
}

//****************************
//  CHANGES NUMBERS NOT HIT
//****************************
function changeNumbers()
{
    var checkNumber;
    var checkLabel;
    var checkNumber;
    var p1Hit;
    var p2Hit;
    
    for(x=1; x<=6; x++)
    {
        checkNumber = "num" + x;
        p1Hit = document.getElementById("p1" + checkNumber).innerHTML;
        p2Hit = document.getElementById("p2" + checkNumber).innerHTML;
        
        //find if the number needs to change
        if(p1Hit == 0 && p2Hit == 0)
        {
            //Creates random number(7-20) to hit
            var currNum = Math.floor(Math.random()*14)+7;
            
            //Check for no repeats
            for(y=x; y>=1; y--)
            {
                checkLabel = "num" + y;
                checkNumber2 = document.getElementById(checkLabel).innerHTML;
                
                if(checkNumber2 == currNum)
                {
                    currNum = Math.floor(Math.random()*14)+7;
                    y = x;
                }
            }
            
            //sets the random number to appropriate label
            document.getElementById(checkNumber).innerHTML = currNum;
        }
    }
    setButtons();
}

//***********************
//  CHECKS FOR WINNER
//***********************
function checkWinner()
{    
    for(x=6; x>=1; x--)
    {
        var checkPlayer = findPlayer() + "num" + x;
        
        if(document.getElementById(checkPlayer).innerHTML < 3)
            {return;}
    }
    
    var bullCheckP= findPlayer() + "BullMark";
    if(document.getElementById(bullCheckP).innerHTML < 3)
        {return;}
    else
    {
        alert("You have won!");
        return;}
}

//***********************
//  CHECKS SCORE
//***********************
function checkScore()
{
    var currentPlayer = findPlayer() + "Score";
    var opposingPlayer = findOppositePlayer() + "Score";
    
    var currentPlayerScore = document.getElementById(currentPlayer).innerHTML;
    var opposingPlayerScore = document.getElementById(opposingPlayer).innerHTML;
    
    if(currentPlayerScore >= opposingPlayerScore)
    {
        return true;
    }  
    else
    {
        return false;    
    }   
}

//***********************
//  UNDO BUTTON
//***********************
function undoDart()
{
    var undoPlayer = playerStack.pop();
    
    if(undoPlayer == -1)
    {
        alert("No moves to undo.");
        playerStack.push(-1);
    }
    else
    {
        document.getElementById("num1").innerHTML = x1Stack.pop();
        document.getElementById("num2").innerHTML = x2Stack.pop();
        document.getElementById("num3").innerHTML = x3Stack.pop();
        document.getElementById("num4").innerHTML = x4Stack.pop();
        document.getElementById("num5").innerHTML = x5Stack.pop();
        document.getElementById("num6").innerHTML = x6Stack.pop();
       
        var undoScore = scoreStack.pop();
        document.getElementById(undoPlayer+"Score").innerHTML = undoScore;
        
        var undoThrow = throwStack.pop();
        var undoRound = roundStack.pop();
        
        throwCounter = undoThrow;
        roundCounter = undoRound;
        
        document.getElementById("throwCountLabel").innerHTML = undoThrow;
        document.getElementById("roundCountLabel").innerHTML = undoRound;
        
        if(throwCounter>=4)
        {
            document.getElementById("cP1Mark").style.display = "none";
            document.getElementById("cP2Mark").style.display ="";
        }
        else
        {
            document.getElementById("cP1Mark").style.display = "";
            document.getElementById("cP2Mark").style.display ="none";
        }
    
        var undoPH = pHStack.pop();
        var undoMult = mStack.pop();
        
        for(x=1; x<=undoMult; x++)
        {
            document.getElementById(undoPH).innerHTML--;
        }
    }
}


