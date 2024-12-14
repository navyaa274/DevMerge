import React from 'react';

const Sidebar = ({ setHtmlCode, setCssCode, setJsCode }) => {
  const displayHTML = () => {
    setHtmlCode(''); // Load your HTML content here
  };

  const displayCSS = () => {
    setCssCode(''); // Load your CSS content here
  };

  const displayJS = () => {
    setJsCode(''); // Load your JS content here
  };

  return (
    <div className="left flex-column">
      <div className="left-in flex-column" style={{ height: '65%' }}>
        <input type="text" placeholder="Search" id="left-search" onKeyUp={filterSearch} />
        <div className="left-in-files" style={{ margin: '15px 0' }}>Files</div>
        <div className="left-in-files-mainBox flex-column" style={{ height: '250px' }}>
          <div style={{ backgroundColor: '#585c66', borderRadius: '3px' }}>Main</div>
          <ul id="left-search-ul">
            <li><a href="#" onClick={displayHTML}>HTML</a></li>
            <li><a href="#" onClick={displayCSS}>CSS</a></li>
            <li><a href="#" onClick={displayJS}>JAVASCRIPT</a></li>
          </ul>
        </div>
      </div>
      <hr style={{ borderColor: 'grey' }} />
      <div className="left-in flex-column" style={{ height: '35%' }}></div>
    </div>
  );
};

export default Sidebar;

const filterSearch = () => {
  const input = document.getElementById('left-search');
  const filter = input.value.toUpperCase();
  const ul = document.getElementById('left-search-ul');
  const li = ul.getElementsByTagName('li');

  for (let i = 0; i < li.length; i++) {
    const a = li[i].getElementsByTagName('a')[0];
    const txtValue = a.textContent || a.innerText;
    li[i].style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? '' : 'none';
  }
};
