document.addEventListener('DOMContentLoaded', function() {
    new Vue({
        el: '#app',

        data: {
            categorias: [],
            // Input nombre categoria
            nombre: null,
            // Input id categoria
            id: null,
            ultimo_id: null,
            idcategoria: [],
            // Ver o no ver el formulario de actualizar
            formActualizar: false,
            // Input id dentro del formulario de actualizar
            idactualizar: -1,
            // Input nombre dentro del formulario de actualizar
            nombreactualizar: null,
            categoriaseleccionada: 0,
        },

        mounted() {
            this.cargarCategorias();


        },

        methods: {
            cargarCategorias: function() {
                axios
                    .get('http://localhost:3000/api/Categoria')
                    .then((respuesta) => {
                        this.categorias = respuesta.data;
                    })


            },

            crearCategoria() {
                if (this.nombre == null) {
                    alert("Fallo agregar categoria faltan datos");
                } else {
                    axios({
                        method: 'post',
                        url: 'http://localhost:3000/api/Categoria',
                        data: {
                            id: this.traerultimacategoria(),
                            nombre: this.nombre
                        }
                    });
                    //this.id = null;
                    this.nombre = null;
                    alert("Categoria agregada con exito");

                }

            },

            verFormActualizar: function(categoria_id) {
                // Antes de mostrar el formulario de actualizar, rellenamos sus campos
                this.idactualizar = categoria_id;
                this.nombreactualizar = this.categorias[categoria_id].nombre;
                // Mostramos el formulario
                this.formActualizar = true;
            },

            guardarActualizacion: function(categoria_id) {
                if (this.nombreactualizar == "") {
                    alert("NO guardado faltan campos requeridos");
                } else {
                    // Ocultamos nuestro formulario de actualizar
                    this.formActualizar = false;
                    // Actualizamos los datos en la base de datos
                    axios({
                        method: 'put',
                        url: ('http://localhost:3000/api/Categoria/' + categoria_id),
                        data: {
                            id: categoria_id,
                            nombre: this.nombreactualizar
                        }
                    });


                    //actualizando los datos en la pagina

                    alert("guardado con exito");

                }

            },
            traerultimacategoria() {
                //falta ver como traer el id actual en la base de datos 
                // axios({
                //   method: 'post',
                //url: 'http://localhost:3000/api/Categoria',
                // data: {
                //   id: this.traerultimacategoria(),
                // nombre: this.nombre
                //}
                //});
                return 6;

            },

            borrarCategoria: function() {
                // Borramos de la lista
                // var categoria_id = this.categoriaseleccionada;

                axios({
                    method: 'delete',
                    url: ('http://localhost:3000/api/Categoria/' + this.categoriaseleccionada)
                });
                alert("Se borro con exito la categoria");
            }

        },

    })
});