import React from 'react';

const MessageItem = ({ message }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    return `${hours}:${minutes} ${ampm}`;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div style={{ paddingLeft:'3rem' }}>
      <div style={{ display: "flex" , gap:'4rem', alignItems:'baseline',paddingTop:'3rem'}}>
        <small style={{ color: "gray",fontFamily:'Roboto',fontSize:'18px',fontWeight:'500',width:'16rem' }}>
          {formatTime(message.timestamp)}<br></br> {formatDate(message.timestamp)}
        </small>
        
        <p style={{ margin: "0.5rem 0 0 0",fontFamily:'Roboto',fontWeight:'500',fontSize:'18px' ,textAlign:'justify',width:'70%'}}>{message.content}</p>
        </div>
      </div>
  );
};

export default MessageItem;   




