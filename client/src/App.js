import './App.css';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import HomePage from '../src/scenes/homePage/index';
import SignIn from '../src/scenes/signInPage/index';
import SignUp from "../src/scenes/signUpPage/index"
import ForgotPassword from './scenes/updatePassword/forgotPassword';
import ChangePassword from './scenes/updatePassword/changePassword';
import Canvas from './scenes/canvas';

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="App" >
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={isAuth ? <ChangePassword /> : <Navigate to="/signin"/>} />
          <Route path="/" element={isAuth ? <HomePage /> : <Navigate to="/signin"/>}/>
          <Route path="/edit/:fileID" element={isAuth ? <Canvas /> : <Navigate to="/signin"/>}/>
          <Route path="*" element={isAuth ? <Navigate to="/" /> : <Navigate to="/signin" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;



{/* <Route path="/daybook-entries" element={isAuth ? <DaybookEntries /> : <Navigate to="/signin"/>}/>
<Route path="/daybook-entries/:daybookID" element={isAuth ? <DaybookEntry /> : <Navigate to="/signin"/>}/>
<Route path="/daybook-entries/:daybookID/:fileID" element={isAuth ? <AnalysedFile /> : <Navigate to="/signin"/>}/>
<Route path="/workspace/:workspaceID" element={isAuth ? <HomePage /> : <Navigate to="/signin"/>}/>
<Route path="/workspace/:workspaceID/daybook" element={isAuth ? <DaybookEntries /> : <Navigate to="/signin"/>}/>
<Route path="/workspace/:workspaceID/daybook/:daybookID" element={isAuth ? <DaybookEntry /> : <Navigate to="/signin"/>}/>
<Route path="/workspace/:workspaceID/daybook/:daybookID/:fileID" element={isAuth ? <AnalysedFile /> : <Navigate to="/signin"/>}/>
<Route path="/workspace/:workspaceID/files/:fileID" element={isAuth ? <AnalysedFile /> : <Navigate to="/signin"/>}/>
<Route path="/workspace/:workspaceID/upload" element={isAuth ? <FileUpload /> : <Navigate to="/signin"/>}/> */}