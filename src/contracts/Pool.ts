import { 
  Cell,
  Slice, 
  Address, 
  Builder, 
  beginCell, 
  ComputeError, 
  TupleItem, 
  TupleReader, 
  Dictionary, 
  contractAddress, 
  ContractProvider, 
  Sender, 
  Contract, 
  ContractABI, 
  ABIType,
  ABIGetter,
  ABIReceiver,
  TupleBuilder,
  DictionaryValue
} from '@ton/core';

export type StateInit = {
  $$type: 'StateInit';
  code: Cell;
  data: Cell;
}

export function storeStateInit(src: StateInit) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeRef(src.code);
      b_0.storeRef(src.data);
  };
}

export function loadStateInit(slice: Slice) {
  let sc_0 = slice;
  let _code = sc_0.loadRef();
  let _data = sc_0.loadRef();
  return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
  let _code = source.readCell();
  let _data = source.readCell();
  return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
  let builder = new TupleBuilder();
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
      },
      parse: (src) => {
          return loadStateInit(src.loadRef().beginParse());
      }
  }
}

export type Context = {
  $$type: 'Context';
  bounced: boolean;
  sender: Address;
  value: bigint;
  raw: Cell;
}

export function storeContext(src: Context) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeBit(src.bounced);
      b_0.storeAddress(src.sender);
      b_0.storeInt(src.value, 257);
      b_0.storeRef(src.raw);
  };
}

export function loadContext(slice: Slice) {
  let sc_0 = slice;
  let _bounced = sc_0.loadBit();
  let _sender = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _raw = sc_0.loadRef();
  return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
  let _bounced = source.readBoolean();
  let _sender = source.readAddress();
  let _value = source.readBigNumber();
  let _raw = source.readCell();
  return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.bounced);
  builder.writeAddress(source.sender);
  builder.writeNumber(source.value);
  builder.writeSlice(source.raw);
  return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeContext(src)).endCell());
      },
      parse: (src) => {
          return loadContext(src.loadRef().beginParse());
      }
  }
}

export type SendParameters = {
  $$type: 'SendParameters';
  bounce: boolean;
  to: Address;
  value: bigint;
  mode: bigint;
  body: Cell | null;
  code: Cell | null;
  data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeBit(src.bounce);
      b_0.storeAddress(src.to);
      b_0.storeInt(src.value, 257);
      b_0.storeInt(src.mode, 257);
      if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
      if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
      if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
  };
}

export function loadSendParameters(slice: Slice) {
  let sc_0 = slice;
  let _bounce = sc_0.loadBit();
  let _to = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _mode = sc_0.loadIntBig(257);
  let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
  return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
  let _bounce = source.readBoolean();
  let _to = source.readAddress();
  let _value = source.readBigNumber();
  let _mode = source.readBigNumber();
  let _body = source.readCellOpt();
  let _code = source.readCellOpt();
  let _data = source.readCellOpt();
  return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.bounce);
  builder.writeAddress(source.to);
  builder.writeNumber(source.value);
  builder.writeNumber(source.mode);
  builder.writeCell(source.body);
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
      },
      parse: (src) => {
          return loadSendParameters(src.loadRef().beginParse());
      }
  }
}

export type Deploy = {
  $$type: 'Deploy';
  queryId: bigint;
}

export function storeDeploy(src: Deploy) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2490013878, 32);
      b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
      },
      parse: (src) => {
          return loadDeploy(src.loadRef().beginParse());
      }
  }
}

export type DeployOk = {
  $$type: 'DeployOk';
  queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2952335191, 32);
      b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeployOk(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
      },
      parse: (src) => {
          return loadDeployOk(src.loadRef().beginParse());
      }
  }
}

export type FactoryDeploy = {
  $$type: 'FactoryDeploy';
  queryId: bigint;
  cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1829761339, 32);
      b_0.storeUint(src.queryId, 64);
      b_0.storeAddress(src.cashback);
  };
}

export function loadFactoryDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  let _cashback = sc_0.loadAddress();
  return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _cashback = source.readAddress();
  return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.cashback);
  return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
      },
      parse: (src) => {
          return loadFactoryDeploy(src.loadRef().beginParse());
      }
  }
}

export type ChangeOwner = {
  $$type: 'ChangeOwner';
  queryId: bigint;
  newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2174598809, 32);
      b_0.storeUint(src.queryId, 64);
      b_0.storeAddress(src.newOwner);
  };
}

export function loadChangeOwner(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  let _newOwner = sc_0.loadAddress();
  return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _newOwner = source.readAddress();
  return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.newOwner);
  return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
      },
      parse: (src) => {
          return loadChangeOwner(src.loadRef().beginParse());
      }
  }
}

export type ChangeOwnerOk = {
  $$type: 'ChangeOwnerOk';
  queryId: bigint;
  newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(846932810, 32);
      b_0.storeUint(src.queryId, 64);
      b_0.storeAddress(src.newOwner);
  };
}

export function loadChangeOwnerOk(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  let _newOwner = sc_0.loadAddress();
  return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _newOwner = source.readAddress();
  return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.newOwner);
  return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
      },
      parse: (src) => {
          return loadChangeOwnerOk(src.loadRef().beginParse());
      }
  }
}

export type PoolDataInAToken = {
  $$type: 'PoolDataInAToken';
  pool: Address;
  asset: Address;
}

export function storePoolDataInAToken(src: PoolDataInAToken) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeAddress(src.pool);
      b_0.storeAddress(src.asset);
  };
}

export function loadPoolDataInAToken(slice: Slice) {
  let sc_0 = slice;
  let _pool = sc_0.loadAddress();
  let _asset = sc_0.loadAddress();
  return { $$type: 'PoolDataInAToken' as const, pool: _pool, asset: _asset };
}

function loadTuplePoolDataInAToken(source: TupleReader) {
  let _pool = source.readAddress();
  let _asset = source.readAddress();
  return { $$type: 'PoolDataInAToken' as const, pool: _pool, asset: _asset };
}

function storeTuplePoolDataInAToken(source: PoolDataInAToken) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.pool);
  builder.writeAddress(source.asset);
  return builder.build();
}

function dictValueParserPoolDataInAToken(): DictionaryValue<PoolDataInAToken> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storePoolDataInAToken(src)).endCell());
      },
      parse: (src) => {
          return loadPoolDataInAToken(src.loadRef().beginParse());
      }
  }
}

export type PoolDataInDToken = {
  $$type: 'PoolDataInDToken';
  pool: Address;
  asset: Address;
}

export function storePoolDataInDToken(src: PoolDataInDToken) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeAddress(src.pool);
      b_0.storeAddress(src.asset);
  };
}

export function loadPoolDataInDToken(slice: Slice) {
  let sc_0 = slice;
  let _pool = sc_0.loadAddress();
  let _asset = sc_0.loadAddress();
  return { $$type: 'PoolDataInDToken' as const, pool: _pool, asset: _asset };
}

function loadTuplePoolDataInDToken(source: TupleReader) {
  let _pool = source.readAddress();
  let _asset = source.readAddress();
  return { $$type: 'PoolDataInDToken' as const, pool: _pool, asset: _asset };
}

function storeTuplePoolDataInDToken(source: PoolDataInDToken) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.pool);
  builder.writeAddress(source.asset);
  return builder.build();
}

function dictValueParserPoolDataInDToken(): DictionaryValue<PoolDataInDToken> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storePoolDataInDToken(src)).endCell());
      },
      parse: (src) => {
          return loadPoolDataInDToken(src.loadRef().beginParse());
      }
  }
}

export type ReserveConfiguration = {
  $$type: 'ReserveConfiguration';
  poolWalletAddress: Address;
  aTokenAddress: Address;
  dTokenAddress: Address;
  ltv: bigint;
  liquidationThreshold: bigint;
  liquidationBonus: bigint;
  reserveFactor: bigint;
  liquidationProtocolFee: bigint;
  isActive: boolean;
  isFrozen: boolean;
  borrowingEnabled: boolean;
  supplyCap: bigint;
  borrowCap: bigint;
  treasury: Address;
  decimals: bigint;
}

export function storeReserveConfiguration(src: ReserveConfiguration) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeAddress(src.poolWalletAddress);
      b_0.storeAddress(src.aTokenAddress);
      b_0.storeAddress(src.dTokenAddress);
      b_0.storeUint(src.ltv, 16);
      b_0.storeUint(src.liquidationThreshold, 16);
      b_0.storeUint(src.liquidationBonus, 16);
      b_0.storeUint(src.reserveFactor, 16);
      b_0.storeUint(src.liquidationProtocolFee, 16);
      b_0.storeBit(src.isActive);
      b_0.storeBit(src.isFrozen);
      b_0.storeBit(src.borrowingEnabled);
      b_0.storeCoins(src.supplyCap);
      let b_1 = new Builder();
      b_1.storeCoins(src.borrowCap);
      b_1.storeAddress(src.treasury);
      b_1.storeUint(src.decimals, 8);
      b_0.storeRef(b_1.endCell());
  };
}

export function loadReserveConfiguration(slice: Slice) {
  let sc_0 = slice;
  let _poolWalletAddress = sc_0.loadAddress();
  let _aTokenAddress = sc_0.loadAddress();
  let _dTokenAddress = sc_0.loadAddress();
  let _ltv = sc_0.loadUintBig(16);
  let _liquidationThreshold = sc_0.loadUintBig(16);
  let _liquidationBonus = sc_0.loadUintBig(16);
  let _reserveFactor = sc_0.loadUintBig(16);
  let _liquidationProtocolFee = sc_0.loadUintBig(16);
  let _isActive = sc_0.loadBit();
  let _isFrozen = sc_0.loadBit();
  let _borrowingEnabled = sc_0.loadBit();
  let _supplyCap = sc_0.loadCoins();
  let sc_1 = sc_0.loadRef().beginParse();
  let _borrowCap = sc_1.loadCoins();
  let _treasury = sc_1.loadAddress();
  let _decimals = sc_1.loadUintBig(8);
  return { $$type: 'ReserveConfiguration' as const, poolWalletAddress: _poolWalletAddress, aTokenAddress: _aTokenAddress, dTokenAddress: _dTokenAddress, ltv: _ltv, liquidationThreshold: _liquidationThreshold, liquidationBonus: _liquidationBonus, reserveFactor: _reserveFactor, liquidationProtocolFee: _liquidationProtocolFee, isActive: _isActive, isFrozen: _isFrozen, borrowingEnabled: _borrowingEnabled, supplyCap: _supplyCap, borrowCap: _borrowCap, treasury: _treasury, decimals: _decimals };
}

function loadTupleReserveConfiguration(source: TupleReader) {
  let _poolWalletAddress = source.readAddress();
  let _aTokenAddress = source.readAddress();
  let _dTokenAddress = source.readAddress();
  let _ltv = source.readBigNumber();
  let _liquidationThreshold = source.readBigNumber();
  let _liquidationBonus = source.readBigNumber();
  let _reserveFactor = source.readBigNumber();
  let _liquidationProtocolFee = source.readBigNumber();
  let _isActive = source.readBoolean();
  let _isFrozen = source.readBoolean();
  let _borrowingEnabled = source.readBoolean();
  let _supplyCap = source.readBigNumber();
  let _borrowCap = source.readBigNumber();
  let _treasury = source.readAddress();
  let _decimals = source.readBigNumber();
  return { $$type: 'ReserveConfiguration' as const, poolWalletAddress: _poolWalletAddress, aTokenAddress: _aTokenAddress, dTokenAddress: _dTokenAddress, ltv: _ltv, liquidationThreshold: _liquidationThreshold, liquidationBonus: _liquidationBonus, reserveFactor: _reserveFactor, liquidationProtocolFee: _liquidationProtocolFee, isActive: _isActive, isFrozen: _isFrozen, borrowingEnabled: _borrowingEnabled, supplyCap: _supplyCap, borrowCap: _borrowCap, treasury: _treasury, decimals: _decimals };
}

function storeTupleReserveConfiguration(source: ReserveConfiguration) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.poolWalletAddress);
  builder.writeAddress(source.aTokenAddress);
  builder.writeAddress(source.dTokenAddress);
  builder.writeNumber(source.ltv);
  builder.writeNumber(source.liquidationThreshold);
  builder.writeNumber(source.liquidationBonus);
  builder.writeNumber(source.reserveFactor);
  builder.writeNumber(source.liquidationProtocolFee);
  builder.writeBoolean(source.isActive);
  builder.writeBoolean(source.isFrozen);
  builder.writeBoolean(source.borrowingEnabled);
  builder.writeNumber(source.supplyCap);
  builder.writeNumber(source.borrowCap);
  builder.writeAddress(source.treasury);
  builder.writeNumber(source.decimals);
  return builder.build();
}

function dictValueParserReserveConfiguration(): DictionaryValue<ReserveConfiguration> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeReserveConfiguration(src)).endCell());
      },
      parse: (src) => {
          return loadReserveConfiguration(src.loadRef().beginParse());
      }
  }
}

export type ReserveInterestRateStrategy = {
  $$type: 'ReserveInterestRateStrategy';
  optimalUsageRatio: bigint;
  maxUsageRatio: bigint;
  baseBorrowRate: bigint;
  slope1: bigint;
  slope2: bigint;
}

export function storeReserveInterestRateStrategy(src: ReserveInterestRateStrategy) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(src.optimalUsageRatio, 128);
      b_0.storeUint(src.maxUsageRatio, 128);
      b_0.storeUint(src.baseBorrowRate, 128);
      b_0.storeUint(src.slope1, 128);
      b_0.storeUint(src.slope2, 128);
  };
}

export function loadReserveInterestRateStrategy(slice: Slice) {
  let sc_0 = slice;
  let _optimalUsageRatio = sc_0.loadUintBig(128);
  let _maxUsageRatio = sc_0.loadUintBig(128);
  let _baseBorrowRate = sc_0.loadUintBig(128);
  let _slope1 = sc_0.loadUintBig(128);
  let _slope2 = sc_0.loadUintBig(128);
  return { $$type: 'ReserveInterestRateStrategy' as const, optimalUsageRatio: _optimalUsageRatio, maxUsageRatio: _maxUsageRatio, baseBorrowRate: _baseBorrowRate, slope1: _slope1, slope2: _slope2 };
}

function loadTupleReserveInterestRateStrategy(source: TupleReader) {
  let _optimalUsageRatio = source.readBigNumber();
  let _maxUsageRatio = source.readBigNumber();
  let _baseBorrowRate = source.readBigNumber();
  let _slope1 = source.readBigNumber();
  let _slope2 = source.readBigNumber();
  return { $$type: 'ReserveInterestRateStrategy' as const, optimalUsageRatio: _optimalUsageRatio, maxUsageRatio: _maxUsageRatio, baseBorrowRate: _baseBorrowRate, slope1: _slope1, slope2: _slope2 };
}

function storeTupleReserveInterestRateStrategy(source: ReserveInterestRateStrategy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.optimalUsageRatio);
  builder.writeNumber(source.maxUsageRatio);
  builder.writeNumber(source.baseBorrowRate);
  builder.writeNumber(source.slope1);
  builder.writeNumber(source.slope2);
  return builder.build();
}

function dictValueParserReserveInterestRateStrategy(): DictionaryValue<ReserveInterestRateStrategy> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeReserveInterestRateStrategy(src)).endCell());
      },
      parse: (src) => {
          return loadReserveInterestRateStrategy(src.loadRef().beginParse());
      }
  }
}

export type ReserveData = {
  $$type: 'ReserveData';
  liquidityIndex: bigint;
  currentLiquidityRate: bigint;
  borrowIndex: bigint;
  currentBorrowRate: bigint;
  totalSupply: bigint;
  availableLiquidity: bigint;
  accruedToTreasury: bigint;
  totalBorrow: bigint;
  lastUpdateTimestamp: bigint;
  price: bigint;
}

export function storeReserveData(src: ReserveData) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(src.liquidityIndex, 128);
      b_0.storeUint(src.currentLiquidityRate, 128);
      b_0.storeUint(src.borrowIndex, 128);
      b_0.storeUint(src.currentBorrowRate, 128);
      b_0.storeCoins(src.totalSupply);
      b_0.storeCoins(src.availableLiquidity);
      b_0.storeCoins(src.accruedToTreasury);
      b_0.storeCoins(src.totalBorrow);
      let b_1 = new Builder();
      b_1.storeUint(src.lastUpdateTimestamp, 32);
      b_1.storeUint(src.price, 64);
      b_0.storeRef(b_1.endCell());
  };
}

