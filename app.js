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
    day10Initialized: false,
    day10PointArray: [],
    onViewScreen: false,
    arrayObject: {},
    upperLeftX: 0,
    upperLeftY: 0,
    direction: 1,
    seconds: 0
    // seconds: 10900
  },
  methods: {
    sendThing: function () {
      if (vm.selectedDay === 'day10a' || vm.selectedDay === 'day10b') {
        this.message = 'Look below'
        this.$http.get('http://localhost:3000/' + this.selectedDay + '?moveForward=' + vm.seconds).then(response => {
          if (!vm.day10Initialized) {
            vm.initializeCanvas()
          }
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
      // if (!vm.day10Initialized) {
      //   vm.initializeCanvas()
      // }
      // for (var i = 0; i < pointArray.length; i++) {
      //   ctx.fillStyle = 'gold'
      //   ctx.fillRect(pointArray[i].posX, pointArray[i].posY, 1, 1)
      // }
      vm.onViewScreen = false
      for (var i = 0; i < vm.day10PointArray.length; i++) {
        vm.day10PointArray[i].posX += (vm.day10PointArray[i].velX * vm.direction)
        vm.day10PointArray[i].posY += (vm.day10PointArray[i].velY * vm.direction)
        if(inView(vm.day10PointArray[i].posX, vm.day10PointArray[i].posY)){
          vm.onViewScreen = true
        }
      }
    },
    inView: function (x, y) {
      var canvas = document.getElementById('pointsOfLightCanvas')
        if ((x >= vm.upperLeftX) && x < vm.upperLeftX + canvas.clientWidth &&
            (y >= vm.upperLeftX) && y < vm.upperLeftX + canvas.clientHeight){
              return true
            }
        return false
      }
    },
    initializeCanvas: function () {
      var canvas = document.getElementById('pointsOfLightCanvas')
      var ctx = canvas.getContext('2d')
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
      this.$http.get('http://localhost:3000/initializeCanvas' + '?canvasWidth=' + canvas.clientWidth + '?canvasHeight=' + canvas.clientHeight).then(response => {
        vm.day10PointArray = response.body
        vm.moveIntoGrid()
        // for (var i = 0; i < vm.day10PointArray.length; i++) {
        //   ctx.fillStyle = 'gold'
        //   ctx.fillRect(pointArray[i].posX, pointArray[i].posY, 1, 1)
        // }
      }, response => {
        // error callback
      })
    },
    moveIntoGrid: function () {
      // get minimum x and y, maximum x and y
      vm.getMinMax()
      // find the middle
      var middleX = (vm.arrayObject.minX + vm.arrayObject.maxX) / 2
      var middleY = (vm.arrayObject.minY + vm.arrayObject.maxY) / 2
      // this will be the upper left corner point coordinates that will be inside the view screen
      var canvas = document.getElementById('pointsOfLightCanvas')
      vm.upperLeftX = middleX - (canvas.clientWidth / 2)
      vm.upperLeftY = middleY - (canvas.clientHeight / 2)
      // loop through advancing seconds until the first point is in the grid
      vm.direction = 1
      while (!vm.onViewScreen) {
        vm.seconds++
        vm.advanceSeconds()
      }
      // var ctx = canvas.getContext('2d')
      // ctx.fillStyle = 'black'
      // ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    },
    getMinMax: function () {
      vm.arrayObject = { minX: vm.day10PointArray[0].posX,
        maxX: vm.day10PointArray[0].posX,
        minY: vm.day10PointArray[0].posY,
        maxY: vm.day10PointArray[0].posY,
        width: 0,
        height: 0 }
      for (var i = 0; i < vm.day10PointArray.length; i++) {
        if (vm.day10PointArray[i].posX < vm.arrayObject.minX) {
          vm.arrayObject.minX = vm.day10PointArray[i].posX
        }
        if (vm.day10PointArray[i].posX > vm.arrayObject.maxX) {
          vm.arrayObject.maxX = vm.day10PointArray[i].posX
        }
        if (vm.day10PointArray[i].posY < vm.arrayObject.minY) {
          vm.arrayObject.minY = vm.day10PointArray[i].posY
        }
        if (vm.day10PointArray[i].posY > vm.arrayObject.maxY) {
          vm.arrayObject.maxY = vm.day10PointArray[i].posY
        }
      }
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
