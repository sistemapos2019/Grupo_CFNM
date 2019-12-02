var vueVentaMensual = new Vue({
    el: "#ventasMensuales",
    data: {
        alerta: {
            titulo: "Error",
            mensaje: "Texto"
        },
        fecha1: null,
        fecha2:null,
        orderByCampo: "",
        orderByAsc: 1,
        idorden: "",
        textoBusqueda: "",
        ventaSelected: 0,
        productos: [],
        detallexorden: [],
        ordenes: [],

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

        orderBy: function(campo) {
            if (this.orderByCampo == campo)
                this.orderByAsc *= -1;
            this.orderByCampo = campo;

            if (campo == "ID") {
                this.bitacoras.sort(function(a, b) {


                    return vueBitacoras.orderByAsc *
                        (a.id - b.id);
                });

            }
        },
        Productos: function() {
            //obteniendo todos los productos para luego atravez de su id obtener el nombre de cada producto.
            axios.get('http://localhost:3000/api/Productos')
                .then(function(res) {
                    vueVentaMensual.productos = res.data;
                })
                .catch(function(error) {
                    // handle error
                    console.log(error);
                });
        },
        cargarDatos: function() {
            //cargando las categorias
            if (this.fecha1 == null && this.fecha2== null) {

                alert("Para ver la estadistica Mensual seleccione  ambas fechas")
            } else {
                //cargando ordenes dependoendo la fecha que se selecciono


                // axios.get('http://localhost:3000/api/Ordens?filter=%7B%22where%22%3A%7B%22fecha%22%3A%22' + this.fecha1 + '%22%7D%7D')
                    
                axios.get('http://localhost:3000/api/Ordens?filter=%7B%22where%22%3A%20%7B%22fecha%22%3A%20%7B%22between%22%3A%20%5B%22' +this.fecha1+'%22%2C%22' +this.fecha2+'%22%5D%7D%7D%7D')

                .then(function(res) {
                        vueVentaMensual.ordenes = res.data;
                    })
                    .catch(function(error) {
                        // handle error
                        console.log(error);
                    });


            }

        },

        detalleorden: function() {
            if (this.fecha1 == null || this.fecha2==null) {

                alert("Para ver la estadistica Mensual seleccione el rango de fechas")
            } else {
                console.log(this.ordenes[0].id);
                axios.get('http://localhost:3000/api/Detalleordens?filter=%7B%22where%22%3A%20%7B%22idorden%22%3A%20%7B%22between%22%3A%20%5B%22' + this.ordenes[0].id + '%22%2C%22' + this.ordenes[this.ordenes.length - 1].id + '%22%5D%7D%7D%7D')

                .then(function(res) {
                        vueVentaMensual.detallexorden = res.data;
                        // if (this.detallexorden[0].idProducto==this.detallexorden[this.detallexorden.length-1].idProducto) {
                        //     vueVentaMensual.detallexorden.cantidad=+vueVentaMensual.detallexorden.cantidad
                        // }
                    })
                    .catch(function(error) {
                        // handle error
                        console.log(error);
                    });
            }

        },
        nombre: function(idprod) {
            return this.productos.find(function(prod) {
                return prod.id == idprod
            }).nombre;
        },




    },

    mounted: function() {
        this.Productos();
        // this.cargarDatos();
    },

});