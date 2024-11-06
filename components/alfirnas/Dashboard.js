'use client';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import '@/components/TicketForm/TicketStyle.css';
import { useTranslation } from 'react-i18next';
import TicketForm from '@/components/TicketForm/TicketForm';
import '@/components/local/rtl.css';
import InferenceForm from '@/components/InferenceForm/InferenceForm';
import AlfirnasDashboard from '@/components/AlfirnasLayout/AlfirnasDashboard';
import { db } from '@/utils/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
const IntMap = dynamic(() => import('@/components/intmap/intMap'), {
  ssr: false,
});

const Dashboard = ({
  locale,
  main_page,
  users,
  messages,
  api_key,
  version,
  model,
  select_file,
  upload_method,
  max_overlap,
  min_confidence,
  filter_classes,
  separate_names_with_commas,
  inference_result,
  labels,
  stroke_width,
  sub_classification_id,
  email,
  address,
  national_id,
  municipality_id,
  iqama_id,
  incident_no,
  dob,
  main_classificaiton_id,
  sub_submunicipality_id,
  amana_id,
  sub_municipality_id,
  priority,
  first_name,
  middle_name,
  mobile_number,
  issue_discription,
  last_name,
  location_direction,
  run_inference,
  enter_class_names,
  browse,
  url,
  upload,
  json,
  image,
  on,
  off,
  firnas_aero,
}) => {
  const router = useRouter();
  const [t, i18n] = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [dire, setDirection] = useState('ltr');
  const { currentUser } = useAuth();
  const [user, setUsers] = useState([]);
  const token = localStorage.getItem('token');

  if (!currentUser) {
    router.push('/');
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const query1 = collection(db, 'users');
        const q = query(query1);
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          var newData = querySnapshot.docs.map((doc, index) => ({
            ...doc.data(),
            id: doc.id,
            serial_id: index + 1,
          }));
          console.log(newData);
          setUsers(newData);
        } else {
          console.log('User not found');
        }
      } catch (error) {
        console.error('Error getting user data:', error);
      } finally {
      }
    };

    fetchData();
  }, []);
  const handleMarkerClick = () => {
    console.log(i18n);
    setShowForm(true);
  };

  const dashbaord1 = () => (
    <div style={{ marginTop: 20 }}>
      <InferenceForm
        _api_key={api_key}
        _version={version}
        _model={model}
        _select_file={select_file}
        _upload_method={upload_method}
        _max_overlap={max_overlap}
        _min_confidence={min_confidence}
        _filter_classes={filter_classes}
        _separate_names_with_commas={separate_names_with_commas}
        _inference_result={inference_result}
        _labels={labels}
        _stroke_width={stroke_width}
        _sub_classification_id={sub_classification_id}
        _email={email}
        _address={address}
        _national_id={national_id}
        _municipality_id={municipality_id}
        _iqama_id={iqama_id}
        _incident_no={incident_no}
        _dob={dob}
        _main_classificaiton_id={main_classificaiton_id}
        _sub_submunicipality_id={sub_submunicipality_id}
        _amana_id={amana_id}
        _sub_municipality_id={sub_municipality_id}
        _priority={priority}
        _first_name={first_name}
        _middle_name={middle_name}
        _mobile_number={mobile_number}
        _issue_discription={issue_discription}
        _last_name={last_name}
        _location_direction={location_direction}
        _run_inference={run_inference}
        _enter_class_names={enter_class_names}
        _browse={browse}
        _url={url}
        _upload={upload}
        _json={json}
        _image={image}
        _on={on}
        _off={off}
      />
      <section className="py-5" style={{ background: '#ffffff' }}>
        <section className="py-4 py-xl-5">
          <div className="container">
            <div
              className="text-white bg-primary rounded border-0 border-primary d-flex flex-column justify-content-between flex-lg-row p-4 p-md-5"
              style={{
                paddingBottom: 23,
                marginBottom: '-13px',
                marginTop: '-1px',
              }}
            >
              <div
                className="pb-2 pb-lg-1"
                style={{ marginRight: 0, paddingRight: 0 }}
              >
                <h2
                  className="fw-bold mb-2"
                  style={{
                    fontFamily: 'Raleway, sans-serif',
                    fontSize: 30,
                    color: '#327777',
                    fontWeight: 'bold',
                  }}
                >
                  {t('interactive_map')}
                </h2>
              </div>
            </div>
          </div>
        </section>

        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <IntMap onMarkerClick={handleMarkerClick} alfirnas={true} />
          </div>
          {showForm && (
            <div style={{ flex: 1 }}>
              <TicketForm />
            </div>
          )}
        </div>

        <footer className="text-center">
          <div className="container text-muted py-4 py-lg-5">
            <p className="mb-0" style={{ fontFamily: 'Raleway, sans-serif' }}>
              {firnas_aero} © 2023
            </p>
          </div>
        </footer>
      </section>
    </div>
  );
  return (
    <>
      {currentUser ? (
        <div>
          <AlfirnasDashboard
            locale={locale}
            main_page={main_page}
            users={users}
            messages={messages}
          >
            {dashbaord1()}
          </AlfirnasDashboard>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Dashboard;
