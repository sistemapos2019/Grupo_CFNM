var vuecatego = new Vue({
    el: "#AdminCategorias",
    data: {
        alerta: {
            titulo: "Error",
            mensaje: "Texto"
        },
        orderByCampo: "",
        orderByAsc: 1,
        textoBusqueda: "",
        categoriaSelected: 0,
        categorias: [],
        nuevaCategoria: {
            "id": 0,
            "nombre": "",
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

            var cad = this.categorias[x].nombre +
                this.categorias[x].id;
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
                this.categorias.sort(function(a, b) {


                    return vuecatego.orderByAsc *
                        (a.id - b.id);
                });

            }
            if (campo = 'NOMBRE') {
                this.categorias.sort(function(a, b) {
                    if (a.nombre > b.nombre)
                        return vuecatego.orderByAsc * 1;
                    else
                        return vuecatego.orderByAsc * -1;
                });

            }
        },
        cargarDatos: function() {
            //cargando las categorias
            axios.get('http://localhost:3000/api/Categoria')
                .then(function(res) {
                    vuecatego.categorias = res.data;
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
            axios.post('http://localhost:3000/api/Categoria', this.nuevaCategoria)
                .then(function(res) {
                    vuecatego.nuevaCategoria.nombre = "";
                    vuecatego.cargarDatos();
                    vuecatego.mostrarAlerta("Categoria Agregada", "Se agregó la nueva categoria");
                })
                .catch(function(error) {
                    // handle error
                    vuecatego.mostrarAlerta("Error", error);

                    console.log(error);
                });
        },
        modificarCategoria: function() {
            axios.put('http://localhost:3000/api/Categoria', this.categorias[this.categoriaSelected])
                .then(function(res) {
                    console.log("UPDATED Categoria");
                    vuecatego.mostrarAlerta("Categoria Modificada", "Se modifico la categoria satisfactoriamente");

                })
                .catch(function(error) {
                    // handle error
                    vuecatego.mostrarAlerta("Error", error);

                    console.log(error);
                });
        },
        eliminarCategoria: function() {
            console.log();
            axios.delete('http://localhost:3000/api/Categoria/' + this.categorias[this.categoriaSelected].id)
                .then(function(res) {
                    console.log("DELETE CATEGORIA");
                    vuecatego.cargarDatos();
                    vuecatego.mostrarAlerta("categoria Eliminada", "La categoria se eliminó de la base de datos con exito");

                })
                .catch(function(error) {
                    // handle error
                    vuecatego.mostrarAlerta("Error:", error);

                    console.log(error);
                });
        },

    },

    mounted: function() {
        this.cargarDatos();
    },

});