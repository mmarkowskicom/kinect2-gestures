

(function bindGestures() {
	$(window).bind('noUser', noUser);
	$(window).bind('userBigDistance', userBigDistance);
	$(window).bind('userMediumDistance', userMediumDistance);
	$(window).bind('userSmallDistance', userSmallDistance);
	$(window).bind('onSwipeLeft', onSwipeLeft);
	$(window).bind('onSwipeRight', onSwipeRight);
	$(window).bind('onSwipeUp', onSwipeUp);
	$(window).bind('onSwipeDown', onSwipeDown);
	$(window).bind('cursorClick', cursorClick);
	$(window).bind('cursorMoved', cursorMoved);
	$(window).bind('cursorOpen', cursorOpen);
	$(window).bind('cursorClose', cursorClose);
	$(document).on('click', '.click-home', clickHome);
}()); 



//to prevent multi animations - save actual & next state
var currentDistance = 0, //noUser
	nextDistance = 0,
	lastDistance = 0,
	currentIsAnimating = false;


var $a = $('a, .a'),
	$cursor = $('#cursor'),
	$body = $('body');



function checkDistance() {
	if(currentDistance !== nextDistance && !currentIsAnimating) {
		lastDistance = currentDistance;
		currentDistance = nextDistance;
		if(nextDistance==0) noUser();
		else if(nextDistance==1) userBigDistance();
		else if(nextDistance==2) userMediumDistance();
		else userSmallDistance();
	}
}


function onCompleteAll(thisDistance) {
	currentDistance = thisDistance;
	currentIsAnimating = false;
	checkDistance(); 
	console.log('complete distance animation: '+thisDistance);
}


function onEveryDistance(thisDistance) {
    
    console.log('distance change: '+thisDistance);

}


function noUser() {
	if($body.hasClass('no-user')) return;
	nextDistance = 0;
	if(currentIsAnimating) return;
	currentIsAnimating = true;
	$body.removeClass('no-user user-big-distance user-medium-distance user-small-distance').addClass('no-user');

	var tl = new TimelineMax({ 
			onComplete: function(){  onCompleteAll(0) }
		})
		.call(function(){ 
			onEveryDistance(0);
		})
		.call(function(){ 
			console.log('no-user');
		})
     ;
}


function userBigDistance() {
	console.log('user-big-distance');
	if($body.hasClass('user-big-distance')) return;
	nextDistance = 1;
	if(currentIsAnimating) return;
	currentIsAnimating = true;
	$body.removeClass('no-user user-big-distance user-medium-distance user-small-distance').addClass('user-big-distance');


	var tl = new TimelineMax({ 
			onComplete: function(){ onCompleteAll(1); }
		})
		.call(function(){ 
			onEveryDistance(1);
		})
		.call(function(){ 
			console.log('user-big-distance');
		})
    ;

} 


function userMediumDistance() {
	if($body.hasClass('user-medium-distance')) return;
	nextDistance = 2;
	if(currentIsAnimating) return;
	currentIsAnimating = true;
	$body.removeClass('no-user user-big-distance user-medium-distance user-small-distance').addClass('user-medium-distance');

	var tl = new TimelineMax({ 
			onComplete: function(){  onCompleteAll(2); }
		})
		.call(function(){ 
			onEveryDistance(2);
		})
		.call(function(){ 
			console.log('user-medium-distance');
		})
    ;

}

function userSmallDistance() {
	if($body.hasClass('user-small-distance')) return;
	nextDistance = 3;
	if(currentIsAnimating) return;
	currentIsAnimating = true;
	$body.removeClass('no-user user-big-distance user-medium-distance user-small-distance').addClass('user-small-distance');

	var tl = new TimelineMax({ 
			onComplete: function(){  onCompleteAll(3); }
		})
		.call(function(){ 
			onEveryDistance(3);
		})
		.call(function(){ 
			console.log('user-small-distance');
		})
    ;
}



function onSwipeLeft() {
	if(!$body.hasClass('user-small-distance')) return;
	console.log('swipe left!');
}


function onSwipeRight() {
	if(!$body.hasClass('user-small-distance')) return;
	console.log('swipe right !'); 
}



function onSwipeUp() {
	if(!$body.hasClass('user-small-distance')) return;
	console.log('swipe up !'); 
}



function onSwipeDown() {
	if(!$body.hasClass('user-small-distance')) return;
	console.log('swipe down!'); 
}



var clickTimer;

function cursorClick() {
	if($body.hasClass('just-clicked')) return;
	if(!$body.hasClass('user-small-distance')) return;
	$gesture.html('cursorClick');
	console.log('clicked');

	var hits = $cursor.collision('a:not(.disabled), .a:not(.disabled)', { mode: "collision"  } );
	
	TweenMax.to($cursor, 0.15, { scale: 0.8});
	TweenMax.to($cursor, 0.15, { scale: 1, delay: 0.15});
	
	if(hits.length) {
		console.log('CLICK!!!');
		$cursor.addClass('active');
		console.log(hits.first());
		hits.first().click();
		$cursor.removeClass('active');

		//default
		var dataTimer = 1000;
		if(hits.first().data('timer')) 
			dataTimer = hits.last().data('timer');

		$body.addClass('just-clicked');
		clickTimer = setTimeout(function() {
			$body.removeClass('just-clicked');
		}, dataTimer);

		cursorMoved();
	}
}


function cursorMoved() {
	if(!$body.hasClass('user-small-distance')) return;

	var hits = $cursor.collision('a:not(.disabled), .a:not(.disabled)', { mode: "collision"  } );
	var lastHit;

	if(hits.length) {
		lastHit = hits.first().addClass('hover');
		$('a:not(.disabled), .a:not(.disabled)').not(lastHit).removeClass('hover');
	} 
	else {
		$('a:not(.disabled), .a:not(.disabled)').removeClass('hover');
	}
}



function cursorOpen() {
	if(!$cursor.hasClass('closed')) return;
	$cursor.removeClass('closed');
}


function cursorClose() {
	if($cursor.hasClass('closed')) return;
	$cursor.addClass('closed');
}


function clickHome() {
	console.log('clickHome');
}

