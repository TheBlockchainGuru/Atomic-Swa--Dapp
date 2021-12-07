import React, {Component} from 'react';
import AtomicSwapEtherToERC20 from '../abis/AtomicSwapEtherToERC20.json';
import TestERC20 from '../abis/TestERC20.json';
import {Form, Button, Col, InputGroup, FormControl} from 'react-bootstrap';

class Ether extends Component {
    async componentWillMount() {
        await this.loadBlockChainData()
    }
    constructor (props) {
        super(props)
        this.state = {
            ether : '',
            token : '',
            accounts : [],
            etherValue : 0,
            erc20Value : 0,
            swapID : '',
            expiry : '',
        };
    }

    async loadBlockChainData() {
        const web3          = window.web3;
        // const networkId     = await web3.eth.net.getId();
        // const networkData   = AtomicSwapEtherToERC20.networks[networkId];
        const etherValue    = 50000;
        const ern20Value    = 100000;
        // const expiry        = '0xc3b89738306a66a399755e8535300c42b1423cac321938e7fe30b252abf8fe74';
        // const swapID        = '0x261c74f7dd1ed6a069e18375ab2bee9afcb1095613f53b07de11829ac66cdfcc';
        const swapID        = '0x261c74f7dd1ed6a069e18375ab2bee9afcb1095613f53b07de11829ac66c8989';
        const expiry        = '0xc3b89738306a66a399755e8535300c42b1423cac321938e7fe30b252abf88989';
        // if(networkData) {
        const accounts  = await web3.eth.getAccounts();
        accounts[1]     = '0xe6b49280a76ba52e25c2c37dc66d063974170b36';
        const ether     = web3.eth.Contract(AtomicSwapEtherToERC20.abi, '0xbc52e8ded2e0c48e3adae9227fdfa5c4b41e2340')
        const token     = web3.eth.Contract(TestERC20.abi, '0xfb9e655ea7df391b2438412e928442f761331537');
        this.setState({
            ether : ether, 
            token : token, 
            accounts : accounts,
            etherValue : etherValue,
            erc20Value : erc20Value,
            swapID      : swapID,
            expiry      : expiry
        })
        // } else {
        //     window.alert('AtomicSwapEther20TOERC contract not deployed to detected network !');
        // }
    }

    async start(swapID, expiry) {
        await this.open(this.state.swapID)
        await this.check(this.state.swapID)
        // await this.close(this.state.swapID)
        // await this.open(this.state.expiry)
        // await this.expire(this.state.swapID)
    }

    async open(swapID) {
        try {
            await this.state.ether.methods.open(
                swapID,
                this.state.erc20Value, 
                this.state.accounts[1], 
                this.state.token.address,  
            ).send({
                from : this.state.accounts[0], 
                value :  this.state.etherValue,
                gasPrice : window.web3.utils.toWei('30', 'gwei'),
                gas: 300000,
            })
        } catch(e) {
            console.log(e);
        }
        const message = 'Alice deposites ether into the contract'
        console.log(message)
    }
 
    async close(swapID) {
        await this.state.token.methods.transfer(
            this.state.accounts[1], 
            this.state.erc20Value
        ).send({
            from : this.state.accounts[0],
            gasPrice : window.web3.utils.toWei('30', 'gwei'),
            gas: 300000
        })

        await this.state.token.methods.approve(
            this.state.ether.address,
            this.state.erc20Value,
        ).send({
            from: this.state.accounts[1],
            gasPrice : window.web3.utils.toWei('30', 'gwei'),
            gas: 300000
        })

        await this.state.token.methods.allowance(
            this.state.accounts[1],
            this.state.ether.address
        )

        await this.state.ether.methods.close(swapID)
        const message = 'Bob closes the swap'
        console.log(message)
    }
    
    async check(swapID) {
        await this.state.ether.methods.check(swapID)
        const message = 'Bob checks the  ether in the lock box'
        console.log(message)
    }

    async expire(swapID) {
        await this.state.ether.methods.expire(swapID)
        const message = 'Alice withdraws after expiry'
        console.log(message)
    }
    render() {
        return(
            <div id="ether_content" className="col-lg-12 col-md-12 col-sm-12">
                <h2>Ether to ERC20</h2>
                <Form onSubmit={ (event) => {
                    event.preventDefault()
                    this.start()
                }}>
                    <Form.Row className="align-items-center">
                        <Col xs="auto">
                            <Form.Label htmlFor="inlineFormInput" srOnly>
                                Name
                            </Form.Label>
                            <InputGroup className="mb-2">
                                <InputGroup.Prepend>
                                <InputGroup.Text>Swap</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl id="inlineFormInputGroup" type="text" placeholder="Swap ID" defaultValue={this.state.swapID} readOnly={false} />
                            </InputGroup>
                        </Col>
                        <Col xs="auto">
                            <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                                Username
                            </Form.Label>
                            <InputGroup className="mb-2">
                                <InputGroup.Prepend>
                                <InputGroup.Text>Expiry</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl id="inlineFormInputGroup" type="text" placeholder="Expiry" defaultValue={this.state.expiry} readOnly={true}  ref={(input) => (this.expiry = input)} />
                            </InputGroup>
                        </Col>
                        <Col xs="auto">
                            <Button type="submit" className="mb-2">
                                Open
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>
            </div>
        );
    }
}

export default Ether;