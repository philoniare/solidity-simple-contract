pragma solidity ^0.8.12;

contract SampleContract {
    uint public counter;
    string public name;
    event CounterChanged(uint _counter);
    event NameChanged(string _name);

    function setName(string memory _name) public {
        name = _name;
        emit NameChanged(name);
    }

    function incrementCounter() public {
        counter += 1;
        emit CounterChanged(counter);
    }
}