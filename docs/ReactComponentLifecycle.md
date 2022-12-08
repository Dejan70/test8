# Commonly Used Lifecycle Methods

## Mounting Methods

Mounting is when a component is rendered to the DOM for the first time.

### constructor()

In general, there are two reasons to use a React constructor:

- Set up your components initial state
- Bind event handler methods to an instance

Use setState? No, use this.state in the constructor.

### render() 

if you’ve written even one React component, you are familiar with render, the only method you must define in a React.Component. The render function does not modify component state, it returns the same result each time it’s invoked, and it does not directly interact with the browser. Examines this.props and this.state to return one of the following:

- React Elements (JSX)
- Arrays and Fragments
- Portals
- Strings/numbers
- Booleans or null

Note: If you need to interact with the browser, use componentDidMount instead — keep render pure.

Can use setState here? No.

### componentDidMount()

This method runs immediately after the component output has been rendered to the DOM. It will not get run in node but will in the browser. This makes it so your component can render first then you can go get the data you need. In your component, you can throw up a loader during this time. Also if you need to interact with the DOM (like if you were wrapping D3) this would be the place to do it. Furthermore, if you need to load data from a remote endpoint this is a good place to instantiate the network request
    
Can use setState here? Yes, but in most cases you should be able to assign the initial state in the constructor() instead. Be careful — calling setState in componentDidMount can cause performance issues. In some cases it may be necessary — like modals and tooltips.

## Updating Methods

### componentDidUpdate()

This method is invoked immediately after updating occurs on renders after the first render (where it’s NOT called). It’s a good place to do network requests as long as you compare the current props to previous props (e.g. a network request may not be necessary if the props have not changed).

Call setState()? You may call setState() in componentDidUpdate() but note that it must be wrapped in a condition or you will cause an infinite loop. Can also cause performance issues.

## Unmounting methods

### componentWillUnmount()

This method runs right before the component is taken off the DOM. Most common thing to do here is get rid of external event listeners or other things you need to clean up.

Can call setState()? No. This is where the component is being terminated.

## Rarely used methods

### static getDerivedStateFromProps()

Exists for where the state depends on changes in props over time. For example, it might be handy for implementing a component that compares its previous and next children to decide which of them to animate in and out. If you need to perform a side effect (for example, data fetching or an animation) in response to a change in props, use componentDidUpdate() lifecycle instead.

### shouldComponentUpdate()

This method returns a boolean letting React know if it should re-render the component. This is for performance purposes. If you have a component that will never update (like a static logo or something) you can just return false here.

### Diagram illustrating React component lifecycle methods

![](react-lifecycle.jpeg)