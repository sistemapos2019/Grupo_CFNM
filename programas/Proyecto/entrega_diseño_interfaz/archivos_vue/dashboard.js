var vueApp = new Vue({

    el: "#vueApp",
    data: {
        alerta: {
            titulo: "Error",
            mensaje: "Texto"

        },
        contador: 1,
        cantidadtabla: 1,
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
        // productosporcategoria:[],
        // productocat:{
        //     value:"nombre",text:'seleccione',
        //     "id": 0,
        //     "nombre": "",
        //     "precio": 0,

        //     "idcategoria": 0
        //una lista que contenga objetos de nueva orden con on click recorrerla con el v-for 
        // para el spam a puro javascript documentqueryselector(#id tbody).rows(selectedindex)cells es columnas que necesitamos},
        //solo se manda el id del producot el precio y cantidad para la tabla  v-onclick
        Ordenes: [],
        nuevasordenes: {
            "idOrden": 0,
            "idProducto": 0,
            "cantidad": 0,
            "precioUnitario": ""

        },

        detalleorden: {
            "id": "",
            "idmesa": 0,
            "idusuario": 0,
            "fecha": "",
            "llevar": 0,
            "estado": 1,
            "observacion": "",
            "tiempopreparado": "",
            "tiemporapido": "",
            "total": 0,
            "propina": 0,
            "formapago": "E",
            "cliente": ""
        }



        // nuevoProducto:{
        // "idProducto": 0,
        // "idCategoria": 1,
        // "nombreProducto": "",
        // "precio": 0,
        //  "esPreparado": 0
    },



    methods: {
        fechahoy: function() {
            var f = new Date();
            (f.getDate() + "-" + (f.getMonth() + 1) + "-" + f.getFullYear());
            this.detalleorden.fecha = f;
            this.detalleorden.tiempopreparado = f;
            this.detalleorden.tiemporapido = f;


        },
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


        sumarcontador: function(idcomparar) {
            if (this.productos[this.productoSelected].id == idcomparar ) {

                return (this.contador += 1);
            } else {
                return (this.contador = this.contador);
            }

        },
        restarcontador: function() {
            if (this.contador > 1) {
                return (this.contador -= 1);

            } else { alert("no debe ser menor a 1") }


        },
        cantidadprod: function() {
            if (this.contador > 1) {
                return (this.precioporcantidad * elProd.precio);

            }



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

            // axios.get('http://localhost:3000/api/Ordens')
            //     .then(function (response) {
            //         console.log(response.data);
            //           console.log (response)
            //         vueApp.Orden=response.data;


            //       })
            // .catch(function (error){
            // vueApp.mostrarAlerta("Error en API",error);
            // })


            //para cobrar orden
            axios.get('http://localhost:3000/api/Ordens')
                .then(function(response) {
                    console.log(response.data);
                    console.log(response)
                    vueApp.Ordenes = response.data;


                })
                .catch(function(error) {
                    vueApp.mostrarAlerta("Error en API", error);
                })






        },


        cobrarorden: function() {
            $('#modalcobrarorden').modal('show');
        },


        mostrarModificar: function() {
            $('#nueva').modal('show');

        },

        agregar: function() {
            $('#agregarproducto').modal('show');

        },

        nuevaorden1: function() {
            $('#modaliniciarorden').modal('show');

        },



        //Agrega el nuevo producto enviandolo a la API
        detalleorden: function() {
            axios.post('http://localhost:3000/api/Ordens', this.nuevaorden)
                .then(function(response) {
                    parallevar = document.querySelector("#llevar");
                    vueApp.llevar = parallevar.value;
                    console.log(vueApp.llevar);
                    for (var i = o; i < document.getElementById("tablaproductos").rows.length; i++) {

                    }

                    vueApp.nuevaorden = {
                        "id": 0,
                        "idmesa": 0,
                        "idusuario": 0,
                        "llevar": 0,
                        "observacion": "",
                        "total": 0,
                        "cliente": ""
                    }
                })
                .catch(function(error) {
                    vueApp.mostrarAlerta('Error', error);
                });




        },




        //detalle orden
        agregarnuevaorden: function() {

            axios.post('http://localhost:3000/api/Ordens', this.detalleorden)
                .then(function(response) {
                    parallevar = document.querySelector("#llevar");
                    vueApp.llevar = parallevar.value;
                    console.log(vueApp.llevar);
                    this.mostrarAlerta("Orden Agregada", "Se agregó la orden con exito ");
                    this.cargarDatos();
                    vueApp.detalleorden = {
                        "id": "",
                        "idmesa": 0,
                        "idusuario": 0,
                        //"fecha": "",
                        "llevar": 0,
                        "estado": 1,
                        "observacion": "",
                        //"tiempopreparado": "",
                        //"tiemporapido": "",
                        "total": 0,
                        "propina": 0,
                        "formapago": "",
                        "cliente": ""

                    }
                })

            .catch(function(error) {
                vueApp.mostrarAlerta('Error', error);
            });
            for (var i = 0; i < this.productosxdetalle.length; i++) {
                detalle = {
                    "idorden": (this.dashboardprincipal[this.dashboardprincipal.length - 1].IdOrden) + 1,
                    "idproducto": this.productosxdetalle[i].id,
                    "cantidad": this.cantidadxtabla[i].cantidad,
                    "preciounitario": this.productosxdetalle[i].precio
                }
                axios.post('http://localhost:3000/api/Detalleordens', detalle)
                    .then(function(res) {
                        detalle = {
                            "idorden": "",
                            "idproducto": "",
                            "cantidad": "",
                            "preciounitario": ""
                        }
                    })
                    .catch(function(error) {
                        // handle error
                        vuecatego.mostrarAlerta("Error", error);

                        console.log(error);
                    });

            }

            this.productosxdetalle = [];
            this.cantidadxtabla = [];


        },

        capturardatos: function(idprod) {
            //idprod=this.productoSelected;
            this.productosdetalle.idproducto = this.productos[idprod].id;
            this.productosdetalle.nombreproducto = this.productos[idprod].nombre;


            this.productosxdetalle.unshift(this.productos[idprod]);
            this.cantidadxtabla.unshift({ cantidad: this.cantidadtabla });
            this.cantidadtabla = 1;



        },







        nombreCategoria: function(idCat) {
            return this.categorias.find(function(cat) {
                return cat.idCategoria == idCat
            }).nombreCategoria;
        },


        // usarcategoria:function(){
        //     axios.get('http://localhost:3000/api/dashboardprincipal',this.orden)
        //         .then(function (response) {
        //             norden=document.querySelector("#esorden");
        //             vueApp.norden= norden.value;
        //             console.log(vueApp.norden);
        //           vueApp.Orden={
        //             "IdOrden": 0,
        //             "Mesa": 0,
        //             "Mesero": "",
        //             "Cliente": "",

        //           }

        //         })
        //         .catch(function (error) {
        //             // handle error
        //             vueProduct.mostrarAlerta("Error",error);

        //             console.log(error);
        //         });
        // },





    },


    mounted: function() {
        this.cargarDatos();
        this.fechahoy();
        this.capturardatos();


    },
});