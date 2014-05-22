package fhy;

import java.io.IOException;
import java.util.Hashtable;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.caucho.websocket.WebSocketContext;
import com.caucho.websocket.WebSocketListener;
import com.caucho.websocket.WebSocketServletRequest;

/**
 * Servlet implementation class MyServlet
 */
@WebServlet("/MyServlet")
public class MyServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private static Hashtable<Integer, WebSocketContext> map_socket = new Hashtable<Integer, WebSocketContext>(50);

	public void service(HttpServletRequest req, HttpServletResponse res)
			throws IOException, ServletException {
		String protocol = req.getHeader("Sec-WebSocket-Protocol");
		WebSocketListener listener;
		listener = new MyListener();
		// res.setHeader("Sec-WebSocket-Protocol", "my-protocol");

		WebSocketServletRequest wsReq = (WebSocketServletRequest) req;
		WebSocketContext webSocketContext = wsReq.startWebSocket(listener);
		map_socket.put(webSocketContext.hashCode(), webSocketContext);
	}

	public static Hashtable<Integer, WebSocketContext> getSockList() {
		return map_socket;
	}

}
