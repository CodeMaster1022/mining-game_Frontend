import React from 'react';
import { Button } from '@/components/ui/button'
import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { deleteTicket, stopTicket } from '@/redux/features/ticketSlice';
import { AppDispatch } from "../../redux/store";

interface Ticket {
    _id: string;
    createdBy: string;
    server: string;
    content: string;
    issues: string[];
    problems: string[];
    description: string;
    status: string;
    ticketNumber: number;
    telegramMessageId: string;
    createdAt: string
}

interface TicketTableProps {
    tickets: Ticket[];
}

const TicketTable: React.FC<TicketTableProps> = ({ tickets }) => {
    
    const dispatch = useDispatch<AppDispatch>();
    const handleStopTicket = (ticketnumber:number) => {
        console.log("=====>")
        const data = {
            ticketNumber: ticketnumber
        }
        dispatch(stopTicket(data))
    }
    const handleDeleteTicket = ( ticketnumber: number) => {
        console.log("=====>")
        const data = {
            ticketNumber: ticketnumber
        }
        dispatch(deleteTicket(data))
    }
    const navigate = useNavigate();

    const handleRowClick = (ticketNumber: number) => {
      navigate(`/messages/${ticketNumber}`);
    };
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">No</th>
                        <th className="py-3 px-6 text-left">Created By</th>
                        <th className="py-3 px-6 text-left">Server</th>
                        <th className="py-3 px-6 text-left">Content</th>
                        <th className="py-3 px-6 text-left">Issues</th>
                        <th className="py-3 px-6 text-left">Problems</th>
                        <th className="py-3 px-6 text-left">Status</th>
                        <th className="py-3 px-6 text-left">Created At</th>
                        <th className="py-3 px-6 text-left">Action</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {tickets.map((ticket) => (
                        <tr key={ticket._id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6" onClick={() => handleRowClick(ticket.ticketNumber)}>{ticket.ticketNumber}</td>
                            <td className="py-3 px-6" onClick={() => handleRowClick(ticket.ticketNumber)}>{ticket.createdBy}</td>
                            <td className="py-3 px-6" onClick={() => handleRowClick(ticket.ticketNumber)}>{ticket.server}</td>
                            <td className="py-3 px-6" onClick={() => handleRowClick(ticket.ticketNumber)}>{ticket.content}</td>
                            <td className="py-3 px-6" onClick={() => handleRowClick(ticket.ticketNumber)}>{ticket.issues.join(', ')}</td>
                            <td className="py-3 px-6" onClick={() => handleRowClick(ticket.ticketNumber)}>{ticket.problems.join(', ')}</td>
                            <td className="py-3 px-6" onClick={() => handleRowClick(ticket.ticketNumber)}>{ticket.status}</td>
                            <td className="py-3 px-6" onClick={() => handleRowClick(ticket.ticketNumber)}>{new Date(ticket.createdAt).toLocaleString()}</td>
                            <td className="py-3 px-2 flex space-x-3">
                                {
                                    ticket.status  == 'stop'? 
                                    (<Button disabled={true}>Stop</Button>):
                                    (<Button onClick={()=>handleStopTicket(ticket.ticketNumber)}>Stop</Button>)
                                }
                                <button
                                    className="inline-flex items-center pl-3 pr-1 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                                    onClick={()=>handleDeleteTicket(ticket.ticketNumber)}
                                    >
                                    <svg
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        className="h-5 w-5 mr-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        strokeWidth="2"
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        ></path>
                                    </svg>
                                    
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TicketTable;