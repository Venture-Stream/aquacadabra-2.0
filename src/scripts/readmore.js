import ReadSmore from 'read-smore/dist/index.cjs'
const readMores = document.querySelectorAll('[data-read-smore-words]')
ReadSmore(readMores).init()