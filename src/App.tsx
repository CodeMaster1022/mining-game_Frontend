// import SpaceMinerTycoon from "./pages/SpaceMiner";
import { Provider } from "react-redux";
import store from "./redux/store";
function App() {
  return (
    <Provider store={store}>
      <></>
      {/* <SpaceMinerTycoon /> */}
    </Provider>
  );
}

export default App;
