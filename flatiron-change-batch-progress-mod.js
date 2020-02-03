// ==UserScript==
// @name         Change batch progress and mod
// @namespace    https://github.com/amelieoller/tampermonkey
// @version      0.2
// @description  This script changes the batch view to the progress tab and selects the current mod
// @author       amelieoller
// @match        https://learn.co/batches/*/progress
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/amelieoller/tampermonkey/master/flatiron-change-batch-progress-mod.js
// @updateURL    https://raw.githubusercontent.com/amelieoller/tampermonkey/master/flatiron-change-batch-progress-mod.js
// ==/UserScript==

(function() {
  'use strict';
  // Select the node that will be observed for mutations
  const targetNode = document.getElementById('organizations-app');

  // Options for the observer (which mutations to observe)
  const config = { childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  const observerCallback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for (let mutation of mutationsList) {
      // Wait for list to be loaded
      if (mutation.addedNodes[0].className === 'batches-show') {
        // Select cohort dropdown
        document
          .getElementsByClassName('square bd-gray')[0]
          .getElementsByTagName('option')[0].selected = true;
        var element = document.getElementsByClassName('square bd-gray')[0];
        var event = new Event('change', { bubbles: true });
        element.dispatchEvent(event);

        // Stop observing
        observer.disconnect();
      }
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(observerCallback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);
})();
