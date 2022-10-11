# Calldataload

Bạn thích sự làm màu, bạn chán cách lấy tham số thông thường. Bài viết này dành cho bạn, thử xem nhé

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Calldata {
    uint128 public number;

    function store() external {
        uint128 _number;
        assembly {
            _number := calldataload(4)
        }
        number = _number;
    }

    function retrieve() external view returns (uint128) {
        return number;
    }
}
```

Như bạn thấy ở hàm `store`, mình đã làm màu, thay vì dùng tham số như thông thường thì mình đã dùng assembly ở đây. Ý nghĩa của `calldataload(4)` là load 4 bytes từ vị trí có offset = 4 (4 bytes đầu của calldata dành cho `msg.sig` nên chúng ta phải bỏ qua nó). Bạn có thể tăng thử thách lên bằng cách lấy nhiều tham số xem sao nhé.

Nhìn vui vậy thôi nhưng nó có ứng dụng nha. Optimism có dùng phương pháp này cho smart contract của họ. Cụ thể ở hàm này [https://github.com/ethereum-optimism/optimism/blob/20211021-new-rc/packages/contracts/contracts/L1/rollup/CanonicalTransactionChain.sol#L285](appendSequencerBatch). Mục đích của họ là dùng calldata làm storage nhưng không muốn tốn gas cho việc load những storage đó vào hàm, ở đây là `_transactionDataFields`.
