import axios from "axios";

const backendUrl = axios.create({
	baseURL: `${process.env.BACKEND_URL}/api`,
})

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null
		},
		actions: {
			signup: async (formData) => {
				try {
					const response = await backendUrl.post("/user", formData)
					return response;
				} catch (error) {
					return error;
				}
			},

			login: async (formData) => {
				try {
					const response = await backendUrl.post("/token", formData);
					localStorage.setItem("token", response.data.token)
					setStore({ token: response.data.token })
					return response;
				} catch (error) {
					return error;
				}
			},

			logout: () => {
				localStorage.removeItem("token")
				setStore({ token: null })
			},

			protected: async () => {
				try {
					const response = await backendUrl.get("/protected", {
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`
						}
					})

					return response
				} catch (error) {
					return error
				}
			},

			syncTokenFromLocalStore: () => {
				const token = localStorage.getItem("token")
				if (token && token != "" && token != undefined) setStore({ token: token })
			}
		}
	};
};

export default getState;
