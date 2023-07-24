import './App.css';
import { Provider } from 'react-redux';
import store from '../../redux/store';

import MainPage from '../MainPage/MainPage';
// import ComicsWithImage from '../ComicsWithImage/ComicsWithImage';

function App() {
  return (
    <Provider store={store}>
      <MainPage />
      {/* <ComicsWithImage /> */}
    </Provider>
  )
}

export default App;
