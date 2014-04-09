	//-----------------------------录音---Strart----------------------------
	//上传音频文件需要预设置，给Flash调用的，传输参数
	function soundUploadConfig() {
		return {
			"uploadURL" : "../../uploadFhyMP3",
			"uid" : "4",
			"sign" : "93063902dcfb9086ab87ff725d33b8fa44885114dd163e42ae89c04fc19f8947"
		};
	}

	//上传音频文件把服务器返回的东西给 js ，被Flash调用的方法；
	function soundUploadCallback(resultJson) {
		var resultJson = eval(resultJson);
		//alert(resultJson[0].size);
		$("#answerVoice").dialog("close");
		$(".answerVoiceFile").fadeIn();
		$(".voice_player_inner").attr("audiourl",resultJson[0].fileName);
	}
	
	// 播放语音
	function playAudio(audioUrl) {
		var audioC = $("#audioPlayer").html();
		if(audioC.length > 0) {
			$("#audioPlayer").text("");   
			return;
		}
		var payerS = '<object type="application/x-shockwave-flash" data="../../webplayer/dewplayer.swf?autostart=true&mp3='+audioUrl+'" width="0" height="0" id="dewplayer-mini">';
		payerS += '<param name="movie" value="../webplayer/dewplayer.swf?autostart=true&mp3='+audioUrl+'" />';
		payerS += '</object>';

		$("#audioPlayer").append(payerS);
	}
	
	var c=1; 
	var intervalId;  
	function initInternalTimer() {
		c = 0;
	}
	//时间控制器
	function startInternalTimer()  
	{  
		intervalId = setInterval(function() {
			$('.recordTime').text(c+"\"");
			 c = c + 1; 
			 
			 if(c > 5 && c < 10) {
				 $(".voiceRemind").text("录音时间距离3分钟还有1分钟！");
			 }
			 if(c > 10 && c < 15) {
				 $(".voiceRemind").text("录音时间距离3分钟还有30秒！");
			 }			 
			 if(c >= 16){
				stopInternalTimer();
				Recorder.stopMicRecording();
				$(".voiceBtn").removeClass("micPress").addClass("micNormal");
				$(".voiceRecord").text("开始录音");
			 }
		}, 1000);		
	}  

	function stopInternalTimer()  
	{  
		clearInterval(intervalId);
		$('.recordTime').text(c+"\"");
		c = 0;
	} 
	
	// 语音录入初始化
	function speechInputInit(){
		var swfVersionStr = "11.1.0";
		var xiSwfUrlStr = "./swf/playerProductInstall.swf";
		var flashvars = {};
		var params = {};
		params.quality = "high";
		params.bgcolor = "#ffffff";
		params.allowscriptaccess = "sameDomain";
		params.allowfullscreen = "true";
		var attributes = {};
		attributes.id = "sound_record";
		attributes.name = "sound_record";
		attributes.align = "middle";
		swfobject.embedSWF("./swf/sound_record.swf", "flashContent", "238", "140",
				swfVersionStr, xiSwfUrlStr, flashvars, params, attributes);
		swfobject.createCSS("#flashContent", "display:block;text-align:left;");
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

				playBack : function(name) {
					Recorder.recorder.playBack(name);
				},
				startMicRecording : function() {
					Recorder.recorder.startMicRecording();
				},
				stopMicRecording : function() {
					Recorder.recorder.stopMicRecording();
				}

			};
			
			Recorder.connect("sound_record", 0);
	}
	
	speechInputInit();
	//-----------------------------录音----End---------------------------
