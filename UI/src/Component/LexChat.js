import React, { useEffect, useState } from 'react';
const AWS = require("aws-sdk");

const LexChat = () => {
    const [data, setData] = useState('');
    const [lexUserId, setLexUserId] = useState('chatbot-demo' + Date.now());
    const [sessionAttributes, setSessionAttributes] = useState({});
    const [visible, setVisible] = useState('closed');
    var lexruntime;
    lexruntime = new AWS.LexRuntime();
    lexruntime = lexruntime;

    useEffect(() => {
        document.getElementById("inputField").focus();
        AWS.config.region = 'us-east-1'; // Region
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:9fe111d2-4398-45a3-b65e-c1e9a090342f',
        });

    }, [])

    const handleClick = () => {
        let tempVisible = visible === 'open' ? 'closed' : 'open';
        setVisible(tempVisible);
    }

    const pushChat = (event) => {
        event.preventDefault();

        var inputFieldText = document.getElementById('inputField');

        if (inputFieldText && inputFieldText.value && inputFieldText.value.trim().length > 0) {

            // disable input to show we're sending it
            var inputField = inputFieldText.value.trim();
            inputFieldText.value = '...';
            inputFieldText.locked = true;

            // send it to the Lex runtime
            var params = {
                botAlias: 'versionLatest',
                botName: 'ChatModule',
                inputText: inputField,
                userId: lexUserId,
                sessionAttributes: sessionAttributes
            };
            showRequest(inputField);
            var a = function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                    showError('Error:  ' + err.message + ' (see console for details)')
                }
                if (data) {
                    setSessionAttributes(data.sessionAttributes)
                    showResponse(data);
                }
                // re-enable input
                inputFieldText.value = '';
                inputFieldText.locked = false;
            };

            lexruntime.postText(params, a);
        }
        return false;
    }

    const showRequest = (daText) => {
        var conversationDiv = document.getElementById('conversation');
        var requestPara = document.createElement("P");
        requestPara.className = 'userRequest';
        requestPara.appendChild(document.createTextNode(daText));
        conversationDiv.appendChild(requestPara);
        conversationDiv.scrollTop = conversationDiv.scrollHeight;
    }

    const showError = (daText) => {

        var conversationDiv = document.getElementById('conversation');
        var errorPara = document.createElement("P");
        errorPara.className = 'lexError';
        errorPara.appendChild(document.createTextNode(daText));
        conversationDiv.appendChild(errorPara);
        conversationDiv.scrollTop = conversationDiv.scrollHeight;
    }

    const showResponse = (lexResponse) => {

        var conversationDiv = document.getElementById('conversation');
        var responsePara = document.createElement("P");
        responsePara.className = 'lexResponse';
        if (lexResponse.message) {
            responsePara.appendChild(document.createTextNode(lexResponse.message));
            responsePara.appendChild(document.createElement('br'));
        }
        if (lexResponse.dialogState === 'ReadyForFulfillment') {
            responsePara.appendChild(document.createTextNode(
                'Ready for fulfillment'));
        } else {
            responsePara.appendChild(document.createTextNode(
                ''));
        }
        conversationDiv.appendChild(responsePara);
        conversationDiv.scrollTop = conversationDiv.scrollHeight;
    }

    const handleChange = (event) => {
        event.preventDefault();
        setData(event.target.value);
    }
    const inputStyle = {
        padding: '4px',
        fontSize: 12,
        width: '388px',
        height: '40px',
        borderRadius: '1px',
        border: '10px'
    }

    const conversationStyle = {
        height: '300px',
        border: 'px solid #ccc',
        backgroundColor: '#fff',
        padding: '4px',
        overflow: 'scroll',
        borderBottom: 'thin ridge #bfbfbf'
    }

    const headerRectStyle = {
        backgroundColor: '#000',
        width: '400px',
        height: '40px',
        textAlign: 'left',
        paddingTop: '6px',
        paddingLeft: '8px',
        color: '#fff',
        fontSize: '14px',
    }

    const chatcontainerStyle = {
        backgroundColor: '#FFFFFF',
        width: 408
    }

    const chatFormStyle = {
        margin: '1px',
        padding: '2px'
    }


    return (
        <div id="chatwrapper">
            <div id="chat-header-rect" style={headerRectStyle} onClick={handleClick} >Chat
                {(visible === 'open') ? <span className='chevron top'></span> : <span className='chevron bottom'></span>}
            </div>
            <div id="chatcontainer" className={visible} style={chatcontainerStyle}>
                <div id="conversation" style={conversationStyle} ></div>
                <form id="chatform" style={chatFormStyle} onSubmit={pushChat}>
                    <input type="text"
                        id="inputField"
                        size="40"
                        value={data}
                        placeholder="Chat"
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </form>
            </div>
        </div>
    )
}
export default LexChat;