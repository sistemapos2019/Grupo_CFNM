var vuecompras = new Vue({
    el: "#AdminCompras",
    data: {
        alerta: {
            titulo: "Error",
            mensaje: "Texto"
        },
        orderByCampo: "",
        orderByAsc: 1,
        textoBusqueda: "",
        compraSelected: 0,
        compras: [],
        nuevaCompra: {
            "fecha": "",
            "Ndocumento": "",
            "NRC": "",
            "NITDUI": "",
            "nombreProveedor": "",
            "montoInterno": 0,
            "iva": 0,
            "percepcion": 0,
            "total": 0
        },
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
        buscar: function(x) {

            if (this.textoBusqueda == "")
                return true;

            var cad = this.compras[x].nombreProveedor +
                this.compras[x].id;
            cad = cad.toUpperCase();

            if (cad.indexOf(this.textoBusqueda.toUpperCase()) >= 0)
                return true;
            else
                return false;



        },
        orderBy: function(campo) {
            if (this.orderByCampo == campo)
                this.orderByAsc *= -1;
            this.orderByCampo = campo;

            if (campo == "ID") {
                this.compras.sort(function(a, b) {


                    return vuecompras.orderByAsc *
                        (a.id - b.id);
                });

            }
            // if (campo = 'NOMBRE') {
            //     this.categorias.sort(function(a, b) {
            //         if (a.nombre > b.nombre)
            //             return vuecatego.orderByAsc * 1;
            //         else
            //             return vuecatego.orderByAsc * -1;
            //     });

            // }
        },
        cargarDatos: function() {
            //cargando las categorias
            axios.get('http://localhost:3000/api/compras')
                .then(function(res) {
                    vuecompras.compras = res.data;
                })
                .catch(function(error) {
                    // handle error
                    console.log(error);
                });

        },
        mostrarAgregar: function() {
            $('#modalAgregar').modal('show');
        },
        mostrarModificar: function() {
            $('#modalModificar').modal('show');
        },
        mostrarEliminar: function() {
            $('#modalEliminar').modal('show');
        },
        agregarCompra: function() {
            axios.post('http://localhost:3000/api/compras', this.nuevaCompra)
                .then(function(res) {
                    vuecompras.nuevaCompra.fecha = "";
                    vuecompras.nuevaCompra.Ndocumento = "";
                    vuecompras.nuevaCompra.NRC = "";
                    vuecompras.nuevaCompra.NITDUI = "";
                    vuecompras.nuevaCompra.nombreProveedor = "";
                    vuecompras.nuevaCompra.montoInterno = 0;
                    vuecompras.nuevaCompra.iva = 0;
                    vuecompras.nuevaCompra.percepcion = 0;
                    vuecompras.nuevaCompra.total = 0;
                    vuecompras.cargarDatos();
                    vuecompras.mostrarAlerta("Compra Agregada", "Se agregó una nueva compra");
                })
                .catch(function(error) {
                    // handle error
                    vuecompras.mostrarAlerta("Error", error);

                    console.log(error);
                });
        },
        modificarCompra: function() {
            axios.put('http://localhost:3000/api/compras', this.compras[this.compraSelected])
                .then(function(res) {
                    console.log("UPDATED Compra");
                    vuecompras.mostrarAlerta("Compra Modificada", "Se modifico la compra satisfactoriamente");

                })
                .catch(function(error) {
                    // handle error
                    vuecompras.mostrarAlerta("Error", error);

                    console.log(error);
                });
        },
        eliminarCompra: function() {
            console.log();
            axios.delete('http://localhost:3000/api/compras/' + this.compras[this.compraSelected].id)
                .then(function(res) {
                    console.log("DELETE COMPRA");
                    vuecompras.cargarDatos();
                    vuecompras.mostrarAlerta("compra Eliminada", "La compra se eliminó de la base de datos con exito");

                })
                .catch(function(error) {
                    // handle error
                    vuecompras.mostrarAlerta("Error:", error);

                    console.log(error);
                });
        },

    },

    mounted: function() {
        this.cargarDatos();
    },

});