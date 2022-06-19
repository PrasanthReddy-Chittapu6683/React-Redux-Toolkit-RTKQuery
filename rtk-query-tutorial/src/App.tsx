
// import { Counter } from './features/counter/Counter';
import './App.css';
import { useGetContactsQuery, useGetContactByIdQuery, useAddContactMutation, useUpdateContactMutation, useDeleteContactMutation } from './services/contactApi';

function App() {
  const { data, error, isError, isLoading, isFetching, isSuccess, startedTimeStamp, fulfilledTimeStamp, isUninitialized } = useGetContactsQuery();
  console.log(`startedTimeStamp>>>>>`, new Date(startedTimeStamp!))
  console.log(`fulfilledTimeStamp>>>>>`, new Date(fulfilledTimeStamp!))
  console.log(`error>>>>>`, error)
  return (
    <div className='AppBody'>
      <h1 className="App">
        React Redux Toolkit RTK query Basics
      </h1>
      {isLoading && <h2>Loading...</h2>}
      {error && <h2><>
        {`Something went wrong ...`}</></h2>}
      {isFetching && <h2>isFetching...</h2>}
      {isError && <h2>isError...</h2>}
      {isSuccess && <>
        <h2>isSuccess...</h2>
        {data?.map(val => {
          return <div key={val.id}>
            <span>
              {val.name} - ( {val.email} )
            </span>
            <ContactDetails id={val.id} />
          </div>
        })}
      </>
      }<div>

        <AddContactDetails />
      </div>
    </div>
  );
}


export const ContactDetails = ({ id }: { id: string }) => {
  const { data } = useGetContactByIdQuery(id)
  return (
    <>
      <pre>{`User Name: ${data?.username}`}
      </pre>
      <pre>  {`Raw Data: ${JSON.stringify(data, undefined, 1)}`}</pre>
    </>
  )

}
export const AddContactDetails = () => {
  const [addContact] = useAddContactMutation()
  const [updateContact] = useUpdateContactMutation()
  const [deleteContact] = useDeleteContactMutation()
  const { data, isFetching, refetch } = useGetContactsQuery()
  let id = data ? data?.length + 1 : 0
  const contact = {
    "id": id.toString(),
    "name": `Reddy CV ${id.toString()}`,
    "email": `prcv${id.toString()}@gmail.com`,
    "username": `prcv${id.toString()}`
  }

  const updateContactObject = {
    "id": "18",
    "name": `Reddy CV 18 - Updated1`,
    "email": `prcv18Updated@gmail.com1`,
    "username": `prcv18Updated1`
  }

  const addContactDetails = async () => {
    await addContact(contact)
    // refetch()
  }
  const updateContactDetails = async () => {
    await updateContact(updateContactObject)
    // refetch()
  }
  const deleteContactDetails = async () => {
    await deleteContact((id - 1).toString())

    // refetch()
  }

  return (
    <>
      {isFetching && <h2>isFetching...</h2>}
      <button onClick={addContactDetails}>Add Contact</button>
      <button onClick={updateContactDetails}>Update Contact</button>
      <button onClick={deleteContactDetails}>Delete Contact</button>
    </>
  )
}
export default App;
