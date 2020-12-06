const btnPrev = document.getElementById('prev')
const btnNext = document.getElementById('next')
const progress = document.getElementById('progress')
const circles = document.querySelectorAll('.circle')


var counter = 0
btnPrev.addEventListener('click', () => {
    counter--
    if (counter < 0) { counter = 0 }

    update()
})

btnNext.addEventListener('click', () => {
    counter++
    if (counter > circles.length) { counter = circles.length }

    update()
})

function update() {
    circles.forEach((circle, i) => {
        if (i < counter) {
            circle.classList.add('active')
        } else {
            circle.classList.remove('active')
        }
    })

    progress.style.width = (counter - 1) / (circles.length - 1) * 100 + '%'
    if (counter === 0) {
        btnPrev.disabled = true;
    } else if (counter === circles.length) {
        btnNext.disabled = true;
    } else {
        btnNext.disabled = false;
        btnPrev.disabled = false;
    }
}