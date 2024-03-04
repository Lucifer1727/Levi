import React, { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import KeyboardVoiceTwoToneIcon from "@mui/icons-material/KeyboardVoiceTwoTone";
import "../App.css";
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.lang = "en-IN";
recognition.interimResults = true;
recognition.maxAlternatives = 1;

let finalTranscript = "";
let data = "";
const SpeechComponent = () => {
  const outputRef = useRef(null);
  const notesRef = useRef(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // ...

  // ...
  useEffect(() => {
    recognition.onstart = () => {
      setIsSpeaking(true);
    };

    recognition.onend = () => {
      setIsSpeaking(false);
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      outputRef.current.textContent = finalTranscript + interimTranscript;
      // notesRef.current.textContent = finalTranscript + interimTranscript;
    };

    recognition.onspeechend = () => {
      recognition.stop();
    };

    recognition.onnomatch = (event) => {
      outputRef.current.textContent = "I didn't recognize that command.";
    };

    recognition.onerror = (event) => {
      outputRef.current.textContent = `Error occurred in recognition: ${event.error}`;
    };
  }, []);

  // ...
  return (
    <div className="flex flex-col sm:h-screen">
      <div></div>
      <div></div>
    </div>
  );
  // ...
};

export default SpeechComponent;
