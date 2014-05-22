package fhy;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.Reader;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.annotation.WebListener;

import com.caucho.websocket.WebSocketContext;
import com.caucho.websocket.WebSocketListener;

/**
 * Application Lifecycle Listener implementation class MyListener
 * 
 */
@WebListener
public class MyListener implements WebSocketListener {
	
	@Override
	public void onStart(WebSocketContext webSocketContext) throws IOException {
		PrintWriter out = webSocketContext.startTextMessage();
		out.print("start ok");
		out.close();
	}

	@Override
	public void onReadText(WebSocketContext webSocketContext, Reader reader)
			throws IOException {
		PrintWriter out = null;
		int ch;
		String text = "";
		while ((ch = reader.read()) >= 0) {
			text = text + (char) ch;
		}
		int id = webSocketContext.hashCode();
		Hashtable map = MyServlet.getSockList();
		Iterator iter = map.entrySet().iterator();
		while (iter.hasNext()) {
			Map.Entry entry = (Map.Entry) iter.next();
			WebSocketContext w = (WebSocketContext) entry.getValue();
			out = w.startTextMessage();
			out.print(id + ": " + text);
			out.close();
		}
		reader.close();
	}

	@Override
	public void onDisconnect(WebSocketContext webSocketContext)
			throws IOException {
		Hashtable<?, ?> map = MyServlet.getSockList();
		map.remove(webSocketContext.hashCode());
		// To change body of implemented methods use File | Settings | File
		// Templates.
	}

	@Override
	public void onClose(WebSocketContext arg0) throws IOException {
		// TODO Auto-generated method stub

	}

	@Override
	public void onReadBinary(WebSocketContext arg0, InputStream arg1)
			throws IOException {
		// TODO Auto-generated method stub

	}

	@Override
	public void onTimeout(WebSocketContext arg0) throws IOException {
		// TODO Auto-generated method stub

	}

}
