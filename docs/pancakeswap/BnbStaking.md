# BNB Staking Contact

- Source: [https://github.com/pancakeswap/pancake-smart-contracts/blob/master/projects/farms-pools/contracts/BnbStaking.sol](Github)

Lười quá nên nói nhanh nhé, cái này vẫn theo công thức mà Pancakeswap hay dùng cho reward pool của mình thôi. Nhưng cái contract này đặc biệt chỉ tạo 1 pool cho BNB, vậy thôi á.

Công thức thì vẫn là `user.amount * accCakePerShare - rewardDebt`

- `user.amount` là lượng BNB đã stake
- `accCakePerShare` là lượng reward tính trên mỗi BNB stake vào
- `rewardDebt` là số thưởng đã nhận rồi

Công thức thấy hợp lý đúng không nào. Nhưng hình như vẫn có corner case, để lúc nào thử số vào check nhé. Đang lười quá nên đành để đây vậy
