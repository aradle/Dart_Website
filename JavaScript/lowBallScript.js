var throwCounter = 1;
var roundCounter = 1;

var playerStack = new Array();
var scoreStack = new Array();
var pStack = new Array();
var mStack = new Array();
var throwStack = new Array();
var roundStack = new Array();

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
    
    if(pvalue == 6)
        {player+="6Mark";
         oppositePlayer+="6Mark";}
    if(pvalue == 5)
        {player+="5Mark";
         oppositePlayer+="5Mark";}
    if(pvalue == 4)
        {player+="4Mark";
         oppositePlayer+="4Mark";}
    if(pvalue == 3)
        {player+="3Mark";
         oppositePlayer+="3Mark";}
    if(pvalue == 2)
        {player+="2Mark";
         oppositePlayer+="2Mark";}
    if(pvalue == 1)
        {player+="1Mark";
         oppositePlayer+="1Mark";}
    if(pvalue == 25)
        {pvalue = 4;
         player+="BullMark";
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
    if(checkScore())    //If player has a winning score, check for win
    {    checkWinner();}    
    
    
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

//**************************
//  CHECKS FOR WINNER
//**************************
function checkWinner()
{    
    for(x=6; x>=1; x--)
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

//**************************
//  CHECKS SCORE FOR WINNER
//**************************
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
        
        if(undoPVal == 6)
            {undoPlayer+="6Mark";}
        if(undoPVal == 5)
            {undoPlayer+="5Mark";}
        if(undoPVal == 4)
            {undoPlayer+="4Mark";}
        if(undoPVal == 3)
            {undoPlayer+="3Mark";}
        if(undoPVal == 2)
            {undoPlayer+="2Mark";}
        if(undoPVal == 1)
            {undoPlayer+="1Mark";}
        if(undoPVal == 4)
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






