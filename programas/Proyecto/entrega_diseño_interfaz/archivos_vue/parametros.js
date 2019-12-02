new Vue({
    el: '#app',

    data: {
        parametros: [],
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
        valoractualizar: null,
    },

    mounted() {
        this.cargarParametros();



    },

    methods: {
        cargarParametros() {
            axios
                .get('http://localhost:3000/api/parametros')
                .then((respuesta) => {
                    this.parametros = respuesta.data;
                })


        },

        verFormActualizar: function(parametro_id) {
            // Antes de mostrar el formulario de actualizar, rellenamos sus campos
            this.idactualizar = parametro_id;
            this.nombreactualizar = this.parametros[parametro_id].nombre;
            this.valoractualizar = this.parametros[parametro_id].valor;
            // Mostramos el formulario
            this.formActualizar = true;
        },

        guardarActualizacion: function(parametro_id) {
            if (this.nombreactualizar == "" && valoractualizar == "") {
                alert("NO guardado faltan campos requeridos")
            } else {
                // Ocultamos nuestro formulario de actualizar
                this.formActualizar = false;
                // Actualizamos los datos en la base de datos
                axios({
                    method: 'put',
                    url: ('http://localhost:3000/api/parametros/' + parametro_id),
                    data: {
                        id: parametro_id,
                        nombre: this.nombreactualizar,
                        valor: this.valoractualizar
                    }
                });


                //actualizando los datos en la pagina

                alert("guardado con exito")

            }

        }
    }

})