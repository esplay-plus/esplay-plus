export function addStyledElement(targetElement) {
    // Prevent duplicate elements
    if (targetElement.querySelector(".extension-active-indicator")) {
      return;
    }
  
    // Create a new element
    const newElement = document.createElement("div");
    newElement.textContent = "Esplay+"; // Set the content of the new element
  
    // Add the desired classes to match the style
    newElement.className =
      "extension-active-indicator h-full px-4 p-2 text-black transition-all border-b border-b-transparent flex h-full items-center bg-white rounded-2xl";
  
    // Append the new element to the target location
    targetElement.appendChild(newElement);
  }
  