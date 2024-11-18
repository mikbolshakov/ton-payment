import { TonConnectButton } from '@tonconnect/ui-react';
import TonExchangeRate from './components/rate/TonExchangeRate';
import AddressDisplay from './components/addresses/AddressDisplay';
import ActionButtons from './components/buttons/ActionButtons';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="container">
      <TonExchangeRate />
      <TonConnectButton />
      <AddressDisplay />
      <ActionButtons />
    </div>
  );
};

export default App;
