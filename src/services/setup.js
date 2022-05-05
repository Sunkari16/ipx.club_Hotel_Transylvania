const { HTTPError, HTTPErrorCodes } = require('../common/http-error');
const AreasService = require('./area');
const { AREA_TYPES } = require('../constants/area');
const { EquipmentCodes, EquipmentStatus } = require('../constants/equimpents');
const EquipmentInAreaService = require('./equipmentInArea');
const SensorService = require('./sensor');
const SensorInAreaService = require('./sensorInArea');

const SetupService = {};

async function addSensor(area) {
    const sensor = await SensorService.addOne({});
    await SensorInAreaService.addOne({ areaCode: area.code, sensorCode: sensor.code });
}

async function addAreas(
    noOfFloors,
    noOfMainCorridors,
    noOfSubCorridors,
    autoTurnOffTTLInMS = 60 * 1000,
) {
    const promises = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < noOfFloors; i++) {
        const floorCode = `F${i + 1}`;
        // eslint-disable-next-line no-plusplus
        for (let j = 0; j < noOfMainCorridors; j++) {
            const mcCode = `${floorCode}_MC${j + 1}`;
            promises.push(AreasService.addOne({
                code: mcCode,
                floor: i,
                areaType: AREA_TYPES.MAIN_CORRIDOR,
                maxConsumptionUnits: 15,
                autoTurnOffTTLInMS,
                defaultOnEquipments: [EquipmentCodes.AC, EquipmentCodes.LIGHT],
            }));
        }
        // eslint-disable-next-line no-plusplus
        for (let j = 0; j < noOfSubCorridors; j++) {
            const scCode = `${floorCode}_SC${j + 1}`;
            promises.push(AreasService.addOne({
                code: scCode,
                floor: i,
                areaType: AREA_TYPES.SUB_CORRIDOR,
                maxConsumptionUnits: 15,
                autoTurnOffTTLInMS,
                defaultOnEquipments: [EquipmentCodes.AC],
            }));
        }
    }
    return Promise.all(promises);
}

function addEquipment(areas, noOfAcInMC, noOfLightsInMC, noOfAcInSc, noOfLightsInSc) {
    const promises = [];
    areas.forEach((a) => {
        if (a.areaType === AREA_TYPES.MAIN_CORRIDOR) {
            for (let i = 0; i < noOfAcInMC; i += 1) {
                promises.push(EquipmentInAreaService.addOne(
                    {
                        areaCode: a.code,
                        equipmentCode: EquipmentCodes.AC,
                        status: EquipmentStatus.ON,
                    },
                ));
            }
            for (let i = 0; i < noOfLightsInMC; i += 1) {
                promises.push(EquipmentInAreaService.addOne(
                    {
                        areaCode: a.code,
                        equipmentCode: EquipmentCodes.LIGHT,
                        status: EquipmentStatus.ON,
                    },
                ));
            }
        }
        if (a.areaType === AREA_TYPES.SUB_CORRIDOR) {
            for (let i = 0; i < noOfAcInSc; i += 1) {
                promises.push(EquipmentInAreaService.addOne(
                    {
                        areaCode: a.code,
                        equipmentCode: EquipmentCodes.AC,
                        status: EquipmentStatus.ON,
                    },
                ));
            }
            for (let i = 0; i < noOfLightsInSc; i += 1) {
                promises.push(EquipmentInAreaService.addOne(
                    {
                        areaCode: a.code,
                        equipmentCode: EquipmentCodes.LIGHT,
                        status: EquipmentStatus.OFF,
                    },
                ));
            }
            promises.push(addSensor(a));
        }
    });
}

SetupService.setup = async (setupConfig) => {
    const {
        noOfFloors,
        noOfMainCorridors,
        noOfSubCorridors,
        noOfLightsInMC = 1,
        noOfLightsInSc = 1,
        noOfAcInMC = 1,
        noOfAcInSc = 1,
        autoTurnOffTTLInMS = 60,
    } = setupConfig;
    if (!noOfFloors || !noOfMainCorridors || !noOfSubCorridors) {
        throw new HTTPError(HTTPErrorCodes.BAD_REQUEST, 'Invalid setup config');
    }
    // for each floor generate Areas
    // for each area add equipment in area, sensor and sensor in area
    // eslint-disable-next-line no-plusplus
    const areas = await addAreas(
        noOfFloors,
        noOfMainCorridors,
        noOfSubCorridors,
        autoTurnOffTTLInMS,
    );
    addEquipment(areas, noOfAcInMC, noOfLightsInMC, noOfAcInSc, noOfLightsInSc);
};

SetupService.reset = async () => {
    await Promise.all([
        AreasService.deleteAll(),
        EquipmentInAreaService.deleteAll(),
        SensorService.deleteAll(),
        SensorInAreaService.deleteAll(),
    ]);
};

SetupService.monitor = async () => {
    const areas = await AreasService.getALL({ limit: -1 });
    const equipmentsInAreas = (await EquipmentInAreaService.getALL({ limit: -1 }))
        .reduce((res, e) => {
            res[e.areaCode] = res[e.areaCode] || [];
            res[e.areaCode].push(e);
            return res;
        }, {});

    const result = {};
    for (const a of areas) {
        result[a.floor] = result[a.floor] || [];
        result[a.floor].push({
            floor: a.floor,
            area: a.areaType,
            areaCode: a.code,
            equipments: (equipmentsInAreas[a.code] || [])
                .map((e) => ({
                    equipment: e.equipmentCode,
                    id: e._id,
                    status: e.status,
                })),
        });
    }
    return result;
};

module.exports = SetupService;
