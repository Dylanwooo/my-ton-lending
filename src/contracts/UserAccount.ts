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

type UserAccount_init_args = {
  $$type: 'UserAccount_init_args';
  master: Address;
  owner: Address;
}

function initUserAccount_init_args(src: UserAccount_init_args) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeAddress(src.master);
      b_0.storeAddress(src.owner);
  };
}

async function UserAccount_init(master: Address, owner: Address) {
  const __code = Cell.fromBase64('te6ccgECHwEABm0AART/APSkE/S88sgLAQIBYgIDA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVFNs88uCCGwQFAgFYFRYE5AGSMH/gcCHXScIflTAg1wsf3iCCEGZmAAe6jrsw0x8BghBmZgAHuvLggdM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSf9J/VTBsFNs8f+AgghBmZgAEuo8IMNs8bBbbPH/gghCUapi2ugYHCAkAqMj4QwHMfwHKAFVAUFQg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W9AASyw/0AMntVAQ+EEgQN0ZY2zxUd2Ur2zz4QW8kEEgQN0ZYJds8EDhHaQ0KDgsAstMfAYIQZmYABLry4IHTP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0wf6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfoAUVUVFEMwBHoQShA5SHbbPPhBbyQQSBA3Rlgl2zwQOEdp2zwWofhBbyQQI18DcXBUd2UQjAcREQcQbwUREAUQTlUCDRBWDQ4PEAFYjqfTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gMHASAb4zI4EBCyNZ9AtvoZIwbd8gbpIwbZ3Q+gD6ANIAVSBsE28D4m6ONgWBAQFTUiBulTBZ9FowlEEz9BTigQELUGN/yFUgWvoCWPoCygDJIG6VMFn0WTCUQTP0E+IBpOMOAQwC3ts8FqEYcX8qShNQnMhVQIIQZmYACFAGyx8Uyz9YINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsp/yn/JJAQQOUdmFEMwbW3bPANBRA8TAK4jgQELI1n0C2+hkjBt3yBukjBtndD6APoA0gBVIGwTbwPiIG7y0IBvIwWgAqAhwgCScDLfQBNZgQELA8hVIFr6Alj6AsoAyRIgbpUwWfRZMJRBM/QT4gEAIoERTfhBbyQQI18DUlDHBfL0ACz4J28QIaGCCJiWgGa2CKGCCJiWgKChAGRsMfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Igw+gAxcdch+gAx+gAwpwOrAAIqyFWA2zzJEEgQN0ZQFEMwbW3bPFUCERMAxIIQZmYABVAKyx8Yyz9QBiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhTLB1gg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYB+gJQI1Aj9ACBAQHPAPQAAc8WATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPBMByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAFACYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAC5u70YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwG9Sd75VFlvHHU9PeBVnDJoJwnZdOWrNOy3M6DpZtlGbopIAgFIFxgCAUgZGgB1sm7jQ1aXBmczovL1FtVzVoR1RVWnZYQkVIOXdhOHZ3RlBKM1VjODZSZUdySEVvUEdUd1BQOWU4M22CAAEKq+7UTQ0gABAhCpf9s82zxsUxscAcTtRNDUAfhj0gABjkr6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB9ATTD/QEVUBsFeD4KNcLCoMJuvLgiR0ABlRyEAGK+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEgLRAds8HgAIAW1wbQ==');
  const __system = Cell.fromBase64('te6cckECIQEABncAAQHAAQEFodrFAgEU/wD0pBP0vPLICwMCAWIEFgN60AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRTbPPLgghwFFQTkAZIwf+BwIddJwh+VMCDXCx/eIIIQZmYAB7qOuzDTHwGCEGZmAAe68uCB0z/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdJ/0n9VMGwU2zx/4CCCEGZmAAS6jwgw2zxsFts8f+CCEJRqmLa6BgoLEQQ+EEgQN0ZY2zxUd2Ur2zz4QW8kEEgQN0ZYJds8EDhHaQwHDQkBvjMjgQELI1n0C2+hkjBt3yBukjBtndD6APoA0gBVIGwTbwPibo42BYEBAVNSIG6VMFn0WjCUQTP0FOKBAQtQY3/IVSBa+gJY+gLKAMkgbpUwWfRZMJRBM/QT4gGk4w4BCACuI4EBCyNZ9AtvoZIwbd8gbpIwbZ3Q+gD6ANIAVSBsE28D4iBu8tCAbyMFoAKgIcIAknAy30ATWYEBCwPIVSBa+gJY+gLKAMkSIG6VMFn0WTCUQTP0E+IBAt7bPBahGHF/KkoTUJzIVUCCEGZmAAhQBssfFMs/WCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbKf8p/ySQEEDlHZhRDMG1t2zwDQUQOEwCy0x8BghBmZgAEuvLggdM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTB/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+gBRVRUUQzAEehBKEDlIdts8+EFvJBBIEDdGWCXbPBA4R2nbPBah+EFvJBAjXwNxcFR3ZRCMBxERBxBvBREQBRBOVQINEFYMDQ4PACKBEU34QW8kECNfA1JQxwXy9AAs+CdvECGhggiYloBmtgihggiYloCgoQBkbDH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMPoAMXHXIfoAMfoAMKcDqwACKshVgNs8yRBIEDdGUBRDMG1t2zxVAhATAMSCEGZmAAVQCssfGMs/UAYg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYUywdYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAfoCUCNQI/QAgQEBzwD0AAHPFgFYjqfTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gMHASATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPBMByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAFACYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzACoyPhDAcx/AcoAVUBQVCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxb0ABLLD/QAye1UAgFYFxgAubu9GCcFzsPV0srnsehOw51kqFG2aCcJ3WNS0rZHyzItOvLf3xYjmCcCBVwBuAZ2OUzlg6rkclssOCcBvUne+VRZbxx1PT3gVZwyaCcJ2XTlqzTstzOg6WbZRm6KSAIBSBkgAgFIGhsAEKq+7UTQ0gABAhCpf9s82zxsUxwfAcTtRNDUAfhj0gABjkr6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB9ATTD/QEVUBsFeD4KNcLCoMJuvLgiR0BivpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBIC0QHbPB4ACAFtcG0ABlRyEAB1sm7jQ1aXBmczovL1FtVzVoR1RVWnZYQkVIOXdhOHZ3RlBKM1VjODZSZUdySEVvUEdUd1BQOWU4M22CD2NBdk');
  let builder = beginCell();
  builder.storeRef(__system);
  builder.storeUint(0, 1);
  initUserAccount_init_args({ $$type: 'UserAccount_init_args', master, owner })(builder);
  const __data = builder.endCell();
  return { code: __code, data: __data };
}

