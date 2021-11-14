import instagramLogo from './assets/instagram-logo.svg';
import LunaOutline from './assets/luna-outline.svg';
import './App.css';

// Constants
const INSTAGRAM_HANDLE = 'cytronical.eth';
const INSTAGRAM_LINK = `https://instagram.com/${INSTAGRAM_HANDLE}`;

const DEVELOPER_ADDRESS = 'HhK2kzyUnpg1CDD9dj6JqYPP5auWj22mdiQ45jmvdRgh';

const DEVELOPER_DISCORD = 'Cytronical.eth#4975';

const App = () => {

  const sendSolToDev = () => (
    <p className="sub-text"><b>Want to have a voice on what we are building next?</b><br /><br />1. Donate some SOL to <code>{DEVELOPER_ADDRESS}</code><br />and DM <code>{DEVELOPER_DISCORD}</code> your address to become a patreon!<br /><br />2. Join our Discord server! Link coming soon™</p>
  );

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <img alt="Luna Logo" className="logo-svg-big" src={LunaOutline} />
          <p className="header">Luna</p>
          <p className="sub-text">
            Chat in realtime with the Solana blockchain!
          </p>
          {sendSolToDev()}
          <button className="cta-button connect-wallet-button">Coming soon!</button>
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
