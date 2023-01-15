import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import SampleContract from './artifacts/contracts/SampleContract.sol/SampleContract.json';
const signerPrivateKey = process.env.REACT_APP_PRIVATE_KEY;

const SampleContractAddress = "0x6797d830843B5dFEAcfd8c6AEB0Ca60fd54cc60a";

function App() {
  const [counter, setCounter] = useState(0);
  const [greetingName, setGreetingName] = useState('');
  const [greetingMessage, setGreetingMessage] = useState('');

  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");
  let walletSigner = new ethers.Wallet(signerPrivateKey, provider);
  const readWriteContract = new ethers.Contract(SampleContractAddress, SampleContract.abi, walletSigner);
  // read-only
  const contract = new ethers.Contract(SampleContractAddress, SampleContract.abi, provider)

  contract.on("CounterChanged", (counter) => {
    setCounter(counter.toString());
  });

  contract.on("NameChanged", (name) => {
    setGreetingMessage("Hello, " + name.toString());
  });

  async function setName() {
    const greetingTx = await readWriteContract.setName(greetingName);
    await greetingTx.wait();
  }

  async function incrementCounter() {
    const counterTx = await readWriteContract.incrementCounter();
    await counterTx.wait();
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={incrementCounter}>Increment Counter</button>
        <div>Counter value: {counter}</div>
        <br></br>
        <button onClick={setName}>Set name</button>
        <input onChange={e => setGreetingName(e.target.value)} placeholder="Name" />
        <br/><br/>
        <div>Greeting message: {greetingMessage}</div>
      </header>
    </div>
  );
}

export default App;