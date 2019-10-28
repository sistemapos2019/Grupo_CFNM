var vueparametro = new Vue({
    el: '#AdminParametros',
    data: {
        alerta: {
            titulo: 'Error',
            mensaje: 'Texto',
        },
        orderByCampo: '',
        orderByAsc: 1,
        textoBusqueda: '',
        parametroSelected: 0,
        parametros: [],
    },
    methods: {
        mostrarAlerta: function(titu, msg) {
            this.alerta.titulo = titu;
            this.alerta.mensaje = msg;

            $('#miAlerta').show('fade');
            setTimeout(function() {
                $('#miAlerta').hide('fade');
            }, 5000);
        },
        cerrarAlerta: function() {
            $('#miAlerta').hide('fade');
        },
        buscar: function(x) {
            if (this.textoBusqueda == '') return true;

            var cad = this.parametros[x].nombre + this.parametros[x].id;
            cad = cad.toUpperCase();

            if (cad.indexOf(this.textoBusqueda.toUpperCase()) >= 0) return true;
            else return false;
        },
        orderBy: function(campo) {
            if (this.orderByCampo == campo) this.orderByAsc *= -1;
            this.orderByCampo = campo;

            if (campo == 'ID') {
                this.parametros.sort(function(a, b) {
                    return vueparametro.orderByAsc * (a.id - b.id);
                });
            }
            if ((campo = 'NOMBRE')) {
                this.parametros.sort(function(a, b) {
                    if (a.nombre > b.nombre) return vueparametro.orderByAsc * 1;
                    else return vueparametro.orderByAsc * -1;
                });
            }
        },
        cargarDatos: function() {
            //cargando los parametros
            axios
                .get('http://localhost:3000/api/parametros')
                .then(function(res) {
                    vueparametro.parametros = res.data;
                })
                .catch(function(error) {
                    // handle error
                    console.log(error);
                });
        },
        mostrarModificar: function() {
            $('#modalModificar').modal('show');
        },
        modificarParametro: function() {
            axios
                .put(
                    'http://localhost:3000/api/parametros',
                    this.parametros[this.parametroSelected]
                )
                .then(function(res) {
                    console.log('UPDATED Parametro');
                    vueparametro.mostrarAlerta(
                        'Parametro Modificado',
                        'Se modifico el parametro satisfactoriamente'
                    );
                })
                .catch(function(error) {
                    // handle error
                    vueparametro.mostrarAlerta('Error', error);

                    console.log(error);
                });
        },
    },

    mounted: function() {
        this.cargarDatos();
    },
});