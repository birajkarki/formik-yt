"use client";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useFormik } from "formik";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

const validationSchema = yup.object({
  fullName: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  // .min(3, "min 3 char"),
  password: yup
    .string()
    .min(8, "Password should be at least 8 characters long")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  gender: yup.string().required("Please select a gender"),
  ageGroup: yup.string().required("Please select an age group"),
  days: yup
    .array()
    .min(2, "Select at least 2 days")
    .max(4, "Select at most 4 days")
    .required("Select at least 2 days"),
});

const Register = () => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      ageGroup: "",
      days: [],
      specialLeaveDates: [],
      officeHourStart: "10:00",
      officeHourEnd: "18:00",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      alert(JSON.stringify(values, null, 2));
      resetForm();
    },
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-green-500 p-4">
        <h1 className="text-lg">Registration</h1>
        <form onSubmit={formik.handleSubmit}>
          {/* Full Name */}
          <Label htmlFor="fullName">Full name</Label>
          <Input
            type="text"
            id="fullName"
            placeholder="Enter your full Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fullName}
          />

          {formik.touched.fullName && formik.errors.fullName && (
            <div className="text-red-500">{formik.errors.fullName}</div>
          )}
          {/* Email */}
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Enter your email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500">{formik.errors.email}</div>
          )}
          {/* Password */}
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Enter your password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500">{formik.errors.password}</div>
          )}
          {/* Confirm Password */}
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            {...formik.getFieldProps("confirmPassword")}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-red-500">{formik.errors.confirmPassword}</div>
          )}
          {/* Gender Selection */}
          <div>
            <Label>Gender</Label>
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formik.values.gender === "male"}
                  onChange={formik.handleChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formik.values.gender === "female"}
                  onChange={formik.handleChange}
                />
                Female
              </label>
            </div>
            {formik.touched.gender && formik.errors.gender && (
              <div className="text-red-500">{formik.errors.gender}</div>
            )}
          </div>
          {/* Age Group Selection */}
          <div>
            <Label>Age Group</Label>
            <select name="ageGroup" {...formik.getFieldProps("ageGroup")}>
              <option value="">Select Age Group</option>
              <option value="under18">Under 18</option>
              <option value="19andabove">19 and above</option>
            </select>
            {formik.touched.ageGroup && formik.errors.ageGroup && (
              <div className="text-red-500">{formik.errors.ageGroup}</div>
            )}
          </div>
          {/* Special Leave Dates */}
          <div className="grid grid-cols-2 gap-2">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Government Days
              </label>
              <DatePicker
                placeholder="Select a government day"
                dateFormat={(date) => new Date(date).toDateString()}
                onDelete={(newDates) =>
                  console.log("New government dates:", newDates)
                }
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>

          {/* Office Hours */}
          <div>
            <label>Office Hours Start</label>
            <TimePicker
              id="officeHourStart"
              onChange={(value) =>
                formik.setFieldValue("officeHourStart", value)
              }
              value={formik.values.officeHourStart}
              step={10} // Set the step to 10 minutes interval
            />
          </div>
          <div>
            <label>Office Hours End</label>
            <TimePicker
              id="officeHourEnd"
              onChange={(value) => formik.setFieldValue("officeHourEnd", value)}
              value={formik.values.officeHourEnd}
              step={10} // Set the step to 10 minutes interval
            />
          </div>
          {/* Days Selection with Checkboxes */}
          <div>
            <Label>Select Days (2 to 4)</Label>
            <div className="flex flex-wrap gap-4">
              {[
                "sunday",
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
              ].map((day) => (
                <label key={day} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="days"
                    value={day}
                    checked={formik.values.days.includes(day)}
                    onChange={formik.handleChange}
                  />
                  <span className="ml-2">
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </span>
                </label>
              ))}
            </div>
            {formik.touched.days && formik.errors.days && (
              <div className="text-red-500">{formik.errors.days}</div>
            )}
          </div>
          {/* Submit Button */}
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
