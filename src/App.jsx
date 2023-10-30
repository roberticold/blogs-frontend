import Navbar from "./Navbar";
import Home from "./Home";
import Settings from "./Settings";
import { Route, Routes } from "react-router-dom";
import Create from "./Create";
import BlogDetails from "./BlogDetails";
import EditBlog from "./EditBlog";
import { useWindowSize } from "@uidotdev/usehooks";
import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signin from "./Signin";
import Signup from "./Signup";
import Page404 from "./Page404";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataLength, setDataLength] = useState();
  const [filterNames, setFilterNames] = useState();
  const [newInfo, setNewInfo] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState();
  const size = useWindowSize();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_ADDRESS}/blogs`)

      .then((response) => {
        

        setData(response.data.blogs);
        setDataLength(response.data.blogs.length);

        const filternames = [];
        response.data.blogs.forEach((element) => {
          if (!filternames.includes(element.author)) {
            filternames.push(element.author);
          }
        });
        setFilterNames(filternames);

        setError(null);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [newInfo,isLoggedIn]);

  // to fetch the user profile photo
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_ADDRESS}/user/getPhoto/${sessionStorage.getItem("id")}`
      )

      .then((response) => {
        setProfilePhoto(response.data.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [profilePhoto]);

  const handleFiltered = (value) => {
    if (value == "All") {
      setFilteredData(false);
      setDataLength(data.length);
    } else {
      const filtered = data.filter((e) => e.author === value);
      setFilteredData(filtered);
      setDataLength(filtered.length);
    }
  };

  const handleNewInfo = () => {
    newInfo ? setNewInfo(false) : setNewInfo(true);
  };

  let logout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
  };

  let signin = (e, u, p) => {
    e.preventDefault();
    const newUser = {
      username: u,
      password: p,
    };
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/loginUser`, newUser)

      .then((response) => {
        sessionStorage.setItem("id", response.data.user.id);
        sessionStorage.setItem("email", response.data.user.email);
        sessionStorage.setItem("username", response.data.user.username);
        sessionStorage.setItem("tokenStored", response.data.access_token);
        sessionStorage.setItem("photo", response.data.user.photo);
        setProfilePhoto(response.data.user.photo);
        setIsLoggedIn(true);
        setError(null);
        
      })
      .catch((error) => {
        setError(error.message);
        toast.error("Invalid credentials", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  if (!sessionStorage.getItem("tokenStored")) {
    return (
      <div id="mycontent" className="content">
        <ToastContainer />
       
        <Routes>
          <Route exact path="/" element={<Signin handleSignIn={signin} />} />

          <Route exact path="/signup" element={<Signup />} />

          <Route path="/*" element={<Page404 />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Navbar
          profilePhoto={profilePhoto}
          windowsSize={size}
          dataLength={dataLength}
          handleLogout={logout}
        />
        <ToastContainer />
        

        <div className="content">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home
                  handleNewInfo={handleNewInfo}
                  handleFiltered={handleFiltered}
                  filterNames={filterNames}
                  data={filteredData ? filteredData : data}
                  isLoading={isLoading}
                  error={error}
                />
              }
            />

            <Route
              exact
              path="/create"
              element={<Create newInfo={handleNewInfo} data={data} setData={setData}/>}
            />
            <Route
              exact
              path="/settings"
              element={<Settings setProfilePhoto={setProfilePhoto} newInfo={handleNewInfo}/>}
            />

            <Route
              exact
              path="/edit/:id"
              element={<EditBlog newInfo={handleNewInfo} />}
            />

            <Route
              exact
              path="/blog/:id"
              element={<BlogDetails data={data} setData={setData} profilePhoto={profilePhoto} newInfo={handleNewInfo} />}
            />

            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
