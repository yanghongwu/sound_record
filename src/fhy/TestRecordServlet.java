package fhy;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.SequenceInputStream;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sound.sampled.AudioFileFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;

public class TestRecordServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
	public void service(ServletRequest arg0, ServletResponse arg1) throws ServletException, IOException {
		HttpServletResponse response = (HttpServletResponse) arg1;
		HttpServletRequest request = (HttpServletRequest) arg0;
		BufferedInputStream fileIn = new BufferedInputStream(request.getInputStream());
		//String fn = request.getParameter("fileName");

		File file = new File("D:/deploy/apache-tomcat-6.0.39/wtpwebapps/speechInput/new/out.wav");
		if(!file.exists()) {
			file.createNewFile();
		}
		byte[] data = new byte[1024];

		BufferedOutputStream fileOut = new BufferedOutputStream(new FileOutputStream(file));

		while (true) {
			// ¶ÁÈ¡Êý¾Ý
			int bytesIn = fileIn.read(data, 0, 1024);
			System.out.println(bytesIn);
			if (bytesIn == -1) {
				break;
			} else {
				try {
//					if (file.exists()) {
//						AudioInputStream clip2 = AudioSystem.getAudioInputStream(new ByteArrayInputStream(data));
//
//						// write out the output to a temporary file
//						AudioSystem.write(clip2, AudioFileFormat.Type.WAVE, file);
//					} else {
						FileOutputStream fOut = new FileOutputStream(file, true);
						fOut.write(data);
						fOut.close();
//					}
				} catch (Exception e) {
				}

				// fileOut.write(data, 0, bytesIn);
			}
		}

		fileOut.flush();
		fileOut.close();
	}
}
