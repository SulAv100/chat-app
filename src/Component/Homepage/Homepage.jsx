import React, { useState, useEffect } from "react";
import "./Homepage.css";
import ppImage from "../../assets/pp.png";

function Homepage() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [sendFlag, setSendFlag] = useState(false);
  // const [clickFlag, setClickFlag] = useState(false);
  const [fetchData, setFetchData] = useState([]);

  const [searchData, setSearchData] = useState("");
  const [userclicked, setuserClicked] = useState(false);

  const handleDataUpload = (event) => {
    const newData = event.target.value;
    setCurrentMessage(newData);
    setSendFlag(newData.length > 1);
  };

  const handleDataUpdate = () => {
    if (currentMessage.trim()) {
      setMessages([...messages, currentMessage]);
      setCurrentMessage("");
      setSendFlag(false);
      setClickFlag(true);
    }
  };

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
  }, []);

  const filteredData = fetchData.filter(
    (item) => item.name.toLowerCase() === searchData.toLowerCase()
  );

  const handleChatSwitch = (event) => {
    const newData = event.target.value;
    setSearchData(event.target.value);

    if (newData.length < 1) {
      setuserClicked(false);
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
                    <h3>{item.name}</h3>
                    <p>{item.email}</p>
                  </div>
                  <p id="time">7min</p>
                </div>
              ))
            ) : (
              <span>No result found</span>
            )}
          </div>
        </section>
        {userclicked && filteredData ? (
          <>
            <main className="chat-area">
              <div className="chat-heading">
                <div className="chat-member">
                  <span className="pp-image">
                    <img src={ppImage} alt="" />
                  </span>
                  {filteredData.map((item, index) => (
                    <p>{item.name}</p>
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
                    {item.name}
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
