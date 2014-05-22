package fhy;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Base64;

/**
 * Servlet implementation class TestRecordFlashServlet
 */
public class SaveImgServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#service(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		getContentFromText(request, response);
	}

	private void getContentFromText(HttpServletRequest request, HttpServletResponse response) throws IOException, FileNotFoundException {
		String imgStr = request.getParameter("img");
		String filePath = request.getHeader("filePath");
		if (filePath == null || "".equals(filePath)) {
			filePath = "D:\\software\\Apache Software Foundation\\Apache2.2\\htdocs\\paizhao\\img\\";
		}
		String fileName = UUID.randomUUID().toString() + ".png";
		File uploadFile = new File(filePath + fileName);
		byte[] data = Base64.decodeBase64(imgStr.getBytes());
		FileOutputStream fOut = new FileOutputStream(uploadFile, true);
		fOut.write(data);
		fOut.close();

		response.setContentType("text/json;charset=UTF-8");
		PrintWriter out = response.getWriter();
		out.println(fileName);
		out.close();
	}

}
