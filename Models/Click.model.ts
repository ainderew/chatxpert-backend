import mongoose from 'mongoose'

const ClickSchema = new mongoose.Schema(
  {
    clickId: { type: mongoose.SchemaTypes.ObjectId, required: true },
    analyticsId: { type: mongoose.Schema.Types.ObjectId, ref: 'Analytics', required: true }
  },
  {
    timestamps: {
      createdAt: 'dateclicked'
    }
  }
)

const MongoDBCAnalytics = mongoose.model('Click', ClickSchema)

class ClickModel {
  private clickId: string
  private analyticsId: string

  constructor() {
    this.clickId = ''
    this.analyticsId = ''
  }

  public getClickId(): string {
    return this.clickId
  }

  public setAnalyticsId(analyticsId: string): void {
    this.analyticsId = analyticsId
  }

  public getAnalyticsId(): string {
    return this.analyticsId
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

export default ClickModel
