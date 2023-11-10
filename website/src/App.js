import MiniDrawer from './comp/Drawer';
import {Routes,Route, BrowserRouter}from 'react-router-dom';
import { context } from './comp/context';
import { useState } from 'react';
import Login from './comp/login';
import Sign from './comp/signin';
import 'bootstrap/dist/css/bootstrap.min.css';
import MiniDrawer2 from './comp/Drawer2';
import SimpleBottomNavigation from './comp/bottom';

function App() {



  const[data,setdata]=useState("Chetan bhagat");

  return (
<context.Provider value={{data,setdata}} >
<BrowserRouter>
<Routes>
  <Route path='/' element={<><MiniDrawer></MiniDrawer> </>}></Route>
  <Route path='/login' element={<><MiniDrawer2 name="Login"></MiniDrawer2><Login/></>} />
  <Route path='/Signin' element={<><Sign></Sign><MiniDrawer2 name="Sign In"></MiniDrawer2></>}></Route>
 </Routes>
 <br/><br/>
<SimpleBottomNavigation/>
 </BrowserRouter>  

</context.Provider>
 

 
  );
}

export default App;
