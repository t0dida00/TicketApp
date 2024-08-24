"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const TicketForm = ({ ticket }) => {
    const router = useRouter()
    const startingTicketData = {
        title: "",
        description: "",
        priority: 1,
        progress: 0,
        status: "not Started",
        category: "Hardware Problem"
    }

    const EDITMODE = ticket._id === "new" ? false : true




    const [formData, setFormData] = useState(startingTicketData)
    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        setFormData((preState) => ({
            ...preState,
            [name]: value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (EDITMODE) {
            const res = await fetch(`/api/Tickets/${ticket._id}`, {
                method: "PUT",
                body: JSON.stringify({ formData }),
                //@ts-ignore
                "Content-Type": "application/json",
            });
            if (!res.ok) {
                throw new Error("Failed to update ticket");
            }
        }
        else {
            const res = await fetch("/api/Tickets", {
                method: "POST",
                body: JSON.stringify({ formData }),
                //@ts-ignore
                "Content-Type": "application/json",
            });
            if (!res.ok) {
                throw new Error("Failed to create ticket");
            }
        }



        router.refresh();
        router.push("/");
    }


    if (EDITMODE) {
        startingTicketData["title"] = ticket.title
        startingTicketData["description"] = ticket.description
        startingTicketData["priority"] = ticket.priority
        startingTicketData["progress"] = ticket.progress
        startingTicketData["status"] = ticket.status
        startingTicketData["category"] = ticket.category


    }
    return (
        <div className='flex justify-center '>
            <form className='flex flex-col gap-3 w-1/2' method="post" onSubmit={handleSubmit}>
                <h3>
                    {EDITMODE ? "Update your ticket" : "Create new ticket"}
                </h3>
                <label>Title</label>
                <input id="title"
                    name="title"
                    type="text"
                    onChange={handleChange}
                    required={true}
                    value={formData.title} />
                <label>Description</label>
                <textarea id="description"
                    name="description"
                    type="text"
                    onChange={handleChange}
                    required={true}
                    value={formData.description}
                    rows={5}
                />
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="Hardware Problem">
                        Hardware Problem
                    </option>
                    <option value="Software Problem">
                        Software Problem
                    </option>
                    <option value="Project">
                        Project
                    </option>
                </select>
                <label>
                    Priority
                </label>
                <div>
                    <input id="priority-1" name="priority" type='radio' onChange={handleChange} value={1}
                        checked={formData.priority == 1}
                    >
                    </input>
                    <label>1</label>
                    <input id="priority-2" name="priority" type='radio' onChange={handleChange} value={2}
                        checked={formData.priority == 2}
                    >
                    </input>
                    <label>2</label>
                    <input id="priority-3" name="priority" type='radio' onChange={handleChange} value={3}
                        checked={formData.priority == 3}
                    >
                    </input>
                    <label>3</label>
                    <input id="priority-4" name="priority" type='radio' onChange={handleChange} value={4}
                        checked={formData.priority == 4}
                    >
                    </input>
                    <label>4</label>
                </div>
                <label>
                    Progress
                </label>
                <input type="range" id="progress" name="progress" value={formData.progress} min="0" max="100" onChange={handleChange}></input>
                <label>
                    Status
                </label>
                <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="Not started">
                        Not started
                    </option>
                    <option value="In progressing">
                        In progressing
                    </option>
                    <option value="Done">
                        Done
                    </option>
                </select>
                <input type="submit" className='btn' value={EDITMODE ? "Update Ticket" : "Create Ticket"}>
                </input>
            </form>
        </div>
    )
}

export default TicketForm