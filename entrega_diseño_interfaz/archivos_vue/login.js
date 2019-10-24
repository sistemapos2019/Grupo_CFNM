var vueApp= new Vue({
    el:"#vueApp",

    data:{
          usuario:[],

          parametro:{
            login:"",
            pin: ""   
          }
      },

      methods:{


        autenticacion:function(){

            // var usuario= document.getElementById("usuarioLogin").value;
            // var pin= document.getElementById("pinLogin").value;
            // console.log(usuario);
            // console.log(pin);
            console.log("entra");
            
            axios.get('http://localhost:3000/api/Usuarios')//le paso la url para ir a traer los datos de la api
           
            .then(function (response){
                console.log(response);
            vueApp.usuario=response.data;
            vueApp.usuario.forEach(element => {
                if((element.login== vueApp.parametro.login && element.pin== vueApp.parametro.pin) || (element.login== vueApp.parametro.login && element.clave== vueApp.parametro.pin)){//comparo  el jason si el parametro de login es 1
                   console.log(vueApp.parametro.login);
                   console.log(vueApp.parametro.pin); 
                   alert("AUTENTICACION EXITOSA"); 
                    if(element.rol=="G"){
                        console.log("gerente");
                        //url="dashboard.html";
                       // window.location.href= url;
                       //alert("AUTENTICACION EXITOSA");
    
                    }else if(element.rol=="M"){
                        console.log("mesero");
                       // window.location.href= url;
                       //alert("AUTENTICACION EXITOSA");
                    }
                }else{
                    alert("Usuario o Contrasena incorrecta");
                }
                     
                
            });
            vueApp.parametro={
                login:"",
                pin:""
            }

            })
           
            // .then(res => res.json())
            // .then(data=>{
                // console.log(data.valor)
                // console.log("entrando al for");
                
            
        }
        

}

});