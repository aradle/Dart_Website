var playCount = 0;
var roundCount = 1;
var playerTurn = 1;
var tempScore = 301;

var playerStack = new Array();
var scoreStack = new Array();
var hitTotalStack = new Array();
var tempStack = new Array();
var roundStack = new Array();

playerStack.push(-1);

//**************************************************
//      RESET GAME BUTTON
//**************************************************
function resetGame() 
{
    if (confirm("Are you sure you want to reset this game?") === true) 
    {
        window.location.reload();
    }
}

//**************************************************
//      UPDATE THE SCORE
//**************************************************
function ScoreChanger(pvalue, multiplier)
{
    var playerScore = "P" + playerChange();
    var hitTotal = pvalue * multiplier;
    var score = document.getElementById(playerScore + "S").innerHTML;  
    var oldTempscore = document.getElementById(playerScore + "S").innerHTML;
    
    playerStack.push(playerScore);
    scoreStack.push(score);
    hitTotalStack.push(hitTotal);
    tempStack.push(tempScore);
    roundStack.push(roundCount);
    
    tempScore = tempScore - hitTotal;
    document.getElementById("tempScoreLabel").innerHTML = tempScore;
    
    if(tempScore==0)
    {
        alert("Player Wins!");
        resetGame();
    }
    else if(playerTurn == 4 && (tempScore >=0))
    {
        document.getElementById("P1S").innerHTML= tempScore;  //set player score to the new temp score
        document.getElementById("tempScoreLabel").innerHTML = document.getElementById("P2S").innerHTML; //set temp score to next players
        tempScore = document.getElementById("tempScoreLabel").innerHTML;
    }
    else if(playerTurn == 7 && (tempScore >=0))
    {
        document.getElementById("P2S").innerHTML= tempScore;    //set player score to the new temp score
        document.getElementById("tempScoreLabel").innerHTML = document.getElementById("P1S").innerHTML; //set temp score to next players
        tempScore = document.getElementById("tempScoreLabel").innerHTML;
    }  
    else if(tempScore < 0)
    {
        document.getElementById("tempScoreLabel").innerHTML = oldTempscore;
        
        if(playerTurn ==4)
        {
            document.getElementById("tempScoreLabel").innerHTML = document.getElementById("P2S").innerHTML; //set temp score to next players
            tempScore = document.getElementById("tempScoreLabel").innerHTML;
        }
        else if(playerTurn == 7)
        {
            document.getElementById("tempScoreLabel").innerHTML = document.getElementById("P1S").innerHTML; //set temp score to next players
            tempScore = document.getElementById("tempScoreLabel").innerHTML;
        }
    }
}

//**************************************************
//      PLAYER CHANGE
//**************************************************
function playerChange()
{
   if(playerTurn == 1){
        playerTurn++;
        document.getElementById("P1Marker").style.display = "";
        document.getElementById("P2Marker").style.display = "none";
        document.getElementById("throwCount").innerHTML++;
        return "1";
    }
    else if(playerTurn == 2){
        playerTurn++;
        document.getElementById("P1Marker").style.display = "";
        document.getElementById("P2Marker").style.display = "none";
        document.getElementById("throwCount").innerHTML++;
        return "1";
    }
    else if(playerTurn == 3){
        playerTurn++;
        document.getElementById("P1Marker").style.display = "none";
        document.getElementById("P2Marker").style.display = "";
        document.getElementById("throwCount").innerHTML = 1;
        return "1";
    }
    else if(playerTurn == 4){
        playerTurn++;
        document.getElementById("throwCount").innerHTML++;
        document.getElementById("P1Marker").style.display = "none";
        document.getElementById("P2Marker").style.display = "";
        return "2";
    }
    else if(playerTurn == 5){
        playerTurn++;
        document.getElementById("throwCount").innerHTML++;
        document.getElementById("P1Marker").style.display = "none";
        document.getElementById("P2Marker").style.display = "";
        return "2";
    }
    else if(playerTurn == 6){
        playerTurn++;
        document.getElementById("P1Marker").style.display = "";
        document.getElementById("P2Marker").style.display = "none";
        document.getElementById("throwCount").innerHTML = 1;
        roundCount++;
        document.getElementById("roundCount").innerHTML = roundCount;
        return "2";
    }
    else if(playerTurn == 7){
        playerTurn = 2;
        document.getElementById("P1Marker").style.display = "";
        document.getElementById("P2Marker").style.display = "none";
        return "1";
    }  
}

//**************************************************
//      UNDO BUTTON
//**************************************************
function undoHit()
{
    var undoPlayer = playerStack.pop();
    var undoScore = scoreStack.pop();
    var undoHitTotal = hitTotalStack.pop();
    var undoTemp = tempStack.pop();
    
    undoHitTotal = parseInt(undoHitTotal, 10);
    
    if(undoPlayer == -1)
    {
        alert("There are no moves to undo.");
        playerStack.push(-1);
    }
    else 
    {
        if(undoPlayer.localeCompare("P1") == 0)
        {
            document.getElementById("P1Marker").style.display = "";
            document.getElementById("P2Marker").style.display = "none";
            document.getElementById("P1S").innerHTML= undoScore;
        }
        else if(undoPlayer.localeCompare("P2") == 0)
        {
            document.getElementById("P1Marker").style.display = "none";
            document.getElementById("P2Marker").style.display = "";
            document.getElementById("P2S").innerHTML= undoScore;
        } 
        
        tempScore = undoTemp;
        document.getElementById("tempScoreLabel").innerHTML = tempScore;
        playerTurn--;
        var counter = document.getElementById("throwCount").innerHTML;
        counter--;
        
        if(counter == 0)
        {
            document.getElementById("throwCount").innerHTML = 3;
        }
        document.getElementById("roundCount").innerHTML = roundStack.pop();
    }
}










