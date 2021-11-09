var connectAndGenerate = function() {
    
   console.log("Loaded");
   
   const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new solanaWeb3.PublicKey(
      'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
   );

   const METADATA_PUBKEY = new solanaWeb3.PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");

   async function getNFTData(ownerAddress) {
      var connection = new solanaWeb3.Connection(
            solanaWeb3.clusterApiUrl('mainnet-beta'),
            'confirmed',
      );

      var NFT_LIST = [];

      // Get token accounts from wallet
      tokenAccounts = await connection.getParsedTokenAccountsByOwner(ownerAddress, {
            programId: splToken.TOKEN_PROGRAM_ID
      });
      //console.log("Token Accounts");
      //console.log(tokenAccounts);

      // Iterate over all token accounts
      for (i = 0; i < tokenAccounts.value.length; i++) {
            //await tokenAccounts.value.forEach(async function(tAccount) {
            tAccount = tokenAccounts.value[i];
            //await connection.getTokenAccountBalance
            tokenAmount = tAccount.account.data.parsed.info.tokenAmount;

            // Check that it's an NFT
            if (tokenAmount.amount == "1" && tokenAmount.decimals == "0") {

               let [pda, bump] = await solanaWeb3.PublicKey.findProgramAddress([
                  "metadata",
                  METADATA_PUBKEY.toBuffer(),
                  (new solanaWeb3.PublicKey(tAccount.account.data.parsed.info.mint)).toBuffer(),
               ], METADATA_PUBKEY);

               //console.log("Metadata");
               //console.log(pda.toString());

               // Parse PDA to get NFT metadata
               accountInfo = await connection.getParsedAccountInfo(pda);

               //console.log("Account Info");
               //console.log(accountInfo);

               //console.log("Account Data");
               const decoded = decodeMetadata(accountInfo.value.data);
               //console.log(decoded);
               //console.log(decoded.data.uri);
               json = (await (await fetch(decoded.data.uri)).json());
               //json = JSON.parse(await (await fetch(decoded.data.uri)).json());
               //console.log(json);

               let attrs = {
                  "class" : "",
                  "clan" : "",
                  "companion" : "",
                  "item" : "",
                  "weapon" : ""
               };

               if (json.attributes != null && json.attributes.keys.length != {}) {
                  json.attributes.forEach(function(attribute) {

                  if (Object.keys(attrs).indexOf(attribute.trait_type > -1)) {
                     attrs[attribute.trait_type] = attribute.value;
                  }
                  });
               }

               var creators = [];

               decoded.data.creators.forEach((c) => {
                  if (c.verified == 1) {
                  creators.push(c.address);
                  }
               });

               NFT_LIST.push({
                  name: decoded.data.name,
                  creators: creators,
                  image: json.image,
                  attributes: JSON.stringify(attrs)
               });
            }
      }

      socket.emit('walletConnect', { nfts: NFT_LIST, sender: localPlayerID} );

   }

   (async () => {
      try {

            const getProvider = () => {  
               if ("solana" in window) {
                  const provider = window.solana;    
                  if (provider.isPhantom) {      
                        return provider;    
                  }  
                  window.open("https://phantom.app/", "_blank");
               };
            }

            try {
               const resp = await window.solana.connect();
               NFT_LIST = await getNFTData(new solanaWeb3.PublicKey(resp.publicKey.toString()));

               console.log(NFT_LIST);

               NFT_List.foreach((nft) => {
                  var wrap = document.getElementsByClassName('toonWrapper');
                  
               });

            } catch (err) {
               console.log(err);
            }


      } catch (e) {
            // Deal with the fact the chain failed
            console.log("Failure! " + e.toString());
      }
   })();

};

connectAndGenerate();