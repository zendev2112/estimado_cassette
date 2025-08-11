/**
 * Loading Screen Module
 * Creates a reusable loading animation with moving car and dust trail
 */

;(function () {
  'use strict'

  class LoadingScreen {
    constructor() {
      this.overlay = null
      this.style = null
      this.isVisible = false
    }

    show(options) {
      options = options || {}
      if (this.isVisible) return

      var config = {
        duration: options.duration || 3000,
        autoHide: options.autoHide !== false,
        backgroundColor:
          options.backgroundColor ||
          'linear-gradient(180deg, #AEE4FA 0%, #8BC6E8 100%)',
        carImage: options.carImage || 'images/P504.png',
      }

      this.createOverlay(config)
      this.addStyles(config)
      this.isVisible = true

      // Auto-hide functionality
      if (config.autoHide) {
        var self = this
        setTimeout(function () {
          self.hide()
        }, config.duration)
      }

      return this
    }

    hide() {
      if (!this.isVisible) return

      if (this.overlay) {
        this.overlay.style.opacity = '0'
        var self = this
        setTimeout(function () {
          self.cleanup()
        }, 500)
      }

      return this
    }

    createOverlay(config) {
      this.overlay = document.createElement('div')
      this.overlay.id = 'loading-screen-overlay'
      this.overlay.innerHTML =
        '<div class="loading-content">' +
        '<img src="' +
        config.carImage +
        '" alt="Loading..." id="loading-car" />' +
        '<div class="dust-container">' +
        '<div class="dust dust-1"></div>' +
        '<div class="dust dust-2"></div>' +
        '<div class="dust dust-3"></div>' +
        '<div class="dust dust-4"></div>' +
        '<div class="dust dust-5"></div>' +
        '</div>' +
        '</div>'

      document.body.appendChild(this.overlay)
    }

    addStyles(config) {
      this.style = document.createElement('style')
      this.style.id = 'loading-screen-styles'
      this.style.textContent =
        '#loading-screen-overlay {' +
        'position: fixed;' +
        'top: 0;' +
        'left: 0;' +
        'width: 100%;' +
        'height: 100%;' +
        'background: ' +
        config.backgroundColor +
        ';' +
        'display: flex;' +
        'align-items: center;' +
        'justify-content: center;' +
        'z-index: 10000;' +
        'opacity: 1;' +
        'transition: opacity 0.5s ease-out;' +
        'overflow: hidden;' +
        '}' +
        '.loading-content {' +
        'position: relative;' +
        'width: 100%;' +
        'height: 200px;' +
        'display: flex;' +
        'align-items: center;' +
        'justify-content: center;' +
        '}' +
        '#loading-car {' +
        'width: 200px;' +
        'height: auto;' +
        'position: absolute;' +
        'animation: driveAndPark 6s ease-out forwards;' +
        'filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));' +
        'z-index: 2;' +
        '}' +
        '@keyframes driveAndPark {' +
        '0% { left: -250px; transform: translateY(0px) scale(1); }' +
        '20% { transform: translateY(-3px) scale(1.01); }' +
        '60% { left: 50%; transform: translateX(-50%) translateY(0px) scale(1.02); }' +
        '80% { left: 50%; transform: translateX(-50%) translateY(-2px) scale(1.02); }' +
        '100% { left: 50%; transform: translateX(-50%) translateY(0px) scale(1); }' +
        '}' +
        '.dust-container {' +
        'position: absolute;' +
        'bottom: 20px;' +
        'left: 0;' +
        'width: 100%;' +
        'height: 80px;' +
        'pointer-events: none;' +
        'overflow: hidden;' +
        'z-index: 1;' +
        '}' +
        '.dust {' +
        'position: absolute;' +
        'bottom: 0;' +
        'width: 8px;' +
        'height: 8px;' +
        'background: radial-gradient(circle, rgba(200,200,200,0.8) 0%, rgba(200,200,200,0.4) 50%, transparent 100%);' +
        'border-radius: 50%;' +
        'opacity: 0;' +
        'animation: puff 2s ease-out infinite;' +
        '}' +
        '.dust-1 { left: 25%; animation-delay: 0s; animation-duration: 1.8s; }' +
        '.dust-2 { left: 30%; animation-delay: 0.3s; animation-duration: 2.2s; }' +
        '.dust-3 { left: 35%; animation-delay: 0.6s; animation-duration: 2s; }' +
        '.dust-4 { left: 40%; animation-delay: 0.9s; animation-duration: 1.9s; }' +
        '.dust-5 { left: 45%; animation-delay: 1.2s; animation-duration: 2.1s; }' +
        '@keyframes puff {' +
        '0% { transform: scale(0.3) translateX(0); opacity: 0; bottom: 15px; }' +
        '20% { opacity: 0.8; }' +
        '100% { transform: scale(2.5) translateX(30px); opacity: 0; bottom: 60px; }' +
        '}' +
        '@media screen and (max-width: 768px) {' +
        '.loading-content { height: 150px; }' +
        '#loading-car { width: 150px; }' +
        '.dust-container { bottom: 15px; height: 60px; }' +
        '.loading-text { bottom: -40px; font-size: 14px; }' +
        '}' +
        '@media screen and (max-width: 480px) {' +
        '.loading-content { height: 120px; }' +
        '#loading-car { width: 120px; }' +
        '.dust-container { bottom: 10px; height: 50px; }' +
        '.loading-text { font-size: 12px; }' +
        '}'

      document.head.appendChild(this.style)
    }

    cleanup() {
      if (this.overlay) {
        this.overlay.remove()
        this.overlay = null
      }
      if (this.style) {
        this.style.remove()
        this.style = null
      }
      this.isVisible = false
    }
  }

  // Create singleton instance
  var loadingScreen = new LoadingScreen()

  // Global functions
  function showLoadingScreen(options) {
    return loadingScreen.show(options)
  }

  function hideLoadingScreen() {
    return loadingScreen.hide()
  }

  // Expose to global scope
  window.LoadingScreen = {
    showLoadingScreen: showLoadingScreen,
    hideLoadingScreen: hideLoadingScreen,
    LoadingScreen: LoadingScreen,
  }

  // Auto-show loading screen when script loads
  document.addEventListener('DOMContentLoaded', function () {
    showLoadingScreen({
      duration: 4000,
      backgroundColor: 'linear-gradient(180deg, #AEE4FA 0%, #8BC6E8 100%)',
      autoHide: true,
    })
  })
})()
