package fhy;

import java.io.IOException;

public class WAV2MP3Util {
	/**
	 * 转化单个文件
	 * 
	 * @return
	 */
	public static boolean execute(String executeScriptPath, String wavFilePath, String mp3FilePath) {
		String cmd = executeScriptPath + " " + wavFilePath + " " + mp3FilePath;
		try {
			Process proc = Runtime.getRuntime().exec(cmd);
			StreamGobbler errorGobbler = new StreamGobbler(proc.getErrorStream(), "Error");
			StreamGobbler outputGobbler = new StreamGobbler(proc.getInputStream(), "Output");
			errorGobbler.start();
			outputGobbler.start();
			proc.waitFor();
		} catch (Throwable e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public static void main(String[] args) throws IOException {
		System.out.println("Windows 7".matches("^(?i)Windows.*$"));
		System.out.println("Windows 8".matches("^(?i)Windows.*$"));
		System.out.println("Windows xp".matches("^(?i)Windows.*$"));
		System.out.println("Windows xp333".matches("^(?i)Windows.*$"));
		System.out.println("1Windows xp".matches("^(?i)Windows.*$"));
		System.out.println("Linux".matches("^(?i)Windows.*$"));
		
		String wavPath = "d:\\test4.wav";
		String mp3Path = "d:\\test4.mp3";
		WAV2MP3Util.execute("D:\\lame.bat",wavPath,mp3Path);
		WAV2MP3Util.execute("D:\\lame.bat",wavPath,mp3Path);
		
		String wavPathLinux = "/tmp/backup/webaction/test.wav";
		String mp3PathLinux = "/tmp/backup/webaction/test4.mp3";
		WAV2MP3Util.execute("sh /tmp/backup/webaction/lame.sh",wavPathLinux,mp3PathLinux);
	}
}