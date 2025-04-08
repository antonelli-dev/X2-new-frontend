'use client';

import { CustomDropdownItemText } from "@/components/ui/CustomDropdown/CustomDropdownItemText";
import { CustomDropdownList } from "@/components/ui/CustomDropdown/CustomDropdownList";
import { CustomDropdownSeparator } from "@/components/ui/CustomDropdown/CustomDropdownSeparator";
import { Book } from "lucide-react";

interface Props {
    message: {
        id: string;
        sender: string;
        content: string;
        created_at: string;
        document_name: string[];
    };
}

export const ChatMessage = ({ message: msg }: Props) => {
    const isUser = msg.sender === "human";

    return (
        <div
            key={msg.id}
            className={`w-full flex ${isUser ? "justify-end" : "justify-start"
                }`}
        >
            <div className="flex flex-col gap-1">
                {isUser &&
                    (<div className="flex flex-row justify-end w-full">
                        <CustomDropdownList icon={<Book size={16} />}>
                            <CustomDropdownItemText
                                text={"From"}
                            ></CustomDropdownItemText>
                            <CustomDropdownSeparator></CustomDropdownSeparator>
                            {msg.document_name.map(doc => (
                                <CustomDropdownItemText
                                    key={doc}
                                    text={doc}
                                ></CustomDropdownItemText>
                            ))}
                        </CustomDropdownList>
                    </div>
                    )}
                <div
                    className={`p-3 rounded-md max-w-xl ${isUser ? "bg-blue-100" : "bg-gray-100"
                        }`}
                >
                    {isUser ? (
                        <p className="text-sm text-gray-800 whitespace-pre-wrap">
                            {msg.content}
                        </p>
                    ) : (
                        <div
                            className="prose max-w-none text-sm text-gray-800
                    prose-p:my-2
                    prose-ul:pl-5 prose-ul:list-disc
                    prose-li:my-1
                    [&_table]:border-collapse [&_table]:w-full [&_table]:my-4
                    [&_th]:border [&_th]:border-gray-300 [&_th]:bg-gray-200 [&_th]:p-2 [&_th]:text-left
                    [&_td]:border [&_td]:border-gray-300 [&_td]:p-2"
                            dangerouslySetInnerHTML={{
                                __html: msg.content.replace(/```html|```/g, "").trim(),
                            }}
                        />
                    )}

                    <span className="text-xs text-gray-500 block mt-1">
                        {new Date(msg.created_at).toLocaleTimeString()}
                    </span>
                </div>
            </div>
        </div>
    );
}