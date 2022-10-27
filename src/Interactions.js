import {React, useState, useEffect} from 'react';
import {ethers} from 'ethers';

const Interactions = (props) => {
    const [transferHash, setTransferHash] = useState(null);
    const transferHandler = async (e) => {
        e.preventDefault();
        let getAmount = e.target.sendAmount.value;
        // let transferAmount = ethers.utils.formatEther(getAmount);
        console.log(getAmount);
        let receiverAddress = e.target.receiverAddress.value;

        let txn = await props.contract.transfer(receiverAddress, getAmount);
        setTransferHash(txn.hash);
    }

  return (
    <div className='interactions'>
        <form onSubmit={transferHandler}>
            <div className='mb-3 frmDiv' onSubmit={transferHandler}>
                <div className='mb-3 row'>
                    <label htmlFor="receiverAddress" className='form-label'>Send Hardhat Token</label>
                    <input type="text" className="form-control" name='receiverAddress' id='receiverAddress' placeholder="0xaaa...ccc" aria-label="receiverAddress"/>
                </div>
                <div className='mb-3 row'>
                    <label htmlFor="sendAmount" className='form-label'>Send Amount</label>
                    <input type="number" min="0" className="form-control" name="sendAmount" id="sendAmount" placeholder="xxxxxxxx" aria-label="sendAmount"/>
                </div>
                <button type='submit' className='btn btn-primary'>Send</button>
                <div className='mb-3'>
                    {transferHash}
                </div>
            </div>
            
        </form>
        
    </div>
  )
}

export default Interactions