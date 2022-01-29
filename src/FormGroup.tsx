import { ReactNode } from "react";
import { Form } from "react-bootstrap";

const FormGroup = ({ children }: { children: ReactNode }) => {
	return <Form.Group className="mb-3 p-3 border rounded-3">{children}</Form.Group>;
};

export default FormGroup;
