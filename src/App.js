// React
import { useEffect, useState } from "react";

// Asset imports
import instagram from "./assets/social/instagram.svg";
import logoOutline from "./assets/logo/outline.svg";

// CSS
import "./App.css";

// Constants
const INSTAGRAM_HANDLE = "cytronical.eth";
const INSTAGRAM_LINK = `https://instagram.com/${INSTAGRAM_HANDLE}`;

const App = () => {
  // States
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  // Actions

  // Wallet actions
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom wallet found!");
          const response = await solana.connect({ onlyIfTrusted: true });
          console.info("Connected with public key: ", response.publicKey.toString());

          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert("Solana object not found! Get a Phantom Wallet at https://phantom.app/ in order to use this app.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;
    if (solana) {
      const response = await solana.connect();
      console.log("Connected! Public key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    } else {
        alert("Solana object not found! Get a Phantom Wallet at https://phantom.app/ in order to use this app.");
    }
  };

  // Renders
  const renderVotingContainer = () => {}

  const renderNotConnectedContainer = () => (
    <button className="cta-button connect-wallet-button" onClick={connectWallet}>
      Connect to wallet
    </button>
  );

  const renderConnectedContainer = () => (
    <div className="connected-container">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          sendMsg();
        }}
      >
        <input type="text" value={inputValue} placeholder="Message to the blockchain!" onChange={onInputChange} />

        <button type="submit" className="cta-button submit-button">
          Send
        </button>
      </form>

      {msgGrid()}
    </div>
  );

  // Messages
  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const sortMsg = () => {
    return messages.sort((a, b) => {
      return b.timeInt - a.timeInt;
    });
  };

  const sendMsg = async () => {
    if (inputValue.length > 0) {
      setMessages([
        ...messages,
        {
          sender: walletAddress,
          value: inputValue,
          timeSent: new Date().toLocaleString(),
          timeInt: Date.now(),
        },
      ]);

      console.log(`Message sent! Message:`, inputValue);

      setInputValue("");
    } else {
      console.log("Empty input. Try again.");
    }
  };

  const msgGrid = () => (
    <div className="msg-grid">
      {sortMsg()
        .slice(0, 3)
        .map((msg, index) => {
          const address = `${msg.sender}`;

          return (
            <div className="msg-box" key={index}>
              <p className="msg-text">
                <span className="sender-span">{address}</span>
                <span className="time-span">{msg.timeSent}</span>
                <br />
                {msg.value}
              </p>
            </div>
          );
        })}
    </div>
  );

  // Effects
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  // Return
  return (
    <div className="App">
      <div className={walletAddress ? "authed-container" : "container"}>
        <div className="header-container">
          <p className="header">
            <img alt="Continuum Logo" className="logo-svg" src={logoOutline} /> continuum.sol
          </p>
          <p className="sub-text">Chat in realtime with the Solana blockchain!</p>
          {!walletAddress && renderNotConnectedContainer() && renderVotingContainer()}
          {walletAddress && renderConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="logo-svg" src={instagram} />
          <a className="footer-text" href={INSTAGRAM_LINK} target="_blank" rel="noreferrer">{`built by @${INSTAGRAM_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
