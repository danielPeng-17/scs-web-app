import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas/rootSaga';
import { persistStore } from 'redux-persist'

export const getStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const store = configureStore({
        reducer: rootReducer,
        middleware: [sagaMiddleware],
        devTools: true
    });

    let persistor = persistStore(store);

    sagaMiddleware.run(rootSaga);

    return { store, persistor };
}