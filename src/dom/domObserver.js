export function observeDOM(selector, callback) {
    const observer = new MutationObserver(() => {
      const targetElement = document.querySelector(selector);
      if (targetElement) {
        callback(targetElement);
      }
    });
  
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  
    console.log(`Observing DOM changes for selector: ${selector}`);
  }
  