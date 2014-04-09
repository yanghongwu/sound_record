package fhy;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Base64;

/**
 * Servlet implementation class TestRecordFlashServlet
 */
public class TestSoundRecordMP3FhyServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#service(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String fileStr = request.getParameter("file");
		fileStr = fileStr.replaceAll("\\#", "/");
		fileStr = fileStr.replaceAll("\\*", "+");
		fileStr = fileStr.replaceAll("\\-", "=");
		File uploadFile = new File("D:/deploy/apache-tomcat-6.0.39/wtpwebapps/speechInput/demo_flash_mp3/fhy/FlashRecord.mp3");
		uploadFile.deleteOnExit();
		if (!uploadFile.exists()) {
			uploadFile.createNewFile();
		}

		String temp = fileStr;
		byte[] data = Base64.decodeBase64(temp.getBytes());
		FileOutputStream fOut = new FileOutputStream(uploadFile, true);
		fOut.write(data);
		fOut.close();

		response.setContentType("text/json;charset=UTF-8");
		PrintWriter out = response.getWriter();
		out.println("[{fileName:\"FlashRecord.mp3\",size:\"6666\"}]");
		out.close();
	}

}
