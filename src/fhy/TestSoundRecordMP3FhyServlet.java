package fhy;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

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
		if ("application/octet-stream".equals(request.getContentType())) {
			getContentFromBin(request, response);
			return;
		}

		getContentFromText(request, response);
		// getContentFromForm(request, response);
	}

	@SuppressWarnings("unused")
	private void getContentFromForm(HttpServletRequest request, HttpServletResponse response) throws IOException, FileNotFoundException {
		String filePath = request.getHeader("filePath");
		String audioTime = request.getHeader("audioTime");

		String fileName = UUID.randomUUID().toString() + ".mp3";
		File uploadFile = new File(filePath + fileName);
		uploadFile.deleteOnExit();
		if (!uploadFile.exists()) {
			uploadFile.createNewFile();
		}

		DiskFileItemFactory diskFactory = new DiskFileItemFactory();
		diskFactory.setSizeThreshold(4 * 1024);
		diskFactory.setRepository(new File("d:/temp"));

		ServletFileUpload upload = new ServletFileUpload(diskFactory);
		upload.setSizeMax(4 * 1024 * 1024);
		try {
			List<FileItem> fileItems = upload.parseRequest(request);
			Iterator<FileItem> iter = fileItems.iterator();
			while (iter.hasNext()) {
				FileItem item = (FileItem) iter.next();
				if (item.isFormField()) {
					System.out.println("");
				} else {
					long fileSize = item.getSize();

					if ("".equals(fileName) && fileSize == 0) {
						return;
					}

					if (!uploadFile.exists()) {
						uploadFile.createNewFile();
					}

					item.write(uploadFile);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		response.setContentType("text/json;charset=UTF-8");
		PrintWriter out = response.getWriter();
		out.println("[{fileName:\"" + fileName + "\",size:\"" + audioTime + "\"}]");
		out.close();
	}

	private void getContentFromBin(HttpServletRequest request, HttpServletResponse response) throws IOException, FileNotFoundException {
		String filePath = request.getHeader("filePath");
		if (filePath == null || "".equals(filePath)) {
			filePath = "D:\\temp\\";
		}
		String audioTime = request.getHeader("audioTime");
		BufferedInputStream bis = new BufferedInputStream(request.getInputStream());
		
		String fileNamePre = UUID.randomUUID().toString();
		String fileName = fileNamePre + ".wav";

		File uploadFile = new File(filePath + fileName);
		uploadFile.deleteOnExit();
		if (!uploadFile.exists()) {
			uploadFile.createNewFile();
		}

		int bufferNum = 1024 * 100;
		byte[] buffer = new byte[bufferNum];
		FileOutputStream fOut = new FileOutputStream(uploadFile);
		
		int size = 0;
        while ((size = bis.read(buffer)) != -1) {  
        	fOut.write(buffer, 0, size);  
        }  
        
        fOut.flush();		
		fOut.close();
		
		final String srcPath = filePath + fileName;
		final String destPath = filePath + fileNamePre + ".mp3";
		new Thread() {
			@Override
			public void run() {
				Properties prop = System.getProperties();
				String osName = prop.getProperty("os.name");
				if (osName.contains("linux")) {
					WAV2MP3Util.execute("/home/lame.sh", srcPath, destPath);
				} else if (osName.matches("^(?i)Windows.*$")) {
					WAV2MP3Util.execute("D:\\lame.bat", srcPath, destPath);
				}
			}
		}.start();

		response.setContentType("text/json;charset=UTF-8");
		PrintWriter out = response.getWriter();
		out.println("[{fileName:\"" + fileName + "\",size:\"" + audioTime + "\"}]");
		out.close();
	}

	private void getContentFromText(HttpServletRequest request, HttpServletResponse response) throws IOException, FileNotFoundException {
		String fileStr = request.getParameter("file");
		String filePath = request.getHeader("filePath");
		if (filePath == null || "".equals(filePath)) {
			filePath = "D:\\temp\\";
		}
		// fileStr = fileStr.replaceAll("\\#", "/");
		// fileStr = fileStr.replaceAll("\\*", "+");
		// fileStr = fileStr.replaceAll("\\-", "=");
		String fileNamePre = UUID.randomUUID().toString();
		String fileName = fileNamePre + ".wav";
		File uploadFile = new File(filePath + fileName);
		uploadFile.deleteOnExit();
		if (!uploadFile.exists()) {
			uploadFile.createNewFile();
		}

		String temp = fileStr;
		byte[] data = Base64.decodeBase64(temp.getBytes());
		FileOutputStream fOut = new FileOutputStream(uploadFile, true);
		fOut.write(data);
		fOut.close();

		final String srcPath = filePath + fileName;
		final String destPath = filePath + fileNamePre + ".mp3";
		new Thread() {
			@Override
			public void run() {
				Properties prop = System.getProperties();
				String osName = prop.getProperty("os.name");
				if (osName.contains("linux")) {
					WAV2MP3Util.execute("sh /tmp/backup/webaction/lame.sh", srcPath, destPath);
				} else if (osName.matches("^(?i)Windows.*$")) {
					WAV2MP3Util.execute("D:\\lame.bat", srcPath, destPath);
				}
			}
		}.start();

		response.setContentType("text/json;charset=UTF-8");
		PrintWriter out = response.getWriter();
		out.println("[{fileName:\"" + fileName + "\",size:\"22\"}]");
		out.close();
	}

}
