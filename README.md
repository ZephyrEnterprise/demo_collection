# demo_collection
## Example NFT collection for tests
**Set Up for Candy Machine V2** <br/>
https://docs.metaplex.com/deprecated/candy-machine-js-cli/getting-started <br/>
## Minting with Candy Machine
git clone https://github.com/metaplex-foundation/deprecated-clis.git ~/deprecated-clis <br/>

---
ts-node ~/deprecated-clis/src/candy-machine-v2-cli.ts upload -e devnet -k ~/.config/solana/devnet.json -cp config.json -c example ./assets <br/>

 ---
ts-node ~/deprecated-clis/src/candy-machine-v2-cli.ts verify_upload -e devnet -k ~/.config/solana/devnet.json -c example <br/>
    
 ---
ts-node ~/deprecated-clis/src/candy-machine-v2-cli.ts mint_multiple_tokens -e devnet -k ~/.config/solana/devnet.json -c example --number 300 <br/>
    
## Retrieving hash list ##
open **from_collection.js** from **hash_finder** folder and put your collection address to Collection varaible </br>
find collection from any of your nfts: ![alt text](https://raw.githubusercontent.com/ZephyrEnterprise/demo_collection/main/public/CollectionOnSolscan.png)
### Running
> cd hash_finder <br/>
npm install </br>
> npm run collection
### Export
Script outputs hashes count in the end
After scipt has been complted drag **hashes.json** to your **engine_ui** folder

