
function createShape(pos) {
    gShape = {
        pos,
        shape: gCurrShape,
        size: 50,
        color: 'white',
        stroke: 'black',
        isDrag: false
    }
}

function getShape() {
    return gShape
}

function isShapeClicked(clickedPos) {
    const { pos } = gShape
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    return distance <= gShape.size
}

function setShapeDrag(isDrag) {
    gShape.isDrag = isDrag
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.clientX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.clientY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function drawLine(lastX, lastY, x, y) {
    gCtx.beginPath()
    gCtx.lineWidth = 1
    gCtx.moveTo(lastX, lastY)
    gCtx.lineTo(x, y)
    gCtx.stroke()
}

function drawTriangle(lastX, lastY) {
    gCtx.beginPath()
    gCtx.lineWidth = 1
    gCtx.moveTo(lastX, lastY)
    gCtx.lineTo(lastX - 50, lastY + 100)
    gCtx.lineTo(lastX + 50, lastY + 100)
    gCtx.closePath()
    gCtx.fill()
    gCtx.stroke()
}

function drawRect(lastX, lastY, size) {
    gCtx.beginPath()
    gCtx.lineWidth = 1
    // gCtx.rect(startX - 50, startY - 50, 100, 100)
    gCtx.rect(lastX - size / 2, lastY - size / 2, size, size)
    gCtx.fill()
    gCtx.stroke()
}

function drawArc(lastX, lastY, size) {
    gCtx.beginPath()
    gCtx.lineWidth = 1
    // gCtx.arc(startX, startY, 50, 0, Math.PI * 2)
    gCtx.arc(lastX, lastY, size, 0, Math.PI * 2)
    gCtx.fill()
    gCtx.stroke()
}