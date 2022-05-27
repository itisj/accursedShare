var term = new Terminal();
term.open(document.getElementById('terminal'));
term.write(' C:\\Users\\Users> cd downloads');

term.onData(e => {
    term.write(e);
});

// const HIGH = 100000;
// const LOW = 10000;

/////////////////////////////////////////////

let dx = 1
let dy = 1
let x = 0
let y = 0
let maxX = 0
let maxY = 0
let currentHue = 0

const container = document.querySelector("#container")
const object = document.querySelector("[data-bounceable]")


const move = () => {
  const { val: newX, delta: newDx } = calcNextVal(x, maxX, dx)
  const { val: newY, delta: newDy } = calcNextVal(y, maxY, dy)
  if (dx !== newDx || dy !== newDy) {
    changeRandomColor(300)
  }
  x = newX
  dx = newDx
  y = newY
  dy = newDy
  object.style.transform = `translate3D(${x}px, ${y}px, 0)`
  requestAnimationFrame(move)
};

const calcNextVal = (val, maxVal, delta) => {
  val += delta
  if (val >= maxVal || val <= 0) {  
    delta *= -1
  }
  val = Math.min(val, maxVal)
  val = Math.max(val, 0)
  return {
    val,
    delta
  }
}

const changeRandomColor = (minDiff = 0) => {
  const hue = (currentHue + minDiff + Math.random() * (360 - 2 * minDiff)) % 360
  container.style.setProperty('--color', `hsl(${hue}, 66%, 66%)`)
  currentHue = hue
}

const updateMaxValues = () => {
  maxX = container.offsetWidth - object.offsetWidth,
  maxY = container.offsetHeight - object.offsetHeight
}

window.addEventListener('load', () => {
  updateMaxValues()
  changeRandomColor()
  requestAnimationFrame(move)
})

window.addEventListener('resize', updateMaxValues)