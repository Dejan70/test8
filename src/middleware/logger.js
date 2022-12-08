const loggerMiddleware = store => next => action => {
    let result = next(action);
    if (window._DEV_MODE) {
        console.log('dispatching:', action);
        console.log('next store state:', store.getState());
    }
    return result;
};

export default loggerMiddleware