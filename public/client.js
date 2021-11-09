var NFT_LIST = [];

const METADATA_PUBKEY = new solanaWeb3.PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");

async function getNFTData(ownerAddress) {
	var connection = new solanaWeb3.Connection(
		solanaWeb3.clusterApiUrl('mainnet-beta'),
		'confirmed',
	);

	// Get token accounts from wallet
	var tokenAccounts = await connection.getParsedTokenAccountsByOwner(ownerAddress, {
		programId: splToken.TOKEN_PROGRAM_ID
	});

	// Iterate over all token accounts
	for (var i = 0; i < tokenAccounts.value.length; i++) {
		//await tokenAccounts.value.forEach(async function(tAccount) {
		var tAccount = tokenAccounts.value[i];
		//await connection.getTokenAccountBalance
		var tokenAmount = tAccount.account.data.parsed.info.tokenAmount;

		// Check that it's an NFT
		if (tokenAmount.amount == "1" && tokenAmount.decimals == "0") {

			let [pda, bump] = await solanaWeb3.PublicKey.findProgramAddress([
				"metadata",
				METADATA_PUBKEY.toBuffer(),
				(new solanaWeb3.PublicKey(tAccount.account.data.parsed.info.mint)).toBuffer(),
			], METADATA_PUBKEY);

			// Parse PDA to get NFT metadata
			var accountInfo = await connection.getParsedAccountInfo(pda);

			const decoded = decodeMetadata(accountInfo.value.data);

			var json = (await (await fetch(decoded.data.uri)).json());

			let attrs = {
			  "class" : "",
			  "clan" : "",
			  "companion" : "",
			  "item" : "",
			  "weapon" : "",
			  "headwear" : "",
			  "armor" : "",
			  "footwear" : ""
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

			if (creators.indexOf('8mxiQyfXpWdohutWgq652XQ5LT4AaX4Lf5c4gZsdNLfd') > -1 && decoded.data.name.indexOf('gmoot bag #') > -1) {
				NFT_LIST.push({
					name: decoded.data.name,
					clan: attrs.clan,
					class: attrs.class,
					companion: attrs.companion,
					item: attrs.item,
					weapon: attrs.weapon
				});
			}
		}
	}

	return NFT_LIST;

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

			init(NFT_LIST);

		} catch (err) {
			console.log(err);
		}


	} catch (e) {
		console.log("Failure! " + e.toString());
	}
})();

