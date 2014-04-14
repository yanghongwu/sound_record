	//-----------------------------录音---Strart----------------------------
	var c = 60; 
	var intervalId;  
	var isCancelRecord = false;
	var isDelVoice = false;
	//上传音频文件需要预设置，给Flash调用的，传输参数
	function soundUploadConfig() {
		return {
			"uploadURL" : "../../uploadFhyMP3",
			"filePath" : "D:\\software\\Apache Software Foundation\\Apache2.2\\htdocs\\",
			"audioTime" : $(".second").html()
		};
	}

	//上传音频文件把服务器返回的东西给 js ，被Flash调用的方法；获取数据参考：resultJson[0].size;
	function soundUploadCallback(resultJson) {
		var resultJson = eval(resultJson);
		//$(".voice_player_inner").attr("audiourl",resultJson[0].fileName);
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
	
	function stopRecording(){
		stopInternalTimer();
		if(isCancelRecord == false) {
			Recorder.stopMicRecording();
			$(".answerVoiceFile").fadeIn();
		} else {
			isCancelRecord = false;
		}
		stopRecordingAfterProcess();
	}
	
	function stopRecordingAfterProcess(){
		$('.voiceBtn').removeClass("micPress").addClass("micNormal");
		$(".voiceRecord").text("开始录音");
		
		var remainTime = $('.recordTime').text();
		var recordTime = 59 - parseInt(remainTime.replace("\"",""));  // 防止与后端时间差一秒；
		if(recordTime < 0) {recordTime = 0;}
		$(".second").text(recordTime);
		$(".ui-widget-overlay").attr("class","");
		$("#answerVoice").parent().css("position","absolute").css("z-index","99999").css("display","inline").css("width","0").css("height","0").css("overflow","hidden");
	}
	
	// 结束录音以后供Flash Call Back
	function saveAudioCallBack(){
		Recorder.saveAudioCallBack();
	}
	
	function initInternalTimer() {
		c = 60;
	}
	
	//时间控制器  供Flash CallBack
	function startInternalTimer()  
	{  					
		$("#flashContentP").addClass("hideDivStyle");
		intervalId = setInterval(function() {
			$('.recordTime').text(c+"\"");
			 c = c - 1; 
			 	 
			 if(c <= 0){
				stopRecording();
			 }
		}, 1000);		
	}  

	function stopInternalTimer()  
	{  
		clearInterval(intervalId);
		$('.recordTime').text(c+"\"");
		initInternalTimer();
	} 
	// 语音录入初始化
	function speechInputInit(){
		var swfVersionStr = "11.1.0";
		var xiSwfUrlStr = "./swf/playerProductInstall.swf";
		var flashvars = {};
		var params = {};
		params.quality = "high";
		params.bgcolor = "#cccccc";
		params.allowscriptaccess = "always";
		params.allowfullscreen = "true";
		var attributes = {};
		attributes.id = "sound_record";
		attributes.name = "sound_record";
		attributes.align = "middle";
		swfobject.embedSWF("./swf/sound_record.swf", "sound_record", "238", "140",
				swfVersionStr, xiSwfUrlStr, flashvars, params, attributes);
		swfobject.createCSS("#sound_record", "display:block;text-align:right;");
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
				startMicRecording : function() {
					Recorder.recorder.startMicRecording();
				},
				stopMicRecording : function() {
					Recorder.recorder.stopMicRecording();
				},
				cancelMicRecording : function() {
					Recorder.recorder.cancelMicRecording();
				},				
				saveAudioCallBack : function() {
					Recorder.recorder.saveAudioCallBack();
				}
		};
		Recorder.connect("sound_record", 0);
		
	}
	//speechInputInit();
	//-----------------------------录音----End---------------------------
