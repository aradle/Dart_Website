//************************
//*
//*
//*
//*
//************************

var throwCounter =1;
var roundCount = 0;
var targetNumber = 12;
var hitDetector = false;

var playerStack = new Array();
var scoreStack = new Array();
var multiplierStack = new Array();
var hitDetectorStack = new Array();
var valueStack = new Array();

playerStack.push(-1);

//******************
//  HIT THIS
//******************
function hitThis(multiplier)
{
    var numValue = document.getElementById("TheNumber").innerHTML;
    var player = findPlayer();
    var playerScore = document.getElementById(player + "Score").innerHTML; 
    
    if((numValue.localeCompare("Bull")) == 0)
    {
        numValue = 25;
        numValue = parseInt(numValue, 10);
    }
    
    if(multiplier >= 1)
    {
        playerScore = parseInt(playerScore, 10);
        playerScore+= (numValue*multiplier);
        playerScore = parseInt(playerScore, 10);
        document.getElementById(player+"Score").innerHTML = playerScore;
        hitDetector = true;
    }
 
    playerStack.push(player);
    scoreStack.push(playerScore);
    multiplierStack.push(multiplier);
    hitDetectorStack.push(hitDetector);
    valueStack.push(numValue);
    
    updateLabels();
}

//******************
//  DOUBLE BUTTONS
//******************
function doubleHit(value)
{
    var player = findPlayer();
    var playerScore = document.getElementById(player + "Score").innerHTML;
    
    value = value * 2;
    
    playerScore = parseInt(playerScore, 10);
    playerScore += value;
    document.getElementById(player+"Score").innerHTML = playerScore;
    hitDetector = true;
    
    updateLabels();
}

