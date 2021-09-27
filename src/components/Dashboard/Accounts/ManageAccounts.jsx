import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import Dashboard from '../Dashboard'
import { FiClipboard, FiPlus } from "react-icons/fi";
import Popup from '../../Misc/Popup';
import CreateAccount from './CreateAccount';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import toast from 'react-hot-toast';
import PrimaryCta from '../cta/PrimaryCta';

const ManageAccounts = () => {
  const { user } = useContext(AuthContext)
  const [createModal, setcreateModal] = useState(false)
  const togglecreateModal = () => { setcreateModal(!createModal) }
  const [accCode, setAccCode] = useState()

  const [showCode, setshowCode] = useState(false)
  const toggleShowCode = (code) => {
    setshowCode(!showCode)
    setAccCode(code)
  }
  const codeString = `<script src="https://cdn.jsdelivr.net/gh/glowhub-dev/glowhub-scripts@1.1/glowHub.min.js"></script>
<script> 
  glowHubScript.init('${accCode}'); 
</script>`

  const toastConfig = {
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  }
  const copied = () => toast.success('Copied to clipboard', toastConfig)
  const copyToclipboard = () => {
    navigator.clipboard.writeText(codeString)
    copied()
  }

  return (
    <Dashboard>
      <div className="row justify-content-between align-items-end mb-3">
        <div className="col-sm-8 mb-3">
          <h1 className="mb-0">Manage accounts</h1>
          <p className="glow__muted mb-0">Good to see you again, {user && user.name.split(' ')[0]}</p>
        </div>
        <div className="col-sm-4 text-left text-sm-end">
          <button onClick={togglecreateModal} className="glow__btn__dark mb-2 py-2"><FiPlus className="me-1" /> Create account</button>
        </div>
      </div>

      {
        user?.accounts.length <= 0
        && <PrimaryCta
          title='Create your fist account'
          desc='To start using GlowHub, create your first account'
          btnFunc={togglecreateModal}
          text='Create account'
        />
      }

      <div className="row row-cols-1 row-cols-sm-2 g-2 g-md-3 mt-4">
        {user?.accounts.map(acc => {
          return (
            <div key={acc.clientID}>
              <div className="card__dashboard p-4 d-block d-lg-flex justify-content-between align-items-center">
                <div className="d-flex">
                  <div className="acc__avatar" style={{ backgroundColor: acc.color }}></div>
                  <div>
                    <h5 className="m-0">{acc.name}</h5>
                    <small className="glow__muted d-block">ClientID: {acc.clientID}</small>
                  </div>
                </div>
                <div className="mt-3 mt-lg-0">
                  <Link to={`/edit-account/${acc.id}`} className="glow__btn__dark me-2">Edit</Link>
                  <button onClick={() => toggleShowCode(acc.clientID)} className="glow__btn__dark">Code</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {
        createModal &&
        <Popup close={togglecreateModal}>
          <CreateAccount
            closeFunc={togglecreateModal}
          />
        </Popup>
      }

      {
        showCode &&
        <Popup close={toggleShowCode}>
          <div className="mb-4">
            <h3 className="mb-0">Your script</h3>
          </div>

          <p>Using npm</p>
          <SyntaxHighlighter language="javascript" style={atomDark}>
            npm i react-glowhub
          </SyntaxHighlighter>
          <a
            href="https://www.npmjs.com/package/react-glowhub"
            className="text-white"
            target="_blank"
            rel="noreferrer"
          >
            Learn more about npm package
          </a>

          <hr className="my-4" />

          <p>Copy & paste this code snnipet to your html head or body tag.</p>
          <SyntaxHighlighter language="javascript" style={atomDark}>
            {codeString}
          </SyntaxHighlighter>

          <button
            className="glow__btn__dark mt-3"
            onClick={copyToclipboard}
          >
            <FiClipboard className="me-1" /> Copy code
          </button>
        </Popup>
      }

    </Dashboard>
  )
}

export default ManageAccounts
