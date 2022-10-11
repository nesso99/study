# Constructor without parameters

Bắt đầu với một đoạn code của Uniswap v3 [https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L117]

Bạn có thấy điều đặc biệt không? đó là họ lựa chọn việc không để tham số lên constructor, mà load chúng từ 1 state của contract Factory.

Tại sao họ làm vậy. Đơn giản chỉ là để dễ verify source code smart contract trên etherscan mà thôi. Chúng ta sẽ cần constructor để verify source code, loại bỏ tham số ở constructor làm cho việc verify tất cả các pool rất dễ dàng. Bạn chỉ cần verify một lần, sau đó etherscan sẽ thấy các bytecode tương tự và tự verify source cho bạn, khá là nhàn

Bạn có thể tham khảo một bad practice của Balancer V1, khi mà tham số constructor ở mỗi pool khác nhau, thì rất nhiều pool tạo ra không được verify và nếu muốn verify thì phải tìm lại tham số dùng để deploy và verify tay từng pool một, khá phiền
