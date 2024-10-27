import React from 'react'
import TicketForm from '@/app/(components)/TicketForm'

const getTicketById = async (id) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Tickets/${id}`, {
            cache: "no-store"
        })
        if (!res.ok) {
            throw new Error("failed to get ticket.");

        }
        return res.json();
    } catch (error) {
        console.log(error)
    }
}

const TicketPage = async ({ params }) => {
    const EDITMODE = params.id === "new" ? false : true
    let updateTicketData = {}
    getTicketById
    if (EDITMODE) {
        updateTicketData = await getTicketById(params.id)
        updateTicketData = updateTicketData.foundTicket
    }
    else {
        updateTicketData = {
            _id: "new"
        }
    }
    return (
        <TicketForm ticket={updateTicketData} />
    )
}

export default TicketPage