export function loadReserveData(slice: Slice) {
  let sc_0 = slice;
  let _liquidityIndex = sc_0.loadUintBig(128);
  let _currentLiquidityRate = sc_0.loadUintBig(128);
  let _borrowIndex = sc_0.loadUintBig(128);
  let _currentBorrowRate = sc_0.loadUintBig(128);
  let _totalSupply = sc_0.loadCoins();
  let _availableLiquidity = sc_0.loadCoins();
  let _accruedToTreasury = sc_0.loadCoins();
  let _totalBorrow = sc_0.loadCoins();
  let sc_1 = sc_0.loadRef().beginParse();
  let _lastUpdateTimestamp = sc_1.loadUintBig(32);
  let _price = sc_1.loadUintBig(64);
  return { $$type: 'ReserveData' as const, liquidityIndex: _liquidityIndex, currentLiquidityRate: _currentLiquidityRate, borrowIndex: _borrowIndex, currentBorrowRate: _currentBorrowRate, totalSupply: _totalSupply, availableLiquidity: _availableLiquidity, accruedToTreasury: _accruedToTreasury, totalBorrow: _totalBorrow, lastUpdateTimestamp: _lastUpdateTimestamp, price: _price };
}

function loadTupleReserveData(source: TupleReader) {
  let _liquidityIndex = source.readBigNumber();
  let _currentLiquidityRate = source.readBigNumber();
  let _borrowIndex = source.readBigNumber();
  let _currentBorrowRate = source.readBigNumber();
  let _totalSupply = source.readBigNumber();
  let _availableLiquidity = source.readBigNumber();
  let _accruedToTreasury = source.readBigNumber();
  let _totalBorrow = source.readBigNumber();
  let _lastUpdateTimestamp = source.readBigNumber();
  let _price = source.readBigNumber();
  return { $$type: 'ReserveData' as const, liquidityIndex: _liquidityIndex, currentLiquidityRate: _currentLiquidityRate, borrowIndex: _borrowIndex, currentBorrowRate: _currentBorrowRate, totalSupply: _totalSupply, availableLiquidity: _availableLiquidity, accruedToTreasury: _accruedToTreasury, totalBorrow: _totalBorrow, lastUpdateTimestamp: _lastUpdateTimestamp, price: _price };
}

function storeTupleReserveData(source: ReserveData) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.liquidityIndex);
  builder.writeNumber(source.currentLiquidityRate);
  builder.writeNumber(source.borrowIndex);
  builder.writeNumber(source.currentBorrowRate);
  builder.writeNumber(source.totalSupply);
  builder.writeNumber(source.availableLiquidity);
  builder.writeNumber(source.accruedToTreasury);
  builder.writeNumber(source.totalBorrow);
  builder.writeNumber(source.lastUpdateTimestamp);
  builder.writeNumber(source.price);
  return builder.build();
}

function dictValueParserReserveData(): DictionaryValue<ReserveData> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeReserveData(src)).endCell());
      },
      parse: (src) => {
          return loadReserveData(src.loadRef().beginParse());
      }
  }
}

export type ReserveDataAndConfiguration = {
  $$type: 'ReserveDataAndConfiguration';
  reserveData: ReserveData;
  reserveConfiguration: ReserveConfiguration;
  normalizedIncome: bigint;
  normalizedDebt: bigint;
}

export function storeReserveDataAndConfiguration(src: ReserveDataAndConfiguration) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.store(storeReserveData(src.reserveData));
      let b_1 = new Builder();
      b_1.store(storeReserveConfiguration(src.reserveConfiguration));
      let b_2 = new Builder();
      b_2.storeUint(src.normalizedIncome, 128);
      b_2.storeUint(src.normalizedDebt, 128);
      b_1.storeRef(b_2.endCell());
      b_0.storeRef(b_1.endCell());
  };
}

export function loadReserveDataAndConfiguration(slice: Slice) {
  let sc_0 = slice;
  let _reserveData = loadReserveData(sc_0);
  let sc_1 = sc_0.loadRef().beginParse();
  let _reserveConfiguration = loadReserveConfiguration(sc_1);
  let sc_2 = sc_1.loadRef().beginParse();
  let _normalizedIncome = sc_2.loadUintBig(128);
  let _normalizedDebt = sc_2.loadUintBig(128);
  return { $$type: 'ReserveDataAndConfiguration' as const, reserveData: _reserveData, reserveConfiguration: _reserveConfiguration, normalizedIncome: _normalizedIncome, normalizedDebt: _normalizedDebt };
}

function loadTupleReserveDataAndConfiguration(source: TupleReader) {
  const _reserveData = loadTupleReserveData(source.readTuple());
  const _reserveConfiguration = loadTupleReserveConfiguration(source.readTuple());
  let _normalizedIncome = source.readBigNumber();
  let _normalizedDebt = source.readBigNumber();
  return { $$type: 'ReserveDataAndConfiguration' as const, reserveData: _reserveData, reserveConfiguration: _reserveConfiguration, normalizedIncome: _normalizedIncome, normalizedDebt: _normalizedDebt };
}

function storeTupleReserveDataAndConfiguration(source: ReserveDataAndConfiguration) {
  let builder = new TupleBuilder();
  builder.writeTuple(storeTupleReserveData(source.reserveData));
  builder.writeTuple(storeTupleReserveConfiguration(source.reserveConfiguration));
  builder.writeNumber(source.normalizedIncome);
  builder.writeNumber(source.normalizedDebt);
  return builder.build();
}

function dictValueParserReserveDataAndConfiguration(): DictionaryValue<ReserveDataAndConfiguration> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeReserveDataAndConfiguration(src)).endCell());
      },
      parse: (src) => {
          return loadReserveDataAndConfiguration(src.loadRef().beginParse());
      }
  }
}

export type TokenData = {
  $$type: 'TokenData';
  supply: bigint;
  borrow: bigint;
  asCollateral: boolean;
}

export function storeTokenData(src: TokenData) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeCoins(src.supply);
      b_0.storeCoins(src.borrow);
      b_0.storeBit(src.asCollateral);
  };
}

export function loadTokenData(slice: Slice) {
  let sc_0 = slice;
  let _supply = sc_0.loadCoins();
  let _borrow = sc_0.loadCoins();
  let _asCollateral = sc_0.loadBit();
  return { $$type: 'TokenData' as const, supply: _supply, borrow: _borrow, asCollateral: _asCollateral };
}

function loadTupleTokenData(source: TupleReader) {
  let _supply = source.readBigNumber();
  let _borrow = source.readBigNumber();
  let _asCollateral = source.readBoolean();
  return { $$type: 'TokenData' as const, supply: _supply, borrow: _borrow, asCollateral: _asCollateral };
}

function storeTupleTokenData(source: TokenData) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.supply);
  builder.writeNumber(source.borrow);
  builder.writeBoolean(source.asCollateral);
  return builder.build();
}

function dictValueParserTokenData(): DictionaryValue<TokenData> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeTokenData(src)).endCell());
      },
      parse: (src) => {
          return loadTokenData(src.loadRef().beginParse());
      }
  }
}

export type UserAccountData = {
  $$type: 'UserAccountData';
  positions: Dictionary<bigint, Address>;
  positionsLength: bigint;
  positionsDetail: Dictionary<Address, TokenData>;
}

export function storeUserAccountData(src: UserAccountData) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeDict(src.positions, Dictionary.Keys.BigInt(257), Dictionary.Values.Address());
      b_0.storeInt(src.positionsLength, 257);
      b_0.storeDict(src.positionsDetail, Dictionary.Keys.Address(), dictValueParserTokenData());
  };
}

export function loadUserAccountData(slice: Slice) {
  let sc_0 = slice;
  let _positions = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), sc_0);
  let _positionsLength = sc_0.loadIntBig(257);
  let _positionsDetail = Dictionary.load(Dictionary.Keys.Address(), dictValueParserTokenData(), sc_0);
  return { $$type: 'UserAccountData' as const, positions: _positions, positionsLength: _positionsLength, positionsDetail: _positionsDetail };
}

function loadTupleUserAccountData(source: TupleReader) {
  let _positions = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
  let _positionsLength = source.readBigNumber();
  let _positionsDetail = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserTokenData(), source.readCellOpt());
  return { $$type: 'UserAccountData' as const, positions: _positions, positionsLength: _positionsLength, positionsDetail: _positionsDetail };
}

function storeTupleUserAccountData(source: UserAccountData) {
  let builder = new TupleBuilder();
  builder.writeCell(source.positions.size > 0 ? beginCell().storeDictDirect(source.positions, Dictionary.Keys.BigInt(257), Dictionary.Values.Address()).endCell() : null);
  builder.writeNumber(source.positionsLength);
  builder.writeCell(source.positionsDetail.size > 0 ? beginCell().storeDictDirect(source.positionsDetail, Dictionary.Keys.Address(), dictValueParserTokenData()).endCell() : null);
  return builder.build();
}

function dictValueParserUserAccountData(): DictionaryValue<UserAccountData> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeUserAccountData(src)).endCell());
      },
      parse: (src) => {
          return loadUserAccountData(src.loadRef().beginParse());
      }
  }
}

export type ReserveCache = {
  $$type: 'ReserveCache';
  currentScaledDebt: bigint;
  nextScaledDebt: bigint;
  currentLiquidityIndex: bigint;
  nextLiquidityIndex: bigint;
  currentBorrowIndex: bigint;
  nextBorrowIndex: bigint;
  currentLiquidityRate: bigint;
  currentBorrowRate: bigint;
  reserveFactor: bigint;
  lastUpdateTimestamp: bigint;
}

export function storeReserveCache(src: ReserveCache) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeInt(src.currentScaledDebt, 257);
      b_0.storeInt(src.nextScaledDebt, 257);
      b_0.storeInt(src.currentLiquidityIndex, 257);
      let b_1 = new Builder();
      b_1.storeInt(src.nextLiquidityIndex, 257);
      b_1.storeInt(src.currentBorrowIndex, 257);
      b_1.storeInt(src.nextBorrowIndex, 257);
      let b_2 = new Builder();
      b_2.storeInt(src.currentLiquidityRate, 257);
      b_2.storeInt(src.currentBorrowRate, 257);
      b_2.storeInt(src.reserveFactor, 257);
      let b_3 = new Builder();
      b_3.storeInt(src.lastUpdateTimestamp, 257);
      b_2.storeRef(b_3.endCell());
      b_1.storeRef(b_2.endCell());
      b_0.storeRef(b_1.endCell());
  };
}

export function loadReserveCache(slice: Slice) {
  let sc_0 = slice;
  let _currentScaledDebt = sc_0.loadIntBig(257);
  let _nextScaledDebt = sc_0.loadIntBig(257);
  let _currentLiquidityIndex = sc_0.loadIntBig(257);
  let sc_1 = sc_0.loadRef().beginParse();
  let _nextLiquidityIndex = sc_1.loadIntBig(257);
  let _currentBorrowIndex = sc_1.loadIntBig(257);
  let _nextBorrowIndex = sc_1.loadIntBig(257);
  let sc_2 = sc_1.loadRef().beginParse();
  let _currentLiquidityRate = sc_2.loadIntBig(257);
  let _currentBorrowRate = sc_2.loadIntBig(257);
  let _reserveFactor = sc_2.loadIntBig(257);
  let sc_3 = sc_2.loadRef().beginParse();
  let _lastUpdateTimestamp = sc_3.loadIntBig(257);
  return { $$type: 'ReserveCache' as const, currentScaledDebt: _currentScaledDebt, nextScaledDebt: _nextScaledDebt, currentLiquidityIndex: _currentLiquidityIndex, nextLiquidityIndex: _nextLiquidityIndex, currentBorrowIndex: _currentBorrowIndex, nextBorrowIndex: _nextBorrowIndex, currentLiquidityRate: _currentLiquidityRate, currentBorrowRate: _currentBorrowRate, reserveFactor: _reserveFactor, lastUpdateTimestamp: _lastUpdateTimestamp };
}

function loadTupleReserveCache(source: TupleReader) {
  let _currentScaledDebt = source.readBigNumber();
  let _nextScaledDebt = source.readBigNumber();
  let _currentLiquidityIndex = source.readBigNumber();
  let _nextLiquidityIndex = source.readBigNumber();
  let _currentBorrowIndex = source.readBigNumber();
  let _nextBorrowIndex = source.readBigNumber();
  let _currentLiquidityRate = source.readBigNumber();
  let _currentBorrowRate = source.readBigNumber();
  let _reserveFactor = source.readBigNumber();
  let _lastUpdateTimestamp = source.readBigNumber();
  return { $$type: 'ReserveCache' as const, currentScaledDebt: _currentScaledDebt, nextScaledDebt: _nextScaledDebt, currentLiquidityIndex: _currentLiquidityIndex, nextLiquidityIndex: _nextLiquidityIndex, currentBorrowIndex: _currentBorrowIndex, nextBorrowIndex: _nextBorrowIndex, currentLiquidityRate: _currentLiquidityRate, currentBorrowRate: _currentBorrowRate, reserveFactor: _reserveFactor, lastUpdateTimestamp: _lastUpdateTimestamp };
}

function storeTupleReserveCache(source: ReserveCache) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.currentScaledDebt);
  builder.writeNumber(source.nextScaledDebt);
  builder.writeNumber(source.currentLiquidityIndex);
  builder.writeNumber(source.nextLiquidityIndex);
  builder.writeNumber(source.currentBorrowIndex);
  builder.writeNumber(source.nextBorrowIndex);
  builder.writeNumber(source.currentLiquidityRate);
  builder.writeNumber(source.currentBorrowRate);
  builder.writeNumber(source.reserveFactor);
  builder.writeNumber(source.lastUpdateTimestamp);
  return builder.build();
}

function dictValueParserReserveCache(): DictionaryValue<ReserveCache> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeReserveCache(src)).endCell());
      },
      parse: (src) => {
          return loadReserveCache(src.loadRef().beginParse());
      }
  }
}

export type ATokenDTokenContents = {
  $$type: 'ATokenDTokenContents';
  aTokenContent: Cell;
  dTokenContent: Cell;
}

export function storeATokenDTokenContents(src: ATokenDTokenContents) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeRef(src.aTokenContent);
      b_0.storeRef(src.dTokenContent);
  };
}

export function loadATokenDTokenContents(slice: Slice) {
  let sc_0 = slice;
  let _aTokenContent = sc_0.loadRef();
  let _dTokenContent = sc_0.loadRef();
  return { $$type: 'ATokenDTokenContents' as const, aTokenContent: _aTokenContent, dTokenContent: _dTokenContent };
}

function loadTupleATokenDTokenContents(source: TupleReader) {
  let _aTokenContent = source.readCell();
  let _dTokenContent = source.readCell();
  return { $$type: 'ATokenDTokenContents' as const, aTokenContent: _aTokenContent, dTokenContent: _dTokenContent };
}

function storeTupleATokenDTokenContents(source: ATokenDTokenContents) {
  let builder = new TupleBuilder();
  builder.writeCell(source.aTokenContent);
  builder.writeCell(source.dTokenContent);
  return builder.build();
}

function dictValueParserATokenDTokenContents(): DictionaryValue<ATokenDTokenContents> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeATokenDTokenContents(src)).endCell());
      },
      parse: (src) => {
          return loadATokenDTokenContents(src.loadRef().beginParse());
      }
  }
}

export type ATokenDTokenAddress = {
  $$type: 'ATokenDTokenAddress';
  aToken: Address;
  dToken: Address;
}

export function storeATokenDTokenAddress(src: ATokenDTokenAddress) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeAddress(src.aToken);
      b_0.storeAddress(src.dToken);
  };
}

export function loadATokenDTokenAddress(slice: Slice) {
  let sc_0 = slice;
  let _aToken = sc_0.loadAddress();
  let _dToken = sc_0.loadAddress();
  return { $$type: 'ATokenDTokenAddress' as const, aToken: _aToken, dToken: _dToken };
}

function loadTupleATokenDTokenAddress(source: TupleReader) {
  let _aToken = source.readAddress();
  let _dToken = source.readAddress();
  return { $$type: 'ATokenDTokenAddress' as const, aToken: _aToken, dToken: _dToken };
}

function storeTupleATokenDTokenAddress(source: ATokenDTokenAddress) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.aToken);
  builder.writeAddress(source.dToken);
  return builder.build();
}

function dictValueParserATokenDTokenAddress(): DictionaryValue<ATokenDTokenAddress> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeATokenDTokenAddress(src)).endCell());
      },
      parse: (src) => {
          return loadATokenDTokenAddress(src.loadRef().beginParse());
      }
  }
}

export type CalculateInterestRatesParams = {
  $$type: 'CalculateInterestRatesParams';
  availableLiquidity: bigint;
  liquidityAdded: bigint;
  liquidityTaken: bigint;
  totalDebt: bigint;
  reserveFactor: bigint;
}

