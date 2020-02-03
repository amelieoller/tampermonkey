// ==UserScript==
// @name         Open tabs on curriculum tracks page and select cohort
// @namespace    https://github.com/amelieoller/tampermonkey
// @version      0.1
// @description  This script opens each tab once the page is loaded and selects your desired cohort
// @author       amelieoller
// @match        https://learn.co/curriculum/tracks/*
// @grant        none
// @downloadURL  https://github.com/amelieoller/tampermonkey/flatiron-cohort-track-select.js
// @updateURL    https://github.com/amelieoller/tampermonkey/flatiron-cohort-track-select.js
// ==/UserScript==

(function() {
  'use strict';
  // Name of your cohort
  const myCohort = 'sfo-web-120919';

  // Select the node that will be observed for mutations
  const targetNode = document.getElementById('curriculum-app');

  // Options for the observer (which mutations to observe)
  const config = { childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  const callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for (let mutation of mutationsList) {
      if (mutation.addedNodes[0].id === 'track-explorer-layout') {
        console.log('A child node has been added or removed.' + mutation);
        [
          ...document.getElementsByClassName(
            'arrow-icon icon-padded-right collapsable-toggle pointer-cursor'
          )
        ].forEach(el => el.click());

        const index = [...document.getElementsByClassName('batches')[0].options]
          .map(option => option.label)
          .indexOf(myCohort);

        document.getElementsByClassName('batches')[0].getElementsByTagName('option')[
          index
        ].selected = true;
        const element = document.getElementsByClassName('batches')[0];
        const event = new Event('change', { bubbles: true });
        element.dispatchEvent(event);

        // Stop observing
        observer.disconnect();
      }
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);
})();
