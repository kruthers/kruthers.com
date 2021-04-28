let images = 1
let current = Math.floor(Math.random()*images)
let anim
let header = ""
const transitionTime = 1.5
const delay = 7

function changeImage(image) {
    if (anim) clearInterval(anim)
    document.getElementById("bottom_image").src = `./images/${header}${image}.png`

    document.getElementById("top_image").style.opacity = 1

    anim = setInterval(opacityChange, 5)

    function opacityChange() {
        if (document.getElementById("top_image").style.opacity > 0) {
            document.getElementById("top_image").style.opacity -= (1 / (transitionTime * 1000 / 5))
        } else {
            clearInterval(anim)
            document.getElementById("top_image").src = `./images/${header}${image}.png`
            document.getElementById("top_image").style.opacity = 1
        }
    }
}

function stepImage() {
    current++
    if (current >= images) current = 0
    changeImage(current)
    resetCycle()
}

function backImage() {
    current--
    if (current <= 0) current=images
    changeImage(current)
    resetCycle()
}

let imageCycle
function resetCycle() {
    if (imageCycle) clearInterval(imageCycle)
    imageCycle = setTimeout(stepImage, (transitionTime+delay*1000))
}