export function storeCalculateInterestRatesParams(src: CalculateInterestRatesParams) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeInt(src.availableLiquidity, 257);
      b_0.storeInt(src.liquidityAdded, 257);
      b_0.storeInt(src.liquidityTaken, 257);
      let b_1 = new Builder();
      b_1.storeInt(src.totalDebt, 257);
      b_1.storeInt(src.reserveFactor, 257);
      b_0.storeRef(b_1.endCell());
  };
}

export function loadCalculateInterestRatesParams(slice: Slice) {
  let sc_0 = slice;
  let _availableLiquidity = sc_0.loadIntBig(257);
  let _liquidityAdded = sc_0.loadIntBig(257);
  let _liquidityTaken = sc_0.loadIntBig(257);
  let sc_1 = sc_0.loadRef().beginParse();
  let _totalDebt = sc_1.loadIntBig(257);
  let _reserveFactor = sc_1.loadIntBig(257);
  return { $$type: 'CalculateInterestRatesParams' as const, availableLiquidity: _availableLiquidity, liquidityAdded: _liquidityAdded, liquidityTaken: _liquidityTaken, totalDebt: _totalDebt, reserveFactor: _reserveFactor };
}

function loadTupleCalculateInterestRatesParams(source: TupleReader) {
  let _availableLiquidity = source.readBigNumber();
  let _liquidityAdded = source.readBigNumber();
  let _liquidityTaken = source.readBigNumber();
  let _totalDebt = source.readBigNumber();
  let _reserveFactor = source.readBigNumber();
  return { $$type: 'CalculateInterestRatesParams' as const, availableLiquidity: _availableLiquidity, liquidityAdded: _liquidityAdded, liquidityTaken: _liquidityTaken, totalDebt: _totalDebt, reserveFactor: _reserveFactor };
}

function storeTupleCalculateInterestRatesParams(source: CalculateInterestRatesParams) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.availableLiquidity);
  builder.writeNumber(source.liquidityAdded);
  builder.writeNumber(source.liquidityTaken);
  builder.writeNumber(source.totalDebt);
  builder.writeNumber(source.reserveFactor);
  return builder.build();
}

function dictValueParserCalculateInterestRatesParams(): DictionaryValue<CalculateInterestRatesParams> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeCalculateInterestRatesParams(src)).endCell());
      },
      parse: (src) => {
          return loadCalculateInterestRatesParams(src.loadRef().beginParse());
      }
  }
}

export type LiquidityRateAndBorrowRate = {
  $$type: 'LiquidityRateAndBorrowRate';
  liquidityRate: bigint;
  borrowRate: bigint;
}

export function storeLiquidityRateAndBorrowRate(src: LiquidityRateAndBorrowRate) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeInt(src.liquidityRate, 257);
      b_0.storeInt(src.borrowRate, 257);
  };
}

export function loadLiquidityRateAndBorrowRate(slice: Slice) {
  let sc_0 = slice;
  let _liquidityRate = sc_0.loadIntBig(257);
  let _borrowRate = sc_0.loadIntBig(257);
  return { $$type: 'LiquidityRateAndBorrowRate' as const, liquidityRate: _liquidityRate, borrowRate: _borrowRate };
}

function loadTupleLiquidityRateAndBorrowRate(source: TupleReader) {
  let _liquidityRate = source.readBigNumber();
  let _borrowRate = source.readBigNumber();
  return { $$type: 'LiquidityRateAndBorrowRate' as const, liquidityRate: _liquidityRate, borrowRate: _borrowRate };
}

function storeTupleLiquidityRateAndBorrowRate(source: LiquidityRateAndBorrowRate) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.liquidityRate);
  builder.writeNumber(source.borrowRate);
  return builder.build();
}

function dictValueParserLiquidityRateAndBorrowRate(): DictionaryValue<LiquidityRateAndBorrowRate> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeLiquidityRateAndBorrowRate(src)).endCell());
      },
      parse: (src) => {
          return loadLiquidityRateAndBorrowRate(src.loadRef().beginParse());
      }
  }
}

export type UserAccountHealthInfo = {
  $$type: 'UserAccountHealthInfo';
  avgLtv: bigint;
  avgLiquidationThreshold: bigint;
  totalSupplyInBaseCurrency: bigint;
  totalCollateralInBaseCurrency: bigint;
  totalDebtInBaseCurrency: bigint;
  healthFactorInRay: bigint;
}

export function storeUserAccountHealthInfo(src: UserAccountHealthInfo) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(src.avgLtv, 16);
      b_0.storeUint(src.avgLiquidationThreshold, 16);
      b_0.storeUint(src.totalSupplyInBaseCurrency, 128);
      b_0.storeUint(src.totalCollateralInBaseCurrency, 128);
      b_0.storeUint(src.totalDebtInBaseCurrency, 128);
      b_0.storeUint(src.healthFactorInRay, 256);
  };
}

export function loadUserAccountHealthInfo(slice: Slice) {
  let sc_0 = slice;
  let _avgLtv = sc_0.loadUintBig(16);
  let _avgLiquidationThreshold = sc_0.loadUintBig(16);
  let _totalSupplyInBaseCurrency = sc_0.loadUintBig(128);
  let _totalCollateralInBaseCurrency = sc_0.loadUintBig(128);
  let _totalDebtInBaseCurrency = sc_0.loadUintBig(128);
  let _healthFactorInRay = sc_0.loadUintBig(256);
  return { $$type: 'UserAccountHealthInfo' as const, avgLtv: _avgLtv, avgLiquidationThreshold: _avgLiquidationThreshold, totalSupplyInBaseCurrency: _totalSupplyInBaseCurrency, totalCollateralInBaseCurrency: _totalCollateralInBaseCurrency, totalDebtInBaseCurrency: _totalDebtInBaseCurrency, healthFactorInRay: _healthFactorInRay };
}

function loadTupleUserAccountHealthInfo(source: TupleReader) {
  let _avgLtv = source.readBigNumber();
  let _avgLiquidationThreshold = source.readBigNumber();
  let _totalSupplyInBaseCurrency = source.readBigNumber();
  let _totalCollateralInBaseCurrency = source.readBigNumber();
  let _totalDebtInBaseCurrency = source.readBigNumber();
  let _healthFactorInRay = source.readBigNumber();
  return { $$type: 'UserAccountHealthInfo' as const, avgLtv: _avgLtv, avgLiquidationThreshold: _avgLiquidationThreshold, totalSupplyInBaseCurrency: _totalSupplyInBaseCurrency, totalCollateralInBaseCurrency: _totalCollateralInBaseCurrency, totalDebtInBaseCurrency: _totalDebtInBaseCurrency, healthFactorInRay: _healthFactorInRay };
}

function storeTupleUserAccountHealthInfo(source: UserAccountHealthInfo) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.avgLtv);
  builder.writeNumber(source.avgLiquidationThreshold);
  builder.writeNumber(source.totalSupplyInBaseCurrency);
  builder.writeNumber(source.totalCollateralInBaseCurrency);
  builder.writeNumber(source.totalDebtInBaseCurrency);
  builder.writeNumber(source.healthFactorInRay);
  return builder.build();
}

function dictValueParserUserAccountHealthInfo(): DictionaryValue<UserAccountHealthInfo> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeUserAccountHealthInfo(src)).endCell());
      },
      parse: (src) => {
          return loadUserAccountHealthInfo(src.loadRef().beginParse());
      }
  }
}

export type Liquidation = {
  $$type: 'Liquidation';
  liquidator: Address;
  borrower: Address;
  liquidationReserve: Address;
  collateralReserve: Address;
  liquidationAmount: bigint;
}

export function storeLiquidation(src: Liquidation) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeAddress(src.liquidator);
      b_0.storeAddress(src.borrower);
      b_0.storeAddress(src.liquidationReserve);
      let b_1 = new Builder();
      b_1.storeAddress(src.collateralReserve);
      b_1.storeInt(src.liquidationAmount, 257);
      b_0.storeRef(b_1.endCell());
  };
}

export function loadLiquidation(slice: Slice) {
  let sc_0 = slice;
  let _liquidator = sc_0.loadAddress();
  let _borrower = sc_0.loadAddress();
  let _liquidationReserve = sc_0.loadAddress();
  let sc_1 = sc_0.loadRef().beginParse();
  let _collateralReserve = sc_1.loadAddress();
  let _liquidationAmount = sc_1.loadIntBig(257);
  return { $$type: 'Liquidation' as const, liquidator: _liquidator, borrower: _borrower, liquidationReserve: _liquidationReserve, collateralReserve: _collateralReserve, liquidationAmount: _liquidationAmount };
}

function loadTupleLiquidation(source: TupleReader) {
  let _liquidator = source.readAddress();
  let _borrower = source.readAddress();
  let _liquidationReserve = source.readAddress();
  let _collateralReserve = source.readAddress();
  let _liquidationAmount = source.readBigNumber();
  return { $$type: 'Liquidation' as const, liquidator: _liquidator, borrower: _borrower, liquidationReserve: _liquidationReserve, collateralReserve: _collateralReserve, liquidationAmount: _liquidationAmount };
}

function storeTupleLiquidation(source: Liquidation) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.liquidator);
  builder.writeAddress(source.borrower);
  builder.writeAddress(source.liquidationReserve);
  builder.writeAddress(source.collateralReserve);
  builder.writeNumber(source.liquidationAmount);
  return builder.build();
}

function dictValueParserLiquidation(): DictionaryValue<Liquidation> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeLiquidation(src)).endCell());
      },
      parse: (src) => {
          return loadLiquidation(src.loadRef().beginParse());
      }
  }
}

export type PriceData = {
  $$type: 'PriceData';
  price: bigint;
  lastUpdateTime: bigint;
}

export function storePriceData(src: PriceData) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeInt(src.price, 257);
      b_0.storeUint(src.lastUpdateTime, 32);
  };
}

export function loadPriceData(slice: Slice) {
  let sc_0 = slice;
  let _price = sc_0.loadIntBig(257);
  let _lastUpdateTime = sc_0.loadUintBig(32);
  return { $$type: 'PriceData' as const, price: _price, lastUpdateTime: _lastUpdateTime };
}

function loadTuplePriceData(source: TupleReader) {
  let _price = source.readBigNumber();
  let _lastUpdateTime = source.readBigNumber();
  return { $$type: 'PriceData' as const, price: _price, lastUpdateTime: _lastUpdateTime };
}

function storeTuplePriceData(source: PriceData) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.price);
  builder.writeNumber(source.lastUpdateTime);
  return builder.build();
}

function dictValueParserPriceData(): DictionaryValue<PriceData> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storePriceData(src)).endCell());
      },
      parse: (src) => {
          return loadPriceData(src.loadRef().beginParse());
      }
  }
}

export type AddReserve = {
  $$type: 'AddReserve';
  reserveAddress: Address;
  reserveConfiguration: ReserveConfiguration;
  contents: ATokenDTokenContents;
  reserveInterestRateStrategy: ReserveInterestRateStrategy;
}

export function storeAddReserve(src: AddReserve) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1717960705, 32);
      b_0.storeAddress(src.reserveAddress);
      let b_1 = new Builder();
      b_1.store(storeReserveConfiguration(src.reserveConfiguration));
      b_1.store(storeATokenDTokenContents(src.contents));
      let b_2 = new Builder();
      b_2.store(storeReserveInterestRateStrategy(src.reserveInterestRateStrategy));
      b_1.storeRef(b_2.endCell());
      b_0.storeRef(b_1.endCell());
  };
}

export function loadAddReserve(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1717960705) { throw Error('Invalid prefix'); }
  let _reserveAddress = sc_0.loadAddress();
  let sc_1 = sc_0.loadRef().beginParse();
  let _reserveConfiguration = loadReserveConfiguration(sc_1);
  let _contents = loadATokenDTokenContents(sc_1);
  let sc_2 = sc_1.loadRef().beginParse();
  let _reserveInterestRateStrategy = loadReserveInterestRateStrategy(sc_2);
  return { $$type: 'AddReserve' as const, reserveAddress: _reserveAddress, reserveConfiguration: _reserveConfiguration, contents: _contents, reserveInterestRateStrategy: _reserveInterestRateStrategy };
}

function loadTupleAddReserve(source: TupleReader) {
  let _reserveAddress = source.readAddress();
  const _reserveConfiguration = loadTupleReserveConfiguration(source.readTuple());
  const _contents = loadTupleATokenDTokenContents(source.readTuple());
  const _reserveInterestRateStrategy = loadTupleReserveInterestRateStrategy(source.readTuple());
  return { $$type: 'AddReserve' as const, reserveAddress: _reserveAddress, reserveConfiguration: _reserveConfiguration, contents: _contents, reserveInterestRateStrategy: _reserveInterestRateStrategy };
}

function storeTupleAddReserve(source: AddReserve) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.reserveAddress);
  builder.writeTuple(storeTupleReserveConfiguration(source.reserveConfiguration));
  builder.writeTuple(storeTupleATokenDTokenContents(source.contents));
  builder.writeTuple(storeTupleReserveInterestRateStrategy(source.reserveInterestRateStrategy));
  return builder.build();
}

function dictValueParserAddReserve(): DictionaryValue<AddReserve> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeAddReserve(src)).endCell());
      },
      parse: (src) => {
          return loadAddReserve(src.loadRef().beginParse());
      }
  }
}

export type DropReserve = {
  $$type: 'DropReserve';
  reserveIndex: bigint;
}

export function storeDropReserve(src: DropReserve) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1717960706, 32);
      b_0.storeUint(src.reserveIndex, 16);
  };
}

export function loadDropReserve(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1717960706) { throw Error('Invalid prefix'); }
  let _reserveIndex = sc_0.loadUintBig(16);
  return { $$type: 'DropReserve' as const, reserveIndex: _reserveIndex };
}

function loadTupleDropReserve(source: TupleReader) {
  let _reserveIndex = source.readBigNumber();
  return { $$type: 'DropReserve' as const, reserveIndex: _reserveIndex };
}

function storeTupleDropReserve(source: DropReserve) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.reserveIndex);
  return builder.build();
}

function dictValueParserDropReserve(): DictionaryValue<DropReserve> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeDropReserve(src)).endCell());
      },
      parse: (src) => {
          return loadDropReserve(src.loadRef().beginParse());
      }
  }
}

export type BorrowToken = {
  $$type: 'BorrowToken';
  tokenAddress: Address;
  amount: bigint;
}

export function storeBorrowToken(src: BorrowToken) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1717960707, 32);
      b_0.storeAddress(src.tokenAddress);
      b_0.storeCoins(src.amount);
  };
}

export function loadBorrowToken(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1717960707) { throw Error('Invalid prefix'); }
  let _tokenAddress = sc_0.loadAddress();
  let _amount = sc_0.loadCoins();
  return { $$type: 'BorrowToken' as const, tokenAddress: _tokenAddress, amount: _amount };
}

function loadTupleBorrowToken(source: TupleReader) {
  let _tokenAddress = source.readAddress();
  let _amount = source.readBigNumber();
  return { $$type: 'BorrowToken' as const, tokenAddress: _tokenAddress, amount: _amount };
}

function storeTupleBorrowToken(source: BorrowToken) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.tokenAddress);
  builder.writeNumber(source.amount);
  return builder.build();
}

function dictValueParserBorrowToken(): DictionaryValue<BorrowToken> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeBorrowToken(src)).endCell());
      },
      parse: (src) => {
          return loadBorrowToken(src.loadRef().beginParse());
      }
  }
}

export type GetUserAccountData = {
  $$type: 'GetUserAccountData';
  queryId: bigint;
  user: Address;
  action: bigint;
  tokenAddress: Address;
  amount: bigint;
  payload: Cell;
}

export function storeGetUserAccountData(src: GetUserAccountData) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1717960708, 32);
      b_0.storeUint(src.queryId, 64);
      b_0.storeAddress(src.user);
      b_0.storeUint(src.action, 8);
      b_0.storeAddress(src.tokenAddress);
      b_0.storeCoins(src.amount);
      b_0.storeBuilder(src.payload.asBuilder());
  };
}

export function loadGetUserAccountData(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1717960708) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  let _user = sc_0.loadAddress();
  let _action = sc_0.loadUintBig(8);
  let _tokenAddress = sc_0.loadAddress();
  let _amount = sc_0.loadCoins();
  let _payload = sc_0.asCell();
  return { $$type: 'GetUserAccountData' as const, queryId: _queryId, user: _user, action: _action, tokenAddress: _tokenAddress, amount: _amount, payload: _payload };
}

