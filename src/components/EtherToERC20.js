import React, {Component} from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import TestERC20 from '../abis/TestERC20.json';
import AtomicSwapEtherToERC20 from '../abis/AtomicSwapEtherToERC20.json';

class EtherToERC20 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            swapID : '',
            process : '',
            tokenValue : 1000,
            etherValue : 50000000000000000,
        }
        this.handleEther    = this.handleEther.bind(this)
        this.handleToken    = this.handleToken.bind(this)
    }
    
    async componentWillMount() {
        await this.init();
    }

    async init() {
        /******************* Contract Variables *********/
        //ropsten
        // const contractAddress   = '0x3c83627306C34AB24a9259933fF40910B535Cd96';
        // const tokenAddress      = '0x53f95ea2Cce0a7255c4a837341AAA43a8B4B5d39';
        // const serverAddress     = '0x4B3BE6427c6eC26304C983630571b7A8C344D60f'
        // const serverPrivateKey  = '3c56cda7fddd5ef749e938882afc217832ec8320cd90c32006f0b84bc0d93bc6';
        //
        //ganache
        // const contractAddress   = '0xc41A9ba6E82dc7B7e2E33F3428c8c89124fccc42';
        // const tokenAddress      = '0xE9d21813Dc081ab26a12C26E73be1c9ab05A070e';
        // const serverAddress     = '0x0a5A44E710ffAe098842DC6d4A764974a02fFD17';
        // const serverPrivateKey  = 'b935e1cefa30afb947f8f048f2d1836e94704e8b8780324367cc90d83a51bfec';
        //
        //kovan
        const contractAddress   = '0x37fb00cf631b605ffcc33dc151eb8a783e5c5318';
        const tokenAddress      = '0xdf5865fad7ed113d0ac11490de555f22f64129c8';
        const serverAddress     = '0xf865A00F900C9e0Bc9052A5797bcD07Bee2e5ED4';
        const serverPrivateKey  = 'd73f13f27c07b5a37c3a7fe6576b2ed21770074b12b40f49776fb6f7847b0a55';

        // const etherValue        = 500
        // const tokenValue        = 1000
        const swapID            = window.web3.utils.randomHex(32);
        /***************************************/

        const clientWeb3    = window.web3;
        // const serverWeb3    = new Web3(new Web3.providers.HttpProvider(testNetUrl));

        const accounts      = await clientWeb3.eth.getAccounts();
        accounts[1] = serverAddress;
        
        const contract          = await clientWeb3.eth.Contract(AtomicSwapEtherToERC20.abi, contractAddress);
        const token             = await clientWeb3.eth.Contract(TestERC20.abi, tokenAddress);

        this.setState({
            contract : contract,
            token : token,
            // etherValue : etherValue,
            // tokenValue : tokenValue,
            swapID : swapID,
            accounts : accounts,
            serverPrivateKey : serverPrivateKey,
            process: ''
        })
    }

    async open () {
        console.log(this.state.swapID);
        await this.state.contract.methods.open(
            this.state.swapID,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
            this.state.tokenValue,
            this.state.accounts[1],
            this.state.token.address
        ).send({
            from : this.state.accounts[0],
            value : this.state.etherValue,
        })
        .once('confirmation', () => {
            this.check()
            let process = this.state.process
            let message = 'Alice deposits ether into the contract.\n'
            process += message

            this.setState({
                process : process
            })
            // this.close()
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
            to : this.state.token.address,
            data : this.state.token.methods.approve(this.state.contract.address, this.state.tokenValue).encodeABI(),
            gasValue : web3.utils.toWei('20', 'Gwei'),
            gas : 500000,
            nonce : nonce
        }

        let promise = await web3.eth.accounts.signTransaction(tx, this.state.serverPrivateKey);
        await web3.eth.sendSignedTransaction(promise.rawTransaction)
        .once('confirmation', async () => {
            /********************** allowance *************/
            await this.state.token.methods.allowance(this.state.accounts[1], this.state.contract.address)
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
        })
    }

    async cancel() {
        await this.state.contract.methods.open(
            this.state.swapID,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
            this.state.tokenValue,
            this.state.accounts[1],
            this.state.token.address
        ).send({
            from : this.state.accounts[0],
            value : this.state.etherValue,
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

    handleEther(ele) {
        let ether   = ele.target.value
        this.setState({
            etherValue : ether,
        })
    }

    handleToken(ele) {
        let token   = ele.target.value
        this.setState({
            tokenValue : token,
        })
    }
    render () {
        return (
            <div>
                
                <h2>Ether to ERC20 Atomic Swap</h2>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Swap ID</Form.Label>
                        <Form.Control type="text" placeholder="Swap ID" defaultValue={this.state.swapID} />
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Ether Value</Form.Label>
                            <Form.Control type="text" placeholder="Ether Value" value={this.props.etherValue} onChange={this.handleEther} defaultValue={this.state.etherValue} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Token Value</Form.Label>
                            <Form.Control type="text" placeholder="Token Value" value={this.props.tokenValue} onChange={this.handleToken} defaultValue={this.state.tokenValue} />
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Swap Process</Form.Label>
                        <Form.Control as="textarea" rows={3} value={this.state.process} readOnly={true} />
                    </Form.Group>
                    <Form.Group>
                        <Button onClick={() => this.open()} >Open</Button>
                        <Button onClick={() => this.close()} >Close</Button>
                        <Button className="mb-right" onClick={() => this.expire()} >Expire</Button>
                    </Form.Group>
                </Form>
            </div>
        );

    }
}

export default EtherToERC20;