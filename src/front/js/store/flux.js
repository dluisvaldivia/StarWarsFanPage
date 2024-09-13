const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      host: "https://playground.4geeks.com/contact/agendas",
      hostSW: 'https://swapi.tech/api',
      agenda: "Danny",
      contacts: [],
      addContact: {},
      username: "",
      characters: [],
    },
    actions: {
      setUsername: (username) => {
        setStore({ username });
      },
      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
          const data = await resp.json()
          setStore({ message: data.message })
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error)
        }
      },
      getAgenda: async (slug) => {
        const uri = `${getStore().host}/${slug}`
        const options = {
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
        }
        const response = await fetch(uri, options);
        if (!response.ok) {
          console.log("Error: ", response.status, response.statusText);
          return false;
        }
        const data = await response.json()
        console.log(data)
        setStore({agenda: slug, username: slug, contacts: data.contacts})
      },
      postAgenda: async (slug) => {
        const uri = `${getStore().host}/${slug}`
        const options = {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
        }
        const response = await fetch(uri, options);
        if (!response.ok) {
          console.log("there's been an error!", response.status, response.statusText)
          return
        }
        setStore({ username: slug, agenda: slug });
      },


      //POST CONTACT
      postContact: async (dataToSend) => {
				const uri = `${getStore().host}/agendas/${getStore().slug}/contacts`;
				const options = {
					method: 'POST',
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify(dataToSend)
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					return;};
				getActions().getContacts();
			},
      //EDIT AGENDA CONTACT
      //DEL AGENCONTACT
      //GET CHARACTERS
      
    },
  };
};

export default getState;