function loadTupleGetUserAccountData(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _user = source.readAddress();
  let _action = source.readBigNumber();
  let _tokenAddress = source.readAddress();
  let _amount = source.readBigNumber();
  let _payload = source.readCell();
  return { $$type: 'GetUserAccountData' as const, queryId: _queryId, user: _user, action: _action, tokenAddress: _tokenAddress, amount: _amount, payload: _payload };
}

function storeTupleGetUserAccountData(source: GetUserAccountData) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.user);
  builder.writeNumber(source.action);
  builder.writeAddress(source.tokenAddress);
  builder.writeNumber(source.amount);
  builder.writeSlice(source.payload);
  return builder.build();
}

function dictValueParserGetUserAccountData(): DictionaryValue<GetUserAccountData> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeGetUserAccountData(src)).endCell());
      },
      parse: (src) => {
          return loadGetUserAccountData(src.loadRef().beginParse());
      }
  }
}

export type UserAccountDataResponse = {
  $$type: 'UserAccountDataResponse';
  queryId: bigint;
  user: Address;
  action: bigint;
  tokenAddress: Address;
  amount: bigint;
  accountData: UserAccountData;
  payload: Cell;
}

export function storeUserAccountDataResponse(src: UserAccountDataResponse) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1717960709, 32);
      b_0.storeUint(src.queryId, 64);
      b_0.storeAddress(src.user);
      b_0.storeUint(src.action, 8);
      b_0.storeAddress(src.tokenAddress);
      b_0.storeCoins(src.amount);
      b_0.store(storeUserAccountData(src.accountData));
      b_0.storeBuilder(src.payload.asBuilder());
  };
}

export function loadUserAccountDataResponse(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1717960709) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  let _user = sc_0.loadAddress();
  let _action = sc_0.loadUintBig(8);
  let _tokenAddress = sc_0.loadAddress();
  let _amount = sc_0.loadCoins();
  let _accountData = loadUserAccountData(sc_0);
  let _payload = sc_0.asCell();
  return { $$type: 'UserAccountDataResponse' as const, queryId: _queryId, user: _user, action: _action, tokenAddress: _tokenAddress, amount: _amount, accountData: _accountData, payload: _payload };
}

function loadTupleUserAccountDataResponse(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _user = source.readAddress();
  let _action = source.readBigNumber();
  let _tokenAddress = source.readAddress();
  let _amount = source.readBigNumber();
  const _accountData = loadTupleUserAccountData(source.readTuple());
  let _payload = source.readCell();
  return { $$type: 'UserAccountDataResponse' as const, queryId: _queryId, user: _user, action: _action, tokenAddress: _tokenAddress, amount: _amount, accountData: _accountData, payload: _payload };
}

function storeTupleUserAccountDataResponse(source: UserAccountDataResponse) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.user);
  builder.writeNumber(source.action);
  builder.writeAddress(source.tokenAddress);
  builder.writeNumber(source.amount);
  builder.writeTuple(storeTupleUserAccountData(source.accountData));
  builder.writeSlice(source.payload);
  return builder.build();
}

function dictValueParserUserAccountDataResponse(): DictionaryValue<UserAccountDataResponse> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeUserAccountDataResponse(src)).endCell());
      },
      parse: (src) => {
          return loadUserAccountDataResponse(src.loadRef().beginParse());
      }
  }
}

export type WithdrawToken = {
  $$type: 'WithdrawToken';
  tokenAddress: Address;
  amount: bigint;
}

export function storeWithdrawToken(src: WithdrawToken) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1717960710, 32);
      b_0.storeAddress(src.tokenAddress);
      b_0.storeCoins(src.amount);
  };
}

export function loadWithdrawToken(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1717960710) { throw Error('Invalid prefix'); }
  let _tokenAddress = sc_0.loadAddress();
  let _amount = sc_0.loadCoins();
  return { $$type: 'WithdrawToken' as const, tokenAddress: _tokenAddress, amount: _amount };
}

function loadTupleWithdrawToken(source: TupleReader) {
  let _tokenAddress = source.readAddress();
  let _amount = source.readBigNumber();
  return { $$type: 'WithdrawToken' as const, tokenAddress: _tokenAddress, amount: _amount };
}

function storeTupleWithdrawToken(source: WithdrawToken) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.tokenAddress);
  builder.writeNumber(source.amount);
  return builder.build();
}

function dictValueParserWithdrawToken(): DictionaryValue<WithdrawToken> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeWithdrawToken(src)).endCell());
      },
      parse: (src) => {
          return loadWithdrawToken(src.loadRef().beginParse());
      }
  }
}

export type UpdatePosition = {
  $$type: 'UpdatePosition';
  queryId: bigint;
  address: Address;
  supply: bigint;
  borrow: bigint;
}

export function storeUpdatePosition(src: UpdatePosition) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1717960711, 32);
      b_0.storeUint(src.queryId, 64);
      b_0.storeAddress(src.address);
      b_0.storeInt(src.supply, 128);
      b_0.storeInt(src.borrow, 128);
  };
}

export function loadUpdatePosition(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1717960711) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  let _address = sc_0.loadAddress();
  let _supply = sc_0.loadIntBig(128);
  let _borrow = sc_0.loadIntBig(128);
  return { $$type: 'UpdatePosition' as const, queryId: _queryId, address: _address, supply: _supply, borrow: _borrow };
}

function loadTupleUpdatePosition(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _address = source.readAddress();
  let _supply = source.readBigNumber();
  let _borrow = source.readBigNumber();
  return { $$type: 'UpdatePosition' as const, queryId: _queryId, address: _address, supply: _supply, borrow: _borrow };
}

function storeTupleUpdatePosition(source: UpdatePosition) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.address);
  builder.writeNumber(source.supply);
  builder.writeNumber(source.borrow);
  return builder.build();
}

function dictValueParserUpdatePosition(): DictionaryValue<UpdatePosition> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeUpdatePosition(src)).endCell());
      },
      parse: (src) => {
          return loadUpdatePosition(src.loadRef().beginParse());
      }
  }
}

export type UserPositionUpdated = {
  $$type: 'UserPositionUpdated';
  queryId: bigint;
  user: Address;
  asset: Address;
  supply: bigint;
  borrow: bigint;
}

export function storeUserPositionUpdated(src: UserPositionUpdated) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1717960712, 32);
      b_0.storeUint(src.queryId, 64);
      b_0.storeAddress(src.user);
      b_0.storeAddress(src.asset);
      b_0.storeInt(src.supply, 128);
      b_0.storeInt(src.borrow, 128);
  };
}

export function loadUserPositionUpdated(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1717960712) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  let _user = sc_0.loadAddress();
  let _asset = sc_0.loadAddress();
  let _supply = sc_0.loadIntBig(128);
  let _borrow = sc_0.loadIntBig(128);
  return { $$type: 'UserPositionUpdated' as const, queryId: _queryId, user: _user, asset: _asset, supply: _supply, borrow: _borrow };
}

function loadTupleUserPositionUpdated(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _user = source.readAddress();
  let _asset = source.readAddress();
  let _supply = source.readBigNumber();
  let _borrow = source.readBigNumber();
  return { $$type: 'UserPositionUpdated' as const, queryId: _queryId, user: _user, asset: _asset, supply: _supply, borrow: _borrow };
}

function storeTupleUserPositionUpdated(source: UserPositionUpdated) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.user);
  builder.writeAddress(source.asset);
  builder.writeNumber(source.supply);
  builder.writeNumber(source.borrow);
  return builder.build();
}

function dictValueParserUserPositionUpdated(): DictionaryValue<UserPositionUpdated> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeUserPositionUpdated(src)).endCell());
      },
      parse: (src) => {
          return loadUserPositionUpdated(src.loadRef().beginParse());
      }
  }
}

export type SupplyTon = {
  $$type: 'SupplyTon';
  amount: bigint;
}

export function storeSupplyTon(src: SupplyTon) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1717960713, 32);
      b_0.storeCoins(src.amount);
  };
}

export function loadSupplyTon(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1717960713) { throw Error('Invalid prefix'); }
  let _amount = sc_0.loadCoins();
  return { $$type: 'SupplyTon' as const, amount: _amount };
}

function loadTupleSupplyTon(source: TupleReader) {
  let _amount = source.readBigNumber();
  return { $$type: 'SupplyTon' as const, amount: _amount };
}

function storeTupleSupplyTon(source: SupplyTon) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.amount);
  return builder.build();
}

function dictValueParserSupplyTon(): DictionaryValue<SupplyTon> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeSupplyTon(src)).endCell());
      },
      parse: (src) => {
          return loadSupplyTon(src.loadRef().beginParse());
      }
  }
}

export type BorrowTon = {
  $$type: 'BorrowTon';
  amount: bigint;
}

export function storeBorrowTon(src: BorrowTon) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1717960720, 32);
      b_0.storeCoins(src.amount);
  };
}

export function loadBorrowTon(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1717960720) { throw Error('Invalid prefix'); }
  let _amount = sc_0.loadCoins();
  return { $$type: 'BorrowTon' as const, amount: _amount };
}

function loadTupleBorrowTon(source: TupleReader) {
  let _amount = source.readBigNumber();
  return { $$type: 'BorrowTon' as const, amount: _amount };
}

function storeTupleBorrowTon(source: BorrowTon) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.amount);
  return builder.build();
}

function dictValueParserBorrowTon(): DictionaryValue<BorrowTon> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeBorrowTon(src)).endCell());
      },
      parse: (src) => {
          return loadBorrowTon(src.loadRef().beginParse());
      }
  }
}

export type WithdrawTon = {
  $$type: 'WithdrawTon';
  amount: bigint;
}

export function storeWithdrawTon(src: WithdrawTon) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1717960721, 32);
      b_0.storeCoins(src.amount);
  };
}

export function loadWithdrawTon(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1717960721) { throw Error('Invalid prefix'); }
  let _amount = sc_0.loadCoins();
  return { $$type: 'WithdrawTon' as const, amount: _amount };
}

function loadTupleWithdrawTon(source: TupleReader) {
  let _amount = source.readBigNumber();
  return { $$type: 'WithdrawTon' as const, amount: _amount };
}

function storeTupleWithdrawTon(source: WithdrawTon) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.amount);
  return builder.build();
}

function dictValueParserWithdrawTon(): DictionaryValue<WithdrawTon> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeWithdrawTon(src)).endCell());
      },
      parse: (src) => {
          return loadWithdrawTon(src.loadRef().beginParse());
      }
  }
}

export type RepayTon = {
  $$type: 'RepayTon';
  amount: bigint;
}

export function storeRepayTon(src: RepayTon) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1717960722, 32);
      b_0.storeCoins(src.amount);
  };
}

export function loadRepayTon(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1717960722) { throw Error('Invalid prefix'); }
  let _amount = sc_0.loadCoins();
  return { $$type: 'RepayTon' as const, amount: _amount };
}

function loadTupleRepayTon(source: TupleReader) {
  let _amount = source.readBigNumber();
  return { $$type: 'RepayTon' as const, amount: _amount };
}

function storeTupleRepayTon(source: RepayTon) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.amount);
  return builder.build();
}

function dictValueParserRepayTon(): DictionaryValue<RepayTon> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeRepayTon(src)).endCell());
      },
      parse: (src) => {
          return loadRepayTon(src.loadRef().beginParse());
      }
  }
}

export type LiquidateTon = {
  $$type: 'LiquidateTon';
  borrower: Address;
  collateralReserve: Address;
  liquidationAmount: bigint;
}

export function storeLiquidateTon(src: LiquidateTon) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1717960723, 32);
      b_0.storeAddress(src.borrower);
      b_0.storeAddress(src.collateralReserve);
      b_0.storeCoins(src.liquidationAmount);
  };
}

export function loadLiquidateTon(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1717960723) { throw Error('Invalid prefix'); }
  let _borrower = sc_0.loadAddress();
  let _collateralReserve = sc_0.loadAddress();
  let _liquidationAmount = sc_0.loadCoins();
  return { $$type: 'LiquidateTon' as const, borrower: _borrower, collateralReserve: _collateralReserve, liquidationAmount: _liquidationAmount };
}

function loadTupleLiquidateTon(source: TupleReader) {
  let _borrower = source.readAddress();
  let _collateralReserve = source.readAddress();
  let _liquidationAmount = source.readBigNumber();
  return { $$type: 'LiquidateTon' as const, borrower: _borrower, collateralReserve: _collateralReserve, liquidationAmount: _liquidationAmount };
}

function storeTupleLiquidateTon(source: LiquidateTon) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.borrower);
  builder.writeAddress(source.collateralReserve);
  builder.writeNumber(source.liquidationAmount);
  return builder.build();
}

function dictValueParserLiquidateTon(): DictionaryValue<LiquidateTon> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeLiquidateTon(src)).endCell());
      },
      parse: (src) => {
          return loadLiquidateTon(src.loadRef().beginParse());
      }
  }
}

export type SetMockOraclePrice = {
  $$type: 'SetMockOraclePrice';
  asset: Address;
  price: bigint;
}

export function storeSetMockOraclePrice(src: SetMockOraclePrice) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1668051875, 32);
      b_0.storeAddress(src.asset);
      b_0.storeUint(src.price, 128);
  };
}

export function loadSetMockOraclePrice(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1668051875) { throw Error('Invalid prefix'); }
  let _asset = sc_0.loadAddress();
  let _price = sc_0.loadUintBig(128);
  return { $$type: 'SetMockOraclePrice' as const, asset: _asset, price: _price };
}

function loadTupleSetMockOraclePrice(source: TupleReader) {
  let _asset = source.readAddress();
  let _price = source.readBigNumber();
  return { $$type: 'SetMockOraclePrice' as const, asset: _asset, price: _price };
}

function storeTupleSetMockOraclePrice(source: SetMockOraclePrice) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.asset);
  builder.writeNumber(source.price);
  return builder.build();
}

function dictValueParserSetMockOraclePrice(): DictionaryValue<SetMockOraclePrice> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeSetMockOraclePrice(src)).endCell());
      },
      parse: (src) => {
          return loadSetMockOraclePrice(src.loadRef().beginParse());
      }
  }
}

export type RerunBounceMsg = {
  $$type: 'RerunBounceMsg';
  queryId: bigint;
  action: bigint;
}

export function storeRerunBounceMsg(src: RerunBounceMsg) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2651963349, 32);
      b_0.storeUint(src.queryId, 64);
      b_0.storeUint(src.action, 8);
  };
}

export function loadRerunBounceMsg(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2651963349) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  let _action = sc_0.loadUintBig(8);
  return { $$type: 'RerunBounceMsg' as const, queryId: _queryId, action: _action };
}

function loadTupleRerunBounceMsg(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _action = source.readBigNumber();
  return { $$type: 'RerunBounceMsg' as const, queryId: _queryId, action: _action };
}

function storeTupleRerunBounceMsg(source: RerunBounceMsg) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeNumber(source.action);
  return builder.build();
}

function dictValueParserRerunBounceMsg(): DictionaryValue<RerunBounceMsg> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeRerunBounceMsg(src)).endCell());
      },
      parse: (src) => {
          return loadRerunBounceMsg(src.loadRef().beginParse());
      }
  }
}

export type UpdatePositionBounce = {
  $$type: 'UpdatePositionBounce';
  to: Address;
  user: Address;
  msg: UpdatePosition;
}

export function storeUpdatePositionBounce(src: UpdatePositionBounce) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(883647401, 32);
      b_0.storeAddress(src.to);
      b_0.storeAddress(src.user);
      let b_1 = new Builder();
      b_1.store(storeUpdatePosition(src.msg));
      b_0.storeRef(b_1.endCell());
  };
}

export function loadUpdatePositionBounce(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 883647401) { throw Error('Invalid prefix'); }
  let _to = sc_0.loadAddress();
  let _user = sc_0.loadAddress();
  let sc_1 = sc_0.loadRef().beginParse();
  let _msg = loadUpdatePosition(sc_1);
  return { $$type: 'UpdatePositionBounce' as const, to: _to, user: _user, msg: _msg };
}

function loadTupleUpdatePositionBounce(source: TupleReader) {
  let _to = source.readAddress();
  let _user = source.readAddress();
  const _msg = loadTupleUpdatePosition(source.readTuple());
  return { $$type: 'UpdatePositionBounce' as const, to: _to, user: _user, msg: _msg };
}

function storeTupleUpdatePositionBounce(source: UpdatePositionBounce) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.to);
  builder.writeAddress(source.user);
  builder.writeTuple(storeTupleUpdatePosition(source.msg));
  return builder.build();
}

function dictValueParserUpdatePositionBounce(): DictionaryValue<UpdatePositionBounce> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeUpdatePositionBounce(src)).endCell());
      },
      parse: (src) => {
          return loadUpdatePositionBounce(src.loadRef().beginParse());
      }
  }
}

