//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Quester
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const questerAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'questId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'submissionId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'claimReward',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'validator', internalType: 'address', type: 'address' },
      { name: 'rewardToken', internalType: 'address', type: 'address' },
      { name: 'rewardAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'submissionLimit', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createQuest',
    outputs: [{ name: 'questId', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'questId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getQuest',
    outputs: [
      {
        name: '',
        internalType: 'struct Quester.Quest',
        type: 'tuple',
        components: [
          { name: 'creator', internalType: 'address', type: 'address' },
          { name: 'validator', internalType: 'address', type: 'address' },
          { name: 'rewardToken', internalType: 'address', type: 'address' },
          { name: 'rewardAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'submissionLimit', internalType: 'uint256', type: 'uint256' },
          { name: 'submissionCount', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'questId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'submissionId', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'isSubmissionClaimed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'quests',
    outputs: [
      { name: 'creator', internalType: 'address', type: 'address' },
      { name: 'validator', internalType: 'address', type: 'address' },
      { name: 'rewardToken', internalType: 'address', type: 'address' },
      { name: 'rewardAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'submissionLimit', internalType: 'uint256', type: 'uint256' },
      { name: 'submissionCount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'bytes32', type: 'bytes32' },
      { name: '', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'submissions',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'creator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'questId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'QuestCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'questId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'submissionId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'RewardClaimed',
  },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
] as const
