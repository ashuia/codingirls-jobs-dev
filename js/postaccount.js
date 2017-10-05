let baseHost='http://139.199.185.146:8092';
function postInfo() {
    let username = $("input[name='registerusername']").val(); //用户名
    let password = $("input[name='registerpassword']").val(); //密码
    let useremail = $("input[name='registeremail']").val(); //账号
    let url = `${baseHost}/user/signup`;
    $.ajax({
        url: `${url}`,
        type: "POST",
        data: {
            'username': `${username}`,
            'password': `${password}`,
            'useremail': `${useremail}`
        },
        success: function(data) {
            //跳转页面
            if(data.code === 0){
                //console.log()
                window.location = `./sendAnotherEmail.html?email=${useremail}`;
                //console.log('success')
            }else{
                 //console.log(data.msg)
                 alert(data.msg)
            }

        }
    });
}

function loginInfo() {
    let username = $("input[name='loginemailname']").val();
    let password = $("input[name='loginpassword']").val();
    let url = `${baseHost}/user/login`;
    $.ajax({
        url: `${url}`,
        type: "POST",
        data: {
            'username': `${username}`,
            'password': `${password}`
        },
        success: function(data) {
            if (data.code === 1) { //表示已经登录
                document.write("您已登录，将在五秒钟后跳转到首页.");
                setTimeout('Redirect()', 5000);
            } else if (data.code === 0) {
                //document.write(data.msg)
                setTimeout('Redirect()', 1000);
            } else {
                alert(data.msg)
                //$('#showinfo').html(data.msg); //这里显示错误信息
            }
        }
    });
}

function Redirect() //使用函数进行跳转
{
    //console.log('111');
    window.location = "./person.html";
}

function intoIndex() { //进入首页，调用该函数，判断是否已经登录
    let url = `${baseHost}/user/index`;
    $.ajax({
        url: `${url}`,
        type: 'GET',
        success: function(data) {
            ///$('#getuser').html(data); //将数据发送到4
            if(data.code === 0){
                //显示用户名
                $('#top_username').text(` ${data.msg}`)
                getLogOrNot(1, data.msg);
                //console.log(111)
                //return 1;
            }else if(data.code === 1){
                //don't do
                getLogOrNot(0,'');
                //console.log(222)
            }
        }
    })
}


//注销登录的函数---进行调用
function logout() {
    let url = '${baseHost}/user/logout';
    $.ajax({
        url: `${url}`,
        type: 'GET',
        success: function(data) {
            //应该提示您已经注销登录---并跳转到某个页面
            $('#getuser').html(data); //将数据发送到
        }
    })
}

//忘记密码的操作
function forgetpass() {
    let email = $("input[name='forgetemail']").val();
    let url = `${baseHost}/user/forget/password`;
    $.ajax({
        url: `${url}`,
        type: 'POST',
        data: {
            'useremail': `${email}`
        },
        success: function(data) {
            //提示已经发送验证码
            if(data.code===0){
                console.log(data);
                window.location = `./modifyPassword.html?email=${email}`;
            }

        }
    })
}

//重置密码操作
function passresert() {
    let email = location.search.slice(7);
    console.log(email)
    let password = $('#password2').val();
    let vcode = $('#vcode').val();
    console.log(vcode)
    let url = `${baseHost}/user/forget/resert`;

    $.ajax({
        url: `${url}`,
        type: 'POST',
        data: {
            'useremail': `${email}`,
            'password': `${password}`,
            'verification': `${vcode}`
        },
        success: function(data) {
            if(data.code === 0){
               console.log(data);
               alert(data.msg)
               window.location = `./login.html`;
            }else{
                alert(data.msg)
            }

        }
    })
}


function againEmail(){  //再次发送验证
    let email = location.search.slice(7);
    //console.log(email)
    let url = `${baseHost}/user/againemail?email=${email}`;
    $.ajax({
        url: `${url}`,
        type: 'POST',
        data:{
            'useremail': `${email}`
        },
        success:function(data){
            console.log(data);
        }
    });
}

//keypress
function keyPress(){
    let username = $("input[name='registerusername']").val(); //用户名
    let url = `${baseHost}/user/signup/username`;
    $.ajax({
        url: `${url}`,
        type: 'POST',
        data:{
            'username': `${username}`
        },
        success:function(data){
            console.log(data.msg);
        }
    });
}

//获取用户个人详细信息
function getUserDetail(){
    let url = `${baseHost}/user/detail`;
    $.ajax({
        url: `${url}`,
        type:'GET',
        success:function(data){
            //显示数据给用户界面
            if(data.code === 0){
                //console.log(data.msg)
                $("input[name='InputcompanyName']").val(data.msg.name);
                $("input[name='InputcompanyAddress']").val(data.msg.address);
                $("input[name='InputcompanyKind']").val(data.msg.kind);
                //alert('更新信息成功')
            }else{
                console.log('查询失败')
            }
        }
    })
}

//提交用户个人详细信息
function postUserDetail(){
    let companyname = $("input[name='InputcompanyName']").val();
    let companyaddress  = $("input[name='InputcompanyAddress']").val();
    let companykind = $("input[name='InputcompanyKind']").val();
    console.log(companyname + ' ' + companyaddress + ' ' + companykind)
    let url = `${baseHost}/user/detail`;
    $.ajax({
        url: `${url}`,
        type: 'POST',
        data:{
            "companyname": `${companyname}`,
            "companyaddress": `${companyaddress}`,
            "companykind": `${companykind}`
        },
        success:function(data){
            //提示提交成功
            if(data.code === 0)
                alert('更新信息成功')
        }
    })
}

function setNewPassword(){
    let url = `${baseHost}/user/set/password`;
    let current = $("input[name='InputCurrentPassword']").val();
    let newpass = $("input[name='InputNewPassword']").val();
    let username = $('#top_username').text();
    console.log(username + '  ' + current + '  ' + newpass)
    $.ajax({
        url: `${url}`,
        type:'POST',
        data:{
            'username': `${username}`,
            'current': `${current}`,
            'newpass': `${newpass}`
        },
        success:function(data){
            if(data.code === 0){
                alert(data.msg)
            }else{
                alert(data.msg)
            }
        }
    })
}


///获取用户颜色  [1...20]
function getUserColor(){
    let color = ['rgb(32,165,96)','rgb(255,69,0)','rgb(255,230,0)','forestgreen','black','darkcyan','mediumblue','rgb(65,150,225)','slateblue','rgb(169,169,169)','url(../images/aurora.jpg)','url(../images/desertkiss.jpg)','url(../images/elixir.jpg)','url(../images/glasspane.jpg)','url(../images/meadow.jpg)','url(../images/rocky.jpg)','url(../images/sun.jpg)','url(../images/painting.jpg)','url(../images/lake.jpg)','url(../images/morning.jpg)'];
    let url = `${baseHost}/user/get/color`;
    $.ajax({
        url:  `${url}`,
        type: 'GET',
        success:function(data){
            //显示最后的颜色
            console.log(data.msg)
            document.getElementById('colorChange').style.background=color[parseInt(data.msg)-1]
        }

    })
}
