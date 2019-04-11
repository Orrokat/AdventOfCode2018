// eslint-disable-next-line no-undef
var vm = new Vue({
  el: '#app',
  data: {
    message: 'Answer will be here...',
    displaygrid:
            '\n' +
            '......................\n' +
            '......................\n' +
            '......................\n' +
            '......................\n' +
            '......#...#..###......\n' +
            '......#...#...#.......\n' +
            '......#...#...#.......\n' +
            '......#####...#.......\n' +
            '......#...#...#.......\n' +
            '......#...#...#.......\n' +
            '......#...#...#.......\n' +
            '......#...#..###......\n' +
            '......................\n' +
            '......................\n' +
            '......................\n' +
            '......................\n',

    days: [],
    selectedDay: '',
    seconds: 10900
  },
  methods: {
    sendThing: function () {
      if (vm.selectedDay === 'day10a' || vm.selectedDay === 'day10b') {
        this.message = 'Look below'
        this.$http.get('http://localhost:3000/' + this.selectedDay + '?moveForward=' + vm.seconds).then(response => {
          var canvas = document.getElementById('pointsOfLightCanvas')
          var ctx = canvas.getContext('2d')
          ctx.fillStyle = 'black'
          ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
        }, response => {
          // error callback
        })
      } else {
        this.message = 'Wait for it'
        this.$http.get('http://localhost:3000/' + this.selectedDay).then(response => {
          this.message = response.body
        }, response => {
          // error callback
        })
      }
    },
    advanceSeconds: function () {
      this.$http.get('http://localhost:3000/' + this.selectedDay + '?moveForward=' + vm.seconds).then(response => {
        var pointArray = response.body
        var canvas = document.getElementById('pointsOfLightCanvas')
        var ctx = canvas.getContext('2d')
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
        for(var i = 0; i < pointArray.length; i++){
          ctx.fillStyle = 'gold'
          ctx.fillRect(pointArray[i].posX, pointArray[i].posY, 1, 1)
        }
      }, response => {
        // error callback
      })
    },
    decreaseSeconds10: function () {
      vm.seconds -= 10
      vm.advanceSeconds()
    },
    decreaseSeconds1: function () {
      vm.seconds -= 1
      vm.advanceSeconds()
    },
    advanceSeconds1: function () {
      vm.seconds += 1
      vm.advanceSeconds()
    },
    advanceSeconds10: function () {
      vm.seconds += 10
      vm.advanceSeconds()
    }
  },
  created: function () {
    // `this` points to the vm instance
    this.$http.get('http://localhost:3000/days').then(response => {
      this.days = response.body
    })
  }

})
