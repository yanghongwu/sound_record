package fhy;

import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Base64;

/**
 * Servlet implementation class TestRecordFlashServlet
 */
public class TestSoundRecordMP3Servlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#service(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//request.setCharacterEncoding("UTF-8");
		String uploadFileName = request.getParameter("uploadFileName");
		// ÍêÕûÃû³Æ
		// String filename = UUID.randomUUID().toString().replace("-", "") +
		// uploadFileName;

		String fileStr = request.getParameter("file");
		// InputStream stream = request.getInputStream();
		// InputStreamReader isr = new InputStreamReader(stream);
		// BufferedReader br = new BufferedReader(isr);
		// String str = br.readLine();
		// System.out.println(str);
		//
		// str = URLDecoder.decode(str, "UTF-8");
		// System.out.println(str);
		fileStr = fileStr.replaceAll("\\#", "/");
		fileStr = fileStr.replaceAll("\\*","+");
		fileStr = fileStr.replaceAll("\\-", "=");
		File uploadFile = new File("D:/deploy/apache-tomcat-6.0.39/wtpwebapps/speechInput/soundrecord/FlashRecord.mp3");
		uploadFile.deleteOnExit();
		if (!uploadFile.exists()) {
			uploadFile.createNewFile();
		} 
		
		String temp = fileStr;
		byte[] data = Base64.decodeBase64(temp.getBytes());
		FileOutputStream fOut = new FileOutputStream(uploadFile, true);
		fOut.write(data);
		fOut.close();
		// br.close();
	}

	public static void main(String[] args) {
		try {
			String fileStr = "11111###555555**77777-------";
			fileStr = fileStr.replaceAll("\\#", "/");
			fileStr = fileStr.replaceAll("\\*","+");
			fileStr = fileStr.replaceAll("\\-", "=");
			System.out.println();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
