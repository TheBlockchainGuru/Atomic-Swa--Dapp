import React, {Component} from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import TestERC20 from '../abis/TestERC20.json';
import Test2ERC20 from '../abis/Test2ERC20.json';
import AtomicSwapERC20ToERC20 from '../abis/AtomicSwapERC20ToERC20.json';

class ERC20ToERC20 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            swapID : '',
            process : '',
            openValue : 500,
            closeValue : 200,
        }
        this.handleOpenValue    = this.handleOpenValue.bind(this)
        this.handleCloseValue   = this.handleCloseValue.bind(this)
    }
    
    async componentWillMount() {
        await this.init();
    }

    async init() {
        /******************* Contract Variables *********/
        //ropsten
        // const contractAddress   = '0x3c83627306C34AB24a9259933fF40910B535Cd96';
        // const openTokenAddress      = '0x53f95ea2Cce0a7255c4a837341AAA43a8B4B5d39';
        // const closeTokenAddress = '';
        // const serverAddress     = '0x4B3BE6427c6eC26304C983630571b7A8C344D60f'
        // const serverPrivateKey  = '3c56cda7fddd5ef749e938882afc217832ec8320cd90c32006f0b84bc0d93bc6';
        //
        //kovan
        const contractAddress   = '0xf77b7f0fe53cec7ae28cc3000a09ec9081d4a84e';
        const openTokenAddress  = '0x3820a7e40839a6dae391d800a70d16e92f1b379a';
        const closeTokenAddress = '0xdf5865fad7ed113d0ac11490de555f22f64129c8';
        const serverAddress     = '0xf865A00F900C9e0Bc9052A5797bcD07Bee2e5ED4';
        const serverPrivateKey  = 'd73f13f27c07b5a37c3a7fe6576b2ed21770074b12b40f49776fb6f7847b0a55';

        const openValue        = 500;
        const closeValue        = 200;
        const swapID            = window.web3.utils.randomHex(32);
        /***************************************/

        const clientWeb3    = window.web3;
        // const serverWeb3    = new Web3(new Web3.providers.HttpProvider(testNetUrl));

        const accounts      = await clientWeb3.eth.getAccounts();
        accounts[1] = serverAddress;
        
        const contract          = await clientWeb3.eth.Contract(AtomicSwapERC20ToERC20.abi, contractAddress);
        const openToken             = await clientWeb3.eth.Contract(TestERC20.abi, openTokenAddress);
        const closeToken             = await clientWeb3.eth.Contract(Test2ERC20.abi, closeTokenAddress);

        this.setState({
            contract : contract,
            openToken : openToken,
            closeToken : closeToken,
            openValue : openValue,
            closeValue : closeValue,
            swapID : swapID,
            accounts : accounts,
            serverPrivateKey : serverPrivateKey,
            process: ''
        })
    }

    async open () {
        await this.state.openToken.methods.approve(this.state.contract.address, this.state.openValue)
        .send({from : this.state.accounts[0]})
        .once('confirmation', async () => {
            await this.state.contract.methods.open(
                this.state.swapID,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                this.state.openValue,
                this.state.openToken.address,
                this.state.closeValue,
                this.state.accounts[1],
                this.state.closeToken.address
            ).send({
                from : this.state.accounts[0],
                gasValue : window.web3.utils.toWei('20', 'Gwei'),
                gas : 500000,
            })
            .once('confirmation', () => {
                this.check()
                let process = this.state.process
                let message = 'Alice deposits ether into the contract.\n'
                process += message

                this.setState({
                    process : process
                })
                this.close()
            })
        })
    }

    async check() {
        await this.state.contract.methods.check(this.state.swapID).call()
            
        let process = this.state.process
        let message = 'Bob checks the ether in the lock box.\n'
        process += message

        this.setState({
            process : process
        })
    }

    async close () {
        const web3      = window.web3;
        // /********************** transfer **************/

        // /********************** approve ***************/
        let nonce = await web3.eth.getTransactionCount(this.state.accounts[1])
        let tx  = {
            from : this.state.accounts[1],
            to : this.state.closeToken.address,
            data : this.state.closeToken.methods.approve(this.state.contract.address, this.state.closeValue).encodeABI(),
            gasValue : web3.utils.toWei('20', 'Gwei'),
            gas : 500000,
            nonce : nonce
        }

        let promise = await web3.eth.accounts.signTransaction(tx, this.state.serverPrivateKey);
        console.log('this is first')
        await web3.eth.sendSignedTransaction(promise.rawTransaction)
        .once('confirmation', async () => {
            /********************** allowance *************/
            await this.state.closeToken.methods.allowance(this.state.accounts[1], this.state.contract.address).call()
                                                // .send({from : this.state.accounts[0]})
            let nonce       = await web3.eth.getTransactionCount(this.state.accounts[1])
            /********************** close *****************/
            const tx    = {
                from : this.state.accounts[1],
                to : this.state.contract.address,
                data : this.state.contract.methods.close(this.state.swapID).encodeABI(),
                gasValue : web3.utils.toWei('20', 'Gwei'),
                gas : 500000,
                nonce : nonce
            }
            const promise   = await web3.eth.accounts.signTransaction(tx, this.state.serverPrivateKey);
            await web3.eth.sendSignedTransaction(promise.rawTransaction)
                .once('confirmation', () => {
                    let process = this.state.process
                    let message = 'Bob closes the swap.\n'
                    process += message
                    this.setState({
                        process : process
                    })
                })
                .once('error', (e) => {
                    console.log(e)
                })
        })
    }

    async cancel() {
        await this.state.openToken.methods.approve(this.state.contract.address, this.state.openValue)
        .send({from : this.state.accounts[0]})
        .once('confirmation', async () => {
            await this.state.contract.methods.open(
                this.state.swapID,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                this.state.openValue,
                this.state.openToken.address,
                this.state.closeValue,
                this.state.accounts[1],
                this.state.closeToken.address
            ).send({
                from : this.state.accounts[0],
                gasValue : window.web3.utils.toWei('20', 'Gwei'),
                gas : 300000
            })
            .once('confirmation', () => {
                let process = this.state.process
                let message = 'Alice deposits ether into the contract.\n'
                process += message

                this.setState({
                    process : process
                })
                this.expire()
            })
        })
    }
    async expire() {
        await this.state.contract.methods.expire(this.state.swapID)
                    .send({from: this.state.accounts[0]})
                    .once('confirmation', () => {
                        let process = this.state.process
                        let message = 'Alice withdraws after expiry.\n'
                        process += message
                        this.setState({
                            process : process
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
    render () {
        return (
            <div>
                
                <h2>ERC20 to ERC20 Atomic Swap</h2>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Swap ID</Form.Label>
                        <Form.Control type="text" placeholder="Swap ID" defaultValue={this.state.swapID} />
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Open Value</Form.Label>
                            <Form.Control type="text" placeholder="Open Value" value={this.props.openValue} onChange={this.handleOpenValue} defaultValue={this.state.openValue} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Close Value</Form.Label>
                            <Form.Control type="text" placeholder="Close Value" value={this.props.closeValue} onChange={this.handleCloseValue} defaultValue={this.state.closeValue} />
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Swap Process</Form.Label>
                        <Form.Control as="textarea" rows={3} value={this.state.process} readOnly={true} />
                    </Form.Group>
                    <Form.Group>
                        <Button onClick={() => this.open()} >Open-Close process</Button>
                        <Button className="mb-right" onClick={() => this.cancel()} >Open-Expiry process</Button>
                    </Form.Group>
                </Form>
            </div>
        );

    }
}

export default ERC20ToERC20;