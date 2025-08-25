import React, { useEffect } from "react";
import {
  Form,
  Input,
  Select,
  TimePicker,
  Button,
  message,
  Row,
  Col,
  InputNumber,
} from "antd";
import dayjs from "dayjs";
import { WEEKDAYS, SPECIALTIES, TIME_FORMAT } from "../utils/constants";
const { RangePicker } = TimePicker;

const DoctorsForm = ({
  visible,
  onCancel,
  onSubmit,
  initialValues = null,
  loading = false,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && initialValues) {
      const formData = {
        ...initialValues,
        timeSlots: initialValues.timeSlots
          ? [
              dayjs(initialValues.timeSlots[0], TIME_FORMAT),
              dayjs(initialValues.timeSlots[1], TIME_FORMAT),
            ]
          : undefined,
      };
      form.setFieldsValue(formData);
    } else if (visible) {
      // form.resetFields();
    }
  }, [visible, initialValues, form]);

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      // Simple fields
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("bio", values.bio);
      formData.append("experience_years", values.experience_years);

      // Arrays
      if (values.qualifications) {
        values.qualifications.forEach((q, i) =>
          formData.append(`qualifications[${i}]`, q)
        );
      }
      if (values.schedule) {
        values.schedule.forEach((day, i) =>
          formData.append(`schedule[${i}]`, day)
        );
      }
      if (values.specializations) {
        values.specializations.forEach((sp, i) =>
          formData.append(`specializations[${i}]`, sp)
        );
      }

      // Time slots
      if (values.timeSlots) {
        formData.append("timeSlots[]", values.timeSlots[0].format(TIME_FORMAT));
        formData.append("timeSlots[]", values.timeSlots[1].format(TIME_FORMAT));
      }

      console.log("FormData payload:", formData);

      // Send to API
      await onSubmit(formData); // Make sure your API accepts FormData

      // form.resetFields();
      message.success(
        initialValues
          ? "Doctor updated successfully!"
          : "Doctor added successfully!"
      );
    } catch (error) {
      message.error("Failed to save doctor data. Please try again.");
      console.error("Error submitting doctor form:", error);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        availableDays: [],
        qualifications: [],
        specializations: [],
        schedule: [],
        experience_years: undefined,
        timeSlots: undefined,
      }}
      style={{ width: "100%" }}
    >
      <Row gutter={24}>
        {/* Doctor Name */}
        <Col span={8}>
          <Form.Item
            name="name"
            label="Doctor Name"
            rules={[
              { required: true, message: "Please enter doctor name" },
              { min: 2, message: "Name must be at least 2 characters" },
            ]}
          >
            <Input placeholder="Enter doctor's full name" />
          </Form.Item>
        </Col>

        {/* Doctor Email */}
        <Col span={8}>
          <Form.Item
            name="email"
            label="Doctor Email"
            rules={[
              { required: true, message: "Please enter doctor email" },
              { type: "email", message: "Enter valid email address" },
            ]}
          >
            <Input placeholder="Enter doctor's email" />
          </Form.Item>
        </Col>

        {/* Phone */}
        <Col span={8}>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input placeholder="03001234567" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        {/* Bio */}
        <Col span={8}>
          <Form.Item name="bio" label="Bio">
            <Input.TextArea placeholder="Doctor's bio" rows={1} />
          </Form.Item>
        </Col>

        {/* Experience Years */}
        <Col span={8}>
          <Form.Item
            name="experience_years"
            label="Experience (Years)"
            rules={[
              { required: true, message: "Please enter experience years" },
            ]}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder="Enter experience years"
            />
          </Form.Item>
        </Col>

        {/* Qualifications */}
        <Col span={8}>
          <Form.Item
            name="qualifications"
            label="Qualifications"
            rules={[
              { required: true, message: "Please select qualifications" },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Select qualifications"
              options={[
                { label: "MBBS", value: "MBBS" },
                { label: "FCPS", value: "FCPS" },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        {/* Specializations */}
        <Col span={8}>
          <Form.Item
            name="specializations"
            label="Specializations"
            rules={[
              { required: true, message: "Please select specializations" },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Select specialization"
              options={[
                { label: "SP001 - Primary", value: "SP001" },
                { label: "SP002 - Secondary", value: "SP002" },
              ]}
            />
          </Form.Item>
        </Col>

        {/* Schedule (Days) */}
        <Col span={8}>
          <Form.Item
            name="schedule"
            label="Available Days"
            rules={[{ required: true, message: "Please select days" }]}
          >
            <Select
              mode="multiple"
              placeholder="Select available days"
              options={WEEKDAYS}
            />
          </Form.Item>
        </Col>

        {/* Time Slots */}
        <Col span={8}>
          <Form.Item
            name="timeSlots"
            label="Time Slots"
            rules={[{ required: true, message: "Please select time slots" }]}
          >
            <RangePicker
              format={TIME_FORMAT}
              placeholder={["Start Time", "End Time"]}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Action Buttons */}
      <Row justify="end">
        <Col>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button onClick={onCancel} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {initialValues ? "Update Doctor" : "Add Doctor"}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default DoctorsForm;
