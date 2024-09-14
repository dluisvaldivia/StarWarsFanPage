const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      host: "https://playground.4geeks.com/contact/agendas",
      hostSW: 'https://swapi.tech/api',
      contacts: [],
      currentContact: [],
      characters: [],
      slug: "Danny"
    },
    actions: {
      getContacts: async (slug) => {
        const uri = `${getStore().host}/Danny`
        const options = {
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
        }
        const response = await fetch(uri, options);
        if (!response.ok) {
          console.log("Error: ", response.status, response.statusText);
          return false;}
        const data = await response.json()
        console.log(data)
        setStore({agenda: slug, username: slug, contacts: data.contacts})
      },

      postContact: async ({dataToSend}) => {
        const uri = `${getStore().host}/Danny/contacts`
        const options = {
          method: "POST",
          headers: { 'Content-Type': 'application/json'  },
          body: JSON.stringify(dataToSend)
        }
        const response = await fetch(uri, options);
        if (!response.ok) {
          console.log("Error: ", response.status, response.statusText);
          return false;}
          const data = await response.json()
        console.log(data)
        getActions().getContacts();
      },
      
      editContact: async (item, dataToSend) => {
				const uri = `${getStore().host}/Danny/contacts/${item.id}`;
				const options = {
					method: 'PUT',
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify(dataToSend)
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					return;
				}
				getActions().getContacts();
			},

      deleteContact: async (item) => {
        const uri = `${getStore().host}/Danny/contacts/${item.id}`;
        const options = {
          method: "DELETE",
        }
        const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					return;
				}
				await getActions().getContacts();
			}
  }
}
}
export default getState
