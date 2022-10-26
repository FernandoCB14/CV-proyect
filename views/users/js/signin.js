window.onload = init;

function init(){
    if(!localStorage.getItem("token")){
        document.querySelector('.btn-secondary').addEventListener('click', function(){
            window.location.href = "login.html"
        });
    
        document.querySelector('.btn-primary').addEventListener('click', signin);
    }else{
        
        window.location.href="index.html"
    }
    
}

function signin(){
    var name = document.getElementById('input-name').value;
    var mail = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value;

    axios({
        method: 'post',
        url:'http://localhost:8081/user/signin',
        data:{
            user_name: name,
            user_mail: mail,
            user_password: pass
        }
    }).then(function (res){
        alert("Registro exitoso");

        if(res.data.code ===200){
            localStorage.setItem('token', res.data.message);
            window.location.href = "info.html";
            console.log(res);
            // window.location.href="login.html";
            

        }
    }).catch(function(err){
        console.log(err);
    });
}