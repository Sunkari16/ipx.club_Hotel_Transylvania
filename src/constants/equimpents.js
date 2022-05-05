class Equipment {

    constructor(code, noOfUnits) {
        this.code = code;
        this.noOfUnits = noOfUnits;
    }

}
const EquipmentCodes = {
    AC: 'AC',
    LIGHT: 'LIGHT',
};

const EquipmentStatus = {
    OFF: 'OFF',
    ON: 'ON',
};
const Equipments = {
    [EquipmentCodes.AC]: new Equipment(EquipmentCodes.AC, 10),
    [EquipmentCodes.LIGHT]: new Equipment(EquipmentCodes.LIGHT, 5),
};

module.exports = { EquipmentCodes, EquipmentStatus, Equipments };
