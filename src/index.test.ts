import * as index from './index';
import * as connection from './connection';
import * as discoverF1MVInstances from './discoverF1MVInstances';
import * as Errors from './Errors';
import * as GraphQL from './GraphQL';
import * as LiveTimingAPI from './LiveTimingAPI';
import * as Player from './Player';
import * as publicAPI from './publicAPI';
import * as Types from './Types';
import * as getVersion from './getVersion';

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
