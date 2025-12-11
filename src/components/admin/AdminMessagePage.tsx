import { useEffect, useState } from 'react';
import { db } from '../../firebase'; // Adjust the path according to your project structure
import { ref, onValue } from 'firebase/database';

export function AdminMessagePage() {
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        const messagesRef = ref(db, 'contacts');
        onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const parsedMessages = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
                setMessages(parsedMessages);
            } else {
                setMessages([]);
            }
        });
    }, []);

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            <h1 className="text-xl md:text-2xl font-bold text-[#c9a227] mb-6">Messages</h1>
            <div className="overflow-x-auto rounded-xl shadow-lg">
                <table className="min-w-max w-full text-left">
                    <thead>
                        <tr className="bg-[#c9a227]/10 text-[#c9a227]">
                            <th className="p-3 text-xs md:text-sm">Name</th>
                            <th className="p-3 text-xs md:text-sm">Email</th>
                            <th className="p-3 text-xs md:text-sm">Message</th>
                            <th className="p-3 text-xs md:text-sm">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.length > 0 ? (
                            messages.map((message) => (
                                <tr key={message.id} className="border-b border-[#c9a227]/10">
                                    <td className="p-3 text-sm md:text-base text-[#efe9d6]">
                                        {message.name}
                                    </td>
                                    <td className="p-3 text-sm md:text-base text-[#efe9d6]">
                                        {message.email}
                                    </td>
                                    <td className="p-3 text-sm md:text-base text-[#efe9d6]">
                                        {message.message}
                                    </td>
                                    <td className="p-3 text-sm md:text-base text-[#efe9d6]">
                                        {new Date(message.createdAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="p-3 text-center text-[#efe9d6]">
                                    No messages found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}