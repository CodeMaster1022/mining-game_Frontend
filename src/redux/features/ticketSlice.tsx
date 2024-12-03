import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/services/api';
// import { User } from 'lucide-react';

// Define the initial state using an interface

interface Message {
    _id: string
    ticketId: string
    content: string
    sender: string
    ticketNumber: string
    createdAt: string
    updatedAt: string
  }
  
  interface Ticket {
    _id: string
    createdBy: string
    server: string
    content: string
    issues: string[]
    problems: string[]
    description: string
    status: string
    ticketNumber: string
    createdAt: string
    updatedAt: string
  }

  interface TicketData {
    ticket: Ticket
    messages: Message[]
  }
interface TicketState {
    tickets: TicketData[],
    isAdded: boolean,
    loading: boolean;
    error: string | null;
}
interface credentials {
    createdBy: string;
    server: string; // Adjust type if needed
    content: string; // Adjust type if needed
    issues: string[]; // Assuming addoption is an array of strings
    problems: string[]; // Assuming addchannel is an array of strings
    description: string | '';
}
// Define initial state
const initialState: TicketState = {
    tickets: [],
    isAdded: false,
    loading: false,
    error: null,
};

// Async thunk for user registration


// Async thunk for user login

export const getTicketMessage = createAsyncThunk(
    'ticket/getTicketMessage',
    async (credentials: { username: string}, { rejectWithValue }) => {
        try {
            console.log(credentials,"----------");
            const data = {
                username: credentials
            }
            const url = `/tickets/getMessage`;
            const response = await api.post(url, data);
            return response.data; // Assuming the response contains user data and token
        } catch (error) {
            console.error("Login error:", error);
            return rejectWithValue(error);
        }
    }
);
export const stopTicket = createAsyncThunk(
    'ticket/stopTicket',
    async (credentials: { ticketNumber: number}, { rejectWithValue }) => {
        try {
            console.log(credentials,"----------");
            const url = `/tickets/stopTicket`;
            const response = await api.post(url, credentials);
            return response.data; // Assuming the response contains user data and token
        } catch (error) {
            console.error("Login error:", error);
            return rejectWithValue(error);
        }
    }
);
export const deleteTicket = createAsyncThunk(
    'ticket/deleteTicket',
    async (credentials: { ticketNumber: number}, { rejectWithValue }) => {
        try {
            console.log(credentials,"----------");
            const url = `/tickets/deleteTicket`;
            const response = await api.post(url, credentials);
            return response.data; // Assuming the response contains user data and token
        } catch (error) {
            console.error("Login error:", error);
            return rejectWithValue(error);
        }
    }
);
export const createTicktes = createAsyncThunk(
    'ticket/createTicktes',
    async (credentials:credentials, { rejectWithValue }) => {
        try {
            const url = `/tickets/createTicket`;
            const response = await api.post(url, credentials);
            return response.data; // Assuming the response contains user data and token
        } catch (error) {
            console.error("Login error:", error);
            return rejectWithValue(error);
        }
    }
);
// Create the auth slice
const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTicketMessage.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTicketMessage.fulfilled, (state, action: PayloadAction<TicketData>) => {
                state.loading = false;
                state.tickets.push(action.payload); // Save user data on successful login
            })
            .addCase(getTicketMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Handle error during login
            })  
            .addCase(createTicktes.pending, (state) => {
                state.loading = true;
            })
            .addCase(createTicktes.fulfilled, (state) => {
                console.log('======================>, is fullfiled')
                state.loading = false;
                state.isAdded = true;
            })
            .addCase(createTicktes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Handle error during login
            }) 
            .addCase(stopTicket.pending, (state) => {
                state.loading = true;
            })
            .addCase(stopTicket.fulfilled, (state) => {
                console.log('======================>, is fullfiled')
                state.loading = false;
            })
            .addCase(stopTicket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Handle error during login
            })    
            .addCase(deleteTicket.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTicket.fulfilled, (state) => {
                console.log('======================>, is fullfiled')
                state.loading = false;
            })
            .addCase(deleteTicket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Handle error during login
            })             
    },
});

// Export actions and reducer
export default ticketSlice.reducer;