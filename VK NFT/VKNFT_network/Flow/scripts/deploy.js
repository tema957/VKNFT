const fcl = require("@onflow/fcl");
const t = require("@onflow/types");
const fs = require("fs");
const path = require("path");

const ADDRESS_MAP_PATH = path.join(__dirname, "address-map.json");

const CODE_PATH = path.join(__dirname, "NFT.cdc");
const code = fs.readFileSync(CODE_PATH, "utf8");

const deployContract = async () => {
  const { authorization, account } = fcl.currentUser();

  const response = await fcl.send([
    fcl.transaction`
      transaction {
        let account: AuthAccount
        prepare(acct: AuthAccount) {
          self.account = acct
        }
        execute {
          self.account.contracts.add(name: "NFT", code: ${fcl.literal(code)})
        }
      }
    `,
    fcl.proposer(authorization),
    fcl.payer(authorization),
    fcl.authorizations([authorization]),
    fcl.limit(100),
    fcl.args([]),
  ]);

  await fcl.decode(response);
  console.log("NFT contract deployed");

  // Save address to address-map.json
  const addressMap = JSON.parse(fs.readFileSync(ADDRESS_MAP_PATH, "utf8"));
  addressMap.NFT = account.addr;
  fs.writeFileSync(ADDRESS_MAP_PATH, JSON.stringify(addressMap, null, 2));
  console.log("Address saved to address-map.json");
};

deployContract();
