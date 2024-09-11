const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      host: "https://playground.4geeks.com/contact/agendas",
      hostContact: `https://playground.4geeks.com/contact/agendas/`,
      agenda: [],
      contacts: {},
      username: "",
    },
    actions: {
      setUsername: (username) => {
        setStore({ username });  // Action to set the username
      },
      getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

      //GET AGENDA
      getAgenda: async (agendaData) => {
        const store = getStore()
        const slug = agendaData.slug
        const uri = `${store.host}/${slug}`
        const options = {
            method: "GET",
            headers: {'Content-Type': 'application/json'},
          }
          const response = await fetch(uri, options);
        if (!response.ok) {
          console.log("Error: ", response.status, response.statusText);
          return;}
        const data = await response.json();
          console.log("Data is = ", data);
          
              },
      //POST AGENDA
      postAgenda: async (agendaData) => {
        const store = getStore()
        const slug = agendaData.slug
        const uri = `${store.host}/${slug}`
        const options = {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(agendaData)
        }
        const response = await fetch(uri, options);
        if (!response.ok) {
          console.log("Error: ", response.status, response.statusText);
          return;}
        const data = await response.json();
          console.log("Data is = ", data);
          
          setStore({ agenda: [...store.agenda, data] });

      },
      //DEL AGENDA 

      //GET CONTACTS
      //POST CONTACT
      postContact: async (contactData) => {
        const store = getStore();
        const uri = store.hostContact;
        const options = {
          method: "POST",
		  headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(contactData),
    }
        
        const response = await fetch(uri, options);
        if (!response.ok) {
          console.log("Error: ", response.status, response.statusText);
          return;
        }
        const data = await response.json();
        console.log("Data is = ", data);
        postContact(contactData.results);
        
        setStore({ contacts: [...store.contacts, data] });
      },

      //EDIT AGENDA CONTACT
      //DEL AGENCONTACT
      //POST CONTACT
    },
  };
};

export default getState;
