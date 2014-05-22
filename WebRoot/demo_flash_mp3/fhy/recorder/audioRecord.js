	// 语音录入初始化
	function speechInputInit(){
		var swfVersionStr = "11.1.0";
		var xiSwfUrlStr = "./swf/playerProductInstall.swf";
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
		swfobject.embedSWF("./swf/audioRecord.swf",getPageLoadFlashDivId(), "214", "137",
				swfVersionStr, xiSwfUrlStr, flashvars, params, attributes);
		
		// 加载空的SWF，能够在网速慢的情况下加载完成，用来判断浏览器Flash Player版本是否支持
		var attributes2 = {};
		attributes2.id = "checkFlashPlayerVersion";
		attributes2.name = "checkFlashPlayerVersion";
		attributes2.align = "middle";
		swfobject.embedSWF("./swf/checkFlashPlayerVersion.swf","checkFlashPlayerVersion", "214", "137",
				swfVersionStr, xiSwfUrlStr, flashvars, params, attributes2);
		
		window.Recorder = {
				recorder : null,
				recorderOriginalWidth : 0,
				recorderOriginalHeight : 0,
				uploadFormId : null,
				uploadFieldName : null,
				isReady : false,

				connect : function(name, attempts) {
					if (navigator.appName.indexOf("Microsoft") != -1) {
						Recorder.recorder = window[name];
					} else {
						Recorder.recorder = document[name];
					}

					if (attempts >= 40) {
						return;
					}

					// flash app needs time to load and initialize
					if (Recorder.recorder && Recorder.recorder.init) {
						Recorder.recorderOriginalWidth = Recorder.recorder.width;
						Recorder.recorderOriginalHeight = Recorder.recorder.height;
						if (Recorder.uploadFormId && $) {
							var frm = $(Recorder.uploadFormId);
							Recorder.recorder.init(frm.attr('action').toString(),
									Recorder.uploadFieldName, frm.serializeArray());
						}
						return;
					}
							
					setTimeout(function() {
						Recorder.connect(name, attempts + 1);
					}, 100);
				},
				playbackData : function() {
					Recorder.recorder.playbackData();
				},
				stopPlaybackData : function() {
					Recorder.recorder.stopPlaybackData();
				},				
				startMicRecording : function() {
					Recorder.recorder.startMicRecording();
				},
				stopMicRecording : function() {
					Recorder.recorder.stopMicRecording();
				},
				cancelMicRecording : function() {
					Recorder.recorder.cancelMicRecording();
				},				
				saveAudio : function() {
					Recorder.recorder.saveAudio();
				},
				isAllowAccessMicrophone : function() {
					return !Recorder.recorder.isAllowAccessMicrophone();
				},				
				remainTimeOnPlayingMemAudio : function(totalTime) {  // 获取播放内存中音频时剩余时长
					return Recorder.recorder.remainTimeOnPlayingMemAudio(totalTime);
				},					
				duration : function() {  // 录音总时长
					return Recorder.recorder.duration();
				}		
		};
		Recorder.connect(getPageLoadFlashDivId(), 0);
	}
	speechInputInit();
	//----------------------------------------Flash 回调函数----------START------------------------------
	//上传音频文件需要预设置，供Flash Call Back，传输参数
	function soundUploadConfig() {
		 if(typeof soundUploadConfigForFlash != 'undefined' && soundUploadConfigForFlash instanceof Function) {
			 return soundUploadConfigForFlash(); 
		 } 
	}

	//上传音频文件把服务器返回的东西给 js ，供Flash Call Back；获取数据参考：resultJson[0].size;
	function soundUploadCallback(resultJson) {
		//var resultJson = eval(resultJson);
	}
	
	// 结束录音以后，Flash异步保存录音功能  供Flash Call Back
	function saveAudioCallBack(){
		Recorder.saveAudio();
	}
	
	// 录音结束后使用播放的功能：Flash在播放结束后调用该方法，供Flash Call Back调用
	function playBackOverCallBack(){
	    if(typeof playOverForFlash != 'undefined' && playOverForFlash instanceof Function) {
	    	playOverForFlash();  
	    }  	
	}
	
	//用户允许访问麦克风；  供Flash CallBack  用户点击安全提示面板的允许后，Flash调用此方法
	function allowAccessMicrophoneCallBack()  
	{
	    if(typeof allowAccessMicrophoneCallBackForFlash != 'undefined' && allowAccessMicrophoneCallBackForFlash instanceof Function) {
	    	allowAccessMicrophoneCallBackForFlash();  
	    }       
	}  
	
	//用户拒绝访问麦克风；  供Flash CallBack  用户点击安全提示面板的拒绝后，Flash调用此方法
	function denyAccessMicrophoneCallBack()  
	{
	    if(typeof denyAccessMicrophoneCallBackForFlash != 'undefined' && denyAccessMicrophoneCallBackForFlash instanceof Function) {
	    	denyAccessMicrophoneCallBackForFlash();  
	    }     
	    
	    $("#audioRecorder").html('<div id="audioRecord">NOT SUPPORT</div>');
	    speechInputInit();
	}  	
	
	//Flash加载完成待播放的MP3文件通知；  供Flash CallBack，Flash调用此方法
	function loadMP3CompleteCallBack()  
	{
	    if(typeof loadMP3CompleteCallBackForFlash != 'undefined' && loadMP3CompleteCallBackForFlash instanceof Function) {
	    	loadMP3CompleteCallBackForFlash();  
	    }       
	}  	
	
	//----------------------------------------Flash 回调函数-------END---------------------------------
	
	// 获取页面加载Flash Div 的ID
	function getPageLoadFlashDivId(){
	    if(typeof getPageLoadFlashDivIdForFlash != 'undefined' && getPageLoadFlashDivIdForFlash instanceof Function) {
	    	return getPageLoadFlashDivIdForFlash();  
	    }  	
	}
	var isHasError = false;
	var isHasError;
	function setGlobalErrorStatus(status,error) {
		isHasError = status;
		errorMsg = error;
	}
	
	function getErrorMsg(){
		return errorMsg;
	}
	
	function info(msg){
		console.info(msg);
	}