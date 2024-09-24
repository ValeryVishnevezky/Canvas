
let gElCanvas
let gCtx
let gLastPos
var gShape
var gCurrShape = 'line'
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    addListeners()
    onResizeCanvas()
    createShape()
    onRenderCanvas()
}

function onRenderCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.fillStyle = 'white'
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function onSetOption(value) {
    gCurrShape = value
}

function onSetColor() {
    const color = document.querySelector('input[name="background-color"]')
    const stroke = document.querySelector('input[name="stroke-color"]')
    gShape.color = color.value
    gShape.stroke = stroke.value
}

function onDown(ev) {
    const pos = getEvPos(ev)
    setShapeDrag(true)
    gLastPos = pos
}

function onMove(ev) {
    const { isDrag } = getShape()
    if (!isDrag) return
    const pos = getEvPos(ev)
    const distance = Math.sqrt(Math.pow(pos.x - gLastPos.x, 2) + Math.pow(pos.y - gLastPos.y, 2))
    gShape.size = Math.max(40, Math.min(100, distance * 2))
    onDrawShape(gLastPos.x, gLastPos.y, pos.x, pos.y, gShape.size)
    gLastPos = pos
}

function onUp() {
    setShapeDrag(false)
}

function onResizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth
    gElCanvas.height = elContainer.offsetHeight
}

function onDrawShape(lastX, lastY, x, y, size) {
    gCtx.fillStyle = gShape.color
    gCtx.strokeStyle = gShape.stroke

    switch (gCurrShape) {
        case 'line':
            drawLine(lastX, lastY, x, y)
            break
        case 'triangle':
            drawTriangle(lastX, lastY)
            break
        case 'rect':
            drawRect(lastX, lastY, size)
            break
        case 'circle':
            drawArc(lastX, lastY, size)
            break
    }
}

//Download img

function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

//Download to canvas

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

//Facebook

function onUploadToFB(url) {
    console.log('url:', url)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
}

function onUploadImg() {
    const canvasData = gElCanvas.toDataURL('image/jpeg')
    function onSuccess(uploadedImgUrl) {
        console.log('uploadedImgUrl:', uploadedImgUrl)
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
            <p>Image url: ${uploadedImgUrl}</p>
            <button class="btn-facebook" target="_blank" onclick="onUploadToFB('${encodedUploadedImgUrl}')">
                Share on Facebook  
            </button>`
    }
    uploadImg(canvasData, onSuccess)
}