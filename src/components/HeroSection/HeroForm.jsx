import React, { useEffect } from "react";
import { Form, Input, Button, Row, Col, Switch, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const HeroForm = ({ visible, onCancel, onSubmit, initialValues = null, loading = false }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && initialValues) {
      form.setFieldsValue({
        ...initialValues,
        is_active: initialValues.is_active === 1,
        image_path: initialValues.image_path
          ? [
              {
                uid: "-1",
                name: initialValues.image_alt || "image",
                status: "done",
                url: `${import.meta.env.VITE_BASE_IMAGE_URL_LIVE}${initialValues.image_path}`,
              },
            ]
          : [],
      });
    } else if (visible) {
      form.resetFields();
    }
  }, [visible, initialValues, form]);

  const handleSubmit = async (values) => {
    try {
      const formData = {
        ...values,
        is_active: values.is_active ? 1 : 0,
        // handle uploaded file
        image_path: values.image_path && values.image_path[0]?.originFileObj
          ? values.image_path[0].originFileObj
          : null,
      };

      await onSubmit(formData);

      console.log('first', values);

      form.resetFields();
      message.success(initialValues ? "Hero updated successfully!" : "Hero added successfully!");
    } catch (error) {
      message.error("Failed to save hero data. Please try again.");
      console.error("Error submitting hero form:", error);
    }
  };

  return (
    <div style={{ maxHeight: "70vh", overflowY: "auto", padding: "20px 10px 10px 10px" }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ width: "100%", fontSize: "16px" }}
      >
        {/* Row 1 */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="heading"
              label="Heading"
              rules={[{ required: true, message: "Please enter heading" }]}
            >
              <Input size="large" placeholder="Enter heading" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="sub_heading"
              label="Sub Heading"
              rules={[{ required: true, message: "Please enter sub heading" }]}
            >
              <Input size="large" placeholder="Enter sub heading" />
            </Form.Item>
          </Col>
        </Row>

        {/* Row 2 */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="image_alt" label="Image Alt">
              <Input size="large" placeholder="Enter image alt text" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="image_path"
              label="Image"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            >
              <Upload beforeUpload={() => false} listType="picture" maxCount={1}>
                <Button size="large" icon={<UploadOutlined />}>
                  Upload Image
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        {/* Row 3 */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="button1_text" label="Button 1 Text">
              <Input size="large" placeholder="Enter Button 1 text" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="button1_link" label="Button 1 Link">
              <Input size="large" placeholder="Enter Button 1 link" />
            </Form.Item>
          </Col>
        </Row>

        {/* Row 4 */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="button2_text" label="Button 2 Text">
              <Input size="large" placeholder="Enter Button 2 text" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="button2_link" label="Button 2 Link">
              <Input size="large" placeholder="Enter Button 2 link" />
            </Form.Item>
          </Col>
        </Row>

        {/* Row 5 */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="is_active" label="Status" valuePropName="checked">
              <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
            </Form.Item>
          </Col>
        </Row>

        {/* Row 6 (Description full width) */}
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please enter description" }]}
            >
              <Input.TextArea size="large" rows={6} placeholder="Enter description" />
            </Form.Item>
          </Col>
        </Row>

        {/* Buttons */}
        <Row justify="end">
          <Col>
            <Form.Item style={{ marginBottom: 0 }}>
              <Button onClick={onCancel} style={{ marginRight: 8 }} size="large">
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={loading} size="large">
                {initialValues ? "Update Hero" : "Add Hero"}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default HeroForm;
