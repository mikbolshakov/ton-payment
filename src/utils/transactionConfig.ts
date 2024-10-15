import { Address } from 'ton';
import { toNano } from 'ton';

export const getTxValidUntil = () => Math.floor(Date.now() / 1000) + 600;

// addresses
export const RECEIVER_ADDRESS = Address.parse(
  'UQAouuxpxM9xeiFk5eOBORPxut7WYrPPJMVbLHGdwN5DF4Vu',
);
export const USDT_MASTER_ADDRESS =
  'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs';
export const NOT_MASTER_ADDRESS =
  'EQAvlWFDxGF2lXm67y4yzC17wYKD9A0guwPkMs1gOsM__NOT';

// amount
export const TON_AMOUNT = toNano('0.08');
export const TON_FEE = toNano('0.04');
export const NOT_AMOUNT = toNano('1');
export const USDT_AMOUNT = 0.06 * 1_000_000;
