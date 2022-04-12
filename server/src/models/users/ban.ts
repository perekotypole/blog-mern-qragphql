export type userBanModel = {
  id: string
  user: string,
  period: {
    start: Date,
    finish: Date,
  },
  active: boolean,
  reason: string,
}
