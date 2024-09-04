import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export const Signup = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<Formik
				initialValues={{
					email: "",
					password: "",
				}}
				validationSchema={Yup.object({
					email: Yup.string().email("Email must be valid").required("Email is required"),
					password: Yup.string().min(8, "Password must be greater than eight character").required("Password is required")
				})}
				onSubmit={async (data) => {
					const response = await actions.signup(data)
					console.log(response)
					if (response.status === 201) {
						toast.success(response.data.message, { position: "bottom-center" })
					} else {
						toast.error(response.response.data.message, { position: "bottom-center" })
					}
				}}
			>
				<Form className="container mt-5">
					<div className="row justify-content-center">
						<div className="col-8 border rounded shadow-sm px-4 py-2">

							<h2 className="text-center">Signup</h2>

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
									<button type="submit" className="btn btn-primary">Signup</button>
								</div>
							</div>

							<div className="row">
								<div className="col text-center">
									<p>Already have account? <Link to="/login">Login</Link></p>
								</div>
							</div>

						</div>
					</div>
				</Form>
			</Formik>
		</div>
	);
};
