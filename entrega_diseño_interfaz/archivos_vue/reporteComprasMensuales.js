var vueReporte= new Vue({
    el:"#vueReporte",
    data:{
        alerta:{
          titulo: "Error",
          mensaje:"Texto"
      },

      fecha1:null,
      fecha2:null,
        compras:[],
       
    
        
    },
    mounted: function(){
        this.cargarDatos();
    },
    methods:{
        mostrarAlerta:function(titu,msg){
            this.alerta.titulo=titu;
            this.alerta.mensaje=msg;
           
            $("#miAlerta").show('fade');
            setTimeout(function(){
                $("#miAlerta").hide('fade');
            },5000);
            
        },
        cerrarAlerta:function(){
            $('#miAlerta').hide('fade');
        },
        //consume la API con axios
        cargarDatos: function(){
if (this.fecha1==null || this.fecha2==null) {
    alert("Para ver la estadistica Mensual seleccione  ambas fechas")
}else{


            //Carga compras de acuerdo al rango de fechas
            axios.get('http://localhost:3000/api/comprashttp://localhost:3000/api/compras?filter=%7B%22where%22%3A%20%7B%22fecha%22%3A%20%7B%22between%22%3A%20%5B%22'+fecha1+'%22%2C%22'+fecha2+'%22%5D%7D%7D%7D')
                    .then(function (response) {
                        console.log(response.data);
                        vueReporte.compras=response.data;
                      })
                .catch(function (error){
                vueApp.mostrarAlerta("Error en API",error);
            });



}

            
           
        },
        
        
        // fecha :new Date(),//Declaramos el objeto fecha actual
        // textoFecha:function(fecha){


        //     var meses = new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
        //     var mesLetras = meses[fecha.getMonth()];  //El mes en letras
        //     var anho = fecha.getFullYear();  //getFullYear() devuelve el año(4 dígitos).
        //     document.write(textoFecha(fecha)); //Imprimir llamando a la función textoFecha()
        // }
        
  
    },
});