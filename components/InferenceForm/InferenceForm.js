'use client';
import React, { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Circles } from 'react-loader-spinner';
import './Inference.css';

import { collection, addDoc } from 'firebase/firestore';

import Exif from 'exif-js';
import axios from 'axios';
import { db } from '@/utils/firebase';
import { useAuth } from '@/contexts/AuthContext';

// import { dataref } from '../../firebaseConfig/realtimedbconfig';
// import imageCompression from 'browser-image-compression';

function InferenceForm({
  _api_key,
  _version,
  _model,
  _select_file,
  _upload_method,
  _max_overlap,
  _min_confidence,
  _filter_classes,
  _separate_names_with_commas,
  _inference_result,
  _labels,
  _stroke_width,
  _sub_classification_id,
  _email,
  _address,
  _national_id,
  _municipality_id,
  _iqama_id,
  _incident_no,
  _dob,
  _main_classificaiton_id,
  _sub_submunicipality_id,
  _amana_id,
  _sub_municipality_id,
  _priority,
  _first_name,
  _middle_name,
  _mobile_number,
  _issue_discription,
  _last_name,
  _location_direction,
  _run_inference,
  _enter_class_names,
  _browse,
  _url,
  _upload,
  _json,
  _image,
  _on,
  _off,
}) {
  const [api_key, setApiKey] = useState('');
  const [model, setModel] = useState('');
  const [version, setVersion] = useState('');
  const [loading, setLoading] = useState(false);
  const neighborhoodNameRef = useRef([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { setTickets } = useAuth();

  const [uploadMethod, setUploadMethod] = useState('upload');
  const [selectedFile, setSelectedFile] = useState('');
  const [filename, setFilename] = useState(null);
  const fileInputRef = useRef(null);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const [FilterClassName, setFilterClassName] = useState('');
  const [minConfidence, setMinConfidence] = useState(0);
  const [maxOverlap, setMaxOverlap] = useState(0);
  const [SubClassificationID, setSubClassificationID] = useState('');
  const [Email, setEmail] = useState('');
  const [Address, setAddress] = useState('');
  const [NationalID, setNationalID] = useState('');
  const [MunicipalityID, setMunicipalityID] = useState('');
  const [IqamaID, setIqamaID] = useState('');
  const [IncidentNo, setIncidentNo] = useState('');
  const [dob, setDob] = useState('');
  const [MainClassificationID, setMainClassificationID] = useState('');
  const [Sub_SubMunicipalityID, setSub_SubMunicipalityID] = useState('');
  const [AmanaID, setAmanaID] = useState('');
  const [SubMunicipalityID, setSubMunicipalityID] = useState('');
  const [Priority, setPriority] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [MiddleName, setMiddleName] = useState('');
  const [MobileNumber, setMobileNumber] = useState('');
  const [IssueDescription, setIssueDescription] = useState('');
  const [LastName, setLastName] = useState('');
  const [LocationDirection, setLocationDirection] = useState('');

  const handleConfidenceChange = (e) => {
    // Parse the input value as an integer and update the state
    const inputValue = parseInt(e.target.value, 10);
    if (!isNaN(inputValue)) {
      setMinConfidence(inputValue);
    } else {
      setMinConfidence(0); // Reset to 0 if the input is not a valid integer
    }
  };
  const handleOverlapChange = (e) => {
    // Parse the input value as an integer and update the state
    const inputValue = parseInt(e.target.value, 10);
    if (!isNaN(inputValue)) {
      setMaxOverlap(inputValue);
    } else {
      setMaxOverlap(0); // Reset to 0 if the input is not a valid integer
    }
  };

  const [InferenceResult, setInferenceResult] = useState('Image');
  const [label, setLabel] = useState('Off');

  const handleReverseGeocode = async (latitude, longitude) => {
    console.log('latitude', latitude);
    console.log('longitude', longitude);
    const apiKey = 'AIzaSyCrNoNHAylB2QfPkDF_c5q0MPaqh7DGsYc';
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
      );
      if (response.data.error_message) {
        console.log('Error:', response.data.error_message);
      }
      if (response.data && response.data.results && response.data.results[0]) {
        const neighborhoodData = response.data.results[0].address_components;
        const neighborhoods = neighborhoodData.filter(
          (component) =>
            component.types.includes('neighborhood') ||
            component.types.includes('sublocality') ||
            component.types.includes('sublocality_level_1')
        );
        // setNeighborhoodName(neighborhoods[0].long_name);
        console.log('neighborhood', neighborhoods[0].long_name);
        neighborhoodNameRef.current = neighborhoods[0].long_name;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [strokeWidth, setStrokeWidth] = useState('1');

  const handleStrokeClick = (type) => {
    setStrokeWidth(type);
  };

  const handleLabelClick = (type) => {
    setLabel(type);
  };

  async function compressBase64Image(
    base64Image,
    maxWidth,
    maxHeight,
    quality
  ) {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = async function () {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate the new dimensions to fit within maxWidth and maxHeight
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }

        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // Draw the image on the canvas with the new dimensions
        ctx.drawImage(img, 0, 0, width, height);

        // Convert the canvas content back to base64 with compression
        await canvas.toBlob(
          (blob) => {
            const reader = new FileReader();
            reader.onload = function () {
              resolve(reader.result); // Compressed base64 image
            };
            reader.readAsDataURL(blob);
          },
          'image/jpeg',
          quality
        );
      };

      img.src = base64Image;
    });
  }

  const handleRunInference = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!selectedFiles || selectedFiles.length === 0) {
      toast.error('No files selected.', {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setLoading(false);
      return;
    }

    try {
      const results = [];

      for (const file of selectedFiles) {
        try {
          const formData = new FormData();
          formData.append('image', file);

          // Extract latitude and longitude using EXIF data
          const exifData = await new Promise((resolve, reject) => {
            Exif.getData(file, function () {
              try {
                const exifData = Exif.getAllTags(this);
                resolve(exifData);
              } catch (err) {
                reject(err);
              }
            });
          });

          let latitude = null;
          let longitude = null;

          if (exifData.GPSLatitude && exifData.GPSLongitude) {
            latitude =
              exifData.GPSLatitude[0] +
              exifData.GPSLatitude[1] / 60 +
              exifData.GPSLatitude[2] / 3600;
            longitude =
              exifData.GPSLongitude[0] +
              exifData.GPSLongitude[1] / 60 +
              exifData.GPSLongitude[2] / 3600;
          } else {
            toast.error('No GPS data found in image.', {
              position: 'bottom-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
            return;
            console.log('No GPS data found in image.');
            latitude = 24.475219749999997; // Default latitude
            longitude = 39.589692472222225; // Default longitude
          }
          handleReverseGeocode(latitude, longitude);
          const response1 = await axios.post(
            'https://firnas.info/predict',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          if (response1.status === 200) {
            toast.success('Predicted', {
              position: 'bottom-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
            let compressed_image;
            const data = response1.data;
            await compressBase64Image(
              `data:image/png;base64,${data.annotated_image_base64}`,
              640,
              640,
              0.8
            )
              .then((compressedBase64Image) => {
                if (compressedBase64Image.length <= 1048487) {
                  //   console.log(compressedBase64Image);
                  compressed_image = compressedBase64Image;
                  //      console.log("Compressed");
                } else {
                  toast.error('Compressed image size exceeds the limit.', {
                    position: 'bottom-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                  });
                  console.error('Compressed image size exceeds the limit.');
                }
              })
              .catch((error) => {
                toast.error('Error compressing image', {
                  position: 'bottom-center',
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: 'light',
                });
                console.error('Error compressing image:', error);
              });
            const body = {
              SubClassificationID: SubClassificationID,
              Email: Email,
              Address: Address,
              NationalID: NationalID,
              Latitude: latitude.toString(),
              MunicipalityID: MunicipalityID,
              IqamaID: IqamaID,
              IncidentNo: IncidentNo,
              Language: 'ar-SA',
              DOB: dob,
              MainClassificationID: MainClassificationID,
              Sub_SubMunicipalityID: Sub_SubMunicipalityID,
              AmanaID: AmanaID,
              IncidentStartDate: new Date(),
              SubMunicipalityID: SubMunicipalityID,
              IncidentImage: compressed_image,
              Priority: Priority,
              FirstName: FirstName,
              MiddleName: MiddleName,
              Longitude: longitude.toString(),
              DistrictName: neighborhoodNameRef.current,
              MobileNumber: MobileNumber,
              IssueDescription: IssueDescription,
              prediction: data.predictions[0],
              predictionQuantity: data.predictions[1],
              SplClassificationID: data.predictions[0][0],
              LastName: LastName,
              LocationDirection: neighborhoodNameRef.current,
              status: 'New',
            };
            const response2 = await fetch('/api/tickets/new', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(body),
            });
            const data2 = await response2.json();
            if (data2) {
              setTickets((prev) => {
                return [...prev, data2.ticket];
              });
              toast.success(data2?.message, {
                position: 'bottom-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
              });
            }
          }
        } catch (error) {
          toast.error('Error processing image', {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          console.error('Error', error.message);
          results.push({
            success: false,
            message: 'Failed to process the image. Skipping to the next image.',
          });
        }
      }

      // Handle the results array, which contains the success/failure for each file.
      console.log('Results:', results);

      // Clear the selectedFiles array
      setSelectedFiles([]);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error uploading image', {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = (type) => {
    setUploadMethod(type);
  };

  const handleimgjsonButtonClick = (type) => {
    setInferenceResult(type);
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileList = Array.from(files);

      // Process each file in the array
      fileList.forEach((file) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          const base64Image = event.target.result;
          setFilename(file.name);
          setSelectedFile(base64Image);

          Exif.getData(file, function () {
            try {
              const exifData = Exif.getAllTags(this);
              if (exifData.GPSLatitude && exifData.GPSLongitude) {
                const latitude1 =
                  exifData.GPSLatitude[0] +
                  exifData.GPSLatitude[1] / 60 +
                  exifData.GPSLatitude[2] / 3600;
                const longitude1 =
                  exifData.GPSLongitude[0] +
                  exifData.GPSLongitude[1] / 60 +
                  exifData.GPSLongitude[2] / 3600;
                //   console.log("Latitude :" + latitude1);
                //  console.log("Longitude :" + longitude1);
                /*   setCoordinates({
                  LATE: latitude,
                  LONG: longitude,
                });*/
              } else {
                console.log('No GPS data found in image.');
                /*    setCoordinates({
                  LATE: 24.475219749999997, // Default latitude
                  LONG: 39.589692472222225, // Default longitude
                });*/
              }
            } catch (err) {
              console.log('Error reading EXIF data.');
            }
          });

          // Handle the 'file' variable here, e.g., add it to the selectedFiles state
          // You can also perform any other processing specific to each file here
          // Example:
          setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, file]);
        };

        reader.readAsDataURL(file);
      });
    }
  };return (
    <div className="body bg-gray-100 min-h-screen flex items-center justify-center py-10">
      <form
        id="inputForm"
        onSubmit={handleRunInference}
        className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full relative z-10 border-t-4 border-primary-teal"
      >
        <div className="header text-center mb-8">
          <div className="header__grid">
            <img
              src="/assets/images/logo3.png"
              width={220}
              height={80}
              className="mx-auto transition-transform transform hover:scale-110"
              style={{ filter: 'drop-shadow(0 0 10px rgba(3, 169, 160, 0.6))' }}
            />
          </div>
        </div>
  
        <div className="content space-y-6">
          {/* Upload Method Selection */}
          <div id="method" className="text-center">
            <label className="input__label font-semibold text-lg text-gray-700">{_upload_method}</label>
            <div className="mt-2 flex justify-center space-x-4">
              <button
                type="button"
                className={`bttn left fill ${
                  uploadMethod === 'upload' ? 'bg-primary-teal text-white shadow-lg' : 'bg-gray-200 text-gray-700'
                } rounded-full px-4 py-2 transition-colors duration-200`}
                onClick={() => handleButtonClick('upload')}
              >
                {_upload}
              </button>
              <button
                type="button"
                className={`${
    uploadMethod === 'url' 
      ? 'bg-primary-teal text-white shadow-lg' 
      : 'bg-[#0D9488] text-white'
  } bttn right fill rounded-full px-4 py-2 transition-colors duration-200`}
                onClick={() => handleButtonClick('url')}
              >
                {_url}
              </button>
            </div>
          </div>
  
          {/* File Selection */}
          {uploadMethod === 'upload' && (
            <div id="fileSelectionContainer" className="text-center">
              <label className="input__label font-semibold text-lg text-gray-700" htmlFor="file">
                {_select_file}
              </label>
              <div className="flex items-center space-x-2 mt-2">
                <input
                  className="input input--left flex-1 p-2 border rounded-l-full shadow-sm"
                  type="text"
                  id="fileName"
                  value={filename}
                  disabled
                />
                <button
                  type="button"
                  className="bttn right bg-primary-teal text-white rounded-r-full px-4 py-2 shadow-md hover:bg-teal-600"
                  onClick={handleBrowseClick}
                >
                  {_browse}
                </button>
              </div>
              <input
                type="file"
                id="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
                multiple
              />
            </div>
          )}
  
          {/* URL Input */}
          {uploadMethod === 'url' && (
            <div id="urlContainer" className="text-center">
              <label className="input__label font-semibold text-lg text-gray-700" htmlFor="url">
                Enter Image URL
              </label>
              <input
                type="text"
                id="url"
                placeholder="https://path.to/your.jpg"
                value={selectedFile}
                onChange={(e) => setSelectedFile(e.target.value)}
                className="input w-full p-2 border rounded-full shadow-sm mt-2"
              />
            </div>
          )}
  
          {/* User Details */}
          <div className="space-y-4">
            {[
              { label: _email, value: Email, setter: setEmail, type: "email" },
              { label: _address, value: Address, setter: setAddress, type: "text" },
              { label: _national_id, value: NationalID, setter: setNationalID, type: "text" },
              { label: _municipality_id, value: MunicipalityID, setter: setMunicipalityID, type: "text" },
            ].map((field, index) => (
              <div key={index} className="text-left">
                <label className="header__label font-semibold text-gray-700" htmlFor={field.label}>
                  {field.label}
                </label>
                <input
                  className="input w-full p-2 border rounded-full shadow-sm mt-2"
                  type={field.type}
                  id={field.label}
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                />
              </div>
            ))}
          </div>
  
          {/* Submit Button */}
          <div className="text-center mt-6">
            <button
              type="submit"
              className="bttn__primary bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
            >
              {_run_inference}
            </button>
          </div>
        </div>
  
        {/* Result Display */}
        <div id="resultContainer" className="result mt-8 bg-gray-50 p-4 rounded-lg shadow-inner">
          <div className="result__header flex justify-between items-center mb-4">
            <h3 className="headline text-xl font-semibold text-teal-700">Result</h3>
            <a href="#" className="text-teal-500 hover:underline">Copy Code</a>
          </div>
          <pre id="output" className="codeblock text-sm text-gray-700 p-2 rounded bg-white shadow-inner overflow-x-auto">
            here is your json{' '}
          </pre>
        </div>
  
        {/* Loading Spinner */}
        {loading && (
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
            <div className="p-4 rounded-full bg-primary-teal animate-pulse shadow-lg">
              <Circles
                height="80"
                width="80"
                color="#FFFFFF"
                ariaLabel="circles-loading"
                visible={true}
              />
            </div>
          </div>
        )}
  
        {/* Toast Notifications */}
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </form>
    </div>
  );
  
}

export default InferenceForm;
