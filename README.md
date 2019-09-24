EbakusDB Solidity library
=========================

[![Discord](https://img.shields.io/discord/102860784329052160.svg)](https://discord.gg/S6WxAKS)

A library [provided by Ebakus](https://ebakus.com) for giving access to EbakusDB.

## Library Address

### v1.0.0
**Main Network**: ...
**Testnet Network**: ...

## How to install

### Truffle Installation

**version 1.0.0**

First install truffle via npm using `npm install -g truffle` .

Please [visit Truffle's installation guide](https://truffleframework.com/docs/truffle/getting-started/installation "Truffle installation guide") for further information and requirements.

#### Manual install:

This process will allow you to both link your contract to the current on-chain library as well as deploy it in your local environment for development.

1. Place the EbakusDB.sol file in your truffle `contracts/` directory.
2. Place the EbakusDB.json file in your truffle `build/contracts/` directory.
3. Amend the deployment .js file in your truffle `migrations/` directory as follows:

```js
var EbakusDB = artifacts.require('EbakusDB');
var YourContract = artifacts.require("./YourContract.sol");
...

module.exports = function(deployer) {
  deployer.deploy(EbakusDB, {overwrite: false});
  deployer.link(EbakusDB, YourContract);
  deployer.deploy(YourContract);
};
```

**Note**: The `.link()` function should be called *before* you `.deploy(YourStandardTokenContract)`. Also, be sure to include the `{overwrite: false}` when writing the deployer i.e. `.deploy(TokenLib, {overwrite: false})`. This prevents deploying the library onto the main network at your cost and uses the library already on the blockchain. The function should still be called however because it allows you to use it in your development environment. *See below*

## Usage Example

You can read about available EbakusDB methods and their documentation inline [here](truffle/contracts/EbakusDB.sol).
You can find an example contract using the EbakusDB [here](truffle/contracts/examples/Example.sol).

```
pragma solidity ^0.5.0;

import "./EbakusDB.sol";

contract Example {
  string TableName = "Users";

  struct User {
    uint64 Id;
    string Name;
    string Pass;
  }

  constructor() public {
    string memory tablesAbi = '[{"type":"table","name":"Users","inputs":[{"name":"Id","type":"uint64"},{"name":"Name","type":"string"},{"name":"Pass","type":"string"}]}]';

    EbakusDB.createTable(TableName, "Name", tablesAbi);
  }

  function main() external {
    // Insert entry
    User memory u = User(1, "Harry", "123");
    bytes memory input = abi.encode(u.Id, u.Name, u.Pass);
    EbakusDB.insertObj(TableName, input);

    // Get back entry
    User memory u1;
    bytes memory out = EbakusDB.get(TableName, "Name", "Harry");
    (u1.Id, u1.Name, u1.Pass) = abi.decode(out, (uint64, string, string));
  }

  ...
}
```

## Changelog

### v1.0.0

* Initial release
