import { useState } from 'react';
import {
    MessageSquare, Clock, CheckCircle, AlertCircle,
    Search, Filter, ChevronDown, X, Send, User,
    Phone, Mail, ArrowUpRight
} from 'lucide-react';

interface Ticket {
    id: string;
    subject: string;
    customerName: string;
    customerEmail: string;
    priority: 'Low' | 'Medium' | 'High' | 'Urgent';
    status: 'Open' | 'In Progress' | 'Waiting on Customer' | 'Resolved' | 'Closed';
    category: string;
    assignedTo: string;
    createdAt: string;
    lastReply: string;
    messages: { sender: string; text: string; time: string; isAgent: boolean }[];
}

const mockTickets: Ticket[] = [
    {
        id: 'TKT-2025-0042', subject: 'Cannot download policy certificate', customerName: 'Meron Tadesse',
        customerEmail: 'meron@email.com', priority: 'High', status: 'Open', category: 'Documents',
        assignedTo: 'Fatima H.', createdAt: '2025-01-18T09:30:00', lastReply: '2025-01-18T10:15:00',
        messages: [
            { sender: 'Meron Tadesse', text: 'I\'ve been trying to download my policy certificate for the past 2 days but I keep getting an error. My policy number is POL-MTR-2025-0891.', time: '09:30', isAgent: false },
            { sender: 'Fatima H.', text: 'Hi Meron, thank you for contacting us. Let me look into this for you right away. Can you tell me which browser you\'re using?', time: '10:15', isAgent: true },
        ]
    },
    {
        id: 'TKT-2025-0041', subject: 'Claim status not updating', customerName: 'Dawit Haile',
        customerEmail: 'dawit@email.com', priority: 'Medium', status: 'In Progress', category: 'Claims',
        assignedTo: 'Bekele A.', createdAt: '2025-01-17T14:20:00', lastReply: '2025-01-18T08:00:00',
        messages: [
            { sender: 'Dawit Haile', text: 'My claim CLM-2025-0234 has been stuck on "Under Review" for 2 weeks now. Can someone please provide an update?', time: '14:20', isAgent: false },
        ]
    },
    {
        id: 'TKT-2025-0040', subject: 'How to add family member to health plan', customerName: 'Sara Bekele',
        customerEmail: 'sara@email.com', priority: 'Low', status: 'Waiting on Customer', category: 'Policies',
        assignedTo: 'Hiwot T.', createdAt: '2025-01-17T11:00:00', lastReply: '2025-01-17T15:30:00',
        messages: [
            { sender: 'Sara Bekele', text: 'I recently had a baby and would like to add my child to my health insurance policy. What documents do I need?', time: '11:00', isAgent: false },
            { sender: 'Hiwot T.', text: 'Congratulations! To add your newborn, we need: 1) Birth certificate, 2) Your ID copy. Please upload these and I\'ll process the endorsement.', time: '15:30', isAgent: true },
        ]
    },
    {
        id: 'TKT-2025-0039', subject: 'Payment failed but amount deducted', customerName: 'Yonas Girma',
        customerEmail: 'yonas@email.com', priority: 'Urgent', status: 'Open', category: 'Payments',
        assignedTo: 'Unassigned', createdAt: '2025-01-18T08:45:00', lastReply: '2025-01-18T08:45:00',
        messages: [
            { sender: 'Yonas Girma', text: 'I tried to pay my premium via TeleBirr and the money was deducted but the system shows payment failed. Amount: ETB 12,500. Transaction ID: TBR-9876543.', time: '08:45', isAgent: false },
        ]
    },
    {
        id: 'TKT-2025-0038', subject: 'Request for coverage letter', customerName: 'Tigist Mengistu',
        customerEmail: 'tigist@email.com', priority: 'Low', status: 'Resolved', category: 'Documents',
        assignedTo: 'Fatima H.', createdAt: '2025-01-16T10:00:00', lastReply: '2025-01-16T16:00:00',
        messages: [
            { sender: 'Tigist Mengistu', text: 'I need an official coverage letter for my visa application. Can you issue one?', time: '10:00', isAgent: false },
            { sender: 'Fatima H.', text: 'Your coverage letter has been generated and attached to your documents section. Please check your portal.', time: '16:00', isAgent: true },
        ]
    },
];

const cannedResponses = [
    'Thank you for contacting us. Let me look into this for you right away.',
    'I\'ve escalated this issue to our technical team. You should hear back within 24 hours.',
    'Could you please provide your policy number so I can assist you better?',
    'Your issue has been resolved. Is there anything else I can help you with?',
    'I apologize for the inconvenience. We are working to resolve this as quickly as possible.',
];

