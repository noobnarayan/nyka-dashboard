import { useDispatch } from "react-redux";
import AllRoutes from "./routes/AllRoutes";
import { useEffect } from "react";
import { getCurrentUser } from "./redux/Auth/action";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <div className="font-Poppins">
      <AllRoutes />
    </div>
  );
}

export default App;
