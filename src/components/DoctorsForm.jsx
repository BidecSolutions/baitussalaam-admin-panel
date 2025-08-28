import { Form, Input, Button, Row, Col, Select, Upload, TimePicker, InputNumber } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import dayjs from "dayjs";

const DoctorsForm = ({ initialValues, onSubmit, loading, codes }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        start_time: initialValues.start_time
          ? dayjs(initialValues.start_time, "HH:mm")
          : null,
        end_time: initialValues.end_time
          ? dayjs(initialValues.end_time, "HH:mm")
          : null,
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleFinish = (values) => {
    const formData = {};

    // Basic fields
    formData.name = values.name;
    formData.email = values.email;
    formData.phone = values.phone;
    formData.bio = values.bio;
    formData.experience_years = values.experience_years;

    // Time values
    formData.start_time = values.start_time
      ? values.start_time.format("HH:mm")
      : null;
    formData.end_time = values.end_time
      ? values.end_time.format("HH:mm")
      : null;

    // Qualifications → array of ids
    formData.qualifications = values.qualifications?.map((id) => Number(id));

    // Specializations → array of ids
    formData.specializations = values.specializations?.map((id) => Number(id));

    // Working days → array of values
    formData.working_days = values.working_days;

    // Image
    if (values.image?.[0]?.originFileObj) {
      formData.image = values.image[0].originFileObj;
    }

    console.log("🚀 Final Payload:", formData);
    onSubmit(formData);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={initialValues}
    >
      <Row gutter={16}>
        {/* Name */}
        <Col span={8}>
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: "Please enter doctor's name" }]}
          >
            <Input placeholder="Enter doctor's name" />
          </Form.Item>
        </Col>

        {/* Email */}
        <Col span={8}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email", message: "Enter valid email" }]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
        </Col>

        {/* Phone */}
        <Col span={8}>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>
        </Col>

        {/* Experience */}
        <Col span={8}>
          <Form.Item
            name="experience_years"
            label="Experience (Years)"
            rules={[{ required: true, message: "Enter years of experience" }]}
          >
            <InputNumber style={{ width: "100%" }} min={0} placeholder="Years" />
          </Form.Item>
        </Col>

        {/* Bio */}
        <Col span={16}>
          <Form.Item
            name="bio"
            label="Bio"
            rules={[{ required: true, message: "Please enter bio" }]}
          >
            <Input.TextArea rows={1} placeholder="Short bio" />
          </Form.Item>
        </Col>

        {/* Qualifications Multi Select */}
        <Col span={8}>
          <Form.Item
            name="qualifications"
            label="Qualifications"
            rules={[{ required: true, message: "Select qualification(s)" }]}
          >
            <Select mode="multiple" placeholder="Select qualifications">
              {codes.doctor_qualification.map((q) => (
                <Select.Option key={q.id} value={q.id}>
                  {q.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        {/* Specializations Multi Select */}
        <Col span={8}>
          <Form.Item
            name="specializations"
            label="Specializations"
            rules={[{ required: true, message: "Select specialization(s)" }]}
          >
            <Select mode="multiple" placeholder="Select specializations">
              {codes.doctor_specialization.map((s) => (
                <Select.Option key={s.id} value={s.id}>
                  {s.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        {/* Working Days Multi Select */}
        <Col span={8}>
          <Form.Item
            name="working_days"
            label="Working Days"
            rules={[{ required: true, message: "Select working day(s)" }]}
          >
            <Select mode="multiple" placeholder="Select working days">
              {codes.working_day.map((d) => (
                <Select.Option key={d.key} value={d.value}>
                  {d.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        {/* Start Time */}
        <Col span={8}>
          <Form.Item
            name="start_time"
            label="Start Time"
            rules={[{ required: true, message: "Select start time" }]}
          >
            <TimePicker style={{ width: "100%" }} format="HH:mm" />
          </Form.Item>
        </Col>

        {/* End Time */}
        <Col span={8}>
          <Form.Item
            name="end_time"
            label="End Time"
            rules={[{ required: true, message: "Select end time" }]}
          >
            <TimePicker style={{ width: "100%" }} format="HH:mm" />
          </Form.Item>
        </Col>

        {/* Image */}
        <Col span={8}>
          <Form.Item
            name="image"
            label="Profile Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
            rules={[{ required: true, message: "Please upload image" }]}
          >
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
        </Col>
      </Row>

      {/* Buttons */}
      <Row justify="end">
        <Col>
          <Button onClick={() => form.resetFields()} style={{ marginRight: 8 }}>
            Reset
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            {initialValues ? "Update Doctor" : "Add Doctor"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default DoctorsForm;
