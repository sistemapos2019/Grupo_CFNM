var categoria_ultima;
new Vue({
    el: '#contarcategoria',
    data() {

        categoria: null

    },
    mounted() {


        axios
            .get('http://localhost:3000/api/Categoria/count')
            .then(function(response) {
                this.categoria = response.data;



            })
    }
})