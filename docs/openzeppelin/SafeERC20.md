# SafeERC20

Tại sao chúng ta cần SafeERC20 để chuyển ERC20?
Bạn cần chú ý method này [https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.7.3/contracts/token/ERC20/utils/SafeERC20.sol#L105-L115]

Giải thích tóm tắt đoạn code trên là

- gọi một function từ `token`
- nếu có kết quả trả về, đổi kiểu nó thành bool
- yêu cầu kết quả trả về là true, nếu không sẽ bị revert

Lý do cho việc phải xử lý như vậy là vì một số token ERC20 dạng cũ không trả về boolean khi gọi hàm, dẫn đến lỗi khi gọi. Cho nên phải xử lý cả hai trường hợp là hàm có trả về và không trả về dữ liệu

Cụ thể bạn có xem thêm tại link sau [https://medium.com/coinmonks/missing-return-value-bug-at-least-130-tokens-affected-d67bf08521ca]

Và nếu bạn chỉ tương tác với các token mới (dùng code của Openzeppelin) thì bạn có thể bỏ qua library này cũng được. Mục đích của nó chỉ là để tương tác được với các token cũ không theo chuẩn hiện tại mà thôi
