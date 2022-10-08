# Modifier

Có bao giờ bạn thắc mắc rằng tại sao Openzeppelin họ lại viết code như này [https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.7.3/contracts/access/Ownable.sol#L35-L38].
Tại sao lại không viết thẳng logic vào modifier mà phải viết một hàm trung gian vào đó?

Đó là vì bản chất của modifer là copy code của nó vào mỗi function nó được gán, cho nên nếu modifier chứa nhiều code thì có nghĩa là bạn càng dùng nó nhiều thì code size của bạn càng to. Nếu đến đây bạn vẫn chưa hiểu thì có thể nhìn vào ví dụ này nhé

```javascript
abstract contract Ownable is Context {
    ...

    function _checkOwner() internal view virtual {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
    }

    modifier onlyOwner() {
        _checkOwner();

        // trường hợp 2: không qua function
        // require(owner() == _msgSender(), "Ownable: caller is not the owner");

        _;
    }

    function method1(address newOwner) public virtual onlyOwner {
        ...
    }

    function method2(address newOwner) public virtual onlyOwner {
        ...
    }
}
```

Contract trên sẽ tương đương với

```javascript
abstract contract Ownable is Context {
    ...

    function _checkOwner() internal view virtual {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
    }

    function method1(address newOwner) public virtual {
        _checkOwner();

        // trường hợp 2: không qua function
        // require(owner() == _msgSender(), "Ownable: caller is not the owner");

        ...;
    }

    function method2(address newOwner) public virtual {
        _checkOwner();

        // trường hợp 2: không qua function
        // require(owner() == _msgSender(), "Ownable: caller is not the owner");

        ...;
    }
}
```

Như bạn đã thấy, nếu dùng qua hàm `_checkOwner` thì bạn đã dùng lại được code thay vì là populate 1 đoạn code lặp lại. Nếu modifier càng được sử dụng nhiều trong cọntract thì phương pháp này càng cho thấy sự hiệu quả.
