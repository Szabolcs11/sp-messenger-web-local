import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Route, Routes, useParams } from 'react-router-dom';
import Auth from "./Pages/Auth";
import Index from "./Pages/Index";
import Profile from "./Pages/Profile";
import { ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink } from "@apollo/client"
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import Navigationbar from "./Components/Navigationbar";
import Users from "./Pages/Users";
import DirectMessage from "./Components/DirectMessage";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { useNavigate } from 'react-router-dom';



const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/graphql",
  options: {
    reconnect: true
  }
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
})


function App() {
  const notify = () => toast("Wow so easy!");
  const [user, setUser] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  const navigate = useNavigate()

  useEffect(() => {
    const {token} = cookies
    // console.log(user)
    if(token) {
      axios.get('http://localhost:1337/api/users/me', {
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then(res=> {
        // console.log(res.data)
          if (res.data) {
            setUser(res.data)
          }
          else {
            navigate("/auth")
            setUser(false)
          }
      })
    } else {
      navigate("/auth")
      setUser(false)
    }
    // console.log(user)
  }, [])


  if (user == null) {
    return (null)
  }

  return (
    <ApolloProvider client={client}>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      <div className="Main-Container">
          {user &&
          <Navigationbar user={user}/>
          }
        <Routes>
          {
            user ?
            <>
              {/* <Route path='/' element={<Index UserDatas={user}/>}></Route> */}
              <Route path='/messages/:id' element={<DirectMessage UserDatas={user}/>}></Route>
              {/* <Route path='/messages/:id/:name' element={<DirectMessage UserDatas={user}/>}></Route> */}
              <Route path='/profile' element={<Profile UserDatas={user}/>}></Route>
              <Route path='/users' element={<Users UserDatas={user}/>}></Route>
            </>
            :
            <Route path="/auth"  element={<Auth/>}></Route>
          }
          {/* <Route element={() => <h1>404</h1>} ></Route> */}
        </Routes>
      </div>
    </ApolloProvider>
  );
}


// return (
//   <ApolloProvider client={client}>
//     <div className="Main-Container">
//       <Routes>

//             {
//               user ?
//               <>
//                 <Route path='/' element={<Index UserDatas={user}/>}></Route>
//                 <Route path='/profile' element={<Profile UserDatas={user}/>}></Route>
//               </>
//               :
//                 <Route path="/auth" element={<Auth/>}></Route>
//               }
//       </Routes>
//     </div>
//   </ApolloProvider>
// );



// return (
//   <ApolloProvider client={client}>
//   <div className="Main-Container">
//     <Routes location={user ? "/" : "/auth"}>
//       {user ? 
//         <>
//           <Route path='/' element={<Index UserDatas={user}/>}></Route>
//           <Route path='/profile' element={<Profile UserDatas={user}/>}></Route>
//         </>
//       : 
//         <Route path="/auth" element={<Auth/>}></Route>
//       }

//     </Routes>
//   </div>
// </ApolloProvider>
// );


// useEffect(() => {
//   const {token} = cookies

//   if(token) {
//     const resfunc = async () => {

//       const res = await axios.get('http://localhost:1337/api/users/me', {
//         headers: {
//           Authorization: "Bearer " + token,
//         }
//       })
//       if (res.data) {
//         setUser(res.data)
//       }
//       else {
//         setUser(false)
//       }
//     }
//       // axios.get('http://localhost:1337/api/users/me', {
//       //   headers: {
//       //     Authorization: "Bearer " + token,
//       //   },
//       // }).then(res=> {
//       //   // console.log(res.data)
//       //     if (res.data) {
//       //       setUser(res.data)
//       //     }
//       //     else {
//       //       setUser(false)
//       //     }
//       // })
//   }
//   setUser(false)
// }, [])

export default App;
