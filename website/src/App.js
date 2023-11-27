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
  const[genre,setGenre]=useState("");
  const[searchByGenre ,setSearchByGenre]=useState(false);
  const[user , setUser]=useState("LOGIN");
  const[liked,setLiked]=useState([]);
  const[byLiked,setByLiked]=useState(false);
  const[email ,setEmaill]= useState('');
  const[pass ,setPass]= useState('');

  

  return (
<context.Provider value={{data,setdata,genre,setGenre,searchByGenre,setSearchByGenre,user,setUser,
  liked,setLiked,byLiked,setByLiked,email,setEmaill,pass,setPass}} >
<BrowserRouter>
<Routes>
  <Route path='/' element={<>{user}<MiniDrawer ></MiniDrawer> </>}></Route>
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
