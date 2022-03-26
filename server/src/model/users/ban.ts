export type userBanModel = {
  id: string
  userID: string,
  period: {
    start: Date,
    finish: Date,
  },
  active: boolean,
  reason: string,
}
