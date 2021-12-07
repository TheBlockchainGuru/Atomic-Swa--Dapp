import React, {Component} from 'react';
import AtomicSwapERC20ToERC20 from '../abis/AtomicSwapERC20ToERC20.json';
import Test2ERC20 from '../abis/Test2ERC20.json';
import TestERC20 from '../abis/TestERC20.json';
import {Form, Button, Row, Col} from 'react-bootstrap';
import Web3 from 'web3';




const bob_token_address= '0x7945c9b286717f385344b44c1E36fa265E7F1511'
const bob_pk =  Buffer.from('0ed3b62dd15656d5336cf471c65f9c3fdd9e0d47bec649971cf57027ec92d527','hex');
const swapcontract_address= '0xd7c164cB747820f7057Bb35271F208cAF5162391'
const bob_address =  '0x8C4E3888e53a165731377a4CC4b860815aCDa699' 

const Tx = require('ethereumjs-tx').Transaction
const web3_bob = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"));
const contractABI = [{"constant":true,"inputs":[{"name":"_swapID","type":"bytes32"}],"name":"check","outputs":[{"name":"openValue","type":"uint256"},{"name":"openContractAddress","type":"address"},{"name":"closeValue","type":"uint256"},{"name":"closeTrader","type":"address"},{"name":"closeContractAddress","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_swapID","type":"bytes32"}],"name":"close","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_swapID","type":"bytes32"},{"name":"_openValue","type":"uint256"},{"name":"_openContractAddress","type":"address"},{"name":"_closeValue","type":"uint256"},{"name":"_closeTrader","type":"address"},{"name":"_closeContractAddress","type":"address"}],"name":"open","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_swapID","type":"bytes32"}],"name":"expire","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_swapID","type":"bytes32"},{"indexed":false,"name":"_closeTrader","type":"address"}],"name":"Open","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_swapID","type":"bytes32"}],"name":"Expire","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_swapID","type":"bytes32"}],"name":"Close","type":"event"}]
// const alice_tokenABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"burnFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]
const bob_tokenABI=[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"burnFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]
// const alice_address =  '0xf865A00F900C9e0Bc9052A5797bcD07Bee2e5ED4' 
// const alice_token_address= '0xad584b71589cd3369a4b287f716f7c0242d86c8a';
const swapID =web3_bob.utils.randomHex(32)
const alice_value=1000
const bob_value=500
const swapcontract =web3_bob.eth.Contract(contractABI,     swapcontract_address)
// const alice_token  =web3_bob.eth.Contract(alice_tokenABI,  alice_token_address)
const bob_token    =web3_bob.eth.Contract(bob_tokenABI,    bob_token_address)



class Erc20 extends Component {
    async componentWillMount() {
        await this.loadBlockChainData()
    }

    constructor(props) {
        super(props)
        this.state = {
            swapID       : '',
            swapcontract : {},
            alice_token  : {},
            bob_token    : {},
            alice_address: [],
            bob_address  : [],
            openValue    : 1000,
            closeValue   : 500,
            expiry       : '',
            result       : '',
        }
        this.handleCloseValue   = this.handleCloseValue.bind(this)
        this.handleOpenValue    = this.handleOpenValue.bind(this)
    }


     async loadBlockChainData() {
        const web3_alice    = window.web3;
        const openValue     = 1000;
        const closeValue    = 500;
        const swapcontract  = web3_alice.eth.Contract(AtomicSwapERC20ToERC20.abi, '0xecf096558458d2f1477e3f4fda93f45050b383cc');
        const bob_token     = web3_alice.eth.Contract(TestERC20.abi, '0x0006550f4deb5854714073f64ed84a8cb547c18c');
        const alice_token   = web3_alice.eth.Contract(Test2ERC20.abi, '0xad584b71589cd3369a4b287f716f7c0242d86c8a');
        const accounts  = await window.web3.eth.getAccounts()
        const alice_address = accounts[0]
        // console.log(alice_address);return
        const bob_address   ='0x8C4E3888e53a165731377a4CC4b860815aCDa699'

        this.setState({
            swapID : swapID,
            swapcontract  : swapcontract, 
            alice_token   : alice_token, 
            bob_token     : bob_token, 
            alice_address : alice_address,
            bob_address   : bob_address,
            openValue     : openValue,  
            closeValue    : closeValue,
            result        : ''
        })
    }

    async open(){

        await this.state.alice_token.methods.approve(this.state.swapcontract.address,this.state.openValue)
                                    .send({
                                        from: this.state.alice_address, 
                                        gasPrice : window.web3.utils.toWei('30', 'gwei'),
                                        gas: 30000, 
                                    })
                                    .once('confirmation', async()=>{
                                        const msg ='alice approve token.\n'
                                        let result  = this.state.result + msg;
                                        this.setState({
                                            result : result
                                        })
                                        await this.state.swapcontract.methods.open(
                                                                            swapID, 
                                                                            this.state.openValue, 
                                                                            this.state.alice_token.address, 
                                                                            this.state.closeValue,  
                                                                            this.state.bob_address, 
                                                                            this.state.bob_token.address
                                                                        )
                                                                        .send({
                                                                            from: this.state.alice_address,
                                                                            gasPrice : window.web3.utils.toWei('30', 'gwei'),
                                                                            gas: 30000,
                                                                        })
                                                                        .once('confirmation', async()=>{ 
                                                                            const msg ='alice open token\n'
                                                                            let result  = this.state.result + msg;
                                                                            this.setState({
                                                                                result : result
                                                                            })
                                                                            console.log(msg)
                                                                            await this.bob()
                                                                        })
                                    })
    }
                                                                        
    async bob(){
        web3_bob.eth.getTransactionCount(bob_address, async (err, txCount) => {
        const txObject = {
                        nonce:    web3_bob.utils.toHex(bob_address),
                        gasLimit: web3_bob.utils.toHex(800000), 
                        gasPrice: web3_bob.utils.toHex(web3_bob.utils.toWei('30', 'gwei')),
                    to: bob_token_address,
                    data: bob_token.methods.transfer(bob_address, alice_value).encodeABI()
                    }
                    const tx = new Tx(txObject,{'chain':'ropsten'});
                    tx.sign(bob_pk)
                    const serializedTx = tx.serialize()
                    const raw = '0x' + serializedTx.toString('hex')
                     web3_bob.eth.sendSignedTransaction(raw)
                    .send({
                        from: this.state.alice_address, 
                        gasPrice : window.web3.utils.toWei('30', 'gwei'),
                        gas: 30000, 
                    })
                    .once('confirmation', async()=>{

                        let msg = 'bob receive token'
                        let result  = this.state.result + msg;
                        this.setState({
                            result : result
                        })
                     web3_bob.eth.getTransactionCount(bob_address, async (err, txCount) => {
                        const txObject = {
                        nonce:    web3_bob.utils.toHex(bob_address),
                        gasLimit: web3_bob.utils.toHex(800000), // Raise the gas limit to a much higher amount
                        gasPrice: web3_bob.utils.toHex(web3_bob.utils.toWei('30', 'gwei')),
                        to: bob_token_address,
                        data: bob_token.methods.approve(swapcontract_address, bob_value).encodeABI()
                        }
                        const tx = new Tx(txObject,{'chain':'ropsten'});
                        tx.sign(bob_pk)
                        const serializedTx = tx.serialize()
                        const raw = '0x' + serializedTx.toString('hex')
                        web3_bob.eth.sendSignedTransaction(raw)
                        .send({
                            from: this.state.bob_address, 
                            gasPrice : window.web3.utils.toWei('30', 'gwei'),
                            gas: 30000, 
                        })
                        .once('confirmation', async ()=>{
                                
                                // web3_bob.eth.getTransactionCount(bob_address, async (err, txCount) => {
                                //     const txObject = {
                                //         from : this.state.alice_address,
                                //         nonce:    web3_bob.utils.toHex(bob_address),
                                //         gasLimit: web3_bob.utils.toHex(800000), // Raise the gas limit to a much higher amount
                                //         gasPrice: web3_bob.utils.toHex(web3_bob.utils.toWei('30', 'gwei')),
                                //         to: bob_token_address,
                                //         data: bob_token.methods.allowance(bob_address, swapcontract_address).encodeABI()
                                //     }
                                //     const tx = new Tx(txObject,{'chain':'ropsten'});
                                //     tx.sign(bob_pk)
                                //     const serializedTx = tx.serialize()
                                //     const raw = '0x' + serializedTx.toString('hex')
                                //     web3_bob.eth.sendSignedTransaction(raw)
                                // // .send({
                                // //     from: this.state.alice_address, 
                                // //     gasPrice : window.web3.utils.toWei('30', 'gwei'),
                                // //     gas: 30000, 
                                // // })
                                //     .once('confirmation', async()=>{
                                    await bob_token.methods.allowance(bob_address, swapcontract_address).call()
                                                    let msg ='bob check constract'
                                                    let result  = this.state.result + msg;
                                                    this.setState({
                                                        result : result
                                                    })

                                                    web3_bob.eth.getTransactionCount(bob_address, async (err, txCount) => {
                                                        const txObject = {
                                                            nonce:    web3_bob.utils.toHex(bob_address),
                                                            gasLimit: web3_bob.utils.toHex(800000), // Raise the gas limit to a much higher amount
                                                            gasPrice: web3_bob.utils.toHex(web3_bob.utils.toWei('30', 'gwei')),
                                                            to: swapcontract_address,
                                                            data: swapcontract.methods.close(swapID).encodeABI()
                                                        }
                                                        const tx = new Tx(txObject,{'chain':'ropsten'});
                                                        tx.sign(bob_pk)
                                                        const serializedTx = tx.serialize()
                                                        const raw = '0x' + serializedTx.toString('hex')
                                                        web3_bob.eth.sendSignedTransaction(raw, (err, txHash) => {
                                                            
                                                            let msg = 'bob close constract'
                                                            let result  = this.state.result + msg;
                                                            this.setState({
                                                                result : result
                                                            })
                                                        })
                                                    }) 
                                //     })
                                // })
                        })
                    })
                })
                })
            }
    handleCloseValue(e) {
        let closeValue = e.target.value;
        this.setState({
            closeValue : closeValue
        })
        console.log(closeValue  )
    }

    handleOpenValue(e) {
        let openValue = e.target.value;
        this.setState({
            openValue : openValue
        })

    }
    render() {
        return(
            <div id="erc20_content" className="col-lg-12 col-md-12 col-sm-12">
                <h2>ERC20 to ERC20</h2>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Swap ID</Form.Label>
                        <Form.Control placeholder="Swap ID" defaultValue={this.state.swapID} />
                    </Form.Group>
                    <Form.Group>
                    <Row>
                        <Col>
                        <Form.Control type="text" placeholder="Open Value" defaultValue={this.state.openValue} value={this.props.openValue} onChange={this.handleOpenValue} />
                        </Col>
                        <Col>
                        <Form.Control type="text" placeholder="Close Value" defaultValue={this.state.closeValue} value={this.props.closeValue} onChange={this.handleCloseValue} />
                        </Col>
                    </Row>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>console </Form.Label>
                        <Form.Control as="textarea" rows={7} readOnly={true} value={this.state.result} />
                    </Form.Group>


                    <Form.Group className="mb-3">
                        <Button onClick={() => this.open()}>Open</Button>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}
export default Erc20;
