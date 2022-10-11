# Message signature conflict

Nay rảnh rảnh ngồi đọc cái bài này [https://medium.com/nomic-foundation-blog/malicious-backdoors-in-ethereum-proxies-62629adf3357], thấy cách dùng proxy của mình cũng mạo hiểm phết, một số project trước đó mình không dùng `TransparentUpgradeableProxy` nên có khả năng bị dính lỗi này, nhưng may mà không bị.

Nhắc lại một chút về cách hoạt động của proxy, nó lợi dụng tính năng `fallback` và `delegatecall` của solidity. Ta có contract `Proxy` chứa storage, và contract `Implementation` chứa logic. Nói một cách dân gian thì, nếu function ta gọi tồn tại trên `Proxy` thì logic và storage đều sẽ chạy trên contract `Proxy`. Và nếu function ta gọi không tồn tại trên `Proxy` thì storage sẽ được chạy trên `Proxy` và logic sẽ chạy trên `Implementation`

Mọi chuyện sẽ ổn cho đến khi một function trên `Proxy` trùng hash với một function trên `Implementation`, nên nhớ là msg.sig chỉ có 4 byte thôi nên khá dễ trùng. Và khi trùng thì thay vì gọi logic trên `Implementation` ta sẽ lại gọi logic trên `Proxy`

Ở bài viết trên Medium kia có một bài tập về đúng cái lỗi này các bạn có thể xem thử. Gợi ý cho các bạn là tập trung phân tích cái contract `ACL` nhé, vấn đề nằm ở đó thôi
