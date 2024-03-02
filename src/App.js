import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { actionType } from "./Components/Context/reducer";
import { useStateValue } from "./Components/Context/state-context";
import CreateContainer from "./Components/CreateContainer";
import Header from "./Components/Header";
import MainContainer from "./Components/MainContainer";
import { getALlFoodItems } from "./Components/Utils/FirebaseFuncs";

function App() {
  const [_, dispatch] = useStateValue();

  const fetchData = async function () {
    const data = await getALlFoodItems();
    dispatch({
      type: actionType.SET_FOOD_ITEMS,
      foodItems: data,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-screen max-w-full h-auto flex flex-col bg-primary">
      <Header />

      <main className="mt-24 px-4 py-4 w-full md:px-16">
        <Routes>
          <Route path="/*" element={<MainContainer />} />
          <Route path="/create-item" element={<CreateContainer />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
