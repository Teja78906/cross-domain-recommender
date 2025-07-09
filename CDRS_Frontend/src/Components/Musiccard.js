import React from "react";
import previewData from './preview_data.json';
const Musiccard = ({ mtitle }) => {
//   const [show,setShow]=useState(false);
//   const [booktitle,setItem]=useState();
const handleClick = (songName, event) => {
  event.stopPropagation();
  const songUrl = previewData[songName];
  if (songUrl) {
    window.open(songUrl, '_blank');
  } else {
    console.log(`Preview URL not found for ${songName}`);
  }
  // alert(previewData[songName])
};
  console.log(mtitle);
  return (
    <>
    <div className="mcard" onClick={(event) => handleClick(mtitle,event)}>
      <img
        // src="./images/image.png"
        src="./images/music_file.webp"
        alt={mtitle}
      />
      <div className="bottom">
        <h3 className="title">{mtitle}</h3>
      </div>
    </div>
    {/* <Music show={show} item={booktitle} onClose={()=>setShow(false)}/> */}
    </>
  );
};
export default Musiccard;
