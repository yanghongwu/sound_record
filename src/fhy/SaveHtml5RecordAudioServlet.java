package fhy;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
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
public class SaveHtml5RecordAudioServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#service(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String uploadFileName = request.getParameter("uploadFileName");
		uploadFileName = "test.wav";
		String filename = UUID.randomUUID().toString().replace("-", "") + uploadFileName;

		DiskFileItemFactory diskFactory = new DiskFileItemFactory();
		diskFactory.setSizeThreshold(4 * 1024);
		diskFactory.setRepository(new File("d:/temp"));

		ServletFileUpload upload = new ServletFileUpload(diskFactory);
		try {
			List<FileItem> fileItems = upload.parseRequest(request);
			Iterator<FileItem> iter = fileItems.iterator();
			while (iter.hasNext()) {
				FileItem item = (FileItem) iter.next();
				if (item.isFormField()) {
					System.out.println("");
				} else {
					long fileSize = item.getSize();

					if ("".equals(filename) && fileSize == 0) {
						return;
					}
					String filePath = "D:\\software\\Apache Software Foundation\\Apache2.2\\htdocs\\audioTest\\";
					
					File uploadFile = new File(filePath + item.getName());
					if (!uploadFile.exists()) {
						uploadFile.createNewFile();
					}

					item.write(uploadFile);
					
					response.setContentType("text/json;charset=UTF-8");
					PrintWriter out = response.getWriter();
					out.println(item.getName());
					out.close();
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
