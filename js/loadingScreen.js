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
        'width: 400px;' +
        'height: auto;' +
        'position: relative;' +
        'filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));' +
        'z-index: 2;' +
        'border-radius: 15px;' +
        '}' +
        '@media screen and (max-width: 768px) {' +
        '.loading-content { height: 300px; }' +
        '#loading-car { width: 280px; }' +
        '}' +
        '@media screen and (max-width: 480px) {' +
        '.loading-content { height: 250px; }' +
        '#loading-car { width: 240px; }' +
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
