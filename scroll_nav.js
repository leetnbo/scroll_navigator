function scroll_navigator(options = {}) {

  let isMobileWidth = (document.documentElement.clientWidth<768)?true:false;

  //options
  let regionClassName = options.regionClassName || "fullRegion";
  let navigatorClassName = options.navigatorClassName || "Quick-navigation";
  let containerClassName = options.containerClassName || "body";
  let throttleTime = ('throttleTime' in options  && options.throttleTime>50 && options.throttleTime<=500)?options.throttleTime: 200 ;
  
  //NavRegions
  let windowHeight = document.documentElement.clientHeight;
  let regions = document.getElementsByClassName(regionClassName); 
  let regionIndex = document.querySelector(`.${navigatorClassName}`);
  let lastScrollTop = 0;
  for (let i = 0; i < regions.length; i++) {
    let region = regions[i];
    region.id = `navRegion_${i + 1}`;
    let anchor = document.createElement("a");
    if (i == 0) {
      anchor.classList.add("active");
    }
    anchor.textContent = i + 1;
    anchor.id = `index${i}`;
    anchor.addEventListener("click", () => {
      region.scrollIntoView({ behavior: "smooth" });
    });
    regionIndex.appendChild(anchor);
  }

  function throttle(func, delay) {
    let timeoutId;
    return function () {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          func();
          timeoutId = null;
        }, delay);
      }
    };
  }
  function handleScroll() {
    let bodyHeight = (containerClassName=="body")?document.body.clientHeight:document.querySelector(`.${containerClassName}`).clientHeight;
    let regionsHeight = 0;
    let boundingTop = regions[0].offsetTop;
    let boundingBottom = 0;   
    let regionsData = [];
    for (let i = 0; i < regions.length; i++) {
      let region = regions[i];
      let offsetTop = region.offsetTop;
      let clientHeight = region.clientHeight;
      regionsHeight += clientHeight;
      let regionData = {
        index: i,
        id: region.id,
        offsetTop,
        clientHeight,
      };
      regionsData.push(regionData);
    }
    boundingBottom = bodyHeight - boundingTop - regionsHeight;  
    let scrollTop = document.documentElement.scrollTop || 0;
    if (scrollTop >= boundingTop*0.6 && scrollTop < bodyHeight - boundingBottom -  regions[regions.length - 1].clientHeight*0.6 && !isMobileWidth) {
      document.querySelector(`.${navigatorClassName}`).style.display = "flex";
      let currentIndex = null;
      let scrollDirection = scrollTop > lastScrollTop ? "down" : "up";    
      for (let i = 0; i < regionsData.length; i++) {
        let regionData = regionsData[i];
        let rectBottom = document
          .getElementById(`${regionData.id}`)
          .getBoundingClientRect().bottom;
        let clientHeight = regionData.clientHeight;
        if (!currentIndex && rectBottom > 0) {
          if (scrollDirection == "down") {
            //向下滑動
            if (rectBottom < windowHeight - clientHeight*0.6 ) {
              currentIndex = regionData.index + 1;
            } else {
              currentIndex = regionData.index;
            }
          } else if (scrollDirection == "up") {
            //向上滑動
            if (rectBottom > windowHeight - clientHeight*0.4 ) {
              currentIndex = regionData.index;
            } else {
              currentIndex = regionData.index+1 ;
            }
          }
          lastScrollTop = scrollTop;
          break;
        }
      }
      let activeAnchor = document.querySelector(
        `.${navigatorClassName} a.active`
      );
      if (activeAnchor) {
        activeAnchor.classList.remove("active");
      }
      let currentAnchor = document.querySelector(
        `.${navigatorClassName} a[id="index${currentIndex}"]`
      );
      if (currentAnchor) {
        currentAnchor.classList.add("active");
      }else{
        document.querySelector(`.${navigatorClassName}`).style.display = "none";
      }
    } else {
      document.querySelector(`.${navigatorClassName}`).style.display = "none";
    }
  }
  function handleResize() {
    isMobileWidth = (document.documentElement.clientWidth<768)?true:false;
    handleScroll();
  }
  window.addEventListener("scroll", throttle(handleScroll, throttleTime));
  window.addEventListener("resize", throttle(handleResize, throttleTime));
}
