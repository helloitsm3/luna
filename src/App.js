import instagramLogo from './assets/instagram-logo.svg';
import soliloquyLogo from './assets/soliloquy-logo.svg';
import './App.css';

// Constants
const INSTAGRAM_HANDLE = 'cytronical.eth';
const INSTAGRAM_LINK = `https://instagram.com/${INSTAGRAM_HANDLE}`;

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <img alt="Soliloquy Logo" className="logo-svg-big" src={soliloquyLogo} />
          <p className="header">Soliloquy</p>
          <p className="sub-text">
            Chat in realtime with the Solana blockchain.
          </p>
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="logo-svg" src={instagramLogo} />
          <a
            className="footer-text"
            href={INSTAGRAM_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${INSTAGRAM_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
