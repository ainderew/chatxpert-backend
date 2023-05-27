import mongoose from 'mongoose';

const AnalyticsSchema = new mongoose.Schema({
  businessId: { type: String },
  messageId: { type: String },
  searchTerm: { type: String },
  createdAt: { type: Date },
});
const MongoDBCAnalytics = mongoose.model('Analytics', AnalyticsSchema);

class AnalyticsModel {
  private analyticsId: string;
  private businessId: string;
  private messageId: string;
  private searchTerm: string;
  private createdAt: Date;

  constructor() {
    this.analyticsId = '';
    this.businessId = '';
    this.messageId = '';
    this.searchTerm = '';
    this.createdAt = new Date();
  }

  public setBusinessId(businessId: string): void {
    this.businessId = businessId;
  }

  public setMessageId(messageId: string): void {
    this.messageId = messageId;
  }

  public setSearchTerm(searchTerm: string): void {
    this.searchTerm = searchTerm;
  }

  public getBusinessId(): string {
    return this.businessId;
  }

  public getMessageId(): string {
    return this.messageId;
  }

  public async saveAnalyticsData(): Promise<void> {
    try {
      new MongoDBCAnalytics({
        businessId: this.businessId,
        messageId: this.messageId,
        searchTerm: this.searchTerm,
        createdAt: this.createdAt,
      }).save();
    } catch (err) {
      throw err;
    }
  }
}

export default AnalyticsModel
