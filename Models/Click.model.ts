import mongoose from 'mongoose'

/* const ClickSchema = new mongoose.Schema(
  {
    analyticsId: { type: mongoose.Schema.Types.ObjectId, ref: 'Analytics', required: true }
  },
  {
    timestamps: {
      createdAt: 'dateclicked'
    }
  }
) */

const ClickSchema = new mongoose.Schema({
  analyticsId: { type: mongoose.Schema.Types.ObjectId, ref: 'Analytics', required: true },
  dateclicked: { type: Date, required: true }
})

export const MongoDBClick = mongoose.model('Click', ClickSchema)

class Click {
  private clickId: string
  private analyticsId: string
  private dateclicked: Date

  constructor() {
    this.clickId = ''
    this.analyticsId = ''
    this.dateclicked = new Date()
  }

  public getClickId(): string {
    return this.clickId
  }

  public setAnalyticsId(analyticsId: string): void {
    this.analyticsId = analyticsId
  }

  public setDateclicked(dateclicked: Date): void {
    this.dateclicked = dateclicked
  }

  public getAnalyticsId(): string {
    return this.analyticsId
  }

  public getDateclicked(): Date {
    return this.dateclicked
  }
  //   public async saveAnalyticsData(): Promise<void> {
  //     try {
  //       new MongoDBCClick({
  //         clickId: this.clickId
  //         analyticsId: this.analyticsId
  //       }).save()
  //     } catch (err) {
  //       throw err
  //     }
  //   }
}

export default Click
