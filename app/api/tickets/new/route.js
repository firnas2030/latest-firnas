import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/database';
import Ticket from '@/models/ticket';

export const dynamic = 'force-dynamic';

export const POST = async (req) => {
  const {
    SubClassificationID,
    Email,
    Address,
    NationalID,
    Latitude,
    MunicipalityID,
    IqamaID,
    IncidentNo,
    Language,
    DOB,
    MainClassificationID,
    Sub_SubMunicipalityID,
    AmanaID,
    IncidentStartDate,
    SubMunicipalityID,
    IncidentImage,
    Priority,
    FirstName,
    MiddleName,
    Longitude,
    DistrictName,
    MobileNumber,
    IssueDescription,
    predictionQuantity,
    prediction,
    SplClassificationID,
    LastName,
    LocationDirection,
    status,
  } = await req.json();

  try {
    await connectToDB();
    const item = new Ticket({
      SubClassificationID,
      Email,
      Address,
      NationalID,
      Latitude,
      MunicipalityID,
      IqamaID,
      IncidentNo,
      Language,
      DOB,
      MainClassificationID,
      Sub_SubMunicipalityID,
      AmanaID,
      IncidentStartDate,
      SubMunicipalityID,
      IncidentImage,
      Priority,
      FirstName,
      MiddleName,
      Longitude,
      DistrictName,
      MobileNumber,
      IssueDescription,
      predictionQuantity,
      prediction,
      SplClassificationID,
      LastName,
      LocationDirection,
      status,
    });
    await item.save();
    return NextResponse.json(
      { message: 'Ticket created successfully', ticket: item },
      { status: 201 }
    );
  } catch (error) {
    console.log('res1 error', error.message);
    return NextResponse.error(error.message, { status: 500 });
  }
};
