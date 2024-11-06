import { Schema, model, models } from 'mongoose';

const TicketSchema = new Schema({
  SubClassificationID: { type: String },
  Email: { type: String },
  Address: { type: String },
  NationalID: { type: String },
  Latitude: { type: String },
  MunicipalityID: { type: String },
  IqamaID: { type: String },
  IncidentNo: { type: String },
  Language: { type: String },
  DOB: { type: String },
  MainClassificationID: { type: String },
  Sub_SubMunicipalityID: { type: String },
  AmanaID: { type: String },
  IncidentStartDate: { type: Date, default: new Date() },
  SubMunicipalityID: { type: String },
  IncidentImage: { type: String },
  Priority: { type: String },
  FirstName: { type: String },
  MiddleName: { type: String },
  Longitude: { type: String },
  DistrictName: { type: String },
  MobileNumber: { type: String },
  IssueDescription: { type: String },
  prediction: { type: Array },
  predictionQuantity: { type: Number },
  SplClassificationID: { type: String },
  LastName: { type: String },
  LocationDirection: { type: String },
  status: { type: String, default: 'مفتوحة' },
});

const Ticket = models.Ticket || model('Ticket', TicketSchema);

export default Ticket;
