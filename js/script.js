let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
});

var menuButton = document.getElementById("nav-toggle")
var menuIcon = document.getElementById("nav-menu-icon")
var closeIcon = document.getElementById("nav-close-icon")
var navList = document.querySelector(".nav-list")
var popups = document.querySelectorAll(".popup").forEach((v, i) => {
	v.addEventListener("click", () => {
		if (v.classList.contains("open")) v.classList.remove("open")
		else v.classList.add("open")
	})
})

var open = closeIcon.style.display === ""
menuIcon.style.display = open ? "none" : ""
closeIcon.style.display = open ? "" : "none"

document.querySelectorAll(".input-container").forEach((v, i) => {
	var input = v.querySelector("input")
	function onChange(e) {
		if (e.target.value !== "") v.classList.add("selected")
		else if (e.target !== document.activeElement) v.classList.remove("selected")
	}
	input.addEventListener("focus", function () {
		v.classList.add("selected")
	})
	input.addEventListener("blur", function (e) {
		if (e.target.value === "") {
			v.classList.remove("selected")
		}
	})
	input.addEventListener("input", onChange)
})

menuButton.addEventListener("click", function () {
	open = closeIcon.style.display === ""
	open = !open
	menuIcon.style.display = open ? "none" : ""
	closeIcon.style.display = open ? "" : "none"
	if (open) {
		navList.classList.add("open")
	} else {
		navList.classList.remove("open")
	}
})