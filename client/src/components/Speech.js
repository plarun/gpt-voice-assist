import React, { Component } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

const url = "https://gpt-voice-assist.onrender.com";

class Speech extends Component {
  constructor() {
    super();
    this.state = {
      transcript: "",
    };

    this.startListen = this.startListen.bind(this);
  }

  startListen() {
    // speech recognition on browser
    var SpeechRecognition = window.webkitSpeechRecognition;

    // configure the speeck recognition
    var recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    // recognize voice input
    recognition.start();

    // voice recognition result event, it is triggered when the
    // transacript result is generated.
    recognition.onresult = function (event) {
      // audio converted transcript
      var transcript = event.results[0][0].transcript;

      const query = {
        params: {
          prompt: transcript,
        },
      };

      // send the transacript to server for GPT response
      axios
        .get(`${url}/api/gpt`, query)
        .then((res) => {
          const { GPTResponse } = res.data;

          const utter = new SpeechSynthesisUtterance(GPTResponse);

          const synth = window.speechSynthesis;
          synth.speak(utter);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // voice recognition speech end event, it is triggered when
    // the speech is end. In otherwords speech input from the
    // user is completed.
    recognition.onspeechend = function () {
      recognition.stop();
    };
  }

  render() {
    return (
      <div className="icon">
        <FontAwesomeIcon
          icon={faMicrophone}
          role="button"
          onClick={this.startListen}
        />
      </div>
    );
  }
}

export default Speech;
