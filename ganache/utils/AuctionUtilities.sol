// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

library AuctionUtilities {
  function getOffsetBlockNum() external pure returns (uint256) {
    return 0;
  }
  function getRevealDurationInBlockUnit() external pure returns (uint256) {
    // Should be at least 30m. Here value is returned for testing only 
    return 1;
  }
  function getAverageTimePerBlock() external pure returns (uint256) {
    return 0;
  }
}
