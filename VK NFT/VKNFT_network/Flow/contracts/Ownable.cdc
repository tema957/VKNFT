pub contract Ownable {
    pub var owner: Address
    
    init() {
        self.owner = getAccount(0x01).address
    }
    
    pub fun isOwner(address: Address): Bool {
        return address == self.owner
    }
    
    pub fun transferOwnership(newOwner: Address) {
        if (isOwner(to: msg.sender)) {
            self.owner = newOwner
        }
    }
}
