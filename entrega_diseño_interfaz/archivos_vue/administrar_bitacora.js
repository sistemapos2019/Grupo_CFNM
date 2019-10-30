var vueBitacoras = new Vue({
    el: "#AdminBitacoras",
    data: {
        alerta: {
            titulo: "Error",
            mensaje: "Texto"
        },
        fecha1: null,
        fecha2: null,
        orderByCampo: "",
        orderByAsc: 1,
        textoBusqueda: "",
        bitacoraSelected: 0,
        bitacoras: [],
        bitacorasxfecha: [],
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
            if (campo == "IDUSUARIO") {
                this.bitacoras.sort(function(a, b) {


                    return vueBitacoras.orderByAsc *
                        (a.idUsuario - b.idUsuario);
                });

            }
            if (campo = 'SUCESO') {
                this.bitacoras.sort(function(a, b) {
                    if (a.suceso > b.suceso)
                        return vueBitacoras.orderByAsc * 1;
                    else
                        return vueBitacoras.orderByAsc * -1;
                });

            }
        },
        cargarDatos: function(event) {
            //cargando las categorias
            if (this.fecha1 == null && this.fecha2 == null) {
                axios.get('http://localhost:3000/api/bitacoras')
                    .then(function(res) {
                        vueBitacoras.bitacoras = res.data;
                    })
                    .catch(function(error) {
                        // handle error
                        console.log(error);
                    });
            } else if (this.fecha1 != null && this.fecha2 != null) {
                //cargando las bitacoras entre dos fechas

                event.preventDefault();
                axios.get('http://localhost:3000/api/bitacoras?filter=%7B%22where%22%3A%20%7B%22fecha%22%3A%20%7B%22between%22%3A%20%5B%22' + this.fecha1 + '%22%2C%22' + this.fecha2 + '%22%5D%7D%7D%7D')
                    .then(function(res) {
                        vueBitacoras.bitacoras = res.data;
                    })
                    .catch(function(error) {
                        // handle error
                        console.log(error);
                    });
            }

        },
        mostrarEliminar: function() {
            $('#modalEliminar').modal('show');
        },
        eliminarBitacora: function() {
            console.log();
            axios.delete('http://localhost:3000/api/bitacoras/' + this.bitacoras[this.bitacoraSelected].id)
                .then(function(res) {
                    console.log("DELETE BITACORA");
                    vueBitacoras.cargarDatos();
                    vueBitacoras.mostrarAlerta("Bitacora Eliminada", "La Bitacora se eliminó de la base de datos con exito");

                })
                .catch(function(error) {
                    // handle error
                    vueBitacoras.mostrarAlerta("Error:", error);

                    console.log(error);
                });
        },

    },

    mounted: function() {
        this.cargarDatos();
    },

});