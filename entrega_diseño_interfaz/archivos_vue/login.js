var vueLogin= new Vue({
    el:"#vueLogin",

    data:{
          usuario:[],
          parametros:[],
          parametro:{
            login:"",
            pin: ""   
          },
          idmodal:"",
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
                vueLogin.usuario=response.data;

            if (vueLogin.comprobarUsuario(vueLogin.parametro.login)==true && vueLogin.comprobarPassword(vueLogin.parametro.pin)==true) {
                alert("AUTENTICACION EXITOSA")
                abrirModal();
                //url="dashboard.html";
               // window.location.href= url;
            } else {
                alert("USUARIO O CONTRASEÑA INCORRECTA")
            }
            vueLogin.parametro={
                login:"",
                pin:""
            }
            
            

            })
           
           
                
            
        },

        comprobarUsuario:function(login){
            existe=false;
   for (let index = 0; index < vueLogin.usuario.length; index++) {
    if (vueLogin.usuario[index].login==login) {
        existe=true;
        break
    }
    
}
return existe;

        },

        comprobarPassword:function (pin){
            existe=false;

            for (let index = 0; index < vueLogin.usuario.length; index++) {
                if (vueLogin.usuario[index].pin==pin || vueLogin.usuario[index].clave==pin) {
                    existe=true;
                    break
                }
                
            }
return existe;
        },

        mostrarlogin:function(){
            $('#inicioSecion').modal('show');
        },

// la funcion loginPantalla no ira aqui si no que en las otras pantalas
loginporPantalla:function(event){

axios.get('http://localhost:3000/api/parametros')//le paso la url para ir a traer los datos de la api
           
.then(function (response){
    console.log(response);
    vueLogin.parametros=response.data;

if (vueLogin.parametros[11].valor==1 ) {

//     let boton  = event.target.data("idModal");
// vueLogin.idmodal = boton;

//alert(event.currentTarget.tagName)
vueLogin.mostrarlogin();
//autenticacion();//esta funcion va en el boton login del modal (o no se como le has puesto al boton para iniciar sesion XD) que abris en la linea 100 del codigo
} else {
    
}

})

},

abrirModal:function(){
$('#inicioSeccion').modal("hide");
// $(vueLogin.idmodal).modal("show")
windows.location.href=vueLogin.idmodal;
}


},


});