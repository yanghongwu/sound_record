package fhy;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
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

		File file = new File("D:/deploy/apache-tomcat-6.0.39/wtpwebapps/speechInput/demo_html5/out.wav");
		if (!file.exists()) {
			file.createNewFile();
		}
		byte[] data = new byte[1024];

		BufferedOutputStream fileOut = new BufferedOutputStream(new FileOutputStream(file));

		while (true) {
			int bytesIn = fileIn.read(data, 0, 1024);
			System.out.println(bytesIn);
			if (bytesIn == -1) {
				break;
			} else {
				try {
					FileOutputStream fOut = new FileOutputStream(file, true);
					fOut.write(data);
					fOut.close();
				} catch (Exception e) {
				}
			}
		}

		fileOut.flush();
		fileOut.close();
	}
}
