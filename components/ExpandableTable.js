import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BarsArrowDownIcon } from '@heroicons/react/24/outline';
function ExpandableTable({ categories, data }) {
  const [t, i18n] = useTranslation();
  const [expandedRows, setExpandedRows] = useState([]);

  const toggleRow = (name) => {
    if (expandedRows.includes(name)) {
      setExpandedRows(expandedRows.filter((row) => row !== name));
    } else {
      setExpandedRows([...expandedRows, name]);
    }
  };

  return (
    <>
      {!data ? (
        <h1 className="text-center p-4">Loading...</h1>
      ) : (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>{t('neighbourhood')}</th>
              {categories.map((item, i) => (
                <th key={`${i}_cat`}>{t(item)}</th>
              ))}
              <th>{t('total')}</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([name, rowData]) => (
              <React.Fragment key={name}>
                <tr onClick={() => toggleRow(name)}>
                  <td>
                    <BarsArrowDownIcon className="h-6 w-6" aria-hidden="true" />
                  </td>
                  <td>{name}</td>
                  {categories.map((item, i) => (
                    <td key={`${i}_tds`}>{rowData[item] || 0}</td>
                  ))}
                  <td>{rowData.TOTAL || 0}</td>
                </tr>
                {expandedRows.includes(name) &&
                  Object.entries(rowData.statusData).map(
                    ([status, predictionData]) => (
                      <React.Fragment key={`${name}-${status}`}>
                        <tr>
                          <td></td>
                          <td>{status}</td>
                          {categories.map((item, i) => (
                            <td key={`${i}_td`}>{predictionData[item] || 0}</td>
                          ))}
                          <td>{predictionData.TOTAL || 0}</td>
                        </tr>
                      </React.Fragment>
                    )
                  )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default ExpandableTable;
