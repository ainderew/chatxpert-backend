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
  analyticsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Analytics',
    required: true,
  },
  dateclicked: { type: Date, required: true },
  customerAge: { type: Number, required: false },
})

export const MongoDBClick = mongoose.model('Click', ClickSchema)

class Click {
  private clickId: string
  private analyticsId: string
  private dateclicked: Date
  private customerAge: number

  constructor() {
    this.clickId = ''
    this.analyticsId = ''
    this.dateclicked = new Date()
    this.customerAge = 0
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

  public setDateclicked(dateclicked: Date): void {
    this.dateclicked = dateclicked
  }

  public getDateclicked(): Date {
    return this.dateclicked
  }

  public setCustomerAge(customerAge: number): void {
    this.customerAge = customerAge
  }
  public getCustomerAge(): number {
    return this.customerAge
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
