// 选择身份
document.writeln('<div id="identity">');
document.writeln('	<div  class="identity">');
document.writeln('	<a href="reg_teacher.html" class="teacher"><p>我是老师</p></a>');
document.writeln('    <a href="reg_student.html" class="student"><p>我是学生</p></a>');
document.writeln('    </div>');
document.writeln('</div>');
//登录
document.writeln('<div id="login">');
document.writeln('        	<ul class="login">');
document.writeln('            	<li><input name="" type="text" class="input username"></li>');
document.writeln('                <li><input name="" type="password" class="input psw"></li>');
document.writeln('                <li class="mb15">');
document.writeln('                	<span class="fr"><a href="#" onClick="$(\'#identity\').dialog(\'open\');$(\'#login\').dialog(\'close\');return false">马上注册</a></span>');
document.writeln('                    <span class="label"><label><input name="" type="checkbox" value="">记住密码</label></span>');
document.writeln('                    <span><a href="#">忘记密码？</a></span>');
document.writeln('               	</li>');
document.writeln('                <li class="errorInfo"><!--span>账号或密码输入错误</span--></li>');
document.writeln('                <li><button class="btn">登录</button></li>');
document.writeln('            </ul>');
document.writeln('</div>');