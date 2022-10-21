const {PublicKey, Connection} = require("@solana/web3.js");
const {Metadata} = require("@metaplex-foundation/mpl-token-metadata");
const fs = require("fs");
const path = require("path");


const Collection = new PublicKey("25UMqfoQkhCRAtkf9R2Fm38NVULrpg3o2Hy2GTNsaYsF"); //Rename to your collection
const connection = new Connection("https://api.devnet.solana.com");
const MetadataProgram = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");


async function checkToBeNFT(key, collection){
    try{
        const meta = (await PublicKey.findProgramAddress(
            [
                Buffer.from('metadata'),
                MetadataProgram.toBuffer(),
                key.toBuffer(),
            ],
            MetadataProgram,
        ))[0];
        const metadata = await Metadata.fromAccountAddress(connection, meta);
        if((metadata.collection.key.toBase58() === collection)&&(metadata.collection.verified)){
            console.log(key.toBase58())
            return true;
        }
        return false;
    }
    catch(e){
        return false;
    }
}

async function parseTx(tx, collection){
    const response = await connection.getParsedTransaction(tx);
    const keys = response.transaction.message.accountKeys;
    let a = [];
    for(let i = 0; i < keys.length; i++){
        if(await checkToBeNFT(keys[i].pubkey, collection)){
            a.push(keys[i].pubkey.toBase58())
        }
    }
    return a;
}


async function Do(){
    const currentSlot = await connection.getSlot();
    const txs = await connection.getConfirmedSignaturesForAddress(Collection, 150000000, currentSlot);
    let s = [];
    for(let i = 0; i < txs.length; i++){
        const a = await parseTx(txs[i], Collection.toBase58());
        s = s.concat(a);
    }
    s = new Set(s);
    s = [...s];
    console.log(s.length, "hashes found");
    fs.writeFileSync(path.resolve(__dirname, "hashes.json"), JSON.stringify(s));
}

Do();