import mongoose from 'mongoose'

const AnalyticsSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  clickCounts: { type: Number }
})

export const MongoDBCAnalytics = mongoose.model('Analytics', AnalyticsSchema)

class Analytics {
  private analyticsId: string
  private businessId: string
  private clickCounts: number

  constructor() {
    this.analyticsId = ''
    this.businessId = ''
    this.clickCounts = 0
  }

  public getAnalyticsId(): string {
    return this.analyticsId
  }

  public setBusinessId(businessId: string): void {
    this.businessId = businessId
  }

  public getBusinessId(): string {
    return this.businessId
  }

  public setClickCounts(clickCounts: number): void {
    this.clickCounts = clickCounts
  }

  public getClickedCounts(): number {
    return this.clickCounts
  }

  //   public async saveAnalyticsData(): Promise<void> {
  //     try {
  //       new MongoDBCAnalytics({
  //         	businessId: this.businessId
  //			analyticsId: this.analyticsId
  //			clickCounts: this.clickCounts
  //       }).save()
  //     } catch (err) {
  //       throw err
  //     }
  //   }
}

export default Analytics
