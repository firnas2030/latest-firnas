import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/database';
import Ticket from '@/models/ticket';
import axios from 'axios';

export const dynamic = 'force-dynamic';

export const GET = async (req, { params }) => {
  // try {
  //   await connectToDB();

  //   const item = await Ticket.findById(params.id);
  //   if (!item)
  //     return NextResponse.json({ message: 'Item Not Found' }, { status: 404 });
  //   return NextResponse.json({ ticket: item }, { status: 200 });
  try {
    const username = 'Firnas';
    const password = 'Firnas@123';
    const response1 = await axios.post(
      'https://amanati.amana-md.gov.sa/FirnasAPI/Login',
      null,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${username}:${password}`
          ).toString('base64')}`,
        },
      }
    );
    console.log('token', response1.headers['token']);
    if (response1.status === 200) {
      const token = response1.headers['token'];

      const body = {
        TicketNumber: params.id,
        Language: 'en-US',
      };
      const response2 = await axios.get(
        'https://amanati.amana-md.gov.sa/FirnasAPI/GetIncidentstatusdetails',
        body,
        {
          headers: {
            Token: `${response1.headers['token']}`,
          },
        }
      );

      return NextResponse.json({ data: response2.data }, { status: 200 });
    }
  } catch (error) {
    console.log('kh error', error.message);
    return NextResponse.error(error.message, { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
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
    prediction,
    predictionQuantity,
    SplClassificationID,
    LastName,
    LocationDirection,
    status,
  } = await req.json();
  try {
    await connectToDB();
    // Find the existing prompt by ID
    const item = await Ticket.findById(params.id);
    if (!item) {
      return NextResponse.json({ message: 'Item Not Found' }, { status: 404 });
    }
    // Update the Item with new data
    if (SubClassificationID) {
      item.SubClassificationID = SubClassificationID;
    }
    item.Email = Email;
    item.Address = Address;
    item.NationalID = NationalID;
    item.Latitude = Latitude;
    item.MunicipalityID = MunicipalityID;
    item.IqamaID = IqamaID;
    item.IncidentNo = IncidentNo;
    item.Language = Language;
    item.DOB = DOB;
    item.MainClassificationID = MainClassificationID;
    item.Sub_SubMunicipalityID = Sub_SubMunicipalityID;
    item.AmanaID = AmanaID;
    item.IncidentStartDate = IncidentStartDate;
    item.SubMunicipalityID = SubMunicipalityID;
    item.IncidentImage = IncidentImage;
    item.Priority = Priority;
    item.FirstName = FirstName;
    item.MiddleName = MiddleName;
    item.Longitude = Longitude;
    item.DistrictName = DistrictName;
    item.MobileNumber = MobileNumber;
    item.IssueDescription = IssueDescription;
    item.predictionQuantity = predictionQuantity;
    item.prediction = prediction;
    item.SplClassificationID = SplClassificationID;
    item.LastName = LastName;
    item.LocationDirection = LocationDirection;
    item.status = status;
    await item.save();
    return NextResponse.json(
      { message: 'Ticket updated Successfully', ticket: item },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.error(error.message, { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    // Find the item by ID and remove it
    await Ticket.findByIdAndRemove(params.id);
    return new Response('Item deleted successfully', { status: 200 });
  } catch (error) {
    return NextResponse.error(error.message, { status: 500 });
  }
};
