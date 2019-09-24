const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
// eslint-disable-next-line no-undef
var vm = new Vue({
  el: '#app',
  data: {
    message: 'Answer will be here...',
    days: [],
    selectedDay: '',
    day10Initialized: false,
    day10PointArray: [],
    onViewScreen: false,
    arrayObject: {},
    upperLeftX: 0,
    upperLeftY: 0,
    seconds: 0
  },
  methods: {
    sendThing: function () {
      if (vm.selectedDay === 'day10a' || vm.selectedDay === 'day10b') {
        this.message = 'Look below'
        if (!vm.day10Initialized) {
          vm.initializeCanvas()
        }
      } else {
        this.message = 'Wait for it'
        this.$http.get('http://localhost:3000/' + this.selectedDay).then(response => {
          this.message = response.body
        }, response => {
          // error callback
        })
      }
    },
    advanceSeconds: async function (moveSeconds) {
      vm.onViewScreen = false
      if (!vm.day10Initialized) {
        vm.initializeCanvas()
      }
      var canvas = document.getElementById('pointsOfLightCanvas')
      var ctx = canvas.getContext('2d')
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
      for (var i = 0; i < vm.day10PointArray.length; i++) {
        vm.day10PointArray[i].posX += (vm.day10PointArray[i].velX * moveSeconds)
        vm.day10PointArray[i].posY += (vm.day10PointArray[i].velY * moveSeconds)
        if (vm.inView(vm.day10PointArray[i].posX, vm.day10PointArray[i].posY)) {
          vm.onViewScreen = true
          ctx.fillStyle = 'gold'
          ctx.fillRect(vm.day10PointArray[i].posX - vm.upperLeftX, vm.day10PointArray[i].posY - vm.upperLeftY, 1, 1)
        }
      }
      vm.seconds = vm.seconds + moveSeconds
      // this forces a re-render so you can see the seconds go by
      await sleep(0.01)
    },
    inView: function (x, y) {
      var canvas = document.getElementById('pointsOfLightCanvas')
      if ((x >= vm.upperLeftX) && x < vm.upperLeftX + canvas.clientWidth &&
          (y >= vm.upperLeftY) && y < vm.upperLeftY + canvas.clientHeight) {
        return true
      }
      return false
    },
    initializeCanvas: function () {
      this.$http.get('http://localhost:3000/' + this.selectedDay).then(response => {
        vm.day10PointArray = response.body
      }, response => {
        // error callback
      })
      vm.day10Initialized = true
    },
    moveIntoGrid: function () {
      // get minimum x and y, maximum x and y
      vm.getMinMax()
      console.log(vm)
      // find the middle
      var middleX = (vm.arrayObject.minX + vm.arrayObject.maxX) / 2
      var middleY = (vm.arrayObject.minY + vm.arrayObject.maxY) / 2
      // this will be the upper left corner point coordinates that will be inside the view screen
      var canvas = document.getElementById('pointsOfLightCanvas')
      vm.upperLeftX = middleX - (canvas.clientWidth / 2)
      vm.upperLeftY = middleY - (canvas.clientHeight / 2)
      // loop through advancing seconds until the first point is in the grid
      while (!vm.onViewScreen) {
        vm.advanceSeconds(10)
      }
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
    }
  },
  created: function () {
    // `this` points to the vm instance
    this.$http.get('http://localhost:3000/days').then(response => {
      this.days = response.body
    })
  }

})
