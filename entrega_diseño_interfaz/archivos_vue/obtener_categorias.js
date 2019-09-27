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
                        id: this.traerultimacategoria(),
                        nombre: this.nombre
                    }
                });
                //this.id = null;
                this.nombre = null;
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
                    alert("NO guardado faltan campos requeridos")
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

                    alert("guardado con exito")

                }

            },
            traerultimacategoria() {
                var valor = 1;
                for (var i = 1; i < this.categorias.length; i++) {
                    valor = valor + 1
                }
                return valor + 1;


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