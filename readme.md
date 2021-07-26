Project:

Resource:
- Key pair generator: 192.168.1.250:4455 
- Tron node testnet (Nile) kafka: 139.99.210.62:9193
- GUI client: Conduktor (kafka), Another Redis Desktop Manager (redis), Compass (Mongo)
- FundWallet address for centralized balances management
- Databases: mongo, redis
- API: Apollo Server, Playground
    
Goal: make a simple game server supporting blockchain based payment (Công -> trx | Tuân -> token trc20 )
Guide for server:
- Register a deposit transaction for any address sending trx to FundWallet: using kafka consumer to subscribe ‘transaction’ topic for logging transactions which having “toAddress” is FundWallet. 
- Game engine: random number 0 or 1 as result for game.
- Build an API server by Apollo Server for making requests: 
    - query: fund_get => balance of fund wallet, total user count, total game count, total game amount, total server win, total server loss, total user win, total user loss, total deposit count, total deposit amount, total withdraw count, total withdraw amount
    - query: user_get(address: string) => balance of user in server, total deposit count, total deposit amount, total withdraw count, total withdraw amount, total game count, total game amount, total user win, total user loss
    - query: user_game_history_get(address: string, pageNumber: int, pageSize: number) => paginated game results (gameId: string, address: string, number: int,  result: int, payout: int, time: date)
    - query: game_get(gameId: string) => result of a game detail.
    - mutation: user_play(number: int (0|1), amount: int) => result (win/lose by random result from server). Must checking user balance before accept the game.
    - mutation: user_withdraw(address: string, amount: int) =>  txid. Must checking user balance before accept the withdraw.

Guid for automation tool (nice to have):
- Script for deposit by amount money and quantity of sending calls.
- Script for withdraw by amount money and quantity of sending calls.
- Script for game playing by amount money and chosen number and quantity  of sending calls.
Outcomes:
- Game engine resulting for every possible results. 
- API works well: no error by schema or parameter validation or invalid response types.
- No negative balance for user or FundWallet
- User can not play or withdraw if insufficient balance.
- Server can not accept any play or withdraw if insufficient balance.
- System not missing any transaction deposit from user.
- System not processing multiple times any transaction deposit from user.

Expectation: 7~10 days.
Unlocks:
- mutation: user_lock(address: string) => locking an user, stop receiving game or withdraw request
- mutation: user_unlock(address: string) => unlocking an user, start receiving game or withdraw request
- mutation: server_lock => locking all server, stop receiving game or withdraw request
- mutation: server_unlock => unlocking all server, stop receiving game or withdraw request
- subscription: user_sub(address: string) => return user change: deposit, withdraw, game
- convert all mutation to private key signing

Expectation: 3 ~ 5 days.
