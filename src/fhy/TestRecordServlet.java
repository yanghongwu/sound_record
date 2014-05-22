package fhy;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

public class TestRecordServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
	public void service(ServletRequest arg0, ServletResponse arg1) throws ServletException, IOException {
		HttpServletRequest request = (HttpServletRequest) arg0;
		BufferedInputStream fileIn = new BufferedInputStream(request.getInputStream());

		String filePath = "D:\\software\\Apache Software Foundation\\Apache2.2\\htdocs\\audioTest\\";
		File file = new File(filePath + "test.wav");
		if (!file.exists()) {
			file.createNewFile();
		}
		byte[] data = new byte[1024];

		FileOutputStream fOut = new FileOutputStream(file);
		int size = 0;
		while ((size = fileIn.read(data)) != -1) {
			fOut.write(data, 0, size);
		}

		fOut.flush();
		fOut.close();
	}
}
