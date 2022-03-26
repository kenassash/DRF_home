//import React from 'react';

var style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    left: "0",
//    bottom: "0",
    height: "60px",
    width: "100%",
};

const MainMenu = () => {
    return (
        <div style={style}>
            <button type="button" class="btn btn-primary">HOME</button>
        </div>
    );
};

export default MainMenu;