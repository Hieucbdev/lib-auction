const Rpc  = require('isomorphic-rpc')
const { Proof, Header, EthObject } = require("./eth-object");

class Header2 extends EthObject{
  // Update base on chain !!!!
}

module.exports = class GetProof{
  constructor(rpcProvider = "https://mainnet.infura.io", chainId = null){
    this.rpc = new Rpc(rpcProvider)
    this.eth_getProof = this.rpc.eth_getProof
    this.chainId = chainId
  }
  async accountProof(address, blockHash = null){
    let rpcBlock, rpcProof
    if(blockHash){
      rpcBlock = await this.rpc.eth_getBlockByHash(blockHash, false)
    }else{
      rpcBlock = await this.rpc.eth_getBlockByNumber('latest', false)
    }
    rpcProof = await this.eth_getProof(address, [], rpcBlock.number)

    let header = Header.fromRpc(rpcBlock);
    if(this.chainId != null){
      switch(this.chainId) {
        case 1337:
          break;
      }
    }

    return {
      header: header,
      accountProof: Proof.fromRpc(rpcProof.accountProof),
    }
  }
}