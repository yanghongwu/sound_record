	var disIntervalId;	
	function audioPlayerInit(){
        var swfVersionStr = "11.1.0";
        var xiSwfUrlStr = "../swf/playerProductInstall.swf";
        var flashvars = {};
        var params = {};
        params.quality = "high";
        params.bgcolor = "#ffffff";
        params.allowscriptaccess = "always";
        params.allowfullscreen = "true";
        var attributes = {};
        attributes.id = getPageLoadFlashDivId();
        attributes.name = getPageLoadFlashDivId();
        attributes.align = "middle";
        swfobject.embedSWF("../swf/audioPlay.swf", getPageLoadFlashDivId(),"238", "140",swfVersionStr, xiSwfUrlStr, 
            flashvars, params, attributes);
		window.Player = {
				player : null,
				connect : function(name, attempts) {
					if (navigator.appName.indexOf("Microsoft") != -1) {
						Player.player = window[name];
					} else {
						Player.player = document[name];
					}

					if (attempts >= 40) {
						return;
					}

					setTimeout(function() {
						Player.connect(name, attempts + 1);
					}, 100);
				},
				playMP3 : function(url) {  // 通过URL加载的MP3进行播放
					Player.player.playMP3(url);
				},				
				stopPlayMP3 : function() {  // 停止通过URL加载的MP3，对应loadMP3()方法
					Player.player.stopPlayMP3();
				},					
				remainTime : function(totalTime) {  // 播放MP3时剩余时长
					return Player.player.remainTime(totalTime);
				}			
		};
		Player.connect(getPageLoadFlashDivId(), 0);
	}
	audioPlayerInit();
	
	//Flash加载完成待播放的MP3文件通知；  供Flash CallBack，Flash调用此方法
	function loadMP3CompleteCallBack()  
	{
	}  	
	
	//----------------------------------------Flash 回调函数-------END---------------------------------
	
	// 获取页面加载Flash Div 的ID
	function getPageLoadFlashDivId(){
	    return "audioPlay";  	
	}
	
	// 播放语音
	function playAudio(audioUrl,totalTime) {
		Player.playMP3(audioUrl);
		disIntervalId = setInterval(function () { displayRemainTime(totalTime); }, 1000);
	}
	
	$('.voice_player_inner1').click(function() {
		if($("div[id='audioPlay']").length > 0) {
			$("#disMsg").click();
			return;
		}
		clearInterval(disIntervalId);
		$('.second22').text($('.voice_player_inner1').attr("totalTime"));
		playAudio($(this).attr("audiourl"),$('.second22').text());
	});
	
	$('.voice_player_inner12').click(function() {
		clearInterval(disIntervalId);
		$('.second222').text($('.voice_player_inner12').attr("totalTime"));
		playAudio($(this).attr("audiourl"),$('.second222').text());
	});
	
	$('.sstop2').click(function() {
		Player.stopPlayMP3();
		clearInterval(disIntervalId);
		$('.second222').text($('.voice_player_inner12').attr("totalTime"));
	});
	
	$('.sstop').click(function() {
		Player.stopPlayMP3();
		clearInterval(disIntervalId);
		$('.second22').text($('.voice_player_inner1').attr("totalTime"));
	});
	
	function displayRemainTime(totalTime) {
		var remainTime = Player.remainTime(totalTime);
		$('.second22').text(remainTime);
		 	 
		if(remainTime <= 0){
			clearInterval(disIntervalId);
			$('.second22').text(totalTime);
		}
	}
