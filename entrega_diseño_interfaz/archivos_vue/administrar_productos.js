var vueprod = new Vue({
    el: "#AdminProductos",
    data: {
        alerta: {
            titulo: "Error",
            mensaje: "Texto"
        },
        orderByCampo: "",
        orderByAsc: 1,
        textoBusqueda: "",
        productoSelected: 0,
        categoriaSelected: 1,
        productos: [],
        categorias: [],
        nuevoProducto: {
            "id": 0,
            "nombre": "",
            "inventario": 0,
            "precio": 0,
            "preparado": 0,
            "idcategoria": 0,


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

            var cad = this.productos[x].nombre +
                this.productos[x].id;
            cad = cad.toUpperCase();

            if (cad.indexOf(this.textoBusqueda.toUpperCase()) >= 0)
                return true;
            else
                return false;



        },
        nombreCategoria: function(idCat) {
            return this.categorias.find(function(cat) {
                return cat.id == idCat
            }).nombre;
        },
        orderBy: function(campo) {
            if (this.orderByCampo == campo)
                this.orderByAsc *= -1;
            this.orderByCampo = campo;

            if (campo == "ID") {
                this.productos.sort(function(a, b) {


                    return vueprod.orderByAsc *
                        (a.id - b.id);
                });

            }
            if (campo == 'NOMBRE') {
                this.productos.sort(function(a, b) {
                    if (a.nombre > b.nombre)
                        return vueprod.orderByAsc * 1;
                    else
                        return vueprod.orderByAsc * -1;
                });

            }
        },
        cargarDatos: function() {
            //cargando las categorias
            axios.get('http://localhost:3000/api/Categoria')
                .then(function(res) {
                    vueprod.categorias = res.data;
                })
                .catch(function(error) {
                    // handle error
                    console.log(error);
                });
            //cargando las categorias
            axios.get('http://localhost:3000/api/Productos')
                .then(function(res) {
                    vueprod.productos = res.data;
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
        agregarProducto: function() {
            axios.post('http://localhost:3000/api/Productos', this.nuevoProducto)
                .then(function(res) {
                    vueprod.nuevoProducto.nombre = "";
                    vueprod.nuevoProducto.precio = 0;
                    vueprod.nuevoProducto.inventario = 0;
                    vueprod.nuevoProducto.preparado = 0;
                    vueprod.nuevoProducto.idcategoria = 0;
                    vueprod.cargarDatos();
                    vueprod.mostrarAlerta("Producto Agregado", "Se agregó el nuevo producto");
                })
            bitacoraguardar = {

                "idUsuario": 1,
                "fecha": this.fechahoy(),
                "suceso": "se agrego un producto nuevo"
            }
            axios.post('http://localhost:3000/api/bitacoras', bitacoraguardar)
                .then(function(res) {


                })
                .catch(function(error) {
                    // handle error
                    vueprod.mostrarAlerta("Error", error);

                    console.log(error);
                });
        },
        modificarProducto: function() {
            axios.put('http://localhost:3000/api/Productos', this.productos[this.productoSelected])
                .then(function(res) {
                    console.log("UPDATED Producto");
                    vueprod.mostrarAlerta("Producto Modificado", "Se modifico el producto satisfactoriamente");

                })
            bitacoraguardar = {

                "idUsuario": 1,
                "fecha": this.fechahoy(),
                "suceso": "se modifico un producto"
            }
            axios.post('http://localhost:3000/api/bitacoras', bitacoraguardar)
                .then(function(res) {


                })
                .catch(function(error) {
                    // handle error
                    vueprod.mostrarAlerta("Error", error);

                    console.log(error);
                });
        },
        eliminarProducto: function() {
            console.log();
            axios.delete('http://localhost:3000/api/Productos/' + this.productos[this.productoSelected].id)
                .then(function(res) {
                    console.log("DELETE Producto");
                    vueprod.cargarDatos();
                    vueprod.mostrarAlerta("Producto Eliminado", "el producto se eliminó de la base de datos con exito");

                })
            bitacoraguardar = {

                "idUsuario": 1,
                "fecha": this.fechahoy(),
                "suceso": "se elimino un producto nuevo"
            }
            axios.post('http://localhost:3000/api/bitacoras', bitacoraguardar)
                .then(function(res) {


                })
                .catch(function(error) {
                    // handle error
                    vueprod.mostrarAlerta("Error:", error);

                    console.log(error);
                });
        },

    },

    mounted: function() {
        this.cargarDatos();
    },

});