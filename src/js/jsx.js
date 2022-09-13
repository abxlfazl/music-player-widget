function dom(tag, props, ...children) {
  if (typeof tag === "function") return tag(props, ...children);

  function addChild(parent, child) {
    if (Array.isArray(child)) {
      child.forEach((nestedChild) => addChild(parent, nestedChild));
    } else {
      parent.appendChild(
        child.nodeType ? child : document.createTextNode(child.toString())
      );
    }
  }

  const element = document.createElement(tag);

  Object.entries(props || {}).forEach(([name, value]) => {
    if (name.startsWith("on") && name.toLowerCase() in window) {
      element[name.toLowerCase()] = value;
    } else if (name === "style") {
      Object.entries(value).forEach(([styleProp, styleValue]) => {
        element.style[styleProp] = styleValue;
      });
    } else {
      element.setAttribute(name, value.toString());
    }
  });

  children.forEach((child) => {
    addChild(element, child);
  });

  return element;
}
