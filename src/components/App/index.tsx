import React, { useEffect } from "react";
import { checkUserStatus } from "../../store/reducers/userReducer";
import { useAppDispatch } from '../../hook';
import Header from "../Header";
import Main from "../Main";
import Footer from "../Footer";


const App: React.FC = function() {
  const dispatch = useAppDispatch();

  useEffect(() => void dispatch(checkUserStatus()) ,[]);

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;