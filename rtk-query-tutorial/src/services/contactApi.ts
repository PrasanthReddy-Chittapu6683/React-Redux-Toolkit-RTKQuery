import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { url } from 'inspector';
import { iContact } from '../models/contact.modal';

// Define a service using a base URL and expected endpoints
export const contactApi = createApi({
    reducerPath: 'contactApi',
    refetchOnReconnect: true,
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3005/' }),
    tagTypes: ['iContact'],
    endpoints: (builder) => ({
        /**Get the list of Contact Details */
        getContacts: builder.query<iContact[], void>({
            query: () => `/contacts`,
            providesTags: (result, error, arg) => {
                if (result) {
                    let asd = [...result.map(({ id, name }) => ({ type: 'iContact' as const, myName: name, id })), 'iContact']
                    return [...result.map(({ id, name }) => ({ type: 'iContact' as const, myName: name, id })), 'iContact'];
                } else {
                    return ['iContact']
                }

            }

        }),
        /**Get the Contact Details based on Id*/
        getContactById: builder.query<iContact, string>({
            query: (id) => `/contacts/${id}`,
            providesTags: ['iContact']
        }),
        addContact: builder.mutation<void, iContact>({
            query: (contact) => ({
                url: `/contacts`,
                method: 'POST',
                body: contact

            }),
            invalidatesTags: ['iContact']
        }),
        updateContact: builder.mutation<void, iContact>({
            query: ({ id, ...rest }) => ({
                url: `/contacts/${id}`,
                method: 'PUT',
                body: rest

            }),
            invalidatesTags: ['iContact']
        }),
        deleteContact: builder.mutation<void, string>({
            query: (id) => ({
                url: `/contacts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['iContact']
        })
    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetContactsQuery, useGetContactByIdQuery,
    useAddContactMutation, useUpdateContactMutation, useDeleteContactMutation, } = contactApi