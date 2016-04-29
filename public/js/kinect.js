/*
	Kinect App. 
*/

var useKinect = true;
 


/* Settings-start: */

var breakBetweenGestures = 500; //ms

//minimum speed of hand to accept swipe gesture;
var swipeSpeed = 0.014;

//tolerance for hand still in position
var handStillTolerance = 0.25;
//cursor scale factor, default: 1.5 (bigger range -> smaller factor)
var cursorScale = 1.5;

var defaultHand = 'right';

var bigDist = 4; //metres

var mediumDist = 2.7; //metres

/* Settings-end */




//make hand object (left/right)
function hand(name){
	return {
		name: name,
		swipeSpeed: swipeSpeed, 
		//last X, Y positions
		oldDepthX: 0,
		oldDepthY: 0,
		//last relative speed
		oldSpeedX: 0,
		oldSpeedY: 0,
		//last state (open)
		oldOpen: 2,
		closedTimer: 0
	};
}


//detect gestures
function updateHand(hand, handState, handObject, elbowObject, torsoObject) {
	//update torso position
	torso.positionX = torsoObject.depthX;
	torso.positionY = torsoObject.depthY;
	//set current X position of hand
	hand.positionX =  handObject.depthX;
	hand.positionY =  handObject.depthY;
	//get position relative to torso position;
	hand.relativePositionX = hand.positionX - torso.positionX;
	hand.relativePositionY = hand.positionY - torso.positionY;
	//get hand speed based on last position
	hand.relativeSpeedX = hand.relativePositionX - hand.oldSpeedX;
	hand.relativeSpeedY = hand.relativePositionY - hand.oldSpeedY;



	//check if hand is open
	if(handState !== 1 && hand.name === defaultHand) {
		//check if hand is in the same position relative to last state
		if(  Math.abs(100*(hand.oldDepthX - handObject.depthX))  >  handStillTolerance  ||  Math.abs(100*(hand.oldDepthY - handObject.depthY))  >  handStillTolerance ) {

			jQuery(window).trigger('cursorMoved');

		}

		if(hand.oldOpen !== 2 && handState === 2 && handState !== 0) {
		
			jQuery(window).trigger('cursorOpen');
		
		}
		else if(hand.oldOpen !== 3 && handState === 3  && handState !== 0) {

			jQuery(window).trigger('cursorClose');
		}
	
		hand.oldDepthX = handObject.depthX;
		hand.oldDepthY = handObject.depthY;
		hand.oldOpen = handState;
	}
	
	

	//gestures only when hand over elbow - swipes
	//and handState = 2 (open)
	if(handObject.depthY < elbowObject.depthY && hand.oldOpen != 1) {
		
		//swipe right 
		if(hand.relativeSpeedX > hand.swipeSpeed && hand.oldSpeedX !== 0) {
			makeGesture('onSwipeRight');
		}
		//swipe left 
		else if(hand.relativeSpeedX < -1 * hand.swipeSpeed && hand.oldSpeedX !== 0) {
			makeGesture('onSwipeLeft');
		}
		//swipe down
		if(hand.relativeSpeedY > hand.swipeSpeed*1.4 && hand.oldSpeedY !== 0) {
			makeGesture('onSwipeDown');
		}
		//swipe up
		else if(hand.relativeSpeedY < -1 * hand.swipeSpeed*1.4 && hand.oldSpeedY !== 0) {
			makeGesture('onSwipeUp');
		}
	}

	if(handState === 3 && hand.name === defaultHand) {
		hand.closedTimer += 1;
		if(hand.closedTimer > 3) {
			jQuery(window).trigger('cursorClick');
			hand.closedTimer= 0;
		}
	} 
	else {
		hand.closedTimer= 0;
	} 


	//save actual position
	hand.oldSpeedX = hand.relativePositionX;
	hand.oldSpeedY = hand.relativePositionY;
}




//bind gestures to jquery events
var breakTimer;
var isDoingGesture = false;
function makeGesture(name) {
	//only one at same time
	if(!isDoingGesture) {
		isDoingGesture = true;
		clearTimeout(breakTimer);
		breakTimer = setTimeout(function() {
			isDoingGesture = false;
		}, breakBetweenGestures);

		//jQuery trigger -> bindGestures
		jQuery(window).trigger(name);
	}
}

//get index of body which is closest to camera
function getClosestBodyIndex(bodies) {
	var closestZ = Number.MAX_VALUE;
	var closestBodyIndex = -1;
	for(var i = 0; i < bodies.length; i++) {
		if(bodies[i].tracked && bodies[i].joints[1].cameraZ < closestZ) {
			closestZ = bodies[i].joints[1].cameraZ;
			closestBodyIndex = i;
		}
	}
	return closestBodyIndex;
}