function init(NFT_LIST) {
	console.log(NFT_LIST);


	NFT_LIST.forEach((gmoot) => {
		let name = gmoot.name;

		let clan = gmoot.clan;
		let classN = gmoot.class;
		let companion = gmoot.companion;
		let item = gmoot.item;
		let weapon = gmoot.weapon;

		let clanImage = null;
		let classImage = null;
		let companionImage = null;
		let itemImage = null;
		let weaponImage = null

		clanImage = 'Clans/' + clan.toLowerCase() + '.png';
		classImage = 'Classes/' + classN.toLowerCase() + '.png';
		
		if (companion.toLowerCase().indexOf('alpaca') > -1) {
			companionImage = 'Companions/alpaca.png';
		} else if (companion.toLowerCase().indexOf('ape') > -1) {
			companionImage = 'Companions/ape.png';
		} else if (companion.toLowerCase().indexOf('bear') > -1) {
			companionImage = 'Companions/bear.png';
		} else if (companion.toLowerCase().indexOf('bull') > -1) {
			companionImage = 'Companions/bull.png';
		} else if (companion.toLowerCase().indexOf('doge') > -1) {
			companionImage = 'Companions/doge.png';
		} else if (companion.toLowerCase().indexOf('dragon') > -1) {
			companionImage = 'Companions/dragon.png';
		} else if (companion.toLowerCase().indexOf('goat') > -1) {
			companionImage = 'Companions/goat.png';
		} else if (companion.toLowerCase().indexOf('kitty') > -1) {
			companionImage = 'Companions/kitty.png';
		} else if (companion.toLowerCase().indexOf('koala') > -1) {
			companionImage = 'Companions/koala.png';
		} else if (companion.toLowerCase().indexOf('lion') > -1) {
			companionImage = 'Companions/lion.png';
		} else if (companion.toLowerCase().indexOf('monke') > -1) {
			companionImage = 'Companions/monke.png';
		} else if (companion.toLowerCase().indexOf('orca') > -1) {
			companionImage = 'Companions/orca.png';
		} else if (companion.toLowerCase().indexOf('owl') > -1) {
			companionImage = 'Companions/owl.png';
		} else if (companion.toLowerCase().indexOf('panda') > -1) {
			companionImage = 'Companions/panda.png';
		} else if (companion.toLowerCase().indexOf('parrot') > -1) {
			companionImage = 'Companions/parrot.png';
		} else if (companion.toLowerCase().indexOf('penguin') > -1) {
			companionImage = 'Companions/penguin.png';
		} else if (companion.toLowerCase().indexOf('phoenix') > -1) {
			companionImage = 'Companions/phoenix.png';
		} else if (companion.toLowerCase().indexOf('pony') > -1) {
			companionImage = 'Companions/pony.png';
		} else if (companion.toLowerCase().indexOf('quokka') > -1) {
			companionImage = 'Companions/quokka.png';
		} else if (companion.toLowerCase().indexOf('raccoon') > -1) {
			companionImage = 'Companions/raccoon.png';
		} else if (companion.toLowerCase().indexOf('rock') > -1) {
			companionImage = 'Companions/rock.png';
		} else if (companion.toLowerCase().indexOf('shark') > -1) {
			companionImage = 'Companions/shark.png';
		} else if (companion.toLowerCase().indexOf('sloth') > -1) {
			companionImage = 'Companions/sloth.png';
		} else if (companion.toLowerCase().indexOf('unicorn') > -1) {
			companionImage = 'Companions/unicorn.png';
		} else if (companion.toLowerCase().indexOf('whale') > -1) {
			companionImage = 'Companions/whale.png';
		}

		if (item.toLowerCase().indexOf('1') > -1) {
			itemImage = 'Items/1.png';
		} else if (item.toLowerCase().indexOf('50') > -1) {
			itemImage = 'Items/50.png';
		} else if (item.toLowerCase().indexOf('anchor') > -1) {
			itemImage = 'Items/anchor.png';
		} else if (item.toLowerCase().indexOf('atlas') > -1) {
			itemImage = 'Items/atlas.png';
		} else if (item.toLowerCase().indexOf('bag') > -1) {
			itemImage = 'Items/bag.png';
		} else if (item.toLowerCase().indexOf('candy') > -1) {
			itemImage = 'Items/candy.png';
		} else if (item.toLowerCase().indexOf('counter') > -1) {
			itemImage = 'Items/counter.png';
		} else if (item.toLowerCase().indexOf('daonut') > -1) {
			itemImage = 'Items/daonut.png';
		} else if (item.toLowerCase().indexOf('fractal') > -1) {
			itemImage = 'Items/fractal.png';
		} else if (item.toLowerCase().indexOf('joker') > -1) {
			itemImage = 'Items/joker.png';
		} else if (item.toLowerCase().indexOf('key') > -1) {
			itemImage = 'Items/key.png';
		} else if (item.toLowerCase().indexOf('lamp') > -1) {
			itemImage = 'Items/lamp.png';
		} else if (item.toLowerCase().indexOf('mango') > -1) {
			itemImage = 'Items/mango.png';
		} else if (item.toLowerCase().indexOf('moebius') > -1) { // Intentional mis-spelling
			itemImage = 'Items/moebius.png';
		} else if (item.toLowerCase().indexOf('oxygen') > -1) {
			itemImage = 'Items/oxygen.png';
		} else if (item.toLowerCase().indexOf('pie') > -1) {
			itemImage = 'Items/pie.png';
		} else if (item.toLowerCase().indexOf('potion') > -1) {
			itemImage = 'Items/potion.png';
		} else if (item.toLowerCase().indexOf('power') > -1) {
			itemImage = 'Items/power.png';
		} else if (item.toLowerCase().indexOf('pump') > -1) {
			itemImage = 'Items/pump.png';
		} else if (item.toLowerCase().indexOf('ring') > -1) {
			itemImage = 'Items/ring.png';
		} else if (item.toLowerCase().indexOf('rug') > -1) {
			itemImage = 'Items/rug.png';
		} else if (item.toLowerCase().indexOf('serum') > -1) {
			itemImage = 'Items/serum.png';
		} else if (item.toLowerCase().indexOf('space') > -1) {
			itemImage = 'Items/space.png';
		} else if (item.toLowerCase().indexOf('stone') > -1) {
			itemImage = 'Items/stone.png';
		} else if (item.toLowerCase().indexOf('toilet') > -1) {
			itemImage = 'Items/toilet.png';
		} else if (item.toLowerCase().indexOf('toly') > -1) {
			itemImage = 'Items/toly.png';
		} else if (item.toLowerCase().indexOf('voice') > -1) {
			itemImage = 'Items/voice.png';
		} else if (item.toLowerCase().indexOf('wallet') > -1) {
			itemImage = 'Items/wallet.png';
		} else if (item.toLowerCase().indexOf('wormhole') > -1) {
			itemImage = 'Items/wormhole.png';
		}

		if (weapon.toLowerCase().indexOf('bazooka') > -1) {
			weaponImage = 'Weapons/bazooka.png';
		} else if (weapon.toLowerCase().indexOf('blade') > -1) {
			weaponImage = 'Weapons/blade.png';
		} else if (weapon.toLowerCase().indexOf('blaster') > -1) {
			weaponImage = 'Weapons/blaster.png';
		} else if (weapon.toLowerCase().indexOf('bomb') > -1) {
			weaponImage = 'Weapons/bomb.png';
		} else if (weapon.toLowerCase().indexOf('boomerang') > -1) {
			weaponImage = 'Weapons/boomerang.png';
		} else if (weapon.toLowerCase().indexOf('cannon') > -1) {
			weaponImage = 'Weapons/cannon.png';
		} else if (weapon.toLowerCase().indexOf('chainsaw') > -1) {
			weaponImage = 'Weapons/chainsaw.png';
		} else if (weapon.toLowerCase().indexOf('disc') > -1) {
			weaponImage = 'Weapons/disc.png';
		} else if (weapon.toLowerCase().indexOf('gauntlet') > -1) {
			weaponImage = 'Weapons/gauntlet.png';
		} else if (weapon.toLowerCase().indexOf('gun') > -1) {
			weaponImage = 'Weapons/gun.png';
		} else if (weapon.toLowerCase().indexOf('hammer') > -1) {
			weaponImage = 'Weapons/hammer.png';
		} else if (weapon.toLowerCase().indexOf('hoak') > -1) {
			weaponImage = 'Weapons/hoak.png';
		} else if (weapon.toLowerCase().indexOf('knife') > -1) {
			weaponImage = 'Weapons/knife.png';
		} else if (weapon.toLowerCase().indexOf('morning') > -1) {
			weaponImage = 'Weapons/morning.png';
		} else if (weapon.toLowerCase().indexOf('plunger') > -1) {
			weaponImage = 'Weapons/plunger.png';
		} else if (weapon.toLowerCase().indexOf('saber') > -1) {
			weaponImage = 'Weapons/saber.png';
		} else if (weapon.toLowerCase().indexOf('screwdriver') > -1) {
			weaponImage = 'Weapons/screwdriver.png';
		} else if (weapon.toLowerCase().indexOf('scythe') > -1) {
			weaponImage = 'Weapons/scythe.png';
		} else if (weapon.toLowerCase().indexOf('shield') > -1) {
			weaponImage = 'Weapons/shield.png';
		} else if (weapon.toLowerCase().indexOf('shuriken') > -1) {
			weaponImage = 'Weapons/shuriken.png';
		} else if (weapon.toLowerCase().indexOf('spear') > -1) {
			weaponImage = 'Weapons/spear.png';
		} else if (weapon.toLowerCase().indexOf('sword') > -1) {
			weaponImage = 'Weapons/sword.png';
		} else if (weapon.toLowerCase().indexOf('wand') > -1) {
			weaponImage = 'Weapons/wand.png';
		} else if (weapon.toLowerCase().indexOf('whip') > -1) {
			weaponImage = 'Weapons/whip.png';
		}

		let c = document.createElement('canvas');
		let ctx = c.getContext('2d');

		let clanImg = new Image();
		let classImg = new Image();
		let companionImg = new Image();
		let itemImg = new Image();
		let weaponImg = new Image();

		clanImg.onload = function() {
			ctx.drawImage(clanImg, 0, 0, 800, 800);
			classImg.src = classImage;
		}

		classImg.onload = function() {
			ctx.drawImage(classImg, 0, 0, 800, 800);
			weaponImg.src = weaponImage;
		}

		companionImg.onload = function() {
			ctx.drawImage(companionImg, 0, 0, 800, 800);
		}

		itemImg.onload = function() {
			ctx.drawImage(itemImg, 0, 0, 800, 800);
			companionImg.src = companionImage;
		}

		weaponImg.onload = function() {
			ctx.drawImage(weaponImg, 0, 0, 800, 800);
			itemImg.src = itemImage;
		}

		clanImg.src = clanImage;
		
		c.width = 800;
		c.height = 800;

		let nameTag = document.createElement('h3');
		nameTag.innerText = gmoot.name;

		document.querySelector('.toonWrapper').appendChild(nameTag);
		document.querySelector('.toonWrapper').appendChild(c);

	});
}
