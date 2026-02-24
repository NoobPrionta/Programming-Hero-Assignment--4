1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Ans: Difference between getElementById, getElementsByClassName, querySelector, querySelectorAll
getElementById: Selects a single element using its unique ID. Returns one element. getElementsByClassName: Selects all elements with a given class name. querySelector: Selects the first element that matches a CSS selector. querySelectorAll: Selects all elements that match a CSS selector.

2. How do you create and insert a new element into the DOM?

Ans: To create and insert an element:
Create the element using createElement(). Add content or attributes. Insert it into the DOM using methods like appendChild(), append()

3. What is Event Bubbling? And how does it work?

Ans: Event Bubbling is a mechanism where an event starts at the target element and then propagates upward through its parent elements.
 So when you click a child element, the event is triggered on the child first, then its parent, then its grandparent.

4. What is Event Delegation in JavaScript? Why is it useful?

Ans: Event Delegation is a technique where a parent element handles events for its child elements using event bubbling. It is useful because:
It improves performance. It works for dynamically added elements. It keeps code cleaner.

5. What is the difference between preventDefault() and stopPropagation() methods?

Ans: Difference between preventDefault() and stopPropagation() preventDefault() stops the browser’s default behavior for an event.
 Ex: stopping form submission or link navigation. stopPropagation() stops the event from propagating (bubbling or capturing) through the DOM.            