export type MintBounce = {
  $$type: 'MintBounce';
  to: Address;
  user: Address;
  msg: Mint;
}

export function storeMintBounce(src: MintBounce) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(3420402945, 32);
      b_0.storeAddress(src.to);
      b_0.storeAddress(src.user);
      let b_1 = new Builder();
      b_1.store(storeMint(src.msg));
      b_0.storeRef(b_1.endCell());
  };
}

export function loadMintBounce(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3420402945) { throw Error('Invalid prefix'); }
  let _to = sc_0.loadAddress();
  let _user = sc_0.loadAddress();
  let sc_1 = sc_0.loadRef().beginParse();
  let _msg = loadMint(sc_1);
  return { $$type: 'MintBounce' as const, to: _to, user: _user, msg: _msg };
}

function loadTupleMintBounce(source: TupleReader) {
  let _to = source.readAddress();
  let _user = source.readAddress();
  const _msg = loadTupleMint(source.readTuple());
  return { $$type: 'MintBounce' as const, to: _to, user: _user, msg: _msg };
}

function storeTupleMintBounce(source: MintBounce) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.to);
  builder.writeAddress(source.user);
  builder.writeTuple(storeTupleMint(source.msg));
  return builder.build();
}

function dictValueParserMintBounce(): DictionaryValue<MintBounce> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeMintBounce(src)).endCell());
      },
      parse: (src) => {
          return loadMintBounce(src.loadRef().beginParse());
      }
  }
}

export type TokenTransferBounce = {
  $$type: 'TokenTransferBounce';
  to: Address;
  user: Address;
  msg: TokenTransfer;
}

export function storeTokenTransferBounce(src: TokenTransferBounce) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1141904585, 32);
      b_0.storeAddress(src.to);
      b_0.storeAddress(src.user);
      let b_1 = new Builder();
      b_1.store(storeTokenTransfer(src.msg));
      b_0.storeRef(b_1.endCell());
  };
}

export function loadTokenTransferBounce(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1141904585) { throw Error('Invalid prefix'); }
  let _to = sc_0.loadAddress();
  let _user = sc_0.loadAddress();
  let sc_1 = sc_0.loadRef().beginParse();
  let _msg = loadTokenTransfer(sc_1);
  return { $$type: 'TokenTransferBounce' as const, to: _to, user: _user, msg: _msg };
}

function loadTupleTokenTransferBounce(source: TupleReader) {
  let _to = source.readAddress();
  let _user = source.readAddress();
  const _msg = loadTupleTokenTransfer(source.readTuple());
  return { $$type: 'TokenTransferBounce' as const, to: _to, user: _user, msg: _msg };
}

function storeTupleTokenTransferBounce(source: TokenTransferBounce) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.to);
  builder.writeAddress(source.user);
  builder.writeTuple(storeTupleTokenTransfer(source.msg));
  return builder.build();
}

function dictValueParserTokenTransferBounce(): DictionaryValue<TokenTransferBounce> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeTokenTransferBounce(src)).endCell());
      },
      parse: (src) => {
          return loadTokenTransferBounce(src.loadRef().beginParse());
      }
  }
}

export type TokenBurnBounce = {
  $$type: 'TokenBurnBounce';
  to: Address;
  user: Address;
  msg: TokenBurn;
}

export function storeTokenBurnBounce(src: TokenBurnBounce) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(3027259916, 32);
      b_0.storeAddress(src.to);
      b_0.storeAddress(src.user);
      let b_1 = new Builder();
      b_1.store(storeTokenBurn(src.msg));
      b_0.storeRef(b_1.endCell());
  };
}

export function loadTokenBurnBounce(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3027259916) { throw Error('Invalid prefix'); }
  let _to = sc_0.loadAddress();
  let _user = sc_0.loadAddress();
  let sc_1 = sc_0.loadRef().beginParse();
  let _msg = loadTokenBurn(sc_1);
  return { $$type: 'TokenBurnBounce' as const, to: _to, user: _user, msg: _msg };
}

function loadTupleTokenBurnBounce(source: TupleReader) {
  let _to = source.readAddress();
  let _user = source.readAddress();
  const _msg = loadTupleTokenBurn(source.readTuple());
  return { $$type: 'TokenBurnBounce' as const, to: _to, user: _user, msg: _msg };
}

function storeTupleTokenBurnBounce(source: TokenBurnBounce) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.to);
  builder.writeAddress(source.user);
  builder.writeTuple(storeTupleTokenBurn(source.msg));
  return builder.build();
}

function dictValueParserTokenBurnBounce(): DictionaryValue<TokenBurnBounce> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeTokenBurnBounce(src)).endCell());
      },
      parse: (src) => {
          return loadTokenBurnBounce(src.loadRef().beginParse());
      }
  }
}

export type UpdateReserveConfiguration = {
  $$type: 'UpdateReserveConfiguration';
  reserve: Address;
  reserveConfiguration: ReserveConfiguration;
}

export function storeUpdateReserveConfiguration(src: UpdateReserveConfiguration) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2968692329, 32);
      b_0.storeAddress(src.reserve);
      let b_1 = new Builder();
      b_1.store(storeReserveConfiguration(src.reserveConfiguration));
      b_0.storeRef(b_1.endCell());
  };
}

export function loadUpdateReserveConfiguration(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2968692329) { throw Error('Invalid prefix'); }
  let _reserve = sc_0.loadAddress();
  let sc_1 = sc_0.loadRef().beginParse();
  let _reserveConfiguration = loadReserveConfiguration(sc_1);
  return { $$type: 'UpdateReserveConfiguration' as const, reserve: _reserve, reserveConfiguration: _reserveConfiguration };
}

function loadTupleUpdateReserveConfiguration(source: TupleReader) {
  let _reserve = source.readAddress();
  const _reserveConfiguration = loadTupleReserveConfiguration(source.readTuple());
  return { $$type: 'UpdateReserveConfiguration' as const, reserve: _reserve, reserveConfiguration: _reserveConfiguration };
}

function storeTupleUpdateReserveConfiguration(source: UpdateReserveConfiguration) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.reserve);
  builder.writeTuple(storeTupleReserveConfiguration(source.reserveConfiguration));
  return builder.build();
}

function dictValueParserUpdateReserveConfiguration(): DictionaryValue<UpdateReserveConfiguration> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeUpdateReserveConfiguration(src)).endCell());
      },
      parse: (src) => {
          return loadUpdateReserveConfiguration(src.loadRef().beginParse());
      }
  }
}

export type SyncPrices = {
  $$type: 'SyncPrices';
  prices: Dictionary<Address, bigint>;
  responseDestination: Address;
}

export function storeSyncPrices(src: SyncPrices) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(4166461416, 32);
      b_0.storeDict(src.prices, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257));
      b_0.storeAddress(src.responseDestination);
  };
}

export function loadSyncPrices(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 4166461416) { throw Error('Invalid prefix'); }
  let _prices = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), sc_0);
  let _responseDestination = sc_0.loadAddress();
  return { $$type: 'SyncPrices' as const, prices: _prices, responseDestination: _responseDestination };
}

function loadTupleSyncPrices(source: TupleReader) {
  let _prices = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
  let _responseDestination = source.readAddress();
  return { $$type: 'SyncPrices' as const, prices: _prices, responseDestination: _responseDestination };
}

function storeTupleSyncPrices(source: SyncPrices) {
  let builder = new TupleBuilder();
  builder.writeCell(source.prices.size > 0 ? beginCell().storeDictDirect(source.prices, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257)).endCell() : null);
  builder.writeAddress(source.responseDestination);
  return builder.build();
}

function dictValueParserSyncPrices(): DictionaryValue<SyncPrices> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeSyncPrices(src)).endCell());
      },
      parse: (src) => {
          return loadSyncPrices(src.loadRef().beginParse());
      }
  }
}

export type UpdateOracleProvider = {
  $$type: 'UpdateOracleProvider';
  oracle: Address;
}

export function storeUpdateOracleProvider(src: UpdateOracleProvider) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2546976500, 32);
      b_0.storeAddress(src.oracle);
  };
}

export function loadUpdateOracleProvider(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2546976500) { throw Error('Invalid prefix'); }
  let _oracle = sc_0.loadAddress();
  return { $$type: 'UpdateOracleProvider' as const, oracle: _oracle };
}

function loadTupleUpdateOracleProvider(source: TupleReader) {
  let _oracle = source.readAddress();
  return { $$type: 'UpdateOracleProvider' as const, oracle: _oracle };
}

function storeTupleUpdateOracleProvider(source: UpdateOracleProvider) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.oracle);
  return builder.build();
}

function dictValueParserUpdateOracleProvider(): DictionaryValue<UpdateOracleProvider> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeUpdateOracleProvider(src)).endCell());
      },
      parse: (src) => {
          return loadUpdateOracleProvider(src.loadRef().beginParse());
      }
  }
}

export type TokenTransfer = {
  $$type: 'TokenTransfer';
  queryId: bigint;
  amount: bigint;
  destination: Address;
  response_destination: Address;
  custom_payload: Cell | null;
  forward_ton_amount: bigint;
  forward_payload: Cell;
}

export function storeTokenTransfer(src: TokenTransfer) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(260734629, 32);
      b_0.storeUint(src.queryId, 64);
      b_0.storeCoins(src.amount);
      b_0.storeAddress(src.destination);
      b_0.storeAddress(src.response_destination);
      if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
      b_0.storeCoins(src.forward_ton_amount);
      b_0.storeBuilder(src.forward_payload.asBuilder());
  };
}

export function loadTokenTransfer(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _destination = sc_0.loadAddress();
  let _response_destination = sc_0.loadAddress();
  let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _forward_ton_amount = sc_0.loadCoins();
  let _forward_payload = sc_0.asCell();
  return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransfer(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _destination = source.readAddress();
  let _response_destination = source.readAddress();
  let _custom_payload = source.readCellOpt();
  let _forward_ton_amount = source.readBigNumber();
  let _forward_payload = source.readCell();
  return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransfer(source: TokenTransfer) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.destination);
  builder.writeAddress(source.response_destination);
  builder.writeCell(source.custom_payload);
  builder.writeNumber(source.forward_ton_amount);
  builder.writeSlice(source.forward_payload);
  return builder.build();
}

function dictValueParserTokenTransfer(): DictionaryValue<TokenTransfer> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeTokenTransfer(src)).endCell());
      },
      parse: (src) => {
          return loadTokenTransfer(src.loadRef().beginParse());
      }
  }
}

export type TokenTransferInternal = {
  $$type: 'TokenTransferInternal';
  queryId: bigint;
  amount: bigint;
  from: Address;
  response_destination: Address;
  forward_ton_amount: bigint;
  forward_payload: Cell;
}

export function storeTokenTransferInternal(src: TokenTransferInternal) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(395134233, 32);
      b_0.storeUint(src.queryId, 64);
      b_0.storeCoins(src.amount);
      b_0.storeAddress(src.from);
      b_0.storeAddress(src.response_destination);
      b_0.storeCoins(src.forward_ton_amount);
      b_0.storeBuilder(src.forward_payload.asBuilder());
  };
}

export function loadTokenTransferInternal(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 395134233) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _from = sc_0.loadAddress();
  let _response_destination = sc_0.loadAddress();
  let _forward_ton_amount = sc_0.loadCoins();
  let _forward_payload = sc_0.asCell();
  return { $$type: 'TokenTransferInternal' as const, queryId: _queryId, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransferInternal(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _from = source.readAddress();
  let _response_destination = source.readAddress();
  let _forward_ton_amount = source.readBigNumber();
  let _forward_payload = source.readCell();
  return { $$type: 'TokenTransferInternal' as const, queryId: _queryId, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransferInternal(source: TokenTransferInternal) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.from);
  builder.writeAddress(source.response_destination);
  builder.writeNumber(source.forward_ton_amount);
  builder.writeSlice(source.forward_payload);
  return builder.build();
}

function dictValueParserTokenTransferInternal(): DictionaryValue<TokenTransferInternal> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeTokenTransferInternal(src)).endCell());
      },
      parse: (src) => {
          return loadTokenTransferInternal(src.loadRef().beginParse());
      }
  }
}

export type TokenNotification = {
  $$type: 'TokenNotification';
  queryId: bigint;
  amount: bigint;
  from: Address;
  forward_payload: Cell;
}

export function storeTokenNotification(src: TokenNotification) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1935855772, 32);
      b_0.storeUint(src.queryId, 64);
      b_0.storeCoins(src.amount);
      b_0.storeAddress(src.from);
      b_0.storeBuilder(src.forward_payload.asBuilder());
  };
}

export function loadTokenNotification(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _from = sc_0.loadAddress();
  let _forward_payload = sc_0.asCell();
  return { $$type: 'TokenNotification' as const, queryId: _queryId, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function loadTupleTokenNotification(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _from = source.readAddress();
  let _forward_payload = source.readCell();
  return { $$type: 'TokenNotification' as const, queryId: _queryId, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function storeTupleTokenNotification(source: TokenNotification) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.from);
  builder.writeSlice(source.forward_payload);
  return builder.build();
}

function dictValueParserTokenNotification(): DictionaryValue<TokenNotification> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeTokenNotification(src)).endCell());
      },
      parse: (src) => {
          return loadTokenNotification(src.loadRef().beginParse());
      }
  }
}

export type TokenBurn = {
  $$type: 'TokenBurn';
  queryId: bigint;
  amount: bigint;
  owner: Address;
  response_destination: Address;
}

export function storeTokenBurn(src: TokenBurn) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1499400124, 32);
      b_0.storeUint(src.queryId, 64);
      b_0.storeCoins(src.amount);
      b_0.storeAddress(src.owner);
      b_0.storeAddress(src.response_destination);
  };
}

export function loadTokenBurn(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _owner = sc_0.loadAddress();
  let _response_destination = sc_0.loadAddress();
  return { $$type: 'TokenBurn' as const, queryId: _queryId, amount: _amount, owner: _owner, response_destination: _response_destination };
}

function loadTupleTokenBurn(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _owner = source.readAddress();
  let _response_destination = source.readAddress();
  return { $$type: 'TokenBurn' as const, queryId: _queryId, amount: _amount, owner: _owner, response_destination: _response_destination };
}

function storeTupleTokenBurn(source: TokenBurn) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.owner);
  builder.writeAddress(source.response_destination);
  return builder.build();
}

function dictValueParserTokenBurn(): DictionaryValue<TokenBurn> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeTokenBurn(src)).endCell());
      },
      parse: (src) => {
          return loadTokenBurn(src.loadRef().beginParse());
      }
  }
}

export type TokenBurnNotification = {
  $$type: 'TokenBurnNotification';
  queryId: bigint;
  amount: bigint;
  owner: Address;
  response_destination: Address | null;
}

export function storeTokenBurnNotification(src: TokenBurnNotification) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2078119902, 32);
      b_0.storeUint(src.queryId, 64);
      b_0.storeCoins(src.amount);
      b_0.storeAddress(src.owner);
      b_0.storeAddress(src.response_destination);
  };
}

export function loadTokenBurnNotification(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2078119902) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _owner = sc_0.loadAddress();
  let _response_destination = sc_0.loadMaybeAddress();
  return { $$type: 'TokenBurnNotification' as const, queryId: _queryId, amount: _amount, owner: _owner, response_destination: _response_destination };
}

function loadTupleTokenBurnNotification(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _owner = source.readAddress();
  let _response_destination = source.readAddressOpt();
  return { $$type: 'TokenBurnNotification' as const, queryId: _queryId, amount: _amount, owner: _owner, response_destination: _response_destination };
}

function storeTupleTokenBurnNotification(source: TokenBurnNotification) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.owner);
  builder.writeAddress(source.response_destination);
  return builder.build();
}

function dictValueParserTokenBurnNotification(): DictionaryValue<TokenBurnNotification> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeTokenBurnNotification(src)).endCell());
      },
      parse: (src) => {
          return loadTokenBurnNotification(src.loadRef().beginParse());
      }
  }
}

export type TokenExcesses = {
  $$type: 'TokenExcesses';
  queryId: bigint;
}

export function storeTokenExcesses(src: TokenExcesses) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(3576854235, 32);
      b_0.storeUint(src.queryId, 64);
  };
}

export function loadTokenExcesses(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: 'TokenExcesses' as const, queryId: _queryId };
}

function loadTupleTokenExcesses(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: 'TokenExcesses' as const, queryId: _queryId };
}

function storeTupleTokenExcesses(source: TokenExcesses) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserTokenExcesses(): DictionaryValue<TokenExcesses> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeTokenExcesses(src)).endCell());
      },
      parse: (src) => {
          return loadTokenExcesses(src.loadRef().beginParse());
      }
  }
}

