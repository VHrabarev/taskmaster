import React, { useEffect, useState } from "react";
import { checkUserStatus } from "../../store/reducers/userReducer";
import { useAppDispatch, useAppSelector } from '../../hook';
import { Box, Collapse, Alert, AlertTitle, IconButton } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserTasks } from "../../store/reducers/taskReducer";
import firebaseApp from '../../api/firebase';
import Header from "../Header";
import Main from "../Main";
import Footer from "../Footer";
import CloseIcon from '@mui/icons-material/Close';

const App: React.FC = function() {
  const [height, setHeight] = useState(window.innerHeight - 1);
  const { userUID } = useAppSelector(store => store.user.userInfo);
  const { status, name, message } = useAppSelector( store => store.user.error);
  const [alertShown, setAlertShown] = useState<boolean>(status);
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
          avatarUrl: user.photoURL,
          userUID: user.uid,
        }))
      };
    });
    if(userUID.length) {
      dispatch(getUserTasks(userUID));
    };
    window.addEventListener("resize", () => handleResize);
    return window.removeEventListener("resize", () => handleResize);
  }, [userUID]);

  useEffect(() => setAlertShown(status), [status]);

  const alertAction = (
    <IconButton
      aria-label="close"
      color="inherit"
      size="small"
      onClick={() => setAlertShown(false)}
    >
      <CloseIcon fontSize="inherit" />
    </IconButton>
  );

  return (
    <Box sx={{ backgroundColor: "#C7D2E2", minHeight: height, position: "relative" }}>
      <Header />
      <Main />
      <Footer />
      <Collapse in={alertShown} sx={{ position: "absolute", left: 0, bottom: 0, width: "100%" }}>
        <Alert severity="error" action={alertAction}>
          <AlertTitle>{name}</AlertTitle>
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
}

export default App;