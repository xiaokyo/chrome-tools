import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

// react app 容器
const wrapApp = document.createElement("div");
wrapApp.setAttribute("id", "chrome-extension-tapd-react")
const body = document.getElementsByTagName("body")[0]
body.append(wrapApp);

ReactDOM.render(<App />, wrapApp)