//******************
//  TRIPLE BUTTONS
//******************
function tripleHit(value)
{
    var player = findPlayer();
    var playerScore = document.getElementById(player + "Score").innerHTML;
    
    value = value * 3;
    
    playerScore = parseInt(playerScore, 10);
    playerScore += value;
    document.getElementById(player+"Score").innerHTML = playerScore;
    hitDetector = true;
    
    updateLabels();
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

//***********************
//      UPDATE LABELS
//***********************
function updateLabels()
{
    throwCounter++;
    
    if(throwCounter == 4 || throwCounter == 7)
    {
        if(hitDetector == false)
        {
            var tempScore = document.getElementById(findPlayer() + "Score").innerHTML;
            if(tempScore!=1)
            {
                tempScore = tempScore/2;
                tempScore = parseInt(tempScore, 10);
                document.getElementById(findPlayer() + "Score").innerHTML = tempScore;  
            }  
        }
        hitDetector = false;
    }
    
    if(throwCounter==7)
    {   
        throwCounter = 1;
        document.getElementById("throwCountLabel").innerHTML = throwCounter;
        document.getElementById("cP1Mark").style.display = "";
        document.getElementById("cP2Mark").style.display ="none";
        updateTarget();
        
    } 
    else if(throwCounter>=4){
        document.getElementById("throwCountLabel").innerHTML = throwCounter-3;
        document.getElementById("cP1Mark").style.display = "none";
        document.getElementById("cP2Mark").style.display ="";
    }
    else
    {
        document.getElementById("throwCountLabel").innerHTML = throwCounter;
    }
}

//***********************
//      UPDATE TARGET
//***********************
function updateTarget()
{
    roundCount++;
    if(roundCount == 3)
    {
        document.getElementById("TheNumber").innerHTML = "Double";
        document.getElementById("doubleButtonsDiv").style.display ="";
        document.getElementById("singleB").style.opacity =0.0;
        document.getElementById("doubleB").style.opacity =0.0;
        document.getElementById("tripleB").style.opacity = 0.0;
        document.getElementById("singleB").disabled = true;
        document.getElementById("doubleB").disabled = true;
        document.getElementById("tripleB").disabled = true;
    }
    else if(roundCount == 7)
    {
        document.getElementById("TheNumber").innerHTML = "Triple";
        document.getElementById("tripleButtonsDiv").style.display ="";
        document.getElementById("singleB").style.opacity = 0.0;
        document.getElementById("doubleB").style.opacity = 0.0;
        document.getElementById("tripleB").style.opacity = 0.0;
        document.getElementById("singleB").disabled = true;
        document.getElementById("doubleB").disabled = true;
        document.getElementById("tripleB").disabled = true;
    }
    else if(roundCount == 11)
    {
        document.getElementById("TheNumber").innerHTML = "Bull";
        document.getElementById("tripleB").style.opacity = 0.0;
    }
    else if(roundCount == 12)
    {
        endGame();
    }
    else
    {
        document.getElementById("doubleButtonsDiv").style.display ="none";
        document.getElementById("tripleButtonsDiv").style.display ="none";
        document.getElementById("singleB").style.opacity = 1.0;
        document.getElementById("doubleB").style.opacity = 1.0;
        document.getElementById("tripleB").style.opacity = 1.0;
        document.getElementById("singleB").disabled = false;
        document.getElementById("doubleB").disabled = false;
        document.getElementById("tripleB").disabled = false;
        targetNumber++;
        document.getElementById("TheNumber").innerHTML = targetNumber;  
    }   
}

//***********************
//      END GAME
//***********************
function endGame()
{
    var p1S = document.getElementById(findPlayer() + "Score").innerHTML;
    var p2S = document.getElementById(findOppositePlayer() + "Score").innerHTML;
    
    if(p1S > p2S)
    {
        alert("Player 1 has won the game.");
    }
    else if(p2S > p1S)
    {
        alert("Player 2 has won the game.");
    }
    else
    {
        alert("You have tied each other.");
    }
    
    
}

//***********************
//      UNDO BUTTON
//***********************
function undoTurn()
{
    var undoPlayer, undoScore, undoMultiplier, undoHitDetector, undoValue;
    undoPlayer = playerStack.pop();
    
    if(undoPlayer == -1)
    {
        alert("There is no move to undo.");
        playerStack.push(-1);
        return;
    }
    else
    {
        undoHitDetector = hitDetectorStack.pop();
        undoValue = valueStack.pop();
        undoScore = scoreStack.pop();
        undoMultiplier = multiplierStack.pop();
        
       
        if(undoMultiplier == 0)
        {
           document.getElementById(undoPlayer + "Score").innerHTML = undoScore;
        }
        else
        {
            var subtractScore = undoMultiplier * undoValue;
            undoScore-=subtractScore;
            document.getElementById(undoPlayer + "Score").innerHTML = undoScore; 
        }
        throwCounter--;
        
        if(throwCounter == 0)
        {
            throwCounter = 6;
            document.getElementById("throwCountLabel").innerHTML = throwCounter-3;
            document.getElementById("cP1Mark").style.display = "none";
            document.getElementById("cP2Mark").style.display ="";
            roundCount--;
            targetNumber--;
        }
        else if(throwCounter == 3)
        {
            document.getElementById("throwCountLabel").innerHTML = throwCounter;
            document.getElementById("cP1Mark").style.display = "";
            document.getElementById("cP2Mark").style.display ="none";
        }
        else
        {
            document.getElementById("throwCountLabel").innerHTML = throwCounter;
        }
        
        if(roundCount == 3)
        {
            document.getElementById("TheNumber").innerHTML = "Double";
            document.getElementById("doubleButtonsDiv").style.display ="";
            document.getElementById("singleB").style.opacity =0.0;
            document.getElementById("doubleB").style.opacity =0.0;
            document.getElementById("tripleB").style.opacity = 0.0;
            document.getElementById("singleB").disabled = true;
            document.getElementById("doubleB").disabled = true;
            document.getElementById("tripleB").disabled = true;
        }
        else if(roundCount == 7)
        {
            document.getElementById("TheNumber").innerHTML = "Triple";
            document.getElementById("tripleButtonsDiv").style.display ="";
            document.getElementById("singleB").style.opacity = 0.0;
            document.getElementById("doubleB").style.opacity = 0.0;
            document.getElementById("tripleB").style.opacity = 0.0;
            document.getElementById("singleB").disabled = true;
            document.getElementById("doubleB").disabled = true;
            document.getElementById("tripleB").disabled = true;
        }
        else if(roundCount == 11)
        {
            document.getElementById("TheNumber").innerHTML = "Bull";
            document.getElementById("tripleB").style.opacity = 0.0;
        }
         else
        {
            document.getElementById("doubleButtonsDiv").style.display ="none";
            document.getElementById("tripleButtonsDiv").style.display ="none";
            document.getElementById("singleB").style.opacity = 1.0;
            document.getElementById("doubleB").style.opacity = 1.0;
            document.getElementById("tripleB").style.opacity = 1.0;
            document.getElementById("singleB").disabled = false;
            document.getElementById("doubleB").disabled = false;
            document.getElementById("tripleB").disabled = false;
            document.getElementById("TheNumber").innerHTML = targetNumber;  
        }
    }    
}











