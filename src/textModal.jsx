import React, { useState } from 'react';
import sendButton from "../src/assets/sendButton.png"

function TextModal({ onSend }) {
  const [text, setText] = useState("");

  const handleSendClick = () => {
    if (text.trim() !== "") {
      onSend(text);
      setText("");
    }
  };

  return (
    <div style={{
      border:'none'
    }}>
      <textarea 
        type='text' 
        placeholder='Enter your text here...........'
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: '80%',
          boxSizing: 'border-box',
          position: 'absolute',
          right: '0px',
          // left:'0px',
          bottom: '0px',
          border: '1.3rem solid #E8E8E8',
          zIndex: '1000',
          padding: '10px',
          marginRight: '1px',
          fontSize: '21px',
          lineHeight: '1.5',
          verticalAlign: 'top',
          height:'12rem',
          outline: 'none',
          resize: 'none', 
      }} 

      />
      <button 
        onClick={handleSendClick}
        disabled={text.trim() === ""}
        style={{
           position: 'absolute',
           bottom: '11px',
           right: '8px',
           width: '100px',
           height: '50px',
           fontSize: '21px',
           zIndex: '1001',
           background: 'transparent',
           border: 'none',
           outline: 'none',
           cursor: text.trim()===""?"not-allowed":"pointer",
           padding: '0px',
           hover:'#000000',
      }}>
        <img style={{
          background:'transparent',
        }}src={sendButton} alt='send'></img>
      </button>
    </div>
  )
}

export default TextModal;
