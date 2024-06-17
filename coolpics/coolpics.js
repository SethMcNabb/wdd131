/*
const menuButton = document.querySelector(".menu-button");
const mainMenu = document.querySelector(".main-menu");

menuButton.addEventListener("click", function() {
    mainMenu.classList.toggle("hide");
});


function handleResize() {
  const menu = document.querySelector(".menu");
  if (window.innerWidth > 1000) {
    menu.classList.remove("hide");
  } else {
    menu.classList.add("hide");
  }
}

handleResize();
window.addEventListener("resize", handleResize);


function viewerTemplate(pic, alt) {
  return `<div class="viewer">
        <button class="close-viewer">X</button>
        <img src="images/norris-full.jpeg" alt="alt description">
    </div>`;
}

function viewHandler(event) {
	// create a variable to hold the element that was clicked on from event.target

	// get the src attribute from that element and 'split' it on the "-"

	// construct the new image file name by adding "-full.jpeg" to the first part of the array from the previous step

	// insert the viewerTemplate into the top of the body element
	// (element.insertAdjacentHTML("afterbegin", htmltoinsert))

	// add a listener to the close button (X) that calls a function called closeViewer when clicked

}
*/

/*menu button functionality*/
const menuButton = document.querySelector(".menu-button");
const mainMenu = document.querySelector(".main-menu");

menuButton.addEventListener("click", function() {
  mainMenu.classList.toggle("hide");
});


/*handle resize*/
function handleResize() {
  const menu = document.querySelector(".main-menu");
  if (window.innerWidth > 1000) {
    menu.classList.remove("hide");
  } else {
    menu.classList.add("hide");
  }
}

handleResize();
window.addEventListener("resize", handleResize);


/*image viewer*/
function viewerTemplate(pic, alt) {
  return `<div class="viewer">
    <button class="close-viewer">X</button>
    <img src="${pic}" alt="${alt}">
  </div>`;
}

function viewHandler(event) {
  const clickedElement = event.target;
  const src = clickedElement.src.split("-");
  const fullImagePath = `${src[0]}-full.jpeg`;
  const viewerHTML = viewerTemplate(fullImagePath, clickedElement.alt);
  document.body.insertAdjacentHTML("afterbegin", viewerHTML);
  const closeButton = document.querySelector(".close-viewer");
  closeButton.addEventListener("click", closeViewer);
}

function closeViewer() {
  const viewer = document.querySelector(".viewer");
  viewer.remove();
}

const gallery = document.querySelector(".gallery");
gallery.addEventListener("click", viewHandler);