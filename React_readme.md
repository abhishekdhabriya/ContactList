Events: 
onClick

Events in JavaScript only takes String as value to a property, but with react we can pass them any expression or function using curly brace.


Normally state is managed by top level component and it will propagate the information in sub component. 


Stateful components performs all the business logic and manage state, whereas Stateless components just are pure functions which takes in props and 
render UI


we use ref and pass in a closure to get a reference to actual DOM element.

and the closure is a function which get invoked whenever this element is created or change. 
closure is going to get invoked with the actual physical element by react whenever this element is created or change and we will capture that element in a local variable during render. 


Stateless components are nothing more than a instance of JavaScript object which describes React that we need this special component in DOM. 
// we cannot call method, create instance as it's just the shadow DOM. 

Stateless component doesn't get React lifecycle methods. Only Stateful component have lifecycle events.

htmlFor
className

Stateful Components and Stateless components 
passing Props to child component
creating initial state and updating state which causes React to call render.
Used PropTypes for validation in stateless components.
Pass in properties from top/stateful component to stateless component.
Bubble up the events from stateless component to parent component.
Call stateless components methods from Parent/Top level component.
Accessing DOM elements in components using Ref with closure. 
Used React lifecycle methods 




add default state example