export type TokenUpdateContent = {
  $$type: 'TokenUpdateContent';
  content: Cell;
}

export function storeTokenUpdateContent(src: TokenUpdateContent) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2937889386, 32);
      b_0.storeRef(src.content);
  };
}

export function loadTokenUpdateContent(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2937889386) { throw Error('Invalid prefix'); }
  let _content = sc_0.loadRef();
  return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function loadTupleTokenUpdateContent(source: TupleReader) {
  let _content = source.readCell();
  return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function storeTupleTokenUpdateContent(source: TokenUpdateContent) {
  let builder = new TupleBuilder();
  builder.writeCell(source.content);
  return builder.build();
}

function dictValueParserTokenUpdateContent(): DictionaryValue<TokenUpdateContent> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeTokenUpdateContent(src)).endCell());
      },
      parse: (src) => {
          return loadTokenUpdateContent(src.loadRef().beginParse());
      }
  }
}

export type TokenTransferByPool = {
  $$type: 'TokenTransferByPool';
  payload: Cell;
}

export function storeTokenTransferByPool(src: TokenTransferByPool) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(3656918456, 32);
      b_0.storeBuilder(src.payload.asBuilder());
  };
}

export function loadTokenTransferByPool(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3656918456) { throw Error('Invalid prefix'); }
  let _payload = sc_0.asCell();
  return { $$type: 'TokenTransferByPool' as const, payload: _payload };
}

function loadTupleTokenTransferByPool(source: TupleReader) {
  let _payload = source.readCell();
  return { $$type: 'TokenTransferByPool' as const, payload: _payload };
}

function storeTupleTokenTransferByPool(source: TokenTransferByPool) {
  let builder = new TupleBuilder();
  builder.writeSlice(source.payload);
  return builder.build();
}

function dictValueParserTokenTransferByPool(): DictionaryValue<TokenTransferByPool> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeTokenTransferByPool(src)).endCell());
      },
      parse: (src) => {
          return loadTokenTransferByPool(src.loadRef().beginParse());
      }
  }
}

export type CheckAndTransferAToken = {
  $$type: 'CheckAndTransferAToken';
  asset: Address;
  from: Address;
  amount: bigint;
  payload: Cell;
}

export function storeCheckAndTransferAToken(src: CheckAndTransferAToken) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2362157153, 32);
      b_0.storeAddress(src.asset);
      b_0.storeAddress(src.from);
      b_0.storeCoins(src.amount);
      b_0.storeBuilder(src.payload.asBuilder());
  };
}

export function loadCheckAndTransferAToken(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2362157153) { throw Error('Invalid prefix'); }
  let _asset = sc_0.loadAddress();
  let _from = sc_0.loadAddress();
  let _amount = sc_0.loadCoins();
  let _payload = sc_0.asCell();
  return { $$type: 'CheckAndTransferAToken' as const, asset: _asset, from: _from, amount: _amount, payload: _payload };
}

function loadTupleCheckAndTransferAToken(source: TupleReader) {
  let _asset = source.readAddress();
  let _from = source.readAddress();
  let _amount = source.readBigNumber();
  let _payload = source.readCell();
  return { $$type: 'CheckAndTransferAToken' as const, asset: _asset, from: _from, amount: _amount, payload: _payload };
}

function storeTupleCheckAndTransferAToken(source: CheckAndTransferAToken) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.asset);
  builder.writeAddress(source.from);
  builder.writeNumber(source.amount);
  builder.writeSlice(source.payload);
  return builder.build();
}

function dictValueParserCheckAndTransferAToken(): DictionaryValue<CheckAndTransferAToken> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeCheckAndTransferAToken(src)).endCell());
      },
      parse: (src) => {
          return loadCheckAndTransferAToken(src.loadRef().beginParse());
      }
  }
}

export type Mint = {
  $$type: 'Mint';
  queryId: bigint;
  amount: bigint;
  receiver: Address;
}

export function storeMint(src: Mint) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(614915518, 32);
      b_0.storeUint(src.queryId, 64);
      b_0.storeInt(src.amount, 257);
      b_0.storeAddress(src.receiver);
  };
}

export function loadMint(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 614915518) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  let _amount = sc_0.loadIntBig(257);
  let _receiver = sc_0.loadAddress();
  return { $$type: 'Mint' as const, queryId: _queryId, amount: _amount, receiver: _receiver };
}

function loadTupleMint(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _receiver = source.readAddress();
  return { $$type: 'Mint' as const, queryId: _queryId, amount: _amount, receiver: _receiver };
}

function storeTupleMint(source: Mint) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.receiver);
  return builder.build();
}

function dictValueParserMint(): DictionaryValue<Mint> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeMint(src)).endCell());
      },
      parse: (src) => {
          return loadMint(src.loadRef().beginParse());
      }
  }
}

export type JettonWalletData = {
  $$type: 'JettonWalletData';
  balance: bigint;
  owner: Address;
  master: Address;
  walletCode: Cell;
}

export function storeJettonWalletData(src: JettonWalletData) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeInt(src.balance, 257);
      b_0.storeAddress(src.owner);
      b_0.storeAddress(src.master);
      b_0.storeRef(src.walletCode);
  };
}

export function loadJettonWalletData(slice: Slice) {
  let sc_0 = slice;
  let _balance = sc_0.loadIntBig(257);
  let _owner = sc_0.loadAddress();
  let _master = sc_0.loadAddress();
  let _walletCode = sc_0.loadRef();
  return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, walletCode: _walletCode };
}

function loadTupleJettonWalletData(source: TupleReader) {
  let _balance = source.readBigNumber();
  let _owner = source.readAddress();
  let _master = source.readAddress();
  let _walletCode = source.readCell();
  return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, walletCode: _walletCode };
}

function storeTupleJettonWalletData(source: JettonWalletData) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.balance);
  builder.writeAddress(source.owner);
  builder.writeAddress(source.master);
  builder.writeCell(source.walletCode);
  return builder.build();
}

function dictValueParserJettonWalletData(): DictionaryValue<JettonWalletData> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeJettonWalletData(src)).endCell());
      },
      parse: (src) => {
          return loadJettonWalletData(src.loadRef().beginParse());
      }
  }
}

export type JettonData = {
  $$type: 'JettonData';
  totalSupply: bigint;
  mintable: boolean;
  owner: Address;
  content: Cell;
  walletCode: Cell;
}

export function storeJettonData(src: JettonData) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeInt(src.totalSupply, 257);
      b_0.storeBit(src.mintable);
      b_0.storeAddress(src.owner);
      b_0.storeRef(src.content);
      b_0.storeRef(src.walletCode);
  };
}

export function loadJettonData(slice: Slice) {
  let sc_0 = slice;
  let _totalSupply = sc_0.loadIntBig(257);
  let _mintable = sc_0.loadBit();
  let _owner = sc_0.loadAddress();
  let _content = sc_0.loadRef();
  let _walletCode = sc_0.loadRef();
  return { $$type: 'JettonData' as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode };
}

function loadTupleJettonData(source: TupleReader) {
  let _totalSupply = source.readBigNumber();
  let _mintable = source.readBoolean();
  let _owner = source.readAddress();
  let _content = source.readCell();
  let _walletCode = source.readCell();
  return { $$type: 'JettonData' as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode };
}

function storeTupleJettonData(source: JettonData) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.totalSupply);
  builder.writeBoolean(source.mintable);
  builder.writeAddress(source.owner);
  builder.writeCell(source.content);
  builder.writeCell(source.walletCode);
  return builder.build();
}

function dictValueParserJettonData(): DictionaryValue<JettonData> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeJettonData(src)).endCell());
      },
      parse: (src) => {
          return loadJettonData(src.loadRef().beginParse());
      }
  }
}

export type CalcInterestRatesLocalVars = {
  $$type: 'CalcInterestRatesLocalVars';
  availableLiquidity: bigint;
  totalDebt: bigint;
  currentBorrowRate: bigint;
  currentLiquidityRate: bigint;
  borrowUsageRatio: bigint;
  supplyUsageRatio: bigint;
  availableLiquidityPlusDebt: bigint;
}

export function storeCalcInterestRatesLocalVars(src: CalcInterestRatesLocalVars) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeInt(src.availableLiquidity, 257);
      b_0.storeInt(src.totalDebt, 257);
      b_0.storeInt(src.currentBorrowRate, 257);
      let b_1 = new Builder();
      b_1.storeInt(src.currentLiquidityRate, 257);
      b_1.storeInt(src.borrowUsageRatio, 257);
      b_1.storeInt(src.supplyUsageRatio, 257);
      let b_2 = new Builder();
      b_2.storeInt(src.availableLiquidityPlusDebt, 257);
      b_1.storeRef(b_2.endCell());
      b_0.storeRef(b_1.endCell());
  };
}

export function loadCalcInterestRatesLocalVars(slice: Slice) {
  let sc_0 = slice;
  let _availableLiquidity = sc_0.loadIntBig(257);
  let _totalDebt = sc_0.loadIntBig(257);
  let _currentBorrowRate = sc_0.loadIntBig(257);
  let sc_1 = sc_0.loadRef().beginParse();
  let _currentLiquidityRate = sc_1.loadIntBig(257);
  let _borrowUsageRatio = sc_1.loadIntBig(257);
  let _supplyUsageRatio = sc_1.loadIntBig(257);
  let sc_2 = sc_1.loadRef().beginParse();
  let _availableLiquidityPlusDebt = sc_2.loadIntBig(257);
  return { $$type: 'CalcInterestRatesLocalVars' as const, availableLiquidity: _availableLiquidity, totalDebt: _totalDebt, currentBorrowRate: _currentBorrowRate, currentLiquidityRate: _currentLiquidityRate, borrowUsageRatio: _borrowUsageRatio, supplyUsageRatio: _supplyUsageRatio, availableLiquidityPlusDebt: _availableLiquidityPlusDebt };
}

function loadTupleCalcInterestRatesLocalVars(source: TupleReader) {
  let _availableLiquidity = source.readBigNumber();
  let _totalDebt = source.readBigNumber();
  let _currentBorrowRate = source.readBigNumber();
  let _currentLiquidityRate = source.readBigNumber();
  let _borrowUsageRatio = source.readBigNumber();
  let _supplyUsageRatio = source.readBigNumber();
  let _availableLiquidityPlusDebt = source.readBigNumber();
  return { $$type: 'CalcInterestRatesLocalVars' as const, availableLiquidity: _availableLiquidity, totalDebt: _totalDebt, currentBorrowRate: _currentBorrowRate, currentLiquidityRate: _currentLiquidityRate, borrowUsageRatio: _borrowUsageRatio, supplyUsageRatio: _supplyUsageRatio, availableLiquidityPlusDebt: _availableLiquidityPlusDebt };
}

function storeTupleCalcInterestRatesLocalVars(source: CalcInterestRatesLocalVars) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.availableLiquidity);
  builder.writeNumber(source.totalDebt);
  builder.writeNumber(source.currentBorrowRate);
  builder.writeNumber(source.currentLiquidityRate);
  builder.writeNumber(source.borrowUsageRatio);
  builder.writeNumber(source.supplyUsageRatio);
  builder.writeNumber(source.availableLiquidityPlusDebt);
  return builder.build();
}

function dictValueParserCalcInterestRatesLocalVars(): DictionaryValue<CalcInterestRatesLocalVars> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeCalcInterestRatesLocalVars(src)).endCell());
      },
      parse: (src) => {
          return loadCalcInterestRatesLocalVars(src.loadRef().beginParse());
      }
  }
}

type Pool_init_args = {
  $$type: 'Pool_init_args';
}

function initPool_init_args(src: Pool_init_args) {
  return (builder: Builder) => {
      let b_0 = builder;
  };
}

