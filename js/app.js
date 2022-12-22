/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sectionsList = document.querySelectorAll('h2');
const anchorList = document.getElementsByClassName("menu__link");
const sectionslst = document.querySelectorAll('section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildMenu(){
  const navBarList = document.getElementById('navbar__list');
  const dFrag = document.createDocumentFragment();
  for(let section of sectionsList){
      let navItem = document.createElement('li');
      //TODO:add anchor html to each li
      navItem.innerHTML = '<a  class="menu__link">'+section.textContent+'</a>';
      //TODO:add pointer style to the navigation menu items
      navItem.style.cursor ="pointer";
      /* TODO: appending the nav item to the document fragment
         thus reducing the number of repaints and reflow */
      dFrag.appendChild(navItem);
  }
  //TODO: appending the document fragment to the nav__list
  navBarList.appendChild(dFrag);
}
// Add class 'active' to section when near top of viewport
function isElementVisible(elment){
  //getting the bounding measures of the element passes which is one of the sections
 let rect = elment.getBoundingClientRect();
  return (
    (rect.bottom <= (window.innerHeight*4)/3 && 
      rect.bottom >= (window.innerHeight*4)/6)
  )
}
// checking which nav item anchor matching the current active section
function isAnchorActive(section){
  for(let anchor of anchorList){
    let sectionName =anchor.textContent;
    if(section==sectionslst[sectionName[8]-1]){
      return anchor;   
    }
  }
}
function handler(){
  
  for(let section of sectionslst){
    //checking if section is visible,if yes add active class
    if(isElementVisible(section) == true ){
      section.classList.add('your-active-class');
      isAnchorActive(section).classList.add('active');   
      //if not visible,remove the active class
    }else{
      section.classList.remove('your-active-class');
      isAnchorActive(section).classList.remove('active');
    }
  }
}
// Scroll to anchor ID using scrollTO event
function scrollToSection(){
  
  for(let anchor of anchorList){
    anchor.addEventListener('click',function scroll(){
      //getting the section name of the current anchor
      let sectionName = anchor.textContent;
      //TODO: extract the section number
      //all section names has 9 letters so the number is at position8
      // substracting one to match the zero identation
      //section4 would be number 3 in the array for example
      sectionsList[sectionName[8]-1].parentElement.scrollIntoView({behavior:'smooth'});
      });
  };
}
/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildMenu();

// Scroll to section on link click
scrollToSection();

// Set sections as active
//adding event listener to scroll and when happen trigger handler function
addEventListener('scroll', handler,false);