function getDistance(object1, object2) {
	return Math.sqrt(  Math.pow((object1.depthX - object2.depthX),2) + Math.pow((object1.depthY - object2.depthY),2) );
}

function getDistanceX(object1, object2) {
	return (object2.depthX - object1.depthX);
}

function getDistanceY(object1, object2) {
	return (object2.depthY - object1.depthY);
}



//INIT
var body;
var closestBodyIndex;
var distance = 100;
var lastDistance = 0;
var rightHand = new hand('right');
var leftHand = new hand('left');
var torso = { positionX: 0, positionY: 0 }; 


var distanceHipsToShoulders;
var XRightShoulderToRightHand, YRightShoulderToRightHand;
var XLeftShoulderToLeftHand, YLeftShoulderToLeftHand;
var px, py;
var lastPx, lastPy;
var $cursor = $('#cursor');



var trackedBodyIndex = -1; //no bodies
var isTrackedActiveUser = false;
var noUserTimer;
var userBigDistanceTimer;



console.log('%cuse kinect: true', "color:green");
var socket = io.connect('http://localhost:8000');

socket.on('connect_error', function() {
	console.log('%cFailed to connect to server', "color:red");
});

socket.on('bodyFrame', function(bodyFrame){
		
		closestBodyIndex = getClosestBodyIndex(bodyFrame.bodies);

		if(typeof bodyFrame.bodies[trackedBodyIndex] !== 'undefined') {
	    	isTrackedActiveUser = bodyFrame.bodies[trackedBodyIndex].tracked;
		}

		if(closestBodyIndex === -1) {
			trackedBodyIndex = -1;
			console.log('no bodies');
			clearTimeout(userBigDistanceTimer);
			noUserTimer = setTimeout(function() {
				if(trackedBodyIndex === -1) {
					$(window).trigger('noUser');
				}
			}, 5000);
		}
		else if(trackedBodyIndex === -1 || !isTrackedActiveUser) {
			console.log('old user: '+trackedBodyIndex);
			trackedBodyIndex = closestBodyIndex;
			console.log('new body: '+trackedBodyIndex);
		}
		else {

				clearTimeout(noUserTimer);
				body = bodyFrame.bodies[trackedBodyIndex];
				distance = body.joints[3].cameraZ; //head
				//console.log(distance);


				if(distance > bigDist) {
					userBigDistanceTimer = setTimeout(function() {
						$(window).trigger('userBigDistance');
					}, 5000);
				}
				else if(distance > mediumDist && distance < bigDist) {
					$(window).trigger('userMediumDistance');
					clearTimeout(userBigDistanceTimer);
				}
				else if(distance < mediumDist ) {	
					$(window).trigger('userSmallDistance');
					clearTimeout(userBigDistanceTimer);
				}
				 

				//set #cursor
				distanceHipsToShoulders = getDistance(body.joints[0], body.joints[20]);
				XRightShoulderToRightHand = getDistanceX(body.joints[8], body.joints[11]);
				YRightShoulderToRightHand = getDistanceY(body.joints[8], body.joints[11]);
				XLeftShoulderToLeftHand =  getDistanceX(body.joints[4], body.joints[7]);
				YLeftShoulderToLeftHand = getDistanceY(body.joints[4], body.joints[7]);


				if(body.joints[11].cameraZ <= body.joints[7].cameraZ) {
					//right hand closer
					defaultHand = 'right';
					px = (XRightShoulderToRightHand < 0) ? 0 : 100 * (0 + XRightShoulderToRightHand / (0.5*cursorScale * distanceHipsToShoulders));
					py = 100 * (0.5 + YRightShoulderToRightHand / (cursorScale * distanceHipsToShoulders));
				} else {
					//left hand closer
					defaultHand = 'left';
					px = (XLeftShoulderToLeftHand < 0) ? 0 : 100 * (0 + XLeftShoulderToLeftHand / (0.5*cursorScale * distanceHipsToShoulders));
					py = 100 * (0.5 + YLeftShoulderToLeftHand / (cursorScale * distanceHipsToShoulders));
				}


				if(px>100) px = 100;
				if(py>100) py = 100;
				if(px<0) px = 0;
				if(py<0) py = 0;
 

				if(Math.abs(lastPx-px) > 0.5  || Math.abs(lastPy-py) > 0.5) {
					if((body.rightHandState != 1 && defaultHand == 'right') || (body.leftHandState != 1 &&  defaultHand == 'left')) {
						TweenMax.to($cursor, 0.4, {
							'top': py+'%',
							'left': px+'%'
						});
					}
				}

			
				//get gestures 
				updateHand(leftHand, body.leftHandState, body.joints[7], body.joints[5], body.joints[1]);
				updateHand(rightHand, body.rightHandState, body.joints[11], body.joints[9], body.joints[1]);
			
				lastPx = px;
				lastPy = py;
		}

		//update distance
		lastDistance = distance;
});



