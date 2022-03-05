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
let sections = document.querySelectorAll('section')
let navbarList = document.querySelector('#navbar__list')
let mainHeader = document.querySelector('.page__header')
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
function buildNav() {
    //for every section we create an li elment
    for (let section of sections)
    {
        let li = document.createElement('li')
        //to link the li with the section we gave it a class with the same name of the section ID
        li.classList.add('menu__link',section.getAttribute('id'))
        li.textContent = section.dataset.nav
        navbarList.appendChild(li)
    }
}

// Add class 'active' to section when near top of viewport
function addActive() {
    for(let section of sections)
    {
        //select the li that linked with the section
        let liOfSection = document.querySelector('.menu__link.'+section.getAttribute('id'))
        //we check the position of the section
        //make them active
        if(section.getBoundingClientRect().top < 320)
        {
            section.classList.add('your-active-class')
            liOfSection.classList.add('your-active-class')
        }
        //remove the active state
        if(section.getBoundingClientRect().bottom < 320 || section.getBoundingClientRect().top > 320)
        {
            section.classList.remove('your-active-class')
            liOfSection.classList.remove('your-active-class')
        }
    }
    //we use setTimeout function to keep the addActive function working all time without freezing the page
    if(true){
        setTimeout(addActive, 0);
    }
}
// Scroll to anchor ID using scrollTO event
function scrollTO (event) {
    //I didn't create anchor elements so I don't have to call preventDefault function
    if(event.target.nodeName == 'LI'){
        //get section Id from the classes of the clicked li
        let sectionId = event.target.classList[1]
        let sectionToGo = document.querySelector('#'+sectionId)
        //scroll to section
        sectionToGo.scrollIntoView({behavior:'smooth'})
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/
    mainHeader.addEventListener('click',scrollTO)


// Build menu 
buildNav()
// Scroll to section on link click
scrollTo()
// Set sections as active
addActive()