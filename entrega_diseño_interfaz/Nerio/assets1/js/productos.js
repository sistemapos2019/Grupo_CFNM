
var vueProduct= new Vue({
    el: "#AdminProductos",
    data:{
        alerta:{
          titulo: "Error",
          mensaje:"Texto"
      },
        orderByCampo:"",
        orderByAsc:1,
        textoBusqueda:"",
        categoriaSelected: 1,
        productoSelected: 0,
        productos:[],
        categorias:[],
        nuevoProducto: {
            "idProducto": 0,
            "idCategoria": 1,
            "nombreProducto": "",
            "precio": 0,
            "esPreparado": 0
        },   
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
        buscar:function(x){
            
            if(this.textoBusqueda=="")
                return true;
                    
            var cad=this.productos[x].nombreProducto + 
                this.productos[x].idProducto +
                this.productos[x].precio;
            cad=cad.toUpperCase();
            
            if(cad.indexOf(this.textoBusqueda.toUpperCase())>=0)
                        return true;
            else
                return false;
            
                
            
        },
        nombreCategoria:function(idCat){
            return this.categorias.find(function(cat){
                return cat.idCategoria==idCat
            }).nombreCategoria;
        },
        orderBy: function(campo){
            if(this.orderByCampo==campo)
                this.orderByAsc*= -1;
            this.orderByCampo=campo;
            
          if(campo=="ID"){
             this.productos.sort(function(a,b){
                // Se debe usar vueProduct.orderByAsc
                // porque this ya no hace referencia al objeto vue
                 
                 
                 return vueProduct.orderByAsc * 
                     (a.idProducto - b.idProducto);
              });
    
          }
        if(campo='NOMBRE'){
            this.productos.sort(function(a,b){
                if(a.nombreProducto>b.nombreProducto)
                    return vueProduct.orderByAsc * 1;
                else
                    return vueProduct.orderByAsc * -1;
            });
            
        }
        if(campo=="PRECIO"){
             this.productos.sort(function(a,b){
                // Se debe usar vueProduct.orderByAsc
                // porque this ya no hace referencia al objeto vue
                 return vueProduct.orderByAsc * (a.precio - b.precio);
              });
    
          }  
        },
        cargarDatos: function(){
            //cargando las categorias
            axios.get('http://localhost:3000/api/Categoria')
                .then(function (res) {
                    vueProduct.categorias=res.data;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
            //PRODUCTOS
            axios.get('http://localhost:3000/api/Productos')
                .then(function (res) {
                    vueProduct.productos=res.data;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
            
        },
        mostrarAgregar:function(){
            $('#modalAgregar').modal('show');
        },
        mostrarModificar:function(){
            $('#modalModificar').modal('show');
        },
        mostrarEliminar:function(){
            $('#modalEliminar').modal('show');
        },
        agregarProducto:function(){
            axios.post('http://localhost:3000/api/Productos',this.nuevoProducto)
                .then(function (res) {
                    vueProduct.nuevoProducto.nombreProducto="";
                    vueProduct.nuevoProducto.precio=0;
                    vueProduct.cargarDatos();
                    vueProduct.mostrarAlerta("Producto Agregado","Se agregó el nuevo producto");
                })
                .catch(function (error) {
                    // handle error
                    vueProduct.mostrarAlerta("Error",error);

                    console.log(error);
                });
        },
        modificarProducto:function(){
            axios.put('http://localhost:3000/api/Productos',this.productos[this.productoSelected])
                .then(function (res) {
                    console.log("UPDATED PRODUCTO");
                    vueProduct.mostrarAlerta("Producto Modificado","Se modifico el producto satisfactoriamente");

                })
                .catch(function (error) {
                    // handle error
                    vueProduct.mostrarAlerta("Error",error);

                    console.log(error);
                });
        },
        eliminarProducto:function(){
            console.log();
            axios.delete('http://localhost:3000/api/Productos/'+ this.productos[this.productoSelected].idProducto)
                .then(function (res) {
                    console.log("DELETE PRODUCTO");  
                    vueProduct.cargarDatos();
                    vueProduct.mostrarAlerta("Producto Eliminado","El producto se eliminó de la base de datos");

                })
                .catch(function (error) {
                    // handle error
                    vueProduct.mostrarAlerta("Error:",error);

                    console.log(error);
                });
        },
    
    },
    
    mounted:function(){
        this.cargarDatos();
    },
    
});