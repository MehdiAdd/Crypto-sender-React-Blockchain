// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transaction {
    uint256 transactionCount;
    event Transfer(
        address from,
        address reciever,
        uint256 amount,
        string message,
        uint256 timestap,
        string keyword
    );
    struct TransactionStruct {
        address from;
        address reciever;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
    }
    TransactionStruct[] transactions;

    function addTtansaction(
        address _to,
        uint256 _amount,
        string memory _message,
        string memory keyword
    ) public {
        transactions.push(
            TransactionStruct(
                msg.sender,
                _to,
                _amount,
                _message,
                block.timestamp,
                keyword
            )
        );
        emit Transfer(
            msg.sender,
            _to,
            _amount,
            _message,
            block.timestamp,
            keyword
        );
    }

    function getTransactions()
        public
        view
        returns (TransactionStruct[] memory)
    {
        return transactions;
    }

    function getTransactionsCount() public view returns (uint256) {
        return transactionCount;
    }
}
