import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	return (
		<div className="container">
			<Formik
				initialValues={{
					email: "",
					password: "",
				}}
				validationSchema={Yup.object({
					email: Yup.string().email("Email must be valid").required("Email is required"),
					password: Yup.string().required("Password is required")
				})}
				onSubmit={async (data) => {
					const response = await actions.login(data)

					if (response.status === 200) {
						toast.success("Login successfull", { position: "bottom-center" })
						navigate("/private")
					} else {
						toast.error(response.response.data.message, { position: "bottom-center" })
					}
				}}
			>
				<Form className="container mt-5">
					<div className="row justify-content-center">
						<div className="col-8 border rounded shadow-sm px-4 py-2">

							<h2 className="text-center">Login</h2>

							<div className="row">
								<div className="col">
									<div className="mb-3">
										<label htmlFor="email" className="form-label">Email address</label>
										<Field type="email" className="form-control" name="email" id="email" aria-describedby="email" />
										<ErrorMessage name="email" component="div" className="form-text text-danger" />
									</div>
								</div>
							</div>

							<div className="row">
								<div className="col">
									<div className="mb-3">
										<label htmlFor="password" className="form-label">Password</label>
										<Field type="password" className="form-control" name="password" id="password" />
										<ErrorMessage name="password" component="div" className="form-text text-danger" />
									</div>
								</div>
							</div>

							<div className="row">
								<div className="col text-center">
									<button type="submit" className="btn btn-primary">Login</button>
								</div>
							</div>

							<div className="row">
								<div className="col text-center">
									<p>Don't have an account? <Link to="/signup">Signup</Link></p>
								</div>
							</div>

						</div>
					</div>
				</Form>
			</Formik>
		</div>
	);
};
