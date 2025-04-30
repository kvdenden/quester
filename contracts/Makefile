-include .env

.PHONY: test

# Clean the repo
clean :; forge clean

test :; forge test --fork-url ${FORK_URL} --fork-block-number ${FORK_BLOCK_NUMBER}

anvil :; anvil --fork-url ${FORK_URL} --fork-block-number ${FORK_BLOCK_NUMBER} --chain-id 31337 --block-time 2 --auto-impersonate

deploy-anvil :; @forge script script/Deploy.s.sol --rpc-url http://localhost:8545  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast