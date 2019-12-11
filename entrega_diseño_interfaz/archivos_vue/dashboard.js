var vueApp = new Vue({

    el: "#vueApp",
    data: {
        alerta: {
            titulo: "Error",
            mensaje: "Texto"

        },

        alertaCambio: {
            mensaje:"Texto",
        },
        contador: 1,
        cantidadtabla: 1,
        ordenSelected:0,
        cantidadxtabla: [],
        detalleordenproductos: [],
        precioporcantidad: 1,
        categoriaSelected: 1,
        productoSelected: 0,
        dashboardprincipal: [],
        mesas: [],
        nuevaorden: {
            "id": 0,
            "idmesa": 0,
            "idusuario": 0,
            "llevar": 0,
            "observacion": "",
            "total": 0,
            "cliente": ""

        },
        categorias: [],
        nuevacategoria: {
            "id": 0,
            "nombre": "",
        },

        productos: [],

        Orden: [],
        productosxdetalle: [],
        productosdetalle: {
            idproducto: "",
            nombreproducto: "",
            precio: "",
            cantidad: "",
        },
        ordendetalle: {
            "IdOrden": 0,
            "Mesa": 0,
            "Mesero": "",
            "Cliente": "",
            "llevar": 0,


        },
       
        
        nuevasordenes: {
            "idOrden": 0,
            "idProducto": 0,
            "cantidad": 0,
            "precioUnitario": ""

        },

      

        //LO QUE AGREGO KAREN
        cambio: 0,
        efectivo: 0,
         ordenes: [],
         detalles: [],
         nuevoDetalle: [],
         seleccionado: 0,
         detalle: {
             "idorden": 0,
             "idproducto": 0,
             "cantidad": 0,
             "preciounitario": 0
         },
 
         orden: {
            "id": "",
            "idmesa": 0,
            "idusuario": 0,
            "fecha": "",
            "llevar": 0,
            "estado": 1,
            "observacion": "",
            // "tiempopreparado": "",
            // "tiemporapido": "",
            "total": 0,
            "propina": 0,
            "formapago": "E",
            "cliente": ""
         },
 
         total: 0,
         cantidades: []      
         //ACA TERMINA LO QUE AGREGO KAREN  
    },



    methods: {
       
        mostrarAlerta: function(titu, msg) {
            this.alerta.titulo = titu;
            this.alerta.mensaje = msg;

            $("#miAlerta").show('fade');
            setTimeout(function() {
                $("#miAlerta").hide('fade');
            }, 5000);

        },
        cerrarAlerta: function() {
            $('#miAlerta').hide('fade');
        },


       
       
       

        //consume la API con axios
        cargarDatos: function() {

            axios.get('http://localhost:3000/api/dashboardprincipals')
                .then(function(response) {
                    console.log(response.data);
                    console.log(response)
                    vueApp.dashboardprincipal = response.data;

                })
                .catch(function(error) {
                    vueApp.mostrarAlerta("Error en API", error);
                });

            axios.get('http://localhost:3000/api/Mesas')
                .then(function(response) {
                    console.log(response.data);

                    vueApp.mesas = response.data;
                })
                .catch(function(error) {
                    vueApp.mostrarAlerta("Error en API", error);
                });
            //Carga categorias
            axios.get('http://localhost:3000/api/Categoria')
                .then(function(response) {
                    console.log(response.data);
                    console.log(response)
                    vueApp.categorias = response.data;


                })
                .catch(function(error) {
                    vueApp.mostrarAlerta("Error en API", error);
                })

            axios.get('http://localhost:3000/api/Productos')
                .then(function(response) {
                    console.log(response.data);
                    console.log(response)
                    vueApp.productos = response.data;


                })
                .catch(function(error) {
                    vueApp.mostrarAlerta("Error en API", error);
                })

            //para cobrar orden
            axios.get('http://localhost:3000/api/Ordens')
                .then(function(response) {
                    console.log(response.data);
                    console.log(response)
                    vueApp.ordenes = response.data;


                })
                .catch(function(error) {
                    vueApp.mostrarAlerta("Error en API", error);
                })






        },
        nombreCategoria: function(idCat) {
            return this.categorias.find(function(cat) {
                return cat.idCategoria == idCat
            }).nombreCategoria;
        },

//METODOS KAREN PARA CREGAR, COBRAR Y AGREGAR PRODUCTOS A LA ORDEN

        aumentar: function(index, id){
            
            let existe = false;
            console.log("el ID "+id)
            if(vueApp.nuevoDetalle.length > 0){
               
                console.log("probando");
                //detalle con productos 
                //verica que el produto exista en el detalle
                for (let i = 0; i < vueApp.nuevoDetalle.length; i++) {
                    
                    if(vueApp.productos[index].id == vueApp.nuevoDetalle[i].idproducto){
                        //si el producto existe en el detalle se aumnenta la cantidad
                        Vue.set(vueApp.cantidades, index, vueApp.cantidades[index] += 1);
                        vueApp.nuevoDetalle[i].cantidad = vueApp.cantidades[index];
                        vueApp.orden.total += vueApp.productos[index].precio;
                        existe = true;
                        break;
                    }
                }
                if(existe == false){
                    
                    //si el producto no existe se agrega al detalle
                    Vue.set(vueApp.cantidades, index, 1);
                    vueApp.nuevoDetalle.push({"idorden": id,"idproducto": vueApp.productos[index].id,"cantidad": 1, "preciounitario": vueApp.productos[index].precio });
                    vueApp.orden.total += vueApp.productos[index].precio;
                }
            }else{
                //detalle vacio, se agrega el producto al detalle
                Vue.set(vueApp.cantidades, index, 1);
                vueApp.nuevoDetalle.push({"idorden": id,"idproducto": vueApp.productos[index].id,"cantidad": 1, "preciounitario": vueApp.productos[index].precio });
                vueApp.orden.total += vueApp.productos[index].precio;
            }
        },
        disminuir: function(index){
            if(vueApp.nuevoDetalle.length > 0){
                for (let i = 0; i < vueApp.nuevoDetalle.length; i++) {
                    //se busca el producto en el detalle
                    if(vueApp.nuevoDetalle[i].idproducto == vueApp.productos[index].id){
                        //se verifica que la cantidad sea mayor a cero 
                        if(vueApp.nuevoDetalle[i].cantidad > 0){
                            Vue.set(vueApp.cantidades, index, vueApp.cantidades[index] -= 1);
                            vueApp.nuevoDetalle[i].cantidad = vueApp.cantidades[index];
                            if(vueApp.cantidades[index] == 0){
                                vueApp.nuevoDetalle.splice(i, 1);
                            }
                            vueApp.orden.total -= vueApp.productos[index].precio
                            break;
                        }
                    }
                }
            }
        
        },
        obtenerIdOrden: function(){
            x = vueApp.ordenes.length;
            if(x>0){
                return vueApp.ordenes[x-1].id + 1;
            }else{
                return 1;
            }
        },
        putDetalleOrden: async function(detalle){
            try {
                let response = await axios.put('http://localhost:3000/api/DetalleOrdens', detalle);
                let data = await response.data;
                return data;
        
            } catch (error) {
                console.log("error ", error);
            }
        },
        enviarOrden: async function(estado){
            this.orden.estado = estado;
        
            if(vueApp.nuevoDetalle.length > 0){
                parallevar = document.querySelector("#llevar");
                    vueApp.orden.llevar = parallevar.value;
                await axios.post('http://localhost:3000/api/Ordens',this.orden)
                .then( async function (res) {
                    console.log("Orden agregada");
                    $("#nuevaOrden").modal("hide");
                    for (let i = 0; i < vueApp.nuevoDetalle.length; i++) {
                        await vueApp.putDetalleOrden(vueApp.nuevoDetalle[i]);
                        console.log(i+1);
                    }
                    vueApp.cargarDatos();
                    console.log("Productos agregados");
                    $("#nuevaOrden").modal("hide");
                    vueApp.mostrarAlerta("Nueva orden: ","Se ha creado la orden "+vueApp.orden.id, 0);
                })
                .catch(function (error) {
                    // handle error
                    vueApp.mostrarAlerta("Error en ",error, 1);
        
                    console.log(error);
                });
            }
        },


        mostrarNuevaOrden: function(){
            this.cargarModalNuevaOrden();
            $("#nuevaOrden").modal("show");
        },


        cargarModalNuevaOrden: function(){
            let fecha = Date.now()
            this.orden.id = this.obtenerIdOrden();
            this.orden.fecha = fecha;
            this.orden.idusuario = 0;
            this.orden.idmesa = 0;
            this.orden.cliente = "";
            this.orden.estado = "AA"
            this.orden.total = 0;
            this.orden.observacion = "";
            this.orden.llevar=0;
            // this.orden.tiempopreparado="";
            // this.orden.tiemporapido="";
            this.orden.propina=0;
            this.orden.formapago="E";
            for (let i = 0; i < this.productos.length; i++) {
                Vue.set(this.cantidades, i, 0);
            }
            this.nuevoDetalle = [];
            this.seleccionado = 0;
        },

        seleccionarFila: function(index){
            if(this.seleccionado == 0){
                this.seleccionado = 1;
            }else if(this.seleccionado == 1 && this.ordenSelected == index){
                this.seleccionado = 0;
            }
            this.ordenSelected = index;
        },



        //Metodo para devolver el nombre del producto,de acuerdo al idProducto de la tabla detalle Orden


 nombreProducto: function(idprod) {
    return this.productos.find(function(prod) {
        return prod.id == idprod
    }).nombre;
},
  
mostrarAgregarProductos: function(){
    this.nuevoDetalle = [];
   
        for (let i = 0; i < this.productos.length; i++) {
            Vue.set(this.cantidades, i, 0);
        }
        $("#agregarProducto").modal("show");
    
},


mostrarDetalleAgregarProducto: function(){
    if(this.nuevoDetalle.length > 0){
        vueApp.total = 0;
        for (let i = 0; i < vueApp.nuevoDetalle.length; i++) {
            vueApp.total += (vueApp.nuevoDetalle[i].cantidad * vueApp.nuevoDetalle[i].preciounitario);
        }
        $("#agregarProductoDetalle").modal("show");
    }
},

//Metodo para agregar productos a una orden,ya existente

agregarProductos: function(){
     this.ordenes[this.ordenSelected].total += this.total;
    this.actualizarCantidad();
    console.log(this.nuevoDetalle);

    axios.put('http://localhost:3000/api/Ordens',this.ordenes[this.ordenSelected])
        .then( async function (res) {
            console.log("Orden actualizada");
            for (let i = 0; i < vueApp.nuevoDetalle.length; i++) {
                await vueApp.putDetalleOrden(vueApp.nuevoDetalle[i]);
                console.log(i+1);
            }
            console.log("Productos agregados");
            $("#agregarProductoDetalle").modal("hide");
            $("#agregarProducto").modal("hide");
            vueApp.cargarDatos();

            vueApp.mostrarAlerta("Agregar productos: ","Se han agregado los productos a la orden "+vueApp.ordenes[vueApp.ordenSelected].id, 0 );
            
        })
        .catch(function (error) {
            // handle error
            vueApp.mostrarAlerta("Error en ",error, 1);

            console.log(error);
        });
},

actualizarCantidad: function(){
    for (let i = 0; i < this.detalles.length; i++) {
        if(vueApp.detalles[i].idorden == vueApp.ordenes[vueApp.ordenSelected].id){
            for (let j = 0; j < vueApp.nuevoDetalle.length; j++) {
                if(vueApp.nuevoDetalle[j].idproducto == vueApp.detalles[i].idproducto){
                    vueApp.nuevoDetalle[j].cantidad += vueApp.detalles[i].cantidad;
                }
            }
        }
    }
    for (let i = 0; i < this.nuevoDetalle.length; i++) {
        console.log(vueApp.nuevoDetalle[i].idproducto+" cantidad "+vueApp.nuevoDetalle[i].cantidad);
        
    }
   
},

mostrarCobro: function(){
    console.log("njkhkhk")
   
        
            $('#cobrar').modal("show");
},


mostrarAlertaEfectivo:function(msg){
    this.alerta.mensaje=msg;
   
    $("#alertaEfectivo").show('fade');
    setTimeout(function(){
        $("#alertaEfectivo").hide('fade');
    },2000);
    
},
cerrarAlertaEfectivo:function(){
    $('#alertaEfectivo').hide('fade');
},

cobrar: async function(){
    if(this.efectivo >= this.ordenes[this.ordenSelected].total){
        this.cambio = this.efectivo - this.ordenes[this.ordenSelected].total;
        this.ordenes[this.ordenSelected].estado = "CC";

        axios.put('http://localhost:3000/api/Ordens',this.ordenes[this.ordenSelected])
        .then(function (res) {
            console.log("Update estado de A a C");
            $('#cobrar').modal("hide");
            vueApp.mostrarAlertaCambio('Efectivo: $ '+vueApp.efectivo+ '      Total: $ '+vueApp.ordenes[vueApp.ordenSelected].total.toFixed(2)+ '      Cambio: $ '+vueApp.cambio.toFixed(2));
            
            vueApp.efectivo = 0;
            vueApp.cambio = 0;
            vueApp.ordenSelected = 0;
             vueApp.cargarDatos();
        })
        .catch(function (error) {
            // handle error
            vueApp.mostrarAlerta("Error en ",error, 1);

            console.log(error);
        });
    }else{
        this.mostrarAlertaEfectivo("La cantidad de efectivo es insuficiente");
    }
},

mostrarAlertaCambio: function(msg){
    this.alertaCambio.mensaje = msg;
    $("#alertaCambio").show('fade');
    setTimeout(function(){
        $("#alertaCambio").hide('fade');
    },5000);
},
cerrarAlertaCambio:function(){
    $('#alertaCambio').hide('fade');
},
        //ACA TERMINA LO QUE AGREGO KAREN

    },


    mounted: function() {
        this.cargarDatos();
        


    }
});