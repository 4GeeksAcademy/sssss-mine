import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";

export const Private = () => {
  const { store, actions } = useContext(Context);
  const [login, setLogin] = useState(true);
  const [user, setUser] = useState(null)

  useEffect(() => {
    actions.protected()
      .then(({ data }) => {
        setUser(data)
      })
      .catch((error) => {
        console.log(error)
        setUser(null)
      })
      .finally(() => {
        setLogin(false)
      })
  }, [])

  if (login) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  } else if (!login && user) {
    return (
      <div className='container mt-3'>
        <h2 className="text-center">Private route</h2>

        <p><strong>Email:</strong> {user.email}</p>
      </div>
    )
  } else {
    return (
      <div className='container mt-3'>
        <h2 className="text-center">Private route</h2>

        <div className="alert alert-danger text-center">
          <p>Private route. Not allowed</p>
        </div>
      </div>
    )
  }
}
