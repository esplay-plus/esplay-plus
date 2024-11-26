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

//autoaccept
export function aaccept() {
  //Observer the rootelement,
  observeDOM('.root', (rootElement) => {
    const button = rootElement.querySelector(
      'button.unselectable.inline-flex.items-center.justify-center.rounded-xl.font-medium.transition-colors.focus-visible\\:outline-none.disabled\\:pointer-events-none.bg-theme-500.hover\\:bg-theme-600.text-gray-800.ring-theme-600.focus-visible\\:ring-2.disabled\\:bg-gray-700.disabled\\:text-gray-400.h-6.px-2.text-xs.gap-1'
    );
    if (button && button.innerHTML === 'Gå med') {
      button.click();
    }
  });
}