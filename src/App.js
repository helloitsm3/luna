import instagramLogo from './assets/instagram-logo.svg';
import soliloquyOutline from './assets/soliloquy-outline.svg';
import './App.css';

// Constants
const INSTAGRAM_HANDLE = 'cytronical.eth';
const INSTAGRAM_LINK = `https://instagram.com/${INSTAGRAM_HANDLE}`;

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <img alt="Soliloquy Logo" className="logo-svg-big" src={soliloquyOutline} />
          <p className="header">Soliloquy</p>
          <p className="sub-text">
            Chat in realtime with the Solana blockchain!
          </p>
          <button className="cta-button connect-wallet-button">Connect to wallet</button>
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
