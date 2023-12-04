import { Token, TokenReservesNormalized } from '../types'
import { ETH as _ETH } from '../constants'
import { getTokenReserves } from '../data'
import { ethers } from 'ethers'

const ETH: Token = {
  chainId: 1,
  address: _ETH,
  decimals: 18
}

const DAI: Token = {
  chainId: 1,
  address: '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359',
  decimals: 18
}

const DAI_EXCHANGE: Token = {
  chainId: 1,
  address: '0x09cabEC1eAd1c0Ba254B09efb3EE13841712bE14',
  decimals: 18
}

describe('getTokenReserves', (): void => {
  jest.setTimeout(10000) // 10 seconds

  test('DAI', async (done: jest.DoneCallback): Promise<void> => {
    const tokenReserves: TokenReservesNormalized = await getTokenReserves(DAI.address as string)

    const tokenReservesWithProvider: TokenReservesNormalized = await getTokenReserves(
      DAI.address as string,
      ethers.getDefaultProvider()
    )

    expect(tokenReserves.token).toEqual(tokenReservesWithProvider.token)

    expect(tokenReserves.token).toEqual(DAI)
    expect(tokenReserves.exchange).toEqual(DAI_EXCHANGE)
    expect(tokenReserves.ethReserve.token).toEqual(ETH)
    expect(tokenReserves.ethReserve.amount).toBeTruthy()
    expect(tokenReserves.tokenReserve.token).toEqual(DAI)
    expect(tokenReserves.tokenReserve.amount).toBeTruthy()

    done()
  })
})
