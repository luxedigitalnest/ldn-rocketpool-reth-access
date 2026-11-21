import {ETH_WEI,REGISTRY,KEY,SIG,normalizedAddress,parseRpcHex,ethAmountToWei,formatEth,rethForEth,readiness} from './logic.js';

// Read-only requests to public mainnet RPCs; never ask for or touch a wallet.
const RPCS=['https://ethereum-rpc.publicnode.com','https://eth.llamarpc.com'];
const $=id=>document.getElementById(id);
let snapshot=null,sourceRpc=null;
let requestId=10;
async function rpc(endpoint,method,params=[]){
 const controller=new AbortController();
 const timer=setTimeout(()=>controller.abort(),8500);
 try{
  const response=await fetch(endpoint,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({jsonrpc:'2.0',method,params,id:requestId++}),signal:controller.signal,cache:'no-store'});
  if(!response.ok)throw Error('HTTP '+response.status);
  const out=await response.json();
  if(out.error||typeof out.result==='undefined')throw Error(out.error?.message??'Malformed RPC response');
  return out.result;
 }finally{clearTimeout(timer);}
}
async function call(endpoint,address,selector,at,argument=''){
 return await rpc(endpoint,'eth_call',[{to:address,data:'0x'+selector+argument},at]);
}
async function inspect(endpoint){
 const chain=await rpc(endpoint,'eth_chainId');
 if(chain!=='0x1')throw Error('Endpoint is not Ethereum mainnet');
 const at=await rpc(endpoint,'eth_blockNumber');
 const block=await rpc(endpoint,'eth_getBlockByNumber',[at,false]);
 if(!block?.hash||!block?.timestamp)throw Error('Cannot independently anchor RPC block');
 const registryCode=await rpc(endpoint,'eth_getCode',[REGISTRY,at]);
 if(!registryCode||registryCode==='0x')throw Error('Official storage contract missing');
 const find=async key=>{
  const raw=await call(endpoint,REGISTRY,SIG.getAddress,at,key);
  return normalizedAddress(raw);
 };
 const [deposit,reth,settings]=await Promise.all([find(KEY.deposit),find(KEY.reth),find(KEY.settings)]);
 const code=await Promise.all([rpc(endpoint,'eth_getCode',[deposit,at]),rpc(endpoint,'eth_getCode',[reth,at]),rpc(endpoint,'eth_getCode',[settings,at])]);
 if(code.some(x=>x==='0x'))throw Error('One of the registry addresses has no deployed code');
 const [max,poolBalance,rate,enabled,minimum]=await Promise.all([
  call(endpoint,deposit,SIG.max,at),call(endpoint,deposit,SIG.poolBalance,at),
  call(endpoint,reth,SIG.rate,at),call(endpoint,settings,SIG.enabled,at),
  call(endpoint,settings,SIG.minimum,at)
 ]);
 const yes=parseRpcHex(enabled);
 if(yes!==0n&&yes!==1n)throw Error('Deposit status field is not boolean');
 return {block:Number(parseRpcHex(at)),hash:block.hash,time:new Date(Number(parseRpcHex(block.timestamp))*1000).toISOString(),
  deposit,reth,settings,maximumWei:parseRpcHex(max),poolWei:parseRpcHex(poolBalance),
  rateWei:parseRpcHex(rate),minimumWei:parseRpcHex(minimum),enabled:yes===1n};
}
function setText(id,t){$(id).textContent=String(t);}
function tag(a,label){const node=document.createElement('a');node.href='https://etherscan.io/address/'+a;node.target='_blank';node.rel='noopener noreferrer';node.textContent=label||a;return node;}
function show(){
 if(!snapshot)return;
 const s=snapshot;
 setText('block',s.block.toLocaleString('en-US'));
 setText('time',s.time.replace('T',' ').replace('.000Z',' UTC'));
 setText('hash',s.hash.slice(0,14)+'…'+s.hash.slice(-8));
 setText('registry',REGISTRY);setText('deposit',s.deposit);
 setText('reth',s.reth);setText('settings',s.settings);
 setText('enabled',s.enabled?'Enabled (on-chain report)':'Disabled');
 setText('minimum',formatEth(s.minimumWei,5)+' ETH');
 setText('max',formatEth(s.maximumWei,2)+' ETH (reported ceiling, not guaranteed)');
 setText('balance',formatEth(s.poolWei,5)+' ETH (contract figure, not free liquidity)');
 setText('rate',formatEth(s.rateWei,7)+' ETH per rETH');
 for(const id of ['deposit','reth','registry','settings']){
  const a=$(id);a.href='https://etherscan.io/address/'+(id==='registry'?REGISTRY:s[id]);
 }
 renderAmount();
}
function renderAmount(){
 if(!snapshot)return;
 const s=snapshot;
 try{
  const value=ethAmountToWei($('amount').value);
  const classification=readiness({enabled:s.enabled,minimum:s.minimumWei,max:s.maximumWei,amount:value});
  setText('readiness',classification.reason);
  $('readiness').dataset.state=classification.state;
  setText('estimate',formatEth(rethForEth(value,s.rateWei),8)+' rETH (illustrative, no fees/gas)');
  setText('verified','Ethereum block '+s.block.toLocaleString('en-US')+' · '+s.time.replace('T',' ').replace('.000Z',' UTC'));
 }catch(e){
  $('readiness').dataset.state='unknown';
  setText('readiness','No assessment — '+e.message);
  setText('estimate','Not calculated');
 }
}
async function refresh(){
 $('refresh').disabled=true;
 setText('rpcstate','Checking Ethereum mainnet contracts…');
 let messages=[];
 for(const url of RPCS){
  try{
   const result=await inspect(url);
   if(result.rateWei<=0n)throw Error('Zero rETH exchange rate');
   snapshot=result;sourceRpc=url;
   show();
   setText('rpcstate','Verified via '+new URL(url).hostname+' · on-chain registry · read-only');
   $('details').hidden=false;
   $('fallback').hidden=true;
   $('refresh').disabled=false;
   return;
  }catch(e){messages.push(new URL(url).hostname+': '+String(e.message).slice(0,140));}
 }
 snapshot=null;sourceRpc=null;
 $('details').hidden=true;$('fallback').hidden=false;
 setText('rpcstate','Live verification unavailable — no capacity or mint quote is shown.');
 setText('errors',messages.join(' | '));
 $('refresh').disabled=false;
}
$('refresh').addEventListener('click',refresh);
$('amount').addEventListener('input',renderAmount);
refresh();
