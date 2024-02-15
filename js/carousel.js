var carousel = document.querySelector(".carousel")
var activeI = 0
var cells = Array.from(carousel.querySelectorAll(".carousel-cell"))
var indicatorContainer = carousel.querySelector(".carousel-indicator-container")
var indicators = []
cells.map(function (v, i) {
	var indicator = document.createElement("div")
	indicator.classList.add("carousel-indicator")
	if (i === activeI) indicator.classList.add("active")
	indicatorContainer.appendChild(indicator)
	indicators.push(indicator)
})
var transitioning = false
var previous = carousel.querySelector(".carousel-previous")
var next = carousel.querySelector(".carousel-next")
cells.map((v, i) => {
	if (i === activeI)v.classList.add("active")
	else v.classList.remove("active")
})

function setCarousel(num, direction) {
	transitioning = true
	indicators[activeI].classList.remove("active")
	activeI = num
	var prevCell = carousel.querySelector(".carousel-cell.active")
	prevCell.classList.remove("active")
	prevCell.classList.add("transitioning")
	var activeCell = cells[activeI]
	activeCell.classList.add("active")
	indicators[activeI].classList.add("active")
	if (direction == "BACKWARD") {
		activeCell.classList.add("in-to-left")
		prevCell.classList.add("out-to-left")
	}
	if (direction == "FORWARD") {
		activeCell.classList.add("in-to-right")
		prevCell.classList.add("out-to-right")
	}
	window.setTimeout(function () {	
		cells[activeI].classList.add("active")
		if (direction == "BACKWARD") {
			activeCell.classList.remove("in-to-left")
			prevCell.classList.remove("out-to-left")
		}
		if (direction == "FORWARD") {
			activeCell.classList.remove("in-to-right")
		}
		window.setTimeout(function () {
			transitioning = false;
			prevCell.classList.remove("transitioning")
			prevCell.classList.remove("out-to-right")
		}, 250)
	}, 10)
}

var skipAuto = false

function minMax(num, min, max) {
	if (num > max) num = min
	if (num < min) num = max
	return num
}
function nextFunc () {
	if (!transitioning) setCarousel(minMax(activeI + 1, 0, cells.length - 1), "FORWARD")
}
next.addEventListener("click", function () {
	skipAuto = true
	nextFunc()
})

function prevFunc() {
	if (!transitioning) setCarousel(minMax(activeI - 1, 0, cells.length - 1), "BACKWARD")
}

previous.addEventListener("click", function () {
	skipAuto = true
	prevFunc()
})

var autoTime = 6500

function timeLoop() {
	if (!skipAuto) {
		nextFunc()
	}
	skipAuto = false
	window.setTimeout(timeLoop, autoTime)
}
window.setTimeout(timeLoop, autoTime)