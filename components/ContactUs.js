import React, { useState } from "react";
import { toast } from "react-toastify";
import { Alert } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.min.css";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";

const ContactUs = () => {
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [t, i18n] = useTranslation();

  const toastifySuccess = () => {
    toast("Form sent!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: "submit-feedback success",
      toastId: "notifyToast",
    });
  };

  const onSubmit = async () => {
    setLoading(true);
    if (
      firstName === "" ||
      lastName === "" ||
      message === "" ||
      email === "" ||
      phonenumber === ""
    ) {
      setSuccess("");
      setError("Input Fields cant be null");
      setLoading(false);
    } else {
      try {
        console.log(firstName, lastName, message);
        const templateParams = {
          firstName,
          lastName,
          email,
          phonenumber,
          message,
        };
        await emailjs.send(
          "service_rikcmhh",
          "template_jhf63ta",
          templateParams,
          "6asEOrXlJfXCZmq_2"
        );

        const docRef = await addDoc(collection(db, "userMessages"), {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phonenumber,
          message: message,
        });

        setFirst("");
        setLast("");
        setEmail("");
        setPhone("");
        setMessage("");
        setSuccess("Message Send Successfully");
        toastifySuccess();
      } catch (e) {
        console.log(e);
        setError("Please Try again Later");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className=" bg-white px-6 lg:px-8">
      <div className="mx-auto text-center">
        <h2 className="text-3xl tracking-tight text-primary-teal1 sm:text-4xl">
          {t("Contact_Us")}
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-500">{t("reach")}</p>
      </div>
      <div className="mx-auto mt-5 max-w-xl sm:mt-20">
        <div>{error && <Alert variant="danger">{error}</Alert>}</div>
        <div>{success && <Alert variant="success">{success}</Alert>}</div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              {t("First_name")}
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="firstname"
                value={firstName}
                onChange={(e) => setFirst(e.target.value)}
                id="first-name"
                placeholder="First Name"
                autoComplete="given-name"
                className="block w-full rounded-md border border-[#ddd] px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              {t("Last_name")}
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="lastname"
                value={lastName}
                placeholder="Last Name"
                onChange={(e) => setLast(e.target.value)}
                id="lastname"
                className="block w-full rounded-md border border-[#ddd] px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="Email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              {t("Email")}
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                id="Email"
                name="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="block w-full rounded-md border border-[#ddd] px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              {t("Phone_Number")}
            </label>
            <div className="mt-2.5">
              <input
                type="tel"
                id="phonenumber"
                name="phonenumber"
                value={phonenumber}
                placeholder="Phone Number"
                required
                onChange={(e) => setPhone(e.target.value)}
                className="block w-full rounded-md border border-[#ddd] px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              {t("Message")}
            </label>
            <div className="mt-2.5">
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="block w-full rounded-md border border-[#ddd] px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={""}
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="button"
            onClick={() => onSubmit()}
            disabled={loading}
            className="block w-full rounded-md bg-primary-teal px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-teal1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-teal"
          >
            {t("Send")}
          </button>
        </div>
        <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
          <div className="text-[#025F5F] font-semibold">
            Email : admin@firnas.aero
          </div>
        </div>

        <div className="container text-muted py-4 py-lg-5">
          <p
            className="mb-0"
            style={{ textAlign: "center", fontFamily: "Raleway, sans-serif" }}
          >
            Firnas Aero © 2023
          </p>
        </div>
      </div>
    </div>
  );
};
export default ContactUs;
