import { ethers } from "ethers";
import { getAddresses } from "../../constants";
import {
  TimeTokenContract,
  MemoTokenContract,
  MimTokenContract,
} from "../../abi";
import { setAll } from "../../helpers";

import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import {
  JsonRpcProvider,
  StaticJsonRpcProvider,
} from "@ethersproject/providers";
import { Bond } from "../../helpers/bond/bond";
import { Networks } from "../../constants/blockchain";
import React from "react";
import { RootState } from "../store";
import { IToken } from "../../helpers/tokens";

interface IGetBalances {
  address: string;
  networkID: Networks;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
}

interface IAccountBalances {
  balances: {
    sstabil: string;
    stabil: string;
  };
}

export const getBalances = createAsyncThunk(
  "account/getBalances",
  async ({
    address,
    networkID,
    provider,
  }: IGetBalances): Promise<IAccountBalances> => {
    const addresses = getAddresses(networkID);

    const sstabilContract = new ethers.Contract(
      addresses.sSTABIL_ADDRESS,
      MemoTokenContract,
      provider,
    );
    const sstabilBalance = await sstabilContract.balanceOf(address);
    const stabilContract = new ethers.Contract(
      addresses.STABIL_ADDRESS,
      TimeTokenContract,
      provider,
    );
    const stabilBalance = await stabilContract.balanceOf(address);

    return {
      balances: {
        sstabil: ethers.utils.formatUnits(sstabilBalance, "gwei"),
        stabil: ethers.utils.formatUnits(stabilBalance, "gwei"),
      },
    };
  },
);

interface ILoadAccountDetails {
  address: string;
  networkID: Networks;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
}

interface IUserAccountDetails {
  balances: {
    stabil: string;
    sstabil: string;
  };
  staking: {
    stabil: number;
    sstabil: number;
  };
}

export const loadAccountDetails = createAsyncThunk(
  "account/loadAccountDetails",
  async ({
    networkID,
    provider,
    address,
  }: ILoadAccountDetails): Promise<IUserAccountDetails> => {
    let stabilBalance = 0;
    let sstabilBalance = 0;
    let stakeAllowance = 0;
    let unstakeAllowance = 0;

    const addresses = getAddresses(networkID);

    if (addresses.STABIL_ADDRESS) {
      const stabilContract = new ethers.Contract(
        addresses.STABIL_ADDRESS,
        TimeTokenContract,
        provider,
      );
      stabilBalance = await stabilContract.balanceOf(address);
      stakeAllowance = await stabilContract.allowance(
        address,
        addresses.STAKING_HELPER_ADDRESS,
      );
    }

    if (addresses.sSTABIL_ADDRESS) {
      const sstabilContract = new ethers.Contract(
        addresses.sSTABIL_ADDRESS,
        MemoTokenContract,
        provider,
      );
      sstabilBalance = await sstabilContract.balanceOf(address);
      unstakeAllowance = await sstabilContract.allowance(
        address,
        addresses.STAKING_ADDRESS,
      );
    }

    return {
      balances: {
        sstabil: ethers.utils.formatUnits(sstabilBalance, "gwei"),
        stabil: ethers.utils.formatUnits(stabilBalance, "gwei"),
      },
      staking: {
        stabil: Number(stakeAllowance),
        sstabil: Number(unstakeAllowance),
      },
    };
  },
);

interface ICalcUserBondDetails {
  address: string;
  bond: Bond;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
  networkID: Networks;
}

export interface IUserBondDetails {
  allowance: number;
  balance: number;
  celoBalance: number;
  interestDue: number;
  bondMaturationBlock: number;
  pendingPayout: number; //Payout formatted in gwei.
}

