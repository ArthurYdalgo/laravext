import NProgress from 'nprogress'
import React from "react";

/**
 * This is basically the same that Inertia.js uses, with some minor tweaks 
 *
 * @see: https://github.com/inertiajs/inertia/blob/master/packages/core/src/progress.ts
 */

let timeout = null;


export const injectCSS = (color) => {
    if(typeof document === 'undefined') {
        return
    }
    
    const element = document.createElement('style')
    element.textContent = `
      #nprogress {
        pointer-events: none;
      }
  
      #nprogress .bar {
        background: ${color};
  
        position: fixed;
        z-index: 1031;
        top: 0;
        left: 0;
  
        width: 100%;
        height: 2px;
      }
  
      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
        opacity: 1.0;
  
        -webkit-transform: rotate(3deg) translate(0px, -4px);
            -ms-transform: rotate(3deg) translate(0px, -4px);
                transform: rotate(3deg) translate(0px, -4px);
      }
  
      #nprogress .spinner {
        display: block;
        position: fixed;
        z-index: 1031;
        top: 15px;
        right: 15px;
      }
  
      #nprogress .spinner-icon {
        width: 18px;
        height: 18px;
        box-sizing: border-box;
  
        border: solid 2px transparent;
        border-top-color: ${color};
        border-left-color: ${color};
        border-radius: 50%;
  
        -webkit-animation: nprogress-spinner 400ms linear infinite;
                animation: nprogress-spinner 400ms linear infinite;
      }
  
      .nprogress-custom-parent {
        overflow: hidden;
        position: relative;
      }
  
      .nprogress-custom-parent #nprogress .spinner,
      .nprogress-custom-parent #nprogress .bar {
        position: absolute;
      }
  
      @-webkit-keyframes nprogress-spinner {
        0%   { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
      }
      @keyframes nprogress-spinner {
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `
    document.head.appendChild(element)
}


export const startProgress = () => {
  const startEvent = new CustomEvent('laravext:start');
  document.dispatchEvent(startEvent);
}

export const endProgress = () => {
  const finishEvent = new CustomEvent('laravext:finish');
  document.dispatchEvent(finishEvent);
}

export const moveProgress = (percentage) => {
  const progressEvent = new CustomEvent('laravext:progress', { detail: { progress: { percentage } } });
  document.dispatchEvent(progressEvent);
}

const start = (delay) => {
  timeout = setTimeout(() => NProgress.start(), delay)
}

const progress = (event) => {
  if (NProgress.isStarted() && event.detail.progress?.percentage) {
    NProgress.set(Math.max(NProgress.status, (event.detail.progress.percentage / 100) * 0.9))
  }
}

const finish = (event) => {
  clearTimeout(timeout)
  if (!NProgress.isStarted()) {
    return
  }

  NProgress.done()
}


export const addEventListeners = (delay) => {
    document.addEventListener('laravext:start', start.bind(null, delay))
    document.addEventListener('laravext:progress', progress)
    document.addEventListener('laravext:finish', finish)
}

export const setupProgress = ({
    delay = 0,
    color = '#29d',
    includeCSS = true,
    showSpinner = false,
}) => {
    addEventListeners(delay)
    NProgress.configure({ showSpinner })
    if (includeCSS) {
        injectCSS(color)
    }
}