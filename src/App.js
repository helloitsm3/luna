import { useEffect, useState } from 'react';
import instagramLogo from './assets/instagram-logo.svg';
import soliloquyOutline from './assets/soliloquy-outline.svg';
import './App.css';

// Constants
const INSTAGRAM_HANDLE = 'cytronical.eth';
const INSTAGRAM_LINK = `https://instagram.com/${INSTAGRAM_HANDLE}`;

const App = () => {

  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            'Connected with public key: ',
            response.publicKey.toString()
          );

          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet at https://phantom.app/ in order to use this app.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;
    if (solana) {
      const response = await solana.connect();
      console.log('Connected! Public key: ', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const renderNotConnectedContainer = () => (
    <button className="cta-button connect-wallet-button" onClick={connectWallet}>
      Connect to wallet
    </button>
  );

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="App">
      <div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <img alt="Soliloquy Logo" className="logo-svg-big" src={soliloquyOutline} />
          <p className="header">Soliloquy</p>
          <p className="sub-text">
            Chat in realtime with the Solana blockchain!
          </p>
          {!walletAddress && renderNotConnectedContainer()}
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
