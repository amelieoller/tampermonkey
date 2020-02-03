// ==UserScript==
// @name         Open tabs in ed team wiki
// @namespace    https://github.com/amelieoller/tampermonkey
// @version      0.3
// @description  This script opens the page that corresponds to which mod and week your cohort is in at the moment
// @author       amelieoller
// @match        https://education-team-wiki.herokuapp.com/
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/amelieoller/tampermonkey/master/flatiron-open-ed-wiki-tabs.js
// @updateURL    https://raw.githubusercontent.com/amelieoller/tampermonkey/master/flatiron-open-ed-wiki-tabs.js
// ==/UserScript==

(function() {
  'use strict';
  // Your cohort's start date
  const myCohortStartDate = new Date('2019-12-17');

  // Mods 1-4 days and names (as they appear in the wiki)
  const mods = [
    { days: 21, name: 'Module 1' },
    { days: 21 * 2, name: 'Module 2' },
    { days: 21 * 3, name: 'Module 3' },
    { days: 21 * 4, name: 'Module 4' }
  ];

  // Calculate current mod that your cohort is in right now
  const currentMod = mods.find(mod => mod.days > getDayDiffToNow(myCohortStartDate));

  // Calculate current week that your cohort is in right now
  const weeksPast = Math.ceil(getDayDiffToNow(myCohortStartDate) / 7);
  const currentWeek = ((weeksPast - 1) % 3) + 1; // Sawtooth problem

  // Tabs that you want opened (in order)
  const tabsToOpen = ['Software Engineering', 'Immersive', 'Modules', currentMod.name];

  // Open each tab in wiki
  let foundEl;
  let nextBlockToSearch = document;
  tabsToOpen.forEach(tabToOpen => {
    foundEl = [
      ...nextBlockToSearch.getElementsByClassName('fa fa-lg category-icon fa-angle-right')
    ].find(el => el.previousSibling.innerText === tabToOpen);
    foundEl.click();
    nextBlockToSearch = foundEl.parentElement.nextElementSibling;
  });

  [...nextBlockToSearch.getElementsByTagName('li')].forEach(el => {
    if (el.innerText === `Week ${currentWeek}`) {
      el.getElementsByTagName('a')[0].click();
    }
  });

  // Helper functions
  function getDayDiffToNow(cohortStartDate) {
    const now = new Date();
    const diffInTime = Math.abs(now - cohortStartDate);
    const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));
    return diffInDays + 1;
  }
})();