async function Pool_init() {
  const __code = Cell.fromBase64('te6ccgICAS8AAQAASB0AAAEU/wD0pBP0vPLICwABAgFiAAIAAwICyAAEAAUCASAArgCvA3ncB0NMDAXGwowH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIVFBTA28E+GEC+GLbPFUZ2zzy4IKASYAFAAVAgOlwAAGAAcCASAACAAJAgEgAA4ADwIBIAAKAAsCASAADAANAQEgANQBASAA/wEBIADRAQEgAQICASAAEAARAgEgABIAEwEBIAC6AQEgAN4BASABDwEBIAC9BPbtou37AZIwf+BwIddJwh+VMCDXCx/eIIIQZmYAAbqPMjDbPFcXERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zx/4CCCEGZmAAK6jpUw0x8BghBmZgACuvLggdMPATHbPH/gIIIQc2LQnLoAFgAXABgAGQDwyPhDAcx/AcoAVZBQqSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhfKABWBAQHPABP0AIEBAc8A9AAByPQAEvQAUAMgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4vQAyQHMye1UAvbTHwGCEGZmAAG68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUAdDbPA/U1FkC1DDQ03/Tf9N/03/Tf1VANREWERcRFhEUERURFBETERQRExESERMREhERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoBKgAaBKQJESAJCBEfCAcRHgcGER0GBREcBQQRGwQDERoDAhEZAgERGAERF9s82zwJESAJCBEfCAcRHgcGER0GBREcBQQRGwQDERoDAhEZAgERGAERF9s8AKcAqAAnACgEFFWQ2zzbPFUJ2zwApwCoABsAHAS0jrsw0x8BghBzYtCcuvLggdM/+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIVBMDECNsFNs8f+AgghCMy6hhuuMCIIIQZmYACLrjAiCCEGZmAAO6ACEAIgAjACQAEBCJEHgQVlUDA/CBJW9TF7ny9CeBAQEiWfQMb6GSMG3fIG7y0IAmgQELIln0C2+hkjBt3yBukjBtjofQ2zxsGm8K4iBu8tCAbyoRExEVERMREhEUERIREREVERER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SxA6SYAHEREHBhEQBhBfBBERBAMREAMQLwEREQEREG8PQBMBcNs8ERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERASICASABCgELAgEgARkBGgIRrLbtnm2eNlDAASYBDAIBSAENAQ4AAiECD6Z9tnm2eNlDASYBDwIPpt+2ebZ42UMBJgEQAExUeYdUeYdUeYcpCRETCQgREggHEREHBhEQBhBfEE4QPUy68N5soQESbXCTUwe5iugwAREE/iiBAQEiWfQMb6GSMG3fIG7y0IAngQELIln0C2+hkjBt3yBukjBtjofQ2zxsGm8K4iBu8tCAbypWEIEBCyxZ9AtvoZIwbd8gbpIwbY6H0Ns8bB9vD+IgbvLQgG8vgQELVhlWGVYZVhlWGVYZVhlWGVYZVhnbPFYaVhpWGlYaVhoBHQEqASABEgL8VhpWGlYaVhpWGts8ERoRGxEaERkRGxEZERgRGxEYERcRGxEXERYRGxEWERURGxEVERQRGxEUERMRGxETERIRGxESERERGxERERARGxEQDxEbDw4RGw4NERsNDBEbDAsRGwsKERsKCREbCQgRGwgHERsHBhEbBgURGwUEERsEASIBEwE6AxEbAwIRGwLbPBA0EiBulTBZ9FkwlEEz9BPiAaQBFAE2yBEbERoRGREYERcRFhEVERQRExESEREREFXgARUCzAoRGwoJERoJCBEZCAcRGAcGERcGBREWBQQRFQQDERQDAhETAgEREgEREds8yA8QfhBtEFwQSxA6ECkIERIIBxERBwYREAYFBBERBAMREAMCARERAREQ2zwByMt/E8t/yVjMyQHMyQEWARcARlCay38Xy38Vy38Ty38B+gIB+gIB+gIB+gIByMsfEss/yQHMAfZQ/iDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAMINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAog10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYYyw8Wyw8Uyw8Syw/LD8oAygDKAAH6AshY+gIBGABKUAMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbLB8kBzAIZrOW3ke2eKpTtnjZTQAEmARsCia1iAJBrpMCAhd15cEQQa4WFEECCf915aETBhN15cEQAkGukwICF3XlwRBBrhYUQQIJ/3XloRMGE3XlwRG2eKoztnjZQwAEmAScBtmwhcFRwAFMEgQEL9INvpSCREpUxbTJtAeKQiuhbNSLDAJRREqkEkjFw4iLDAJRTEqkEkXDiJcMAjhgCgScQqQQlAYIwZ2XHk/oQB52qGqgBqQSTMoT/4l4xECMBHATgIG6SMG2d0PoA+gDSAFUgbBNvA+IgbvLQgG8jLoEBCyVZ9AtvoZIwbd8gbpIwbY6H0Ns8bBpvCuIgbvLQgG8qVheBAQsvWfQLb6GSMG3fIG6SMG2Oh9DbPGwfbw/iIG7y0IBvLzxfCTMzegHbPC/CAAEdASoBHgEfAFDTf9N/03/Tf/oA+gD6APoA1AHQ0x/TPzAQKhApECgQJxAmECUQJBAjABggwv/yhXEBkiGo5DEC9o7TVHy6VHy6VHy6LNs8AREQAaiCMGdlx5P6EAedqhqpBCOoL6kEERVWFaANjhwRE1YUoFYUWKgBERIBoAEREwEREqgfoA8REA8Ok1tXEuIJEREJEJuVED89XwPiKsIAkl8M4w2BAQsnAln0dG+lIJQC1DBYlTFtMm0B4gEgASEAaBdfB/gjIbqRW+D4IwGhqIIwZ2XHk/oQB52qGgGCCeEzgKkEoAGogjBnZceT+hAHnaoaqQQBNivbPBKogjBnZceT+hAHnaoaqQRYqAGpBBKgAQEiARwVXwUzM/gjIrqSbCHgWQEjAvD4IwGhIMAAjmwgpSHCApMhpv6RcOJTM6iCMGdlx5P6EAedqhqpBIIjiIKRXEAAqQRTBKiCMGdlx5P6EAedqhqpBIIJ4TOAqQRTQ6hYqKsAUkSoWKgBqHapBAOCMGdlx5P6EAedqhoDqIIJ4TOAqQQSoAGgAaDjDQEBJAElABpbgjBnZceT+hAHnaoaAB6ogjBnZceT+hAHnaoaqQQCNO1E0NQB+GPSAAHjAjD4KNcLCoMJuvLgids8ASgBKQLiJYEBCyNZ9AtvoZIwbd8gbpIwbY6H0Ns8bB9vD+IgbvLQgG8vEM5fDvhD+ChAQ9s8cFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBKgErAOz6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIAgQEB1wD0BIEBAdcA9ATUAdD0BPQEINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAfQEMBBKEEkQSBBHEEYQRWwaAB5wbSFtbW1tbfhCCHAIVVEB7vpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMP0w/TD9MP0w/SANIA0gD6ANQB0PoAASwBZATQ9AQwbQGCAMM7AYAQ9A9vofLghwGCAMM7IgKAEPQXyAHI9ADJAcxwAcoAVTAF2zzJAS0AdvpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0wcwED8QPhA9EDwQOxA6EDkQOBA3EDYQNRA0AcBQQyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyFgBLgBCINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyQHM');
  const __system = Cell.fromBase64('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gjBnZceT+hAHnaoaqQQBETqogScQqQQBETwBtggPIG7y0IBvI1sBESuogjBnZceT+hAHnaoaqQR6Jts8egERKts8Vh9WEKhWKqhTYaipBFY5qIEnEKkEUwK8lzZbVycRJgzjDXArwwABdQF1ALUAtgA8MD9RRKhQDqhWHQERKKgBEScBqQRWNQGBJxCoAakEBP6OFjAiVjYBgScQqAGpBFIwoSuogScQqQTeIvgoIccFjyYwUzChcHDIyQQREwQQJBAjbW3bPHBwyMknBBESVSAQJBAjbW3bPOMOLVYWAYIwZ2XHk/oQB52qGqgBqQQRHlYeoSARExEmERMREhElERIREREkEREREBEjERAPESIPAboBugC3ALoC0lNBoQsRNQsKETQKCREzCQgRMggHETEHBhEwBgURLwUEES4EAxEtAwIRLAIhERIB2zxVGR9WLwERK9s8CRExCQgRMAgHES8HBhEuBgURLQUEESwEAxErAwIRKgIBESkBESgIBkTUGRcVEwC4ALgCWG1wyMnQLVFQRDQPpBA2RUaCCvrwgH9QdnEREshVYNs8yUEwHBAkECNtbds8ALkBugDIghAPin6lUAjLHxbLP1AE+gJYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFiFus5V/AcoAzJRwMsoA4gH6AgHPFgT6DhEhDg0RIA0cCxEeCwoRHQoJERwJCAcRGgcGERkGBREYBQQRFwQDERYDAhEVAgERFAERJlYlViVWQFYeVixWJ3DbPBEYFKADgQELERjIVZDbPMkCERsCH1YkASBulTBZ9FkwlEEz9BPiAREgAREfViiCEA7msoARJds8qgEAyAFtAbUAuwT+AREiAaALERwLChEbCgkRGgkIERkIBxEYBwYRHQYFERYFBBEVBAMRFAMCERMCAREmAds8cBEZoyGrABDNELwQqxCaEIkQeBBnEFYQRRA0ViYEAxEiAxEbWds8JIEBC1YaWfQLb6GSMG3fIG6SMG2Oh9DbPGwabwriIG7y0IBvKgDlAM0BdAC8AvgpUflR+VH5UflR+VH5UflR+VH5Dw4RKA4NESENDBErDAsRIwsKETMKCREwCQgRLQgHESkHBhEuBgURJwUEESAEAxElAwIRJAIBETcBETLbPBER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GFYYVhhWGFYiAXQBggF3AV0BcNs8ERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERAXkApAkRGgkIERkIBxEYBwYRFwYFERYFBBEVBAMRFAMCERMCARESARERbwoQfhBtEFwQSxA6SYAHEREHBhEQBhBfBBERBAMREAMQLwEREQEREG8PQBMCASABYAFwAgEgAWEBYwIRrLbtnm2eNlDAAX4BYgACIQIBSAFkAWYCD6Z9tnm2eNlDAX4BZQBMVHmHVHmHVHmHKQkREwkIERIIBxERBwYREAYQXxBOED1MuvDebKECD6bftnm2eNlDAX4BZwESbXCTUwe5iugwAWgE/iiBAQEiWfQMb6GSMG3fIG7y0IAngQELIln0C2+hkjBt3yBukjBtjofQ2zxsGm8K4iBu8tCAbypWEIEBCyxZ9AtvoZIwbd8gbpIwbY6H0Ns8bB9vD+IgbvLQgG8vgQELVhlWGVYZVhlWGVYZVhlWGVYZVhnbPFYaVhpWGlYaVhoBdAGCAXcBaQL8VhpWGlYaVhpWGts8ERoRGxEaERkRGxEZERgRGxEYERcRGxEXERYRGxEWERURGxEVERQRGxEUERMRGxETERIRGxESERERGxERERARGxEQDxEbDw4RGw4NERsNDBEbDAsRGwsKERsKCREbCQgRGwgHERsHBhEbBgURGwUEERsEAXkBagE6AxEbAwIRGwLbPBA0EiBulTBZ9FkwlEEz9BPiAaQBawE2yBEbERoRGREYERcRFhEVERQRExESEREREFXgAWwCzAoRGwoJERoJCBEZCAcRGAcGERcGBREWBQQRFQQDERQDAhETAgEREgEREds8yA8QfhBtEFwQSxA6ECkIERIIBxERBwYREAYFBBERBAMREAMCARERAREQ2zwByMt/E8t/yVjMyQHMyQFtAW4ARlCay38Xy38Vy38Ty38B+gIB+gIB+gIB+gIByMsfEss/yQHMAfZQ/iDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAMINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAog10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYYyw8Wyw8Uyw8Syw/LD8oAygDKAAH6AshY+gIBbwBKUAMg10mBAQu68uCI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');
  let builder = beginCell();
  builder.storeRef(__system);
  builder.storeUint(0, 1);
  initPool_init_args({ $$type: 'Pool_init_args' })(builder);
  const __data = builder.endCell();
  return { code: __code, data: __data };
}

const Pool_errors: { [key: number]: { message: string } } = {
  2: { message: `Stack underflow` },
  3: { message: `Stack overflow` },
  4: { message: `Integer overflow` },
  5: { message: `Integer out of expected range` },
  6: { message: `Invalid opcode` },
  7: { message: `Type check error` },
  8: { message: `Cell overflow` },
  9: { message: `Cell underflow` },
  10: { message: `Dictionary error` },
  13: { message: `Out of gas error` },
  32: { message: `Method ID not found` },
  34: { message: `Action is invalid or not supported` },
  37: { message: `Not enough TON` },
  38: { message: `Not enough extra-currencies` },
  128: { message: `Null reference exception` },
  129: { message: `Invalid serialization prefix` },
  130: { message: `Invalid incoming message` },
  131: { message: `Constraints error` },
  132: { message: `Access denied` },
  133: { message: `Contract stopped` },
  134: { message: `Invalid argument` },
  135: { message: `Code of a contract was not found` },
  136: { message: `Invalid address` },
  137: { message: `Masterchain support is not enabled for this contract` },
  4159: { message: `Invalid value!!` },
  4429: { message: `Invalid sender` },
  6775: { message: `user didn't supply this collateral` },
  7557: { message: `user didn't borrow this debt` },
  8095: { message: `HF >= 1` },
  9352: { message: `scaled totalSupply overflow` },
  9583: { message: `Reserve index out of bounds` },
  9680: { message: `Collateral reserve not found` },
  11172: { message: `Borrow cap is exceeded` },
  11642: { message: `Liability not zero` },
  13495: { message: `Liquidation reserve not found` },
  14534: { message: `Reserve not supported` },
  17062: { message: `Invalid amount` },
  18583: { message: `amount zero` },
  18599: { message: `scaled totalBorrow overflow` },
  18668: { message: `Can't Mint Anymore` },
  22438: { message: `Supply cap is exceeded` },
  22977: { message: `HF < 1` },
  23298: { message: `Debt not zero` },
  24472: { message: `Token inactive` },
  27178: { message: `Borrowing disable for this token` },
  28170: { message: `Ton not supported` },
  32741: { message: `invalid available liquidity` },
  37539: { message: `the left collateral can't cover debt` },
  40239: { message: `invalid aToken position` },
  40368: { message: `Contract stopped` },
  40651: { message: `zero supply position` },
  41207: { message: `invalid sender` },
  42555: { message: `The debt token is not transferable!` },
  42708: { message: `Invalid sender!` },
  43096: { message: `Reserve not found` },
  43267: { message: `Token Frozen` },
  43422: { message: `Invalid value - Burn` },
  47600: { message: `Reserve already exists` },
  48281: { message: `collateral can't cover new borrow` },
  50203: { message: `zero user avgLtv` },
  50842: { message: `zero borrow position` },
  53296: { message: `Contract not stopped` },
  53864: { message: `Not from the user account` },
  54314: { message: `collateral can't be liquidated` },
  54558: { message: `reserve isn not active` },
  55259: { message: `Insufficient fee` },
  56951: { message: `invalid user supply position` },
  60151: { message: `Treasury share not zero` },
  62972: { message: `Invalid balance` },
}

