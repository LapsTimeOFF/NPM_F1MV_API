import * as index from '../src/index';
import * as connection from '../src/connection';
import * as discoverF1MVInstances from '../src/discoverF1MVInstances';
import * as Errors from '../src/Errors';
import * as GraphQL from '../src/GraphQL';
import * as LiveTimingAPI from '../src/LiveTimingAPI';
import * as Player from '../src/Player';
import * as publicAPI from '../src/publicAPI';
import * as Types from '../src/Types';
import * as getVersion from '../src/getVersion';

describe('verify exports', () => {
  test('exports all', () => {
    expect(index).toEqual({
      ...connection,
      ...discoverF1MVInstances,
      ...Errors,
      ...GraphQL,
      ...LiveTimingAPI,
      ...Player,
      ...publicAPI,
      ...Types,
      ...getVersion,
    });
  });
});
