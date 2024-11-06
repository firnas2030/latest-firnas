import { useTranslation } from 'react-i18next';

function DataTable({ data }) {
  const [t] = useTranslation();
  const headers = [
    { label: 'Ticket', key: '_id' },
    { label: 'FirstName', key: 'FirstName' },
    { label: 'Date', key: 'IncidentStartDate' },
    { label: 'LocationDirection', key: 'LocationDirection' },
    { label: 'SubClassificationID', key: 'SubClassificationID' },
    { label: 'category', key: 'SplClassificationID' },
    { label: 'Longitude', key: 'Longitude' },
    { label: 'Latitude', key: 'Latitude' },
    { label: 'Status', key: 'status' },
    { label: 'ImgSource', key: 'ImgSource' },
  ];
  return (
    <div className="w-full overflow-scroll">
      <table className="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            <td width="5%">{t('ticket')}</td>
            <td width="5%">{t('first_Name')}</td>
            <td width="5%">{t('date')}</td>
            <td width="10%">{t('location_direction')}</td>
            <td width="10%">{t('sub_classification_id')}</td>
            <td width="10%">{t('category')}</td>
            <td width="5%">{t('longitude')}</td>
            <td width="5%">{t('latitude')}</td>
            <td width="5%">{t('status')}</td>
            <td width="5%">{t('image_source')}</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.FirstName}</td>
              <td>{item.IncidentStartDate}</td>
              <td>{item.LocationDirection}</td>
              <td>{item.SubClassificationID}</td>
              <td>{item.SplClassificationID}</td>
              <td>{item.Longitude}</td>
              <td>{item.Latitude}</td>
              <td>{item.status}</td>
              <td>{item.IncidentImage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
