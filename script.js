//checking if these variables were already declared
if (typeof stopBtn === 'undefined') {
    var stopBtn;
  }
  if (typeof currentEle === 'undefined') {
    var currentEle;
  }
  if (typeof itemList === 'undefined') {
    var itemList = [];
  }
  if (typeof item === 'undefined') {
    var item;
  }
  
  //create a button to exit font finder
  stopBtn = document.createElement('div');
  stopBtn.style.cssText =
    'position: Fixed; top: 2rem; right: 1rem; color: #ecf0f1; font-size: 1rem; background: #3A405A;padding: .2rem; cursor: pointer;z-index:999;';
  stopBtn.textContent = 'Stop';
  
  //add button to the body
  document.querySelector('body').appendChild(stopBtn);
  
  function currentTab() {
    return;
  }
  
  //adding a eventlistnener to listen devtool enable/disable
  stopBtn.addEventListener('click', async () => {
    disableFontFinder();
    let currentTab = await browser.storage.local.get('currentTab');
  
    browser.storage.local.set({ [currentTab.currentTab]: false });
  });
  
  //create a new DIV element as item
  item = document.createElement('div');
  item.style.cssText =
    'position: absolute; color: #ecf0f1; font-size: 16px; background: #3A405A;padding: 5px; z-index: 998';
  item.textContent = 'Hello world!';
  document.querySelector('body').appendChild(item);
  
  //return the poistion of cursor
  function getElementOncursor(e) {
    let Ele = document.elementFromPoint(e.clientX, e.clientY);
    return Ele;
  }
  
  //return true if object is HTMLElement
  function isElement(o) {
    return typeof HTMLElement === 'object'
      ? o instanceof HTMLElement //DOM2
      : o &&
          typeof o === 'object' &&
          o !== null &&
          o.nodeType === 1 &&
          typeof o.nodeName === 'string';
  }
  
  //handles mouse move
  function mouseMove(e) {
    item.style.top = e.pageY + 10 + 'px'; //updaing Yposition of the font viewer
    item.style.left = e.pageX + 10 + 'px'; //updaing Xpoition of the font viewer
  
    //getting the element that is under the cursor
    if (currentEle != getElementOncursor(e)) {
      currentEle = getElementOncursor(e);
  
      if (isElement(currentEle)) {
        let fontFamily = getComputedStyle(currentEle).fontFamily;
        item.textContent = `${fontFamily.split(',')[0]}`;
      }
    }
  }
  
  //handles mouseclick
  function mouseClick(e) {
    console.log('hello');
    let ele = document.createElement('div');
    ele.style.cssText =
      'position: absolute; color: #ecf0f1; font-size: 16px; background: #3A405A; padding: 5px; z-index: 998';
  
    try {
      document.querySelector('body').appendChild(ele);
      itemList.push(ele);
    } catch (error) {
      console.log(error);
    }
  
    ele.style.top = e.pageY + 'px'; //updaing Yposition of the font viewer
    ele.style.left = e.pageX + 'px'; //updaing Xpoition of the font viewer
  
    if (isElement(currentEle)) {
      let fontFamily = getComputedStyle(currentEle).fontFamily;
      let fontSize = parseInt(getComputedStyle(currentEle).fontSize);
      let fontWeight = parseInt(getComputedStyle(currentEle).fontWeight);
      let fontColor = getComputedStyle(currentEle).color;
      ele.innerHTML =
        `fontFamily: ${fontFamily}<br>` +
        `fontSize: ${fontSize}px<br>` +
        `Weight: ${fontWeight}<br>` +
        `color: ${fontColor}<br>` +
        'PreviewText : ' +
        `<span style='font-family: ${fontFamily} ;'>Hello World!</span>`;
    }
  }
  
  // this function handles the function to show font-family of current element
  function enableFontFinder() {
    //on mouse move update item's position to cursor position and call the getfont to get current elements fontfamily
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('click', mouseClick);
  }
  //remove all the eventlistener and elements added to the body as well reset varibles
  function disableFontFinder() {
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('click', mouseClick);
  
    if (item.parentElement) {
      item.parentElement.removeChild(item);
    }
  
    itemList.forEach((item) => {
      if (item.parentElement) {
        item.parentElement.removeChild(item);
      }
    });
  
    stopBtn.parentElement.removeChild(stopBtn);
  
    stopBtn = null;
    item = null;
    itemList = [];
  }
  
  //enabling fontfinder by default
  enableFontFinder();