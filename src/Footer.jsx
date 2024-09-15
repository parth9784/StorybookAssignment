import react from 'react';
function Footer({text_1,text_2}){
  return(
    <div className="bg-gray-700 flex h-20 justify-between px-24">
      <h2 className="text-white text-xs self-center">{text_1}</h2>
      <h2 className="text-white text-xs self-center">{text_2}</h2>
    </div>
  );
}
export default Footer;