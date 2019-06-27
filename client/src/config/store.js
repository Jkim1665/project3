import { createStore, combineReducers } from 'redux';
import playerReducer from '../components/player/reducer';
import mapReducer from '../components/map/reducer';
import coinReducer from "../components/Coins/reducer";
import levelReducer from "../components/Level/reducer";
import modalReducer from "../components/map/reducerModal";

//reducer
const rootReducer = combineReducers({
  player: playerReducer,
  map: mapReducer,
  coin: coinReducer,
  level: levelReducer,
  modal: modalReducer,
})

//store
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export default store