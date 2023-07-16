import React, { useEffect, useState } from "react";
import { checkUserStatus } from "../../store/reducers/userReducer";
import { useAppDispatch } from '../../hook';
import { Box } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from '../../api/firebase';
import Header from "../Header";
import Main from "../Main";
import Footer from "../Footer";

const App: React.FC = function() {
  const [height, setHeight] = useState(window.innerHeight - 1);
  const dispatch = useAppDispatch();

  const handleResize = function() {
    setHeight(window.innerHeight - 1);
  };

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    onAuthStateChanged(auth, (user) => {
      if(user) {
        dispatch(checkUserStatus({
          loginStatus: true,
          fullName: user.displayName,
          email: user.email,
          phone: user.phoneNumber,
          avatarUrl: user.photoURL,
        }))
      };
    });
    window.addEventListener("resize", () => handleResize);
    return window.removeEventListener("resize", () => handleResize);
  } ,[]);

  return (
    <Box sx={{ backgroundColor: "#C7D2E2", minHeight: height }}>
      <Header />
      <Main />
      <Footer />
    </Box>
  );
}

export default App;