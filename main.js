
// Add parallax class in HTML to every element you want to apply this script to.
// Also add an data-elevation attribute to specify the height.

// Example:
// <div class="et cetera parallax" data-elevation="1"> </div>

// Made by Matija Fućek


class EasyParallax {

  constructor(document) {
    this.parallaxObjects = [];
    this.sensitivity = 0.02;

    this.scrollSensitivity = 0.05;
    this.widthLimit = 720;
    // Mobile width lock

    this.onlyScroll = false;
    // If onlyScroll is true, mouse movement will be ignored.

    this.scrollSpeed = 1;
    // scrollSpeed
    // For a zero-value, scroll position will be ignored.
    // For other values, positive or negative, scroll will be accounted for.
    
    this.init();

    this.update( {pageX: screen.availHeight/2 / 2, pageY: screen.availWidth/2} );
    document.addEventListener('mousemove', (e) => { this.update(e); });
    document.addEventListener('wheel', (e) => { this.update(e); });
    window.addEventListener('scroll', (e) => { this.update(e); });

    window.addEventListener('resize', () => {
      if (screen.availWidth < this.widthLimit) {
        this.setScrollMode()
      } else {
        this.setMouseMode()
      }
    })
  }

  init() {
    this.parallaxObjects = [];

    document.querySelectorAll('.parallax').forEach(e => {
      let object = {
        dom: e,
        elevation: e.attributes['data-elevation'].value,
        initial: { top: 0, left: 0 },
        offset: { top: 0, left: 0 },
        originalTransform: e.style.transform
      };
      
      object.initial.top = ( 2 * e.getBoundingClientRect().top + e.getBoundingClientRect().height ) / 2;
      object.initial.left = ( 2 * e.getBoundingClientRect().left + e.getBoundingClientRect().width ) / 2;

      object.dom.style.transform = 'translate(0px, 0px)';
      
      object.offset.top = ( 2 * e.getBoundingClientRect().top + e.getBoundingClientRect().height ) / 2;
      object.offset.left = ( 2 * e.getBoundingClientRect().left + e.getBoundingClientRect().width ) / 2

      if ( object.originalTransform ) {
        object.dom.style.transform = object.originalTransform;
      } else {
        object.dom.style.removeProperty('transform');
      }
      
      
      this.parallaxObjects.push(object);
    });    
  }

  relist() {
    this.parallaxObjects.forEach(element => {
      element.dom.style.transform = element.originalTransform;
      element.initial.top = ( 2 * element.dom.getBoundingClientRect().top + element.dom.getBoundingClientRect().height ) / 2;
      element.initial.left = ( 2 * element.dom.getBoundingClientRect().left + element.dom.getBoundingClientRect().width ) / 2;

      element.dom.style.transform = 'translate(0px, 0px)';
      
      element.offset.top = ( 2 * element.dom.getBoundingClientRect().top + element.dom.getBoundingClientRect().height ) / 2;
      element.offset.left = ( 2 * element.dom.getBoundingClientRect().left + element.dom.getBoundingClientRect().width ) / 2

      if ( element.originalTransform ) {
        element.dom.style.transform = element.originalTransform;
      } else {
        element.dom.style.removeProperty('transform');
      }
    });
  }
    
  update(event) {      
    this.parallaxObjects.forEach(element => {
      let offset = {x:0, y:0}
      
      if (!this.onlyScroll) {
        offset.x = - ( element.initial.left - event.pageX ) * this.sensitivity * element.elevation,
        offset.y = - ( element.initial.top - event.pageY ) * this.sensitivity * element.elevation

        // offset.y += (window.scrollY - element.offset.top + screen.availHeight/2) * this.scrollSensitivity;
      } else {
        offset.x = 0;
        offset.y += ((screen.availHeight / 2 + window.scrollY * this.scrollSpeed - element.offset.top) * this.scrollSensitivity * element.elevation);
      }

      offset.x += element.initial.left - element.offset.left
      offset.y += element.initial.top - element.offset.top

      let a = element.dom;
      a.style.transform = `translate(${offset.x}px, ${offset.y}px)`;
      a.style.transform = `translate(${offset.x}px, ${offset.y}px);`;
    });
  }
  
  toggleScrollMode() {
    this.onlyScroll = this.onlyScroll ? false : true; 
  }
  setScrollMode() {
    this.onlyScroll = true;
  }
  setMouseMode() {
    this.onlyScroll = false;
  }

}

let a = new EasyParallax(document);