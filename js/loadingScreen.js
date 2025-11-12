/**
 * Loading Screen Module - Simplified
 */

;(function () {
  'use strict'

  // Create overlay
  var overlay = document.createElement('div')
  overlay.id = 'loading-screen-overlay'
  overlay.innerHTML = '<img src="images/P504.png" alt="Loading..." id="loading-car" />'
  
  // Add styles
  var style = document.createElement('style')
  style.textContent =
    '#loading-screen-overlay {' +
    'position: fixed;' +
    'top: 0;' +
    'left: 0;' +
    'width: 100%;' +
    'height: 100%;' +
    'background: linear-gradient(180deg, #AEE4FA 0%, #8BC6E8 100%);' +
    'display: flex;' +
    'align-items: center;' +
    'justify-content: center;' +
    'z-index: 10000;' +
    'opacity: 1;' +
    'transition: opacity 0.5s ease-out;' +
    '}' +
    '#loading-car {' +
    'width: 400px;' +
    'max-width: 90vw;' +
    'height: auto;' +
    'filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));' +
    'display: block;' +
    '}'

  document.head.appendChild(style)
  document.body.appendChild(overlay)

  // Hide after 4 seconds
  setTimeout(function () {
    overlay.style.opacity = '0'
    setTimeout(function () {
      overlay.remove()
      style.remove()
    }, 500)
  }, 4000)

})()
