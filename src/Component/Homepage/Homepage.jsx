import React, { useState, useEffect } from "react";
import "./Homepage.css";
import ppImage from "../../assets/pp.png";

function Homepage() {



  //all the useStates are initialized here
  const [messages, setMessages] = useState([]);//array
  const [currentMessage, setCurrentMessage] = useState("");//var
  const [sendFlag, setSendFlag] = useState(false);//boolean
  const [fetchData, setFetchData] = useState([]);//array
  const [searchData, setSearchData] = useState("");//var
  const [userclicked, setuserClicked] = useState(false);//boolean



  // this function handles the upload of messages to the currentMessage state
  const handleDataUpload = (event) => {
    const newData = event.target.value;
    setCurrentMessage(newData);
    setSendFlag(newData.length > 1);//this checks if the length of word is greater than one or not else it wont upload the data
  };





  // this is to push the data to messages state which is array  to the data we keept in currentMessage will be updated here
  const handleDataUpdate = () => {
    if (currentMessage.trim()) {
      setMessages([...messages, currentMessage]); //as we are using spread operator here this will make a copy of previous data and add new data 
      setCurrentMessage("");//to empty the currentMessage so that use can message again
      setSendFlag(false);
      setClickFlag(true);
    }
  };



  // this shows the fetching of users from backend to show the users who have logged in and to start the conversation
  useEffect(() => {
    const fetchData = fetch("http://127.0.0.1:8000/api/user/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network resposne was not okay");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setFetchData(data);
      });
  }, []);//empty array dependency so it will run only once when the component is mounted 



// this is for searching user to start a convo this takes input from search and filters the user name with the data we fetched from backend
//filter selects the exact data that matches the conditions
  const filteredData = fetchData.filter( 
    (item) => item.username.toLowerCase() === searchData.toLowerCase()
  );




// this is for the search user we give the name here which is then compared with the array above 
  const handleChatSwitch = (event) => {
    const newData = event.target.value;
    setSearchData(event.target.value);

    if (newData.length < 1) {
      setuserClicked(false); //to ensure that the length of the searched item is less than 1 then we simmply disable the flag so that all other chats are also stopped from rendering
    }
  };

  return (
    <>
      <div className="homepage-body">
        <aside>
          <div className="side-elements">
            <div className="top-elements">
              <i className="fa-solid fa-message"></i>
              <i className="fa-solid fa-users"></i>
              <i className="fa-solid fa-house"></i>
              <i className="fa-solid fa-trash"></i>
            </div>
            <span className="borderline"></span>
            <div className="bottom-elements">
              <i className="fa-solid fa-message"></i>
              <i className="fa-solid fa-users"></i>
              <i className="fa-solid fa-house"></i>
              <i className="fa-solid fa-trash"></i>
            </div>
          </div>
        </aside>
        <section className="chat-list">
          <div className="head-section">
            <h3>Chats</h3>
            <i className="fa-solid fa-pen-to-square"></i>
          </div>
          <div className="search-bar">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Search Messages"
              value={searchData}
              onChange={handleChatSwitch}
            />
          </div>
          <div className="messages-list">
            {/* the data that we filtered previously is mapped using this so as we have single item we  we can map it and each parent container should have unique key which is given below */}
            {filteredData ? (
              filteredData.map((item, index) => (
                <div
                  onClick={() => setuserClicked(true)}
                  key={index}
                  className="single-message"
                >
                  <span className="pp-image">
                    <img src={ppImage} alt="" />
                  </span>
                  <div className="user-outline">
                    {/* this is to extract the name and email from the filtered data */}
                    <h3>{item.username}</h3>  
                    <p>{item.email}</p>
                  </div>
                  <p id="time">7min</p>
                </div>
              ))
            ) : (
              // need work on this this isnt working as expected
              <span>No result found</span>
            )}
          </div>
        </section>
        {/* this is to start convo with the user that we searched and selected more updates need to be donw */}
        {userclicked && filteredData ? (
          <>
            <main className="chat-area">
              <div className="chat-heading">
                <div className="chat-member">
                  <span className="pp-image">
                    <img src={ppImage} alt="" />
                  </span>
                  {/* this also changes automatically when we switch user to chat */}
                  {filteredData.map((item, index) => (
                    <p>{item.username}</p>
                  ))}
                </div>

                <div className="interactables">
                  <i className="fa-solid fa-phone"></i>
                  <i className="fa-solid fa-video"></i>
                  <i className="fa-solid fa-gear"></i>
                </div>
              </div>
              <span className="chat-line"></span>
              <div className="message-area">
                {messages.map((msg, index) => (
                  <div key={index} className="message-box-user">
                    <span>{msg}</span>
                  </div>
                ))}
                <div className="message-box-test">
                  <span>Not bad, how are you ?</span>
                </div>
              </div>
              <div className="chat-bubble">
                <i className="fa-solid fa-circle-plus"></i>
                <i className="fa-solid fa-image"></i>
                <i className="fa-solid fa-file"></i>
                <div className="chat-boxer">
                  <input
                    type="text"
                    value={currentMessage}
                    onChange={handleDataUpload}
                    placeholder="Aa"
                  />
                  <i className="fa-solid fa-face-smile"></i>
                </div>
                {sendFlag ? (
                  <i
                    onClick={handleDataUpdate}
                    className="fa-solid fa-arrow-right"
                  ></i>
                ) : (
                  <i className="fa-solid fa-car"></i>
                )}
              </div>
            </main>
          </>
        ) : (
          <></>
        )}
        {filteredData && userclicked ? (
          <>
            <section className="right-section">
              <div className="image-profile">
                <figure>
                  <img src={ppImage} alt="" />
                </figure>
                {filteredData.map((item, index) => (
                  <p key={index} id="nameshit">
                    {item.username}
                  </p>
                ))}
              </div>
              <div className="custom-button">
                <span className="item-name">
                  <i className="fa-regular fa-share-from-square"></i>{" "}
                  <p>Share</p>
                </span>
                <span className="item-name">
                  <i className="fa-brands fa-facebook"></i> <p>Facebook</p>
                </span>
                <span className="item-name">
                  <i className="fa-solid fa-bell"></i> <p>Mute</p>
                </span>
                <span className="item-name">
                  <i className="fa-solid fa-magnifying-glass"></i> <p>Search</p>
                </span>
              </div>
              <div className="filter-section">
                <div className="data-evaluate">
                  <p>Media, files and Links</p>
                  <i className="fa-brands fa-greater-than"></i>
                </div>
                <div className="data-evaluate">
                  <p>Privacy & Support</p>
                  <i className="fa-brands fa-greater-than"></i>
                </div>
              </div>
            </section>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Homepage;


// code minification and code splitting will be done at last
