function checkDistance(){currentDistance===nextDistance||currentIsAnimating||(lastDistance=currentDistance,currentDistance=nextDistance,0==nextDistance?noUser():1==nextDistance?userBigDistance():2==nextDistance?userMediumDistance():userSmallDistance())}function onCompleteAll(e){currentDistance=e,currentIsAnimating=!1,checkDistance(),console.log("complete distance animation: "+e)}function onEveryDistance(e){console.log("distance change: "+e)}function noUser(){if(!$body.hasClass("no-user")&&(nextDistance=0,!currentIsAnimating)){currentIsAnimating=!0,$body.removeClass("no-user user-big-distance user-medium-distance user-small-distance").addClass("no-user");new TimelineMax({onComplete:function(){onCompleteAll(0)}}).call(function(){onEveryDistance(0)}).call(function(){console.log("no-user")})}}function userBigDistance(){if(console.log("user-big-distance"),!$body.hasClass("user-big-distance")&&(nextDistance=1,!currentIsAnimating)){currentIsAnimating=!0,$body.removeClass("no-user user-big-distance user-medium-distance user-small-distance").addClass("user-big-distance");new TimelineMax({onComplete:function(){onCompleteAll(1)}}).call(function(){onEveryDistance(1)}).call(function(){console.log("user-big-distance")})}}function userMediumDistance(){if(!$body.hasClass("user-medium-distance")&&(nextDistance=2,!currentIsAnimating)){currentIsAnimating=!0,$body.removeClass("no-user user-big-distance user-medium-distance user-small-distance").addClass("user-medium-distance");new TimelineMax({onComplete:function(){onCompleteAll(2)}}).call(function(){onEveryDistance(2)}).call(function(){console.log("user-medium-distance")})}}function userSmallDistance(){if(!$body.hasClass("user-small-distance")&&(nextDistance=3,!currentIsAnimating)){currentIsAnimating=!0,$body.removeClass("no-user user-big-distance user-medium-distance user-small-distance").addClass("user-small-distance");new TimelineMax({onComplete:function(){onCompleteAll(3)}}).call(function(){onEveryDistance(3)}).call(function(){console.log("user-small-distance")})}}function onSwipeLeft(){$body.hasClass("user-small-distance")&&console.log("swipe left!")}function onSwipeRight(){$body.hasClass("user-small-distance")&&console.log("swipe right !")}function onSwipeUp(){$body.hasClass("user-small-distance")&&console.log("swipe up !")}function onSwipeDown(){$body.hasClass("user-small-distance")&&console.log("swipe down!")}function cursorClick(){if(!$body.hasClass("just-clicked")&&$body.hasClass("user-small-distance")){$gesture.html("cursorClick"),console.log("clicked");var e=$cursor.collision("a:not(.disabled), .a:not(.disabled)",{mode:"collision"});if(TweenMax.to($cursor,.15,{scale:.8}),TweenMax.to($cursor,.15,{scale:1,delay:.15}),e.length){console.log("CLICK!!!"),$cursor.addClass("active"),console.log(e.first()),e.first().click(),$cursor.removeClass("active");var s=1e3;e.first().data("timer")&&(s=e.last().data("timer")),$body.addClass("just-clicked"),clickTimer=setTimeout(function(){$body.removeClass("just-clicked")},s),cursorMoved()}}}function cursorMoved(){if($body.hasClass("user-small-distance")){var e,s=$cursor.collision("a:not(.disabled), .a:not(.disabled)",{mode:"collision"});s.length?(e=s.first().addClass("hover"),$("a:not(.disabled), .a:not(.disabled)").not(e).removeClass("hover")):$("a:not(.disabled), .a:not(.disabled)").removeClass("hover")}}function cursorOpen(){$cursor.hasClass("closed")&&$cursor.removeClass("closed")}function cursorClose(){$cursor.hasClass("closed")||$cursor.addClass("closed")}function clickHome(){console.log("clickHome")}!function(){$(window).bind("noUser",noUser),$(window).bind("userBigDistance",userBigDistance),$(window).bind("userMediumDistance",userMediumDistance),$(window).bind("userSmallDistance",userSmallDistance),$(window).bind("onSwipeLeft",onSwipeLeft),$(window).bind("onSwipeRight",onSwipeRight),$(window).bind("onSwipeUp",onSwipeUp),$(window).bind("onSwipeDown",onSwipeDown),$(window).bind("cursorClick",cursorClick),$(window).bind("cursorMoved",cursorMoved),$(window).bind("cursorOpen",cursorOpen),$(window).bind("cursorClose",cursorClose),$(document).on("click",".click-home",clickHome)}();var currentDistance=0,nextDistance=0,lastDistance=0,currentIsAnimating=!1,$a=$("a, .a"),$cursor=$("#cursor"),$body=$("body"),clickTimer;!function(){function e(){var e=document.body,s=e.requestFullScreen||e.webkitRequestFullScreen||e.mozRequestFullScreen||e.msRequestFullscreen;s&&s.call(e)}$(document).on("keydown",function(s){var n=s.keyCode||s.which;switch(n){case 67:$body.toggleClass("has-cursor");break;case 70:e()}})}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50cy5qcyIsInRlc3QuanMiXSwibmFtZXMiOlsiY2hlY2tEaXN0YW5jZSIsImN1cnJlbnREaXN0YW5jZSIsIm5leHREaXN0YW5jZSIsImN1cnJlbnRJc0FuaW1hdGluZyIsImxhc3REaXN0YW5jZSIsIm5vVXNlciIsInVzZXJCaWdEaXN0YW5jZSIsInVzZXJNZWRpdW1EaXN0YW5jZSIsInVzZXJTbWFsbERpc3RhbmNlIiwib25Db21wbGV0ZUFsbCIsInRoaXNEaXN0YW5jZSIsImNvbnNvbGUiLCJsb2ciLCJvbkV2ZXJ5RGlzdGFuY2UiLCIkYm9keSIsImhhc0NsYXNzIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsIlRpbWVsaW5lTWF4Iiwib25Db21wbGV0ZSIsImNhbGwiLCJvblN3aXBlTGVmdCIsIm9uU3dpcGVSaWdodCIsIm9uU3dpcGVVcCIsIm9uU3dpcGVEb3duIiwiY3Vyc29yQ2xpY2siLCIkZ2VzdHVyZSIsImh0bWwiLCJoaXRzIiwiJGN1cnNvciIsImNvbGxpc2lvbiIsIm1vZGUiLCJUd2Vlbk1heCIsInRvIiwic2NhbGUiLCJkZWxheSIsImxlbmd0aCIsImZpcnN0IiwiY2xpY2siLCJkYXRhVGltZXIiLCJkYXRhIiwibGFzdCIsImNsaWNrVGltZXIiLCJzZXRUaW1lb3V0IiwiY3Vyc29yTW92ZWQiLCJsYXN0SGl0IiwiJCIsIm5vdCIsImN1cnNvck9wZW4iLCJjdXJzb3JDbG9zZSIsImNsaWNrSG9tZSIsIndpbmRvdyIsImJpbmQiLCJkb2N1bWVudCIsIm9uIiwiJGEiLCJyZXF1ZXN0RnVsbFNjcmVlbiIsImVsZW1lbnQiLCJib2R5IiwicmVxdWVzdE1ldGhvZCIsIndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuIiwibW96UmVxdWVzdEZ1bGxTY3JlZW4iLCJtc1JlcXVlc3RGdWxsc2NyZWVuIiwiZSIsImtleSIsImtleUNvZGUiLCJ3aGljaCIsInRvZ2dsZUNsYXNzIl0sIm1hcHBpbmdzIjoiQUFpQ0EsUUFBQUEsaUJBQ0FDLGtCQUFBQyxj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QUVBLEtBQUEsSUFDQVgiLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG4oZnVuY3Rpb24gYmluZEdlc3R1cmVzKCkge1xuXHQkKHdpbmRvdykuYmluZCgnbm9Vc2VyJywgbm9Vc2VyKTtcblx0JCh3aW5kb3cpLmJpbmQoJ3VzZXJCaWdEaXN0YW5jZScsIHVzZXJCaWdEaXN0YW5jZSk7XG5cdCQod2luZG93KS5iaW5kKCd1c2VyTWVkaXVtRGlzdGFuY2UnLCB1c2VyTWVkaXVtRGlzdGFuY2UpO1xuXHQkKHdpbmRvdykuYmluZCgndXNlclNtYWxsRGlzdGFuY2UnLCB1c2VyU21hbGxEaXN0YW5jZSk7XG5cdCQod2luZG93KS5iaW5kKCdvblN3aXBlTGVmdCcsIG9uU3dpcGVMZWZ0KTtcblx0JCh3aW5kb3cpLmJpbmQoJ29uU3dpcGVSaWdodCcsIG9uU3dpcGVSaWdodCk7XG5cdCQod2luZG93KS5iaW5kKCdvblN3aXBlVXAnLCBvblN3aXBlVXApO1xuXHQkKHdpbmRvdykuYmluZCgnb25Td2lwZURvd24nLCBvblN3aXBlRG93bik7XG5cdCQod2luZG93KS5iaW5kKCdjdXJzb3JDbGljaycsIGN1cnNvckNsaWNrKTtcblx0JCh3aW5kb3cpLmJpbmQoJ2N1cnNvck1vdmVkJywgY3Vyc29yTW92ZWQpO1xuXHQkKHdpbmRvdykuYmluZCgnY3Vyc29yT3BlbicsIGN1cnNvck9wZW4pO1xuXHQkKHdpbmRvdykuYmluZCgnY3Vyc29yQ2xvc2UnLCBjdXJzb3JDbG9zZSk7XG5cdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuY2xpY2staG9tZScsIGNsaWNrSG9tZSk7XG59KCkpOyBcblxuXG5cbi8vdG8gcHJldmVudCBtdWx0aSBhbmltYXRpb25zIC0gc2F2ZSBhY3R1YWwgJiBuZXh0IHN0YXRlXG52YXIgY3VycmVudERpc3RhbmNlID0gMCwgLy9ub1VzZXJcblx0bmV4dERpc3RhbmNlID0gMCxcblx0bGFzdERpc3RhbmNlID0gMCxcblx0Y3VycmVudElzQW5pbWF0aW5nID0gZmFsc2U7XG5cblxudmFyICRhID0gJCgnYSwgLmEnKSxcblx0JGN1cnNvciA9ICQoJyNjdXJzb3InKSxcblx0JGJvZHkgPSAkKCdib2R5Jyk7XG5cblxuXG5mdW5jdGlvbiBjaGVja0Rpc3RhbmNlKCkge1xuXHRpZihjdXJyZW50RGlzdGFuY2UgIT09IG5leHREaXN0YW5jZSAmJiAhY3VycmVudElzQW5pbWF0aW5nKSB7XG5cdFx0bGFzdERpc3RhbmNlID0gY3VycmVudERpc3RhbmNlO1xuXHRcdGN1cnJlbnREaXN0YW5jZSA9IG5leHREaXN0YW5jZTtcblx0XHRpZihuZXh0RGlzdGFuY2U9PTApIG5vVXNlcigpO1xuXHRcdGVsc2UgaWYobmV4dERpc3RhbmNlPT0xKSB1c2VyQmlnRGlzdGFuY2UoKTtcblx0XHRlbHNlIGlmKG5leHREaXN0YW5jZT09MikgdXNlck1lZGl1bURpc3RhbmNlKCk7XG5cdFx0ZWxzZSB1c2VyU21hbGxEaXN0YW5jZSgpO1xuXHR9XG59XG5cblxuZnVuY3Rpb24gb25Db21wbGV0ZUFsbCh0aGlzRGlzdGFuY2UpIHtcblx0Y3VycmVudERpc3RhbmNlID0gdGhpc0Rpc3RhbmNlO1xuXHRjdXJyZW50SXNBbmltYXRpbmcgPSBmYWxzZTtcblx0Y2hlY2tEaXN0YW5jZSgpOyBcblx0Y29uc29sZS5sb2coJ2NvbXBsZXRlIGRpc3RhbmNlIGFuaW1hdGlvbjogJyt0aGlzRGlzdGFuY2UpO1xufVxuXG5cbmZ1bmN0aW9uIG9uRXZlcnlEaXN0YW5jZSh0aGlzRGlzdGFuY2UpIHtcbiAgICBcbiAgICBjb25zb2xlLmxvZygnZGlzdGFuY2UgY2hhbmdlOiAnK3RoaXNEaXN0YW5jZSk7XG5cbn1cblxuXG5mdW5jdGlvbiBub1VzZXIoKSB7XG5cdGlmKCRib2R5Lmhhc0NsYXNzKCduby11c2VyJykpIHJldHVybjtcblx0bmV4dERpc3RhbmNlID0gMDtcblx0aWYoY3VycmVudElzQW5pbWF0aW5nKSByZXR1cm47XG5cdGN1cnJlbnRJc0FuaW1hdGluZyA9IHRydWU7XG5cdCRib2R5LnJlbW92ZUNsYXNzKCduby11c2VyIHVzZXItYmlnLWRpc3RhbmNlIHVzZXItbWVkaXVtLWRpc3RhbmNlIHVzZXItc21hbGwtZGlzdGFuY2UnKS5hZGRDbGFzcygnbm8tdXNlcicpO1xuXG5cdHZhciB0bCA9IG5ldyBUaW1lbGluZU1heCh7IFxuXHRcdFx0b25Db21wbGV0ZTogZnVuY3Rpb24oKXsgIG9uQ29tcGxldGVBbGwoMCkgfVxuXHRcdH0pXG5cdFx0LmNhbGwoZnVuY3Rpb24oKXsgXG5cdFx0XHRvbkV2ZXJ5RGlzdGFuY2UoMCk7XG5cdFx0fSlcblx0XHQuY2FsbChmdW5jdGlvbigpeyBcblx0XHRcdGNvbnNvbGUubG9nKCduby11c2VyJyk7XG5cdFx0fSlcbiAgICAgO1xufVxuXG5cbmZ1bmN0aW9uIHVzZXJCaWdEaXN0YW5jZSgpIHtcblx0Y29uc29sZS5sb2coJ3VzZXItYmlnLWRpc3RhbmNlJyk7XG5cdGlmKCRib2R5Lmhhc0NsYXNzKCd1c2VyLWJpZy1kaXN0YW5jZScpKSByZXR1cm47XG5cdG5leHREaXN0YW5jZSA9IDE7XG5cdGlmKGN1cnJlbnRJc0FuaW1hdGluZykgcmV0dXJuO1xuXHRjdXJyZW50SXNBbmltYXRpbmcgPSB0cnVlO1xuXHQkYm9keS5yZW1vdmVDbGFzcygnbm8tdXNlciB1c2VyLWJpZy1kaXN0YW5jZSB1c2VyLW1lZGl1bS1kaXN0YW5jZSB1c2VyLXNtYWxsLWRpc3RhbmNlJykuYWRkQ2xhc3MoJ3VzZXItYmlnLWRpc3RhbmNlJyk7XG5cblxuXHR2YXIgdGwgPSBuZXcgVGltZWxpbmVNYXgoeyBcblx0XHRcdG9uQ29tcGxldGU6IGZ1bmN0aW9uKCl7IG9uQ29tcGxldGVBbGwoMSk7IH1cblx0XHR9KVxuXHRcdC5jYWxsKGZ1bmN0aW9uKCl7IFxuXHRcdFx0b25FdmVyeURpc3RhbmNlKDEpO1xuXHRcdH0pXG5cdFx0LmNhbGwoZnVuY3Rpb24oKXsgXG5cdFx0XHRjb25zb2xlLmxvZygndXNlci1iaWctZGlzdGFuY2UnKTtcblx0XHR9KVxuICAgIDtcblxufSBcblxuXG5mdW5jdGlvbiB1c2VyTWVkaXVtRGlzdGFuY2UoKSB7XG5cdGlmKCRib2R5Lmhhc0NsYXNzKCd1c2VyLW1lZGl1bS1kaXN0YW5jZScpKSByZXR1cm47XG5cdG5leHREaXN0YW5jZSA9IDI7XG5cdGlmKGN1cnJlbnRJc0FuaW1hdGluZykgcmV0dXJuO1xuXHRjdXJyZW50SXNBbmltYXRpbmcgPSB0cnVlO1xuXHQkYm9keS5yZW1vdmVDbGFzcygnbm8tdXNlciB1c2VyLWJpZy1kaXN0YW5jZSB1c2VyLW1lZGl1bS1kaXN0YW5jZSB1c2VyLXNtYWxsLWRpc3RhbmNlJykuYWRkQ2xhc3MoJ3VzZXItbWVkaXVtLWRpc3RhbmNlJyk7XG5cblx0dmFyIHRsID0gbmV3IFRpbWVsaW5lTWF4KHsgXG5cdFx0XHRvbkNvbXBsZXRlOiBmdW5jdGlvbigpeyAgb25Db21wbGV0ZUFsbCgyKTsgfVxuXHRcdH0pXG5cdFx0LmNhbGwoZnVuY3Rpb24oKXsgXG5cdFx0XHRvbkV2ZXJ5RGlzdGFuY2UoMik7XG5cdFx0fSlcblx0XHQuY2FsbChmdW5jdGlvbigpeyBcblx0XHRcdGNvbnNvbGUubG9nKCd1c2VyLW1lZGl1bS1kaXN0YW5jZScpO1xuXHRcdH0pXG4gICAgO1xuXG59XG5cbmZ1bmN0aW9uIHVzZXJTbWFsbERpc3RhbmNlKCkge1xuXHRpZigkYm9keS5oYXNDbGFzcygndXNlci1zbWFsbC1kaXN0YW5jZScpKSByZXR1cm47XG5cdG5leHREaXN0YW5jZSA9IDM7XG5cdGlmKGN1cnJlbnRJc0FuaW1hdGluZykgcmV0dXJuO1xuXHRjdXJyZW50SXNBbmltYXRpbmcgPSB0cnVlO1xuXHQkYm9keS5yZW1vdmVDbGFzcygnbm8tdXNlciB1c2VyLWJpZy1kaXN0YW5jZSB1c2VyLW1lZGl1bS1kaXN0YW5jZSB1c2VyLXNtYWxsLWRpc3RhbmNlJykuYWRkQ2xhc3MoJ3VzZXItc21hbGwtZGlzdGFuY2UnKTtcblxuXHR2YXIgdGwgPSBuZXcgVGltZWxpbmVNYXgoeyBcblx0XHRcdG9uQ29tcGxldGU6IGZ1bmN0aW9uKCl7ICBvbkNvbXBsZXRlQWxsKDMpOyB9XG5cdFx0fSlcblx0XHQuY2FsbChmdW5jdGlvbigpeyBcblx0XHRcdG9uRXZlcnlEaXN0YW5jZSgzKTtcblx0XHR9KVxuXHRcdC5jYWxsKGZ1bmN0aW9uKCl7IFxuXHRcdFx0Y29uc29sZS5sb2coJ3VzZXItc21hbGwtZGlzdGFuY2UnKTtcblx0XHR9KVxuICAgIDtcbn1cblxuXG5cbmZ1bmN0aW9uIG9uU3dpcGVMZWZ0KCkge1xuXHRpZighJGJvZHkuaGFzQ2xhc3MoJ3VzZXItc21hbGwtZGlzdGFuY2UnKSkgcmV0dXJuO1xuXHRjb25zb2xlLmxvZygnc3dpcGUgbGVmdCEnKTtcbn1cblxuXG5mdW5jdGlvbiBvblN3aXBlUmlnaHQoKSB7XG5cdGlmKCEkYm9keS5oYXNDbGFzcygndXNlci1zbWFsbC1kaXN0YW5jZScpKSByZXR1cm47XG5cdGNvbnNvbGUubG9nKCdzd2lwZSByaWdodCAhJyk7IFxufVxuXG5cblxuZnVuY3Rpb24gb25Td2lwZVVwKCkge1xuXHRpZighJGJvZHkuaGFzQ2xhc3MoJ3VzZXItc21hbGwtZGlzdGFuY2UnKSkgcmV0dXJuO1xuXHRjb25zb2xlLmxvZygnc3dpcGUgdXAgIScpOyBcbn1cblxuXG5cbmZ1bmN0aW9uIG9uU3dpcGVEb3duKCkge1xuXHRpZighJGJvZHkuaGFzQ2xhc3MoJ3VzZXItc21hbGwtZGlzdGFuY2UnKSkgcmV0dXJuO1xuXHRjb25zb2xlLmxvZygnc3dpcGUgZG93biEnKTsgXG59XG5cblxuXG52YXIgY2xpY2tUaW1lcjtcblxuZnVuY3Rpb24gY3Vyc29yQ2xpY2soKSB7XG5cdGlmKCRib2R5Lmhhc0NsYXNzKCdqdXN0LWNsaWNrZWQnKSkgcmV0dXJuO1xuXHRpZighJGJvZHkuaGFzQ2xhc3MoJ3VzZXItc21hbGwtZGlzdGFuY2UnKSkgcmV0dXJuO1xuXHQkZ2VzdHVyZS5odG1sKCdjdXJzb3JDbGljaycpO1xuXHRjb25zb2xlLmxvZygnY2xpY2tlZCcpO1xuXG5cdHZhciBoaXRzID0gJGN1cnNvci5jb2xsaXNpb24oJ2E6bm90KC5kaXNhYmxlZCksIC5hOm5vdCguZGlzYWJsZWQpJywgeyBtb2RlOiBcImNvbGxpc2lvblwiICB9ICk7XG5cdFxuXHRUd2Vlbk1heC50bygkY3Vyc29yLCAwLjE1LCB7IHNjYWxlOiAwLjh9KTtcblx0VHdlZW5NYXgudG8oJGN1cnNvciwgMC4xNSwgeyBzY2FsZTogMSwgZGVsYXk6IDAuMTV9KTtcblx0XG5cdGlmKGhpdHMubGVuZ3RoKSB7XG5cdFx0Y29uc29sZS5sb2coJ0NMSUNLISEhJyk7XG5cdFx0JGN1cnNvci5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0Y29uc29sZS5sb2coaGl0cy5maXJzdCgpKTtcblx0XHRoaXRzLmZpcnN0KCkuY2xpY2soKTtcblx0XHQkY3Vyc29yLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblxuXHRcdC8vZGVmYXVsdFxuXHRcdHZhciBkYXRhVGltZXIgPSAxMDAwO1xuXHRcdGlmKGhpdHMuZmlyc3QoKS5kYXRhKCd0aW1lcicpKSBcblx0XHRcdGRhdGFUaW1lciA9IGhpdHMubGFzdCgpLmRhdGEoJ3RpbWVyJyk7XG5cblx0XHQkYm9keS5hZGRDbGFzcygnanVzdC1jbGlja2VkJyk7XG5cdFx0Y2xpY2tUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHQkYm9keS5yZW1vdmVDbGFzcygnanVzdC1jbGlja2VkJyk7XG5cdFx0fSwgZGF0YVRpbWVyKTtcblxuXHRcdGN1cnNvck1vdmVkKCk7XG5cdH1cbn1cblxuXG5mdW5jdGlvbiBjdXJzb3JNb3ZlZCgpIHtcblx0aWYoISRib2R5Lmhhc0NsYXNzKCd1c2VyLXNtYWxsLWRpc3RhbmNlJykpIHJldHVybjtcblxuXHR2YXIgaGl0cyA9ICRjdXJzb3IuY29sbGlzaW9uKCdhOm5vdCguZGlzYWJsZWQpLCAuYTpub3QoLmRpc2FibGVkKScsIHsgbW9kZTogXCJjb2xsaXNpb25cIiAgfSApO1xuXHR2YXIgbGFzdEhpdDtcblxuXHRpZihoaXRzLmxlbmd0aCkge1xuXHRcdGxhc3RIaXQgPSBoaXRzLmZpcnN0KCkuYWRkQ2xhc3MoJ2hvdmVyJyk7XG5cdFx0JCgnYTpub3QoLmRpc2FibGVkKSwgLmE6bm90KC5kaXNhYmxlZCknKS5ub3QobGFzdEhpdCkucmVtb3ZlQ2xhc3MoJ2hvdmVyJyk7XG5cdH0gXG5cdGVsc2Uge1xuXHRcdCQoJ2E6bm90KC5kaXNhYmxlZCksIC5hOm5vdCguZGlzYWJsZWQpJykucmVtb3ZlQ2xhc3MoJ2hvdmVyJyk7XG5cdH1cbn1cblxuXG5cbmZ1bmN0aW9uIGN1cnNvck9wZW4oKSB7XG5cdGlmKCEkY3Vyc29yLmhhc0NsYXNzKCdjbG9zZWQnKSkgcmV0dXJuO1xuXHQkY3Vyc29yLnJlbW92ZUNsYXNzKCdjbG9zZWQnKTtcbn1cblxuXG5mdW5jdGlvbiBjdXJzb3JDbG9zZSgpIHtcblx0aWYoJGN1cnNvci5oYXNDbGFzcygnY2xvc2VkJykpIHJldHVybjtcblx0JGN1cnNvci5hZGRDbGFzcygnY2xvc2VkJyk7XG59XG5cblxuZnVuY3Rpb24gY2xpY2tIb21lKCkge1xuXHRjb25zb2xlLmxvZygnY2xpY2tIb21lJyk7XG59XG5cbiIsIlxuKGZ1bmN0aW9uKCkge1xuXG5cdGZ1bmN0aW9uIHJlcXVlc3RGdWxsU2NyZWVuKCkge1xuXHRcdHZhciBlbGVtZW50ID0gZG9jdW1lbnQuYm9keTsgXG5cdCAgICB2YXIgcmVxdWVzdE1ldGhvZCA9IGVsZW1lbnQucmVxdWVzdEZ1bGxTY3JlZW4gfHwgZWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbiB8fCBlbGVtZW50Lm1velJlcXVlc3RGdWxsU2NyZWVuIHx8IGVsZW1lbnQubXNSZXF1ZXN0RnVsbHNjcmVlbjtcblxuXHQgICAgaWYgKHJlcXVlc3RNZXRob2QpIHsgXG5cdCAgICAgICAgcmVxdWVzdE1ldGhvZC5jYWxsKGVsZW1lbnQpO1xuXHQgICAgfSBcblx0fVxuXG5cblx0JChkb2N1bWVudCkub24oJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHZhciBrZXkgPSBlLmtleUNvZGUgfHwgZS53aGljaDtcbiAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICAgIGNhc2UgNjc6IC8vIGNcbiAgICAgICAgICAgICAgICAkYm9keS50b2dnbGVDbGFzcygnaGFzLWN1cnNvcicpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgNzA6IC8vIGZcblx0XHRcdFx0cmVxdWVzdEZ1bGxTY3JlZW4oKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSk7XG5cblxufSgpKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=