const slider = document.querySelector("#slider")
const canvas = document.querySelector("#canvas")
const autoplayButton = document.querySelector(".autoplay")
const stopButton = document.querySelector(".stop")
let goAutoplay
const images = []
const ctx = canvas.getContext('2d')

slider.addEventListener('input', handleInputSlider)

autoplayButton.addEventListener('click', handleAutoplay)

stopButton.addEventListener('click', handleStop)

window.addEventListener('load', pageLoaded)

function pageLoaded() {
  for (let i = 1; i <= 36; i++) {
    const number = i.toString().padStart(2, '00')
    const url = `https://stockx-360.imgix.net/Air-Jordan-11-Retro-Playoffs-2019/Images/Air-Jordan-11-Retro-Playoffs-2019/Lv2/img${number}.jpg?auto=format,compress&q=90&updated_at=1574092689&w=1000`
    const image = new Image()
    image.src = url
    image.addEventListener('load', () => {
      images[i] = image
      if (i === 1) {
        loadImage(i)
      }
    })
  }
}

function loadImage(index) {
  ctx.drawImage(images[index], 0, 0, canvas.clientWidth, canvas.height)
}


function handleInputSlider() {
  loadImage(this.value)
}

function handleAutoplay() {
  this.classList.add('disabled')
  stopButton.classList.remove('disabled')
  goAutoplay = setInterval(() => {
    let numberImage = parseInt(slider.value)
    console.log(numberImage)

    if (numberImage >= 36) numberImage = 0

    numberImage += 1
    slider.value = numberImage.toString()
    loadImage(slider.value)

  }, 40);
}

function handleStop() {
  this.classList.add('disabled')
  autoplayButton.classList.remove('disabled')
  clearInterval(goAutoplay)
}