/*
Think
1. Button click - Attach Event on Button
Event (click , keypress, drag/drop)
Listener
Action 
2. Print X or 0 
We have 9 buttons , we need to attach event on all 9 buttons , need
to listen the events and then take the action

how i find out which button is click out of 9 buttons, because every button
is calling the same function

Add - FInd out the Win and Lose 
Find out the Draw Condition
Build the reset feature
once game over reset after 5 sec, it show countdown then reset
*/
const buttons = document.getElementsByTagName('button');
console.log('All Buttons ', buttons.length);
for(var i = 0; i<buttons.length; i++){
    buttons[i].addEventListener('click', printXorZero);
}
var turnCount = 0;
var flag = true; // Decide X or Zero
var isPlaying = true;
// Arrow - Short Hand Function
// When function is of one line code - then use arrow function
// function isNotBlank(button){
//     return button.innerText.trim().length>0
// }
const isNotBlank = button =>button.innerText.trim().length>0;
const isThreeSame=(first, second, third)=>
first.innerText == second.innerText && first.innerText ==third.innerText && isNotBlank(first)
    

function isDraw(){
    if(turnCount==9){
        document.getElementById('result').innerText  = 'Game Draw';   
        startCountDown();
    }
}
function isGameOver(){
    const r= isThreeSame(buttons[0], buttons[3], buttons[6]) 
    || isThreeSame(buttons[0], buttons[1], buttons[2]) 
    || isThreeSame(buttons[3], buttons[4], buttons[5]) 
    || isThreeSame(buttons[6], buttons[7], buttons[8]) ||
    isThreeSame(buttons[0], buttons[4], buttons[8]) ||
    isThreeSame(buttons[2], buttons[4], buttons[6]) ||
       
        isThreeSame(buttons[1], buttons[4], buttons[7]) || 
        isThreeSame(buttons[2], buttons[5], buttons[8]);
    const winner= !flag;
    console.log(r);
    if(r){
         isPlaying = false;
           
        document.getElementById('result').innerText = winner?"X Wins":"0 Wins";
        startCountDown();
    }
    return r;
}
var countDown = 5;
var interval ;
function startCountDown(){
     interval = setInterval(function(){
        document.getElementById('time').innerText = 'Game Will Reset in '+countDown;
        countDown--;
        if(countDown<0){
            clearInterval(interval);
            gameReset();
        }
    },1000);
}

function gameReset(){
    turnCount = 0;
    isPlaying = true;
    flag = true;
    for(var i = 0; i<buttons.length; i++){
        buttons[i].innerText = '';
    }
    document.getElementById('time').innerText= '';
}

function printXorZero(){
    // this - keyword (current calling object reference )
    console.log('printXorZero calls', this);
    const currentButton = this;
    if(isPlaying && currentButton.innerText.length==0){
    currentButton.innerText = flag?"X":"0";
    flag = !flag;
    turnCount++;
    if(turnCount>=5){
         isGameOver() || isDraw();
        
    }
    
    }
}

