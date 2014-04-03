package fhy;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sound.sampled.AudioFileFormat;
import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;

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
		// 完整名称
		String filename = UUID.randomUUID().toString().replace("-", "") + uploadFileName;

		DiskFileItemFactory diskFactory = new DiskFileItemFactory();
		// threshold 极限、临界值，即硬盘缓存 1M
		diskFactory.setSizeThreshold(4 * 1024);
		// repository 贮藏室，即临时文件目录
		diskFactory.setRepository(new File("d:/temp"));

		ServletFileUpload upload = new ServletFileUpload(diskFactory);
		// 设置允许上传的最大文件大小 4M
		upload.setSizeMax(4 * 1024 * 1024);
		// 解析HTTP请求消息头
		try {
			List fileItems = upload.parseRequest(request);
			Iterator iter = fileItems.iterator();
			while (iter.hasNext()) {
				FileItem item = (FileItem) iter.next();
				if (item.isFormField()) {
					System.out.println("处理表单内容 ...");
				} else {
					System.out.println("处理上传的文件 ...");
					System.out.println("完整的文件名：" + filename);
					long fileSize = item.getSize();

					if ("".equals(filename) && fileSize == 0) {
						System.out.println("文件名为空 ...");
						return;
					}

					File uploadFile = new File("D:/deploy/apache-tomcat-6.0.39/wtpwebapps/speechInput/flashdemo/FlashRecord.mp3");
					if (!uploadFile.exists()) {
						uploadFile.createNewFile();
					}

//					AudioInputStream ain = AudioSystem.getAudioInputStream(item.getInputStream());
//					AudioFormat format = ain.getFormat();
//					AudioSystem.write(ain, AudioFileFormat.Type.WAVE, new File("out2.wav"));
					item.write(uploadFile);
				}
			}// end while()
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