export const calculateUserBondDetails = createAsyncThunk(
  "account/calculateUserBondDetails",
  async ({ address, bond, networkID, provider }: ICalcUserBondDetails) => {
    if (!address) {
      return new Promise<any>(resolve => {
        resolve({
          bond: "",
          displayName: "",
          bondIconSvg: "",
          isLP: false,
          allowance: 0,
          balance: 0,
          interestDue: 0,
          bondMaturationBlock: 0,
          pendingPayout: "",
          celoBalance: 0,
        });
      });
    }

    const bondContract = bond.getContractForBond(networkID, provider);
    const reserveContract = bond.getContractForReserve(networkID, provider);

    let interestDue, pendingPayout, bondMaturationBlock;

    const bondDetails = await bondContract.bondInfo(address);
    interestDue = bondDetails.payout / Math.pow(10, 9);
    bondMaturationBlock =
      Number(bondDetails.vesting) + Number(bondDetails.lastTime);
    pendingPayout = await bondContract.pendingPayoutFor(address);

    let allowance,
      balance = "0";

    allowance = await reserveContract.allowance(
      address,
      bond.getAddressForBond(networkID),
    );
    balance = await reserveContract.balanceOf(address);
    const balanceVal = ethers.utils.formatEther(balance);

    const celoBalance = await provider.getSigner().getBalance();
    const celoVal = ethers.utils.formatEther(celoBalance);

    const pendingPayoutVal = ethers.utils.formatUnits(pendingPayout, "gwei");

    return {
      bond: bond.name,
      displayName: bond.displayName,
      bondIconSvg: bond.bondIconSvg,
      isLP: bond.isLP,
      allowance: Number(allowance),
      balance: Number(balanceVal),
      celoBalance: Number(celoVal),
      interestDue,
      bondMaturationBlock,
      pendingPayout: Number(pendingPayoutVal),
    };
  },
);

interface ICalcUserTokenDetails {
  address: string;
  token: IToken;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
  networkID: Networks;
}

export interface IUserTokenDetails {
  allowance: number;
  balance: number;
  isCelo?: boolean;
}

export const calculateUserTokenDetails = createAsyncThunk(
  "account/calculateUserTokenDetails",
  async ({ address, token, networkID, provider }: ICalcUserTokenDetails) => {
    if (!address) {
      return new Promise<any>(resolve => {
        resolve({
          token: "",
          address: "",
          img: "",
          allowance: 0,
          balance: 0,
        });
      });
    }

    if (token.isCelo) {
      const celoBalance = await provider.getSigner().getBalance();
      const celoVal = ethers.utils.formatEther(celoBalance);

      return {
        token: token.name,
        tokenIcon: token.img,
        balance: Number(celoVal),
        isCelo: true,
      };
    }

    const addresses = getAddresses(networkID);

    const tokenContract = new ethers.Contract(
      token.address,
      MimTokenContract,
      provider,
    );

    let allowance,
      balance = "0";

    allowance = await tokenContract.allowance(address, addresses.DAO_ADDRESS);
    balance = await tokenContract.balanceOf(address);

    const balanceVal = Number(balance) / Math.pow(10, token.decimals);

    return {
      token: token.name,
      address: token.address,
      img: token.img,
      allowance: Number(allowance),
      balance: Number(balanceVal),
    };
  },
);

export interface IAccountSlice {
  bonds: { [key: string]: IUserBondDetails };
  balances: {
    sstabil: string;
    stabil: string;
  };
  loading: boolean;
  staking: {
    stabil: number;
    sstabil: number;
  };
  tokens: { [key: string]: IUserTokenDetails };
}

const initialState: IAccountSlice = {
  loading: true,
  bonds: {},
  balances: { sstabil: "", stabil: "" },
  staking: { stabil: 0, sstabil: 0 },
  tokens: {},
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    fetchAccountSuccess(state, action) {
      setAll(state, action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadAccountDetails.pending, state => {
        state.loading = true;
      })
      .addCase(loadAccountDetails.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(loadAccountDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })
      .addCase(getBalances.pending, state => {
        state.loading = true;
      })
      .addCase(getBalances.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(getBalances.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })
      .addCase(calculateUserBondDetails.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(calculateUserBondDetails.fulfilled, (state, action) => {
        if (!action.payload) return;
        const bond = action.payload.bond;
        state.bonds[bond] = action.payload;
        state.loading = false;
      })
      .addCase(calculateUserBondDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })
      .addCase(calculateUserTokenDetails.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(calculateUserTokenDetails.fulfilled, (state, action) => {
        if (!action.payload) return;
        const token = action.payload.token;
        state.tokens[token] = action.payload;
        state.loading = false;
      })
      .addCase(calculateUserTokenDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      });
  },
});

export default accountSlice.reducer;

export const { fetchAccountSuccess } = accountSlice.actions;

const baseInfo = (state: RootState) => state.account;

export const getAccountState = createSelector(baseInfo, account => account);
