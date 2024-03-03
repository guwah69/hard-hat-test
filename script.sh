#!/bin/bash

# Compile contracts
npx hardhat compile

# Deploy contract and retrieve contract address
deploy_output=$(npx hardhat run scripts/deploy.js --network sepolia)
echo "$deploy_output"
contract_address=$(echo "$deploy_output" | grep 'Contract deployed to address' | awk '{print $5}')

# Call addWhiteListMember function
set_output=$(npx hardhat run scripts/call_functions.js --network sepolia --contractaddress $contract_address --functionname "addWhiteListMember" --value $VALUE)
set_value=$(echo "$set_output" | grep 'memberAdded:' | awk '{print $2}')

# Call requestUint256 function
request_output=$(npx hardhat run scripts/call_functions.js --network sepolia --contractaddress $contract_address --functionname "isWhiteListed" --value $VALUE)
requested_value=$(echo "$request_output" | grep 'IsWhiteListed:' | awk '{print $2}')

# Output contract address and values
echo "Contract deployed at: $contract_address"
echo "Value set: $set_value"
echo "Value requested: $requested_value"

# Write data to JSON file
cat <<EOF > output.json
{
  "contractAddress": "$contract_address",
  "setValue": "$set_value",
  "requestedValue": "$requested_value"
}
EOF

# Exit
exit 0