const UserAccount_errors: { [key: number]: { message: string } } = {
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

const UserAccount_types: ABIType[] = [
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

const UserAccount_getters: ABIGetter[] = [
  {"name":"account","arguments":[],"returnType":{"kind":"simple","type":"UserAccountData","optional":false}},
]

const UserAccount_receivers: ABIReceiver[] = [
  {"receiver":"internal","message":{"kind":"typed","type":"UpdatePosition"}},
  {"receiver":"internal","message":{"kind":"typed","type":"GetUserAccountData"}},
  {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class UserAccount implements Contract {
  
  static async init(master: Address, owner: Address) {
      return await UserAccount_init(master, owner);
  }
  
  static async fromInit(master: Address, owner: Address) {
      const init = await UserAccount_init(master, owner);
      const address = contractAddress(0, init);
      return new UserAccount(address, init);
  }
  
  static fromAddress(address: Address) {
      return new UserAccount(address);
  }
  
  readonly address: Address; 
  readonly init?: { code: Cell, data: Cell };
  readonly abi: ContractABI = {
      types:  UserAccount_types,
      getters: UserAccount_getters,
      receivers: UserAccount_receivers,
      errors: UserAccount_errors,
  };
  
  private constructor(address: Address, init?: { code: Cell, data: Cell }) {
      this.address = address;
      this.init = init;
  }
  
  async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: UpdatePosition | GetUserAccountData | Deploy) {
      
      let body: Cell | null = null;
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdatePosition') {
          body = beginCell().store(storeUpdatePosition(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'GetUserAccountData') {
          body = beginCell().store(storeGetUserAccountData(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
          body = beginCell().store(storeDeploy(message)).endCell();
      }
      if (body === null) { throw new Error('Invalid message type'); }
      
      await provider.internal(via, { ...args, body: body });
      
  }
  
  async getAccount(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('account', builder.build())).stack;
      const result = loadTupleUserAccountData(source);
      return result;
  }
  
}