import React, { useState } from 'react';


function GroupModal({ groupName, setGroupName, handleColorClick, selectedColor, handleCreateGroup }) {

    const [isMobileView,setIsMobileView] = useState(window.innerWidth <= 700);;
    const Colors = [
        "#B38BFA",
        "#FF79F2",
        "#43E6FC",
        "#F19576",
        "#0047FF",
        "#6691FF",
    ];

    return (  
        <>
        {isMobileView? ("isMobileView"):(
        <div style={modalStyles.overlay}>
            <div style={modalStyles.modal}>
                <p style={{
                    fontFamily: 'Roboto',
                    textAlign: 'start',
                    fontWeight: '500',
                    color: '#000000',
                    paddingTop: '0',
                    marginTop: '1px',
                    fontSize: '1.3rem'
                }}>Create New Notes group</p>
                <div style={{ display: "flex", gap: "2rem", alignItems: 'baseline' }}>
                    <label style={{
                        fontFamily: 'Roboto',
                        fontWeight: '500',
                        color: '#000000'
                    }}>Group Name</label>
                    <input
                        type="text"
                        placeholder="Enter your group name...."
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        style={{
                            borderRadius: '34px',
                            border: '2px solid #CCCCCC',
                            width: '68%',
                            height: '2rem',
                            paddingLeft: '12px',
                            fontFamily: 'Roboto',
                            fontSize: '17px',
                            letterSpacing: '1px'
                        }}
                    />
                </div>
                <div style={{ display: "flex", marginTop: "2rem", gap: "1rem" }}>
                    <p style={{
                        fontFamily: 'Roboto',
                        fontWeight: '500',
                        color: '#000000'
                    }}>Choose Color</p>
                    <div style={{ display: "flex", cursor: "pointer" }}>
                        {Colors.map((color) => (
                            <div
                                key={color}
                                onClick={() => handleColorClick(color)}
                                style={{
                                    backgroundColor: color,
                                    width: "2rem",
                                    height: "2rem",
                                    borderRadius: "50%",
                                    margin: "0.5rem",
                                    border: color === selectedColor ? "2px solid black" : "none",
                                }}
                            />
                        ))}
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'end',
                    marginTop: '25px'
                }}>
                    <button onClick={handleCreateGroup} style={modalStyles.closeButton}>
                        Create
                    </button>
                </div>
            </div>
        </div>
            )
        }
        </>

        
    );
}

const modalStyles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
     
    },
    modal: {
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "8px",
        maxWidth: "500px",
        width: "50%",
        position: "absolute",
    },
    closeButton: {
        margin: "1rem",
        backgroundColor: "#000000",
        color: "white",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: "4px",
        cursor: "pointer",
        position: "absolute",
        right: "2rem",
        bottom: "1rem",
        zIndex: 1000,
    },
};

export default GroupModal;
