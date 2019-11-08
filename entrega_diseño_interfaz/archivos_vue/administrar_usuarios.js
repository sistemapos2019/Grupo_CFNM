

var vueusu = new Vue({



    el: "#AdminUsuarios",
    data: {
        alerta: {
            titulo: "Error",
            mensaje: "Texto"
        },
        orderByCampo: "",
        orderByAsc: 1,
        textoBusqueda: "",
        usuarioSelected: 0,
        usuarios: [],
        nuevoUsuario: {
            "id": 0,
            "nombrecompleto": "",
            "login": "",
            "clave": "",
            "pin": 0,
            "rol": "",


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

            var cad = this.usuarios[x].nombrecompleto +
                this.usuarios[x].id;
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
                this.usuarios.sort(function(a, b) {


                    return vueusu.orderByAsc *
                        (a.id - b.id);
                });

            }
            if (campo == 'NOMBRE') {
                this.usuarios.sort(function(a, b) {
                    if (a.nombrecompleto > b.nombrecompleto)
                        return vueusu.orderByAsc * 1;
                    else
                        return vueusu.orderByAsc * -1;
                });

            }
        },
        cargarDatos: function() {
            //cargando las categorias
            axios.get('http://localhost:3000/api/Usuarios')
                .then(function(res) {
                    vueusu.usuarios = res.data;
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
        agregarCategoria: function() {
            axios.post('http://localhost:3000/api/Usuarios', this.nuevoUsuario)
                .then(function(res) {
                    vueusu.nuevoUsuario.nombre = "";
                    vueusu.nuevoUsuario.clave = "";
                    vueusu.nuevoUsuario.pin = "";
                    vueusu.nuevoUsuario.login = "";
                    vueusu.nuevoUsuario.rol = "";
                    vueusu.cargarDatos();
                    vueusu.mostrarAlerta("Usuario Agregado", "Se agregó el nuevo usuario");
                })
                .catch(function(error) {
                    // handle error
                    vueusu.mostrarAlerta("Error", error);

                    console.log(error);
                });
        },
        modificarCategoria: function() {
            axios.put('http://localhost:3000/api/Usuarios', this.usuarios[this.usuarioSelected])
                .then(function(res) {
                    console.log("UPDATED Usuario");
                    vueusu.mostrarAlerta("usuario Modificado", "Se modifico el usuario satisfactoriamente");

                })
                .catch(function(error) {
                    // handle error
                    vueusu.mostrarAlerta("Error", error);

                    console.log(error);
                });
        },
        eliminarCategoria: function() {
            console.log();
            axios.delete('http://localhost:3000/api/Usuarios/' + this.usuarios[this.usuarioSelected].id)
                .then(function(res) {
                    console.log("DELETE USUARIO");
                    vueusu.cargarDatos();
                    vueusu.mostrarAlerta("usuario Eliminada", "el usuario se eliminó de la base de datos con exito");

                })
                .catch(function(error) {
                    // handle error
                    vueusu.mostrarAlerta("Error:", error);

                    console.log(error);
                });
        },

    },

    mounted: function() {
        this.cargarDatos();
    },

});



