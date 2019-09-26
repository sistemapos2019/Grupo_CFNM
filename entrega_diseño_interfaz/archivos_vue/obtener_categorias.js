document.addEventListener('DOMContentLoaded', function() {
    new Vue({
        el: '#app',

        data: {
            categorias: [],
            // Input nombre categoria
            nombre: null,
            // Input id categoria
            id: null,
            idcategoria: 0,
            // Ver o no ver el formulario de actualizar
            formActualizar: false,
            // Input id dentro del formulario de actualizar
            idactualizar: -1,
            // Input nombre dentro del formulario de actualizar
            nombreactualizar: null,
        },

        mounted() {
            this.cargarCategorias();
        },

        methods: {
            cargarCategorias() {
                axios
                    .get('http://localhost:3000/api/Categoria')
                    .then((respuesta) => {
                        this.categorias = respuesta.data;
                    })


            },
            crearCategoria() {

                axios({
                    method: 'post',
                    url: 'http://localhost:3000/api/Categoria',
                    data: {
                        id: this.id,
                        nombre: this.nombre
                    }
                });
                this.id = null;
                this.nombre = null;
            },

            traerultimacategoria() {
                axios
                    .get('http://localhost:3000/api/Categoria/count')
                    .then((respuesta) => {
                        this.idcategoria = respuesta.data;
                    })
                this.idcategoria = this.idcategoria + 1;
            },

            verFormActualizar: function(categoria_id) {
                // Antes de mostrar el formulario de actualizar, rellenamos sus campos
                this.idactualizar = categoria_id;
                this.nombreactualizar = this.categorias[categoria_id].nombre;
                // Mostramos el formulario
                this.formActualizar = true;
            },

            guardarActualizacion: function(categoria_id) {
                // Ocultamos nuestro formulario de actualizar
                this.formActualizar = false;
                // Actualizamos los datos
                axios({
                    method: 'put',
                    url: ('http://localhost:3000/api/Categoria/' + categoria_id),
                    data: {
                        id: categoria_id,
                        nombre: this.nombreactualizar
                    }
                });

            },
            borrarCategoria: function(categoria_id) {
                // Borramos de la lista
                axios({
                    method: 'delete',
                    url: ('http://localhost:3000/api/Categoria/' + categoria_id)
                });
            }
        }

    })
});