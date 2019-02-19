var app = new Vue({
    el: '#app',
    data: {
        message: 'Answer will be here...',
        days: [],
        selectedDay: ""
    },
    methods: {
        sendThing: function () {
            this.message = "Wait for it";
            this.$http.get('http://localhost:3000/' + this.selectedDay).then(response => {
                this.message = response.body;
            }, response => {
                // error callback
            });
        }
    },
    created: function () {
        // `this` points to the vm instance
        this.$http.get('http://localhost:3000/days').then(response => {
            this.days = response.body;
        });
    }

})