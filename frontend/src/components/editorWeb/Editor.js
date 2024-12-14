// import React from 'react';
// import "../../styles/editor.css";

// const Editor = ({ htmlCode, setHtmlCode, cssCode, setCssCode, jsCode, setJsCode }) => {
//   return (
//     <div className="editor flex-column">
//       <textarea className="editor-box" id="htmlCode" placeholder="HTML" value={htmlCode} onChange={(e) => setHtmlCode(e.target.value)} />
//       <textarea className="editor-box" id="cssCode" placeholder="CSS" value={cssCode} onChange={(e) => setCssCode(e.target.value)} />
//       <textarea className="editor-box" id="jsCode" placeholder="JAVASCRIPT" value={jsCode} onChange={(e) => setJsCode(e.target.value)} />
//     </div>
//   );
// };

// export default Editor;


import React from 'react';
import "../../styles/editor.css";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
// import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { EditorView } from "@codemirror/view";

const Editor = ({ htmlCode, setHtmlCode, cssCode, setCssCode, jsCode, setJsCode }) => {
  
  return (
    <div className="editor flex-column">
      <CodeMirror className="editor-box" id="htmlCode" placeholder="HTML" value={htmlCode} onChange={setHtmlCode} extensions={[html(), EditorView.lineWrapping]} theme="dark"/>
      <CodeMirror className="editor-box" id="cssCode" placeholder="CSS" value={cssCode} onChange={setCssCode}  extensions={[css(), EditorView.lineWrapping]} theme="dark"/>
      <CodeMirror className="editor-box" id="jsCode" placeholder="JAVASCRIPT" value={jsCode} onChange={setJsCode} extensions={[javascript({ jsx: true })]} theme="dark" />
    </div>
  );
};

export default Editor;