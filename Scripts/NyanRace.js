"use strict";

/*
Author: Eric Fugate
Last Modified: 05/07/2018

Filename: NyanRace.js

Notes: 
Low moveRate and moveMax values will result in smoother motion.
moveMax is currently set to be 0.1% of the screen width.
Combined with the runRace function firing at 1 ms, motion is very smooth.
With the current settings, the race lasts ~20 seconds.
*/

/******************\
 Declare Variables
\******************/

/* Movement Interval Rate Value (in milliseconds) */
/* This value sets the time between iterations of the primary function */
var moveRate = 1;

/* Race Distance (Scales With Window Size) */
var raceDistance = window.innerWidth;

/* Race Movement Maximum Value */
/* This value sets the max value for the RNG function (getMoveValues) */
var moveMax = (raceDistance * .001);

/* Nyan Cat's Movement Rate - RNG */
var nyanMove = 0; 

/* Tac Nayn's Movement Rate - RNG */
var tacMove = 0; 

/* Interval Variables */
var moveInterval; /* Used to set interval between movements */
var raceTimer; /* Used to set interval that tracks the race length */

/* Run Time Timer */
var totalSeconds = 0;
var timerMilliseconds = 0;

/******************\
 Functions
\******************/

/* Start Race On Button Click */
function startRace() {
	moveInterval = setInterval(runRace, moveRate); 
	raceTimer = setInterval(startTimer, 100); /* Millisecond Counter */
	
	/* UI Visibility Toggles */
	document.getElementById("RaceNyanedFor").style.visibility="visible";
	document.getElementById("StartButton").style.visibility="hidden";
	document.getElementById("ResetButton").style.visibility="visible";
}

/* This is ran continuously until there is a winner or the interval is reset */
function runRace() {
	
	/* Nyan Cat Function Level Variables */
	/* Get image, left coordinate, width, calculate right coordinate */
	var nyanCat = document.getElementById("NyanCat");
	var nyanWidth = parseInt(nyanCat.width);
	var nyanLeftPos = parseInt(nyanCat.style.left.replace("px","")); 
	var nyanRightPos = (nyanLeftPos + nyanWidth);
	
	/* Tac Nayn Function Level Variables */
	/* Get image, left coordinate, width, calculate right coordinate */
	var tacNayn = document.getElementById("TacNayn");
	var tacWidth = parseInt(tacNayn.width);
	var tacLeftPos = parseInt(tacNayn.style.left.replace("px","")); 
	var tacRightPos = (tacLeftPos + tacWidth);
	
	/* Ends the race when a racer crosses the finish line */
	if (nyanRightPos >= raceDistance || tacRightPos >= raceDistance) {
		clearInterval(moveInterval);
		clearInterval(raceTimer);
		
		/* Define the winner */
		if (nyanRightPos > tacRightPos) {
			document.getElementById("NyanCatWin").style.visibility='visible';
		} else if (nyanRightPos < tacRightPos) {
			document.getElementById("TacNaynWin").style.visibility='visible';
		} else if (nyanRightPos = tacRightPos) {
			document.getElementById("Tie").style.visibility='visible';
		}
	}
	
	/* If the race hasn't finished yet, the function 
	   will continue running through more iterations */
	else {
		getMoveValues();
		nyanCat.style.left = (nyanLeftPos + nyanMove) + "px";
		tacNayn.style.left = (tacLeftPos + tacMove) + "px";
	}
}

/* Random Number Generation */
function getMoveValues() {
	nyanMove = Math.floor(Math.random() * moveMax);
	tacMove = Math.floor(Math.random() * moveMax);
}

/* Seconds Timer Function */
function startTimer() {
	timerMilliseconds++;
	
	/* Timer Display */
	document.getElementById("Timer").innerHTML = totalSeconds + "." + timerMilliseconds;
	
	/* Value of 9 ms accounts for the latency in the seconds update */
	if (timerMilliseconds == 9) {
		timerMilliseconds = 0;
		totalSeconds++;
	}
}

/* Reset everything to default values on button click */
function resetRace() {
	window.location.reload();
}
