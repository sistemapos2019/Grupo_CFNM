var vuemesa = new Vue({
    el: "#AdminMesas",
    data: {
        alerta: {
            titulo: "Error",
            mensaje: "Texto"
        },
        orderByCampo: "",
        orderByAsc: 1,
        textoBusqueda: "",
        mesaSelected: 0,
        mesas: [],
        nuevaMesa: {
            "id": 0,
            "mesa": "",
        },
    },
    methods: {
        fechahoy: function() {
            var f = new Date();
            (f.getDate() + "-" + (f.getMonth() + 1) + "-" + f.getFullYear());
            return f;

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
        buscar: function(x) {

            if (this.textoBusqueda == "")
                return true;

            var cad = this.mesas[x].mesa +
                this.mesas[x].id;
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
                this.mesas.sort(function(a, b) {


                    return vuemesa.orderByAsc *
                        (a.id - b.id);
                });

            }
            if (campo = 'MESA') {
                this.categorias.sort(function(a, b) {
                    if (a.mesa > b.mesa)
                        return vuemesa.orderByAsc * 1;
                    else
                        return vuemesa.orderByAsc * -1;
                });

            }
        },
        cargarDatos: function() {
            //cargando las categorias
            axios.get('http://localhost:3000/api/Mesas')
                .then(function(res) {
                    vuemesa.mesas = res.data;
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
        agregarMesa: function() {
            axios.post('http://localhost:3000/api/Mesas', this.nuevaMesa)
                .then(function(res) {
                    vuemesa.nuevaMesa.mesa = "";
                    vuemesa.cargarDatos();
                    vuemesa.mostrarAlerta("Mesa Agregada", "Se agregó la nueva Mesa");
                })
            bitacoraguardar = {

                "idUsuario": 1,
                "fecha": this.fechahoy(),
                "suceso": "se agrego una mesa nueva"
            }
            axios.post('http://localhost:3000/api/bitacoras', bitacoraguardar)
                .then(function(res) {


                })
                .catch(function(error) {
                    // handle error
                    vuemesa.mostrarAlerta("Error", error);

                    console.log(error);
                });
        },
        modificarCategoria: function() {
            axios.put('http://localhost:3000/api/Mesas', this.mesas[this.mesaSelected])
                .then(function(res) {
                    console.log("UPDATED mesa");
                    vuemesa.mostrarAlerta("Mesa Modificada", "Se modifico la mesa satisfactoriamente");

                })
            bitacoraguardar = {

                "idUsuario": 1,
                "fecha": this.fechahoy(),
                "suceso": "se modifico una mesa "
            }
            axios.post('http://localhost:3000/api/bitacoras', bitacoraguardar)
                .then(function(res) {


                })
                .catch(function(error) {
                    // handle error
                    vuemesa.mostrarAlerta("Error", error);

                    console.log(error);
                });
        },
        eliminarCategoria: function() {
            console.log();
            axios.delete('http://localhost:3000/api/Mesas/' + this.mesas[this.mesaSelected].id)
                .then(function(res) {
                    console.log("DELETE MESA");
                    vuemesa.cargarDatos();
                    vuemesa.mostrarAlerta("mesa Eliminada", "La mesa se eliminó de la base de datos con exito");

                })
            bitacoraguardar = {

                "idUsuario": 1,
                "fecha": this.fechahoy(),
                "suceso": "se elimino una mesa"
            }
            axios.post('http://localhost:3000/api/bitacoras', bitacoraguardar)
                .then(function(res) {


                })
                .catch(function(error) {
                    // handle error
                    vuemesa.mostrarAlerta("Error:", error);

                    console.log(error);
                });
        },

    },

    mounted: function() {
        this.cargarDatos();
    },

});