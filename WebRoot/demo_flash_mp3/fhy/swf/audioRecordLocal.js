	//全局变量
	var RECORD_TIME = 180;
	var c = RECORD_TIME;  //录音时间
	var intervalId;  // 录音计时器ID
	var isCancelRecord = false; //是否取消录音操作标识
	var isDelVoice = false;  //是否删除播放录音操作标识
	var isPlaying = false;   //是否正在播放
	var isAutoStopRecording = false;   //是否时间到了自动停止录音
	var isFirstAccess = true;
	var timeoutID; //第一次访问时 延迟时间控制器
	
	//---------------------------------[模板方法]----------Start---------------------------
	//[模板方法]Flash调用此方法获取上传音频文件需要的预设置
	function soundUploadConfigForFlash() {
		return {
			// 下列参数根据自己需要进行设置
			"uploadURL" : "../../uploadFhyMP3", //上传地址
			"filePath" : "D:\\temp\\",// 音频文件保存位置
			"duration_time" : $(".second").html(), // 时间
			"wrongthemeid" : $(".second").html(), // 时间
			"answer_origin" : $(".second").html(), // 时间
			"audio_origin" : $(".second").html()// 时间
		};
	}
	//[模板方法] 用户允许访问麦克风调用此方法   
	function allowAccessMicrophoneCallBackForFlash() {
		intervalId = setInterval("startIntervalTimer()", 1000);
		if(Recorder.isAllowAccessMicrophone() || isFirstAccess){
			$("#audioRecordP").removeClass("flash2").addClass("flashv2");
		}
		
		if(isFirstAccess) {
			isFirstAccess = false;
		}
	    $(".voiceRecord").text("录音中(点击按钮结束)");
	    $("#audioRecordP").css('');
	}  
	
	//[模板方法] 用户拒绝访问麦克风调用此方法   
	function denyAccessMicrophoneCallBackForFlash() {
		$("#audioRecordP").removeClass("flash2").addClass("flashv2");
		$('#answerVoice').dialog('close');
		$('.answerVoiceFile').fadeOut();
	}
	
	//[模板方法] 录音结束后使用播放的功能：Flash在播放结束后调用该方法
	function playOverForFlash(){
		isPlaying = false;
	}
	
	//[模板方法] 获取页面加载Flash Div 的ID
	function getPageLoadFlashDivIdForFlash(){
		return "audioRecord";
	}
	//---------------------------------[模板方法]----------End---------------------------
	
	//----------------------------------------------业务自己的方法--------------------------------
	// 停止录音
	function stopRecording(){
		stopInternalTimer();
		if(isCancelRecord == false) {
			$(".answerVoiceFile").fadeIn();
			Recorder.stopMicRecording();
		} else {
			isCancelRecord = false;
		}
		
		stopRecordingAfterProcess();
	}
	// 停止录音的后续处理
	function stopRecordingAfterProcess(){
		$('.voiceBtn').removeClass("micPress").addClass("micNormal");
		$(".voiceRecord").text("开始录音");
		
		var remainTime = $('.recordTime').text();
		var recordTime = RECORD_TIME - 1 - parseInt(remainTime.replace("\"",""));  // 防止与后端时间差一秒；
		if(recordTime < 0) {recordTime = 0;}
		$(".second").text(recordTime);
		$(".ui-widget-overlay").remove();
		$("#answerVoice").parent().removeAttr("class");
		$("#answerVoice").parent().css("position","absolute").css("z-index","99999").css("width","0").css("height","0").css("overflow","hidden");
	}
	
	// 播放语音
	function playAudio(audioUrl) {
		audioUrl = "http://localhost/" + audioUrl;
		var audioC = $("#audioPlayer").html();  // 对应Html的div
		if(audioC.length > 0) {
			$("#audioPlayer").text("");   
			return;
		}
		var payerS = '<object type="application/x-shockwave-flash" data="../../webplayer/dewplayer.swf?autostart=true&mp3='+audioUrl+'" width="0" height="0" id="dewplayer-mini">';
		payerS += '<param name="movie" value="../../webplayer/dewplayer.swf?autostart=true&mp3='+audioUrl+'" />';
		payerS += '</object>';

		$("#audioPlayer").append(payerS);
	}
	
	// 初始化时间控制器
	function initInternalTimer() {
		c = RECORD_TIME;
	}
	
	// 停止时间控制器
	function stopInternalTimer()  
	{  
		clearInterval(intervalId);
		$('.recordTime').text(c+"\"");
		initInternalTimer();
	} 
	
	// 延迟启动录制功能
	function startLazyRecording(){
		clearTimeout(timeoutID);
		Recorder.startMicRecording();
		if(!Recorder.isAllowAccessMicrophone()){
			$("#audioRecordP").removeClass("flashv2").addClass("flash2");
		}
	}
	
	// 启动时间控制器
	function startIntervalTimer() {
		$('.recordTime').text(c+"\"");
		 c = c - 1; 
		 	 
		 if(c <= 0){
			clearInterval(intervalId);
			isAutoStopRecording = true; 
			stopRecording();
			$('.voiceBtn').click();
		 }
	}
	
	