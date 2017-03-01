//*****************************************
//     Cricket.js
//     Script for Regular_Cricket.html
//*****************************************
var throwCounter = 1;
var roundCounter = 1;

var playerStack = new Array();
var scoreStack = new Array();
var pStack = new Array();
var mStack = new Array();
var throwStack = new Array();
var roundStack = new Array();

playerStack.push(-1);

//***********************
//      UPDATE SCORE
//***********************
function updateScore(pvalue, multiplier)
{
    var player = "p" + findPlayer(); //find player
    var playerScore = "p" +findPlayer() + "Score";
    var oppositePlayer = findOppositePlayer(playerScore);
    
    playerStack.push(player);
    scoreStack.push(document.getElementById(playerScore).innerHTML);
    pStack.push(pvalue);
    mStack.push(multiplier);
    
    if(pvalue == 20)
        {player+="20Mark";
         oppositePlayer+="20Mark";}
    if(pvalue == 19)
        {player+="19Mark";
         oppositePlayer+="19Mark";}
    if(pvalue == 18)
        {player+="18Mark";
         oppositePlayer+="18Mark";}
    if(pvalue == 17)
        {player+="17Mark";
         oppositePlayer+="17Mark";}
    if(pvalue == 16)
        {player+="16Mark";
         oppositePlayer+="16Mark";}
    if(pvalue == 15)
        {player+="15Mark";
         oppositePlayer+="15Mark";}
    if(pvalue == 25)
        {player+="BullMark";
         oppositePlayer+="BullMark";}
    
    for(x=1; x<=multiplier; x++)
    {
        document.getElementById(player).innerHTML++;   //Add hit counter
        
        if(document.getElementById(player).innerHTML > 3){  //Current Player has 3
            if(document.getElementById(oppositePlayer).innerHTML<3){ //Other does not
                var newScore = document.getElementById(playerScore).innerHTML;
                var score = parseInt(newScore, 10) + pvalue;
                document.getElementById(playerScore).innerHTML = score; 
            }
        }  
    }
    
    if(checkScore())
        checkWinner();    
    
    updateLabels(); //updates throw/round/turn marker
}

//***********************
//      UPDATE LABELS
//***********************
function updateLabels()
{
    throwStack.push(throwCounter);
    roundStack.push(roundCounter);
    throwCounter++;
    
    if(throwCounter==7){
        roundCounter++;
        document.getElementById("roundCountLabel").innerHTML = roundCounter;
        throwCounter = 1;
        document.getElementById("throwCountLabel").innerHTML = throwCounter;
        document.getElementById("cP1Mark").style.display = "";
        document.getElementById("cP2Mark").style.display ="none";
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
        return "2";        
    }
    else
    {
        return "1";       
    }
}

//***********************
//  FINDS OTHER PLAYER
//***********************
function findOppositePlayer(player)
{
    if(player == "p1Score")
        return "p2";
    else if(player == "p2Score")
        return "p1";
}

//***********************
//  CHECK FOR WINNER
//***********************
function checkWinner()
{    
    for(x=20; x>=15; x--)
    {
        var checkPlayer = "p" + findPlayer() + x + "Mark";
        
        if(document.getElementById(checkPlayer).innerHTML < 3)
            {return;}
    }
    
    var bullCheckP="p" + findPlayer() + "BullMark";
    if(document.getElementById(bullCheckP).innerHTML < 3)
        {return;}
    else
    {
        alert("You have won!");
        return;}
}

//*******************************
//  CHECK SCORE TO SEE IF WIN
//*******************************
function checkScore()
{
    var currentPlayer = "p" + findPlayer() + "Score";
    var opposingPlayer = findOppositePlayer(currentPlayer) + "Score";
    
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

//*******************************
//  UNDO BUTTON
//*******************************
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
        var undoScore = scoreStack.pop();
        var undoPVal = pStack.pop();
        var undoMult = mStack.pop();
        var undoThrow = throwStack.pop();
        var undoRound = roundStack.pop();
        var undoPS = undoPlayer + "Score";
        
        if(undoPlayer.localeCompare("p1") == 0)
        {
            document.getElementById("cP1Mark").style.display = "";
            document.getElementById("cP2Mark").style.display ="none";
        }
        if(undoPlayer.localeCompare("p2") == 0)
        {
            document.getElementById("cP1Mark").style.display = "none";
            document.getElementById("cP2Mark").style.display ="";
        }
        
        if(undoPVal == 20)
            {undoPlayer+="20Mark";}
        if(undoPVal == 19)
            {undoPlayer+="19Mark";}
        if(undoPVal == 18)
            {undoPlayer+="18Mark";}
        if(undoPVal == 17)
            {undoPlayer+="17Mark";}
        if(undoPVal == 16)
            {undoPlayer+="16Mark";}
        if(undoPVal == 15)
            {undoPlayer+="15Mark";}
        if(undoPVal == 25)
            {undoPlayer+="BullMark";}
        
        document.getElementById(undoPS).innerHTML = undoScore;
        
        for(x=1; x<=undoMult; x++)
        { 
            document.getElementById(undoPlayer).innerHTML--;
        }
        
        throwCounter = undoThrow;
        roundCounter = undoRound;
        
        if(throwCounter==7)
        {
            throwCounter = 1;
        } 
        else if(throwCounter>=4)
        {
            document.getElementById("throwCountLabel").innerHTML = throwCounter-3;
        }
        else
        {
            document.getElementById("throwCountLabel").innerHTML = undoThrow;  
        }
                
        document.getElementById("roundCountLabel").innerHTML = undoRound;
    }
}




