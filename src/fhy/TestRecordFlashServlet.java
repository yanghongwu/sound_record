package fhy;

import java.io.File;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

/**
 * Servlet implementation class TestRecordFlashServlet
 */
public class TestRecordFlashServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#service(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String uploadFileName = request.getParameter("uploadFileName");
		String filename = UUID.randomUUID().toString().replace("-", "") + uploadFileName;

		DiskFileItemFactory diskFactory = new DiskFileItemFactory();
		diskFactory.setSizeThreshold(4 * 1024);
		diskFactory.setRepository(new File("d:/temp"));

		ServletFileUpload upload = new ServletFileUpload(diskFactory);
		upload.setSizeMax(4 * 1024 * 1024);
		try {
			List fileItems = upload.parseRequest(request);
			Iterator iter = fileItems.iterator();
			while (iter.hasNext()) {
				FileItem item = (FileItem) iter.next();
				if (item.isFormField()) {
					System.out.println("");
				} else {
					long fileSize = item.getSize();

					if ("".equals(filename) && fileSize == 0) {
						return;
					}

					File uploadFile = new File("D:/deploy/apache-tomcat-6.0.39/wtpwebapps/speechInput/demo_flash_wav/FlashRecord.mp3");
					if (!uploadFile.exists()) {
						uploadFile.createNewFile();
					}

					item.write(uploadFile);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
