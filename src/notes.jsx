import React, { useState, useEffect } from "react";
import TextModal from "./textModal";
import imgSrc from "./assets/background.png";
import GroupModal from "./GroupModal";
import MessageItem from "./messageItem";
import MobGroupModal from "./mobile-view/groupModal";
import TextModalMob from "./mobile-view/textModal";
import MessageItemMob from "./mobile-view/MessageItemMob";
import './styles.css';

function Notes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [messages, setMessages] = useState({});
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1000);
  const [showMessages, setShowMessages] = useState(false);

  useEffect(() => {
    const savedGroups = localStorage.getItem("groups");
    if (savedGroups) {
      setGroups(JSON.parse(savedGroups));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleModalClick() {
    setIsModalOpen(true);
  }

  function handleCreateGroup() {
    if (groupName && selectedColor) {
      const newGroup = { name: groupName, color: selectedColor };
      localStorage.setItem("groups", JSON.stringify([...groups, newGroup]));
      setGroups([...groups, newGroup]);
      setMessages({ ...messages, [groupName]: [] });
      setIsModalOpen(false);
      setGroupName("");
      setSelectedColor(null);
    } else {
      alert("Please enter a group name and choose a color.");
    }
  }

  useEffect(() => {
    const initialMessages = {};
    groups.forEach(group => {
      initialMessages[group.name] = [];
    });
    setMessages(initialMessages);
  }, [groups]);

  function handleColorClick(color) {
    setSelectedColor(color);
    console.log(`Color chosen: ${color}`);
  }

  const generateInitials = (name) => {
    const words = name.split(" ");
    if (words.length === 1) {
      const word = words[0][0];
      return word.toUpperCase();
    } else {
      const firstLetter = words[0][0];
      const secondLetter = words[1][0];
      const word = firstLetter + secondLetter;
      return word.toUpperCase();
    }
  };

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setShowMessages(true);
    console.log(`Group selected: ${group.name}`);
    const existingMessages = localStorage.getItem("messages");
    if (existingMessages) {
      const parsedMessages = JSON.parse(existingMessages);
      const selectedGroupMessages = parsedMessages[group.name];
      if (selectedGroupMessages) {
        setMessages({ ...messages, [group.name]: selectedGroupMessages });
      } else {
        setMessages({ ...messages, [group.name]: [] });
      }
    }
  };

  const handleSendMessage = (message) => {
    if (selectedGroup) {
      const timestamp = new Date();
      console.log(timestamp);
      const newMessage = {
        content: message,
        timestamp: timestamp.toISOString(),
      };
      console.log(newMessage);

      const updatedMessages = { ...messages };
      updatedMessages[selectedGroup.name] = [
        ...updatedMessages[selectedGroup.name],
        newMessage,
      ];
      setMessages(updatedMessages);

      const updatedMessagesInStorage = JSON.parse(localStorage.getItem("messages")) || {};
      updatedMessagesInStorage[selectedGroup.name] = updatedMessages[selectedGroup.name];
      localStorage.setItem("messages", JSON.stringify(updatedMessagesInStorage));
    }
  };

  const handleBackToGroupList = () => {
    setShowMessages(false);
    setSelectedGroup(null);
  };

  return (
    <>
      {isMobileView ? ( 
        
           <div
           style={{
             backgroundColor: "#ffffff",
             width: "100vw",
             height: "100vh",
             position: "relative",
             overflow: "auto"
           }}
         >
           {/* <h1
             style={{
               position: "sticky",
               textAlign: "start",
               fontWeight: "500",
               fontFamily: "Roboto",
               fontSize: "25.52px",
               padding: "21px",
               letterSpacing: "2%",
               margin: '0',
               background: '#ffffff',
               top: '0'
             }}
           >
             Pocket Notes
           </h1> */}
           {showMessages ? (
            <div>
              {/* <h1
             style={{
               position: "sticky",
               textAlign: "start",
               fontWeight: "500",
               fontFamily: "Roboto",
               fontSize: "25.52px",
               padding: "21px",
               letterSpacing: "2%",
               margin: '0',
               background: '#ffffff',
               top: '0'
             }}
           >
             Pocket Notes
           </h1> */}
           <div style={{
            display:'flex'
           }}>
              
              <div
                style={{ boxSizing: "border-box", flex: 1, textAlign: "start" }}
              > 
              <button onClick={handleBackToGroupList}>Back</button>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    position: 'fixed',
                    width: '100%',
                    padding: "0.5rem ",
                    backgroundColor: "#E8E8E8",
                    borderRadius: "8px",
                  }}
                >
                  {/* <button style={{
                    marginRight:'2rem'
                  }}
                  onClick={handleBackToGroupList}>Back</button> */}
                  <div
                    style={{
                      backgroundColor: selectedGroup.color,
                      width: "3rem",
                      height: "3rem",
                      borderRadius: "50%",
                      marginRight: "1rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    
                    <span style={{ fontSize: "1.7rem", color: "white" }}>
                      {generateInitials(selectedGroup.name)}
                    </span>
                  </div>
                  
                  <h2
                    style={{
                      margin: 0,
                      color: "#000000",
                      padding: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      height: "4rem",
                    }}
                  >
                    {selectedGroup.name}
                  </h2>
                </div>
                {selectedGroup && (
                  <div style={{ flex: 1, paddingTop: '6rem' }}>
                    {messages[selectedGroup.name]?.map((message, index) => (
                      <MessageItemMob key={index} message={message} />
                    ))}
                  </div>
                )}
              </div>
              </div>  
            </div>
          ) : (
            <div>
              <h1
             style={{
               position: "sticky",
               textAlign: "start",
               fontWeight: "500",
               fontFamily: "Roboto",
               fontSize: "25.52px",
               padding: "21px",
               letterSpacing: "2%",
               margin: '0',
               background: '#ffffff',
               top: '0'
             }}
           >
             Pocket Notes
           </h1>
              <button
                style={{
                  backgroundColor: "#000000",
                  borderRadius: "2rem",
                  height: "3rem",
                  width: "70%",
                  margin: "1rem auto",
                  boxSizing: "border-box",
                  fontFamily: "Roboto",
                  fontSize: "16.53px",
                  fontWeight: "500",
                  padding: "0 1rem",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  position: 'sticky',
                  top: '4rem'
                }}
                onClick={handleModalClick}
              >
                <span
                  style={{
                    color: "#FFFFFF",
                    fontWeight: "500",
                    fontFamily: "Roboto",
                    fontSize: "25.52px",
                    letterSpacing: "2%",
                    cursor: "pointer",
                  }}
                >
                  +
                </span>
                Create Notes Group
              </button>

              {groups.map((group, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0.2rem 0.5rem",
                    borderTopLeftRadius: "34px",
                    borderBottomLeftRadius: "34px",
                    margin: "0.2rem 0 1rem 1rem",
                    cursor: "pointer",
                    backgroundColor: selectedGroup && selectedGroup.name === group.name ? "#F7ECDC" : "transparent",
                  }}
                  onClick={() => handleGroupClick(group)}
                >
                  <div
                    style={{
                      backgroundColor: group.color,
                      width: "3rem",
                      height: "3rem",
                      borderRadius: "50%",
                      marginRight: "1rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "1.7rem", color: "white" }}>
                      {generateInitials(group.name)}
                    </span>
                  </div>
                  <h3>{group.name}</h3>
                </div>
              ))}
            </div>
          )}

{isModalOpen && (
            <MobGroupModal
              groupName={groupName}
              setGroupName={setGroupName}
              handleColorClick={handleColorClick}
              selectedColor={selectedColor}
              handleCreateGroup={handleCreateGroup}
            />
          )}

{selectedGroup && (
            <div style={{ width: "auto" }}>
              <TextModalMob onSend={handleSendMessage} />
            </div>
          )}

           {/* <button
             style={{
               backgroundColor: "#000000",
               borderRadius: "2rem",
               height: "3rem",
               width: "70%",
               margin: "1rem auto",
               boxSizing: "border-box",
               fontFamily: "Roboto",
               fontSize: "16.53px",
               fontWeight: "500",
               padding: "0 1rem",
               color: "#FFFFFF",
               display: "flex",
               alignItems: "center",
               justifyContent: "space-around",
               position: 'sticky',
               top: '4rem'
             }}
             onClick={handleModalClick}
           >
             <span
               style={{
                 color: "#FFFFFF",
                 fontWeight: "500",
                 fontFamily: "Roboto",
                 fontSize: "25.52px",
                 letterSpacing: "2%",
                 cursor: "pointer",
               }}
             >
               +
             </span>
             Create Notes Group
           </button>

           {groups.map((group, index) => (
             <div
               key={index}
               style={{
                 display: "flex",
                 alignItems: "center",
                 padding: "0.2rem 0.5rem",
                 borderTopLeftRadius: "34px",
                 borderBottomLeftRadius: "34px",
                 margin: "0.2rem 0 1rem 1rem",
                 cursor: "pointer",
                 backgroundColor: selectedGroup && selectedGroup.name === group.name ? "#F7ECDC" : "transparent",
               }}
               onClick={() => handleGroupClick(group)}
             >
               <div
                 style={{
                   backgroundColor: group.color,
                   width: "3rem",
                   height: "3rem",
                   borderRadius: "50%",
                   marginRight: "1rem",
                   display: "flex",
                   justifyContent: "center",
                   alignItems: "center",
                 }}
               >
                 <span style={{ fontSize: "1.7rem", color: "white" }}>
                   {generateInitials(group.name)}
                 </span>
               </div>
               <h3>{group.name}</h3>
             </div>
           ))}
           {selectedGroup &&  <div
                style={{ boxSizing: "border-box", flex: 1, textAlign: "start" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    position: 'fixed',
                    width: '100%',
                    padding: "0.5rem 3rem",
                    backgroundColor: "#E8E8E8",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: selectedGroup.color,
                      width: "3rem",
                      height: "3rem",
                      borderRadius: "50%",
                      marginRight: "1rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "1.7rem", color: "white" }}>
                      {generateInitials(selectedGroup.name)}
                    </span>
                  </div>
                  <h2
                    style={{
                      margin: 0,
                      color: "#000000",
                      padding: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      height: "4rem",
                    }}
                  >
                    {selectedGroup.name}
                  </h2>
                </div>
                {selectedGroup && (
                  <div style={{ flex: 1, paddingTop: '6rem' }}>
                    {messages[selectedGroup.name]?.map((message, index) => (
                      <MessageItem key={index} message={message} />
                    ))}
                  </div>
                )}
              </div>}
           {isModalOpen && (
              <MobGroupModal
                groupName={groupName}
                setGroupName={setGroupName}
                handleColorClick={handleColorClick}
                selectedColor={selectedColor}
                handleCreateGroup={handleCreateGroup}
              />
            )} */}
           
         </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              backgroundColor: "#ffffff",
              width: "20%",
              height: "100vh",
              position: "relative",
              overflow: "auto"
            }}
          >
            <h1
              style={{
                position: "sticky",
                textAlign: "start",
                fontWeight: "500",
                fontFamily: "Roboto",
                fontSize: "25.52px",
                padding: "21px",
                letterSpacing: "2%",
                margin: '0',
                background: '#ffffff',
                top: '0'
              }}
            >
              Pocket Notes
            </h1>

            <button
              style={{
                backgroundColor: "#000000",
                borderRadius: "2rem",
                height: "3rem",
                width: "70%",
                margin: "1rem auto",
                boxSizing: "border-box",
                fontFamily: "Roboto",
                fontSize: "16.53px",
                fontWeight: "500",
                padding: "0 1rem",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                position: 'sticky',
                top: '4rem'
              }}
              onClick={handleModalClick}
            >
              <span
                style={{
                  color: "#FFFFFF",
                  fontWeight: "500",
                  fontFamily: "Roboto",
                  fontSize: "25.52px",
                  letterSpacing: "2%",
                  cursor: "pointer",
                }}
              >
                +
              </span>
              Create Notes Group
            </button>

            {groups.map((group, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.2rem 0.5rem",
                  borderTopLeftRadius: "34px",
                  borderBottomLeftRadius: "34px",
                  margin: "0.2rem 0 1rem 1rem",
                  cursor: "pointer",
                  backgroundColor: selectedGroup && selectedGroup.name === group.name ? "#F7ECDC" : "transparent",
                }}
                onClick={() => handleGroupClick(group)}
              >
                <div
                  style={{
                    backgroundColor: group.color,
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "50%",
                    marginRight: "1rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "1.7rem", color: "white" }}>
                    {generateInitials(group.name)}
                  </span>
                </div>
                <h3>{group.name}</h3>
              </div>
            ))}
          </div>

          <div
            style={{
              backgroundColor: "#F7ECDC",
              width: "80%",
              height: selectedGroup ? "76vh" : "100vh",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              overflow: 'auto'
            }}
          >
            {!selectedGroup ? (
              <div
                style={{
                  backgroundColor: "#F7ECDC",
                  width: "100%",
                  height: "40vh",
                  position: "relative",
                  margin: "auto",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <img
                  style={{
                    margin: "auto",
                    height: "29vh",
                    width: "33vw",
                  }}
                  src={imgSrc}
                  alt="Description of image"
                />
                <p
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "400",
                    fontSize: "25px",
                    letterSpacing: "2%",
                    marginBottom: "0",
                  }}
                >
                  Pocket Notes
                </p>
                <p
                  style={{
                    margin: "8px",
                    fontFamily: "Roboto",
                    fontWeight: "400",
                    fontSize: "15px",
                    letterSpacing: "1px",
                  }}
                >
                  Send and receive messages without keeping your phone online.
                  <br />
                  Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
                </p>
              </div>
            ) : (
              <div
                style={{ boxSizing: "border-box", flex: 1, textAlign: "start" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    position: 'fixed',
                    width: '100%',
                    padding: "0.5rem 3rem",
                    backgroundColor: "#E8E8E8",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: selectedGroup.color,
                      width: "3rem",
                      height: "3rem",
                      borderRadius: "50%",
                      marginRight: "1rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "1.7rem", color: "white" }}>
                      {generateInitials(selectedGroup.name)}
                    </span>
                  </div>
                  <h2
                    style={{
                      margin: 0,
                      color: "#000000",
                      padding: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      height: "4rem",
                    }}
                  >
                    {selectedGroup.name}
                  </h2>
                </div>
                {selectedGroup && (
                  <div style={{ flex: 1, paddingTop: '6rem' }}>
                    {messages[selectedGroup.name]?.map((message, index) => (
                      <MessageItem key={index} message={message} />
                    ))}
                  </div>
                )}
              </div>
            )}
            {isModalOpen && (
              <GroupModal
                groupName={groupName}
                setGroupName={setGroupName}
                handleColorClick={handleColorClick}
                selectedColor={selectedColor}
                handleCreateGroup={handleCreateGroup}
              />
            )}
          </div>
          {selectedGroup && (
            <div style={{ width: "auto" }}>
              <TextModal onSend={handleSendMessage} />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Notes;
