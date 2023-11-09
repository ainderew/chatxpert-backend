import mongoose from 'mongoose';

const BusinessSchema = new mongoose.Schema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: { type: String, required: true, unique: true },
  size: { type: String },
  industry: { type: String, required: true },
  location: {
    country: { type: String },
    province: { type: String },
    cityOrMunicipality: { type: String },
    specifics: { type: String },
  },
  website: { type: String, required: true, unique: true },
  photo: { type: String, required: true, unique: true }
});

export const MongoDBBusiness = mongoose.model('Business', BusinessSchema);

class Business {
  private businessId: string;
  private name: string;
  private size: string;
  private industry: string;
  private location: {
    country: string;
    province: string;
    cityOrMunicipality: string;
    specifics: string;
    
  };
  private website: string;
  private photo: string;

  constructor() {
    this.businessId = '';
    this.name = '';
    this.size = '';
    this.industry = '';
    this.location = {
      country: '',
      province: '',
      cityOrMunicipality: '',
      specifics: '',
    },
    this.website = ''
    this.photo = ''
  }

  public setBusinessId(businessId: string): void {
    this.businessId = businessId;
  }

  public getBusinessId(): string {
    return this.businessId;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public setSize(size: string): void {
    this.size = size;
  }

  public getSize(): string {
    return this.size;
  }

  public setIndustry(industry: string): void {
    this.industry = industry;
  }

  public getIndustry(): string {
    return this.industry;
  }

  public setLocation(location: {
    country: string;
    province: string;
    cityOrMunicipality: string;
    specifics: string;
  }): void {
    this.location = location;
  }

  public getLocation(): {
    country: string;
    province: string;
    cityOrMunicipality: string;
    specifics: string;
  } {
    return this.location;
  }

  public setWebsite(website: string): void {
    this.website = website;
  }

  public getWebsite(): string {
    return this.website;
  }
  
  public setPhoto(photo: string): void {
    this.photo = photo;
  }

  public getPhoto(): string {
    return this.photo;
  }
}

export default Business;
