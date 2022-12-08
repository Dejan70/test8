# Intro

Before diving into how and why of React/Redux/Saga architecture, we must declare what the problem is and what we are trying to solve. As a UI building library React is simple in its nature, there is a state and state that determines what is rendered to the user. The problem lies in the fact that there is an inescapable complexity as a product of code base growing. A state becomes complex, and it becomes less obvious how to structure code.

The following React Redux Saga Architecture guide assumes a solid grasp of Javascript (ES6) and React in general. If you are not familiar with "React", get started by visiting [link](https://reactjs.org/docs/hello-world.html)

## Understanding state in JavaScript web applications

Let us examine simplistic flow where the user clicks a button and modal appears. Even on this light interaction, there is a state and state change that occurs after a user action.

For illustration, an initial state would look something like this:

```javascript
const state = {
  modalOpen: true
}
```

After the button clicked and modal presented, the state would change and would look like:

```javascript
const state = {
  modalOpen: false
}
```

to put this example into "React" perspective code extract would look like this:

```javascript
import React, { Component } from "react";

class ExampleReactComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }

  render() {
    const { modalOpen } = this.state;
    
    return (
        <React.Framgnet>
            {modalOpen && (
                <div id="modal">
                    <button onClick={() => this.setState({modalOpen: false})}>Close modal</button>
                    Modal content
                </div>
            )}
            
            <button onClick={() => this.setState({modalOpen: true})}>Open modal</button>
        </React.Framgnet>
    );
  }
}
```

Here we have the [stateful](https://reactjs.org/docs/state-and-lifecycle.html) React component that holds data that determines what is rendered to the user.

The state could change in response to actions and events. In this case, the local component's state is changed via "this.setState()" function when button is clicked.

In general, a typical JavaScript application contains many types of state for various data. For example, it can be "state" for data fetched via API, current page URL, markings for selected items, list of errors to present to a user, and so forth.

Most JavaScript UI libraries, like React, have mechanisms to manage the state of its components without the need for external libraries. 

This approach does well for applications with few components, but as the application grows, managing states shared across components becomes a challenging task.

In an app where data shared among components, it might be hard to find the right place to store the state.

# Redux to the rescue

Put, [Redux](https://redux.js.org/) is a state management tool. "Redux" is framework agnostic, although it can be used with many other libraries it is usually coupled with "React".

The way "Redux" works is simple, the state of the entire application is kept in a central store, and each component can access any state value that it needs from this store.

There are [three foundation elements](https://redux.js.org/introduction/three-principles/) of "Redux" system:
- store
- actions
- reducers

### Three principles

#### Store in Redux

The store holds the application state. As stated by "Redux" creators store is ["Single source of truth - The state of your whole application is stored in an object tree within a single store."](https://redux.js.org/introduction/three-principles/).

```javascript
import { createStore } from "redux";
import appDataReducers from "./data/reducers";

const initialStoreState = {};

const store = createStore(appDataReducers, initialStoreState);
```

Store object is the result of calling "createStore", a function from the Redux library. "createStore" takes a reducer as the first argument and initial store state as the second argument.

#### Reducers in Redux

Reducer is a standard JavaScript function that takes two arguments, the current state of an application, an action, and, as a result, reducer returns a new state. 

The reducer must be a pure function. A pure function is one that given the same input returns the same output.

In general, Reducers specify how the state of an application changes in response to an action sent to the store.

In the following example, when action to get new data is triggered, the application is put into the loading state, when there is a new data state is updated to reflect change as well.

```javascript
const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_RESOURCE':
        return Object.assign({}, state, {
            data: null,
            isLoading: true,
            error: false,
        });
    case 'DONE_GET_RESOURCE':
        return Object.assign({}, state, {
            data: action.data,
            isLoading: false,
            error: false
        });
    case 'ERROR_GET_RESOURCE':
        return Object.assign({}, state, {
            data: null,
            isLoading: false,
            error: true
        });
    default:
        return state;
    }
};

export default rootReducer;
```

#### Actions in Redux


Since the state is immutable and cannot change in place, the only way to change the state is to emit an action that sends data from the application to "Redux" store. Action can be dispatched when there is user interaction when API call returns data when there is a form of submission, and so on.


Actions are sent using the "store.dispatch()" method. Actions are JavaScript objects that have a "type" property to indicate the type of action to be carried out, and they optionally have a payload property that contains the information that should be worked on by the action.

```javascript
export function getResource(data) {
    return {
        type: 'GET_RESOURCE',
        data: data
    };
}
```

here is the example of simple "loadResource" action created via a function call, in this case, we dispatch action when the user clicks on a button:

```javascript
<button 
    onClick={() => {
        this.props.dispatch(getResource({id: 1, user: 'john@doe.com'});
    }}
>Load new data for user</button>
```

### Integrating React with Redux

Although usually coupled with React, Redux is framework agnostic. It can be used with vanilla Javascript, Angular, or any other library.

You connect with two or three arguments depending on the use case:
- a mapStateToProps function
- a mapDispatchToProps function

"mapStateToProps" does what its name suggests, and it connects a part of the Redux state to the props of a React component. By doing so, a connected React component has access to the part of the store it needs.

"mapDispatchToProps" is similiar, but it connects "Redux" actions to "React props". This way, a connected "React" component can send messages to the store.

For example this would be "React" component connected to "Redux" store:

```javascript
import React, { Component } from "react";
import { connect } from "react-redux";
import { getResource } from "../../data/actions/resource";

function mapStateToProps(state) {  
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    getResourceForUser: user => dispatch(getResource(user))
  };
}

class ExampleReactReduxView extends Component {

  render() {
    const { resource } = this.props;
    
    const resourceList = getProp(resource, "data", []).map((item, i) => {
        return (
            <span>{i} - {item}</span>
        )
    });
    
    return (
        <React.Fragment>
            <button 
                onClick={() => {
                    this.props.getResourceForUser({id: 1, user: 'john@doe.com'});
                }}
            >Load new data for user</button>
            
            {!!resource.isLoading && (
                <div>Loading...</div>
            )}
            
            {resourceList}
        </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExampleReactReduxView);
```

### Redux Middleware

```javascript
const loggerMiddleware = store => next => action => {
    let result = next(action);
    
    console.log('dispatching:', action);
    console.log('next store state:', store.getState());
            
    return result;
};

export default loggerMiddleware
```

All examples so far dealt with changes inside application itself, but what about API calls or pieces of code that need to be executed asynchronous? 

# Introducing Redux Saga

Saga is a Redux middleware for managing side effects like API calls. Saga acts like aa separate thread in your application for dealing with impure actions API calls, storage access, and more.

Typical saga consists of two components, a worker function, and a watcher function.

```javascript
import {call, put, takeLatest} from "redux-saga/effects";
import Api from "../services/api";
import {
    doneGetResource,
    errorGetResource
} from "../actions/resource";

export function *getResourceCall(action) {

    const result = yield call(Api.getResource, user, action.data.query, action.data.resource);

    if (result && result.status === 0) {
        yield put(doneGetResource(result.data));
    } else {
        yield put(errorGetResource(result.data));
    }
}

export function* watchGetResource() {
    yield takeLatest('GET_RESOURCE', getResourceCall);
}
```

Given example works in following order:
- Take every action named GET_RESOURCE and for each action execute a worker saga.
- Inside the worker saga call API function named getResource.
- If the function succeeds, then dispatch (put) a new action that denotes success, alongside with a payload.
- If the function errors out, then dispatch (put) a new action that signals error, alongside with a payload (the error).

We can compose several saga functions pairs into one root saga:

```javascript
import {all} from "redux-saga/effects";
import {
    watchCreateResource,
    watchGetResource,
    watchUpdateResource,
    watchDeleteResource
} from "./resourceSaga";

/*
 * Single entry point to start all Sagas at once
 =========================================================================================*/
export default function *rootSaga() {
    yield all([
        watchCreateResource(),
        watchGetResource(),
        watchUpdateResource(),
        watchDeleteResource()
    ]);
}
```

If we apply saga middleware to one of the previous example where we create Redux store complete code would look like:

```javascript
import React, {PureComponent} from "react";
import {Provider as Redux} from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import appDataReducers from "./data/reducers";
import rootSaga from "./data/sagas";
import loggerMiddleware from "./middleware/logger";
import ExampleReactReduxView from "./views/exampleview";
const sagaMiddleware = createSagaMiddleware();

const initialStoreState = {};

let store = createStore(
    appDataReducers,
    initialStoreState,
    compose(
        applyMiddleware(
            sagaMiddleware,
            loggerMiddleware
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

sagaMiddleware.run(rootSaga);

export default class App extends PureComponent {

    render() {
        return (
            <Redux store={store}>
                <ExampleReactReduxView/>
            </Redux>
        );
    }
}
```
# Connecting the dots

If we put [React router](https://reacttraining.com/react-router/web) in to the mix and make single page application, we can represent architecture with the following diagram:

![](React-Redux-Saga%20Architecture.png)

Application is structured in layers of various components, root component loads locale files, and pass its props to the "redux" component, redux component passes its props to router component, which is in charge of determining which view to render.

In this instance, login view is rendered, and users interact with it by entering username and clicking log in button, login action is dispatched, saga middleware picks up action and make API call that updates store state on completion, after store is updated new state is passed to all connected views as props, in this case, ComponentDidUpdate on login view is called, and redirection to dashboard view is performed.

After dashboard view is constructed, ComponentDidMount is invoked and there action to get data is dispatched, again store is updated, and loading animation is presented to user at the same time saga middleware picks up action and informs store when API call returns results, as store is updated again with API call result ComponentDidUpdate is called on dashboard view triggering render again but this time with list of data fetched from API.
