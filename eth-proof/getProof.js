const Rpc  = require('isomorphic-rpc')
const { Proof, Header, BSCMainnetHeader, BSCTestnetHeader, GoerliHeader, SepoliaHeader } 
  = require("./eth-object");

module.exports = class GetProof{
  constructor(rpcProvider = "https://mainnet.infura.io", chainId = 1){
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

    let header = "";
    switch(this.chainId) {
      case 1:
        header = Header.fromRpc(rpcBlock);
        break;
      case 56:
        header = BSCMainnetHeader.fromRpc(rpcBlock);
        break;
      case 97:
        header = BSCTestnetHeader.fromRpc(rpcBlock);
        break;
      case 5:
        header = GoerliHeader.fromRpc(rpcBlock);
        break;
      case 11155111:
        header = SepoliaHeader.fromRpc(rpcBlock);
        break;
      default:
        header = Header.fromRpc(rpcBlock);
        break;
    }

    return {
      header: header,
      accountProof: Proof.fromRpc(rpcProof.accountProof),
    }
  }
}