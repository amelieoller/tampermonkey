// ==UserScript==
// @name         Open tabs on curriculum tracks page and select cohort
// @namespace    https://github.com/amelieoller/tampermonkey
// @version      0.2
// @description  This script opens each tab once the page is loaded and selects your desired cohort
// @author       amelieoller
// @match        https://learn.co/curriculum/tracks/*
// @grant        none
// @downloadURL  https://github.com/amelieoller/tampermonkey/blob/master/flatiron-cohort-track-select.js
// @updateURL    https://github.com/amelieoller/tampermonkey/blob/master/flatiron-cohort-track-select.js
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
      // Wait for list to be loaded
      if (mutation.addedNodes[0].id === 'track-explorer-layout') {
        // Select cohort dropdown
        const cohortDropdown = document.getElementsByClassName('batches')[0];

        // Select each arrow and "click" to open content
        [...document.getElementsByClassName('arrow-icon')].forEach(el => el.click());

        // Get index of cohort from dropdown
        const cohortIndex = [...cohortDropdown.options]
          .map(option => option.label)
          .indexOf(myCohort);

        // Select cohort index
        cohortDropdown.getElementsByTagName('option')[cohortIndex].selected = true;

        // Bubble up change event to make selection
        const dropdownChangeEvent = new Event('change', { bubbles: true });
        cohortDropdown.dispatchEvent(dropdownChangeEvent);

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
