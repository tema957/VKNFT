import { EmulatorConfig, Event } from "@flow/flow-js-testing";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import * as fs from "fs";

const serviceAccount = JSON.parse(
  fs.readFileSync("./flow.json", "utf8")
);

const CODE_PATH = "../contracts/NFT.cdc";

fcl.config().put("accessNode.api", "https://access-testnet.onflow.org");

describe("NFT contract", () => {
  let emulatorConfig: EmulatorConfig;

  beforeAll(async () => {
    emulatorConfig = new EmulatorConfig();
    await emulatorConfig.spawn();
    const { accountAddress, privateKey } = serviceAccount;
    const contractCode = fs.readFileSync(CODE_PATH, "utf8");
    const transaction = emulatorConfig.getTransaction({
      serviceAccountAddress: accountAddress,
      serviceAccountPrivateKey: privateKey,
      code: contractCode,
    });
    await fcl.send([transaction]);
  });

  afterAll(async () => {
    await emulatorConfig.kill();
  });

  describe("NFT metadata", () => {
    it("should return the correct NFT metadata", async () => {
      const account = emulatorConfig.getAccount(serviceAccount.accountAddress);
      const templateID = 1;
      const metadata = {
        name: "Test NFT",
        description: "This is a test NFT",
        image: "https://test.com/nft.png",
      };
      const tx = account.sansPrefix.submitTransaction("create_nft_metadata", metadata);
      await tx.proposal().sign(serviceAccount.accountAddress, serviceAccount.privateKey);
      await tx.send(await account.getTransactionStatus(tx.id));

      const result = await account.query(
        "0x01",
        "public/getNFTMetadata",
        (arg: t.UInt64) => [arg]
      )(templateID);

      expect(result).toMatchObject(metadata);
    });
  });

  describe("NFT ownership", () => {
    it("should allow an account to create and own an NFT", async () => {
      const account = emulatorConfig.getAccount(serviceAccount.accountAddress);
      const receiverAccount = emulatorConfig.newAccount();
      const templateID = 1;
      const metadata = {
        name: "Test NFT",
        description: "This is a test NFT",
        image: "https://test.com/nft.png",
      };
      const createMetadataTx = account.sansPrefix.submitTransaction("create_nft_metadata", metadata);
      await createMetadataTx.proposal().sign(serviceAccount.accountAddress, serviceAccount.privateKey);
      await createMetadataTx.send(await account.getTransactionStatus(createMetadataTx.id));

      const createNFTTx = account.sansPrefix.submitTransaction("mint_nft", receiverAccount.address, templateID);
      await createNFTTx.proposal().sign(serviceAccount.accountAddress, serviceAccount.privateKey);
      await createNFTTx.send(await account.getTransactionStatus(createNFTTx.id));

      const result = await receiverAccount.query(
        "0x01",
        "public/getAccountNFTs",
        (arg: t.Address) => [arg]
      )(receiverAccount.address);

      expect(result.length).toEqual(1);
      expect(result[0].metadata).toMatchObject(metadata);
    });
  });
});
