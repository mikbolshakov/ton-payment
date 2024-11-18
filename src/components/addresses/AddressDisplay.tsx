import { useTonAddress } from '@tonconnect/ui-react';
import './AddressDisplay.css';

const AddressDisplay: React.FC = () => {
  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);

  return (
    <div>
      <span>User-friendly address: {userFriendlyAddress}</span>
      <span>Raw address: {rawAddress}</span>
    </div>
  );
};

export default AddressDisplay;
