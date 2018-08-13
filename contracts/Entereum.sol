pragma solidity ^0.4.24;

library SafeMath {

    /**
    * @dev Multiplies two numbers, throws on overflow.
    */
    function mul(uint a, uint b) internal pure returns (uint) {
        if (a == 0 || b == 0) {
            return 0;
        }
        uint c = a * b;
        return c;
    }

    /**
    * @dev Integer division of two numbers, truncating the quotient.
    */
    function div(uint a, uint b) internal pure returns (uint) {
        // assert(b > 0); // Solidity automatically throws when dividing by 0
        uint c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold
        return c;
    }

    /**
    * @dev Substracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
    */
    function sub(uint a, uint b) internal pure returns (uint) {
        assert(b <= a);
        return a - b;
    }

    /**
    * @dev Adds two numbers, throws on overflow.
    */
    function add(uint a, uint b) internal pure returns (uint) {
        uint c = a + b;
        assert(c >= a);
        return c;
    }
}

contract Entereum {
    using SafeMath for uint;
    string constant private standard = "ERC20";
    string constant private name = "Entereum";
    string constant private symbol = "ENT";
    uint8 constant private decimals = 18;
    uint private _totalSupply = 500000000e18; 
    address private ownerAddr;

    mapping (address => uint) balances;
    mapping (address => mapping (address => uint)) allowed;

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed _owner, address indexed spender, uint value);

    constructor(address _ownerAddr) public{
        ownerAddr = _ownerAddr;
        balances[ownerAddr] = _totalSupply;
    }

    function balanceOf(address _owner) public view returns (uint balance) {
        return balances[_owner];
    }

    function allowance(address _owner, address _spender) public view returns (uint remaining) {
        return allowed[_owner][_spender];
    }

    function totalSupply() public view returns (uint) {
        return _totalSupply;
    }

    function transfer(address _to, uint _value) public returns(bool) {
        balances[msg.sender] = balances[msg.sender].sub(_value); 
        balances[_to] = balances[_to].add(_value);
        emit Transfer(msg.sender, _to, _value); 
        return true;
    }

    function transferFrom(address _from, address _to, uint _value) public returns(bool) {
        uint _allowed = allowed[_from][msg.sender];
        balances[_from] = balances[_from].sub(_value);
        balances[_to] = balances[_to].add(_value);
        allowed[_from][msg.sender] = _allowed.sub(_value);
        emit Transfer(_from, _to, _value);
        return true;
    }
    
    function approve(address _spender, uint _value) public returns (bool) {
        //https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
        require((_value == 0) || (allowed[msg.sender][_spender] == 0));
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
} 