export default function SupportView() {
    const [tickets] = useState<Ticket[]>(mockTickets);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [newMessage, setNewMessage] = useState('');
    const [showCannedResponses, setShowCannedResponses] = useState(false);

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'Urgent': return 'bg-red-100 text-red-800 border-red-200';
            case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'Medium': return 'bg-amber-100 text-amber-800 border-amber-200';
            case 'Low': return 'bg-gray-100 text-gray-700 border-gray-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Open': return 'bg-blue-100 text-blue-800';
            case 'In Progress': return 'bg-amber-100 text-amber-800';
            case 'Waiting on Customer': return 'bg-purple-100 text-purple-800';
            case 'Resolved': return 'bg-emerald-100 text-emerald-800';
            case 'Closed': return 'bg-gray-100 text-gray-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    const filtered = tickets
        .filter(t => filterStatus === 'all' || t.status === filterStatus)
        .filter(t =>
            searchQuery === '' ||
            t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.id.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const openCount = tickets.filter(t => t.status === 'Open').length;
    const inProgressCount = tickets.filter(t => t.status === 'In Progress').length;
    const resolvedCount = tickets.filter(t => t.status === 'Resolved' || t.status === 'Closed').length;

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;
        alert(`Message sent: "${newMessage}"`);
        setNewMessage('');
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Support Center</h1>
                <p className="text-sm text-gray-600 mt-1">Customer support tickets and help desk management</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-medium text-gray-600">Open Tickets</p>
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                            <AlertCircle className="w-5 h-5 text-blue-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-blue-600">{openCount}</p>
                    <p className="text-xs text-gray-500 mt-2">Awaiting response</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-medium text-gray-600">In Progress</p>
                        <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                            <Clock className="w-5 h-5 text-amber-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-amber-600">{inProgressCount}</p>
                    <p className="text-xs text-gray-500 mt-2">Being worked on</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-medium text-gray-600">Resolved</p>
                        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-emerald-600">{resolvedCount}</p>
                    <p className="text-xs text-gray-500 mt-2">This month</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-medium text-gray-600">Avg Response</p>
                        <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                            <MessageSquare className="w-5 h-5 text-purple-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">2.4h</p>
                    <div className="flex items-center gap-1 mt-2">
                        <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                        <p className="text-xs text-emerald-600 font-semibold">18% faster</p>
                    </div>
                </div>
            </div>

            {/* Main Content: Ticket List + Detail */}
            <div className="grid grid-cols-5 gap-6 min-h-[600px]">
                {/* Ticket List */}
                <div className="col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-gray-100 space-y-3">
                        <div className="relative">
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search tickets..."
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                            />
                        </div>
                        <div className="relative">
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full appearance-none pl-9 pr-8 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white cursor-pointer"
                            >
                                <option value="all">All Status</option>
                                <option value="Open">Open</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Waiting on Customer">Waiting on Customer</option>
                                <option value="Resolved">Resolved</option>
                            </select>
                            <Filter className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
                        {filtered.map((ticket) => (
                            <button
                                key={ticket.id}
                                onClick={() => setSelectedTicket(ticket)}
                                className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${selectedTicket?.id === ticket.id ? 'bg-emerald-50 border-l-4 border-emerald-600' : ''
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-1.5">
                                    <p className="text-sm font-semibold text-gray-900 truncate mr-2">{ticket.subject}</p>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border whitespace-nowrap ${getPriorityColor(ticket.priority)}`}>
                                        {ticket.priority}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    <p className="text-xs text-gray-500">{ticket.id}</p>
                                    <span className="text-gray-300">·</span>
                                    <p className="text-xs text-gray-500">{ticket.customerName}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${getStatusColor(ticket.status)}`}>
                                        {ticket.status}
                                    </span>
                                    <p className="text-[10px] text-gray-400">{new Date(ticket.createdAt).toLocaleDateString()}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Ticket Detail */}
                <div className="col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
                    {selectedTicket ? (
                        <>
                            {/* Detail Header */}
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{selectedTicket.subject}</h3>
                                        <p className="text-sm text-gray-500 mt-1">{selectedTicket.id} · {selectedTicket.category}</p>
                                    </div>
                                    <button onClick={() => setSelectedTicket(null)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                                        <X className="w-5 h-5 text-gray-400" />
                                    </button>
                                </div>
                                <div className="flex items-center gap-4 mt-4">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-700">{selectedTicket.customerName}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-700">{selectedTicket.customerEmail}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-700">+251 9xx xxx xxx</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 mt-4">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedTicket.status)}`}>
                                        {selectedTicket.status}
                                    </span>
                                    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold border ${getPriorityColor(selectedTicket.priority)}`}>
                                        {selectedTicket.priority}
                                    </span>
                                    <span className="text-xs text-gray-500">Assigned to: <strong>{selectedTicket.assignedTo}</strong></span>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                                {selectedTicket.messages.map((msg, idx) => (
                                    <div key={idx} className={`flex ${msg.isAgent ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[75%] rounded-2xl p-4 ${msg.isAgent
                                                ? 'bg-emerald-600 text-white rounded-br-md'
                                                : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md'
                                            }`}>
                                            <p className={`text-xs font-semibold mb-1 ${msg.isAgent ? 'text-emerald-100' : 'text-gray-500'}`}>
                                                {msg.sender} · {msg.time}
                                            </p>
                                            <p className="text-sm leading-relaxed">{msg.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Reply Box */}
                            <div className="p-4 border-t border-gray-100">
                                {showCannedResponses && (
                                    <div className="mb-3 bg-gray-50 rounded-xl p-3 border border-gray-200">
                                        <p className="text-xs font-semibold text-gray-600 mb-2">Quick Replies</p>
                                        <div className="space-y-1.5">
                                            {cannedResponses.map((resp, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => { setNewMessage(resp); setShowCannedResponses(false); }}
                                                    className="w-full text-left text-sm text-gray-700 px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                                                >
                                                    {resp}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-end gap-3">
                                    <button
                                        onClick={() => setShowCannedResponses(!showCannedResponses)}
                                        className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex-shrink-0"
                                        title="Quick replies"
                                    >
                                        <MessageSquare className="w-5 h-5 text-gray-500" />
                                    </button>
                                    <textarea
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type your reply..."
                                        rows={2}
                                        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={!newMessage.trim()}
                                        className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-center p-8">
                            <div>
                                <div className="w-20 h-20 bg-gray-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                                    <MessageSquare className="w-10 h-10 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">Select a Ticket</h3>
                                <p className="text-sm text-gray-500">Choose a ticket from the list to view its details and conversation.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
