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

function showElement(elem) {
    elem.classList.remove('hidden')
}
function hideElement(elem) {
    elem.classList.add('hidden')
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav() {
    //for every section we create an li elment
    let fragment = document.createDocumentFragment()
    for (let section of sections) {
        let li = document.createElement('li')
        //to link the li with the section we gave it a class with the same name of the section ID
        li.classList.add('menu__link',section.getAttribute('id'))
        li.textContent = section.dataset.nav
        fragment.appendChild(li)
    }
    navbarList.appendChild(fragment)
}

// Add class 'active' to section when near top of viewport
function addActive() {
    for(let section of sections) {
        //select the li that linked with the section
        let liOfSection = document.querySelector('.menu__link.'+section.getAttribute('id'))
        //we check the position of the section
        //make them active
        if(section.getBoundingClientRect().top < 320) {
            section.classList.add('your-active-class')
            liOfSection.classList.add('your-active-class')
        }
        //remove the active state
        if(section.getBoundingClientRect().bottom < 320 || section.getBoundingClientRect().top > 320) {
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
    //I didn't create anchor elements so I don't have to call preventDefault function but I will use it for the requirements
    event.preventDefault()
    if(event.target.nodeName == 'LI') {
        //get section Id from the classes of the clicked li
        let sectionId = event.target.classList[1]
        let sectionToGo = document.querySelector('#'+sectionId)
        //scroll to section
        sectionToGo.scrollIntoView({behavior:'smooth'})
    }
}

// show header only while scrolling
    //                              (YOU CAN IGNORE THESE COMMENTS) 
    // THE FOLLOWING COMMENTS ARE FOR ME TO EXPLAN IN DETAILS HOW THIS CODE is WORKING
    // we want to prevent the header from hide if we still scrolling
    // that mean we need to reset the setTimeout function if we scrolled before its time ended
    // we create a variable (say it called 'timer') and leave it undefined (or we can define it if we want)
    // when the event which is scroll in this case fired for the first time we clearTimeout the timer this have no effect
    // we define the timer as the setTimeout function
    // the next time we scroll the if condition is true so we clear the timer and that stop the setTimeout function
    // then we began another setTimeout function
    // the time is our case is 2 seconds
    // that leads to:
    // if we scroll before 2 seconds the setTimeout would stop and began form first
    // if we scroll after 2 seconds the setTimeout which is already ended cleared and we just began another one
    // ****** we can conceder this process as checking if an event is not happening for a while
let timer;
function showAndHide(){
    showElement(mainHeader)
    clearTimeout(timer);        
    timer = setTimeout(()=>{
        hideElement(mainHeader)
    }, 1000);
}
/**
 * End Main Functions
 * Begin Events
 * 
*/
    mainHeader.addEventListener('click',scrollTO)
    document.addEventListener('scroll', showAndHide)

// Build menu 
buildNav()
// Scroll to section on link click
scrollTo()
// Set sections as active
addActive()