const Pool_types: ABIType[] = [
  {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
  {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
  {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
  {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
  {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
  {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"PoolDataInAToken","header":null,"fields":[{"name":"pool","type":{"kind":"simple","type":"address","optional":false}},{"name":"asset","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"PoolDataInDToken","header":null,"fields":[{"name":"pool","type":{"kind":"simple","type":"address","optional":false}},{"name":"asset","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"ReserveConfiguration","header":null,"fields":[{"name":"poolWalletAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"aTokenAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"dTokenAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"ltv","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"liquidationThreshold","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"liquidationBonus","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"reserveFactor","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"liquidationProtocolFee","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"isActive","type":{"kind":"simple","type":"bool","optional":false}},{"name":"isFrozen","type":{"kind":"simple","type":"bool","optional":false}},{"name":"borrowingEnabled","type":{"kind":"simple","type":"bool","optional":false}},{"name":"supplyCap","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"borrowCap","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"treasury","type":{"kind":"simple","type":"address","optional":false}},{"name":"decimals","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
  {"name":"ReserveInterestRateStrategy","header":null,"fields":[{"name":"optimalUsageRatio","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"maxUsageRatio","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"baseBorrowRate","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"slope1","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"slope2","type":{"kind":"simple","type":"uint","optional":false,"format":128}}]},
  {"name":"ReserveData","header":null,"fields":[{"name":"liquidityIndex","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"currentLiquidityRate","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"borrowIndex","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"currentBorrowRate","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"totalSupply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"availableLiquidity","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"accruedToTreasury","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"totalBorrow","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lastUpdateTimestamp","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"price","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
  {"name":"ReserveDataAndConfiguration","header":null,"fields":[{"name":"reserveData","type":{"kind":"simple","type":"ReserveData","optional":false}},{"name":"reserveConfiguration","type":{"kind":"simple","type":"ReserveConfiguration","optional":false}},{"name":"normalizedIncome","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"normalizedDebt","type":{"kind":"simple","type":"uint","optional":false,"format":128}}]},
  {"name":"TokenData","header":null,"fields":[{"name":"supply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"borrow","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"asCollateral","type":{"kind":"simple","type":"bool","optional":false}}]},
  {"name":"UserAccountData","header":null,"fields":[{"name":"positions","type":{"kind":"dict","key":"int","value":"address"}},{"name":"positionsLength","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"positionsDetail","type":{"kind":"dict","key":"address","value":"TokenData","valueFormat":"ref"}}]},
  {"name":"ReserveCache","header":null,"fields":[{"name":"currentScaledDebt","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"nextScaledDebt","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"currentLiquidityIndex","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"nextLiquidityIndex","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"currentBorrowIndex","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"nextBorrowIndex","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"currentLiquidityRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"currentBorrowRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"reserveFactor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lastUpdateTimestamp","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
  {"name":"ATokenDTokenContents","header":null,"fields":[{"name":"aTokenContent","type":{"kind":"simple","type":"cell","optional":false}},{"name":"dTokenContent","type":{"kind":"simple","type":"cell","optional":false}}]},
  {"name":"ATokenDTokenAddress","header":null,"fields":[{"name":"aToken","type":{"kind":"simple","type":"address","optional":false}},{"name":"dToken","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"CalculateInterestRatesParams","header":null,"fields":[{"name":"availableLiquidity","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityAdded","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityTaken","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"totalDebt","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"reserveFactor","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
  {"name":"LiquidityRateAndBorrowRate","header":null,"fields":[{"name":"liquidityRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"borrowRate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
  {"name":"UserAccountHealthInfo","header":null,"fields":[{"name":"avgLtv","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"avgLiquidationThreshold","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"totalSupplyInBaseCurrency","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"totalCollateralInBaseCurrency","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"totalDebtInBaseCurrency","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"healthFactorInRay","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
  {"name":"Liquidation","header":null,"fields":[{"name":"liquidator","type":{"kind":"simple","type":"address","optional":false}},{"name":"borrower","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidationReserve","type":{"kind":"simple","type":"address","optional":false}},{"name":"collateralReserve","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidationAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
  {"name":"PriceData","header":null,"fields":[{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lastUpdateTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
  {"name":"AddReserve","header":1717960705,"fields":[{"name":"reserveAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"reserveConfiguration","type":{"kind":"simple","type":"ReserveConfiguration","optional":false}},{"name":"contents","type":{"kind":"simple","type":"ATokenDTokenContents","optional":false}},{"name":"reserveInterestRateStrategy","type":{"kind":"simple","type":"ReserveInterestRateStrategy","optional":false}}]},
  {"name":"DropReserve","header":1717960706,"fields":[{"name":"reserveIndex","type":{"kind":"simple","type":"uint","optional":false,"format":16}}]},
  {"name":"BorrowToken","header":1717960707,"fields":[{"name":"tokenAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
  {"name":"GetUserAccountData","header":1717960708,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"action","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"tokenAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
  {"name":"UserAccountDataResponse","header":1717960709,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"action","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"tokenAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"accountData","type":{"kind":"simple","type":"UserAccountData","optional":false}},{"name":"payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
  {"name":"WithdrawToken","header":1717960710,"fields":[{"name":"tokenAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
  {"name":"UpdatePosition","header":1717960711,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"supply","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"borrow","type":{"kind":"simple","type":"int","optional":false,"format":128}}]},
  {"name":"UserPositionUpdated","header":1717960712,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"asset","type":{"kind":"simple","type":"address","optional":false}},{"name":"supply","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"borrow","type":{"kind":"simple","type":"int","optional":false,"format":128}}]},
  {"name":"SupplyTon","header":1717960713,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
  {"name":"BorrowTon","header":1717960720,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
  {"name":"WithdrawTon","header":1717960721,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
  {"name":"RepayTon","header":1717960722,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
  {"name":"LiquidateTon","header":1717960723,"fields":[{"name":"borrower","type":{"kind":"simple","type":"address","optional":false}},{"name":"collateralReserve","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidationAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
  {"name":"SetMockOraclePrice","header":1668051875,"fields":[{"name":"asset","type":{"kind":"simple","type":"address","optional":false}},{"name":"price","type":{"kind":"simple","type":"uint","optional":false,"format":128}}]},
  {"name":"RerunBounceMsg","header":2651963349,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"action","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
  {"name":"UpdatePositionBounce","header":883647401,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"msg","type":{"kind":"simple","type":"UpdatePosition","optional":false}}]},
  {"name":"MintBounce","header":3420402945,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"msg","type":{"kind":"simple","type":"Mint","optional":false}}]},
  {"name":"TokenTransferBounce","header":1141904585,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"msg","type":{"kind":"simple","type":"TokenTransfer","optional":false}}]},
  {"name":"TokenBurnBounce","header":3027259916,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"msg","type":{"kind":"simple","type":"TokenBurn","optional":false}}]},
  {"name":"UpdateReserveConfiguration","header":2968692329,"fields":[{"name":"reserve","type":{"kind":"simple","type":"address","optional":false}},{"name":"reserveConfiguration","type":{"kind":"simple","type":"ReserveConfiguration","optional":false}}]},
  {"name":"SyncPrices","header":4166461416,"fields":[{"name":"prices","type":{"kind":"dict","key":"address","value":"int"}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"UpdateOracleProvider","header":2546976500,"fields":[{"name":"oracle","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"TokenTransfer","header":260734629,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
  {"name":"TokenTransferInternal","header":395134233,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
  {"name":"TokenNotification","header":1935855772,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
  {"name":"TokenBurn","header":1499400124,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"TokenBurnNotification","header":2078119902,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}}]},
  {"name":"TokenExcesses","header":3576854235,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
  {"name":"TokenUpdateContent","header":2937889386,"fields":[{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
  {"name":"TokenTransferByPool","header":3656918456,"fields":[{"name":"payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
  {"name":"CheckAndTransferAToken","header":2362157153,"fields":[{"name":"asset","type":{"kind":"simple","type":"address","optional":false}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
  {"name":"Mint","header":614915518,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"JettonWalletData","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"walletCode","type":{"kind":"simple","type":"cell","optional":false}}]},
  {"name":"JettonData","header":null,"fields":[{"name":"totalSupply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"walletCode","type":{"kind":"simple","type":"cell","optional":false}}]},
  {"name":"CalcInterestRatesLocalVars","header":null,"fields":[{"name":"availableLiquidity","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"totalDebt","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"currentBorrowRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"currentLiquidityRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"borrowUsageRatio","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"supplyUsageRatio","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"availableLiquidityPlusDebt","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const Pool_getters: ABIGetter[] = [
  {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
  {"name":"stopped","arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
  {"name":"userAccountHealthInfo","arguments":[{"name":"userAccountData","type":{"kind":"simple","type":"UserAccountData","optional":false}}],"returnType":{"kind":"simple","type":"UserAccountHealthInfo","optional":false}},
  {"name":"getUserAccountInit","arguments":[{"name":"userAddress","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"StateInit","optional":false}},
  {"name":"getAssetATokenInit","arguments":[{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"asset","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"StateInit","optional":false}},
  {"name":"getAssetDTokenInit","arguments":[{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"asset","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"StateInit","optional":false}},
  {"name":"reservesLength","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
  {"name":"reserves","arguments":[],"returnType":{"kind":"dict","key":"int","value":"address"}},
  {"name":"reserveAddress","arguments":[{"name":"reserveIndex","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":false}},
  {"name":"reserveData","arguments":[{"name":"reserveAddress","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"ReserveData","optional":false}},
  {"name":"reserveDataAndConfiguration","arguments":[{"name":"reserveAddress","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"ReserveDataAndConfiguration","optional":false}},
  {"name":"allReserveDataAndConfiguration","arguments":[],"returnType":{"kind":"dict","key":"address","value":"ReserveDataAndConfiguration","valueFormat":"ref"}},
  {"name":"reserveConfiguration","arguments":[{"name":"reserveAddress","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"ReserveConfiguration","optional":false}},
  {"name":"calculateATokenAddress","arguments":[{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"reserveAddress","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
  {"name":"calculateDTokenAddress","arguments":[{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"reserveAddress","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
  {"name":"userATokenWalletAddress","arguments":[{"name":"asset","type":{"kind":"simple","type":"address","optional":false}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
  {"name":"userDTokenWalletAddress","arguments":[{"name":"asset","type":{"kind":"simple","type":"address","optional":false}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
  {"name":"userAccountAddress","arguments":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
  {"name":"queryId","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
  {"name":"bounceMsg","arguments":[{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"cell","optional":true}},
  {"name":"oracleProvider","arguments":[],"returnType":{"kind":"simple","type":"address","optional":true}},
  {"name":"MIN_TONS_FOR_STORAGE","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
  {"name":"TOKEN_TRANSFER_GAS_CONSUMPTION","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
  {"name":"TOKEN_MINT_GAS_CONSUMPTION","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
  {"name":"TOKEN_BURN_GAS_CONSUMPTION","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
  {"name":"SUPPLY_REPAY_GAS_CONSUMPTION","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
  {"name":"BORROW_GAS_CONSUMPTION","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
  {"name":"WITHDRAW_GAS_CONSUMPTION","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
  {"name":"LIQUIDATION_GAS_CONSUMPTION","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

const Pool_receivers: ABIReceiver[] = [
  {"receiver":"internal","message":{"kind":"typed","type":"AddReserve"}},
  {"receiver":"internal","message":{"kind":"typed","type":"DropReserve"}},
  {"receiver":"internal","message":{"kind":"typed","type":"TokenNotification"}},
  {"receiver":"internal","message":{"kind":"typed","type":"CheckAndTransferAToken"}},
  {"receiver":"internal","message":{"kind":"typed","type":"UserPositionUpdated"}},
  {"receiver":"internal","message":{"kind":"typed","type":"BorrowToken"}},
  {"receiver":"internal","message":{"kind":"typed","type":"WithdrawToken"}},
  {"receiver":"internal","message":{"kind":"typed","type":"UserAccountDataResponse"}},
  {"receiver":"internal","message":{"kind":"typed","type":"TokenExcesses"}},
  {"receiver":"internal","message":{"kind":"typed","type":"RerunBounceMsg"}},
  {"receiver":"internal","message":{"kind":"typed","type":"SupplyTon"}},
  {"receiver":"internal","message":{"kind":"typed","type":"BorrowTon"}},
  {"receiver":"internal","message":{"kind":"typed","type":"WithdrawTon"}},
  {"receiver":"internal","message":{"kind":"typed","type":"RepayTon"}},
  {"receiver":"internal","message":{"kind":"typed","type":"LiquidateTon"}},
  {"receiver":"internal","message":{"kind":"typed","type":"SyncPrices"}},
  {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
  {"receiver":"internal","message":{"kind":"text","text":"Resume"}},
  {"receiver":"internal","message":{"kind":"text","text":"Stop"}},
  {"receiver":"internal","message":{"kind":"typed","type":"UpdateReserveConfiguration"}},
  {"receiver":"internal","message":{"kind":"typed","type":"SetMockOraclePrice"}},
  {"receiver":"internal","message":{"kind":"typed","type":"UpdateOracleProvider"}},
]

export class Pool implements Contract {
  
  static async init() {
      return await Pool_init();
  }
  
  static async fromInit() {
      const init = await Pool_init();
      const address = contractAddress(0, init);
      return new Pool(address, init);
  }
  
  static fromAddress(address: Address) {
      return new Pool(address);
  }
  
  readonly address: Address; 
  readonly init?: { code: Cell, data: Cell };
  readonly abi: ContractABI = {
      types:  Pool_types,
      getters: Pool_getters,
      receivers: Pool_receivers,
      errors: Pool_errors,
  };
  
  private constructor(address: Address, init?: { code: Cell, data: Cell }) {
      this.address = address;
      this.init = init;
  }
  
  async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: AddReserve | DropReserve | TokenNotification | CheckAndTransferAToken | UserPositionUpdated | BorrowToken | WithdrawToken | UserAccountDataResponse | TokenExcesses | RerunBounceMsg | SupplyTon | BorrowTon | WithdrawTon | RepayTon | LiquidateTon | SyncPrices | Deploy | 'Resume' | 'Stop' | UpdateReserveConfiguration | SetMockOraclePrice | UpdateOracleProvider) {
      
      let body: Cell | null = null;
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'AddReserve') {
          body = beginCell().store(storeAddReserve(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DropReserve') {
          body = beginCell().store(storeDropReserve(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenNotification') {
          body = beginCell().store(storeTokenNotification(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CheckAndTransferAToken') {
          body = beginCell().store(storeCheckAndTransferAToken(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UserPositionUpdated') {
          body = beginCell().store(storeUserPositionUpdated(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'BorrowToken') {
          body = beginCell().store(storeBorrowToken(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawToken') {
          body = beginCell().store(storeWithdrawToken(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UserAccountDataResponse') {
          body = beginCell().store(storeUserAccountDataResponse(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenExcesses') {
          body = beginCell().store(storeTokenExcesses(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RerunBounceMsg') {
          body = beginCell().store(storeRerunBounceMsg(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SupplyTon') {
          body = beginCell().store(storeSupplyTon(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'BorrowTon') {
          body = beginCell().store(storeBorrowTon(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawTon') {
          body = beginCell().store(storeWithdrawTon(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RepayTon') {
          body = beginCell().store(storeRepayTon(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'LiquidateTon') {
          body = beginCell().store(storeLiquidateTon(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SyncPrices') {
          body = beginCell().store(storeSyncPrices(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
          body = beginCell().store(storeDeploy(message)).endCell();
      }
      if (message === 'Resume') {
          body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
      }
      if (message === 'Stop') {
          body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateReserveConfiguration') {
          body = beginCell().store(storeUpdateReserveConfiguration(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetMockOraclePrice') {
          body = beginCell().store(storeSetMockOraclePrice(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateOracleProvider') {
          body = beginCell().store(storeUpdateOracleProvider(message)).endCell();
      }
      if (body === null) { throw new Error('Invalid message type'); }
      
      await provider.internal(via, { ...args, body: body });
      
  }
  
  async getOwner(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('owner', builder.build())).stack;
      let result = source.readAddress();
      return result;
  }
  
  async getStopped(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('stopped', builder.build())).stack;
      let result = source.readBoolean();
      return result;
  }
  
  async getUserAccountHealthInfo(provider: ContractProvider, userAccountData: UserAccountData) {
      let builder = new TupleBuilder();
      builder.writeTuple(storeTupleUserAccountData(userAccountData));
      let source = (await provider.get('userAccountHealthInfo', builder.build())).stack;
      const result = loadTupleUserAccountHealthInfo(source);
      return result;
  }
  
  async getGetUserAccountInit(provider: ContractProvider, userAddress: Address) {
      let builder = new TupleBuilder();
      builder.writeAddress(userAddress);
      let source = (await provider.get('getUserAccountInit', builder.build())).stack;
      const result = loadTupleStateInit(source);
      return result;
  }
  
  async getGetAssetATokenInit(provider: ContractProvider, content: Cell, asset: Address) {
      let builder = new TupleBuilder();
      builder.writeCell(content);
      builder.writeAddress(asset);
      let source = (await provider.get('getAssetATokenInit', builder.build())).stack;
      const result = loadTupleStateInit(source);
      return result;
  }
  
  async getGetAssetDTokenInit(provider: ContractProvider, content: Cell, asset: Address) {
      let builder = new TupleBuilder();
      builder.writeCell(content);
      builder.writeAddress(asset);
      let source = (await provider.get('getAssetDTokenInit', builder.build())).stack;
      const result = loadTupleStateInit(source);
      return result;
  }
  
  async getReservesLength(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('reservesLength', builder.build())).stack;
      let result = source.readBigNumber();
      return result;
  }
  
  async getReserves(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('reserves', builder.build())).stack;
      let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
      return result;
  }
  
  async getReserveAddress(provider: ContractProvider, reserveIndex: bigint) {
      let builder = new TupleBuilder();
      builder.writeNumber(reserveIndex);
      let source = (await provider.get('reserveAddress', builder.build())).stack;
      let result = source.readAddress();
      return result;
  }
  
  async getReserveData(provider: ContractProvider, reserveAddress: Address) {
      let builder = new TupleBuilder();
      builder.writeAddress(reserveAddress);
      let source = (await provider.get('reserveData', builder.build())).stack;
      const result = loadTupleReserveData(source);
      return result;
  }
  
  async getReserveDataAndConfiguration(provider: ContractProvider, reserveAddress: Address) {
      let builder = new TupleBuilder();
      builder.writeAddress(reserveAddress);
      let source = (await provider.get('reserveDataAndConfiguration', builder.build())).stack;
      const result = loadTupleReserveDataAndConfiguration(source);
      return result;
  }
  
  async getAllReserveDataAndConfiguration(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('allReserveDataAndConfiguration', builder.build())).stack;
      let result = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserReserveDataAndConfiguration(), source.readCellOpt());
      return result;
  }
  
  async getReserveConfiguration(provider: ContractProvider, reserveAddress: Address) {
      let builder = new TupleBuilder();
      builder.writeAddress(reserveAddress);
      let source = (await provider.get('reserveConfiguration', builder.build())).stack;
      const result = loadTupleReserveConfiguration(source);
      return result;
  }
  
  async getCalculateATokenAddress(provider: ContractProvider, content: Cell, reserveAddress: Address) {
      let builder = new TupleBuilder();
      builder.writeCell(content);
      builder.writeAddress(reserveAddress);
      let source = (await provider.get('calculateATokenAddress', builder.build())).stack;
      let result = source.readAddress();
      return result;
  }
  
  async getCalculateDTokenAddress(provider: ContractProvider, content: Cell, reserveAddress: Address) {
      let builder = new TupleBuilder();
      builder.writeCell(content);
      builder.writeAddress(reserveAddress);
      let source = (await provider.get('calculateDTokenAddress', builder.build())).stack;
      let result = source.readAddress();
      return result;
  }
  
  async getUserATokenWalletAddress(provider: ContractProvider, asset: Address, user: Address) {
      let builder = new TupleBuilder();
      builder.writeAddress(asset);
      builder.writeAddress(user);
      let source = (await provider.get('userATokenWalletAddress', builder.build())).stack;
      let result = source.readAddress();
      return result;
  }
  
  async getUserDTokenWalletAddress(provider: ContractProvider, asset: Address, user: Address) {
      let builder = new TupleBuilder();
      builder.writeAddress(asset);
      builder.writeAddress(user);
      let source = (await provider.get('userDTokenWalletAddress', builder.build())).stack;
      let result = source.readAddress();
      return result;
  }
  
  async getUserAccountAddress(provider: ContractProvider, user: Address) {
      let builder = new TupleBuilder();
      builder.writeAddress(user);
      let source = (await provider.get('userAccountAddress', builder.build())).stack;
      let result = source.readAddress();
      return result;
  }
  
  async getQueryId(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('queryId', builder.build())).stack;
      let result = source.readBigNumber();
      return result;
  }
  
  async getBounceMsg(provider: ContractProvider, queryId: bigint) {
      let builder = new TupleBuilder();
      builder.writeNumber(queryId);
      let source = (await provider.get('bounceMsg', builder.build())).stack;
      let result = source.readCellOpt();
      return result;
  }
  
  async getOracleProvider(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('oracleProvider', builder.build())).stack;
      let result = source.readAddressOpt();
      return result;
  }
  
  async getMinTonsForStorage(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('MIN_TONS_FOR_STORAGE', builder.build())).stack;
      let result = source.readBigNumber();
      return result;
  }
  
  async getTokenTransferGasConsumption(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('TOKEN_TRANSFER_GAS_CONSUMPTION', builder.build())).stack;
      let result = source.readBigNumber();
      return result;
  }
  
  async getTokenMintGasConsumption(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('TOKEN_MINT_GAS_CONSUMPTION', builder.build())).stack;
      let result = source.readBigNumber();
      return result;
  }
  
  async getTokenBurnGasConsumption(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('TOKEN_BURN_GAS_CONSUMPTION', builder.build())).stack;
      let result = source.readBigNumber();
      return result;
  }
  
  async getSupplyRepayGasConsumption(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('SUPPLY_REPAY_GAS_CONSUMPTION', builder.build())).stack;
      let result = source.readBigNumber();
      return result;
  }
  
  async getBorrowGasConsumption(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('BORROW_GAS_CONSUMPTION', builder.build())).stack;
      let result = source.readBigNumber();
      return result;
  }
  
  async getWithdrawGasConsumption(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('WITHDRAW_GAS_CONSUMPTION', builder.build())).stack;
      let result = source.readBigNumber();
      return result;
  }
  
  async getLiquidationGasConsumption(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('LIQUIDATION_GAS_CONSUMPTION', builder.build())).stack;
      let result = source.readBigNumber();
      return result;
  }
  
}