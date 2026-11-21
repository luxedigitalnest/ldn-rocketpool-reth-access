// Original open-source read-only calculation utilities. No wallet, keys or transactions.
export const ETH_WEI = 1000000000000000000n;
export const REGISTRY = '0x1d8f8f00cfa6758d7be78336684788fb0ee0fa46';
export const KEY = Object.freeze({
  deposit: '65dd923ddfc8d8ae6088f80077201d2403cbd565f0ba25e09841e2799ec90bb2',
  reth: 'e3744443225bff7cc22028be036b80de58057d65a3fdca0a3df329f525e31ccc',
  settings: '876d8a498b5341a6b5897a8239bfb0347e2b8d81fe9401d355c1e4b0ecebedaa'
});
export const SIG = Object.freeze({
  getAddress:'21f8a721', max:'1eddb626', poolBalance:'12065fe0',
  rate:'e6aa216c',enabled:'6ada7847', minimum:'035cf142'
});
export function normalizedAddress(word){
 if(typeof word!=='string'|| !/^0x[0-9a-fA-F]{64}$/.test(word))throw Error('Invalid EVM return data');
 if(!/^0{24}$/i.test(word.slice(2,26)))throw Error('Malformed ABI address padding');
 const addr='0x'+word.slice(-40);
 if(/^0x0{40}$/i.test(addr))throw Error('Registry returned zero address');
 return addr;
}
export function parseRpcHex(word){
 if(typeof word!=='string'|| !/^0x[0-9a-fA-F]+$/.test(word))throw Error('Invalid Ethereum RPC hex');
 return BigInt(word);
}
export function ethAmountToWei(input){
 const str=String(input).trim();
 if(!/^(?:0|[1-9]\d{0,8})(?:\.\d{1,18})?$/.test(str))throw Error('Enter a valid ETH amount, up to 18 decimals');
 const [a,b='']=str.split('.');
 return BigInt(a)*ETH_WEI+BigInt(b.padEnd(18,'0'));
}
export function formatEth(wei,digits=5){
 if(typeof wei!=='bigint'||wei<0n)throw Error('Invalid unsigned wei amount');
 const units=wei/ETH_WEI;
 const rem=wei%ETH_WEI;
 const places=rem.toString().padStart(18,'0').slice(0,digits).replace(/0+$/,'');
 return units.toLocaleString('en-US')+(places?'.'+places:'');
}
export function rethForEth(ethWei,rateWei){
 if(rateWei<=0n||ethWei<0n)throw Error('Invalid exchange rate / amount');
 // Protocol spot estimator only; real mint may include fees and rounding.
 return ethWei*ETH_WEI/rateWei;
}
export function readiness({enabled,minimum,max,amount}){
 if(enabled===null||typeof minimum!=='bigint'||typeof max!=='bigint')return {state:'unknown',reason:'Read-only protocol data is unavailable'};
 if(enabled===false)return {state:'disabled',reason:'Protocol deposit switch currently reports disabled'};
 if(amount<minimum)return {state:'below_minimum',reason:'Amount is below the protocol-reported minimum'};
 if(max<amount)return {state:'above_reported_maximum',reason:'Amount exceeds the protocol-reported maximum'};
 return {state:'conditions_met',reason:'Read-only checks pass, but this is NOT a mint guarantee'};
}
