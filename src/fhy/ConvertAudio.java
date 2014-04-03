package fhy;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class ConvertAudio {
	/**
	 * 检查文件是不是文件
	 * 
	 * @param file
	 * @return
	 */
	public boolean checkFile(File file) {
		if (file.isFile())
			return true;
		else
			return false;
	}

	/**
	 * 获取文件的后缀名
	 */
	public String getFileSuffix(File file) {
		String filename = file.getName();
		String fileSuffixName = null;
		if (filename != null) {
			int startPosition = filename.lastIndexOf(".");
			fileSuffixName = filename.substring(startPosition);
		}
		return fileSuffixName;

	}

	/**
	 * 检验后缀名是否符合转换要求
	 * 
	 * @param suffixName
	 * @return
	 */
	public boolean checkFileSuffix(String suffixName) {
//		switch (suffixName) {
//		case ".aac":
//		case ".avi":
//		case ".wmv":
//		case ".3gp":
//		case ".flv":
//		case ".mp4":
			return true;
		// default:
		// return false;
		// }
	}

	/**
	 * 转换
	 * 
	 * @param ffmpegPath
	 * @param srcFile
	 * @param destFile
	 * @return
	 */
	public boolean process(String ffmpegPath, File srcFile, File destFile) {
		if (this.checkFile(srcFile)) {
			String suffixName = this.getFileSuffix(srcFile);
			if (this.checkFileSuffix(suffixName)) {
				List<String> commend = new ArrayList<String>();
				commend.add(ffmpegPath);// "d:\\pcm\\ffmpeg.exe"
				commend.add("-i");
				commend.add(srcFile.toString());
				commend.add("-ab");
				commend.add("64");
				// commend.add(" -acodec ");
				// commend.add("codec");
				commend.add("-ac");
				commend.add("2");
				commend.add("-ar");
				commend.add("22050");
				// 清晰度 -qscale 4 为最好可是文件大, -qscale 6就可以了
				commend.add("-b");
				commend.add("230");
				// commend.add("-s");
				// commend.add("350x240");
				commend.add("-r");
				commend.add("29.97");
				commend.add("-y");
				commend.add(destFile.toString());
				System.out.println(commend);
				System.out.println("----");
				try {
					ProcessBuilder builder = new ProcessBuilder();
					builder.command(commend);
					builder.start();
					return true;
				} catch (Exception e) {
					e.printStackTrace();
					return false;
				}
			}
		} else {
			System.out.println(srcFile + " is not a file!");
		}
		return false;

	}

	public static void main(String[] args) {
		File srcFile = new File("D:/pcm/baichuanyu.aac");
		File destFile = new File("D:/pcm/baichuanyu.wav");
		String ffmpegPath = "d:/pcm/ffmpeg.exe";
		ConvertAudio ca = new ConvertAudio();
		if (ca.process(ffmpegPath, srcFile, destFile)) {
			System.out.println(srcFile.getName() + " 已成功转换为 " + destFile.getName());
		}

	}

}
