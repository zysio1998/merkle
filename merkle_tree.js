// Special Thanks to Raz
//https://github.com/davidrazmadzeExtra/Merkle_Tree_Whitelist_NFT.git

// https://medium.com/@ItsCuzzo/using-merkle-trees-for-nft-whitelists-523b58ada3f9
//
// 1. Import libraries. Use `npm` package manager to install
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

// 2. Collect list of wallet addresses from competition, raffle, etc.
// Store list of addresses in some data sheeet (Google Sheets or Excel)
const whitelistAddresses = [
    "0x6AD71401bcCc644fCdF93eAc9b8b4bb919e92414",
    "0x5D5e43516840c94622D7A894f94Eb634bEe51AD0",
    "0x9e7761249995c34feB31FF4dACFDaAF1e756BC1e",
    "0xA47A2cA3c27b11ace79f3BB62416EFbac63c798C",
    "0x2e60aBD324bf4c9D0f3F18b55058eA010d3Df573"
    
  ];
//0xd93440932f1cc344a0f16cd9ec40eae6970f39c923f2343981a4446da0a280b0


// 3. Create a new array of `leafNodes` by hashing all indexes of the `whitelistAddresses`
// using `keccak256`. Then creates a Merkle Tree object using keccak256 as the algorithm.
//
// The leaves, merkleTree, and rootHas are all PRE-DETERMINED prior to whitelist claim
const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
console.log(merkleTree.toString());
// 4. Get root hash of the `merkleeTree` in hexadecimal format (0x)
const rootHash = merkleTree.getRoot();
console.log("Root Hash: ", rootHash);

function getProof(claimingAddress) {

  //the claiming address needs to be hashed with keccak256 to work properly
  claimingAddress = keccak256(claimingAddress);

  const hexProof = merkleTree.getHexProof(claimingAddress);

  const isVerified = merkleTree.verify(hexProof, claimingAddress, rootHash);

  return { isVerified, hexProof };
}

function getRoot() {
  //Using a hex-encoding
  return rootHash.toString('hex');
}

//Allows the usage of the function outside of the .js file
exports.getProof = getProof;
exports.getRoot = getRoot;
