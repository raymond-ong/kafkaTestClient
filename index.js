const getTextValue = (elemId) => {
    const elem = document.getElementById(elemId);
    if (!elem) {
        return null
    }

    return elem.value;
}

const setTextValue = (elemId, value) => {
    const elem = document.getElementById(elemId);
    if (!elem) {
        return null
    }

    elem.value = value;
}


const handleSend = async () => {
    // A. Gather inputs
    const server = getTextValue("txtServer");
    const value = getTextValue("txtValue");

    // B. Validation
    if (!server || !value) {
        alert("Server and value must not be null");
        return;
    }

    let valueJson = null;
    try {
        valueJson = JSON.parse(value);
    }
    catch(ex) {
        alert("value is an Invalid JSON");
        return;
    }

    const messageJson = {
        records: [valueJson]
    };


    // C. Send the message
    console.log("Server:", server, "value", messageJson);

    const response = await fetch(server, {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
            'Accept': 'application/vnd.kafka.v2+json',
            'Content-Type': 'application/vnd.kafka.json.v2+json'
        },
        body: JSON.stringify(messageJson)
        // body: JSON.stringify({
        //     name: 'Hubot',
        //     login: 'hubot',
        //   })
    })

    response.json().then(msg => console.log(msg));
}


const handleSetSampleMessage = () => {
    // A. Server
    const defaultServer = "http://192.168.56.124:8082/topics/raytopic1";
    setTextValue("txtServer", defaultServer);

    // B. Value JSON
    const defaultValueJson = {
        "key": "Key2",
        "value": {
            "Controllability": "Good",
            "Hunting": "Bad",
        }
    };

    const defaultValueJsonStr = JSON.stringify(defaultValueJson, null, 4); // prettified JSON string
    setTextValue("txtValue", defaultValueJsonStr);
    handleTextAreaInput();
}

// Auto adjust height of text area
const handleTextAreaInput = () => {
    const elem = document.getElementById("txtValue");
    if (!elem) {
        return;
    }

    elem.style.height = elem.scrollHeight + "px";
    console.log(elem.style.height);
}