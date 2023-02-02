import * as functions from './index';

describe('index', () => {
    it('exports the correct functions and variables and types', () => {
        expect(functions.getAPIVersion).toBeDefined();
        expect(functions.getFIA_Documents).toBeDefined();
        expect(functions.getCircuitInfo).toBeDefined();
        expect(functions.getPlayerBounds).toBeDefined();
        expect(functions.removePlayer).toBeDefined();
        expect(functions.syncPlayers).toBeDefined();
        expect(functions.setPlayerBounds).toBeDefined();
        expect(functions.createPlayer).toBeDefined();
        expect(functions.setSpeedometerVisibility).toBeDefined();
        expect(functions.getAllPlayers).toBeDefined();
        expect(functions.customGraphQL).toBeDefined();
        expect(functions.getF1MVVersion).toBeDefined();
        expect(functions.discoverF1MVInstances).toBeDefined();
        expect(functions.LiveTimingAPIV1).toBeDefined();
        expect(functions.LiveTimingAPIV2).toBeDefined();
        expect(functions.LiveTimingAPIGraphQL).toBeDefined();
        expect(functions.LiveTimingClockAPIGraphQL).toBeDefined();
        expect(functions.testConnection).toBeDefined();
        expect(functions.noInstanceFounded).toBeDefined();
        expect(functions.invalidTopic).toBeDefined();
    });
});
